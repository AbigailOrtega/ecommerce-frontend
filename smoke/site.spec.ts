import { test, expect, APIRequestContext } from '@playwright/test';

const BACKEND_URL = process.env['BACKEND_URL'] ?? 'https://ecommerce-backend-sv5n.onrender.com';
const isServerRendered = (html: string) => html.includes(' ngh=');

async function firstProduct(request: APIRequestContext): Promise<{ name: string; slug: string }> {
  const res = await request.get('/api/products?size=1');
  expect(res.ok()).toBe(true);
  const product = (await res.json()).data.content[0];
  expect(product, 'the store has at least one active product').toBeTruthy();
  return product;
}

test('backend is up', async ({ request }) => {
  const res = await request.get(`${BACKEND_URL}/actuator/health`, { timeout: 90_000 });
  expect(res.status()).toBe(200);
  expect((await res.json()).status).toBe('UP');
});

test('/api is proxied to the backend and the public catalog is cacheable', async ({ request }) => {
  const res = await request.get('/api/products?size=1');
  expect(res.status()).toBe(200);
  expect((await res.json()).success).toBe(true);
  expect(res.headers()['cache-control']).toContain('public');
});

test('home is rendered on the server, with products', async ({ request }) => {
  const { name } = await firstProduct(request);
  const res = await request.get('/');
  expect(res.status()).toBe(200);
  const html = await res.text();
  expect(isServerRendered(html), 'server-side rendered (ngh markers)').toBe(true);
  expect(html).toContain(name);
});

test('a product page is rendered on the server with its title and JSON-LD', async ({ request }) => {
  const { name, slug } = await firstProduct(request);
  const html = await (await request.get(`/products/${slug}`)).text();
  expect(isServerRendered(html)).toBe(true);
  expect(html).toContain(`<title>${name} | `);
  expect(html).toContain('"@type":"Product"');
  expect(html).toMatch(/<meta property="og:title" content="[^"]+">/);
});

test('an unknown URL answers 404', async ({ request }) => {
  expect((await request.get('/smoke-pagina-que-no-existe')).status()).toBe(404);
});

test('security headers are sent', async ({ request }) => {
  const headers = (await request.get('/')).headers();
  expect(headers['strict-transport-security']).toContain('max-age=');
  expect(headers['x-content-type-options']).toBe('nosniff');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['content-security-policy'] ?? headers['content-security-policy-report-only']).toContain("default-src 'self'");
});

test('the home page hydrates without errors and reuses the server\'s API responses', async ({ page }) => {
  const problems: string[] = [];
  const catalogCalls: string[] = [];
  page.on('console', m => { if (m.type() === 'error' || /NG0[0-9]{3}/.test(m.text())) problems.push(m.text().slice(0, 200)); });
  page.on('pageerror', e => problems.push(e.message));
  page.on('request', r => { if (/\/api\/(products|categories|banner|store-info)/.test(r.url())) catalogCalls.push(r.url()); });

  await page.goto('/', { waitUntil: 'networkidle' });

  expect(problems).toEqual([]);
  expect(catalogCalls, 'catalog requests repeated by the browser after hydration').toEqual([]);
});

test('signing in keeps the session across a full reload (refresh token cookie)', async ({ page }) => {
  const email = process.env['SMOKE_EMAIL'];
  const password = process.env['SMOKE_PASSWORD'];
  test.skip(!email || !password, 'set SMOKE_EMAIL and SMOKE_PASSWORD to check sign-in');

  await page.goto('/login');
  await page.fill('[formControlName="email"]', email!);
  await page.fill('[formControlName="password"]', password!);
  await page.click('button[type="submit"]');
  await page.waitForURL(u => !u.toString().includes('/login'));

  const cookie = (await page.context().cookies()).find(c => c.name === 'refresh_token');
  expect(cookie, 'refresh_token cookie').toBeTruthy();
  expect(cookie!.httpOnly && cookie!.secure).toBe(true);

  await page.goto('/orders');
  await expect(page.locator('h1')).toHaveText('Mis Pedidos');
  expect(await page.evaluate(() => [localStorage.getItem('accessToken'), localStorage.getItem('refreshToken')])).toEqual([null, null]);
});
