import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class PageviewService {
  private readonly apiUrl = `${environment.apiUrl}/analytics/pageview`;
  private sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.getOrCreateSession();
  }

  track(path: string): void {
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
