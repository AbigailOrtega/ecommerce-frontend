import { spawn } from 'child_process';

/** Events the backend handles (StripeWebhookController). */
const EVENTS = ['payment_intent.succeeded', 'payment_intent.payment_failed', 'payment_intent.canceled', 'charge.refunded'];

/**
 * Starts `stripe listen`, which forwards the account's test-mode events to the local backend
 * signed with STRIPE_LISTEN_SECRET (see playwright.stripe.config.ts). Stopped when the run ends.
 */
export default async function globalSetup(): Promise<() => Promise<void>> {
  const listener = spawn('stripe', [
    'listen',
    '--api-key', process.env['STRIPE_SECRET_KEY']!,
    '--events', EVENTS.join(','),
    '--forward-to', 'http://localhost:8080/api/webhooks/stripe',
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  // forwarded events and their HTTP status, interleaved with the test output (useful when one fails)
  listener.stdout.on('data', d => process.stdout.write(`[stripe listen] ${d}`));

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('stripe listen did not become ready in 30s')), 30_000);
    listener.stderr.on('data', d => {
      if (d.toString().includes('Ready')) { clearTimeout(timer); resolve(); }
    });
    listener.on('exit', code => { clearTimeout(timer); reject(new Error(`stripe listen exited with ${code}`)); });
  });

  return async () => { listener.kill(); };
}
