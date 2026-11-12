import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse } from '@shared/models';

export interface PlatformStore {
  id: number;
  slug: string;
  name: string;
  status: 'ACTIVE' | 'SUSPENDED';
  baseUrl: string | null;
  domains: string[];
}

export interface NewStore {
  slug: string;
  name: string;
  domains: string[];
  baseUrl: string;
  adminEmail: string;
  adminFirstName?: string;
}

const SESSION_KEY = 'platform-session';

export interface PlatformSession { token: string; email: string; }

/**
 * The platform's API (/api/platform), for its super admins: accounts of the platform, not of any
 * store. Their session is kept apart from a store's login (its own token, sent only here).
 */
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/platform/stores`;
  private readonly authUrl = `${environment.apiUrl}/platform/auth`;

  readonly session = signal<PlatformSession | null>(readSession());

  login(email: string, password: string): Observable<ApiResponse<PlatformSession>> {
    return this.http.post<ApiResponse<PlatformSession>>(`${this.authUrl}/login`, { email, password })
      .pipe(tap(res => this.keep(res.data)));
  }

  logout(): void {
    this.keep(null);
  }

  forgotPassword(email: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.authUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.authUrl}/reset-password`, { token, newPassword });
  }

  private keep(session: PlatformSession | null): void {
    this.session.set(session);
    try {
      if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      else localStorage.removeItem(SESSION_KEY);
    } catch { /* private mode: the session lasts while the page is open */ }
  }

  private get headers(): HttpHeaders {
    return new HttpHeaders({ Authorization: `Bearer ${this.session()?.token ?? ''}` });
  }

  list(): Observable<ApiResponse<PlatformStore[]>> {
    return this.http.get<ApiResponse<PlatformStore[]>>(this.url, { headers: this.headers });
  }

  create(store: NewStore): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(this.url, store, { headers: this.headers });
  }

  setStatus(id: number, status: PlatformStore['status']): Observable<ApiResponse<PlatformStore>> {
    return this.http.patch<ApiResponse<PlatformStore>>(`${this.url}/${id}/status`, null, { headers: this.headers, params: { status } });
  }

  invite(id: number, email: string, firstName?: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${id}/invite`, { email, firstName }, { headers: this.headers });
  }

  addDomain(id: number, domain: string): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(`${this.url}/${id}/domains`, { domain }, { headers: this.headers });
  }
}

/** "Papelería Luna" → "papeleria-luna" (the store's short name). */
export function slugify(name: string): string {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 63);
}

/** "https://www.Papeleria.com/" → "www.papeleria.com". */
export function cleanDomain(raw: string): string {
  return raw.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
}

function readSession(): PlatformSession | null {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(SESSION_KEY) : null;
    if (!raw) return null;
    const session = JSON.parse(raw) as PlatformSession;
    // an expired token is dropped right away (the server would answer 401 anyway)
    const exp = JSON.parse(atob(session.token.split('.')[1])).exp as number;
    return exp * 1000 > Date.now() ? session : null;
  } catch {
    return null;
  }
}
