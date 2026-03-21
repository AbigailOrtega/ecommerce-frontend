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

  // PayPal methods

  getPayPalConfig(): Observable<ApiResponse<{ clientId: string }>> {
    return this.http.get<ApiResponse<{ clientId: string }>>(
      `${this.apiUrl}/paypal/config`
    );
  }

  loadPayPalSdk(clientId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if ((window as any).paypal) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=MXN`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
      document.head.appendChild(script);
    });
  }

  createPayPalOrder(amount: number): Observable<ApiResponse<{ orderId: string; status: string }>> {
    return this.http.post<ApiResponse<{ orderId: string; status: string }>>(
      `${this.apiUrl}/paypal/create-order`,
      { amount }
    );
  }

  capturePayPalOrder(orderId: string): Observable<ApiResponse<{ orderId: string; status: string; captureId: string }>> {
    return this.http.post<ApiResponse<{ orderId: string; status: string; captureId: string }>>(
      `${this.apiUrl}/paypal/capture-order`,
      { orderId }
    );
  }

  confirmPayPalPayment(orderNumber: string, captureId: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(
      `${this.apiUrl}/paypal/confirm-payment`,
      { orderNumber, captureId }
    );
  }
}
