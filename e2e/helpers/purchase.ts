import { APIRequestContext, Page, expect } from '@playwright/test';
import * as crypto from 'crypto';

export const API = 'http://localhost:8080/api';

/** Same value as app.stripe.webhook-secret in backend/src/test/resources/application-e2e.yml. */
const STRIPE_WEBHOOK_SECRET = 'whsec_test';

/**
 * Stripe.js and the PayPal SDK are replaced by small fakes, because the real ones need network
 * access and live accounts. The backend runs with FakePaymentService (profile "fake-payments"),
 * so everything between the browser and the database is the real code.
 */
const FAKE_STRIPE_JS = `
window.Stripe = function () {
  return {
    _registerWrapper: function () {},
    registerAppInfo: function () {},
    elements: function (opts) {
      var element = {
        mount: function (el) { el.innerHTML = '<div data-testid="fake-stripe-card">Tarjeta de prueba 4242</div>'; },
        on: function (event, cb) { if (event === 'ready') setTimeout(cb, 0); },
        destroy: function () {}, unmount: function () {},
      };
      return { create: function () { return element; }, _clientSecret: opts && opts.clientSecret };
    },
    confirmPayment: function (args) {
      var id = args.elements._clientSecret.split('_secret_')[0];
      return Promise.resolve({ paymentIntent: { id: id, status: 'succeeded' } });
    },
  };
};`;

const FAKE_PAYPAL_SDK = `
window.paypal = {
  Buttons: function (opts) {
    return {
      render: function (el) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = 'Pagar con PayPal (prueba)';
        b.setAttribute('data-testid', 'fake-paypal-button');
        b.onclick = function () {
          Promise.resolve(opts.createOrder({}, {}))
            .then(function (id) { return opts.onApprove({ orderID: id }, {}); })
            .catch(function (e) { opts.onError && opts.onError(e); });
        };
        el.appendChild(b);
        return Promise.resolve();
      },
      close: function () {},
    };
  },
};`;

export async function useFakePaymentProviders(page: Page): Promise<void> {
  await page.route('https://js.stripe.com/**', route =>
    route.fulfill({ contentType: 'application/javascript', body: FAKE_STRIPE_JS }));
  await page.route('https://www.paypal.com/sdk/js**', route =>
    route.fulfill({ contentType: 'application/javascript', body: FAKE_PAYPAL_SDK }));
}

/** Sends a correctly signed payment_intent.succeeded webhook, as Stripe would after the charge. */
export async function sendStripePaymentSucceeded(request: APIRequestContext, paymentIntentId: string,
                                                 amountCents: number): Promise<void> {
  const payload = JSON.stringify({
    id: 'evt_e2e_' + Date.now(), object: 'event', type: 'payment_intent.succeeded',
    data: { object: { id: paymentIntentId, object: 'payment_intent', amount_received: amountCents, currency: 'mxn' } },
  });
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac('sha256', STRIPE_WEBHOOK_SECRET).update(`${timestamp}.${payload}`).digest('hex');
  const res = await request.post(`${API}/webhooks/stripe`, {
    data: payload,
    headers: { 'Content-Type': 'application/json', 'Stripe-Signature': `t=${timestamp},v1=${signature}` },
  });
  expect(res.ok()).toBeTruthy();
}

export async function adminToken(request: APIRequestContext): Promise<string> {
  const res = await request.post(`${API}/auth/login`, { data: { email: 'admin@test.com', password: 'Admin123!' } });
  expect(res.ok()).toBeTruthy();
  return (await res.json()).data.accessToken;
}

/**
 * Creates a product of its own for a test, so tests never change the seeded products that other
 * tests (running in parallel) look at. Returns its slug.
 */
export async function createProduct(request: APIRequestContext, opts: { name?: string; price?: number; stock?: number } = {}): Promise<{ slug: string; name: string; id: number }> {
  const name = opts.name ?? `E2E Producto ${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const res = await request.post(`${API}/products`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
    data: { name, price: opts.price ?? 100, stockQuantity: opts.stock ?? 10, active: true },
  });
  expect(res.ok()).toBeTruthy();
  const data = (await res.json()).data;
  return { slug: data.slug, name: data.name, id: data.id };
}

export async function trackOrder(request: APIRequestContext, orderNumber: string): Promise<any> {
  const res = await request.get(`${API}/orders/track/${orderNumber}`);
  expect(res.ok()).toBeTruthy();
  return (await res.json()).data;
}

export async function productStock(request: APIRequestContext, slug: string): Promise<number> {
  const res = await request.get(`${API}/products/slug/${slug}`);
  expect(res.ok()).toBeTruthy();
  return (await res.json()).data.stockQuantity;
}

/** Product detail → "Agregar al carrito". Works for guests (local cart) and signed-in users. */
export async function addToCartFromDetail(page: Page, slug: string): Promise<void> {
  await page.goto(`/products/${slug}`);
  const add = page.locator('button.add-btn');
  await expect(add).toBeEnabled({ timeout: 15000 });
  await add.click();
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: 'Agregado al carrito' })).toBeVisible();
}

export async function fillGuestContact(page: Page, email: string): Promise<void> {
  await page.fill('[formControlName="guestFirstName"]', 'Invitada');
  await page.fill('[formControlName="guestLastName"]', 'E2E');
  await page.fill('[formControlName="guestEmail"]', email);
  await page.fill('[formControlName="guestPhone"]', '5512345678');
}

/** Checkout steps 1–3 with national shipping, ending on the payment step. */
export async function goToPaymentWithNationalShipping(page: Page, onReview?: () => Promise<void>): Promise<void> {
  await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
  await page.locator('button:has-text("Continuar")').first().click();

  await page.fill('[formControlName="shippingAddress"]', 'Calle Falsa 123');
  await page.fill('[formControlName="shippingCity"]', 'Ciudad de México');
  await page.locator('button:has-text("Ver opciones de envío")').click();

  const toReview = page.locator('button:has-text("Continuar al Pago")').first();
  await expect(toReview).toBeEnabled({ timeout: 15000 });
  await toReview.click();
  await page.locator('mat-card.order-summary').waitFor({ state: 'visible' });
  if (onReview) await onReview();
  await page.locator('button:has-text("Continuar al Pago")').nth(1).click();
}

export async function payWithCard(page: Page): Promise<void> {
  await expect(page.getByTestId('fake-stripe-card')).toBeVisible({ timeout: 15000 });
  const placeOrder = page.locator('button:has-text("Realizar Pedido")');
  await expect(placeOrder).toBeEnabled();
  await placeOrder.click();
}

export async function payWithPayPal(page: Page): Promise<void> {
  await page.getByRole('radio', { name: 'PayPal' }).check();
  await page.getByTestId('fake-paypal-button').click({ timeout: 15000 });
}
