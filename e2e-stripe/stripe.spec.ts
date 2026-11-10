import { test, expect, Page, APIRequestContext } from '@playwright/test';
import {
  API, addToCartFromDetail, createCoupon, createProduct, fillGuestContact, goToPaymentWithNationalShipping,
  productStock, registerAndLogin, setQuantity, trackOrder,
} from '../e2e/helpers/purchase';
import {
  CARDS, answer3DSecure, captureOrderCreation, cents, clickPlaceOrder, confirmIntentWithVisa, expectStatus, fillStripeCard, findEvent, getIntent, orderIntentId,
  payWithStripeCard, redeliver, refund, settleAbandoned,
} from './stripe';

// The checkout against Stripe itself (test mode): every payment below goes through the real
// Payment Element and the real API, and every webhook is one Stripe created and signed.
// Each test buys a product it creates, so stock assertions never race with other tests.

const unique = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

/** Guest checkout with national shipping, paid with `card`. */
async function guestCheckout(page: Page, request: APIRequestContext, card: string, opts: { price?: number; stock?: number } = {}) {
  const product = await createProduct(request, { price: opts.price ?? 249.5, stock: opts.stock ?? 5 });
  await addToCartFromDetail(page, product.slug);
  await page.goto('/checkout');
  await fillGuestContact(page, `stripe${unique()}@test.com`);
  await goToPaymentWithNationalShipping(page);
  const orderNumber = await payWithStripeCard(page, card);
  return { orderNumber, slug: product.slug };
}

/** A guest order paid with the test Visa and confirmed by Stripe's webhook. */
async function confirmedOrder(page: Page, request: APIRequestContext) {
  const purchase = await guestCheckout(page, request, CARDS.visa);
  await expectStatus(request, purchase.orderNumber, 'CONFIRMED');
  return { ...purchase, intentId: await orderIntentId(request, purchase.orderNumber) };
}

test.describe('Stripe — payments', () => {
  test('approved card → order confirmed by Stripe\'s webhook, the exact total charged in MXN', async ({ page, request }) => {
    const { orderNumber, slug, intentId } = await confirmedOrder(page, request);

    await expect(page).toHaveURL(/\/confirmacion/, { timeout: 30_000 });
    const order = await trackOrder(request, orderNumber);
    const intent = await getIntent(intentId);
    expect(intent.status).toBe('succeeded');
    expect(intent.currency).toBe('mxn');
    expect(intent.amount_received).toBe(cents(order.totalAmount));
    expect(await productStock(request, slug)).toBe(4);
  });

  test('3-D Secure completed → order confirmed', async ({ page, request }) => {
    const { orderNumber } = await guestCheckout(page, request, CARDS.threeDSecure);
    await answer3DSecure(page, 'complete');
    await expectStatus(request, orderNumber, 'CONFIRMED');
  });

  test('signed-in customer with a coupon → Stripe charges the discounted total', async ({ page, request }) => {
    const coupon = await createCoupon(request, 10);
    await registerAndLogin(page, request);
    const product = await createProduct(request, { price: 389.9, stock: 5 });
    await addToCartFromDetail(page, product.slug);

    await page.goto('/cart');
    await page.locator('input[placeholder="ej. BUENFIN10"]').fill(coupon);
    await page.locator('button:has-text("Aplicar")').click();
    await expect(page.getByText(coupon).first()).toBeVisible();
    // in-app navigation: the applied coupon lives in memory and would be lost on a full reload
    await page.locator('a.checkout-btn').click();
    await goToPaymentWithNationalShipping(page, async () => {
      await expect(page.locator('.discount-row')).toContainText(coupon);
    });
    const orderNumber = await payWithStripeCard(page, CARDS.visa);

    await expect(page).toHaveURL(new RegExp(`/orders/${orderNumber}`), { timeout: 30_000 });
    await expectStatus(request, orderNumber, 'CONFIRMED');
    const order = await trackOrder(request, orderNumber);
    expect(order.couponCode).toBe(coupon);
    expect(Number(order.discountAmount)).toBeCloseTo(38.99, 2);   // 10% of 389.90
    expect((await getIntent(await orderIntentId(request, orderNumber))).amount_received).toBe(cents(order.totalAmount));
  });

  test('not enough stock → the order is refused and the card is never charged', async ({ page, request }) => {
    const product = await createProduct(request, { stock: 1 });
    await page.goto(`/products/${product.slug}`);
    await setQuantity(page, 2);   // quantity 2, stock 1
    await page.locator('button.add-btn').click();

    const intents: string[] = [];
    page.on('response', async r => {
      if (r.url().includes('/payments/stripe/create-intent') && r.ok()) intents.push((await r.json()).data.paymentIntentId);
    });
    await page.goto('/checkout');
    await fillGuestContact(page, `nostock${unique()}@test.com`);
    await goToPaymentWithNationalShipping(page);

    await fillStripeCard(page, CARDS.visa);
    const created = captureOrderCreation(page);
    await clickPlaceOrder(page);
    expect((await created).status).toBe(400);
    await expect(page.locator('mat-snack-bar-container')).toContainText('Stock insuficiente');

    expect(intents.length).toBeGreaterThan(0);
    for (const id of intents) expect((await getIntent(id)).status).not.toBe('succeeded');
    expect(await productStock(request, product.slug)).toBe(1);
  });
});

test.describe('Stripe — payments that do not go through', () => {
  test('declined card → order kept PENDING for a retry, then cancelled: stock back, intent voided', async ({ page, request }) => {
    const { orderNumber, slug } = await guestCheckout(page, request, CARDS.declined, { stock: 3 });
    // the shopper stays on the payment step with the reason; never "¡Pedido confirmado!"
    await expect(page.locator('.stripe-error')).toContainText('No se hizo ningún cargo');
    await expect(page).toHaveURL(/\/checkout/);

    const intentId = await orderIntentId(request, orderNumber);
    await findEvent('payment_intent.payment_failed', intentId);
    expect((await trackOrder(request, orderNumber)).status).toBe('PENDING');
    expect(await productStock(request, slug)).toBe(2);   // still reserved while the shopper may retry

    expect(await settleAbandoned(request, orderNumber)).toBe('CANCELLED');
    expect((await trackOrder(request, orderNumber)).status).toBe('CANCELLED');
    expect(await productStock(request, slug)).toBe(3);
    expect((await getIntent(intentId)).status).toBe('canceled');
  });

  test('declined card, then another card → the same order is paid (no second order)', async ({ page, request }) => {
    const orders: string[] = [];
    page.on('request', r => { if (/\/api\/orders(\/guest)?$/.test(r.url()) && r.method() === 'POST') orders.push(r.url()); });
    const { orderNumber, slug } = await guestCheckout(page, request, CARDS.declined, { stock: 3 });
    await expect(page.locator('.stripe-error')).toContainText('No se hizo ningún cargo');

    await fillStripeCard(page, CARDS.visa);
    await clickPlaceOrder(page);

    await expect(page).toHaveURL(/\/confirmacion/, { timeout: 30_000 });
    await expectStatus(request, orderNumber, 'CONFIRMED');
    expect(orders).toHaveLength(1);
    expect(await productStock(request, slug)).toBe(2);
  });

  test('3-D Secure failed → order cancelled once settled', async ({ page, request }) => {
    const { orderNumber, slug } = await guestCheckout(page, request, CARDS.threeDSecure, { stock: 3 });
    await answer3DSecure(page, 'fail');
    await expect(page.locator('.stripe-error')).toContainText('No se hizo ningún cargo');
    await findEvent('payment_intent.payment_failed', await orderIntentId(request, orderNumber));
    expect((await trackOrder(request, orderNumber)).status).toBe('PENDING');

    expect(await settleAbandoned(request, orderNumber)).toBe('CANCELLED');
    expect(await productStock(request, slug)).toBe(3);
  });

  test('payment whose webhook never reached the server → confirmed by asking Stripe', async ({ request }) => {
    const product = await createProduct(request, { price: 120, stock: 5 });
    const guestOrder = (paymentId: string) => ({
      guestFirstName: 'Invitada', guestLastName: 'E2E', guestEmail: `lost${unique()}@test.com`, guestPhone: '5512345678',
      items: [{ productId: product.id, quantity: 1 }],
      shippingAddress: 'Calle Falsa 123', shippingCity: 'Ciudad de México', shippingCountry: 'México',
      shippingType: 'NATIONAL', paymentMethod: 'stripe', paymentId,
    });
    const newIntent = async (amount: number) => {
      const res = await request.post(`${API}/payments/stripe/create-intent`, { data: { amount } });
      expect(res.ok(), await res.text()).toBeTruthy();
      return (await res.json()).data.paymentIntentId as string;
    };

    // an unpaid order of the same shape tells us the total the server will expect; then it is voided
    const probe = await request.post(`${API}/orders/guest`, { data: guestOrder(await newIntent(100)) });
    expect(probe.ok(), await probe.text()).toBeTruthy();
    const probeOrder = (await probe.json()).data;
    expect(await settleAbandoned(request, probeOrder.orderNumber)).toBe('CANCELLED');

    // paid before any order points at it: Stripe's webhook finds no order and is dropped
    const intentId = await newIntent(Number(probeOrder.totalAmount));
    await confirmIntentWithVisa(intentId);
    await findEvent('payment_intent.succeeded', intentId);
    await sleep(5_000);   // let `stripe listen` deliver it (and the backend ignore it)

    const created = await request.post(`${API}/orders/guest`, { data: guestOrder(intentId) });
    expect(created.ok(), await created.text()).toBeTruthy();
    const orderNumber = (await created.json()).data.orderNumber;
    expect((await trackOrder(request, orderNumber)).status).toBe('PENDING');

    expect(await settleAbandoned(request, orderNumber)).toBe('CONFIRMED');
    expect((await trackOrder(request, orderNumber)).status).toBe('CONFIRMED');
    expect(await productStock(request, product.slug)).toBe(4);
  });
});

test.describe('Stripe — webhooks and refunds', () => {
  test('the same payment event delivered twice → order unchanged, stock taken once', async ({ page, request }) => {
    const { orderNumber, slug, intentId } = await confirmedOrder(page, request);
    const event = await findEvent('payment_intent.succeeded', intentId);

    expect(await redeliver(request, event)).toBe(200);
    expect((await trackOrder(request, orderNumber)).status).toBe('CONFIRMED');
    expect(await productStock(request, slug)).toBe(4);
  });

  test('full refund in Stripe → order REFUNDED, stock returned', async ({ page, request }) => {
    const { orderNumber, slug, intentId } = await confirmedOrder(page, request);
    await refund(intentId);
    await expectStatus(request, orderNumber, 'REFUNDED');
    expect(await productStock(request, slug)).toBe(5);
  });

  test('partial refund in Stripe → order stays CONFIRMED (handled by hand)', async ({ page, request }) => {
    const { orderNumber, slug, intentId } = await confirmedOrder(page, request);
    await refund(intentId, 1000);   // $10.00 of the total
    await findEvent('charge.refunded', intentId);
    await sleep(5_000);   // the webhook has had time to arrive and be handled
    expect((await trackOrder(request, orderNumber)).status).toBe('CONFIRMED');
    expect(await productStock(request, slug)).toBe(4);
  });

  test('a webhook that Stripe did not sign → 400', async ({ request }) => {
    const res = await request.post(`${API}/webhooks/stripe`, {
      data: '{"type":"payment_intent.succeeded"}',
      headers: { 'Content-Type': 'application/json', 'Stripe-Signature': 't=1,v1=forged' },
    });
    expect(res.status()).toBe(400);
  });
});
