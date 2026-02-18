import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { Product } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent],
  template: `
    @if (loading) {
      <app-loading />
    } @else if (product) {
      <div class="container detail-grid">
        <div class="image-section">
          <img [src]="product.imageUrl || 'https://via.placeholder.com/500x400?text=No+Image'" [alt]="product.name" class="main-image">
          @if (product.images && product.images.length > 0) {
            <div class="thumbnail-row">
              @for (img of product.images; track img) {
                <img [src]="img" class="thumbnail" (click)="product.imageUrl = img">
              }
            </div>
          }
        </div>
        <div class="info-section">
          @if (product.categories && product.categories.length > 0) {
            <div class="breadcrumbs">
              @for (cat of product.categories; track cat.id; let last = $last) {
                <a [routerLink]="['/']" [queryParams]="{category: cat.id}" class="breadcrumb">{{ cat.name }}</a>@if (!last) {<span class="separator">/</span>}
              }
            </div>
          }
          <h1>{{ product.name }}</h1>
          <div class="price-section">
            <span class="price">{{ product.price | currency }}</span>
            @if (product.compareAtPrice) {
              <span class="compare-price">{{ product.compareAtPrice | currency }}</span>
              <mat-chip class="sale-chip">Sale</mat-chip>
            }
          </div>
          <p class="description">{{ product.description }}</p>

          <div class="stock-info">
            @if (product.stockQuantity > 0) {
              <mat-chip class="in-stock"><mat-icon>check_circle</mat-icon> In Stock ({{ product.stockQuantity }})</mat-chip>
            } @else {
              <mat-chip class="out-of-stock"><mat-icon>cancel</mat-icon> Out of Stock</mat-chip>
            }
          </div>

          @if (product.sku) {
            <p class="sku">SKU: {{ product.sku }}</p>
          }

          <div class="quantity-section">
            <button mat-icon-button (click)="quantity > 1 && quantity = quantity - 1"><mat-icon>remove</mat-icon></button>
            <span class="quantity">{{ quantity }}</span>
            <button mat-icon-button (click)="quantity = quantity + 1"><mat-icon>add</mat-icon></button>
          </div>

          <button mat-raised-button color="primary" class="add-btn" (click)="addToCart()" [disabled]="product.stockQuantity === 0">
            <mat-icon>add_shopping_cart</mat-icon>
            {{ product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
          </button>
        </div>
      </div>
    }
  `,
  styles: [`
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 32px 16px; }
    .main-image { width: 100%; border-radius: 8px; object-fit: cover; max-height: 500px; }
    .thumbnail-row { display: flex; gap: 8px; margin-top: 12px; }
    .thumbnail { width: 64px; height: 64px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid transparent; }
    .thumbnail:hover { border-color: #3f51b5; }
    .breadcrumbs { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
    .breadcrumb { color: #666; font-size: 0.9rem; }
    .separator { color: #ccc; font-size: 0.9rem; }
    h1 { margin: 8px 0 16px; }
    .price-section { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .price { font-size: 1.8rem; font-weight: 700; color: #3f51b5; }
    .compare-price { font-size: 1.2rem; color: #999; text-decoration: line-through; }
    .sale-chip { background: #ff5722 !important; color: white !important; }
    .description { color: #555; line-height: 1.6; margin-bottom: 24px; }
    .stock-info { margin-bottom: 16px; }
    .in-stock { background: #e8f5e9 !important; color: #2e7d32 !important; }
    .out-of-stock { background: #ffebee !important; color: #c62828 !important; }
    .sku { color: #999; font-size: 0.85rem; }
    .quantity-section { display: flex; align-items: center; gap: 8px; margin: 24px 0; }
    .quantity { font-size: 1.2rem; font-weight: 500; min-width: 32px; text-align: center; }
    .add-btn { width: 100%; padding: 12px; font-size: 1.1rem; }
    @media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr; gap: 24px; } }
  `],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => { this.product = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  addToCart(): void {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Please sign in first', 'Close', { duration: 3000 });
      return;
    }
    if (!this.product) return;
    this.cartService.addToCart(this.product.id, this.quantity).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 }),
    });
  }
}
