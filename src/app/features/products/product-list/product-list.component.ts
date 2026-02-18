import { Component, OnInit } from '@angular/core';
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
import { Product, Category } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatPaginatorModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent],
  template: `
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
                  <span class="price">{{ product.price | currency }}</span>
                  @if (product.compareAtPrice) {
                    <span class="compare-price">{{ product.compareAtPrice | currency }}</span>
                  }
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary" (click)="addToCart(product)"
                        [disabled]="product.stockQuantity === 0">
                  <mat-icon>add_shopping_cart</mat-icon>
                  {{ product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart' }}
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
  `,
  styles: [`
    .filters { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
    .search-field { flex: 1; min-width: 250px; }
    .product-card { cursor: pointer; transition: transform 0.2s; }
    .product-card:hover { transform: translateY(-4px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }
    .product-image { height: 200px; object-fit: cover; }
    .product-name h3 { margin: 8px 0 4px; font-size: 1.1rem; color: #333; }
    .category-tag { color: #666; font-size: 0.85rem; margin: 0 0 8px; }
    .price-row { display: flex; align-items: center; gap: 8px; }
    .price { font-size: 1.25rem; font-weight: 700; color: #3f51b5; }
    .compare-price { font-size: 0.95rem; color: #999; text-decoration: line-through; }
    .no-results { text-align: center; padding: 48px; color: #666; font-size: 1.1rem; grid-column: 1 / -1; }
    mat-card-actions { padding: 8px 16px 16px; }
  `],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  searchQuery = '';
  selectedCategory = 0;
  currentPage = 0;
  pageSize = 12;
  totalElements = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getCategories().subscribe(res => this.categories = res.data);
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

  addToCart(product: Product): void {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('Please sign in to add items to cart', 'Sign In', { duration: 3000 })
        .onAction().subscribe(() => window.location.href = '/login');
      return;
    }
    this.cartService.addToCart(product.id).subscribe({
      next: () => this.snackBar.open(`${product.name} added to cart`, 'Close', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to add to cart', 'Close', { duration: 3000 }),
    });
  }
}
