import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

const MAX_IMAGES = 6;

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    MatCardModule, MatSnackBarModule, MatProgressSpinnerModule, CurrencyPipe, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Product Management</h1>
        <a mat-button routerLink="/admin">&larr; Dashboard</a>
      </div>

      <button mat-raised-button color="primary" (click)="showForm = !showForm; resetForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancel' : 'Add Product' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Edit' : 'New' }} Product</h2>
          <form [formGroup]="form" (ngSubmit)="saveProduct()">
            <div class="row">
              <mat-form-field appearance="outline"><mat-label>Name</mat-label><input matInput formControlName="name"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>SKU</mat-label><input matInput formControlName="sku"></mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>
            <div class="row">
              <mat-form-field appearance="outline"><mat-label>Price</mat-label><input matInput formControlName="price" type="number"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Compare Price</mat-label><input matInput formControlName="compareAtPrice" type="number"></mat-form-field>
              <mat-form-field appearance="outline"><mat-label>Stock</mat-label><input matInput formControlName="stockQuantity" type="number"></mat-form-field>
            </div>

            <!-- Multi-image upload -->
            <div class="images-section">
              <label class="images-label">Product Images (max {{ maxImages }})</label>
              <div class="images-grid">
                @for (img of uploadedImages; track img; let i = $index) {
                  <div class="image-slot filled">
                    <img [src]="img" class="slot-img" [alt]="'Image ' + (i + 1)">
                    @if (i === 0) {
                      <span class="main-badge">Main</span>
                    }
                    <button type="button" mat-icon-button class="slot-delete" (click)="removeImage(i)">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                }
                @if (uploadedImages.length < maxImages) {
                  <div class="image-slot empty" (click)="fileInput.click()">
                    @if (uploading) {
                      <mat-spinner diameter="28"></mat-spinner>
                    } @else {
                      <mat-icon>add_photo_alternate</mat-icon>
                      <span>Add Photo</span>
                    }
                  </div>
                }
              </div>
              <input #fileInput type="file" accept="image/*" hidden (change)="onFileSelected($event)">
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Categories</mat-label>
              <mat-select formControlName="categoryIds" multiple>
                @for (cat of categories; track cat.id) {
                  <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
                }
              </mat-select>
            </mat-form-field>

            <div class="toggles">
              <mat-slide-toggle formControlName="featured">Featured</mat-slide-toggle>
              <mat-slide-toggle formControlName="active">Active</mat-slide-toggle>
            </div>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || uploading">
              {{ editingId ? 'Update' : 'Create' }}
            </button>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <table mat-table [dataSource]="products" class="product-table">
          <ng-container matColumnDef="image">
            <th mat-header-cell *matHeaderCellDef>Image</th>
            <td mat-cell *matCellDef="let p">
              @if (p.imageUrl) {
                <img [src]="p.imageUrl" class="table-thumb" [alt]="p.name">
              }
            </td>
          </ng-container>
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let p">{{ p.name }}</td>
          </ng-container>
          <ng-container matColumnDef="price">
            <th mat-header-cell *matHeaderCellDef>Price</th>
            <td mat-cell *matCellDef="let p">{{ p.price | currency }}</td>
          </ng-container>
          <ng-container matColumnDef="stock">
            <th mat-header-cell *matHeaderCellDef>Stock</th>
            <td mat-cell *matCellDef="let p">{{ p.stockQuantity }}</td>
          </ng-container>
          <ng-container matColumnDef="active">
            <th mat-header-cell *matHeaderCellDef>Active</th>
            <td mat-cell *matCellDef="let p">{{ p.active ? 'Yes' : 'No' }}</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let p">
              <button mat-icon-button (click)="editProduct(p)"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn" (click)="deleteProduct(p.id)"><mat-icon>delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        <mat-paginator [length]="totalElements" [pageSize]="pageSize" (page)="onPage($event)" />
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .form-card { padding: 24px; margin: 16px 0; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; align-items: flex-start; }
    .row mat-form-field { flex: 1; }
    .toggles { display: flex; gap: 24px; margin: 16px 0; }
    .product-table { width: 100%; margin-top: 16px; }
    .table-thumb { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; }

    /* Images section */
    .images-section { margin: 16px 0; }
    .images-label { font-size: 12px; color: rgba(0,0,0,0.6); display: block; margin-bottom: 8px; }
    .images-grid { display: flex; flex-wrap: wrap; gap: 12px; }
    .image-slot { width: 120px; height: 120px; border-radius: 8px; overflow: hidden; position: relative; }
    .image-slot.filled { border: 1px solid #ddd; }
    .image-slot.empty {
      border: 2px dashed #ccc; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 4px;
      cursor: pointer; color: #999; font-size: 12px;
    }
    .image-slot.empty:hover { border-color: #3f51b5; color: #3f51b5; }
    .slot-img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .main-badge {
      position: absolute; top: 4px; left: 4px; background: #3f51b5;
      color: white; font-size: 10px; padding: 2px 6px; border-radius: 4px;
    }
    .slot-delete {
      position: absolute; top: 2px; right: 2px; width: 28px; height: 28px;
      background: rgba(0,0,0,0.5) !important; color: white !important;
    }
    .slot-delete mat-icon { font-size: 16px; width: 16px; height: 16px; line-height: 16px; }
  `],
})
export class ProductManagementComponent implements OnInit {
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  uploading = false;
  showForm = false;
  editingId: number | null = null;
  uploadedImages: string[] = [];
  maxImages = MAX_IMAGES;
  form: FormGroup;
  columns = ['image', 'name', 'price', 'stock', 'active', 'actions'];
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
      next: (res) => {
        this.products = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.uploadedImages = [];
    this.form.reset({ price: 0, stockQuantity: 0, featured: false, active: true, categoryIds: [] });
  }

  editProduct(product: Product): void {
    this.editingId = product.id;
    this.showForm = true;
    // Build images list: start with imageUrl if not already in images array
    const imgs: string[] = [...(product.images || [])];
    if (product.imageUrl && !imgs.includes(product.imageUrl)) {
      imgs.unshift(product.imageUrl);
    }
    this.uploadedImages = imgs.slice(0, MAX_IMAGES);
    this.form.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      categoryIds: product.categories?.map(c => c.id) || [],
      featured: product.featured,
      active: product.active,
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    if (this.uploadedImages.length >= MAX_IMAGES) {
      this.snackBar.open(`Maximum ${MAX_IMAGES} images allowed`, 'Close', { duration: 3000 });
      return;
    }
    const file = input.files[0];
    input.value = '';
    this.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        this.uploadedImages = [...this.uploadedImages, res.data.url];
        this.uploading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Image upload failed', 'Close', { duration: 3000 });
        this.uploading = false;
      },
    });
  }

  removeImage(index: number): void {
    this.uploadedImages = this.uploadedImages.filter((_, i) => i !== index);
  }

  saveProduct(): void {
    if (this.form.invalid) return;
    const payload = {
      ...this.form.value,
      images: this.uploadedImages,
      imageUrl: this.uploadedImages[0] || null,
    };
    const obs = this.editingId
      ? this.productService.updateProduct(this.editingId, payload)
      : this.productService.createProduct(payload);

    obs.subscribe({
      next: () => {
        this.snackBar.open(`Product ${this.editingId ? 'updated' : 'created'}`, 'Close', { duration: 3000 });
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving product', 'Close', { duration: 3000 }),
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open('Product deleted', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: () => this.snackBar.open('Error deleting product', 'Close', { duration: 3000 }),
    });
  }

  onPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
}
