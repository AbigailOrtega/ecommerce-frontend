import { test, expect, Page } from '@playwright/test';
import { TEST_USER, loginAs } from './helpers/auth';

/**
 * Server-side rendering. Requests carry the X-Forwarded-* headers Vercel's edge adds: without
 * trusting them Angular silently serves the client-only shell (what happened on the first deploy).
 */
const VERCEL_HEADERS = {
  'x-forwarded-for': '203.0.113.7',
  'x-forwarded-proto': 'https',
  'x-forwarded-port': '443',
};

/** Server-rendered markup carries hydration annotations (ngh); the client-only shell has none. */
const isServerRendered = (html: string) => html.includes(' ngh=');

test.describe('Server-side rendering', () => {
  test('a product page is rendered on the server with its SEO tags and JSON-LD', async ({ request }) => {
    const res = await request.get('/products/test-t-shirt', { headers: VERCEL_HEADERS });
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(isServerRendered(html)).toBe(true);
    expect(html).toContain('<title>Test T-Shirt | ');
    expect(html).toMatch(/<meta name="description" content="A comfortable test t-shirt">/);
    expect(html).toMatch(/<meta property="og:type" content="product">/);
    expect(html).toMatch(/<link rel="canonical" href="[^"]*\/products\/test-t-shirt">/);
    expect(html).toMatch(/<meta name="robots" content="index, follow">/);

    const jsonLd = html.match(/<script id="seo-json-ld" type="application\/ld\+json">(.*?)<\/script>/s);
    expect(jsonLd).not.toBeNull();
    const product = JSON.parse(jsonLd![1]);
    expect(product['@type']).toBe('Product');
    expect(product.name).toBe('Test T-Shirt');
    expect(product.offers).toMatchObject({ priceCurrency: 'MXN', price: '29.99', availability: 'https://schema.org/InStock' });
  });

  test('the home page is rendered on the server with its products and prices', async ({ request }) => {
    const html = await (await request.get('/', { headers: VERCEL_HEADERS })).text();
    expect(isServerRendered(html)).toBe(true);
    for (const name of ['Test T-Shirt', 'Test Jeans', 'Test Sneakers']) expect(html).toContain(name);
    expect(html).toContain('$29.99'); // es-MX currency formatting works on the server too
  });

  test('an unknown URL answers 404 with the not-found page, never indexed', async ({ request }) => {
    const res = await request.get('/esta-pagina-no-existe', { headers: VERCEL_HEADERS });
    expect(res.status()).toBe(404);
    const html = await res.text();
    expect(html).toContain('<title>Página no encontrada | ');
    expect(html).toMatch(/<meta name="robots" content="noindex, nofollow">/);
  });

  test('session pages (checkout, account, admin) are not rendered on the server', async ({ request }) => {
    for (const path of ['/checkout', '/orders', '/admin', '/login', '/rastrear-pedido']) {
      const res = await request.get(path, { headers: VERCEL_HEADERS });
      expect(res.status(), path).toBe(200);
      expect(isServerRendered(await res.text()), path).toBe(false);
    }
  });
});

test.describe('Hydration', () => {
  async function collectProblems(page: Page): Promise<string[]> {
    const problems: string[] = [];
    page.on('console', m => {
      if (m.type() === 'error' || /NG0[0-9]{3}/.test(m.text())) problems.push(m.text().slice(0, 200));
    });
    page.on('pageerror', e => problems.push(e.message));
    return problems;
  }

  test('public pages hydrate without errors or mismatches', async ({ page }) => {
    const problems = await collectProblems(page);
    for (const path of ['/', '/products/test-t-shirt', '/sobre-nosotros', '/contacto', '/aviso-privacidad']) {
      await page.goto(path, { waitUntil: 'networkidle' });
    }
    expect(problems.filter(p => !/Failed to load resource/.test(p))).toEqual([]);
  });

  test('a signed-in shopper\'s click on "Agregar al carrito" before hydration is not lost', async ({ page }) => {
    await loginAs(page, TEST_USER.email, TEST_USER.password);
    // hold the app bundle back so the click lands on the server-rendered button
    await page.route(/\/main[-.][^/]*\.js/, async route => {
      await new Promise(r => setTimeout(r, 2000));
      await route.continue();
    });
    const added = page.waitForResponse(r => r.url().includes('/api/cart') && r.request().method() === 'POST', { timeout: 20000 });

    await page.goto('/', { waitUntil: 'commit' });
    await page.locator('mat-card-actions button').filter({ hasText: 'Agregar al carrito' }).first().click();

    expect((await added).ok()).toBe(true);
  });
});
