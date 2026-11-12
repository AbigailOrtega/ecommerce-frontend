import { test, expect } from '@playwright/test';
import { API } from './helpers/purchase';

// The super admin's page: only on the platform's domain, entered with a platform account (not a
// store user; super@test.com, seeded by TestDataInitializer). It creates a store that then answers
// on its own domain with its own name, and resends its admin invitation.
test('the super admin creates a store and invites its admin', async ({ page, request }) => {
  const tag = `${Date.now()}`;
  // on a store's domain (localhost here) the page does not exist
  await page.goto('/plataforma');
  await expect(page.getByTestId('platform-email')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'No encontramos esta página' })).toBeVisible();

  // on the platform's domain (plataforma.localhost here) the home page is the platform page
  await page.goto('http://plataforma.localhost:4200/');
  await expect(page).toHaveURL(/plataforma\.localhost:4200\/plataforma$/);

  // a store's admin has no account on the platform
  await page.getByTestId('platform-email').fill('admin@test.com');
  await page.getByTestId('platform-password').fill('Admin123!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByTestId('platform-login-error')).toContainText('incorrectos');

  await page.getByTestId('platform-email').fill('super@test.com');
  await page.getByTestId('platform-password').fill('mal-password');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByTestId('platform-login-error')).toContainText('incorrectos');

  await page.getByTestId('platform-password').fill('Super123!');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByTestId('store-marea')).toBeVisible();

  await page.getByTestId('new-store').click();
  await page.getByTestId('store-name').fill(`Papelería ${tag}`);
  await expect(page.getByTestId('store-slug')).toHaveValue(`papeleria-${tag}`);
  await page.getByTestId('store-domain').fill(`https://papeleria-${tag}.test/`);
  await page.getByTestId('store-admin-email').fill(`duena-${tag}@example.com`);
  await page.getByTestId('create-store').click();

  const card = page.getByTestId(`store-papeleria-${tag}`);
  await expect(card).toBeVisible();
  await expect(card).toContainText(`papeleria-${tag}.test`);
  await expect(page.locator('mat-snack-bar-container')).toContainText('Se envió la invitación');

  // the new store answers on its domain with its own name
  const info = await request.get(`${API}/store-info`, { headers: { 'X-Store-Host': `papeleria-${tag}.test` } });
  expect((await info.json()).data.name).toBe(`Papelería ${tag}`);

  // resend the invitation
  await page.getByTestId(`invite-papeleria-${tag}`).fill(`duena-${tag}@example.com`);
  await card.getByRole('button', { name: 'Enviar invitación' }).click();
  await expect(page.locator('mat-snack-bar-container').last()).toContainText(`Invitación enviada a duena-${tag}@example.com`);
});
