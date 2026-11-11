import { test, expect } from '@playwright/test';
import { TEST_ADMIN, loginAs } from './helpers/auth';
import { createProduct } from './helpers/purchase';

// Reportes → Sin stock: a row opens the product's edit form in Admin → Productos; its icon opens
// the product's store page in a new tab.

test('report rows lead to the product, in the admin and in the store', async ({ page, request }) => {
  const product = await createProduct(request, { name: `Agotado ${Date.now()}`, stock: 0 });

  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/reports');
  await page.getByRole('button', { name: 'Sin stock' }).click();

  const row = page.getByTestId(`report-row-${product.id}`);
  await expect(row).toContainText(product.name);
  await expect(page.getByTestId(`report-store-${product.id}`)).toHaveAttribute('href', `/products/${product.slug}`);

  // the store icon opens a new tab and leaves the report where it was
  const [tab] = await Promise.all([
    page.context().waitForEvent('page'),
    page.getByTestId(`report-store-${product.id}`).click(),
  ]);
  await expect(tab).toHaveURL(new RegExp(`/products/${product.slug}$`));
  await tab.close();
  await expect(page).toHaveURL(/\/admin\/reports$/);

  // the row opens its edit form
  await row.click();
  await expect(page).toHaveURL(/\/admin\/products$/);
  await expect(page.locator('[formControlName="name"]')).toHaveValue(product.name);
});
