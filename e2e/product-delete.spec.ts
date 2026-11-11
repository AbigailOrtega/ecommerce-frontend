import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { API, adminToken, createProduct } from './helpers/purchase';

// Admin → Productos → delete: a product nobody ordered disappears; one with orders is deactivated
// (it used to fail with a 409 because the database keeps the orders' products).

test('deleting products from the admin', async ({ page, request }) => {
  const fresh = await createProduct(request, { name: `Borrable ${Date.now()}` });
  const sold = await createProduct(request, { name: `Vendido ${Date.now()}` });
  const order = await request.post(`${API}/orders/guest`, { data: {
    guestFirstName: 'Rosa', guestLastName: 'Díaz', guestEmail: `rosa${Date.now()}@example.com`,
    items: [{ productId: sold.id, quantity: 1 }], paymentMethod: 'COD', shippingType: 'NATIONAL',
    shippingAddress: 'Calle 5 #10', shippingCity: 'Puebla', shippingState: 'Puebla', shippingZipCode: '72000', shippingCountry: 'MX',
  } });
  expect(order.status(), await order.text()).toBe(201);

  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  page.on('dialog', d => d.accept());
  // the admin table shows 20 per page in no set order, and CI has many products: ask for all of
  // them so the two new ones are on screen
  await page.route('**/api/admin/products?*', route => {
    const url = new URL(route.request().url());
    url.searchParams.set('size', '1000');
    return route.continue({ url: url.toString() });
  });
  const productGet = async (id: number) => (await request.get(`${API}/products/${id}`,
    { headers: { Authorization: `Bearer ${await adminToken(request)}` } }));

  for (const [p, message] of [[fresh, 'Producto eliminado'], [sold, 'este producto tiene órdenes asociadas']] as const) {
    await page.goto('/admin/products');
    await page.getByTestId(`delete-product-${p.id}`).click();
    await expect(page.locator('mat-snack-bar-container')).toContainText(message);
  }

  expect((await productGet(fresh.id)).status()).toBe(404);
  expect((await (await productGet(sold.id)).json()).data.active).toBe(false);
});
