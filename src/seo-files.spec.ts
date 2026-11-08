import { fetchProductSlugs, robotsTxt, sitemapXml } from './seo-files';

describe('seo-files', () => {
  it('sitemap lists the public pages and every product, with escaped URLs', () => {
    const xml = sitemapXml('https://www.mareatextiles.com', [
      { slug: 'cojin-azul', createdAt: '2026-10-01T12:30:00' },
      { slug: 'mantel & servilletas' },
    ]);
    expect(xml).toContain('<loc>https://www.mareatextiles.com/</loc>');
    expect(xml).toContain('<loc>https://www.mareatextiles.com/sobre-nosotros</loc>');
    expect(xml).toContain('<url><loc>https://www.mareatextiles.com/products/cojin-azul</loc><lastmod>2026-10-01</lastmod></url>');
    expect(xml).toContain('/products/mantel%20%26%20servilletas</loc>');
    expect(xml).not.toContain('/admin');
  });

  it('robots keeps session and checkout pages out and points to the sitemap', () => {
    const txt = robotsTxt('https://www.mareatextiles.com');
    expect(txt).toContain('Disallow: /admin');
    expect(txt).toContain('Disallow: /checkout');
    expect(txt).not.toContain('Disallow: /products');
    expect(txt).toContain('Sitemap: https://www.mareatextiles.com/sitemap.xml');
  });

  it('reads every page of the catalog', async () => {
    const pages = [
      { content: [{ slug: 'a' }, { slug: 'b' }], last: false },
      { content: [{ slug: 'c' }], last: true },
    ];
    const urls: string[] = [];
    const fakeFetch = (async (url: string) => {
      urls.push(url);
      return new Response(JSON.stringify({ data: pages[urls.length - 1] }));
    }) as unknown as typeof fetch;

    const products = await fetchProductSlugs('https://api.example.com', fakeFetch);

    expect(products.map(p => p.slug)).toEqual(['a', 'b', 'c']);
    expect(urls[0]).toBe('https://api.example.com/api/products?page=0&size=100');
  });

  it('fails instead of publishing a partial sitemap when the API errors', async () => {
    const failing = (async () => new Response('down', { status: 502 })) as unknown as typeof fetch;
    await expectAsync(fetchProductSlugs('https://api.example.com', failing)).toBeRejected();
  });
});
