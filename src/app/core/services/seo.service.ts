import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

export interface PageSeo {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'product';
}

// one deploy serves every store: no store's name is built in, it comes from the store info
const DEFAULT_STORE_NAME = '';
const DEFAULT_DESCRIPTION = 'Textiles y artículos para el hogar. Compra en línea con envío a todo México o recoge en tienda.';
const JSON_LD_ID = 'seo-json-ld';

/**
 * Title, description, Open Graph / Twitter tags, canonical URL and JSON-LD for the current page.
 * Every navigation resets them to the route's defaults (see {@link SeoTitleStrategy}); pages with
 * their own data (a product) call {@link update} once it has loaded.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  readonly storeName = signal(DEFAULT_STORE_NAME);

  /** The page last shown, so a store name that arrives after it (from the store info) still makes its title. */
  private lastPage: PageSeo | null = null;

  setStoreName(name: string | null | undefined): void {
    if (!name?.trim() || name.trim() === this.storeName()) return;
    this.storeName.set(name.trim());
    if (this.lastPage) this.update(this.lastPage);
  }

  /** Applied on every navigation: the route's title, the store description, indexable unless told otherwise. */
  reset(routeTitle: string | undefined, url: string, noindex: boolean): void {
    this.setStructuredData(null);
    this.update({ title: routeTitle, description: DEFAULT_DESCRIPTION, type: 'website' });
    this.setCanonical(url);
    this.meta.updateTag({ name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow' });
  }

  update(page: PageSeo): void {
    this.lastPage = page;
    const store = this.storeName();
    const fullTitle = page.title && store ? `${page.title} | ${store}` : page.title || store;
    this.title.setTitle(fullTitle);
    this.setTag('og:title', fullTitle, 'property');
    this.setTag('twitter:title', fullTitle);
    this.setTag('og:site_name', store, 'property');
    this.setTag('og:type', page.type ?? 'website', 'property');
    this.setTag('twitter:card', page.image ? 'summary_large_image' : 'summary');
    if (page.description !== undefined) {
      const description = this.clip(page.description);
      this.setTag('description', description);
      this.setTag('og:description', description, 'property');
      this.setTag('twitter:description', description);
    }
    if (page.image) {
      this.setTag('og:image', page.image, 'property');
      this.setTag('twitter:image', page.image);
    } else {
      this.meta.removeTag("property='og:image'");
      this.meta.removeTag("name='twitter:image'");
    }
  }

  /** schema.org data as JSON-LD (e.g. a Product with its price and availability); null removes it. */
  setStructuredData(data: object | null): void {
    this.document.getElementById(JSON_LD_ID)?.remove();
    if (!data) return;
    const script = this.document.createElement('script');
    script.id = JSON_LD_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  absoluteUrl(path: string): string {
    return new URL(path, this.document.location.origin).toString();
  }

  private setCanonical(url: string): void {
    // query strings (filters, pagination, tracking) do not make a different page
    const href = this.absoluteUrl(url.split(/[?#]/)[0]);
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.rel = 'canonical';
      this.document.head.appendChild(link);
    }
    link.href = href;
    this.setTag('og:url', href, 'property');
  }

  private setTag(key: string, content: string, attr: 'name' | 'property' = 'name'): void {
    this.meta.updateTag({ [attr]: key, content }, `${attr}='${key}'`);
  }

  private clip(text: string): string {
    const plain = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return plain.length > 160 ? plain.slice(0, 157).trimEnd() + '…' : plain;
  }
}

/** Uses each route's `title` and `data.noindex` to reset the page's SEO tags on navigation. */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly seo = inject(SeoService);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    let route = snapshot.root;
    let noindex = false;
    while (route) {
      noindex ||= !!route.data?.['noindex'];
      if (!route.firstChild) break;
      route = route.firstChild;
    }
    this.seo.reset(this.buildTitle(snapshot), snapshot.url, noindex);
  }
}
