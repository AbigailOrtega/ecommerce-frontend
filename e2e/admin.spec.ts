import { createCoupon, createProduct } from './helpers/purchase';
import { test, expect } from '@playwright/test';

// admin-tests project provides storageState
test.use({ storageState: 'e2e/.auth/admin.json' });

test.describe('Admin panel', () => {
  // ── Dashboard ─────────────────────────────────────────────────────────────

  test('admin can access dashboard at /admin', async ({ page }) => {
    await page.goto('/admin');
    // adminGuard allows admin through; DashboardComponent renders h1
    await expect(page.locator('h1:has-text("Panel de Administración")')).toBeVisible({ timeout: 10000 });
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

  test('side menu: sections grouped by topic, the current page highlighted', async ({ page }) => {
    await page.goto('/admin/coupons');
    const nav = page.getByTestId('admin-nav');
    for (const group of ['Ventas', 'Catálogo', 'Clientes', 'Configuración']) {
      await expect(nav.getByRole('group', { name: group })).toBeVisible();
    }
    await expect(nav.getByRole('group', { name: 'Ventas' }).getByRole('link', { name: 'Cupones' })).toHaveClass(/active/);
    await expect(nav.getByRole('link', { name: 'Productos' })).not.toHaveClass(/active/);

    // the menu stays while moving between pages
    await nav.getByRole('link', { name: 'Productos' }).click();
    await expect(page).toHaveURL(/\/admin\/products/);
    await expect(nav.getByRole('link', { name: 'Productos' })).toHaveClass(/active/);
  });

  test('side menu on a phone: opened with a button, closed after choosing', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/admin');
    const nav = page.getByTestId('admin-nav');
    await expect(nav.getByRole('link', { name: 'Pedidos' })).toBeHidden();

    await page.getByTestId('admin-menu-toggle').click();
    await nav.getByRole('link', { name: 'Pedidos' }).click();
    await expect(page).toHaveURL(/\/admin\/orders/);
    await expect(nav.getByRole('link', { name: 'Pedidos' })).toBeHidden();
  });

  test('home: order statuses in Spanish, with color, and a link to all orders', async ({ page }) => {
    await page.goto('/admin');
    await expect(page.locator('.status-breakdown .status-chip').first()).toBeVisible();
    await expect(page.locator('.status-breakdown')).not.toContainText(/\b(PENDING|CONFIRMED|CANCELLED|DELIVERED)\b/);
    await expect(page.locator('.recent-orders')).not.toContainText(/\b(PENDING|CONFIRMED|CANCELLED)\b/);
    await page.locator('.recent-orders').getByRole('link', { name: 'Ver todos' }).click();
    await expect(page).toHaveURL(/\/admin\/orders/);
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
    await expect(page.locator('th[mat-header-cell]:has-text("Pedido #")')).toBeVisible();
    await expect(page.locator('th[mat-header-cell]:has-text("Cliente")')).toBeVisible();
    await expect(page.locator('th[mat-header-cell]:has-text("Estado")')).toBeVisible();
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

    // Skydropx origin field
    await expect(page.locator('[formControlName="skydropxSenderName"]')).toBeVisible();

    // Save button
    await expect(page.locator('button:has-text("Guardar configuración")')).toBeVisible();
  });

  // ── Pickup locations ──────────────────────────────────────────────────────

  test('shipping — shows the postal code catalog behind the checkout autofill', async ({ page }) => {
    await page.goto('/admin/shipping');
    const card = page.getByTestId('postal-catalog');
    await expect(card).toContainText('Códigos postales');
    // the e2e backend seeds 6 colonias and never downloads the real catalog
    await expect(card).toContainText('6 colonias cargadas');
    await expect(card.getByRole('button', { name: 'Actualizar ahora' })).toBeEnabled();
  });

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
    await expect(page.locator('button').filter({ hasText: 'Agregar Producto' })).toBeVisible();
  });

  test('can open and cancel the create product form', async ({ page }) => {
    await page.goto('/admin/products');
    const addBtn = page.locator('button').filter({ hasText: 'Agregar Producto' });
    await addBtn.waitFor({ timeout: 10000 });
    await addBtn.click();

    await expect(page.locator('[formControlName="name"]')).toBeVisible();
    await expect(page.locator('[formControlName="price"]')).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Crear' })).toBeVisible();

    await page.locator('button').filter({ hasText: 'Cancelar' }).click();
    await expect(page.locator('[formControlName="name"]')).not.toBeVisible();
  });

  test('can create a new product', async ({ page }) => {
    await page.goto('/admin/products');
    await page.locator('button').filter({ hasText: 'Agregar Producto' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Agregar Producto' }).click();

    // product slugs come from the name and must be unique
    await page.fill('[formControlName="name"]', `E2E Test Product ${Date.now()}`);
    await page.fill('[formControlName="sku"]',  `E2E-${Date.now()}`);
    await page.fill('[formControlName="price"]', '25.00');
    // stockQuantity is shown when no colors are added
    const stockField = page.locator('[formControlName="stockQuantity"]');
    if (await stockField.isVisible()) await stockField.fill('10');

    await page.locator('button[type="submit"]').filter({ hasText: 'Crear' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('Producto creado', { timeout: 10000 });
  });

  test('can edit a product', async ({ page, request }) => {
    // edits a product of its own: renaming a seeded one would break the tests that look for it
    const product = await createProduct(request);
    await page.goto('/admin/products');
    const row = page.locator('tr', { hasText: product.name });
    await row.waitFor({ timeout: 15000 });
    await row.locator('button').filter({ has: page.locator('mat-icon', { hasText: 'edit' }) }).click();

    const nameInput = page.locator('[formControlName="name"]');
    await expect(nameInput).toHaveValue(product.name);
    await nameInput.fill(`${product.name} editado`);
    await page.locator('button[type="submit"]').filter({ hasText: 'Actualizar' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('Producto actualizado', { timeout: 10000 });
    await expect(page.locator('tr', { hasText: `${product.name} editado` })).toBeVisible();
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
    await expect(page.locator('button').filter({ hasText: /Crear|Actualizar/ })).toBeVisible();
  });

  test('can create a coupon', async ({ page }) => {
    await page.goto('/admin/coupons');
    await page.waitForSelector('.form-card', { timeout: 10000 });

    const code = `TESTE2E${Date.now().toString().slice(-4)}`;

    // Code field uses [(ngModel)] — target by label text
    await page.locator('mat-form-field').filter({ hasText: 'Código' }).locator('input').fill(code);
    await page.locator('mat-form-field').filter({ hasText: 'Descuento' }).locator('input').fill('15');
    // Expires At — date input
    await page.locator('mat-form-field').filter({ hasText: 'Expira' }).locator('input[type="date"]').fill('2027-12-31');

    await page.locator('button').filter({ hasText: /Crear|Actualizar/ }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('creado', { timeout: 10000 });
  });

  test('can toggle a coupon active/inactive', async ({ page, request }) => {
    // toggles a coupon of its own: the first row could be one a purchase test is about to use
    // (it once deactivated it mid-checkout: "Este cupón ya no está activo")
    const code = await createCoupon(request);
    await page.goto('/admin/coupons');
    const row = page.locator('table tbody tr', { hasText: code });
    await row.waitFor({ timeout: 15000 });

    const toggle = row.locator('mat-slide-toggle button[role="switch"]');
    await expect(toggle).toHaveAttribute('aria-checked', 'true');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  test('can delete a coupon', async ({ page, request }) => {
    // deletes a coupon of its own: other tests create coupons in parallel
    const code = await createCoupon(request);
    await page.goto('/admin/coupons');
    const row = page.locator('table tbody tr', { hasText: code });
    await row.waitFor({ timeout: 15000 });

    page.once('dialog', dialog => dialog.accept());
    await row.locator('button[color="warn"]').filter({ has: page.locator('mat-icon', { hasText: 'delete' }) }).click();

    await expect(row).toHaveCount(0);
  });
});

// ── Promotions ────────────────────────────────────────────────────────────────

test.describe('Admin › Promotions', () => {

  test('promotions page loads with "Add Promotion" button', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.waitForSelector('button, table', { timeout: 15000 });
    await expect(page.locator('button').filter({ hasText: 'Agregar Promoción' })).toBeVisible();
  });

  test('can open and cancel the create promotion form', async ({ page }) => {
    await page.goto('/admin/promotions');
    await page.locator('button').filter({ hasText: 'Agregar Promoción' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Agregar Promoción' }).click();

    await expect(page.locator('[formControlName="name"]')).toBeVisible();
    await expect(page.locator('[formControlName="discountPercent"]')).toBeVisible();

    // Scope to the form to avoid matching the toggle button which also reads "Cancel"
    await page.locator('form').getByRole('button', { name: 'Cancelar' }).click();
    await expect(page.locator('[formControlName="name"]')).not.toBeVisible();
  });

  test('can create a promotion', async ({ page, request }) => {
    // on a product of its own: the first product of the list is often a seeded one, and a 10% promotion
    // on it changed the price the SSR test expects (29.99)
    const product = await createProduct(request);
    await page.goto('/admin/promotions');
    await page.locator('button').filter({ hasText: 'Agregar Promoción' }).waitFor({ timeout: 10000 });
    await page.locator('button').filter({ hasText: 'Agregar Promoción' }).click();

    await page.fill('[formControlName="name"]',            'E2E Promo');
    await page.fill('[formControlName="discountPercent"]', '10');
    await page.fill('[formControlName="startDate"]',       '2026-04-01');
    await page.fill('[formControlName="endDate"]',         '2027-04-01');

    // productIds is required (minLength 1) — wait for products to load then select one
    const productSelect = page.locator('mat-select[formControlName="productIds"]');
    await productSelect.waitFor({ timeout: 10000 });
    await productSelect.click();
    // Wait for the options panel to populate (products loaded asynchronously)
    const option = page.locator('mat-option', { hasText: product.name });
    await option.waitFor({ timeout: 10000 });
    await option.click();
    await page.keyboard.press('Escape');

    await page.locator('button[type="submit"]').filter({ hasText: 'Guardar' }).click();

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toContainText('guardada', { timeout: 10000 });
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
    ).toContainText(wasOn ? 'desactivada' : 'activada', { timeout: 5000 });
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
    await expect(page.locator('button:has-text("Guardar cambios")')).toBeVisible();
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
    await page.locator('button:has-text("Guardar cambios")').click();

    // Success indicator appears after save
    await expect(page.locator('.success-msg')).toBeVisible({ timeout: 10000 });
  });

  test('image section shows empty message or existing image grid', async ({ page }) => {
    await page.goto('/admin/store-info');
    await page.waitForSelector('mat-card', { timeout: 15000 });

    const emptyMsg = page.locator('p.empty-msg').first();
    const imageGrid = page.locator('.image-grid');

    const hasEmpty = await emptyMsg.isVisible();
    const hasGrid  = await imageGrid.isVisible();
    expect(hasEmpty || hasGrid).toBe(true);
  });

  test('store color: picked on the wheel or typed, with readable text (not saved)', async ({ page }) => {
    await page.goto('/admin/store-info');
    const box = page.getByTestId('custom-color');
    const toolbar = page.locator('mat-toolbar').first();
    await expect(page.locator('.swatch-btn')).toHaveCount(0);   // the fixed palettes are gone

    // full brightness (top of the bar), then the right edge of the wheel: pure red
    await page.getByTestId('color-wheel').scrollIntoViewIfNeeded();
    const bar = (await page.getByTestId('color-brightness').boundingBox())!;
    await page.mouse.click(bar.x + bar.width / 2, bar.y + 1);
    const wheel = (await page.getByTestId('color-wheel').boundingBox())!;
    await page.mouse.click(wheel.x + wheel.width - 2, wheel.y + wheel.height / 2);
    await expect(page.getByTestId('custom-color-hex')).toHaveValue(/^#f[c-f]0[0-9a-f]0[0-9a-f]$/);
    await expect(toolbar).toHaveCSS('background-color', /rgb\(2[45]\d, \d, \d\)/);
    // the center of the wheel is white: the page's text on it turns dark
    await page.mouse.click(wheel.x + wheel.width / 2, wheel.y + wheel.height / 2);
    await expect(page.getByTestId('custom-color-hex')).toHaveValue(/^#f[c-f]f[c-f]f[c-f]$/);   // within a pixel of white
    await expect(toolbar.locator('a').first()).toHaveCSS('color', 'rgb(33, 33, 33)');
    await expect(box).toContainText('el texto sobre él será oscuro');

    // typed: the wheel follows, and the bar's text goes back to white on a dark color
    await page.getByTestId('custom-color-hex').fill('#1e7a7f');
    await page.getByTestId('custom-color-hex').blur();
    await expect(toolbar).toHaveCSS('background-color', 'rgb(30, 122, 127)');
    await expect(toolbar.locator('a').first()).toHaveCSS('color', 'rgb(255, 255, 255)');

    // not a color: says so and keeps the last valid one
    await page.getByTestId('custom-color-hex').fill('rojo');
    await page.getByTestId('custom-color-hex').blur();
    await expect(box).toContainText('Usa el formato #RRGGBB');
    await expect(toolbar).toHaveCSS('background-color', 'rgb(30, 122, 127)');
    await box.screenshot({ path: 'test-results/color-wheel.png' });
    // leaving without "Guardar cambios" keeps the saved color for everyone else
  });

  test('menu "Info general" link navigates to /admin/store-info', async ({ page }) => {
    await page.goto('/admin');
    await page.getByTestId('admin-nav').getByRole('link', { name: 'Info general' }).click();
    await expect(page).toHaveURL(/\/admin\/store-info/);
  });
});
