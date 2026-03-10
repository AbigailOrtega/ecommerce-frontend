import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '@core/services/cart.service';
import { CartItem } from '@shared/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatSnackBarModule, CurrencyPipe],
  template: `
    <div class="container">
      <h1>Shopping Cart</h1>

      @if (cart.items().length === 0) {
        <mat-card class="empty-cart">
          <mat-icon class="empty-icon">shopping_cart</mat-icon>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a mat-raised-button color="primary" routerLink="/">Continue Shopping</a>
        </mat-card>
      } @else {
        <div class="cart-layout">
          <div class="cart-items">
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
                        @if (item.selectedSizeName) { Size: {{ item.selectedSizeName }} }
                      </p>
                    }
                    <p class="item-price">{{ item.product.price | currency }}</p>
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
          </div>

          <mat-card class="cart-summary">
            <h2>Order Summary</h2>
            <div class="summary-row">
              <span>Items ({{ cart.itemCount() }})</span>
              <span>{{ cart.total() | currency }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr>
            <div class="summary-row total">
              <span>Total</span>
              <span>{{ cart.total() | currency }}</span>
            </div>
            <a mat-raised-button color="primary" routerLink="/checkout" class="checkout-btn">
              Proceed to Checkout
            </a>
            <button mat-button color="warn" (click)="clearCart()" class="clear-btn">Clear Cart</button>
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
    .item-variant { color: #3f51b5; font-size: 0.82rem; margin: 2px 0 0; }
    .item-price { color: #666; margin: 2px 0 0; }
    .quantity-controls { display: flex; align-items: center; gap: 4px; }
    .item-subtotal { font-weight: 600; min-width: 80px; text-align: right; }
    .cart-summary { padding: 24px; position: sticky; top: 80px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; }
    .summary-row.total { font-size: 1.2rem; font-weight: 700; }
    .checkout-btn { width: 100%; margin-top: 16px; }
    .clear-btn { width: 100%; margin-top: 8px; }
    @media (max-width: 768px) { .cart-layout { grid-template-columns: 1fr; } }
  `],
})
export class CartComponent implements OnInit {
  constructor(public cart: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.cart.loadCart();
  }

  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }
    this.cart.updateQuantity(item.id, quantity).subscribe();
  }

  removeItem(item: CartItem): void {
    this.cart.removeItem(item.id).subscribe({
      next: () => this.snackBar.open('Item removed', 'Close', { duration: 2000 }),
    });
  }

  clearCart(): void {
    this.cart.clearCart().subscribe({
      next: () => this.snackBar.open('Cart cleared', 'Close', { duration: 2000 }),
    });
  }
}
