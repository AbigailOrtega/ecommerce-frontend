import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT, REQUEST, inject } from '@angular/core';
import { environment } from '@env/environment';

/**
 * One backend serves every store and picks the store from the domain the visitor is on. Calls
 * reach it through Vercel (browser) or straight from the server-side render, so the domain is sent
 * explicitly with every API call instead of relying on what each hop forwards.
 */
export const STORE_HOST_HEADER = 'X-Store-Host';

export const storeHostInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isApiCall(req.url)) return next(req);
  const host = storeHost();
  return host ? next(req.clone({ setHeaders: { [STORE_HOST_HEADER]: host } })) : next(req);
};

function isApiCall(url: string): boolean {
  return url.startsWith(environment.apiUrl) || url.startsWith('/api/') || /^https?:\/\/[^/]+\/api\//.test(url);
}

/** The visitor's host: the page's own in the browser, the incoming request's while rendering on the server. */
function storeHost(): string | null {
  const requestUrl = inject(REQUEST, { optional: true })?.url;
  const url = requestUrl ?? inject(DOCUMENT, { optional: true })?.location?.href;
  try {
    return url ? new URL(url).host : null;
  } catch {
    return null;
  }
}
