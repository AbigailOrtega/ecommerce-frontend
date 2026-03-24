import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { CartItem, LocalCartItem } from '@shared/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule, CurrencyPipe],
  template: `
    <div class="container">
      <h1>Mi Carrito</h1>

      @if (isEmpty()) {
        <mat-card class="empty-cart">
          <mat-icon class="empty-icon">shopping_cart</mat-icon>
          <h2>Tu carrito está vacío</h2>
          <p>Aún no has agregado productos a tu carrito.</p>
          <a mat-raised-button color="primary" routerLink="/">Seguir comprando</a>
        </mat-card>
      } @else {
        <div class="cart-layout">
          <div class="cart-items">

            @if (auth.isLoggedIn()) {
              @for (item of cart.items(); track item.id) {
                <mat-card class="cart-item">
                  <div class="item-content">
                    <img [src]="item.product.imageUrl || 'https://via.placeholder.com/80'" [alt]="item.product.name">
                    <div class="item-info">
                      <a [routerLink]="['/products', item.product.slug]" class="item-name">{{ item.product.name }}</a>
                      @if (item.selectedColorName || item.selectedSizeName) {
                        <p class="item-variant">
                          @if (item.selectedColorName) { Color: {{ item.selectedColorName }} }
                          @if (item.selectedColorName && item.selectedSizeName) { &middot; }
                          @if (item.selectedSizeName) { Talla: {{ item.selectedSizeName }} }
                        </p>
                      }
                      @if (item.product.discountedPrice) {
                        <p class="item-price">
                          <span class="original-price">{{ item.product.price | currency }}</span>
                          <span class="discounted-price">{{ item.product.discountedPrice | currency }}</span>
                          <span class="promo-badge">{{ item.product.activePromotionDiscount }}% off</span>
                        </p>
                      } @else {
                        <p class="item-price">{{ item.product.price | currency }}</p>
                      }
                    </div>
                    <div class="quantity-controls">
                      <button mat-icon-button (click)="updateQuantity(item, item.quantity - 1)">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button mat-icon-button (click)="updateQuantity(item, item.quantity + 1)">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>
                    <span class="item-subtotal">{{ item.subtotal | currency }}</span>
                    <button mat-icon-button color="warn" (click)="removeItem(item)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </mat-card>
              }
            } @else {
              @for (item of cart.localItems(); track item.tempId) {
                <mat-card class="cart-item">
                  <div class="item-content">
                    <img [src]="item.imageUrl || 'https://via.placeholder.com/80'" [alt]="item.productName">
                    <div class="item-info">
                      <span class="item-name">{{ item.productName }}</span>
                      @if (item.selectedColorName || item.selectedSizeName) {
                        <p class="item-variant">
                          @if (item.selectedColorName) { Color: {{ item.selectedColorName }} }
                          @if (item.selectedColorName && item.selectedSizeName) { &middot; }
                          @if (item.selectedSizeName) { Talla: {{ item.selectedSizeName }} }
                        </p>
                      }
                      <p class="item-price">{{ item.price | currency }}</p>
                    </div>
                    <div class="quantity-controls">
                      <button mat-icon-button (click)="cart.updateLocalQuantity(item.tempId, item.quantity - 1)">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <span>{{ item.quantity }}</span>
                      <button mat-icon-button (click)="cart.updateLocalQuantity(item.tempId, item.quantity + 1)">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>
                    <span class="item-subtotal">{{ item.subtotal | currency }}</span>
                    <button mat-icon-button color="warn" (click)="cart.removeLocalItem(item.tempId)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </mat-card>
              }
            }

          </div>

          <mat-card class="cart-summary">
            <h2>Resumen del pedido</h2>
            <div class="summary-row">
              <span>Productos ({{ cart.itemCount() }})</span>
              <span>{{ cart.subtotal() | currency }}</span>
            </div>

            @if (auth.isLoggedIn()) {
              <!-- Coupon input (auth only) -->
              @if (!cart.coupon()) {
                <div class="coupon-row">
                  <mat-form-field appearance="outline" class="coupon-field">
                    <mat-label>Código de cupón</mat-label>
                    <input matInput [(ngModel)]="couponCode" (keyup.enter)="applyCoupon()"
                           placeholder="ej. BUENFIN10" [disabled]="applyingCoupon">
                    <mat-icon matSuffix>local_offer</mat-icon>
                  </mat-form-field>
                  <button mat-stroked-button (click)="applyCoupon()" [disabled]="!couponCode || applyingCoupon">
                    {{ applyingCoupon ? '...' : 'Aplicar' }}
                  </button>
                </div>
              } @else {
                <div class="coupon-applied">
                  <mat-icon class="coupon-icon">check_circle</mat-icon>
                  <span><strong>{{ cart.coupon()!.code }}</strong> — {{ cart.coupon()!.discountPercent }}% off</span>
                  <button mat-icon-button (click)="removeCoupon()" title="Remove coupon">
                    <mat-icon>close</mat-icon>
                  </button>
                </div>
                <div class="summary-row discount-row">
                  <span>Descuento</span>
                  <span class="discount-value">-{{ cart.discount() | currency }}</span>
                </div>
              }
            }

            <div class="summary-row">
              <span>Envío</span>
              <span>Calculado en checkout</span>
            </div>
            <hr>
            <div class="summary-row total">
              <span>Subtotal</span>
              <span>{{ cart.total() | currency }}</span>
            </div>
            <a mat-raised-button color="primary" routerLink="/checkout" class="checkout-btn">
              Ir al pago
            </a>
            @if (auth.isLoggedIn()) {
              <button mat-button color="warn" (click)="clearCart()" class="clear-btn">Vaciar carrito</button>
            } @else {
              <button mat-button color="warn" (click)="cart.clearLocalCart()" class="clear-btn">Vaciar carrito</button>
            }
          </mat-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .empty-cart { text-align: center; padding: 48px; }
    .empty-icon { font-size: 64px; width: 64px; height: 64px; color: #ccc; }
    .cart-layout { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
    .cart-item { margin-bottom: 12px; }
    .item-content { display: flex; align-items: center; gap: 16px; padding: 8px; }
    .item-content img { width: 80px; height: 80px; object-fit: cover; border-radius: 4px; }
    .item-info { flex: 1; }
    .item-name { font-weight: 500; color: #333; }
    .item-variant { color: var(--theme-primary); font-size: 0.82rem; margin: 2px 0 0; }
    .item-price { color: #666; margin: 2px 0 0; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .original-price { text-decoration: line-through; color: #aaa; font-size: 0.85rem; }
    .discounted-price { color: #d32f2f; font-weight: 600; }
    .promo-badge { background: #d32f2f; color: #fff; font-size: 0.7rem; padding: 1px 6px; border-radius: 10px; }
    .quantity-controls { display: flex; align-items: center; gap: 4px; }
    .item-subtotal { font-weight: 600; min-width: 80px; text-align: right; }
    .cart-summary { padding: 24px; position: sticky; top: 80px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-row.total { font-size: 1.2rem; font-weight: 700; }
    .coupon-row { display: flex; align-items: center; gap: 8px; margin: 8px 0 4px; }
    .coupon-field { flex: 1; }
    .coupon-applied {
      display: flex; align-items: center; gap: 6px;
      background: #e8f5e9; border-radius: 6px; padding: 6px 10px; margin: 8px 0 4px;
      font-size: 0.9rem;
    }
    .coupon-icon { color: #2e7d32; font-size: 18px; width: 18px; height: 18px; }
    .coupon-applied span { flex: 1; }
    .discount-row { color: #2e7d32; }
    .discount-value { font-weight: 600; }
    .checkout-btn { width: 100%; margin-top: 16px; }
    .clear-btn { width: 100%; margin-top: 8px; }
    @media (max-width: 768px) {
      .cart-layout { grid-template-columns: 1fr; }
      .cart-summary { position: static; }
    }
    @media (max-width: 600px) {
      .item-content {
        flex-wrap: wrap;
        align-items: flex-start;
        padding: 10px 8px;
        gap: 8px 10px;
      }
      .item-content img { width: 64px; height: 64px; flex-shrink: 0; align-self: center; }
      .item-info { flex: 1 1 0; min-width: 100px; }
      .quantity-controls { flex-shrink: 0; }
      .item-subtotal { flex: 1; text-align: right; min-width: 0; align-self: center; }
      .coupon-row { flex-wrap: wrap; }
      .coupon-field { min-width: 0; }
    }
  `],
})
export class CartComponent implements OnInit {
  couponCode = '';
  applyingCoupon = false;

  constructor(
    public cart: CartService,
    public auth: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cart.loadCart();
  }

  isEmpty(): boolean {
    return this.auth.isLoggedIn()
      ? this.cart.items().length === 0
      : this.cart.localItems().length === 0;
  }

  applyCoupon(): void {
    if (!this.couponCode.trim()) return;
    this.applyingCoupon = true;
    this.cart.validateCoupon(this.couponCode).subscribe({
      next: (res) => {
        this.applyingCoupon = false;
        this.couponCode = '';
        this.snackBar.open(`Cupón aplicado: ${res.data.discountPercent}% de descuento`, 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.applyingCoupon = false;
        this.snackBar.open(err.error?.message || 'Código de cupón inválido', 'Cerrar', { duration: 3000 });
      },
    });
  }

  removeCoupon(): void {
    this.cart.removeCoupon();
    this.snackBar.open('Cupón eliminado', 'Cerrar', { duration: 2000 });
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) { this.removeItem(item); return; }
    this.cart.updateQuantity(item.id, quantity).subscribe();
  }

  removeItem(item: CartItem): void {
    this.cart.removeItem(item.id).subscribe({
      next: () => this.snackBar.open('Producto eliminado', 'Cerrar', { duration: 2000 }),
    });
  }

  clearCart(): void {
    this.cart.clearCart().subscribe({
      next: () => this.snackBar.open('Carrito vaciado', 'Cerrar', { duration: 2000 }),
    });
  }
}
