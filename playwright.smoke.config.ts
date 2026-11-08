import { defineConfig, devices } from '@playwright/test';

/**
 * Read-only checks against a deployed site (production or a Vercel preview). Nothing is bought,
 * created or changed. Run with:
 *
 *   BASE_URL=https://www.mareatextiles.com npm run test:smoke
 *
 * Optional: BACKEND_URL (defaults to the Render backend) and SMOKE_EMAIL / SMOKE_PASSWORD for an
 * existing customer account, which enables the login check.
 */
export default defineConfig({
  testDir: './smoke',
  retries: 1,
  timeout: 90_000, // the first request may have to wake the backend up
  use: {
    baseURL: process.env['BASE_URL'] ?? 'https://www.mareatextiles.com',
    headless: true,
    ...devices['Desktop Chrome'],
  },
  reporter: [['list']],
});
