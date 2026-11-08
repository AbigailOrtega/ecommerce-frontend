import { test, expect } from '@playwright/test';
import { dropSession, loginAs } from './helpers/auth';
import { API, adminToken, registerAndLogin } from './helpers/purchase';

test.describe('Password reset', () => {
  test('forgot password → link → new password works, the old one does not, and old sessions end', async ({ browser, page, request }) => {
    const email = await registerAndLogin(page, request, 'OldPass123!');

    // a second device stays signed in with the old password
    const otherDevice = await browser.newContext();
    const otherPage = await otherDevice.newPage();
    await loginAs(otherPage, email, 'OldPass123!');

    await dropSession(page);
    await page.goto('/forgot-password');
    await page.fill('[formControlName="email"]', email);
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('.success-message')).toBeVisible();

    // what the email would contain
    const res = await request.get(`${API}/e2e/reset-token?email=${encodeURIComponent(email)}`, {
      headers: { Authorization: `Bearer ${await adminToken(request)}` },
    });
    expect(res.ok()).toBeTruthy();
    const token = (await res.json()).data.token;

    await page.goto(`/reset-password?token=${token}`);
    await page.fill('[formControlName="newPassword"]', 'NewPass123!');
    await page.fill('[formControlName="confirmPassword"]', 'NewPass123!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('mat-snack-bar-container')).toContainText('Contraseña actualizada');
    await expect(page).toHaveURL(/\/login/);

    const oldLogin = await request.post(`${API}/auth/login`, { data: { email, password: 'OldPass123!' } });
    expect(oldLogin.status()).toBe(401);
    await loginAs(page, email, 'NewPass123!');

    // the other device's tokens were issued for the old password
    await otherPage.goto('/orders');
    await expect(otherPage).toHaveURL(/\/login/, { timeout: 15000 });
    await otherDevice.close();

    // the link works only once
    await dropSession(page);
    await page.goto(`/reset-password?token=${token}`);
    await page.fill('[formControlName="newPassword"]', 'Another123!');
    await page.fill('[formControlName="confirmPassword"]', 'Another123!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page).toHaveURL(/\/reset-password/);
  });

  test('an invalid reset link shows an error and changes nothing', async ({ page }) => {
    await page.goto('/reset-password?token=not-a-real-token');
    await page.fill('[formControlName="newPassword"]', 'NewPass123!');
    await page.fill('[formControlName="confirmPassword"]', 'NewPass123!');
    await page.locator('button[type="submit"]').click();
    await expect(page.locator('mat-snack-bar-container')).toBeVisible();
    await expect(page).toHaveURL(/\/reset-password/);
  });
});

test.describe('Session renewal', () => {
  test('an expired access token is renewed silently with the refresh token', async ({ page, request }) => {
    await registerAndLogin(page, request);

    // as if the 30 minutes had passed: the server rejects the access token once
    let rejected = false;
    await page.route('**/api/orders**', route => {
      if (rejected) return route.continue();
      rejected = true;
      return route.fulfill({ status: 401, body: '' });
    });
    let refreshes = 0;
    page.on('response', r => { if (r.url().includes('/api/auth/refresh') && r.ok()) refreshes++; });

    // the reload renews once from the cookie, the rejected request renews again and is retried
    const retried = page.waitForResponse(r => r.url().includes('/api/orders') && r.ok());
    await page.goto('/orders');
    await retried;
    await expect(page.locator('h1')).toHaveText('Mis Pedidos');
    await expect(page).toHaveURL(/\/orders/);
    expect(rejected).toBe(true);
    expect(refreshes).toBeGreaterThanOrEqual(2);
  });

  test('when the refresh token is no longer valid the user is sent to login', async ({ page, request }) => {
    await registerAndLogin(page, request);
    // a refresh token that no longer verifies (e.g. signed with a rotated secret)
    await page.context().addCookies([{ name: 'refresh_token', value: 'revoked.refresh.token',
      domain: 'localhost', path: '/api/auth', httpOnly: true, sameSite: 'Strict' }]);
    await page.goto('/orders');
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 });
  });
});
