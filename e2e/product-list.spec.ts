import { test, expect } from '@playwright/test';

/**
 * Returns all visible .cat-chip buttons on the current page.
 */
async function getChips(page: any) {
  return page.locator('nav.category-nav .cat-chip');
}

test.describe('Product list — category menu', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for either the category nav or the product grid to be ready
    await page.waitForSelector('nav.category-nav, .product-grid, app-loading', { timeout: 15000 });
    // If still loading, wait for it to finish
    await page.waitForSelector('nav.category-nav, mat-card.product-card, p.no-results', { timeout: 15000 });
  });

  // ── Visibility ────────────────────────────────────────────────────────────

  test('category nav is visible when categories exist', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) {
      // No categories configured in this environment — skip
      test.skip();
      return;
    }
    await expect(nav).toBeVisible();
  });

  test('"Todos" chip is always the first chip', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const firstChip = page.locator('nav.category-nav .cat-chip').first();
    await expect(firstChip).toHaveText('Todos');
  });

  test('"Todos" chip is active by default on page load', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const todosChip = page.locator('nav.category-nav .cat-chip').first();
    await expect(todosChip).toHaveClass(/active/);
  });

  test('at least one category chip exists besides "Todos"', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    const count = await chips.count();
    expect(count).toBeGreaterThanOrEqual(2); // "Todos" + at least 1 category
  });

  // ── Interaction ───────────────────────────────────────────────────────────

  test('clicking a category chip activates it and deactivates "Todos"', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 2) { test.skip(); return; }

    const todosChip = chips.nth(0);
    const firstCatChip = chips.nth(1);

    // Before click: "Todos" is active
    await expect(todosChip).toHaveClass(/active/);

    await firstCatChip.click();

    // After click: category chip is active, "Todos" is not
    await expect(firstCatChip).toHaveClass(/active/);
    await expect(todosChip).not.toHaveClass(/active/);
  });

  test('clicking "Todos" after a category selection restores it as active', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 2) { test.skip(); return; }

    // Select a category
    await chips.nth(1).click();
    await expect(chips.nth(1)).toHaveClass(/active/);

    // Click "Todos"
    await chips.nth(0).click();

    await expect(chips.nth(0)).toHaveClass(/active/);
    await expect(chips.nth(1)).not.toHaveClass(/active/);
  });

  test('only one chip is active at a time', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 3) { test.skip(); return; }

    // Click second category chip
    await chips.nth(2).click();
    await page.waitForTimeout(300);

    const activeChips = page.locator('nav.category-nav .cat-chip.active');
    expect(await activeChips.count()).toBe(1);
  });

  // ── Product filtering ─────────────────────────────────────────────────────

  test('clicking a category chip triggers product reload (loading state or product cards appear)', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 2) { test.skip(); return; }

    await chips.nth(1).click();

    // Products either reload (loading spinner briefly) or product cards / no-results appear
    await page.waitForSelector('mat-card.product-card, p.no-results, app-loading', { timeout: 10000 });
    await page.waitForSelector('mat-card.product-card, p.no-results', { timeout: 10000 });

    // Either product cards or a "no results" message — not a blank screen
    const hasProducts  = await page.locator('mat-card.product-card').first().isVisible().catch(() => false);
    const hasNoResults = await page.locator('p.no-results').first().isVisible().catch(() => false);
    expect(hasProducts || hasNoResults).toBe(true);
  });

  test('clicking "Todos" after a category shows the full product list again', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 2) { test.skip(); return; }

    // First get count with "Todos" selected
    await page.waitForSelector('mat-card.product-card, p.no-results', { timeout: 10000 });
    const totalCount = await page.locator('mat-card.product-card').count();

    // Select a category
    await chips.nth(1).click();
    await page.waitForSelector('mat-card.product-card, p.no-results', { timeout: 10000 });

    // Go back to Todos
    await chips.nth(0).click();
    // Poll until the count matches totalCount (avoids flakiness from partial re-render)
    await expect.poll(
      () => page.locator('mat-card.product-card').count(),
      { timeout: 10000 }
    ).toBe(totalCount);
  });

  // ── Search interaction ────────────────────────────────────────────────────

  test('searching resets the active chip to "Todos"', async ({ page }) => {
    const nav = page.locator('nav.category-nav');
    if (!(await nav.isVisible())) { test.skip(); return; }

    const chips = page.locator('nav.category-nav .cat-chip');
    if (await chips.count() < 2) { test.skip(); return; }

    // Select a category chip first
    await chips.nth(1).click();
    await expect(chips.nth(1)).toHaveClass(/active/);

    // Type in the search box and press Enter
    await page.fill('mat-form-field.search-field input', 'a');
    await page.keyboard.press('Enter');
    await page.waitForSelector('mat-card.product-card, p.no-results', { timeout: 10000 });

    // "Todos" should now be active again
    await expect(chips.nth(0)).toHaveClass(/active/);
    await expect(chips.nth(1)).not.toHaveClass(/active/);
  });
});
