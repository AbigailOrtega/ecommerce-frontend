import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express, { Request } from 'express';
import { join } from 'node:path';
import { fetchProductSlugs, robotsTxt, sitemapXml } from './seo-files';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
// Vercel's edge sets (and overwrites) these on every request. Angular falls back to client-side
// rendering when it sees an X-Forwarded-* header it was not told to trust; the host is still checked
// against "allowedHosts" in angular.json.
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: ['x-forwarded-host', 'x-forwarded-proto', 'x-forwarded-port', 'x-forwarded-for'],
});

const apiOrigin = process.env['API_ORIGIN'] ?? 'https://ecommerce-backend-sv5n.onrender.com';

/** The site as the visitor sees it (Vercel's edge sets the forwarded headers). */
function siteOrigin(req: Request): string {
  const proto = (req.get('x-forwarded-proto') ?? req.protocol).split(',')[0].trim();
  const host = (req.get('x-forwarded-host') ?? req.get('host') ?? 'localhost').split(',')[0].trim();
  return `${proto}://${host}`;
}

// Kept by Vercel's CDN for an hour, so the catalog API is asked at most once an hour
const CDN_HOUR = 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400';

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').set('Cache-Control', CDN_HOUR).send(robotsTxt(siteOrigin(req)));
});

app.get('/sitemap.xml', async (req, res) => {
  try {
    const products = await fetchProductSlugs(apiOrigin);
    res.type('application/xml').set('Cache-Control', CDN_HOUR).send(sitemapXml(siteOrigin(req), products));
  } catch (error) {
    // no stale or partial sitemap: search engines retry a 503 later
    console.error('sitemap.xml: could not read the catalog', error);
    res.status(503).set('Retry-After', '600').send('Catalog unavailable, try again later');
  }
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
