import { test, expect } from '@playwright/test';

// admin-tests project provides storageState
test.use({ storageState: 'e2e/.auth/admin.json' });

test.describe('Admin panel', () => {
  // ── Dashboard ─────────────────────────────────────────────────────────────

  test('admin can access dashboard at /admin', async ({ page }) => {
    await page.goto('/admin');
    // adminGuard allows admin through; DashboardComponent renders h1
    await expect(page.locator('h1:has-text("Admin Dashboard")')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL(/\/admin/);
  });

  test('dashboard — stat cards are visible', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForSelector('.stat-card, app-loading', { timeout: 15000 });

    // Wait for loading to finish
    await page.waitForSelector('.stat-card', { timeout: 15000 });
    const cards = page.locator('.stat-card');
    await expect(cards.first()).toBeVisible();
    // Should have at least 1 stat card (orders, products, users, revenue)
    expect(await cards.count()).toBeGreaterThanOrEqual(1);
  });

  test('dashboard — navigation links to admin sections are visible', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForSelector('.admin-nav', { timeout: 10000 });

    await expect(page.locator('.admin-nav a:has-text("Orders")')).toBeVisible();
    await expect(page.locator('.admin-nav a:has-text("Products")')).toBeVisible();
    await expect(page.locator('.admin-nav a:has-text("Users")')).toBeVisible();
  });

  // ── Orders list ───────────────────────────────────────────────────────────

  test('orders list — page loads with table or empty state', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForSelector('table.order-table, p.empty-state, app-loading', { timeout: 15000 });

    // Wait for loading to finish
    await page.waitForSelector('table.order-table, p.empty-state', { timeout: 15000 });

    const table     = page.locator('table.order-table');
    const emptyMsg  = page.locator('p.empty-state');
    const hasTable  = await table.isVisible();
    const hasEmpty  = await emptyMsg.isVisible();

    expect(hasTable || hasEmpty).toBe(true);
  });

  test('orders list — column headers are visible when orders exist', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForSelector('table.order-table, p.empty-state', { timeout: 15000 });

    if (!(await page.locator('table.order-table').isVisible())) {
      test.skip();
      return;
    }

    // Table should have header cells
    await expect(page.locator('th[mat-header-cell]:has-text("Order #")')).toBeVisible();
    await expect(page.locator('th[mat-header-cell]:has-text("Customer")')).toBeVisible();
    await expect(page.locator('th[mat-header-cell]:has-text("Status")')).toBeVisible();
  });

  test('order row — clicking a row shows expandable detail panel with status select', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForSelector('table.order-table, p.empty-state', { timeout: 15000 });

    if (!(await page.locator('table.order-table').isVisible())) {
      test.skip();
      return;
    }

    // Click the first main row to expand it
    const firstRow = page.locator('tr.main-row').first();
    await firstRow.waitFor();
    await firstRow.click();

    // Status select is in the status column (visible in the row, not the expanded panel)
    await expect(page.locator('mat-select.status-select').first()).toBeVisible();
  });

  // ── Skydropx ─────────────────────────────────────────────────────────────

  test('Skydropx — "Cotizar con Skydropx" button present on NATIONAL orders', async ({ page }) => {
    await page.goto('/admin/orders');
    await page.waitForSelector('table.order-table, p.empty-state', { timeout: 15000 });

    // Look for the seeded NATIONAL order row (shippingType not shown in columns,
    // so filter by the known seeded order number)
    const nationalRow = page.locator('tr.main-row').filter({ hasText: 'ORD-E2E-NATL' }).first();
    if (!(await nationalRow.isVisible())) {
      test.skip();
      return;
    }

    await nationalRow.click();
    // The Skydropx quote button appears in the expanded panel
    await expect(page.locator('button:has-text("Cotizar con Skydropx")')).toBeVisible();
  });

  // ── Shipping config ───────────────────────────────────────────────────────

  test('shipping config — toggle switches and form fields are visible', async ({ page }) => {
    await page.goto('/admin/shipping');
    await page.waitForSelector('mat-slide-toggle, .hint', { timeout: 15000 });

    // Toggle switches for pickup / skydropx sandbox
    await expect(page.locator('mat-slide-toggle').first()).toBeVisible();

    // Skydropx credentials field
    await expect(page.locator('[formControlName="skydropxClientId"]')).toBeVisible();

    // WhatsApp number field
    await expect(page.locator('[formControlName="whatsappNumber"]')).toBeVisible();

    // Save button
    await expect(page.locator('button[type="submit"]:has-text("Guardar configuración")')).toBeVisible();
  });

  // ── Pickup locations ──────────────────────────────────────────────────────

  test('pickup locations — can add a new location and it appears in the list', async ({ page }) => {
    await page.goto('/admin/shipping');
    await page.waitForSelector('button:has-text("Agregar Punto")', { timeout: 15000 });

    const initialCount = await page.locator('.location-item').count();

    // Open the add location form
    await page.locator('button:has-text("Agregar Punto")').click();

    // Fill out the inline form
    const stamp = Date.now();
    await page.fill('[formControlName="name"]',    `Test Location ${stamp}`);
    await page.fill('[formControlName="address"]', `Calle Test ${stamp}`);
    await page.fill('[formControlName="city"]',    'CDMX');
    await page.fill('[formControlName="state"]',   'CDMX');

    // Scope to the inline location form to avoid matching "Guardar configuración"
    await page.locator('mat-card.inline-form button[type="submit"]').click();
    await page.waitForTimeout(1000);

    const newCount = await page.locator('.location-item').count();
    expect(newCount).toBeGreaterThan(initialCount);
  });

  test('pickup location — toggle active/inactive works', async ({ page }) => {
    await page.goto('/admin/shipping');
    await page.waitForSelector('.location-item, p.empty', { timeout: 15000 });

    const locations = page.locator('.location-item');
    if (await locations.count() === 0) {
      test.skip();
      return;
    }

    // Each location item has a mat-slide-toggle in .location-actions
    // MDC-based mat-slide-toggle renders button[role="switch"], not a plain input
    const toggle = page.locator('.location-actions mat-slide-toggle button[role="switch"]').first();
    await expect(toggle).toBeVisible();

    const wasChecked = (await toggle.getAttribute('aria-checked')) === 'true';
    await toggle.click();
    await page.waitForTimeout(500);

    // The toggle state should have flipped
    const isChecked = (await toggle.getAttribute('aria-checked')) === 'true';
    expect(isChecked).toBe(!wasChecked);
  });
});

// ── Products management ───────────────────────────────────────────────────────

test.describe('Admin › Products', () => {

  test('products page loads with table and "Add Product" button', async ({ page }) => {
    await page.goto('/admin/products');
    await page.waitForSelector('button, table', { timeout: 15000 });
    await expect(page.locator('button').filter({ hasText: 'Add Product' })).toBeVisible();
  });

  test('can open and cancel the create product form', async ({ page }) => {
    await page.goto('/admin/products');
    const addBtn = page.locator('button').filter({ hasText: 'Add Product' });
    await addBtn.waitFor({ timeout: 10000 });
    await addBtn.click();

    await expect(page.locator('[formControlName="name"]')).toBeVisible();
    await expect(page.locator('[formControlName="price"]')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Create' })).toBeVisible();

    await page.locator('button').filter({ hasText: 'Cancel' }).click();
    await expect(page.locator('[formControlName="name"]')).not.toBeVisible();
  });

  test('can create a new product', async ({ page }) => {
    await page.goto('/admin/products');
    await page.locator('button').filter({ hasText: 'Add Product' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Add Product' }).click();

    await page.fill('[formControlName="name"]', 'E2E Test Product');
    await page.fill('[formControlName="sku"]',  `E2E-${Date.now()}`);
    await page.fill('[formControlName="price"]', '25.00');
    // stockQuantity is shown when no colors are added
    const stockField = page.locator('[formControlName="stockQuantity"]');
    if (await stockField.isVisible()) await stockField.fill('10');

    await page.locator('button[type="submit"]').filter({ hasText: 'Create' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('created', { timeout: 10000 });
  });

  test('can edit a seeded product', async ({ page }) => {
    await page.goto('/admin/products');
    // Wait for at least one table row
    await page.waitForSelector('td.mat-mdc-cell, td[mat-cell]', { timeout: 15000 });

    // Click the first edit button
    await page.locator('button').filter({ has: page.locator('mat-icon', { hasText: 'edit' }) }).first().click();
    await page.waitForSelector('[formControlName="name"]', { timeout: 5000 });

    // Update the name
    const nameInput = page.locator('[formControlName="name"]');
    await nameInput.clear();
    await nameInput.fill('Updated Product');
    await page.locator('button[type="submit"]').filter({ hasText: 'Update' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('updated', { timeout: 10000 });
  });
});

// ── Coupons ───────────────────────────────────────────────────────────────────

test.describe('Admin › Coupons', () => {

  test('coupons page loads with form and table', async ({ page }) => {
    await page.goto('/admin/coupons');
    await page.waitForSelector('.form-card, table', { timeout: 15000 });
    // Form card is always visible at the top
    await expect(page.locator('.form-card')).toBeVisible();
    // Save / Create button
    await expect(page.locator('button').filter({ hasText: /Create|Save/ })).toBeVisible();
  });

  test('can create a coupon', async ({ page }) => {
    await page.goto('/admin/coupons');
    await page.waitForSelector('.form-card', { timeout: 10000 });

    const code = `TESTE2E${Date.now().toString().slice(-4)}`;

    // Code field uses [(ngModel)] — target by label text
    await page.locator('mat-form-field').filter({ hasText: 'Code' }).locator('input').fill(code);
    await page.locator('mat-form-field').filter({ hasText: 'Discount' }).locator('input').fill('15');
    // Expires At — date input
    await page.locator('mat-form-field').filter({ hasText: 'Expires' }).locator('input[type="date"]').fill('2027-12-31');

    await page.locator('button').filter({ hasText: /Create|Save/ }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('created', { timeout: 10000 });
  });

  test('can toggle a coupon active/inactive', async ({ page }) => {
    await page.goto('/admin/coupons');
    await page.waitForSelector('table, .empty', { timeout: 15000 });

    const toggle = page.locator('table mat-slide-toggle button[role="switch"]').first();
    if (!(await toggle.isVisible())) { test.skip(); return; }

    const wasCheked = (await toggle.getAttribute('aria-checked')) === 'true';
    await toggle.click();
    await page.waitForTimeout(500);
    const isChecked = (await toggle.getAttribute('aria-checked')) === 'true';
    expect(isChecked).toBe(!wasCheked);
  });

  test('can delete a coupon', async ({ page }) => {
    await page.goto('/admin/coupons');
    await page.waitForSelector('table, .empty', { timeout: 15000 });

    const deleteBtn = page.locator('button[color="warn"]').filter({
      has: page.locator('mat-icon', { hasText: 'delete' }),
    }).first();
    if (!(await deleteBtn.isVisible())) { test.skip(); return; }

    const rowsBefore = await page.locator('table tbody tr').count();

    // Accept the browser confirm() dialog
    page.once('dialog', dialog => dialog.accept());
    await deleteBtn.click();
    await page.waitForTimeout(800);

    const rowsAfter = await page.locator('table tbody tr').count();
    expect(rowsAfter).toBeLessThan(rowsBefore);
  });
});

// ── Promotions ────────────────────────────────────────────────────────────────

test.describe('Admin › Promotions', () => {

  test('promotions page loads with "Add Promotion" button', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.waitForSelector('button, table', { timeout: 15000 });
    await expect(page.locator('button').filter({ hasText: 'Add Promotion' })).toBeVisible();
  });

  test('can open and cancel the create promotion form', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.locator('button').filter({ hasText: 'Add Promotion' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Add Promotion' }).click();

    await expect(page.locator('[formControlName="name"]')).toBeVisible();
    await expect(page.locator('[formControlName="discountPercent"]')).toBeVisible();

    // Scope to the form to avoid matching the toggle button which also reads "Cancel"
    await page.locator('form').getByRole('button', { name: 'Cancel' }).click();
    await expect(page.locator('[formControlName="name"]')).not.toBeVisible();
  });

  test('can create a promotion', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.locator('button').filter({ hasText: 'Add Promotion' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Add Promotion' }).click();

    await page.fill('[formControlName="name"]',            'E2E Promo');
    await page.fill('[formControlName="discountPercent"]', '10');
    await page.fill('[formControlName="startDate"]',       '2026-04-01');
    await page.fill('[formControlName="endDate"]',         '2027-04-01');

    // productIds is required (minLength 1) — wait for products to load then select one
    const productSelect = page.locator('mat-select[formControlName="productIds"]');
    await productSelect.waitFor({ timeout: 10000 });
    await productSelect.click();
    // Wait for the options panel to populate (products loaded asynchronously)
    await page.locator('mat-option').first().waitFor({ timeout: 10000 });
    await page.locator('mat-option').first().click();
    await page.keyboard.press('Escape');

    await page.locator('button[type="submit"]').filter({ hasText: 'Save' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('saved', { timeout: 10000 });
  });

  test('can toggle a promotion active/inactive', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.waitForSelector('.promo-table, .no-data', { timeout: 15000 });

    // Toggle button uses mat-icon toggle_on / toggle_off
    const toggleBtn = page.locator('button').filter({
      has: page.locator('mat-icon', { hasText: /toggle_on|toggle_off/ }),
    }).first();
    if (!(await toggleBtn.isVisible())) { test.skip(); return; }

    const iconBefore = await toggleBtn.locator('mat-icon').textContent();
    const wasOn = iconBefore?.trim() === 'toggle_on';
    await toggleBtn.click();
    // Verify the API call succeeded: snackbar says "activated" or "deactivated"
    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText(wasOn ? 'deactivated' : 'activated', { timeout: 5000 });
  });
});

// ── Store Info ────────────────────────────────────────────────────────────────

test.describe('Admin › Store Info', () => {

  test('store-info page loads with text form fields', async ({ page }) => {
    await page.goto('/admin/store-info');
    await page.waitForSelector('mat-card', { timeout: 15000 });

    // Form fields for store name and phone
    await expect(page.locator('mat-form-field').filter({ hasText: 'Nombre de la tienda' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'Teléfono' })).toBeVisible();

    // Save and upload buttons
    await expect(page.locator('button:has-text("Guardar información")')).toBeVisible();
    await expect(page.locator('button:has-text("Subir imagen")')).toBeVisible();
  });

  test('description, mission and vision fields are visible', async ({ page }) => {
    await page.goto('/admin/store-info');
    await page.waitForSelector('mat-card', { timeout: 15000 });

    await expect(page.locator('mat-form-field').filter({ hasText: 'Descripción' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'Misión' })).toBeVisible();
    await expect(page.locator('mat-form-field').filter({ hasText: 'Visión' })).toBeVisible();
  });

  test('can fill store name and save — shows success message', async ({ page }) => {
    await page.goto('/admin/store-info');
    await page.waitForSelector('mat-card', { timeout: 15000 });

    await page.locator('mat-form-field').filter({ hasText: 'Nombre de la tienda' }).locator('input').fill('E2E Test Store');
    await page.locator('button:has-text("Guardar información")').click();

    // Success indicator appears after save
    await expect(page.locator('.success-msg')).toBeVisible({ timeout: 10000 });
  });

  test('image section shows empty message or existing image grid', async ({ page }) => {
    await page.goto('/admin/store-info');
    await page.waitForSelector('mat-card', { timeout: 15000 });

    const emptyMsg = page.locator('p.empty-msg');
    const imageGrid = page.locator('.image-grid');

    const hasEmpty = await emptyMsg.isVisible();
    const hasGrid  = await imageGrid.isVisible();
    expect(hasEmpty || hasGrid).toBe(true);
  });

  test('dashboard "Info General" link navigates to /admin/store-info', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForSelector('.admin-nav', { timeout: 10000 });

    await page.locator('.admin-nav a:has-text("Info General")').click();
    await page.waitForURL(url => url.toString().includes('/admin/store-info'), { timeout: 10000 });
    expect(page.url()).toContain('/admin/store-info');
  });
});
