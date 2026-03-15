import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { Product, Category, ProductColor, ProductSize, PromoBanner } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatPaginatorModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent],
  template: `
    @if (banners.length > 0) {
      <div class="carousel-root">
        <!-- Slides strip -->
        <div class="carousel-track" [style.transform]="'translateX(-' + carouselIndex * 100 + '%)'">
          @for (banner of banners; track banner.id) {
            <div class="carousel-slide">
              @if (banner.linkUrl) {
                <a [href]="banner.linkUrl" target="_blank" rel="noopener">
                  <img [src]="banner.imageUrl" alt="Promotional banner" class="carousel-img">
                </a>
              } @else {
                <img [src]="banner.imageUrl" alt="Promotional banner" class="carousel-img">
              }
            </div>
          }
        </div>

        <!-- Arrows (only when > 1 banner) -->
        @if (banners.length > 1) {
          <button class="carousel-arrow left" (click)="prevSlide()" aria-label="Previous">&#8249;</button>
          <button class="carousel-arrow right" (click)="nextSlide()" aria-label="Next">&#8250;</button>

          <!-- Dots -->
          <div class="carousel-dots">
            @for (b of banners; track b.id; let i = $index) {
              <span class="dot" [class.active]="i === carouselIndex" (click)="goToSlide(i)"></span>
            }
          </div>
        }
      </div>
    }

    <div class="container">
      <h1>Our Products</h1>

      <div class="filters">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search products...</mat-label>
          <input matInput [(ngModel)]="searchQuery" (keyup.enter)="onSearch()">
          <button mat-icon-button matSuffix (click)="onSearch()">
            <mat-icon>search</mat-icon>
          </button>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategory" (selectionChange)="onCategoryChange()">
            <mat-option [value]="0">All Categories</mat-option>
            @for (cat of categories; track cat.id) {
              <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
            }
          </mat-select>
        </mat-form-field>
      </div>

      @if (loading) {
        <app-loading />
      } @else {
        <div class="product-grid">
          @for (product of products; track product.id) {
            <mat-card class="product-card">
              <a [routerLink]="['/products', product.slug]">
                <img mat-card-image [src]="product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'"
                     [alt]="product.name" class="product-image">
              </a>
              <mat-card-content>
                <a [routerLink]="['/products', product.slug]" class="product-name">
                  <h3>{{ product.name }}</h3>
                </a>
                @if (product.categories && product.categories.length > 0) {
                  <p class="category-tag">{{ product.categories[0].name }}@if (product.categories.length > 1) { +{{ product.categories.length - 1 }}}</p>
                }
                <div class="price-row">
                  @if (product.discountedPrice) {
                    <span class="price discounted">{{ product.discountedPrice | currency }}</span>
                    <span class="compare-price">{{ product.price | currency }}</span>
                    <span class="promo-badge">{{ product.activePromotionName }} -{{ product.activePromotionDiscount }}%</span>
                  } @else {
                    <span class="price">{{ product.price | currency }}</span>
                    @if (product.compareAtPrice) {
                      <span class="compare-price">{{ product.compareAtPrice | currency }}</span>
                    }
                  }
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="onAddToCartClick(product)"
                        [disabled]="!hasAnyStock(product)">
                  <mat-icon>add_shopping_cart</mat-icon>
                  {{ cartBtnLabel(product) }}
                </button>
              </mat-card-actions>
            </mat-card>
          } @empty {
            <p class="no-results">No products found.</p>
          }
        </div>

        <mat-paginator [length]="totalElements" [pageSize]="pageSize" [pageIndex]="currentPage"
                       [pageSizeOptions]="[12, 24, 48]" (page)="onPageChange($event)" />
      }
    </div>

    <!-- Color/Size selection popup -->
    @if (popupProduct) {
      <div class="popup-backdrop" (click)="closePopup()">
        <div class="popup-panel" (click)="$event.stopPropagation()">
          <div class="popup-header">
            <h3>Select Options</h3>
            <button mat-icon-button (click)="closePopup()"><mat-icon>close</mat-icon></button>
          </div>

          <p class="popup-product-name">{{ popupProduct.name }}</p>
          @if (popupProduct.discountedPrice) {
            <p class="popup-price"><span class="discounted-popup">{{ popupProduct.discountedPrice | currency }}</span> <span class="original-popup">{{ popupProduct.price | currency }}</span></p>
          } @else {
            <p class="popup-price">{{ popupProduct.price | currency }}</p>
          }

          <!-- Color selection -->
          <div class="popup-group">
            <p class="popup-label">Color: <strong>{{ popupSelectedColor?.name || 'Select a color' }}</strong></p>
            <div class="popup-options">
              @for (c of popupProduct.colors; track c.id) {
                <button class="opt-btn" [class.selected]="popupSelectedColor === c"
                  [class.oos]="!colorHasStock(c)"
                  (click)="popupSelectColor(c)">
                  {{ c.name }}
                </button>
              }
            </div>
          </div>

          <!-- Size selection (only if selected color has sizes) -->
          @if (popupSelectedColor && popupSelectedColor.sizes.length > 0) {
            <div class="popup-group">
              <p class="popup-label">Size: <strong>{{ popupSelectedSize?.name || 'Select a size' }}</strong></p>
              <div class="popup-options">
                @for (s of popupSelectedColor.sizes; track s.id) {
                  <button class="opt-btn" [class.selected]="popupSelectedSize === s"
                    [class.oos]="s.stock === 0"
                    (click)="s.stock > 0 && popupSelectSize(s)">
                    {{ s.name }}
                  </button>
                }
              </div>
            </div>
          }

          <!-- Stock info -->
          @if (popupSelectedColor && popupSelectedSize) {
            <p class="popup-stock">{{ popupSelectedSize.stock }} available</p>
          }

          <div class="popup-actions">
            <button mat-button (click)="closePopup()">Cancel</button>
            <button mat-raised-button color="primary" [disabled]="!canConfirmPopup() || addingToCart"
              (click)="confirmAddToCart()">
              {{ addingToCart ? 'Adding...' : 'Add to Cart' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    /* Carousel */
    .carousel-root {
      position: relative; width: 100%; overflow: hidden;
      background: #000; line-height: 0;
    }
    .carousel-track {
      display: flex; transition: transform 0.5s ease; will-change: transform;
    }
    .carousel-slide { flex: 0 0 100%; width: 100%; }
    .carousel-img { width: 100%; max-height: 380px; object-fit: cover; display: block; }
    .carousel-arrow {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(0,0,0,0.45); color: white; border: none;
      font-size: 2.5rem; line-height: 1; padding: 4px 14px;
      cursor: pointer; z-index: 10; border-radius: 4px;
      transition: background 0.2s;
    }
    .carousel-arrow:hover { background: rgba(0,0,0,0.7); }
    .carousel-arrow.left { left: 12px; }
    .carousel-arrow.right { right: 12px; }
    .carousel-dots {
      position: absolute; bottom: 12px; left: 50%; transform: translateX(-50%);
      display: flex; gap: 8px; z-index: 10;
    }
    .dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: rgba(255,255,255,0.5); cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .dot.active { background: white; transform: scale(1.2); }

    .filters { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
    .search-field { flex: 1; min-width: 250px; }
    .product-card { cursor: pointer; transition: transform 0.2s; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
    .product-image { height: 200px; object-fit: cover; }
    .product-name h3 { margin: 8px 0 4px; font-size: 1.1rem; color: #333; }
    .category-tag { color: #666; font-size: 0.85rem; margin: 0 0 8px; }
    .price-row { display: flex; align-items: center; gap: 8px; }
    .price { font-size: 1.25rem; font-weight: 700; color: #3f51b5; }
    .price.discounted { color: #e53935; }
    .compare-price { font-size: 0.95rem; color: #999; text-decoration: line-through; }
    .promo-badge { background: #ff5722; color: white; font-size: 0.75rem; padding: 2px 6px; border-radius: 4px; white-space: nowrap; }
    .no-results { text-align: center; padding: 48px; color: #666; font-size: 1.1rem; grid-column: 1 / -1; }
    mat-card-actions { padding: 8px 16px 16px; }

    /* Popup */
    .popup-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.5);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000;
    }
    .popup-panel {
      background: white; border-radius: 12px; padding: 24px;
      min-width: 320px; max-width: 480px; width: 90%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .popup-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
    .popup-header h3 { margin: 0; font-size: 1.1rem; }
    .popup-product-name { font-weight: 600; font-size: 1rem; margin: 0 0 2px; color: #333; }
    .popup-price { color: #3f51b5; font-weight: 700; font-size: 1.1rem; margin: 0 0 16px; }
    .discounted-popup { color: #e53935; }
    .original-popup { font-size: 0.9rem; color: #999; text-decoration: line-through; margin-left: 4px; }
    .popup-group { margin-bottom: 16px; }
    .popup-label { margin: 0 0 8px; font-size: 0.9rem; color: #555; }
    .popup-options { display: flex; flex-wrap: wrap; gap: 8px; }
    .opt-btn {
      padding: 6px 16px; border: 1.5px solid #ccc; border-radius: 4px;
      background: white; cursor: pointer; font-size: 0.9rem; transition: all 0.15s;
    }
    .opt-btn:hover:not(.oos) { border-color: #3f51b5; color: #3f51b5; }
    .opt-btn.selected { border-color: #3f51b5; background: #3f51b5; color: white; }
    .opt-btn.oos { color: #bbb; border-color: #eee; text-decoration: line-through; cursor: default; }
    .popup-stock { font-size: 0.85rem; color: #2e7d32; margin: -8px 0 8px; }
    .popup-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
  `],
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  categories: Category[] = [];
  banners: PromoBanner[] = [];
  carouselIndex = 0;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  loading = true;
  searchQuery = '';
  selectedCategory = 0;
  currentPage = 0;
  pageSize = 12;
  totalElements = 0;

  // Popup state
  popupProduct: Product | null = null;
  popupSelectedColor: ProductColor | null = null;
  popupSelectedSize: ProductSize | null = null;
  addingToCart = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getCategories().subscribe(res => this.categories = res.data);
    this.productService.getActiveBanners().subscribe(res => {
      this.banners = res.data;
      if (this.banners.length > 1) this.startAutoPlay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayTimer = setInterval(() => this.nextSlide(), 4500);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  nextSlide(): void {
    this.carouselIndex = (this.carouselIndex + 1) % this.banners.length;
  }

  prevSlide(): void {
    this.carouselIndex = (this.carouselIndex - 1 + this.banners.length) % this.banners.length;
  }

  goToSlide(index: number): void {
    this.carouselIndex = index;
    // Restart timer so manual nav doesn't immediately auto-advance
    this.stopAutoPlay();
    if (this.banners.length > 1) this.startAutoPlay();
  }

  loadProducts(): void {
    this.loading = true;
    const obs = this.searchQuery
      ? this.productService.searchProducts(this.searchQuery, this.currentPage, this.pageSize)
      : this.selectedCategory
        ? this.productService.getProductsByCategory(this.selectedCategory, this.currentPage, this.pageSize)
        : this.productService.getProducts(this.currentPage, this.pageSize);

    obs.subscribe({
      next: (res) => {
        this.products = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  // Stock helpers
  hasAnyStock(product: Product): boolean {
    if (product.colors && product.colors.length > 0) {
      return product.colors.some(c => c.sizes.some(s => s.stock > 0));
    }
    return product.stockQuantity > 0;
  }

  colorHasStock(color: ProductColor): boolean {
    return color.sizes.some(s => s.stock > 0);
  }

  cartBtnLabel(product: Product): string {
    if (!this.hasAnyStock(product)) return 'Out of Stock';
    if (product.colors && product.colors.length > 0) return 'Select Options';
    return 'Add to Cart';
  }

  // Add to cart flow
  onAddToCartClick(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Please sign in to add items to cart', 'Sign In', { duration: 3000 })
        .onAction().subscribe(() => window.location.href = '/login');
      return;
    }

    if (product.colors && product.colors.length > 0) {
      // Open popup for variant selection
      this.popupProduct = product;
      this.popupSelectedColor = null;
      this.popupSelectedSize = null;
    } else {
      // No variants — add directly
      this.cartService.addToCart(product.id).subscribe({
        next: () => this.snackBar.open(`${product.name} added to cart`, 'Close', { duration: 2000 }),
        error: () => this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 }),
      });
    }
  }

  // Popup methods
  popupSelectColor(color: ProductColor): void {
    this.popupSelectedColor = color;
    this.popupSelectedSize = null;
  }

  popupSelectSize(size: ProductSize): void {
    this.popupSelectedSize = size;
  }

  canConfirmPopup(): boolean {
    if (!this.popupSelectedColor) return false;
    if (this.popupSelectedColor.sizes.length > 0) {
      return this.popupSelectedSize !== null && this.popupSelectedSize.stock > 0;
    }
    return false;
  }

  confirmAddToCart(): void {
    if (!this.popupProduct || !this.canConfirmPopup()) return;
    this.addingToCart = true;
    this.cartService.addToCart(this.popupProduct.id, 1, this.popupSelectedSize?.id).subscribe({
      next: () => {
        this.snackBar.open(`${this.popupProduct!.name} added to cart`, 'Close', { duration: 2000 });
        this.addingToCart = false;
        this.closePopup();
      },
      error: () => {
        this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 });
        this.addingToCart = false;
      },
    });
  }

  closePopup(): void {
    this.popupProduct = null;
    this.popupSelectedColor = null;
    this.popupSelectedSize = null;
  }

  onSearch(): void {
    this.currentPage = 0;
    this.selectedCategory = 0;
    this.loadProducts();
  }

  onCategoryChange(): void {
    this.currentPage = 0;
    this.searchQuery = '';
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
