import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { sessionToken } from './helpers/auth';
import {
  API, addToCartFromDetail, adminToken, captureOrderCreation, createCoupon, createProduct, fillGuestContact, goToPaymentWithNationalShipping, payWithCard, payWithPayPal,
  productStock, registerAndLogin, sendStripePaymentSucceeded, trackOrder, useFakePaymentProviders, setQuantity,
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
  // through page.route: reading the body from a 'response' event can fail once the checkout has
  // navigated on ("No data found for resource")
  page.route('**/payments/stripe/create-intent', async route => {
    const response = await route.fetch();
    const body = await response.json();
    if (response.ok()) ids.push(body.data.paymentIntentId);
    await route.fulfill({ response, json: body });
  });
  return async () => {
    await expect.poll(() => ids.length).toBeGreaterThan(0);
    return ids[ids.length - 1];
  };
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

  test('PayPal declines the charge → the order is cancelled and its stock returned', async ({ page, request }) => {
    const product = await createProduct(request, { stock: 3 });
    await addToCartFromDetail(page, product.slug);
    await page.goto('/checkout');
    const email = `declined${unique()}@test.com`;
    await fillGuestContact(page, email);
    await goToPaymentWithNationalShipping(page);

    // declines this buyer's capture only: a global "next capture" switch was taken by whichever
    // test running in parallel captured first
    const declined = await request.post(`${API}/e2e/paypal/decline-capture?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${await adminToken(request)}` },
    });
    expect(declined.ok()).toBeTruthy();
    const created = captureOrderCreation(page);
    await payWithPayPal(page);
    const orderNumber = (await created).body.data.orderNumber;

    await expect(page.locator('mat-snack-bar-container')).toContainText('PayPal no pudo completar el pago');
    await expect(page).toHaveURL(/\/checkout/);
    expect((await trackOrder(request, orderNumber)).status).toBe('CANCELLED');
    expect(await productStock(request, product.slug)).toBe(3);
  });

  test('PayPal: an order that cannot be created (not enough stock) is never charged', async ({ page, request }) => {
    const product = await createProduct(request, { stock: 1 });
    await page.goto(`/products/${product.slug}`);
    await setQuantity(page, 2);   // quantity 2, stock 1
    await page.locator('button.add-btn').click();

    const captures: string[] = [];
    page.on('request', r => { if (r.url().includes('/paypal/capture')) captures.push(r.url()); });

    await page.goto('/checkout');
    await fillGuestContact(page, `nostock${unique()}@test.com`);
    await goToPaymentWithNationalShipping(page);
    await payWithPayPal(page);

    await expect(page.locator('mat-snack-bar-container')).toContainText('Stock insuficiente');
    expect(captures).toEqual([]);
    expect(await productStock(request, product.slug)).toBe(1);
  });

  test('cannot leave the first step until the contact details are filled in', async ({ page, request }) => {
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
    await page.locator('button:has-text("Continuar")').first().click();

    await expect(page.getByRole('alert')).toContainText('Completa tus datos de contacto');
    await expect(page.getByText('Escribe tu nombre')).toBeVisible();
    await expect(page.locator('[formControlName="shippingAddress"]')).toBeHidden();

    await fillGuestContact(page, `late${unique()}@test.com`);
    await expect(page.getByRole('alert')).toBeHidden();
    await page.locator('button:has-text("Continuar")').first().click();
    await expect(page.locator('[formControlName="shippingAddress"]')).toBeVisible();
  });

  test('delivery instructions written in step 2 reach the order', async ({ page, request }) => {
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await fillGuestContact(page, `notes${unique()}@test.com`);
    const created = captureOrderCreation(page);
    await goToPaymentWithNationalShipping(page, undefined, async () => {
      await page.getByTestId('delivery-notes').fill('Casa azul, tocar timbre 2');
      await expect(page.getByText('25/255')).toBeVisible();
    });
    await payWithCard(page);
    const orderNumber = (await created).body.data.orderNumber;

    const res = await request.get(`${API}/admin/orders?search=${orderNumber}`, {
      headers: { Authorization: `Bearer ${await adminToken(request)}` },
    });
    expect((await res.json()).data.content[0].notes).toBe('Casa azul, tocar timbre 2');
  });
});

test.describe('Purchase — signed-in customer', () => {
  test.beforeEach(async ({ page }) => useFakePaymentProviders(page));

  test('pays by card with a coupon → discount charged, order in "Mis pedidos", coupon used up', async ({ page, request }) => {
    const lastIntent = recordIntents(page);
    const coupon = await createCoupon(request, 10);
    await registerAndLogin(page, request);
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
      headers: { Authorization: `Bearer ${await sessionToken(page)}` },
    });
    expect(again.ok()).toBeFalsy();
  });

  test('a Stripe webhook with the wrong amount does not confirm the order', async ({ page, request }) => {
    const lastIntent = recordIntents(page);
    await registerAndLogin(page, request);
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

test.describe('Address from the postal code', () => {
  test.beforeEach(async ({ page }) => useFakePaymentProviders(page));

  async function toAddressStep(page: Page, request: APIRequestContext) {
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await fillGuestContact(page, `cp${unique()}@test.com`);
    await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
    await page.locator('button:has-text("Continuar")').first().click();
    await expect(page.getByTestId('zip-code')).toBeVisible();
  }

  test('a code with several colonias fills state and city and offers its colonias', async ({ page, request }) => {
    await toAddressStep(page, request);
    await page.getByTestId('zip-code').fill('44100');

    await expect(page.locator('[formControlName="shippingState"]')).toHaveValue('Jalisco');
    await expect(page.locator('[formControlName="shippingCity"]')).toHaveValue('Guadalajara');
    await expect(page.getByText('2 colonias en este código postal')).toBeVisible();
    await expect(page.getByTestId('neighborhood')).toHaveValue('');   // the shopper picks one

    await page.getByTestId('neighborhood').click();
    await page.getByRole('option', { name: 'Zona Centro' }).click();
    await expect(page.getByTestId('neighborhood')).toHaveValue('Zona Centro');
  });

  test('a code without a city in the catalog uses its municipality', async ({ page, request }) => {
    await toAddressStep(page, request);
    await page.getByTestId('zip-code').fill('56530');
    await expect(page.locator('[formControlName="shippingCity"]')).toHaveValue('Chalco');
    await expect(page.locator('[formControlName="shippingState"]')).toHaveValue('México');
    await expect(page.getByTestId('neighborhood')).toHaveValue('San Mateo Huitzilzingo');
  });

  test('an unknown code says so and leaves the fields to fill in by hand', async ({ page, request }) => {
    await toAddressStep(page, request);
    await page.getByTestId('zip-code').fill('99999');
    await expect(page.getByText('No encontramos ese código postal')).toBeVisible();

    await page.getByTestId('neighborhood').fill('Mi colonia');
    await page.locator('[formControlName="shippingCity"]').fill('Mi ciudad');
    await page.locator('[formControlName="shippingState"]').fill('Mi estado');
    await page.fill('[formControlName="shippingAddress"]', 'Calle 1');
    await expect(page.locator('button:has-text("Ver opciones de envío")')).toBeEnabled();
  });

  test('the order keeps the colonia with the street, for the label and the emails', async ({ page, request }) => {
    await addToCartFromDetail(page, (await createProduct(request)).slug);
    await page.goto('/checkout');
    await fillGuestContact(page, `cp${unique()}@test.com`);
    const created = captureOrderCreation(page);
    await goToPaymentWithNationalShipping(page);
    await payWithCard(page);

    const order = (await created).body.data;
    expect(order.shippingAddress).toBe('Calle Falsa 123, Col. Roma Norte');
    expect(order.shippingZipCode).toBe('06700');
    expect(order.shippingState).toBe('Ciudad de México');
  });
});
