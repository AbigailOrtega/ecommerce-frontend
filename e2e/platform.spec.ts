import { test, expect } from '@playwright/test';
import { API } from './helpers/purchase';

// The platform owner's page: entered with the platform key (application-e2e.yml), it creates a
// store that then answers on its own domain with its own name, and resends its admin invitation.
const KEY = 'e2e-platform-key-not-a-secret-0123456789';

test('the platform owner creates a store and invites its admin', async ({ page, request }) => {
  const tag = `${Date.now()}`;
  await page.goto('/plataforma');

  await page.getByTestId('platform-key').fill('una-clave-equivocada');
  await page.getByRole('button', { name: 'Entrar' }).click();
  await expect(page.getByTestId('platform-key-error')).toContainText('Clave incorrecta');

  await page.getByTestId('platform-key').fill(KEY);
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
