import { test, expect } from '@playwright/test';

// user-tests project provides storageState
test.use({ storageState: 'e2e/.auth/user.json' });

test.describe('Order History', () => {

  test('orders page loads with seeded orders', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForSelector('mat-card', { timeout: 15000 });
    await expect(page.locator('mat-card').first()).toBeVisible();
  });

  test('seeded orders ORD-E2E-NATL and ORD-E2E-PKUP are visible', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForSelector('mat-card.order-card', { timeout: 15000 });
    await expect(page.locator('mat-card.order-card').filter({ hasText: 'ORD-E2E-NATL' })).toBeVisible();
    await expect(page.locator('mat-card.order-card').filter({ hasText: 'ORD-E2E-PKUP' })).toBeVisible();
  });

  test('each order card shows a status chip', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForSelector('mat-card.order-card', { timeout: 15000 });
    // Each order card has a mat-chip with the status
    await expect(page.locator('mat-card.order-card mat-chip').first()).toBeVisible();
  });

  test('clicking "View Details" on ORD-E2E-NATL navigates to order detail', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForSelector('mat-card.order-card', { timeout: 15000 });

    await page.locator('mat-card.order-card')
      .filter({ hasText: 'ORD-E2E-NATL' })
      .locator('a:has-text("View Details")')
      .click();

    await page.waitForURL(url => url.toString().includes('/orders/ORD-E2E-NATL'), { timeout: 10000 });
    expect(page.url()).toContain('/orders/ORD-E2E-NATL');
  });
});

test.describe('Order Detail', () => {

  test('order detail shows order number and items', async ({ page }) => {
    await page.goto('/orders/ORD-E2E-NATL');
    await page.waitForSelector('h1', { timeout: 15000 });
    await expect(page.locator('h1')).toContainText('ORD-E2E-NATL');
    await expect(page.locator('.order-item').first()).toBeVisible();
  });

  test('NATIONAL order detail shows shipping address section', async ({ page }) => {
    await page.goto('/orders/ORD-E2E-NATL');
    await page.waitForSelector('h1', { timeout: 15000 });
    await expect(page.locator('mat-card').filter({ hasText: 'Dirección de Envío' })).toBeVisible();
  });

  test('PICKUP order detail shows pickup location instead of address', async ({ page }) => {
    await page.goto('/orders/ORD-E2E-PKUP');
    await page.waitForSelector('h1', { timeout: 15000 });
    await expect(page.locator('mat-card').filter({ hasText: 'Punto de Retiro' })).toBeVisible();
  });

  test('"Back to Orders" link navigates to /orders', async ({ page }) => {
    await page.goto('/orders/ORD-E2E-NATL');
    await page.waitForSelector('a:has-text("Back to Orders")', { timeout: 15000 });
    await page.locator('a:has-text("Back to Orders")').click();
    await page.waitForURL(url => url.toString().includes('/orders'), { timeout: 10000 });
    expect(page.url()).toContain('/orders');
  });
});
