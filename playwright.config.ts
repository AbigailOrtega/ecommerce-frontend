import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// Placeholder secrets for the e2e profile, shared with the backend's integration tests.
const BACKEND_E2E_CONFIG = path.resolve(__dirname, '../backend/src/test/resources/application-e2e.yml');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 1,
  globalSetup: './e2e/global-setup.ts',

  // Auto-start backend (H2/e2e profile) and frontend before tests.
  // Set CI=true to disable if you prefer to start them manually.
  webServer: process.env['CI'] !== 'manual' ? [
    {
      command: `mvn spring-boot:run -f ../backend/pom.xml -Dspring-boot.run.profiles=e2e "-Dspring-boot.run.arguments=--spring.config.additional-location=file:${BACKEND_E2E_CONFIG}"`,
      url: 'http://localhost:8080/api/products',
      timeout: 120_000,
      reuseExistingServer: true,
    },
    {
      command: 'npx ng serve --configuration development',
      url: 'http://localhost:4200',
      timeout: 120_000,
      reuseExistingServer: true,
    },
  ] : undefined,

  use: {
    baseURL: 'http://localhost:4200',
    // PW_HEADLESS=1 runs without a visible browser and at full speed
    headless: !!process.env['PW_HEADLESS'],
    slowMo: process.env['PW_HEADLESS'] ? 0 : 200,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /auth\.spec/,
    },
    {
      name: 'user-tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json',
      },
      testMatch: /cart\.spec|checkout\.spec|profile\.spec|orders\.spec/,
    },
    {
      name: 'admin-tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/admin.json',
      },
      testMatch: /admin\.spec/,
    },
    {
      name: 'public-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /product-list\.spec|product-detail\.spec|about\.spec/,
    },
  ],
});
