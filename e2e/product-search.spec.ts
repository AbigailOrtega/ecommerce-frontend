import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { API, adminToken } from './helpers/purchase';

// Admin → Productos: search by name or SKU, price range, active / inactive and category.

test('searching the admin product list', async ({ page, request }) => {
  const tag = `Bq${Date.now()}`;
  const headers = { Authorization: `Bearer ${await adminToken(request)}` };
  const cat = await request.post(`${API}/categories`, { headers, data: { name: `Faldas ${tag}` } });
  expect(cat.ok(), await cat.text()).toBeTruthy();
  const faldas = (await cat.json()).data.id;
  for (const [name, sku, price, active, categoryIds] of [
    [`Vestido ${tag}`, `VES-${tag}`, 139, true, []], [`Sweater ${tag}`, `SWE-${tag}`, 100, false, []],
    [`Falda ${tag}`, `FAL-${tag}`, 199, true, [faldas]],
  ] as const) {
    const res = await request.post(`${API}/products`, { headers, data: { name, sku, price, stockQuantity: 2, active, categoryIds } });
    expect(res.ok(), await res.text()).toBeTruthy();
  }

  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/products');
  const rows = page.locator('tr.mat-mdc-row');

  await page.getByTestId('filter-q').fill(tag.toLowerCase());
  await expect(rows).toHaveCount(3);

  await page.getByTestId('filter-q').fill(`swe-${tag}`);              // by SKU
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText(`Sweater ${tag}`);

  await page.getByTestId('filter-q').fill(tag);
  await page.getByTestId('filter-min').fill('120');
  await expect(rows).toHaveCount(2);

  await page.getByTestId('filter-active').click();
  await page.getByRole('option', { name: 'Inactivos' }).click();
  await expect(page.getByTestId('no-products')).toHaveText('Ningún producto coincide con la búsqueda.');

  await page.getByTestId('filter-min').fill('');
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText(`Sweater ${tag}`);

  // by category (with the text, so only this test's products count)
  await page.getByTestId('filter-active').click();
  await page.getByRole('option', { name: 'Todos' }).click();
  await page.getByTestId('filter-category').click();
  await page.getByRole('option', { name: `Faldas ${tag}` }).click();
  await expect(rows).toHaveCount(1);
  await expect(rows.first()).toContainText(`Falda ${tag}`);

  await page.getByTestId('filter-clear').click();
  await expect(page.getByTestId('filter-category')).toContainText('Todas');
  await expect(page.getByTestId('filter-q')).toHaveValue('');
  await expect(rows.first()).toBeVisible();
});
