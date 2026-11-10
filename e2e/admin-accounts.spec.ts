import { test, expect } from '@playwright/test';
import { loginAs, TEST_ADMIN } from './helpers/auth';
import { API, adminToken } from './helpers/purchase';

// Admin accounts in the browser: an admin invites someone, the invitation link lets them
// create a password and open the panel, and an admin can take the access away again.

test.describe.configure({ timeout: 90_000 });

const unique = () => `${Date.now()}${Math.floor(Math.random() * 1000)}`;

test('invite → create password from the link → panel → access revoked', async ({ page, browser, request }) => {
  const email = `admin${unique()}@test.com`;
  page.on('dialog', d => d.accept());   // "¿Quitar el acceso de admin…?"

  // 1. an admin invites a new address
  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/users');
  await page.getByTestId('invite-email').fill(email);
  await page.getByLabel('Nombre (opcional)').fill('Sofía');
  await page.getByLabel('Apellido (opcional)').fill('Ruiz');
  await page.getByTestId('invite-submit').click();
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: `Acceso de admin otorgado a ${email}` })).toBeVisible();

  // your own row never offers to remove your access
  await page.getByLabel('Buscar por nombre o correo').fill(TEST_ADMIN.email);
  const ownRow = page.locator('tr').filter({ hasText: TEST_ADMIN.email });
  await expect(ownRow).toBeVisible();
  await expect(ownRow.locator('button')).toHaveCount(0);

  // 2. the invited person opens the link from the email (its token, read as an admin)
  const tokenRes = await request.get(`${API}/e2e/reset-token?email=${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${await adminToken(request)}` },
  });
  expect(tokenRes.ok()).toBeTruthy();
  const token = (await tokenRes.json()).data.token;

  const invitedContext = await browser.newContext({ baseURL: 'http://localhost:4200' });
  const invited = await invitedContext.newPage();
  await invited.goto(`/reset-password?token=${token}&invite=1`);
  await expect(invited.getByText('Crea tu contraseña')).toBeVisible();
  await invited.fill('[formControlName="newPassword"]', 'Sofia1234!');
  await invited.fill('[formControlName="confirmPassword"]', 'Sofia1234!');
  await invited.getByRole('button', { name: 'Crear contraseña' }).click();
  await expect(invited).toHaveURL(/\/login/);

  // 3. … signs in and reaches the admin panel
  await loginAs(invited, email, 'Sofia1234!');
  await invited.goto('/admin/users');
  await expect(invited.getByRole('heading', { name: 'Gestión de Usuarios' })).toBeVisible();

  // 4. the first admin takes the access away
  await page.getByLabel('Buscar por nombre o correo').fill(email);
  const row = page.locator('tr').filter({ hasText: email });
  await expect(row.locator('mat-chip')).toHaveText('ADMIN');
  await row.getByRole('button', { name: 'Quitar admin' }).click();
  await expect(page.locator('mat-snack-bar-container').filter({ hasText: `Se quitó el acceso de admin a ${email}` })).toBeVisible();
  await expect(row.locator('mat-chip')).toHaveText('CUSTOMER');

  // 5. from their next request on, the panel's API refuses them (roles are read per request)
  const login = await request.post(`${API}/auth/login`, { data: { email, password: 'Sofia1234!' } });
  const theirToken = (await login.json()).data.accessToken;
  const panel = await request.get(`${API}/admin/users`, { headers: { Authorization: `Bearer ${theirToken}` } });
  expect(panel.status()).toBe(403);

  await invitedContext.close();
});

test('promote an existing customer from their row', async ({ page, request }) => {
  const email = `cliente${unique()}@test.com`;
  const registered = await request.post(`${API}/auth/register`, {
    data: { firstName: 'Leo', lastName: 'Díaz', email, password: 'Leo12345!', marketingOptIn: false },
  });
  expect(registered.ok()).toBeTruthy();
  page.on('dialog', d => d.accept());   // "¿Dar acceso de admin…?"

  await loginAs(page, TEST_ADMIN.email, TEST_ADMIN.password);
  await page.goto('/admin/users');
  await page.getByLabel('Buscar por nombre o correo').fill(email);
  const row = page.locator('tr').filter({ hasText: email });
  await row.getByRole('button', { name: 'Hacer admin' }).click();
  await expect(row.locator('mat-chip')).toHaveText('ADMIN');

  // their own password still works, and now opens the panel
  const login = await request.post(`${API}/auth/login`, { data: { email, password: 'Leo12345!' } });
  const token = (await login.json()).data.accessToken;
  expect((await request.get(`${API}/admin/users`, { headers: { Authorization: `Bearer ${token}` } })).status()).toBe(200);
});
