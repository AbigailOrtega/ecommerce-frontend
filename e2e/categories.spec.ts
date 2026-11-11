import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { API, adminToken } from './helpers/purchase';

// Categories: one hidden in Admin → Categorías leaves the store (filters and product labels) while
// its products stay on sale; Reportes → Por categoría counts what each category sold.

test.describe.configure({ timeout: 90_000 });

test('hiding a category, and the sales report by category', async ({ page, request }) => {
  const tag = `${Date.now()}`;
  const headers = { Authorization: `Bearer ${await adminToken(request)}` };
  const newCategory = async (name: string) => (await (await request.post(`${API}/categories`, { headers, data: { name } })).json()).data;
  const camisas = await newCategory(`Camisas ${tag}`);
  const bodega = await newCategory(`Bodega ${tag}`);
  const res = await request.post(`${API}/products`, { headers, data: {
    name: `Camisa ${tag}`, price: 250, stockQuantity: 10, active: true, categoryIds: [bodega.id, camisas.id] } });
  expect(res.ok(), await res.text()).toBeTruthy();
  const product = (await res.json()).data;

  // a paid sale of 2
  const order = await request.post(`${API}/orders/guest`, { data: {
    guestFirstName: 'Rosa', guestLastName: 'Díaz', guestEmail: `rosa${tag}@example.com`,
    items: [{ productId: product.id, quantity: 2 }], paymentMethod: 'COD', shippingType: 'NATIONAL',
    shippingAddress: 'Calle 5 #10', shippingCity: 'Puebla', shippingState: 'Puebla', shippingZipCode: '72000', shippingCountry: 'MX',
  } });
  expect(order.status(), await order.text()).toBe(201);
  const orderId = (await order.json()).data.id;
  expect((await request.put(`${API}/admin/orders/${orderId}/status`, { headers, data: { status: 'CONFIRMED' } })).ok()).toBeTruthy();

  // the admin hides "Bodega"
  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/categories');
  const toggle = page.getByTestId(`category-visible-${bodega.id}`);
  await expect(toggle).toContainText('Visible');
  await toggle.locator('button').click();
  await expect(page.locator('mat-snack-bar-container')).toContainText('se ocultó de la tienda');
  await expect(toggle).toContainText('Oculta');

  // the store no longer shows it; the product is still there, labelled with its visible category
  await page.goto('/products/' + product.slug);
  await expect(page.locator('.breadcrumbs')).toContainText(`Camisas ${tag}`);
  await expect(page.locator('.breadcrumbs')).not.toContainText(`Bodega ${tag}`);
  const storeCats = await (await request.get(`${API}/categories`)).json();
  expect(storeCats.data.map((c: any) => c.name)).not.toContain(`Bodega ${tag}`);

  // the report by category, today: 2 shirts, also counted in the hidden category
  await page.goto('/admin/reports');
  await page.getByTestId('report-categories').click();
  const today = new Date();
  const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  await page.getByTestId('sales-from').fill(iso);
  await expect(page.getByTestId(`category-row-${camisas.id}`)).toContainText('2');
  await expect(page.getByTestId(`category-row-${camisas.id}`)).toContainText('$500.00');
  await expect(page.getByTestId(`category-row-${bodega.id}`)).toContainText(`Bodega ${tag} (oculta)`);

  // a row opens Productos filtered by the category
  await page.getByTestId(`category-row-${camisas.id}`).click();
  await expect(page).toHaveURL(new RegExp(`/admin/products\\?category=${camisas.id}`));
  await expect(page.locator('tr.mat-mdc-row')).toHaveCount(1);
  await expect(page.locator('tr.mat-mdc-row').first()).toContainText(`Camisa ${tag}`);
});
