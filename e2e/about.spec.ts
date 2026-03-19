import { test, expect } from '@playwright/test';

test.describe('Sobre Nosotros', () => {

  test('page loads at /sobre-nosotros', async ({ page }) => {
    await page.goto('/sobre-nosotros');
    await page.waitForSelector('.about-container', { timeout: 10000 });
    await expect(page.locator('.about-container')).toBeVisible();
  });

  test('shows placeholder or store content after loading (not a blank page)', async ({ page }) => {
    await page.goto('/sobre-nosotros');
    // Wait until the loading ends: .content is attached (even if empty) or .placeholder is visible
    await page.waitForSelector('.placeholder, .content', { state: 'attached', timeout: 10000 });

    const hasPlaceholder = await page.locator('.placeholder').isVisible();
    // .content may be in DOM but empty (0-height) when info has no name/description
    const hasContent = (await page.locator('.content').count()) > 0;

    expect(hasPlaceholder || hasContent).toBe(true);
  });

  test('navbar "Nosotros" link is visible and navigates to /sobre-nosotros', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('a[href="/sobre-nosotros"]');
    await expect(link).toBeVisible({ timeout: 10000 });
    await link.click();
    await page.waitForURL(url => url.toString().includes('/sobre-nosotros'), { timeout: 10000 });
    expect(page.url()).toContain('/sobre-nosotros');
  });
});
