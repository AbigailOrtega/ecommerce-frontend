import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse } from '@shared/models';

export interface PaymentSettings {
  stripe: { active: boolean; publicKey: string | null; secretKeyEnd: string | null; webhook: boolean; testMode: boolean };
  paypal: { active: boolean; clientId: string | null; clientSecretEnd: string | null; live: boolean; webhook: boolean };
  skydropx: { active: boolean; clientId: string | null; clientSecretEnd: string | null; sandbox: boolean; webhook: boolean };
  /** False when the server has no ENCRYPTION_KEY: keys cannot be saved. */
  canSave: boolean;
  /** The store's address, for the webhooks set up by hand (Skydropx). */
  webhookBaseUrl: string;
  notes: string[];
}

/** Admin → Pagos y envíos: the store's own Stripe, PayPal and Skydropx keys. */
@Injectable({ providedIn: 'root' })
export class PaymentSettingsService {
  private readonly http = inject(HttpClient);
  private readonly url = `${environment.apiUrl}/admin/payment-settings`;

  get(): Observable<ApiResponse<PaymentSettings>> {
    return this.http.get<ApiResponse<PaymentSettings>>(this.url);
  }

  saveStripe(body: { publicKey: string; secretKey?: string; webhookSecret?: string; currentPassword: string }): Observable<ApiResponse<PaymentSettings>> {
    return this.http.put<ApiResponse<PaymentSettings>>(`${this.url}/stripe`, body);
  }

  savePayPal(body: { clientId: string; clientSecret?: string; live: boolean; currentPassword: string }): Observable<ApiResponse<PaymentSettings>> {
    return this.http.put<ApiResponse<PaymentSettings>>(`${this.url}/paypal`, body);
  }

  saveSkydropx(body: { clientId: string; clientSecret?: string; sandbox: boolean; webhookSecret?: string; currentPassword: string }): Observable<ApiResponse<PaymentSettings>> {
    return this.http.put<ApiResponse<PaymentSettings>>(`${this.url}/skydropx`, body);
  }

  remove(provider: 'stripe' | 'paypal' | 'skydropx', currentPassword: string): Observable<ApiResponse<PaymentSettings>> {
    return this.http.post<ApiResponse<PaymentSettings>>(`${this.url}/${provider}/disable`, { currentPassword });
  }
}
