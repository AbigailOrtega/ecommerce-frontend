import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { ProductService } from '@core/services/product.service';
import { Product, Category } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatPaginatorModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatSlideToggleModule,
    MatCardModule, MatSnackBarModule, CurrencyPipe, LoadingComponent],
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
            <div class="row">
              <mat-form-field appearance="outline"><mat-label>Image URL</mat-label><input matInput formControlName="imageUrl"></mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Category</mat-label>
                <mat-select formControlName="categoryId">
                  <mat-option [value]="null">None</mat-option>
                  @for (cat of categories; track cat.id) {
                    <mat-option [value]="cat.id">{{ cat.name }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>
            <div class="toggles">
              <mat-slide-toggle formControlName="featured">Featured</mat-slide-toggle>
              <mat-slide-toggle formControlName="active">Active</mat-slide-toggle>
            </div>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              {{ editingId ? 'Update' : 'Create' }}
            </button>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <table mat-table [dataSource]="products" class="product-table">
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
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .toggles { display: flex; gap: 24px; margin: 16px 0; }
    .product-table { width: 100%; margin-top: 16px; }
  `],
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form: FormGroup;
  columns = ['name', 'price', 'stock', 'active', 'actions'];
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
      imageUrl: [''],
      categoryId: [null],
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
    this.form.reset({ price: 0, stockQuantity: 0, featured: false, active: true });
  }

  editProduct(product: Product): void {
    this.editingId = product.id;
    this.showForm = true;
    this.form.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      imageUrl: product.imageUrl,
      categoryId: product.category?.id || null,
      featured: product.featured,
      active: product.active,
    });
  }

  saveProduct(): void {
    if (this.form.invalid) return;
    const obs = this.editingId
      ? this.productService.updateProduct(this.editingId, this.form.value)
      : this.productService.createProduct(this.form.value);

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
