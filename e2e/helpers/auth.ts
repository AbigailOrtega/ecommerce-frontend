import { Page } from '@playwright/test';

export const TEST_USER  = { email: 'test@test.com',  password: 'Test123!' };
export const TEST_ADMIN = { email: 'admin@test.com', password: 'Admin123!' };

export async function loginAs(page: Page, email: string, password: string): Promise<void> {
  await page.goto('/login');
  await page.fill('[formControlName="email"]', email);
  await page.fill('[formControlName="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForURL(url => !url.toString().includes('/login'), { timeout: 15000 });
}

/** The refresh token is an HttpOnly cookie: a session can only be inspected or ended through it. */
export const REFRESH_COOKIE = 'refresh_token';

export async function hasSessionCookie(page: Page): Promise<boolean> {
  return (await page.context().cookies()).some(c => c.name === REFRESH_COOKIE);
}

/** Ends the session the way closing it on another device would: cookie and stored profile gone. */
export async function dropSession(page: Page): Promise<void> {
  await page.context().clearCookies({ name: REFRESH_COOKIE });
  await page.evaluate(() => localStorage.clear());
}

/** A fresh access token for the page's session, for calling the API directly as that user. */
export async function sessionToken(page: Page): Promise<string> {
  const res = await page.request.post('http://localhost:8080/api/auth/refresh');
  if (!res.ok()) throw new Error(`refresh failed: ${res.status()}`);
  return (await res.json()).data.accessToken;
}
