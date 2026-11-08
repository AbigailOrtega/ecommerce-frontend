import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';
import { isBrowser } from '../ssr';

@Injectable({ providedIn: 'root' })
export class PageviewService {
  private readonly apiUrl = `${environment.apiUrl}/analytics/pageview`;
  private readonly browser = isBrowser();
  private sessionId = '';

  constructor(private http: HttpClient) {
    if (this.browser) this.sessionId = this.getOrCreateSession();
  }

  /** Counted from the browser only, so a server render plus its hydration is one visit. */
  track(path: string): void {
    if (!this.browser) return;
    this.http.post(this.apiUrl, { path, sessionId: this.sessionId }).subscribe({ error: () => {} });
  }

  private getOrCreateSession(): string {
    const key = 'pv_sid';
    let sid = sessionStorage.getItem(key);
    if (!sid) {
      sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(key, sid);
    }
    return sid;
  }
}
