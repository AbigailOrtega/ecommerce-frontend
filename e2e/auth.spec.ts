import { test, expect } from '@playwright/test';
import { TEST_USER } from './helpers/auth';

// ── Register ──────────────────────────────────────────────────────────────────

test.describe('Register', () => {

  // ── Page structure ──────────────────────────────────────────────────────────

  test('register page loads with all required fields visible', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('mat-card', { timeout: 10000 });

    await expect(page.locator('[formControlName="firstName"]')).toBeVisible();
    await expect(page.locator('[formControlName="lastName"]')).toBeVisible();
    await expect(page.locator('[formControlName="email"]')).toBeVisible();
    await expect(page.locator('[formControlName="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('"Sign In" link navigates to /login', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('mat-card', { timeout: 10000 });
    await page.locator('a:has-text("Sign In")').click();
    await page.waitForURL(url => url.toString().includes('/login'));
    expect(page.url()).toContain('/login');
  });

  // ── Validation ──────────────────────────────────────────────────────────────

  test('submitting empty form does not navigate away', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('button[type="submit"]', { timeout: 10000 });
    await page.click('button[type="submit"]');
    // onSubmit() returns early when form.invalid — stays on /register
    expect(page.url()).toContain('/register');
  });

  test('password too short → shows validation error on blur', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('[formControlName="password"]', { timeout: 10000 });

    await page.fill('[formControlName="password"]', 'short');
    // Blur by pressing Tab (avoids mat-label pointer-intercept issues)
    await page.press('[formControlName="password"]', 'Tab');

    await expect(page.locator('mat-error')).toContainText('at least 8 characters');
  });

  test('password visibility toggle changes input type', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('[formControlName="password"]', { timeout: 10000 });

    const pwInput = page.locator('[formControlName="password"]');
    await expect(pwInput).toHaveAttribute('type', 'password');

    // Click the visibility toggle button
    await page.locator('button[mat-icon-button][type="button"]').first().click();
    await expect(pwInput).toHaveAttribute('type', 'text');

    // Click again to hide
    await page.locator('button[mat-icon-button][type="button"]').first().click();
    await expect(pwInput).toHaveAttribute('type', 'password');
  });

  // ── Error cases ─────────────────────────────────────────────────────────────

  test('duplicate email → shows error snackbar', async ({ page }) => {
    await page.goto('/register');
    await page.waitForSelector('[formControlName="firstName"]', { timeout: 10000 });

    await page.fill('[formControlName="firstName"]', 'Test');
    await page.fill('[formControlName="lastName"]', 'User');
    await page.fill('[formControlName="email"]', TEST_USER.email); // already seeded
    await page.fill('[formControlName="password"]', 'Test123!');
    await page.click('button[type="submit"]');

    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toBeVisible({ timeout: 10000 });
    // Should stay on /register
    expect(page.url()).toContain('/register');
  });

  // ── Successful registration ─────────────────────────────────────────────────

  test('valid data → creates account, shows snackbar, redirects home', async ({ page }) => {
    // Unique email so the test is idempotent across runs with a fresh DB
    const uniqueEmail = `e2e-${Date.now()}@test.com`;

    await page.goto('/register');
    await page.waitForSelector('[formControlName="firstName"]', { timeout: 10000 });

    await page.fill('[formControlName="firstName"]', 'E2E');
    await page.fill('[formControlName="lastName"]', 'Tester');
    await page.fill('[formControlName="email"]', uniqueEmail);
    await page.fill('[formControlName="password"]', 'Test123!');
    await page.click('button[type="submit"]');

    // Success snackbar
    await expect(
      page.locator('simple-snack-bar, mat-snack-bar-container').first()
    ).toBeVisible({ timeout: 10000 });

    // Redirected away from /register
    await page.waitForURL(url => !url.toString().includes('/register'), { timeout: 15000 });
    expect(page.url()).not.toContain('/register');
  });

  test('newly registered user can log in with their credentials', async ({ page }) => {
    const uniqueEmail = `e2e-login-${Date.now()}@test.com`;
    const password   = 'NewPass1!';

    // Register
    await page.goto('/register');
    await page.waitForSelector('[formControlName="firstName"]', { timeout: 10000 });
    await page.fill('[formControlName="firstName"]', 'New');
    await page.fill('[formControlName="lastName"]', 'User');
    await page.fill('[formControlName="email"]', uniqueEmail);
    await page.fill('[formControlName="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForURL(url => !url.toString().includes('/register'), { timeout: 15000 });

    // Log out (clear localStorage) before logging back in
    await page.evaluate(() => localStorage.clear());
    await page.goto('/login');
    await page.fill('[formControlName="email"]', uniqueEmail);
    await page.fill('[formControlName="password"]', password);
    await page.click('button[type="submit"]');

    await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
    await expect(
      page.locator('mat-toolbar button mat-icon').filter({ hasText: 'account_circle' })
    ).toBeVisible();
  });
});

// ── Auth flows ─────────────────────────────────────────────────────────────────

test.describe('Auth flows', () => {
  // ── Login ────────────────────────────────────────────────────────────────

  test('login with valid credentials → redirects to home and shows account icon', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[formControlName="email"]', TEST_USER.email);
    await page.fill('[formControlName="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');

    await page.waitForURL(url => !url.toString().includes('/login'));

    // Account circle icon button is visible when logged in
    await expect(page.locator('mat-toolbar button mat-icon').filter({ hasText: 'account_circle' })).toBeVisible();

    // Open user menu and verify user's first name in the header
    await page.locator('mat-toolbar button').filter({ has: page.locator('mat-icon', { hasText: 'account_circle' }) }).click();
    await expect(page.locator('.menu-header').first()).toContainText('Test');
  });

  test('login with wrong password → shows error snackbar', async ({ page }) => {
    await page.goto('/login');
    await page.fill('[formControlName="email"]', TEST_USER.email);
    await page.fill('[formControlName="password"]', 'WrongPass!');
    await page.click('button[type="submit"]');

    await expect(page.locator('simple-snack-bar, mat-snack-bar-container').first()).toBeVisible();
  });

  // ── Logout ───────────────────────────────────────────────────────────────

  test('logout → redirects to /login and clears token', async ({ page }) => {
    // Log in first
    await page.goto('/login');
    await page.fill('[formControlName="email"]', TEST_USER.email);
    await page.fill('[formControlName="password"]', TEST_USER.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(url => !url.toString().includes('/login'));

    // Open user menu
    await page.locator('mat-toolbar button').filter({ has: page.locator('mat-icon', { hasText: 'account_circle' }) }).click();

    // Click the Logout menu item
    await page.locator('button:has-text("Logout")').click();

    await page.waitForURL(url => url.toString().includes('/login'));
    const token = await page.evaluate(() => localStorage.getItem('accessToken'));
    expect(token).toBeNull();
  });

  // ── Forgot password ───────────────────────────────────────────────────────

  test('forgot password form → shows success message after submit', async ({ page }) => {
    await page.goto('/forgot-password');
    await page.locator('input[type="email"], [formControlName="email"]').fill(TEST_USER.email);
    await page.click('button[type="submit"]');

    // On success the form is replaced with a .success-message paragraph
    await expect(page.locator('.success-message')).toBeVisible({ timeout: 10000 });
  });

  // ── Unauthenticated guards ────────────────────────────────────────────────

  test('unauthenticated access to /orders → redirected to /login', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForURL(url => url.toString().includes('/login'));
    expect(page.url()).toContain('/login');
  });

  // /admin triggers authGuard (→ /login) then adminGuard (→ /)
  // For unauthenticated user, authGuard redirects to /login
  test('unauthenticated access to /admin → redirected to /login', async ({ page }) => {
    await page.goto('/admin');
    await page.waitForURL(url => url.toString().includes('/login'));
    expect(page.url()).toContain('/login');
  });
});
