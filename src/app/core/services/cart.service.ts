import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, CartItem, Coupon } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/cart`;
  private readonly couponApiUrl = `${environment.apiUrl}/coupons`;

  private cartItems = signal<CartItem[]>([]);
  private appliedCoupon = signal<Coupon | null>(null);

  readonly items = this.cartItems.asReadonly();
  readonly coupon = this.appliedCoupon.asReadonly();
  readonly itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  readonly subtotal = computed(() => this.cartItems().reduce((sum, item) => sum + item.subtotal, 0));
  readonly discount = computed(() => {
    const c = this.appliedCoupon();
    if (!c) return 0;
    return Math.round(this.subtotal() * c.discountPercent) / 100;
  });
  readonly total = computed(() => Math.max(0, this.subtotal() - this.discount()));

  constructor(private http: HttpClient) {}

  loadCart(): void {
    this.http.get<ApiResponse<CartItem[]>>(this.apiUrl).subscribe({
      next: (res) => this.cartItems.set(res.data),
      error: () => this.cartItems.set([]),
    });
  }

  validateCoupon(code: string): Observable<ApiResponse<Coupon>> {
    const params = new HttpParams().set('code', code);
    return this.http.post<ApiResponse<Coupon>>(`${this.couponApiUrl}/validate`, null, { params }).pipe(
      tap(res => this.appliedCoupon.set(res.data))
    );
  }

  removeCoupon(): void {
    this.appliedCoupon.set(null);
  }

  addToCart(productId: number, quantity = 1, sizeId?: number): Observable<ApiResponse<CartItem>> {
    const body: any = { productId, quantity };
    if (sizeId != null) body['sizeId'] = sizeId;
    return this.http.post<ApiResponse<CartItem>>(this.apiUrl, body)
      .pipe(tap(() => this.loadCart()));
  }

  updateQuantity(itemId: number, quantity: number): Observable<ApiResponse<CartItem>> {
    return this.http.put<ApiResponse<CartItem>>(`${this.apiUrl}/${itemId}`, { quantity })
      .pipe(tap(() => this.loadCart()));
  }

  removeItem(itemId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${itemId}`)
      .pipe(tap(() => this.loadCart()));
  }

  clearCart(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(this.apiUrl)
      .pipe(tap(() => { this.cartItems.set([]); this.appliedCoupon.set(null); }));
  }

  resetLocalCart(): void {
    this.cartItems.set([]);
    this.appliedCoupon.set(null);
  }
}
