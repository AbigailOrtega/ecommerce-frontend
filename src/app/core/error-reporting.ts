import { ErrorHandler, Injectable, isDevMode } from '@angular/core';
import { environment } from '@env/environment';

type SentryModule = typeof import('@sentry/browser');

/**
 * Sends errors from the browser to Sentry when the build has a DSN (SENTRY_DSN, see
 * scripts/set-env.js). The SDK is downloaded after the app starts, so it adds nothing to the
 * first load; errors raised before it arrives are queued and sent once it is ready.
 */
@Injectable()
export class ReportingErrorHandler implements ErrorHandler {
  private sentry: SentryModule | null = null;
  private readonly pending: unknown[] = [];

  constructor() {
    if (!environment.sentryDsn || typeof window === 'undefined') return;
    import('@sentry/browser').then(sentry => {
      sentry.init({
        dsn: environment.sentryDsn,
        environment: isDevMode() ? 'development' : 'production',
        // errors only; no performance tracing
        tracesSampleRate: 0,
      });
      this.sentry = sentry;
      this.pending.splice(0).forEach(e => sentry.captureException(e));
    }).catch(() => { /* reporting must never break the store */ });
  }

  handleError(error: unknown): void {
    console.error(error);
    if (!environment.sentryDsn) return;
    if (this.sentry) this.sentry.captureException(error);
    else if (this.pending.length < 20) this.pending.push(error);
  }
}
