import { ApplicationConfig, LOCALE_ID, inject, provideAppInitializer, DEFAULT_CURRENCY_CODE, provideZoneChangeDetection } from '@angular/core';
import { TitleStrategy, provideRouter, withNavigationErrorHandler } from '@angular/router';
import { reloadOnStaleChunk } from './core/stale-chunks';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { routes } from './app.routes';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AuthService } from './core/services/auth.service';
import { SeoTitleStrategy } from './core/services/seo.service';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEsMx from '@angular/common/locales/es-MX';

// here rather than in main.ts so the server renderer (main.server.ts) formats prices the same way
registerLocaleData(localeEsMx);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // a page left open across a deploy asks for chunks that are gone: load the new version
    provideRouter(routes, withNavigationErrorHandler(reloadOnStaleChunk)),
    { provide: TitleStrategy, useClass: SeoTitleStrategy },
    provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    // trade the refresh token cookie for an access token before the first route guard runs
    provideAppInitializer(() => inject(AuthService).restoreSession()),
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'MXN' },
    // reuse the server-rendered DOM and the API responses fetched while rendering it
    provideClientHydration(withEventReplay()),
  ],
};
