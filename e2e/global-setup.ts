import { chromium } from '@playwright/test';
import { loginAs, TEST_USER, TEST_ADMIN } from './helpers/auth';
import * as fs from 'fs';
import * as path from 'path';

export default async function globalSetup(): Promise<void> {
  // Ensure .auth directory exists
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const BASE_URL = 'http://localhost:4200';
  const browser = await chromium.launch();

  // Save regular user session
  const userContext = await browser.newContext({ baseURL: BASE_URL });
  const userPage = await userContext.newPage();
  await loginAs(userPage, TEST_USER.email, TEST_USER.password);
  await userContext.storageState({ path: 'e2e/.auth/user.json' });
  await userContext.close();

  // Save admin session
  const adminContext = await browser.newContext({ baseURL: BASE_URL });
  const adminPage = await adminContext.newPage();
  await loginAs(adminPage, TEST_ADMIN.email, TEST_ADMIN.password);
  await adminContext.storageState({ path: 'e2e/.auth/admin.json' });
  await adminContext.close();

  await browser.close();
}
