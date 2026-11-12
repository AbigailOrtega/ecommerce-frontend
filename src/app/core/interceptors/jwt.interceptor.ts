import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, map, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// The access token lives 30 minutes. On a 401 we renew it once with the refresh token cookie and
// retry; requests that fail while a refresh is running wait for that same refresh.
let refreshInFlight: Observable<string> | null = null;

function withToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

/**
 * Catalog reads that are the same for every visitor (reviews excluded). They go without the token:
 * the server-rendered page hands its responses to the browser only for requests without credentials
 * (otherwise a signed-in shopper's page re-fetched and re-rendered the catalog after hydration), and
 * the backend lets them be cached only then too (see PublicCacheConfig).
 */
const PUBLIC_CATALOG_READ = /\/api\/(products(?!\/[^/?]+\/reviews)|categories|banner|store-info)(\/|\?|$)/;

/** The platform's API: its own super admin session (PlatformService), never a store's login; a 401 there ends only that. */
const PLATFORM_API = /\/api\/platform\//;

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  if ((req.method === 'GET' && PUBLIC_CATALOG_READ.test(req.url)) || PLATFORM_API.test(req.url)) {
    return next(req);
  }
  const authService = inject(AuthService);

  return next(withToken(req, authService.getToken())).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.url.includes('/auth/')) {
        return throwError(() => error);
      }
      if (!authService.isLoggedIn()) {
        authService.logout();
        return throwError(() => error);
      }

      refreshInFlight ??= authService.refreshToken().pipe(
        map(res => res.data.accessToken),
        finalize(() => (refreshInFlight = null)),
        shareReplay(1),
      );

      return refreshInFlight.pipe(
        catchError(() => {
          authService.logout();
          return throwError(() => error);
        }),
        switchMap(token => next(withToken(req, token)).pipe(
          catchError((retryError: HttpErrorResponse) => {
            if (retryError.status === 401) authService.logout();
            return throwError(() => retryError);
          }),
        )),
      );
    }),
  );
};
