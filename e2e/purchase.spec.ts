import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { loginAs } from './helpers/auth';
import {
  API, addToCartFromDetail, adminToken, createProduct, fillGuestContact, goToPaymentWithNationalShipping, payWithCard, payWithPayPal,
  productStock, sendStripePaymentSucceeded, trackOrder, useFakePaymentProviders,
} from './helpers/purchase';

// Complete purchases, from the product page to a confirmed order. Each test buys a product it
// creates itself, so stock assertions never race with other tests.

// a whole purchase takes several steps; the default 30s is tight when the suite runs in parallel
test.describe.configure({ timeout: 90_000 });

const unique = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

/**
 * Records the Stripe payment intents the checkout creates. The payment form is prepared as soon
 * as the checkout has what it needs, sometimes before the payment step is shown, so listening
 * must start before the checkout opens.
 */
function recordIntents(page: Page): () => Promise<string> {
  const ids: string[] = [];
  page.on('response', async r => {
    if (r.url().includes('/payments/stripe/create-intent') && r.ok()) ids.push((await r.json()).data.paymentIntentId);
  });
  return async () => {
    await expect.poll(() => ids.length).toBeGreaterThan(0);
    return ids[ids.length - 1];
  };
}

async function registerCustomer(page: Page, request: APIRequestContext): Promise<string> {
  const email = `buyer${unique()}@test.com`;
  const res = await request.post(`${API}/auth/register`, {
    data: { firstName: 'Compradora', lastName: 'E2E', email, password: 'Buyer123!', marketingOptIn: false },
  });
  expect(res.ok()).toBeTruthy();
  await loginAs(page, email, 'Buyer123!');
  return email;
}

async function createCoupon(request: APIRequestContext, discountPercent: number): Promise<string> {
  const code = `E2E${unique()}`;
  const expiresAt = new Date(Date.now() + 7 * 864e5).toISOString().slice(0, 10);
  const res = await request.post(`${API}/admin/coupons`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
    data: { code, discountPercent, expiresAt, usageLimit: 1 },
  });
  expect(res.ok()).toBeTruthy();
  return code;
}

test.describe('Purchase — guest', () => {
  test.beforeEach(async ({ page }) => useFakePaymentProviders(page));

  test('pays by card → confirmation page, stock decremented, order confirmed by the Stripe webhook, trackable', async ({ page, request }) => {
    const lastIntent = recordIntents(page);
    const product = await createProduct(request, { price: 29.99, stock: 5 });
    await addToCartFromDetail(page, product.slug);

    await page.goto('/checkout');
    await fillGuestContact(page, `guest${unique()}@test.com`);
    await goToPaymentWithNationalShipping(page);
    await payWithCard(page);

    await expect(page).toHaveURL(/\/confirmacion/, { timeout: 15000 });
    await expect(page.locator('h1')).toHaveText('¡Pedido confirmado!');
    const orderNumber = (await page.locator('.order-number strong').innerText()).replace('#', '');

    let order = await trackOrder(request, orderNumber);
    expect(order.status).toBe('PENDING');
    expect(await productStock(request, product.slug)).toBe(4);

    await sendStripePaymentSucceeded(request, await lastIntent(), Math.round(order.totalAmount * 100));
    order = await trackOrder(request, orderNumber);
    expect(order.status).toBe('CONFIRMED');

    // the guest cart is emptied
    await page.goto('/cart');
    await expect(page.getByText(/carrito está vacío|cart is empty/i)).toBeVisible();

    // and the order can be looked up on the public tracking page
    await page.goto('/rastrear-pedido');
    await page.locator('input[name="orderNumber"]').fill(orderNumber);
    await page.locator('button[type="submit"]').click();
    await expect(page.getByRole('heading', { name: `Pedido ${orderNumber}` })).toBeVisible();
    await expect(page.locator('.order-item')).toHaveCount(1);
  });

  test('pays with PayPal → order is confirmed right away', async ({ page, request }) => {
    const product = await createProduct(request, { price: 59.99, stock: 5 });
    await addToCartFromDetail(page, product.slug);

    await page.goto('/checkout');
    await fillGuestContact(page, `guest${unique()}@test.com`);
    await goToPaymentWithNationalShipping(page);
    await payWithPayPal(page);

    await expect(page).toHaveURL(/\/confirmacion/, { timeout: 15000 });
    const orderNumber = (await page.locator('.order-number strong').innerText()).replace('#', '');

    const order = await trackOrder(request, orderNumber);
    expect(order.status).toBe('CONFIRMED');
    expect(order.paymentMethod).toBe('paypal');
    expect(await productStock(request, product.slug)).toBe(4);
  });

  test('cannot pay until the contact details are filled in', async ({ page, request }) => {
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await goToPaymentWithNationalShipping(page);

    await expect(page.getByText('Completa tus datos de contacto')).toBeVisible();
    await expect(page.locator('button:has-text("Realizar Pedido")')).toBeDisabled();
  });
});

test.describe('Purchase — signed-in customer', () => {
  test.beforeEach(async ({ page }) => useFakePaymentProviders(page));

  test('pays by card with a coupon → discount charged, order in "Mis pedidos", coupon used up', async ({ page, request }) => {
    const lastIntent = recordIntents(page);
    const coupon = await createCoupon(request, 10);
    await registerCustomer(page, request);
    const product = await createProduct(request, { price: 89.99, stock: 5 });
    await addToCartFromDetail(page, product.slug);

    await page.goto('/cart');
    await page.locator('input[placeholder="ej. BUENFIN10"]').fill(coupon);
    await page.locator('button:has-text("Aplicar")').click();
    await expect(page.getByText(`Cupón (${coupon})`).or(page.getByText(coupon)).first()).toBeVisible();

    // in-app navigation: the applied coupon lives in memory and would be lost on a full reload
    await page.locator('a.checkout-btn').click();
    await goToPaymentWithNationalShipping(page, async () => {
      await expect(page.locator('.discount-row')).toContainText(coupon);
    });
    await payWithCard(page);

    await expect(page).toHaveURL(/\/orders\/ORD-/, { timeout: 15000 });
    const orderNumber = page.url().split('/orders/')[1];
    await expect(page.locator('h1')).toContainText(orderNumber);

    const order = await trackOrder(request, orderNumber);
    expect(order.couponCode).toBe(coupon);
    expect(Number(order.discountAmount)).toBeCloseTo(8.999, 1);   // 10% of 89.99
    expect(await productStock(request, product.slug)).toBe(4);

    await sendStripePaymentSucceeded(request, await lastIntent(), Math.round(order.totalAmount * 100));
    expect((await trackOrder(request, orderNumber)).status).toBe('CONFIRMED');

    await page.goto('/orders');
    await expect(page.getByText(orderNumber)).toBeVisible();

    // usageLimit was 1: the coupon no longer validates
    const again = await request.post(`${API}/coupons/validate?code=${coupon}`, {
      headers: { Authorization: `Bearer ${await page.evaluate(() => localStorage.getItem('accessToken'))}` },
    });
    expect(again.ok()).toBeFalsy();
  });

  test('a Stripe webhook with the wrong amount does not confirm the order', async ({ page, request }) => {
    const lastIntent = recordIntents(page);
    await registerCustomer(page, request);
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await goToPaymentWithNationalShipping(page);
    await payWithCard(page);
    await expect(page).toHaveURL(/\/orders\/ORD-/, { timeout: 15000 });
    const orderNumber = page.url().split('/orders/')[1];

    await sendStripePaymentSucceeded(request, await lastIntent(), 100);   // $1.00
    expect((await trackOrder(request, orderNumber)).status).toBe('PENDING');
  });
});
