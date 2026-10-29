import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, map, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

// The access token lives 30 minutes. On a 401 we renew it once with the refresh token and
// retry; requests that fail while a refresh is running wait for that same refresh.
let refreshInFlight: Observable<string> | null = null;

function withToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
  return token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
}

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(withToken(req, authService.getToken())).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || req.url.includes('/auth/')) {
        return throwError(() => error);
      }
      if (!authService.getRefreshToken()) {
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
