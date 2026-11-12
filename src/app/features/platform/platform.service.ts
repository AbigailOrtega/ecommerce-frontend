import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
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

const KEY_STORAGE = 'platform-key';

/**
 * The platform owner's API (/api/platform/stores): every call carries the platform key, which is
 * kept only for this browser tab (sessionStorage), never in the code or the store's login.
 */
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/platform/stores`;

  get key(): string {
    try { return sessionStorage.getItem(KEY_STORAGE) ?? ''; } catch { return ''; }
  }

  set key(value: string) {
    try {
      if (value) sessionStorage.setItem(KEY_STORAGE, value);
      else sessionStorage.removeItem(KEY_STORAGE);
    } catch { /* private mode: the key lives only in memory for this page */ }
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'X-Platform-Key': this.key });
  }

  list(): Observable<ApiResponse<PlatformStore[]>> {
    return this.http.get<ApiResponse<PlatformStore[]>>(this.url, { headers: this.headers() });
  }

  create(store: NewStore): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(this.url, store, { headers: this.headers() });
  }

  setStatus(id: number, status: PlatformStore['status']): Observable<ApiResponse<PlatformStore>> {
    return this.http.patch<ApiResponse<PlatformStore>>(`${this.url}/${id}/status`, null,
      { headers: this.headers(), params: { status } });
  }

  invite(id: number, email: string, firstName?: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${id}/invite`, { email, firstName }, { headers: this.headers() });
  }

  addDomain(id: number, domain: string): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(`${this.url}/${id}/domains`, { domain }, { headers: this.headers() });
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
