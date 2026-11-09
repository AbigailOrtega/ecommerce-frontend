import { APIRequestContext, Frame, Page, expect } from '@playwright/test';
import * as crypto from 'crypto';
import { API, adminToken, trackOrder } from '../e2e/helpers/purchase';

/** https://docs.stripe.com/testing */
export const CARDS = {
  visa: '4242424242424242',
  declined: '4000000000000002',
  threeDSecure: '4000002500003155',
} as const;

// ── Stripe API (test mode) ────────────────────────────────────────────────────

async function stripeApi(method: 'GET' | 'POST', path: string, form?: Record<string, string>): Promise<any> {
  const res = await fetch(`https://api.stripe.com/v1${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env['STRIPE_SECRET_KEY']}`,
      ...(form && { 'Content-Type': 'application/x-www-form-urlencoded' }),
    },
    body: form ? new URLSearchParams(form).toString() : undefined,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(`Stripe ${method} ${path} → ${res.status}: ${JSON.stringify(body.error)}`);
  return body;
}

export const getIntent = (id: string) => stripeApi('GET', `/payment_intents/${id}`);

export const refund = (paymentIntentId: string, amountCents?: number) =>
  stripeApi('POST', '/refunds', { payment_intent: paymentIntentId, ...(amountCents && { amount: String(amountCents) }) });

/** Pays an intent from the server side, with no browser and no order behind it yet. */
export const confirmIntentWithVisa = (id: string) =>
  stripeApi('POST', `/payment_intents/${id}/confirm`, { payment_method: 'pm_card_visa', return_url: 'https://example.com' });

/** The event Stripe created for an object, once it exists (events can lag the API call by a moment). */
export async function findEvent(type: string, objectId: string): Promise<any> {
  let found: any;
  await expect.poll(async () => {
    const page = await stripeApi('GET', `/events?type=${type}&limit=50`);
    found = page.data.find((e: any) => e.data.object.id === objectId || e.data.object.payment_intent === objectId);
    return !!found;
  }, { timeout: 30_000, message: `Stripe event ${type} for ${objectId}` }).toBe(true);
  return found;
}

/** Posts an event to the backend signed like `stripe listen` signs it: a redelivery, as far as the backend can tell. */
export async function redeliver(request: APIRequestContext, event: any): Promise<number> {
  const payload = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256', process.env['STRIPE_LISTEN_SECRET']!)
    .update(`${timestamp}.${payload}`).digest('hex');
  const res = await request.post(`${API}/webhooks/stripe`, {
    data: payload,
    headers: { 'Content-Type': 'application/json', 'Stripe-Signature': `t=${timestamp},v1=${signature}` },
  });
  return res.status();
}

// ── Backend ───────────────────────────────────────────────────────────────────

/** What AbandonedOrderJob does to an order once it is an hour old, run now. */
export async function settleAbandoned(request: APIRequestContext, orderNumber: string): Promise<string> {
  const res = await request.post(`${API}/e2e/orders/${orderNumber}/settle-abandoned`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
  });
  expect(res.ok(), await res.text()).toBeTruthy();
  return (await res.json()).data.outcome;
}

/** Webhooks arrive a few seconds after the payment. */
export async function expectStatus(request: APIRequestContext, orderNumber: string, status: string): Promise<void> {
  await expect.poll(async () => (await trackOrder(request, orderNumber)).status,
    { timeout: 30_000, message: `order ${orderNumber} status` }).toBe(status);
}

export const cents = (amount: number) => Math.round(Number(amount) * 100);

// ── Checkout page ─────────────────────────────────────────────────────────────

/** The Payment Element's card form lives in one of Stripe's iframes; there are several. */
async function cardFrame(page: Page): Promise<Frame> {
  let frame: Frame | undefined;
  await expect.poll(async () => {
    for (const f of page.frames()) {
      if (f.url().includes('js.stripe.com') && await f.locator('input[name="number"]').count() > 0) { frame = f; return true; }
    }
    return false;
  }, { timeout: 30_000, message: 'Stripe card form' }).toBe(true);
  return frame!;
}

/** Types a test card into the real Payment Element. */
export async function fillStripeCard(page: Page, card: string): Promise<void> {
  const frame = await cardFrame(page);
  await frame.locator('input[name="number"]').fill(card);
  await frame.locator('input[name="expiry"]').fill('12 / 34');
  await frame.locator('input[name="cvc"]').fill('123');
  const postal = frame.locator('input[name="postalCode"]');
  if (await postal.isVisible()) await postal.fill('06600');
}

/**
 * Fills the card and clicks "Realizar Pedido". Returns the order number from the order-creation
 * response (a declined card still creates the order, PENDING).
 */
export async function payWithStripeCard(page: Page, card: string): Promise<string> {
  await fillStripeCard(page, card);
  const created = page.waitForResponse(r => /\/api\/orders(\/guest)?$/.test(r.url()) && r.request().method() === 'POST');
  await page.locator('button:has-text("Realizar Pedido")').click();
  const res = await created;
  expect(res.ok(), `order creation: ${await res.text()}`).toBeTruthy();
  return (await res.json()).data.orderNumber;
}

/** Answers Stripe's 3-D Secure test page ("Complete" or "Fail"). */
export async function answer3DSecure(page: Page, outcome: 'complete' | 'fail'): Promise<void> {
  const selector = outcome === 'complete' ? '#test-source-authorize-3ds' : '#test-source-fail-3ds';
  await expect(async () => {
    for (const f of page.frames()) {
      const button = f.locator(selector);
      if (await button.count() > 0) { await button.click(); return; }
    }
    throw new Error('3-D Secure challenge not shown yet');
  }).toPass({ timeout: 30_000 });
}

/** The payment intent the order was created with. */
export async function orderIntentId(request: APIRequestContext, orderNumber: string): Promise<string> {
  const res = await request.get(`${API}/admin/orders?search=${orderNumber}`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
  });
  expect(res.ok()).toBeTruthy();
  const order = (await res.json()).data.content.find((o: any) => o.orderNumber === orderNumber);
  expect(order?.paymentId, `paymentId of ${orderNumber}`).toMatch(/^pi_/);
  return order.paymentId;
}
