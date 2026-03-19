import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, CartItem, Coupon, LocalCartItem } from '@shared/models';
import { AuthService } from './auth.service';

const LOCAL_CART_KEY = 'guest_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/cart`;
  private readonly couponApiUrl = `${environment.apiUrl}/coupons`;

  private cartItems = signal<CartItem[]>([]);
  private localCartItems = signal<LocalCartItem[]>(this.loadLocalCart());
  private appliedCoupon = signal<Coupon | null>(null);

  readonly items = this.cartItems.asReadonly();
  readonly localItems = this.localCartItems.asReadonly();
  readonly coupon = this.appliedCoupon.asReadonly();
  readonly itemCount = computed(() => {
    const auth = this.authService.isLoggedIn();
    return auth
      ? this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
      : this.localCartItems().reduce((sum, item) => sum + item.quantity, 0);
  });
  readonly subtotal = computed(() => {
    const auth = this.authService.isLoggedIn();
    return auth
      ? this.cartItems().reduce((sum, item) => sum + item.subtotal, 0)
      : this.localCartItems().reduce((sum, item) => sum + item.subtotal, 0);
  });
  readonly discount = computed(() => {
    const c = this.appliedCoupon();
    if (!c) return 0;
    return Math.round(this.subtotal() * c.discountPercent) / 100;
  });
  readonly total = computed(() => Math.max(0, this.subtotal() - this.discount()));

  private authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  private loadLocalCart(): LocalCartItem[] {
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  private saveLocalCart(items: LocalCartItem[]): void {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  }

  addLocalItem(item: Omit<LocalCartItem, 'tempId'>): void {
    const current = this.localCartItems();
    const existing = current.find(i =>
      i.productId === item.productId &&
      i.selectedSizeId === item.selectedSizeId &&
      i.selectedColorName === item.selectedColorName
    );
    let updated: LocalCartItem[];
    if (existing) {
      updated = current.map(i => i === existing
        ? { ...i, quantity: i.quantity + item.quantity, subtotal: i.price * (i.quantity + item.quantity) }
        : i
      );
    } else {
      const newItem: LocalCartItem = { ...item, tempId: crypto.randomUUID() };
      updated = [...current, newItem];
    }
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }

  removeLocalItem(tempId: string): void {
    const updated = this.localCartItems().filter(i => i.tempId !== tempId);
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }

  updateLocalQuantity(tempId: string, qty: number): void {
    if (qty <= 0) { this.removeLocalItem(tempId); return; }
    const updated = this.localCartItems().map(i =>
      i.tempId === tempId ? { ...i, quantity: qty, subtotal: i.price * qty } : i
    );
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }

  clearLocalCart(): void {
    this.localCartItems.set([]);
    localStorage.removeItem(LOCAL_CART_KEY);
  }

  loadCart(): void {
    if (!this.authService.isLoggedIn()) return;
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
