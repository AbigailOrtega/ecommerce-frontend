import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { isBrowser } from '../ssr';

const SESSION_KEY = 'pv_sid';
const SOURCE_SENT_KEY = 'pv_src';

/**
 * Counts page views for the admin's analytics. A visit is a browsing session (sessionStorage: one
 * per tab, until it is closed); nothing that identifies the person is sent. The backend skips
 * admins, bots, and the sign-in, checkout and admin pages.
 */
@Injectable({ providedIn: 'root' })
export class PageviewService {
  private readonly apiUrl = `${environment.apiUrl}/analytics/pageview`;
  private readonly browser = isBrowser();
  private sessionId = '';

  constructor(private http: HttpClient) {
    if (this.browser) this.sessionId = this.getOrCreateSession();
  }

  /** Counted from the browser only, so a server render plus its hydration is one view. */
  track(url: string): void {
    if (!this.browser) return;
    const [path, query = ''] = url.split('#')[0].split('?');
    const source = this.visitSource(query);
    this.http.post(this.apiUrl, { path, sessionId: this.sessionId, ...(source && { source }) })
      .subscribe({ error: () => {} });
  }

  /**
   * Where the visit came from, sent with its first page only: the link's utm_source, else the
   * referring site (google.com, instagram.com…). Nothing for direct visits.
   */
  private visitSource(query: string): string | null {
    try {
      if (sessionStorage.getItem(SOURCE_SENT_KEY)) return null;
      sessionStorage.setItem(SOURCE_SENT_KEY, '1');
      const utm = new URLSearchParams(query).get('utm_source');
      if (utm) return utm;
      const referrer = document.referrer ? new URL(document.referrer).hostname : '';
      return referrer && referrer !== location.hostname ? referrer : null;
    } catch {
      return null;
    }
  }

  private getOrCreateSession(): string {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  }
}
