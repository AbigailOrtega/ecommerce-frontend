import { HttpClient } from '@angular/common/http';
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

/** The platform's API (/api/platform/stores): only for a super admin logged in on the platform's domain. */
@Injectable({ providedIn: 'root' })
export class PlatformService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/platform/stores`;

  list(): Observable<ApiResponse<PlatformStore[]>> {
    return this.http.get<ApiResponse<PlatformStore[]>>(this.url);
  }

  create(store: NewStore): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(this.url, store);
  }

  setStatus(id: number, status: PlatformStore['status']): Observable<ApiResponse<PlatformStore>> {
    return this.http.patch<ApiResponse<PlatformStore>>(`${this.url}/${id}/status`, null, { params: { status } });
  }

  invite(id: number, email: string, firstName?: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.url}/${id}/invite`, { email, firstName });
  }

  addDomain(id: number, domain: string): Observable<ApiResponse<PlatformStore>> {
    return this.http.post<ApiResponse<PlatformStore>>(`${this.url}/${id}/domains`, { domain });
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
