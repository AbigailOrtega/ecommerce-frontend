import { Component, HostListener, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { ProductService } from '@core/services/product.service';
import { Product, Category } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

const MAX_COLOR_IMAGES = 6;

interface SizeEntry { id?: number; name: string; stock: number; }
interface ColorEntry { id?: number; name: string; images: string[]; sizes: SizeEntry[]; newSizeName: string; uploading: boolean; }

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    MatCardModule, MatSnackBarModule, MatProgressSpinnerModule, CurrencyPipe, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Productos</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <button mat-raised-button color="primary" (click)="showForm = !showForm; resetForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancelar' : 'Agregar Producto' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Editar' : 'Nuevo' }} Producto</h2>
          <form [formGroup]="form" (ngSubmit)="saveProduct()">

            <div class="row">
              <mat-form-field appearance="outline"><mat-label>Nombre</mat-label><input matInput formControlName="name"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>SKU</mat-label><input matInput formControlName="sku"></mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>

            <div class="row">
              <mat-form-field appearance="outline"><mat-label>Precio</mat-label><input matInput formControlName="price" type="number"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Precio comparativo</mat-label><input matInput formControlName="compareAtPrice" type="number"></mat-form-field>
              @if (colorEntries.length === 0) {
                <mat-form-field appearance="outline"><mat-label>Stock</mat-label><input matInput formControlName="stockQuantity" type="number"></mat-form-field>
              }
            </div>

            <!-- Colors Section -->
            <div class="colors-section">
              <div class="section-header">
                <label class="section-label">Colores e imágenes (opcional)</label>
                <button type="button" mat-stroked-button (click)="addColor()">
                  <mat-icon>add</mat-icon> Agregar color
                </button>
              </div>

              @for (ce of colorEntries; track ce; let ci = $index) {
                <div class="color-card">
                  <div class="color-card-header">
                    <input class="color-name-input" [(ngModel)]="ce.name" [ngModelOptions]="{standalone: true}"
                      placeholder="Nombre del color (ej. Rojo, Azul...)">
                    <button type="button" mat-icon-button color="warn" (click)="removeColor(ci)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>

                  <!-- Per-color images -->
                  <div class="images-grid">
                    @for (img of ce.images; track img; let ii = $index) {
                      <div class="image-slot filled">
                        <img [src]="img" class="slot-img" [alt]="'Image ' + (ii + 1)">
                        @if (ii === 0) { <span class="main-badge">Principal</span> }
                        <button type="button" mat-icon-button class="slot-delete" (click)="removeColorImage(ci, ii)">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>
                    }
                    @if (ce.images.length < maxColorImages) {
                      <div class="image-slot empty" (click)="triggerColorImageUpload(ci)">
                        @if (ce.uploading) { <mat-spinner diameter="28"></mat-spinner> }
                        @else { <mat-icon>add_photo_alternate</mat-icon><span>Agregar foto</span> }
                      </div>
                    }
                  </div>

                  <!-- Per-color sizes -->
                  <div class="sizes-section">
                    <span class="sizes-label">Tallas</span>
                    <div class="sizes-list">
                      @for (se of ce.sizes; track se; let si = $index) {
                        <div class="size-row">
                          <input class="size-name-input" [(ngModel)]="se.name" [ngModelOptions]="{standalone: true}" placeholder="Talla">
                          <input class="size-stock-input" [(ngModel)]="se.stock" [ngModelOptions]="{standalone: true}" type="number" min="0" placeholder="Stock">
                          <button type="button" mat-icon-button (click)="removeSize(ci, si)"><mat-icon>close</mat-icon></button>
                        </div>
                      }
                      <div class="add-size-row">
                        <input class="size-name-input" [(ngModel)]="ce.newSizeName" [ngModelOptions]="{standalone: true}"
                          placeholder="Agregar talla... " (keydown.enter)="$event.preventDefault(); addSize(ci)">
                        <button type="button" mat-stroked-button (click)="addSize(ci)">Agregar</button>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>

            <!-- Hidden file input -->
            <input #colorFileInput type="file" accept="image/*" hidden (change)="onColorFileSelected($event)">

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categorías</mat-label>
              <mat-select formControlName="categoryIds" multiple>
                @for (cat of categories; track cat.id) {
                  <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <div class="toggles">
              <mat-slide-toggle formControlName="featured">Destacado</mat-slide-toggle>
              <mat-slide-toggle formControlName="active">Activo</mat-slide-toggle>
            </div>

            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || isAnyUploading()">
              {{ editingId ? 'Actualizar' : 'Crear' }}
            </button>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <div class="table-wrap">
          <table mat-table [dataSource]="products" class="product-table">
            <ng-container matColumnDef="image">
              <th mat-header-cell *matHeaderCellDef>Imagen</th>
              <td mat-cell *matCellDef="let p">
                @if (p.imageUrl) { <img [src]="p.imageUrl" class="table-thumb" [alt]="p.name"> }
              </td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let p">{{ p.name }}</td>
            </ng-container>
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Precio</th>
              <td mat-cell *matCellDef="let p">{{ p.price | currency }}</td>
            </ng-container>
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let p">
                @if (p.colors && p.colors.length > 0) {
                  <div class="stock-cell">
                    <span [class.no-stock]="totalColorStock(p) === 0">{{ totalColorStock(p) }}</span>
                    @for (v of outOfStockVariants(p); track v) {
                      <span class="out-of-stock-badge">{{ v }}</span>
                    }
                  </div>
                } @else {
                  <span [class.no-stock]="p.stockQuantity === 0">{{ p.stockQuantity }}</span>
                }
              </td>
            </ng-container>
            <ng-container matColumnDef="active">
              <th mat-header-cell *matHeaderCellDef>Activo</th>
              <td mat-cell *matCellDef="let p">{{ p.active ? 'Sí' : 'No' }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let p">
                <button mat-icon-button (click)="editProduct(p)"><mat-icon>edit</mat-icon></button>
                <button mat-icon-button color="warn" (click)="deleteProduct(p.id)"><mat-icon>delete</mat-icon></button>
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="visibleColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: visibleColumns;"></tr>
          </table>
        </div>
        <mat-paginator [length]="totalElements" [pageSize]="pageSize" (page)="onPage($event)" />
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .form-card { padding: 24px; margin: 16px 0; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; align-items: flex-start; }
    .row mat-form-field { flex: 1; min-width: 0; }
    .toggles { display: flex; gap: 24px; margin: 16px 0; flex-wrap: wrap; }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 16px; }
    .product-table { width: 100%; }
    .table-thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; }
    .stock-cell { display: flex; flex-direction: column; gap: 2px; }
    .no-stock { color: #c62828; font-weight: 600; }
    .out-of-stock-badge { font-size: 0.75rem; background: #ffebee; color: #c62828; border-radius: 4px; padding: 1px 6px; white-space: nowrap; }

    @media (max-width: 600px) {
      .row { flex-direction: column; gap: 0; }
      .row mat-form-field { width: 100%; }
      .form-card { padding: 14px; }
      .table-wrap td, .table-wrap th { font-size: 0.8rem; padding: 6px 8px !important; white-space: nowrap; }
      .table-thumb { width: 36px; height: 36px; }
      .size-name-input { width: 90px; }
      .size-stock-input { width: 60px; }
    }
    .section-label { font-size: 12px; color: rgba(0,0,0,0.6); display: block; }

    /* Colors section */
    .colors-section { margin: 16px 0; }
    .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }

    .color-card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; background: #fafafa; }
    .color-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .color-name-input { flex: 1; border: 1px solid #ccc; border-radius: 4px; padding: 8px 12px; font-size: 14px; outline: none; }
    .color-name-input:focus { border-color: var(--theme-primary); }

    /* Images */
    .images-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; }
    .image-slot { width: 100px; height: 100px; border-radius: 8px; overflow: hidden; position: relative; }
    .image-slot.filled { border: 1px solid #ddd; }
    .image-slot.empty { border: 2px dashed #ccc; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; cursor: pointer; color: #999; font-size: 11px; }
    .image-slot.empty:hover { border-color: var(--theme-primary); color: var(--theme-primary); }
    .slot-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .main-badge { position: absolute; top: 4px; left: 4px; background: var(--theme-primary); color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px; }
    .slot-delete { position: absolute; top: 2px; right: 2px; width: 28px; height: 28px; background: rgba(0,0,0,0.5) !important; color: white !important; }
    .slot-delete mat-icon { font-size: 16px; width: 16px; height: 16px; line-height: 16px; }

    /* Sizes */
    .sizes-section { border-top: 1px solid #eee; padding-top: 12px; }
    .sizes-label { font-size: 12px; color: rgba(0,0,0,0.6); display: block; margin-bottom: 8px; font-weight: 500; }
    .sizes-list { display: flex; flex-direction: column; gap: 6px; }
    .size-row { display: flex; align-items: center; gap: 8px; }
    .add-size-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
    .size-name-input { border: 1px solid #ccc; border-radius: 4px; padding: 6px 10px; font-size: 13px; outline: none; width: 120px; }
    .size-name-input:focus { border-color: var(--theme-primary); }
    .size-stock-input { border: 1px solid #ccc; border-radius: 4px; padding: 6px 10px; font-size: 13px; outline: none; width: 80px; text-align: center; }
    .size-stock-input:focus { border-color: var(--theme-primary); }
  `],
})
export class ProductManagementComponent implements OnInit {
  @ViewChild('colorFileInput') colorFileInputRef!: ElementRef<HTMLInputElement>;

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  maxColorImages = MAX_COLOR_IMAGES;

  colorEntries: ColorEntry[] = [];
  currentUploadColorIndex = -1;

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
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0.01)]],
      compareAtPrice: [null],
      sku: [''],
      stockQuantity: [0],
      categoryIds: [[]],
      featured: [false],
      active: [true],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
    this.productService.getCategories().subscribe(res => this.categories = res.data);
  }

  loadProducts(): void {
    this.loading = true;
    this.adminService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (res) => { this.products = res.data.content; this.totalElements = res.data.totalElements; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.colorEntries = [];
    this.form.reset({ price: 0, stockQuantity: 0, featured: false, active: true, categoryIds: [] });
  }

  editProduct(product: Product): void {
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

    this.form.patchValue({
      name: product.name, description: product.description, price: product.price,
      compareAtPrice: product.compareAtPrice, sku: product.sku,
      stockQuantity: product.stockQuantity,
      categoryIds: product.categories?.map(c => c.id) || [],
      featured: product.featured, active: product.active,
    });
  }

  // Colors
  addColor(): void {
    this.colorEntries = [...this.colorEntries, { name: '', images: [], sizes: [], newSizeName: '', uploading: false }];
  }

  removeColor(index: number): void {
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
    if (ce.images.length >= MAX_COLOR_IMAGES) {
      this.snackBar.open(`Máximo ${MAX_COLOR_IMAGES} imágenes por color`, 'Cerrar', { duration: 3000 });
      return;
    }
    const file = input.files[0];
    ce.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => { ce.images = [...ce.images, res.data.url]; ce.uploading = false; },
      error: (err) => { this.snackBar.open(err.error?.message || 'Error al subir imagen', 'Cerrar', { duration: 3000 }); ce.uploading = false; },
    });
  }

  removeColorImage(colorIndex: number, imageIndex: number): void {
    const ce = this.colorEntries[colorIndex];
    ce.images = ce.images.filter((_, i) => i !== imageIndex);
  }

  isAnyUploading(): boolean {
    return this.colorEntries.some(ce => ce.uploading);
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

    const firstImage = this.colorEntries[0]?.images[0] || null;

    const payload = {
      ...this.form.value,
      images: this.colorEntries[0]?.images || [],
      imageUrl: firstImage,
      colors,
    };

    const obs = this.editingId
      ? this.productService.updateProduct(this.editingId, payload)
      : this.productService.createProduct(payload);

    obs.subscribe({
      next: () => {
        this.snackBar.open(`Product ${this.editingId ? 'updated' : 'created'}`, 'Cerrar', { duration: 3000 });
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving product', 'Cerrar', { duration: 3000 }),
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => { this.snackBar.open('Product deleted', 'Cerrar', { duration: 3000 }); this.loadProducts(); },
      error: () => this.snackBar.open('Error deleting product', 'Cerrar', { duration: 3000 }),
    });
  }

  onPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
