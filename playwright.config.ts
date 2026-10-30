import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

// The backend's compiled tests: FakePaymentService, application-e2e.yml (placeholder secrets)
// and application-fake-payments.yml.
const BACKEND_TEST_CLASSES = path.resolve(__dirname, '../backend/target/test-classes');

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  retries: 1,
  globalSetup: './e2e/global-setup.ts',

  // Auto-start backend (H2/e2e profile) and frontend before tests.
  // Set CI=true to disable if you prefer to start them manually.
  webServer: process.env['CI'] !== 'manual' ? [
    {
      // From the backend's test classes only, never in the production jar: FakePaymentService
      // stands in for Stripe and PayPal ("fake-payments") and E2eSupportController exposes what
      // a user would receive by email ("e2e-support").
      command: 'mvn test-compile spring-boot:run -f ../backend/pom.xml -Dspring-boot.run.profiles=e2e,fake-payments,e2e-support '
        + `-Dspring-boot.run.directories=${BACKEND_TEST_CLASSES}`,
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
      name: 'purchase-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /purchase\.spec/,
    },
    {
      name: 'flow-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /variants\.spec|account\.spec/,
    },
    {
      name: 'public-tests',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /product-list\.spec|product-detail\.spec|about\.spec/,
    },
  ],
});
