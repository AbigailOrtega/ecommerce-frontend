import { CanMatchFn, Router } from '@angular/router';
import { DOCUMENT, REQUEST, inject } from '@angular/core';
import { environment } from '@env/environment';

/**
 * The platform owner's page lives only on the platform's own domain (environment.platformHost).
 * On a store's domain /plataforma does not match, so it falls through to "Página no encontrada".
 */
export const platformHostGuard: CanMatchFn = () => isPlatformHost();

/** The platform's domain is no store: every page but /plataforma goes there. */
export const platformElsewhereRedirect: CanMatchFn = () =>
  isPlatformHost() ? inject(Router).parseUrl('/plataforma') : false;

export function isPlatformHost(): boolean {
  const expected = environment.platformHost?.toLowerCase();
  return !!expected && currentHostname() === expected;
}

/** The visitor's domain: the incoming request's while rendering on the server, the page's in the browser. */
function currentHostname(): string | null {
  const url = inject(REQUEST, { optional: true })?.url ?? inject(DOCUMENT, { optional: true })?.location?.href;
  try {
    return url ? new URL(url).hostname.toLowerCase() : null;
  } catch {
    return null;
  }
}
