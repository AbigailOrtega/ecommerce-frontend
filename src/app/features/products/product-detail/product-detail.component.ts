import { Component, OnDestroy, OnInit } from '@angular/core';
import { visibleCategories } from '@shared/visible-categories';
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
import { SeoService } from '@core/services/seo.service';
import { Product, ProductColor, ProductSize } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { ProductReviewsComponent } from '../product-reviews/product-reviews.component';
import { CloudinaryPipe } from '@shared/pipes/cloudinary.pipe';

@Component({
    selector: 'app-product-detail',
    imports: [CloudinaryPipe, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent, ProductReviewsComponent],
    templateUrl: './product-detail.component.html',
    styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  /** the product's categories the store shows (hidden ones are only for the admin) */
  readonly shownCategories = visibleCategories;

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
    private seo: SeoService,
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug')!;
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => {
        this.product = res.data;
        this.applySeo(res.data);
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

  ngOnDestroy(): void {
    this.seo.setStructuredData(null);
  }

  /** Title, description and share image for this product, plus schema.org Product data for search results. */
  private applySeo(p: Product): void {
    const image = p.imageUrl || p.images?.[0] || p.colors?.find(c => c.images.length)?.images[0];
    const description = p.description || `${p.name} en ${this.seo.storeName()}.`;
    this.seo.update({ title: p.name, description, image, type: 'product' });

    const stock = p.colors?.length
      ? p.colors.reduce((sum, c) => sum + c.sizes.reduce((s, z) => s + (z.stock ?? 0), 0), 0)
      : p.stockQuantity;
    this.seo.setStructuredData({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: description.replace(/<[^>]*>/g, ' ').trim(),
      sku: p.sku || undefined,
      image: [p.imageUrl, ...(p.images ?? [])].filter(Boolean),
      brand: { '@type': 'Brand', name: this.seo.storeName() },
      offers: {
        '@type': 'Offer',
        url: this.seo.absoluteUrl(`/products/${p.slug}`),
        priceCurrency: 'MXN',
        price: (p.discountedPrice ?? p.price).toFixed(2),
        availability: stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
    });
  }

  private buildCarouselImages(): void {
    if (!this.product) return;
    const all: string[] = [];
    if (this.product.imageUrl) all.push(this.product.imageUrl);
    for (const img of (this.product.images || [])) {
      if (!all.includes(img)) all.push(img);
    }
    this.carouselImages = all.length > 0 ? all : ['https://placehold.co/500x400?text=No+Image'];
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
    if (!this.authService.isLoggedIn()) {
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
