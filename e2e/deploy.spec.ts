import { test, expect } from '@playwright/test';

// A page left open across a deploy asks for lazy chunks of the previous version, which are gone
// (404). The link must still work: the app loads the target page in full, on the new version.
test('a link still works when its code was removed by a deploy (stale chunk)', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Nosotros' }).first()).toBeVisible();

  // from now on, the first lazy chunk the page asks for is gone, as after a deploy
  let failed = false;
  await page.route(/\/chunk-[A-Za-z0-9]+\.js/, route => {
    if (failed) return route.continue();
    failed = true;
    return route.fulfill({ status: 404, body: 'Not found' });
  });

  await page.getByRole('link', { name: 'Nosotros' }).first().click();

  await expect(page).toHaveURL(/\/sobre-nosotros/);
  expect(failed).toBe(true);
  await expect(page.locator('.about-container')).toBeVisible();
});
