import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, CartItem } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/cart`;
  private cartItems = signal<CartItem[]>([]);

  readonly items = this.cartItems.asReadonly();
  readonly itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
  readonly total = computed(() => this.cartItems().reduce((sum, item) => sum + item.subtotal, 0));

  constructor(private http: HttpClient) {}

  loadCart(): void {
    this.http.get<ApiResponse<CartItem[]>>(this.apiUrl).subscribe({
      next: (res) => this.cartItems.set(res.data),
      error: () => this.cartItems.set([]),
    });
  }

  addToCart(productId: number, quantity = 1): Observable<ApiResponse<CartItem>> {
    return this.http.post<ApiResponse<CartItem>>(this.apiUrl, { productId, quantity })
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
      .pipe(tap(() => this.cartItems.set([])));
  }
}
