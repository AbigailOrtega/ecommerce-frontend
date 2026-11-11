import { Component, HostListener, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Optional } from '@angular/core';
import { AdminService, ProductFilters } from '@core/services/admin.service';
import { Subject, debounceTime } from 'rxjs';
import { ProductService } from '@core/services/product.service';
import { Product, Category } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

const MAX_COLOR_IMAGES = 6;

interface SizeEntry { id?: number; name: string; stock: number; }
interface ColorEntry { id?: number; name: string; images: string[]; sizes: SizeEntry[]; newSizeName: string; uploading: boolean; }
import { CloudinaryPipe } from '@shared/pipes/cloudinary.pipe';

@Component({
    selector: 'app-product-management',
    imports: [CloudinaryPipe, FormsModule, ReactiveFormsModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
        MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule, MatTooltipModule,
        MatCardModule, MatSnackBarModule, MatProgressSpinnerModule, CurrencyPipe, LoadingComponent],
    templateUrl: './product-management.component.html',
    styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  @ViewChild('colorFileInput')   colorFileInputRef!:   ElementRef<HTMLInputElement>;
  @ViewChild('productFileInput') productFileInputRef!: ElementRef<HTMLInputElement>;

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  maxColorImages = MAX_COLOR_IMAGES;

  colorEntries: ColorEntry[] = [];
  currentUploadColorIndex = -1;

  productImages: string[] = [];
  productImagesUploading = false;
  private readonly pendingUploads = this.adminService.pendingUploads();

  form: FormGroup;
  columns = ['image', 'name', 'price', 'stock', 'active', 'actions'];
  isMobile = window.innerWidth < 600;
  get visibleColumns() {
    return this.isMobile ? ['image', 'name', 'price', 'actions'] : this.columns;
  }
  @HostListener('window:resize') onResize() { this.isMobile = window.innerWidth < 600; }
  totalElements = 0;
  pageSize = 20;
  currentPage = 0;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    @Optional() private route?: ActivatedRoute,
    @Optional() private router?: Router,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      compareAtPrice: [null],
      // what the garment cost the store: saved apart (admin-only endpoint), never sent with the product
      costPrice: [null as number | null, [Validators.min(0)]],
      sku: [''],
      stockQuantity: [0],
      categoryIds: [[]],
      featured: [false],
      active: [true],
    });
  }

  ngOnInit(): void {
    this.openFromLink();
    this.loadProducts();
    this.loadCosts();
    // every category, hidden ones too: products can be put in them and filtered by them
    this.productService.getAdminCategories().subscribe(res => this.categories = res.data);
  }

  ngOnDestroy(): void {
    this.filterSub.unsubscribe();
    this.pendingUploads.discardAll();
  }

  // ── Search ──
  filters: { q: string; minPrice: number | null; maxPrice: number | null; active: '' | 'true' | 'false'; categoryId: number | '' } =
    { q: '', minPrice: null, maxPrice: null, active: '', categoryId: '' };
  private readonly filterChanges = new Subject<void>();
  private readonly filterSub = this.filterChanges.pipe(debounceTime(300)).subscribe(() => {
    this.currentPage = 0;
    this.loadProducts();
  });

  /** Typing waits a moment before searching; every change starts again from the first page. */
  onFilterChange(): void {
    this.filterChanges.next();
  }

  get hasFilters(): boolean {
    const f = this.filters;
    return !!f.q.trim() || f.minPrice != null || f.maxPrice != null || f.active !== '' || f.categoryId !== '';
  }

  get priceRangeInvalid(): boolean {
    const { minPrice, maxPrice } = this.filters;
    return minPrice != null && maxPrice != null && minPrice > maxPrice;
  }

  clearFilters(): void {
    this.filters = { q: '', minPrice: null, maxPrice: null, active: '', categoryId: '' };
    this.currentPage = 0;
    this.loadProducts();
  }

  private apiFilters(): ProductFilters {
    const f = this.filters;
    return { q: f.q, minPrice: f.minPrice, maxPrice: f.maxPrice, active: f.active === '' ? null : f.active === 'true',
             categoryId: f.categoryId === '' ? null : f.categoryId };
  }

  loadProducts(): void {
    if (this.priceRangeInvalid) return;
    this.loading = true;
    this.adminService.getAllProducts(this.currentPage, this.pageSize, this.apiFilters()).subscribe({
      next: (res) => { this.products = res.data.content; this.totalElements = res.data.totalElements; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  resetForm(): void {
    this.pendingUploads.discardAll();
    this.editingId = null;
    this.colorEntries = [];
    this.productImages = [];
    this.productImagesUploading = false;
    this.form.reset({ price: 0, stockQuantity: 0, featured: false, active: true, categoryIds: [] });
  }

  /** ?edit=<id> (from a report row) opens that product's form, then the link is cleared. */
  private openFromLink(): void {
    // ?category=<id> (from the report by category): the list filtered by it
    const category = Number(this.route?.snapshot.queryParamMap.get('category'));
    if (category) this.filters.categoryId = category;
    const id = Number(this.route?.snapshot.queryParamMap.get('edit'));
    if (!id) return;
    this.productService.getProductById(id).subscribe({
      next: res => {
        this.editProduct(res.data);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
        this.router?.navigate([], { queryParams: { edit: null }, queryParamsHandling: 'merge', replaceUrl: true });
      },
      error: () => this.snackBar.open('No se encontró el producto', 'Cerrar', { duration: 4000 }),
    });
  }

  editProduct(product: Product): void {
    this.pendingUploads.discardAll();
    this.editingId = product.id;
    this.showForm = true;

    this.colorEntries = (product.colors || []).map(c => ({
      id: c.id,
      name: c.name,
      images: [...c.images],
      sizes: c.sizes.map(s => ({ id: s.id, name: s.name, stock: s.stock })),
      newSizeName: '',
      uploading: false,
    }));

    this.productImages = this.colorEntries.length === 0 ? [...(product.images || [])] : [];

    this.form.patchValue({
      name: product.name, description: product.description, price: product.price,
      compareAtPrice: product.compareAtPrice, sku: product.sku,
      stockQuantity: product.stockQuantity,
      categoryIds: product.categories?.map(c => c.id) || [],
      featured: product.featured, active: product.active,
      costPrice: this.costs.get(product.id) ?? null,
    });
  }

  // ── Garment cost (only the admin sees it) ──
  /** product id → what it cost the store, from the admin-only costs list */
  private costs = new Map<number, number | null>();

  private loadCosts(): void {
    this.adminService.getProductCosts().subscribe({
      next: res => {
        this.costs = new Map(res.data.map(c => [c.id, c.costPrice]));
        // a form opened before the list arrived gets its cost now, unless it was already typed
        const control = this.form.get('costPrice')!;
        if (this.editingId && control.pristine) control.setValue(this.costs.get(this.editingId) ?? null);
      },
      error: () => {},
    });
  }

  /** "Ganancia por prenda: $60.00 (30 %)" while price and cost are filled in. */
  get marginHint(): string | null {
    const { price, costPrice } = this.form.value;
    if (costPrice == null || costPrice === '' || !price) return null;
    const margin = Number(price) - Number(costPrice);
    return `Ganancia por prenda: ${margin.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} (${Math.round(margin / Number(price) * 100)} %)`;
  }

  // Colors
  addColor(): void {
    this.colorEntries = [...this.colorEntries, { name: '', images: [], sizes: [], newSizeName: '', uploading: false }];
  }

  removeColor(index: number): void {
    this.colorEntries[index]?.images.forEach(url => this.pendingUploads.removed(url));
    this.colorEntries = this.colorEntries.filter((_, i) => i !== index);
  }

  // Sizes per color
  addSize(colorIndex: number): void {
    const ce = this.colorEntries[colorIndex];
    const name = ce.newSizeName.trim();
    if (!name) return;
    ce.sizes = [...ce.sizes, { name, stock: 0 }];
    ce.newSizeName = '';
  }

  removeSize(colorIndex: number, sizeIndex: number): void {
    const ce = this.colorEntries[colorIndex];
    ce.sizes = ce.sizes.filter((_, i) => i !== sizeIndex);
  }

  // Images per color
  triggerColorImageUpload(colorIndex: number): void {
    this.currentUploadColorIndex = colorIndex;
    this.colorFileInputRef.nativeElement.value = '';
    this.colorFileInputRef.nativeElement.click();
  }

  onColorFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const ci = this.currentUploadColorIndex;
    if (ci < 0 || ci >= this.colorEntries.length) return;
    const ce = this.colorEntries[ci];
    if (ce.uploading) return;
    if (ce.images.length >= MAX_COLOR_IMAGES) {
      this.snackBar.open(`Máximo ${MAX_COLOR_IMAGES} imágenes por color`, 'Cerrar', { duration: 3000 });
      return;
    }
    const file = input.files[0];
    ce.uploading = true;
    this.adminService.uploadImage(file, 'product').subscribe({
      next: (res) => {
        const url = res.data.url;
        this.pendingUploads.add(url);
        ce.images = ce.images.includes(url) ? ce.images : [...ce.images, url];
        ce.uploading = false;
      },
      error: (err) => { this.snackBar.open(err.error?.message || 'Error al subir imagen', 'Cerrar', { duration: 3000 }); ce.uploading = false; },
    });
  }

  removeColorImage(colorIndex: number, imageIndex: number): void {
    const ce = this.colorEntries[colorIndex];
    this.pendingUploads.removed(ce.images[imageIndex]);
    ce.images = ce.images.filter((_, i) => i !== imageIndex);
  }

  // Images without colors
  triggerProductImageUpload(): void {
    this.productFileInputRef.nativeElement.value = '';
    this.productFileInputRef.nativeElement.click();
  }

  onProductFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length || this.productImagesUploading) return;
    if (this.productImages.length >= MAX_COLOR_IMAGES) {
      this.snackBar.open(`Máximo ${MAX_COLOR_IMAGES} imágenes`, 'Cerrar', { duration: 3000 });
      return;
    }
    this.productImagesUploading = true;
    this.adminService.uploadImage(input.files[0], 'product').subscribe({
      next: (res) => {
        const url = res.data.url;
        this.pendingUploads.add(url);
        if (!this.productImages.includes(url)) {
          this.productImages = [...this.productImages, url];
        }
        this.productImagesUploading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Error al subir imagen', 'Cerrar', { duration: 3000 });
        this.productImagesUploading = false;
      },
    });
  }

  removeProductImage(index: number): void {
    this.pendingUploads.removed(this.productImages[index]);
    this.productImages = this.productImages.filter((_, i) => i !== index);
  }

  isAnyUploading(): boolean {
    return this.productImagesUploading || this.colorEntries.some(ce => ce.uploading);
  }

  totalColorStock(product: Product): number {
    return (product.colors || []).reduce((sum, c) => sum + c.sizes.reduce((s2, sz) => s2 + sz.stock, 0), 0);
  }

  outOfStockVariants(product: Product): string[] {
    const result: string[] = [];
    for (const color of (product.colors || [])) {
      if (color.sizes.length === 0) {
        // color sin tallas
      } else {
        for (const size of color.sizes) {
          if (size.stock === 0) {
            result.push(`${color.name} / ${size.name}`);
          }
        }
      }
    }
    return result;
  }

  saveProduct(): void {
    if (this.form.invalid) return;

    const colors = this.colorEntries
      .filter(ce => ce.name.trim())
      .map(ce => ({
        id: ce.id,
        name: ce.name.trim(),
        images: ce.images,
        sizes: ce.sizes.filter(s => s.name.trim()).map(s => ({ id: s.id, name: s.name.trim(), stock: s.stock })),
      }));

    const baseImages = colors.length > 0 ? (colors[0].images || []) : this.productImages;
    const firstImage = baseImages[0] || null;

    const { costPrice, ...productFields } = this.form.value;
    const cost: number | null = costPrice === '' || costPrice == null ? null : Number(costPrice);
    const previousCost = this.editingId ? (this.costs.get(this.editingId) ?? null) : null;
    const payload = {
      ...productFields,
      images: baseImages,
      imageUrl: firstImage,
      colors,
    };

    const obs = this.editingId
      ? this.productService.updateProduct(this.editingId, payload)
      : this.productService.createProduct(payload);

    const wasEditing = !!this.editingId;
    obs.subscribe({
      next: (res) => {
        const id = this.editingId ?? res.data?.id;
        const saved = wasEditing ? 'Producto actualizado' : 'Producto creado';
        if (id && cost !== previousCost) {
          this.adminService.setProductCost(id, cost).subscribe({
            next: r => {
              this.costs.set(id, cost);
              this.snackBar.open(r.message ? `${saved}. ${r.message}` : saved, 'Cerrar', { duration: 4000 });
            },
            error: (err) => this.snackBar.open(`${saved}, pero no se guardó el costo: ${err.error?.message || 'intenta de nuevo'}`, 'Cerrar', { duration: 6000 }),
          });
        } else {
          this.snackBar.open(saved, 'Cerrar', { duration: 3000 });
        }
        this.pendingUploads.committed([...baseImages, ...colors.flatMap(c => c.images)]);
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving product', 'Cerrar', { duration: 3000 }),
    });
  }

  /** A product with orders is deactivated by the server instead of deleted; its message says which. */
  deleteProduct(product: { id: number; name: string }): void {
    if (!confirm(`¿Eliminar "${product.name}"? Si tiene órdenes asociadas, se desactivará en lugar de borrarse.`)) return;
    this.productService.deleteProduct(product.id).subscribe({
      next: (res) => { this.snackBar.open(res.message || 'Producto eliminado', 'Cerrar', { duration: 6000 }); this.loadProducts(); },
      error: (err) => this.snackBar.open(err.error?.message || 'No se pudo eliminar el producto', 'Cerrar', { duration: 5000 }),
    });
  }

  onPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
