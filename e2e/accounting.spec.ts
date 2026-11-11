import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import {
  API, addToCartFromDetail, adminToken, createProduct, fillGuestContact, goToPaymentWithNationalShipping, payWithCard,
  sendStripePaymentSucceeded, trackOrder, useFakePaymentProviders,
} from './helpers/purchase';

// Reportes → Contabilidad: a card sale shows up with its commission (looked up by the server a
// few seconds after the payment), the garment cost entered afterwards applies to it, and the
// sales ledger downloads with the whole row.

test.describe.configure({ timeout: 120_000 });

const unique = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

function recordIntents(page: Page): () => Promise<string> {
  const ids: string[] = [];
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

test('a card sale: commission, cost entered later, and the ledger for the accountant', async ({ page, request }) => {
  await useFakePaymentProviders(page);
  const lastIntent = recordIntents(page);
  const product = await createProduct(request, { name: `Vestido contable ${unique()}`, price: 400, stock: 5 });

  // a guest buys it by card; Stripe confirms the payment
  await addToCartFromDetail(page, product.slug);
  await page.goto('/checkout');
  await fillGuestContact(page, `conta${unique()}@test.com`);
  await goToPaymentWithNationalShipping(page);
  await payWithCard(page);
  await expect(page).toHaveURL(/\/confirmacion/, { timeout: 15000 });
  const orderNumber = (await page.locator('.order-number strong').innerText()).replace('#', '');
  const order = await trackOrder(request, orderNumber);
  await sendStripePaymentSucceeded(request, await lastIntent(), Math.round(order.totalAmount * 100));

  // the server reads the commission from Stripe on its own (every 3 s in this environment)
  const fee = Math.round((order.totalAmount * 0.036 + 3) * 100) / 100;
  const today = new Date();
  const day = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  await expect.poll(async () => {
    const res = await request.get(`${API}/admin/reports/accounting?from=${day}&to=${day}`,
      { headers: { Authorization: `Bearer ${await adminToken(request)}` } });
    const row = (await res.json()).data.ledger.find((r: any) => r.orderNumber === orderNumber);
    return row?.paymentFee ?? null;
  }, { timeout: 30_000 }).toBe(fee);

  // the admin opens the accounts
  await page.context().clearCookies();
  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/reports');
  await page.getByTestId('report-accounting').click();
  await expect(page.getByTestId('acct-summary')).toBeVisible();
  await expect(page.getByTestId('acct-breakdown')).toContainText('Utilidad bruta');
  await expect(page.getByTestId('acct-methods')).toContainText('Tarjeta (Stripe)');

  // enters what the dress cost: the sale already made takes it
  const costs = page.getByTestId('acct-costs');
  await costs.getByLabel('Buscar producto').fill(product.name);
  await page.getByTestId(`cost-input-${product.id}`).fill('150');
  await page.getByTestId(`cost-save-${product.id}`).click();
  await expect(page.locator('mat-snack-bar-container')).toContainText('también se aplicó a 1 venta anterior');
  await expect(page.getByTestId(`cost-save-${product.id}`)).toBeDisabled();

  // the ledger, as the accountant gets it
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByTestId('acct-ledger-download').click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/^libro-de-ventas_\d{4}-\d{2}-01_a_\d{4}-\d{2}-\d{2}\.csv$/);
  const csv = fs.readFileSync(await download.path(), 'utf8');
  const line = csv.split('\r\n').find(l => l.includes(orderNumber));
  expect(line).toBeTruthy();
  expect(line).toContain('"Venta"');
  expect(line).toContain('"Tarjeta (Stripe)"');
  expect(line).toContain(`400.00`);
  expect(line).toContain(`${order.totalAmount.toFixed(2)},${fee.toFixed(2)}`);
  expect(line!.endsWith(',150.00')).toBe(true);
});

test('the cost of a product is never in the public catalog', async ({ request }) => {
  const product = await createProduct(request, { price: 250 });
  const token = await adminToken(request);
  const set = await request.put(`${API}/admin/reports/product-costs/${product.id}`,
    { headers: { Authorization: `Bearer ${token}` }, data: { costPrice: 99.5 } });
  expect(set.ok()).toBe(true);
  const body = await (await request.get(`${API}/products/slug/${product.slug}`)).text();
  expect(body).toContain(product.name);
  expect(body).not.toContain('costPrice');
  expect(body).not.toContain('99.5');
});
