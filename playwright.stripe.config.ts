import { defineConfig, devices } from '@playwright/test';
import { execFileSync } from 'child_process';
import * as path from 'path';

/**
 * Checkout against the real Stripe API in test mode: the real Payment Element, test cards,
 * 3-D Secure, refunds and webhooks signed by Stripe (forwarded to the local backend by
 * `stripe listen`, started in e2e-stripe/global-setup.ts).
 *
 *   STRIPE_SECRET_KEY=sk_test_... STRIPE_PUBLIC_KEY=pk_test_... npm run test:e2e:stripe
 *
 * Needs the Stripe CLI. Runs its own backend (without FakePaymentService), so stop the one
 * the main suite starts first.
 */

const secretKey = process.env['STRIPE_SECRET_KEY'] ?? '';
const publicKey = process.env['STRIPE_PUBLIC_KEY'] ?? '';
if (!secretKey.startsWith('sk_test_') || !publicKey.startsWith('pk_test_')) {
  throw new Error('Set STRIPE_SECRET_KEY (sk_test_…) and STRIPE_PUBLIC_KEY (pk_test_…). Live keys are refused on purpose.');
}

// The secret `stripe listen` signs the events it forwards with; the backend must verify with it.
// Computed once and inherited by the worker processes, which load this file again.
if (!process.env['STRIPE_LISTEN_SECRET']) {
  process.env['STRIPE_LISTEN_SECRET'] = execFileSync('stripe', ['listen', '--print-secret', '--api-key', secretKey])
    .toString().trim();
}

const BACKEND_TEST_CLASSES = path.resolve(__dirname, '../backend/target/test-classes');

export default defineConfig({
  testDir: './e2e-stripe',
  fullyParallel: false,
  workers: 2,
  retries: 1,
  timeout: 120_000,
  globalSetup: './e2e-stripe/global-setup.ts',

  webServer: [
    {
      // e2e data and the e2e-support endpoints, but the real PaymentService (no "fake-payments").
      command: 'cd ../backend && ./mvnw -q test-compile spring-boot:run -Dspring-boot.run.profiles=e2e,e2e-support '
        + `-Dspring-boot.run.additional-classpath-elements=${BACKEND_TEST_CLASSES}`,
      env: {
        // above every application*.yml, including the placeholders in application-e2e.yml
        SPRING_APPLICATION_JSON: JSON.stringify({
          app: { stripe: { 'secret-key': secretKey, 'public-key': publicKey, 'webhook-secret': process.env['STRIPE_LISTEN_SECRET'] } },
        }),
      },
      url: 'http://localhost:8080/api/products',
      timeout: 180_000,
      // a backend already on :8080 is most likely the main suite's, which fakes Stripe
      reuseExistingServer: false,
    },
    {
      command: 'npx ng serve --configuration development',
      env: { API_ORIGIN: 'http://localhost:8080' },
      url: 'http://localhost:4200',
      timeout: 120_000,
      reuseExistingServer: true,
    },
  ],

  use: {
    baseURL: 'http://localhost:4200',
    headless: !!process.env['PW_HEADLESS'],
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    ...devices['Desktop Chrome'],
  },
});
