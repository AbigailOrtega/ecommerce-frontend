import { test, expect, Page } from '@playwright/test';

// user-tests project provides storageState
test.use({ storageState: 'e2e/.auth/user.json' });

/** Adds the first available product to the cart via the UI. */
async function ensureCartHasItems(page: Page): Promise<void> {
  await page.goto('/');
  await page.waitForSelector('mat-card-actions button', { timeout: 15000 });
  const addBtn = page.locator('mat-card-actions button').filter({ hasText: 'Add to Cart' }).first();
  if (await addBtn.isVisible()) {
    await addBtn.click();
    await page.waitForTimeout(1000);
  }
}

test.describe('Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await ensureCartHasItems(page);
  });

  // ── Step 1: Shipping type selection ──────────────────────────────────────

  test('Step 1 — shipping type cards visible; selecting NATIONAL enables Continuar', async ({ page }) => {
    await page.goto('/checkout');
    // Wait for shipping config to load
    await page.waitForSelector('.type-card, .hint', { timeout: 15000 });

    const nationalCard = page.locator('.type-card').filter({ hasText: 'Envío Nacional' });
    const continueBtn  = page.locator('button:has-text("Continuar")').first();

    await expect(nationalCard).toBeVisible();
    // Before selecting any option the Continue button is disabled
    await expect(continueBtn).toBeDisabled();

    await nationalCard.click();
    await expect(continueBtn).toBeEnabled();
  });

  // ── Step 2: National shipping — address form ──────────────────────────────

  test('Step 2 (National) — address form fields are visible and Continue disabled until filled', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForSelector('.type-card', { timeout: 15000 });

    await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
    await page.locator('button:has-text("Continuar")').first().click();

    // All address fields must be present
    await expect(page.locator('[formControlName="shippingAddress"]')).toBeVisible();
    await expect(page.locator('[formControlName="shippingCity"]')).toBeVisible();
    await expect(page.locator('[formControlName="shippingState"]')).toBeVisible();
    await expect(page.locator('[formControlName="shippingZipCode"]')).toBeVisible();
    await expect(page.locator('[formControlName="shippingCountry"]')).toBeVisible();

    // "Continuar al Pago" is disabled because shippingRates haven't been fetched yet
    const nextBtn = page.locator('button:has-text("Continuar al Pago")').first();
    await expect(nextBtn).toBeDisabled();
  });

  test('"Ver opciones de envío" button is present once address fields are filled', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForSelector('.type-card', { timeout: 15000 });

    await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
    await page.locator('button:has-text("Continuar")').first().click();

    await page.fill('[formControlName="shippingAddress"]', 'Calle Falsa 123');
    await page.fill('[formControlName="shippingCity"]',    'CDMX');
    await page.fill('[formControlName="shippingCountry"]', 'MX');

    const calcBtn = page.locator('button:has-text("Ver opciones de envío")');
    await expect(calcBtn).toBeVisible();
    await expect(calcBtn).toBeEnabled();
  });

  // ── Step 2: Pickup flow ───────────────────────────────────────────────────

  test('Step 2 (Pickup) — pickup location select is shown', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForSelector('.type-card', { timeout: 15000 });

    const pickupCard = page.locator('.type-card').filter({ hasText: 'Pick Up' });
    if (!(await pickupCard.isVisible())) {
      test.skip();
      return;
    }

    await pickupCard.click();
    await page.locator('button:has-text("Continuar")').first().click();

    await expect(page.locator('[formControlName="pickupLocationId"]')).toBeVisible();
  });

  // ── Step 4: Payment options ───────────────────────────────────────────────

  test('Payment step — all payment method radio buttons are visible', async ({ page }) => {
    await page.goto('/checkout');
    await page.waitForSelector('.type-card', { timeout: 15000 });

    // Navigate through step 1 (select NATIONAL)
    await page.locator('.type-card').filter({ hasText: 'Envío Nacional' }).click();
    await page.locator('button:has-text("Continuar")').first().click();

    // Step 2: fill address and calculate shipping
    await page.fill('[formControlName="shippingAddress"]', 'Calle Falsa 123');
    await page.fill('[formControlName="shippingCity"]',    'CDMX');
    await page.fill('[formControlName="shippingCountry"]', 'MX');

    await page.locator('button:has-text("Ver opciones de envío")').click();
    // Wait up to 8s for shipping result (success or error)
    await page.waitForTimeout(4000);

    const continueToPay = page.locator('button:has-text("Continuar al Pago")').first();
    if (!(await continueToPay.isEnabled())) {
      // Shipping calculation failed (no Maps API key in e2e) — skip rest of flow
      test.skip();
      return;
    }

    // Step 2 → Step 3 (Review)
    await continueToPay.click();
    // Wait for step 3 (Review) content to appear before clicking its "Continuar al Pago"
    await page.locator('mat-card.order-summary').waitFor({ state: 'visible', timeout: 10000 });
    // Step 2's button (nth 0) is now hidden; step 3's button is nth 1
    await page.locator('button:has-text("Continuar al Pago")').nth(1).click();

    // Both payment options should be visible
    await expect(page.locator('mat-radio-button:has-text("Stripe"), mat-radio-button:has-text("crédito")')).toBeVisible();
    await expect(page.locator('mat-radio-button:has-text("PayPal")')).toBeVisible();
  });

});
