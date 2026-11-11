import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { API, adminToken, createProduct } from './helpers/purchase';

// Admin → Productos: the garment cost is entered in the product form, only the admin sees it, and
// the store never receives it.

test('the garment cost: entered in the product form, never shown to customers', async ({ page, request }) => {
  const product = await createProduct(request, { name: `Costeada ${Date.now()}`, price: 300 });

  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto(`/admin/products?edit=${product.id}`);
  const cost = page.getByTestId('product-cost');
  await expect(page.locator('[formControlName="name"]')).toHaveValue(product.name);
  await cost.fill('180');
  await expect(page.getByText('Ganancia por prenda')).toContainText('40 %');
  await page.locator('button').filter({ hasText: 'Actualizar' }).click();
  await expect(page.locator('mat-snack-bar-container')).toContainText('Costo guardado');

  // the admin's list has it
  const costs = await (await request.get(`${API}/admin/reports/product-costs`,
    { headers: { Authorization: `Bearer ${await adminToken(request)}` } })).json();
  expect(costs.data.find((c: any) => c.id === product.id).costPrice).toBe(180);

  // reopening the form shows it
  await page.goto(`/admin/products?edit=${product.id}`);
  await expect(page.getByTestId('product-cost')).toHaveValue('180');

  // the store's answers never carry it
  for (const url of [`${API}/products/${product.id}`, `${API}/products/slug/${product.slug}`]) {
    expect(await (await request.get(url)).text()).not.toMatch(/costPrice|unitCost|\b180(\.0+)?\b/);
  }
  expect(await (await request.get(`${API}/products?size=100`)).text()).not.toMatch(/costPrice|unitCost/);
});
