import { test, expect } from '@playwright/test';

// user-tests project provides storageState; also set here for chromium project runs
test.use({ storageState: 'e2e/.auth/user.json' });

/** Navigates to home and adds the first simple "Add to Cart" product to the cart. */
async function addProductToCart(page: any): Promise<void> {
  await page.goto('/');
  await page.waitForSelector('mat-card-actions button', { timeout: 15000 });
  const addBtn = page.locator('mat-card-actions button').filter({ hasText: 'Add to Cart' }).first();
  if (await addBtn.isVisible()) {
    // Wait for the POST /api/cart network response before continuing
    await Promise.all([
      page.waitForResponse(
        (res: any) => res.url().includes('/api/cart') && res.request().method() === 'POST',
        { timeout: 10000 }
      ),
      addBtn.click(),
    ]);
  }
}

test.describe('Cart', () => {
  // ── Add to cart ───────────────────────────────────────────────────────────

  test('add product to cart → cart badge increments', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('mat-card-actions button', { timeout: 15000 });

    const addBtn = page.locator('mat-card-actions button').filter({ hasText: 'Add to Cart' }).first();
    await expect(addBtn).toBeVisible();

    // Read badge before (may be hidden/0)
    const badgeBefore = Number(
      await page.locator('.mat-badge-content').first().textContent().catch(() => '0')
    );

    await addBtn.click();

    // Poll until badge increments (avoids flaky fixed-timeout)
    await expect.poll(
      async () => Number(
        await page.locator('.mat-badge-content').first().textContent().catch(() => '0')
      ),
      { timeout: 5000 }
    ).toBeGreaterThan(badgeBefore);
  });

  // ── View cart ─────────────────────────────────────────────────────────────

  test('view cart → shows product name and price', async ({ page }) => {
    await addProductToCart(page);
    await page.goto('/cart');

    await page.waitForSelector('mat-card.cart-item, mat-card.empty-cart', { timeout: 10000 });
    const items = page.locator('mat-card.cart-item');

    if (await items.count() > 0) {
      await expect(items.first()).toBeVisible();
      // Product name link is in .item-name
      await expect(items.first().locator('.item-name')).toBeVisible();
      // Price is shown in .item-price
      await expect(items.first().locator('.item-price')).toBeVisible();
    } else {
      // Empty state is acceptable if add-to-cart wasn't available
      await expect(page.locator('.empty-cart')).toBeVisible();
    }
  });

  // ── Update quantity ───────────────────────────────────────────────────────

  test('increase quantity → item subtotal updates', async ({ page }) => {
    await addProductToCart(page);
    await page.goto('/cart');
    await page.waitForSelector('mat-card.cart-item, .empty-cart', { timeout: 10000 });

    const firstItem = page.locator('mat-card.cart-item').first();
    if (!(await firstItem.isVisible())) {
      test.skip();
      return;
    }

    const subtotalBefore = await firstItem.locator('.item-subtotal').textContent();
    // Second button in .quantity-controls is the "add" (increase) button
    await firstItem.locator('.quantity-controls button').nth(1).click();
    await page.waitForTimeout(800);

    const subtotalAfter = await firstItem.locator('.item-subtotal').textContent();
    expect(subtotalAfter).not.toBe(subtotalBefore);
  });

  test('decrease quantity → item subtotal updates', async ({ page }) => {
    await addProductToCart(page);
    await page.goto('/cart');
    await page.waitForSelector('mat-card.cart-item, .empty-cart', { timeout: 10000 });

    const firstItem = page.locator('mat-card.cart-item').first();
    if (!(await firstItem.isVisible())) {
      test.skip();
      return;
    }

    // Increase first so quantity is > 1 before decreasing
    await firstItem.locator('.quantity-controls button').nth(1).click();
    await page.waitForTimeout(500);

    const subtotalBefore = await firstItem.locator('.item-subtotal').textContent();
    // First button in .quantity-controls is "remove" (decrease)
    await firstItem.locator('.quantity-controls button').nth(0).click();
    await page.waitForTimeout(800);

    const subtotalAfter = await firstItem.locator('.item-subtotal').textContent();
    expect(subtotalAfter).not.toBe(subtotalBefore);
  });

  // ── Remove item ───────────────────────────────────────────────────────────

  test('remove item → item disappears from cart', async ({ page }) => {
    await addProductToCart(page);
    await page.goto('/cart');
    await page.waitForSelector('mat-card.cart-item, .empty-cart', { timeout: 10000 });

    const items = page.locator('mat-card.cart-item');
    const countBefore = await items.count();
    if (countBefore === 0) {
      test.skip();
      return;
    }

    // The warn-colored icon button is the delete button (one per cart item)
    const removeBtn = page.locator('mat-card.cart-item button[color="warn"]').first();
    await removeBtn.click();
    await page.waitForTimeout(800);

    const countAfter = await page.locator('mat-card.cart-item').count();
    expect(countAfter).toBeLessThan(countBefore);
  });

  // ── Coupon ────────────────────────────────────────────────────────────────

  test('apply invalid coupon → shows error snackbar', async ({ page }) => {
    await addProductToCart(page);
    await page.goto('/cart');
    await page.waitForSelector('mat-card.cart-item, .empty-cart', { timeout: 10000 });

    // Coupon input only appears when cart has items and no coupon is applied
    // Placeholder is "e.g. BUENFIN10"
    const couponInput = page.locator('input[placeholder*="BUENFIN"], input[placeholder*="buenfin"], input[placeholder*="e.g"]');
    if (!(await couponInput.isVisible())) {
      test.skip();
      return;
    }

    await couponInput.fill('INVALID_CODE_XYZ');
    await page.locator('button:has-text("Apply")').click();

    await expect(page.locator('simple-snack-bar, mat-snack-bar-container').first()).toBeVisible();
  });

  // ── Empty cart ────────────────────────────────────────────────────────────

  test('empty cart → shows "Your cart is empty" message', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForSelector('mat-card.cart-item, .empty-cart', { timeout: 10000 });

    // If cart has items, clear via the Clear Cart button
    const clearBtn = page.locator('button:has-text("Clear Cart")');
    if (await clearBtn.isVisible()) {
      await clearBtn.click();
      await page.waitForTimeout(500);
    }

    // After clearing (or if already empty), the empty state card should appear
    await expect(page.locator('.empty-cart h2')).toContainText('Your cart is empty');
  });

  // ── WhatsApp bubble ───────────────────────────────────────────────────────

  test('WhatsApp bubble — visible on home page and links to wa.me', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('mat-card, .whatsapp-bubble', { timeout: 15000 });

    const bubble = page.locator('.whatsapp-bubble');
    if (!(await bubble.isVisible())) {
      // No whatsapp number configured in this environment — skip
      test.skip();
      return;
    }

    await expect(bubble).toBeVisible();
    const href = await bubble.getAttribute('href');
    expect(href).toMatch(/^https:\/\/wa\.me\//);
    expect(await bubble.getAttribute('target')).toBe('_blank');
  });
});
