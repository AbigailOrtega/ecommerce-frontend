import { test, expect } from '@playwright/test';

test.describe('Product Detail', () => {

  test('product detail page loads for seeded product', async ({ page }) => {
    await page.goto('/products/test-t-shirt');
    await page.waitForSelector('h1', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('Test T-Shirt');
  });

  test('shows price and "Add to Cart" button', async ({ page }) => {
    await page.goto('/products/test-t-shirt');
    await page.waitForSelector('.price', { timeout: 15000 });
    await expect(page.locator('.price').first()).toBeVisible();
    await expect(page.locator('button.add-btn')).toBeVisible();
  });

  test('shows product description', async ({ page }) => {
    await page.goto('/products/test-t-shirt');
    await page.waitForSelector('.description', { timeout: 15000 });
    await expect(page.locator('.description')).toBeVisible();
  });

  test('clicking a product name link navigates to its detail page', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.product-card', { timeout: 15000 });
    // The card's navigation is on the <a class="product-name"> anchor, not the card itself
    await page.locator('.product-card a.product-name').first().click();
    await page.waitForURL(url => url.toString().includes('/products/'), { timeout: 10000 });
    expect(page.url()).toContain('/products/');
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });
  });

  test('"Add to Cart" shows snackbar prompting sign in for unauthenticated user', async ({ page }) => {
    await page.goto('/products/test-t-shirt');
    await page.waitForSelector('button.add-btn', { timeout: 15000 });
    await page.locator('button.add-btn').click();
    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toBeVisible({ timeout: 5000 });
  });
});
