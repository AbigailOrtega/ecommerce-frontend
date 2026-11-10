import { test, expect, Page, APIRequestContext } from '@playwright/test';
import { API, adminToken, getProduct, registerAndLogin } from './helpers/purchase';
import { sessionToken } from './helpers/auth';

// Rescheduling and cancelling a pickup: a guest from the link of their emails, a customer from
// "Mis pedidos". Each test creates its own pickup point with two open days.

test.describe.configure({ timeout: 90_000 });

const day = (offset: number) => { const d = new Date(); d.setDate(d.getDate() + offset); return d; };
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const shown = (d: Date) => `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
const FIRST = day(10), SECOND = day(12);

async function pickupPoint(request: APIRequestContext): Promise<number> {
  const headers = { Authorization: `Bearer ${await adminToken(request)}` };
  const loc = await request.post(`${API}/admin/pickup-locations`, {
    headers, data: { name: `Punto ${Date.now()}${Math.floor(Math.random() * 1000)}`, address: 'Calle 1', city: 'CDMX', state: 'CDMX' },
  });
  expect(loc.ok()).toBeTruthy();
  const id = (await loc.json()).data.id;
  for (const d of [FIRST, SECOND]) {
    const rule = await request.post(`${API}/admin/pickup-locations/${id}/availability`, {
      headers, data: { type: 'SPECIFIC_DATE', specificDate: iso(d), startTime: '10:00', endTime: '14:00', maxCapacity: 5 },
    });
    expect(rule.ok()).toBeTruthy();
  }
  return id;
}

async function token(request: APIRequestContext, orderNumber: string): Promise<string> {
  const res = await request.get(`${API}/e2e/orders/${orderNumber}/manage-token`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
  });
  expect(res.ok()).toBeTruthy();
  return (await res.json()).data.token;
}

/**
 * Opens the date picker and clicks the given day (the only open days are FIRST and SECOND).
 * The calendar re-renders its days when the open dates arrive; on a slow machine (CI) that can
 * happen right as the click lands ("element was detached"), so the click is retried until the
 * field shows the chosen day.
 */
async function chooseDay(page: Page, d: Date) {
  const manage = page.getByTestId('pickup-manage');
  const field = page.getByTestId('pickup-date');
  const calendar = page.locator('mat-calendar');
  const cell = calendar.locator('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)', { hasText: new RegExp(`^\\s*${d.getDate()}\\s*$`) });
  await expect(async () => {
    if (!(await calendar.isVisible())) await manage.getByRole('button', { name: /calendar|calendario/i }).click();
    // the open days have loaded (some day is enabled)
    await expect(calendar.locator('.mat-calendar-body-cell:not(.mat-calendar-body-disabled)').first()).toBeVisible({ timeout: 3_000 });
    // the picker opens on this month; the day may be in the next one
    if (!(await cell.count())) await calendar.locator('.mat-calendar-next-button').click();
    await cell.first().click({ timeout: 2_000 });
    await expect(field).toHaveValue(new RegExp(String(d.getDate())), { timeout: 2_000 });
  }).toPass({ timeout: 30_000 });
}

test('guest, from the emailed link: reschedule, cancel, choose a new day', async ({ page, request }) => {
  const locationId = await pickupPoint(request);
  const product = await getProduct(request, 'test-t-shirt');
  const created = await request.post(`${API}/orders/guest`, { data: {
    guestFirstName: 'Lucía', guestLastName: 'Méndez', guestEmail: `lucia${Date.now()}@test.com`,
    items: [{ productId: product.id, quantity: 1 }], paymentMethod: 'COD', shippingType: 'PICKUP',
    pickupLocationId: locationId, pickupDate: iso(FIRST),
  } });
  expect(created.ok(), await created.text()).toBeTruthy();
  const orderNumber = (await created.json()).data.orderNumber;
  page.on('dialog', d => d.accept());   // "¿Cancelar tu cita de recolección?"

  await page.goto(`/recoleccion/${orderNumber}?t=${await token(request, orderNumber)}`);
  const summary = page.getByTestId('pickup-summary');
  await expect(summary).toContainText(orderNumber);
  await expect(summary).toContainText(shown(FIRST));

  // reschedule to the other open day
  await page.getByTestId('pickup-reschedule').click();
  await chooseDay(page, SECOND);
  await page.getByTestId('pickup-confirm').click();
  await expect(summary).toContainText(shown(SECOND));
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: 'reprogramada' })).toBeVisible();

  // cancel: the page then asks for a new day straight away
  await page.getByTestId('pickup-cancel').click();
  await expect(summary).toContainText('Cancelada');
  await expect(page.getByTestId('pickup-manage')).toContainText('está cancelada');
  await chooseDay(page, FIRST);
  await page.getByTestId('pickup-confirm').click();
  await expect(summary).toContainText(shown(FIRST));
  await expect(summary).not.toContainText('Cancelada');
});

test('a link without the right token shows nothing of the order', async ({ page }) => {
  await page.goto('/recoleccion/ORD-E2E-PKUP?t=not-the-token');
  await expect(page.getByTestId('pickup-invalid')).toContainText('Este enlace no funciona');
  await expect(page.getByTestId('pickup-summary')).toHaveCount(0);
});

test('customer, from "Mis pedidos": the two buttons are there and work', async ({ page, request }) => {
  const locationId = await pickupPoint(request);
  await registerAndLogin(page, request);
  const bearer = { Authorization: `Bearer ${await sessionToken(page)}` };
  const product = await getProduct(request, 'test-t-shirt');
  expect((await request.post(`${API}/cart`, { headers: bearer, data: { productId: product.id, quantity: 1 } })).ok()).toBeTruthy();
  const created = await request.post(`${API}/orders`, { headers: bearer, data: {
    paymentMethod: 'COD', shippingType: 'PICKUP', pickupLocationId: locationId, pickupDate: iso(FIRST),
  } });
  expect(created.ok(), await created.text()).toBeTruthy();
  const orderNumber = (await created.json()).data.orderNumber;
  page.on('dialog', d => d.accept());

  await page.goto(`/orders/${orderNumber}`);
  await expect(page.getByTestId('pickup-reschedule')).toHaveText(/Reprogramar recolección/);
  await expect(page.getByTestId('pickup-cancel')).toHaveText(/Cancelar recolección/);

  await page.getByTestId('pickup-reschedule').click();
  await chooseDay(page, SECOND);
  await page.getByTestId('pickup-confirm').click();
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: 'reprogramada' })).toBeVisible();
  await expect(page.getByText(shown(SECOND)).first()).toBeVisible();

  await page.getByTestId('pickup-cancel').click();
  await expect(page.getByTestId('pickup-manage')).toContainText('está cancelada');
});

test('the emailed link answers 200 (not the 404 of unknown pages) and renders nothing personal on the server', async ({ request }) => {
  const res = await request.get('/recoleccion/ORD-E2E-PKUP?t=anything');
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(html).not.toContain('ORD-E2E-PKUP</strong>');
  expect(html).not.toContain('Sucursal Centro');
});
