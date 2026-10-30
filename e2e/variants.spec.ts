import { test, expect } from '@playwright/test';
import {
  addToCartFromDetail, createProduct, fillGuestContact, getProduct, goToPaymentWithNationalShipping,
  payWithCard, registerAndLogin, trackOrder, useFakePaymentProviders,
} from './helpers/purchase';

test.describe.configure({ timeout: 90_000 });

const COLORS = [
  { name: 'Rojo', sizes: [{ name: 'M', stock: 2 }, { name: 'L', stock: 0 }] },
  { name: 'Azul', sizes: [{ name: 'S', stock: 1 }] },
];

test.describe('Variants and stock', () => {
  test.beforeEach(async ({ page }) => useFakePaymentProviders(page));

  test('color and size selection shows each size\'s stock; sold-out sizes cannot be added', async ({ page, request }) => {
    const product = await createProduct(request, { colors: COLORS });
    await page.goto(`/products/${product.slug}`);

    // first color and size are preselected
    await expect(page.locator('.variant-stock')).toHaveText('2 disponible(s) para Rojo / M');
    await expect(page.locator('button.add-btn')).toBeEnabled();

    const variant = (name: string) => page.getByRole('button', { name, exact: true });
    await variant('L').click();
    await expect(page.locator('.variant-stock')).toHaveText('Sin existencia para Rojo / L');
    await expect(page.locator('button.add-btn')).toBeDisabled();
    await expect(page.locator('button.add-btn')).toHaveText(/Sin existencia/);

    await variant('Azul').click();
    await expect(variant('S')).toBeVisible();
    await expect(variant('M')).toHaveCount(0);
    await expect(page.locator('.variant-stock')).toHaveText('1 disponible(s) para Azul / S');
  });

  test('buying a size decrements that size only, and the order records color and size', async ({ page, request }) => {
    const product = await createProduct(request, { colors: COLORS });
    await page.goto(`/products/${product.slug}`);
    await expect(page.locator('.variant-stock')).toContainText('Rojo / M');
    await page.locator('button.add-btn').click();
    await expect(page.locator('mat-snack-bar-container').filter({ hasText: 'Agregado al carrito' })).toBeVisible();

    await page.goto('/checkout');
    await fillGuestContact(page, `variant${Date.now()}@test.com`);
    await goToPaymentWithNationalShipping(page);
    await payWithCard(page);
    await expect(page).toHaveURL(/\/confirmacion/, { timeout: 15000 });
    const orderNumber = (await page.locator('.order-number strong').innerText()).replace('#', '');

    const order = await trackOrder(request, orderNumber);
    expect(order.items[0].selectedColorName).toBe('Rojo');
    expect(order.items[0].selectedSizeName).toBe('M');

    const after = await getProduct(request, product.slug);
    const sizes = Object.fromEntries(after.colors.flatMap((c: any) => c.sizes.map((s: any) => [`${c.name}/${s.name}`, s.stock])));
    expect(sizes).toEqual({ 'Rojo/M': 1, 'Rojo/L': 0, 'Azul/S': 1 });
  });

  test('guest: ordering more than the stock is rejected and nothing is charged or reserved', async ({ page, request }) => {
    const product = await createProduct(request, { stock: 2 });
    await page.goto(`/products/${product.slug}`);
    const plus = page.locator('.quantity-section button').nth(1);
    await plus.click();
    await plus.click();
    await expect(page.locator('.quantity')).toHaveText('3');
    await page.locator('button.add-btn').click();

    await page.goto('/checkout');
    await fillGuestContact(page, `toomany${Date.now()}@test.com`);
    await goToPaymentWithNationalShipping(page);
    await payWithCard(page);

    await expect(page.locator('mat-snack-bar-container')).toContainText('Stock insuficiente');
    await expect(page).toHaveURL(/\/checkout/);
    // the order is created before the card is charged, so the charge never happened
    expect(await page.evaluate(() => (window as any).__e2eStripeConfirmations ?? 0)).toBe(0);
    expect((await getProduct(request, product.slug)).stockQuantity).toBe(2);
  });

  test('signed-in: adding more than the stock to the cart is rejected', async ({ page, request }) => {
    const product = await createProduct(request, { stock: 1 });
    await registerAndLogin(page, request);
    await page.goto(`/products/${product.slug}`);
    await page.locator('.quantity-section button').nth(1).click();
    await page.locator('button.add-btn').click();

    await expect(page.locator('mat-snack-bar-container')).toContainText('Error al agregar al carrito');
    await page.goto('/cart');
    await expect(page.getByText('Tu carrito está vacío')).toBeVisible();
  });
});
