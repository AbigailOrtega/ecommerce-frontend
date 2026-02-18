import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, of, switchMap, shareReplay } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse } from '@shared/models';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly apiUrl = `${environment.apiUrl}/payments`;
  private stripe$: Observable<Stripe | null> | null = null;

  constructor(private http: HttpClient) {}

  getStripeConfig(): Observable<ApiResponse<{ publishableKey: string }>> {
    return this.http.get<ApiResponse<{ publishableKey: string }>>(
      `${this.apiUrl}/stripe/config`
    );
  }

  getStripe(): Observable<Stripe | null> {
    if (!this.stripe$) {
      this.stripe$ = this.getStripeConfig().pipe(
        switchMap(res => {
          const key = res.data.publishableKey;
          if (!key) return of(null);
          return from(loadStripe(key));
        }),
        shareReplay(1)
      );
    }
    return this.stripe$;
  }

  createPaymentIntent(amount: number): Observable<ApiResponse<{ clientSecret: string; paymentIntentId: string }>> {
    return this.http.post<ApiResponse<{ clientSecret: string; paymentIntentId: string }>>(
      `${this.apiUrl}/stripe/create-intent`,
      { amount }
    );
  }
}
