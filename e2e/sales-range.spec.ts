import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { API, adminToken } from './helpers/purchase';

// Reportes → Ventas: the admin picks any dates (not only the week / month / year shortcuts).

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const dmy = (d: Date) => `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;

test('sales for dates the admin chooses', async ({ page, request }) => {
  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);

  const today = new Date();
  const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const initial = page.waitForResponse(r => r.url().includes('/admin/reports/sales'));
  await page.goto('/admin/reports');
  // opens on this month
  expect(new URL((await initial).url()).searchParams.get('from')).toBe(iso(firstOfMonth));
  await expect(page.getByTestId('sales-from')).toHaveValue(iso(firstOfMonth));
  await expect(page.getByTestId('sales-to')).toHaveValue(iso(today));

  // a range with no sales: says so
  await page.getByTestId('sales-from').fill('2020-01-01');
  const res = page.waitForResponse(r => r.url().includes('/admin/reports/sales') && r.url().includes('to=2020-01-31'));
  await page.getByTestId('sales-to').fill('2020-01-31');
  expect((await res).status()).toBe(200);
  await expect(page.getByText('No hay datos disponibles para este reporte.')).toBeVisible();

  // "Hasta" before "Desde": nothing is asked, and it says why
  await page.getByTestId('sales-from').fill('2020-02-15');
  await expect(page.getByText('debe ser igual o posterior')).toBeVisible();

  // a single day
  const single = page.waitForResponse(r => r.url().includes(`from=${iso(today)}&to=${iso(today)}`));
  await page.getByTestId('sales-to').fill(iso(today));
  await page.getByTestId('sales-from').fill(iso(today));
  expect((await single).status()).toBe(200);

  // the server labels the range it answered for
  const label = async (from: string, to: string) => (await (await request.get(`${API}/admin/reports/sales?from=${from}&to=${to}`,
    { headers: { Authorization: `Bearer ${await adminToken(request)}` } })).json()).data.period;
  expect(await label('2020-01-01', '2020-01-31')).toBe('Del 01/01/2020 al 31/01/2020');
  expect(await label(iso(today), iso(today))).toBe(dmy(today));

  // clicking anywhere on a date field opens the calendar (not only its small icon)
  await page.evaluate(() => {
    (window as any).__pickers = 0;
    HTMLInputElement.prototype.showPicker = function () { (window as any).__pickers++; };
  });
  await page.getByTestId('sales-from').click({ position: { x: 20, y: 10 } });
  expect(await page.evaluate(() => (window as any).__pickers)).toBe(1);

  // the shortcuts still fill the dates
  await page.getByRole('button', { name: 'Este año' }).click();
  await expect(page.getByTestId('sales-from')).toHaveValue(`${today.getFullYear()}-01-01`);
  await expect(page.getByTestId('sales-to')).toHaveValue(iso(today));
});
