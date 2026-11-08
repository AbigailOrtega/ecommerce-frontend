import { environment } from '@env/environment';
import { ReportingErrorHandler } from './error-reporting';

describe('ReportingErrorHandler', () => {
  it('without a DSN only logs to the console and loads nothing', () => {
    expect(environment.sentryDsn).toBe('');
    spyOn(console, 'error');
    const handler = new ReportingErrorHandler();

    handler.handleError(new Error('boom'));

    expect(console.error).toHaveBeenCalled();
    expect((handler as any).sentry).toBeNull();
    expect((handler as any).pending).toEqual([]);
  });
});
