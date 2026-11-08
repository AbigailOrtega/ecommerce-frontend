import { Injectable, InjectionToken, PLATFORM_ID, REQUEST, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FetchBackend, HttpBackend, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

/**
 * Where the server-side renderer calls the API. In the browser '/api' goes through Vercel's
 * rewrite; the SSR function has no such proxy, so it calls the backend directly.
 * Provided only in app.config.server.ts.
 */
export const SERVER_API_ORIGIN = new InjectionToken<string>('SERVER_API_ORIGIN');

/**
 * A render must not wait for a backend that is waking up (Render's free plan sleeps): past this,
 * the page is sent without that data and the browser loads it after hydration.
 */
export const SSR_HTTP_TIMEOUT_MS = 4000;

/** True in the browser, false while rendering on the server. Call in an injection context. */
export function isBrowser(): boolean {
  return isPlatformBrowser(inject(PLATFORM_ID));
}

/**
 * The server's HttpBackend: sends relative API calls to the backend, with a time limit.
 * A backend rather than an interceptor so the hydration transfer cache, which runs before it,
 * still keys responses by '/api/…' — the URL the browser asks for — and the browser reuses them.
 */
@Injectable()
export class ServerApiBackend implements HttpBackend {
  private readonly fetch = inject(FetchBackend);
  private readonly origin = inject(SERVER_API_ORIGIN).replace(/\/$/, '');
  /** The site being rendered: Angular resolves '/api/…' against it before the request gets here. */
  private readonly siteOrigin = originOf(inject(REQUEST, { optional: true })?.url);

  handle(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    return this.fetch.handle(req.clone({ url: this.toBackend(req.url) })).pipe(timeout(SSR_HTTP_TIMEOUT_MS));
  }

  private toBackend(url: string): string {
    if (url.startsWith('/')) return this.origin + url;
    const parsed = parseUrl(url);
    // only the site's own /api/… (Vercel's rewrite in the browser); other absolute URLs are left alone
    if (parsed && parsed.origin === this.siteOrigin && parsed.pathname.startsWith('/api/')) {
      return this.origin + parsed.pathname + parsed.search;
    }
    return url;
  }
}

function parseUrl(url: string | undefined): URL | null {
  try {
    return url ? new URL(url) : null;
  } catch {
    return null;
  }
}

function originOf(url: string | undefined): string | null {
  return parseUrl(url)?.origin ?? null;
}
