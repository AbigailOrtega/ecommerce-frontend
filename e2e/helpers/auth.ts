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
