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
import { Product, ProductColor, ProductSize } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent, ProductReviewsComponent],
  template: `
    @if (loading) {
      <app-loading />
    } @else if (product) {
      <div class="container detail-grid">
        <div class="image-section">
          <!-- Carousel -->
          <div class="carousel">
            <div class="zoom-container" (mousemove)="onZoomMove($event)" (mouseleave)="zoomActive = false" (mouseenter)="zoomActive = true">
              <img [src]="carouselImages[activeIndex]" [alt]="product.name" class="main-image"
                [style.transform-origin]="zoomOrigin"
                [class.zoomed]="zoomActive">
            </div>

            @if (carouselImages.length > 1) {
              <button mat-icon-button class="carousel-btn prev" (click)="prev()" [disabled]="activeIndex === 0">
                <mat-icon>chevron_left</mat-icon>
              </button>
              <button mat-icon-button class="carousel-btn next" (click)="next()" [disabled]="activeIndex === carouselImages.length - 1">
                <mat-icon>chevron_right</mat-icon>
              </button>

              <div class="carousel-dots">
                @for (img of carouselImages; track img; let i = $index) {
                  <span class="dot" [class.active]="i === activeIndex" (click)="activeIndex = i"></span>
                }
              </div>
            }
          </div>

          <!-- Thumbnails -->
          @if (carouselImages.length > 1) {
            <div class="thumbnail-row">
              @for (img of carouselImages; track img; let i = $index) {
                <img [src]="img" class="thumbnail" [class.selected]="i === activeIndex" (click)="activeIndex = i" [alt]="'Image ' + (i + 1)">
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
            @if (product.discountedPrice) {
              <span class="price promo-price">{{ product.discountedPrice | currency }}</span>
              <span class="compare-price">{{ product.price | currency }}</span>
              <mat-chip class="promo-chip">{{ product.activePromotionName }} &minus;{{ product.activePromotionDiscount }}%</mat-chip>
            } @else {
              <span class="price">{{ product.price | currency }}</span>
              @if (product.compareAtPrice) {
                <span class="compare-price">{{ product.compareAtPrice | currency }}</span>
                <mat-chip class="sale-chip">Oferta</mat-chip>
              }
            }
          </div>
          <p class="description">{{ product.description }}</p>

          <div class="stock-info">
            @if (colors.length === 0) {
              @if (product.stockQuantity > 0) {
                <mat-chip class="in-stock"><mat-icon>check_circle</mat-icon> En existencia ({{ product.stockQuantity }})</mat-chip>
              } @else {
                <mat-chip class="out-of-stock"><mat-icon>cancel</mat-icon> Sin existencia</mat-chip>
              }
            }
          </div>

          @if (product.sku) {
            <p class="sku">SKU: {{ product.sku }}</p>
          }

          <!-- Color & Size variants -->
          @if (colors.length > 0) {
            <div class="variants-section">
              <div class="variant-group">
                <p class="variant-label">Color: <strong>{{ selectedColor?.name ?? '' }}</strong></p>
                <div class="variant-options">
                  @for (c of colors; track c.id) {
                    <button class="variant-btn" [class.selected]="selectedColor === c" (click)="selectColor(c)">
                      {{ c.name }}
                    </button>
                  }
                </div>
              </div>

              @if (selectedColor && selectedColor.sizes.length > 0) {
                <div class="variant-group">
                  <p class="variant-label">Talla: <strong>{{ selectedSize?.name ?? '' }}</strong></p>
                  <div class="variant-options">
                    @for (s of selectedColor.sizes; track s.id) {
                      <button class="variant-btn" [class.selected]="selectedSize === s"
                        [class.out-of-stock-btn]="s.stock === 0"
                        (click)="selectSize(s)">
                        {{ s.name }}
                      </button>
                    }
                  </div>
                </div>
              }

              @if (selectedColor && selectedSize) {
                @if (selectedSize.stock > 0) {
                  <p class="variant-stock in-stock-text">{{ selectedSize.stock }} disponible(s) para {{ selectedColor.name }} / {{ selectedSize.name }}</p>
                } @else {
                  <p class="variant-stock out-of-stock-text">Sin existencia para {{ selectedColor.name }} / {{ selectedSize.name }}</p>
                }
              }
            </div>
          }

          <div class="quantity-section">
            <button mat-icon-button (click)="quantity > 1 && quantity = quantity - 1"><mat-icon>remove</mat-icon></button>
            <span class="quantity">{{ quantity }}</span>
            <button mat-icon-button (click)="quantity = quantity + 1"><mat-icon>add</mat-icon></button>
          </div>

          @if (colors.length > 0 && (!selectedColor || (selectedColor.sizes.length > 0 && !selectedSize))) {
            <p class="selection-warning">Por favor selecciona color y talla antes de agregar al carrito.</p>
          }
          <button mat-raised-button color="primary" class="add-btn" (click)="addToCart()" [disabled]="isAddToCartDisabled()">
            <mat-icon>add_shopping_cart</mat-icon>
            {{ addToCartLabel() }}
          </button>
        </div>
      </div>

      <div class="container">
        <app-product-reviews [productId]="product.id" />
      </div>
    }
  `,
  styles: [`
    .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; padding: 32px 16px; }

    /* Carousel */
    .carousel { position: relative; }
    .zoom-container { overflow: hidden; border-radius: 8px; cursor: zoom-in; }
    .main-image { width: 100%; object-fit: cover; max-height: 500px; display: block; transition: transform 0.1s ease; }
    .main-image.zoomed { transform: scale(2); }
    .carousel-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(255,255,255,0.9) !important;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    .carousel-btn.prev { left: 8px; }
    .carousel-btn.next { right: 8px; }
    .carousel-dots { display: flex; justify-content: center; gap: 8px; margin-top: 12px; }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #ccc; cursor: pointer; transition: background 0.2s; }
    .dot.active { background: var(--theme-primary); }

    /* Thumbnails */
    .thumbnail-row { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
    .thumbnail { width: 64px; height: 64px; object-fit: cover; border-radius: 4px; cursor: pointer; border: 2px solid transparent; }
    .thumbnail:hover { border-color: var(--theme-primary); }
    .thumbnail.selected { border-color: var(--theme-primary); }

    /* Info */
    .breadcrumbs { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; }
    .breadcrumb { color: #666; font-size: 0.9rem; }
    .separator { color: #ccc; font-size: 0.9rem; }
    h1 { margin: 8px 0 16px; }
    .price-section { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .price { font-size: 1.8rem; font-weight: 700; color: var(--theme-primary); }
    .price.promo-price { color: #e53935; }
    .compare-price { font-size: 1.2rem; color: #999; text-decoration: line-through; }
    .sale-chip { background: #ff5722 !important; color: white !important; }
    .promo-chip { background: #e53935 !important; color: white !important; }
    .description { color: #555; line-height: 1.6; margin-bottom: 24px; }
    .stock-info { margin-bottom: 16px; }
    .in-stock { background: #e8f5e9 !important; color: #2e7d32 !important; }
    .out-of-stock { background: #ffebee !important; color: #c62828 !important; }
    .sku { color: #999; font-size: 0.85rem; }
    .quantity-section { display: flex; align-items: center; gap: 8px; margin: 24px 0; }
    .quantity { font-size: 1.2rem; font-weight: 500; min-width: 32px; text-align: center; }
    .selection-warning { font-size: 0.875rem; color: #e65100; margin: 0 0 8px; }
    .add-btn { width: 100%; padding: 12px; font-size: 1.1rem; }

    /* Variants */
    .variants-section { margin: 16px 0; display: flex; flex-direction: column; gap: 16px; }
    .variant-group { display: flex; flex-direction: column; gap: 8px; }
    .variant-label { margin: 0; font-size: 0.9rem; color: #555; }
    .variant-options { display: flex; flex-wrap: wrap; gap: 8px; }
    .variant-btn { padding: 6px 16px; border: 1.5px solid #ccc; border-radius: 4px; background: white; cursor: pointer; font-size: 0.9rem; transition: all 0.15s; }
    .variant-btn:hover { border-color: var(--theme-primary); color: var(--theme-primary); }
    .variant-btn.selected { border-color: var(--theme-primary); background: var(--theme-primary); color: white; }
    .variant-btn.out-of-stock-btn { color: #bbb; border-color: #eee; text-decoration: line-through; cursor: default; }
    .variant-stock { margin: 0; font-size: 0.875rem; }
    .in-stock-text { color: #2e7d32; }
    .out-of-stock-text { color: #c62828; }

    @media (max-width: 768px) { .detail-grid { grid-template-columns: 1fr; gap: 24px; } }
  `],
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;
  activeIndex = 0;
  carouselImages: string[] = [];
  colors: ProductColor[] = [];
  selectedColor: ProductColor | null = null;
  selectedSize: ProductSize | null = null;
  zoomActive = false;
  zoomOrigin = '50% 50%';

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
      next: (res) => {
        this.product = res.data;
        this.colors = res.data.colors || [];
        if (this.colors.length > 0) {
          this.selectColor(this.colors[0]);
        } else {
          this.buildCarouselImages();
        }
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  private buildCarouselImages(): void {
    if (!this.product) return;
    const all: string[] = [];
    if (this.product.imageUrl) all.push(this.product.imageUrl);
    for (const img of (this.product.images || [])) {
      if (!all.includes(img)) all.push(img);
    }
    this.carouselImages = all.length > 0 ? all : ['https://via.placeholder.com/500x400?text=No+Image'];
    this.activeIndex = 0;
  }

  selectColor(color: ProductColor): void {
    this.selectedColor = color;
    this.selectedSize = color.sizes.length > 0 ? color.sizes[0] : null;
    const imgs = color.images.length > 0 ? color.images : [];
    if (imgs.length > 0) {
      this.carouselImages = imgs;
    } else {
      this.buildCarouselImages();
    }
    this.activeIndex = 0;
  }

  selectSize(size: ProductSize): void {
    this.selectedSize = size;
  }

  onZoomMove(event: MouseEvent): void {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    this.zoomOrigin = `${x}% ${y}%`;
  }

  prev(): void {
    if (this.activeIndex > 0) this.activeIndex--;
  }

  next(): void {
    if (this.activeIndex < this.carouselImages.length - 1) this.activeIndex++;
  }

  isAddToCartDisabled(): boolean {
    if (!this.product) return true;
    if (this.colors.length > 0) {
      if (!this.selectedColor) return true;
      if (this.selectedColor.sizes.length > 0 && !this.selectedSize) return true;
      if (this.selectedSize && this.selectedSize.stock === 0) return true;
    } else {
      if (this.product.stockQuantity === 0) return true;
    }
    return false;
  }

  addToCartLabel(): string {
    if (this.colors.length > 0) {
      if (!this.selectedColor) return 'Selecciona un color';
      if (this.selectedColor.sizes.length > 0 && !this.selectedSize) return 'Selecciona una talla';
      if (this.selectedSize && this.selectedSize.stock === 0) return 'Sin existencia';
    } else if (this.product?.stockQuantity === 0) {
      return 'Sin existencia';
    }
    return 'Agregar al carrito';
  }

  addToCart(): void {
    if (!this.product) return;
    if (!this.authService.isTokenValid()) {
      const price = this.product.discountedPrice ?? this.product.price;
      this.cartService.addLocalItem({
        productId: this.product.id,
        productName: this.product.name,
        imageUrl: this.selectedColor?.images?.[0] ?? this.product.imageUrl,
        price,
        quantity: this.quantity,
        selectedSizeId: this.selectedSize?.id,
        selectedSizeName: this.selectedSize?.name,
        selectedColorName: this.selectedColor?.name,
        subtotal: price * this.quantity,
      });
      this.snackBar.open('¡Agregado al carrito!', 'Cerrar', { duration: 2000 });
      return;
    }
    this.cartService.addToCart(this.product.id, this.quantity, this.selectedSize?.id).subscribe({
      next: () => this.snackBar.open('¡Agregado al carrito!', 'Cerrar', { duration: 2000 }),
      error: () => this.snackBar.open('Error al agregar al carrito', 'Cerrar', { duration: 3000 }),
    });
  }
}
