import { test, expect } from '@playwright/test';
import { loginAs, TEST_ADMIN } from './helpers/auth';
import { addToCartFromDetail, createProduct, fillGuestContact, goToPaymentWithNationalShipping, useFakePaymentProviders } from './helpers/purchase';

// Each store charges and ships with its own accounts. Saving keys that work is covered by the
// backend (StoreCredentialsIT, providers stubbed); here: the admin's page, and the checkout
// offering only what the store has set up. Nothing is saved, so other tests keep their keys.

test('Admin → Pagos y envíos shows the store\'s keys masked and refuses keys that cannot work', async ({ page }) => {
  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/payments');
  await expect(page.getByRole('heading', { name: 'Pagos y envíos' })).toBeVisible();
  for (const card of ['stripe-card', 'paypal-card', 'skydropx-card']) {
    await expect(page.getByTestId(card)).toBeVisible();
  }

  // a live publishable key with a test secret key: refused before asking Stripe
  await page.getByTestId('stripe-public').fill('pk_live_e2e');
  await page.getByTestId('stripe-secret').fill('sk_test_e2e');
  await page.getByTestId('stripe-save').click();
  await expect(page.locator('mat-snack-bar-container')).toContainText('mismo modo');
});

test('the checkout offers only the payment methods the store has set up', async ({ page, request }) => {
  await useFakePaymentProviders(page);
  // this store has PayPal but no Stripe yet
  await page.route('**/api/payments/stripe/config', route =>
    route.fulfill({ json: { success: true, data: { publishableKey: '' } } }));
  const product = await createProduct(request);
  await addToCartFromDetail(page, product.slug);
  await page.goto('/checkout');
  await fillGuestContact(page, `guest${Date.now()}@test.com`);
  await goToPaymentWithNationalShipping(page);

  await expect(page.getByRole('radio', { name: /PayPal/ })).toBeChecked();
  await expect(page.getByText('Tarjeta de crédito/débito (Stripe)')).toHaveCount(0);

  // and with neither, it says so
  await page.route('**/api/payments/paypal/config', route =>
    route.fulfill({ json: { success: true, data: { clientId: '' } } }));
  await page.reload();
  await fillGuestContact(page, `guest${Date.now()}@test.com`);
  await goToPaymentWithNationalShipping(page);
  await expect(page.getByTestId('no-payment-methods')).toBeVisible();
});
