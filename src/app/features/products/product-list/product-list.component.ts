import { Component, OnDestroy, OnInit } from '@angular/core';
import { visibleCategories } from '@shared/visible-categories';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { Product, Category, ProductColor, ProductSize, PromoBanner } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { CloudinaryPipe } from '@shared/pipes/cloudinary.pipe';
import { isBrowser } from '@core/ssr';

@Component({
    selector: 'app-product-list',
    imports: [CloudinaryPipe, FormsModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
        MatInputModule, MatPaginatorModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit, OnDestroy {
  /** the product's categories the store shows (hidden ones are only for the admin) */
  readonly shownCategories = visibleCategories;

  products: Product[] = [];
  categories: Category[] = [];
  banners: PromoBanner[] = [];
  carouselIndex = 0;
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;
  // a running interval would keep a server render from ever finishing
  private readonly browser = isBrowser();
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
    if (!this.browser) return;
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
    if (!this.hasAnyStock(product)) return 'Sin existencia';
    if (product.colors && product.colors.length > 0) return 'Ver opciones';
    return 'Agregar al carrito';
  }

  // Add to cart flow
  onAddToCartClick(product: Product): void {
    if (product.colors && product.colors.length > 0) {
      // Open popup for variant selection
      this.popupProduct = product;
      this.popupSelectedColor = null;
      this.popupSelectedSize = null;
      return;
    }

    if (!this.authService.isLoggedIn()) {
      const price = product.discountedPrice ?? product.price;
      this.cartService.addLocalItem({
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl,
        price,
        quantity: 1,
        subtotal: price,
      });
      this.snackBar.open(`${product.name} agregado al carrito`, 'Cerrar', { duration: 2000 });
      return;
    }

    this.cartService.addToCart(product.id).subscribe({
      next: () => this.snackBar.open(`${product.name} agregado al carrito`, 'Cerrar', { duration: 2000 }),
      error: () => this.snackBar.open('Error al agregar al carrito', 'Cerrar', { duration: 3000 }),
    });
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

    if (!this.authService.isLoggedIn()) {
      const price = this.popupProduct.discountedPrice ?? this.popupProduct.price;
      this.cartService.addLocalItem({
        productId: this.popupProduct.id,
        productName: this.popupProduct.name,
        imageUrl: this.popupSelectedColor?.images?.[0] ?? this.popupProduct.imageUrl,
        price,
        quantity: 1,
        selectedSizeId: this.popupSelectedSize?.id,
        selectedSizeName: this.popupSelectedSize?.name,
        selectedColorName: this.popupSelectedColor?.name,
        subtotal: price,
      });
      this.snackBar.open(`${this.popupProduct.name} agregado al carrito`, 'Cerrar', { duration: 2000 });
      this.closePopup();
      return;
    }

    this.addingToCart = true;
    this.cartService.addToCart(this.popupProduct.id, 1, this.popupSelectedSize?.id).subscribe({
      next: () => {
        this.snackBar.open(`${this.popupProduct!.name} agregado al carrito`, 'Cerrar', { duration: 2000 });
        this.addingToCart = false;
        this.closePopup();
      },
      error: () => {
        this.snackBar.open('Error al agregar al carrito', 'Cerrar', { duration: 3000 });
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

  selectCategory(id: number): void {
    this.selectedCategory = id;
    this.currentPage = 0;
    this.searchQuery = '';
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
