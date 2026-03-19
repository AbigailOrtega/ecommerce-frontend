import { test, expect } from '@playwright/test';

// user-tests project provides storageState
test.use({ storageState: 'e2e/.auth/user.json' });

test.describe('User Profile', () => {

  test('profile page loads with user name and email', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForSelector('mat-card', { timeout: 10000 });

    // h2 contains the user's full name
    await expect(page.locator('mat-card h2').first()).toBeVisible();
    // email appears in the profile header paragraph
    await expect(page.locator('.profile-header p').first()).toBeVisible();
  });

  test('profile page shows email in the list', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForSelector('mat-list', { timeout: 10000 });

    // mat-list-item with "Email" title
    await expect(page.locator('mat-list-item').filter({ hasText: 'Email' })).toBeVisible();
  });

  test('profile page shows user role', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForSelector('mat-list', { timeout: 10000 });

    await expect(page.locator('mat-list-item').filter({ hasText: 'Role' })).toBeVisible();
  });

  test('"View Orders" button navigates to /orders', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForSelector('.profile-actions', { timeout: 10000 });

    await page.locator('a[mat-raised-button]:has-text("View Orders")').click();
    await page.waitForURL(url => url.toString().includes('/orders'), { timeout: 10000 });
    expect(page.url()).toContain('/orders');
  });

  test('logout button clears token and redirects to /login', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForSelector('.profile-actions', { timeout: 10000 });

    await page.locator('button:has-text("Logout")').click();

    await page.waitForURL(url => url.toString().includes('/login'), { timeout: 10000 });
    const token = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(token).toBeNull();
  });
});
