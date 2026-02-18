import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { Category } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterLink, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Category Management</h1>
        <a mat-button routerLink="/admin">&larr; Dashboard</a>
      </div>

      <button mat-raised-button color="primary" (click)="showForm = !showForm; resetForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancel' : 'Add Category' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Edit' : 'New' }} Category</h2>
          <form [formGroup]="form" (ngSubmit)="saveCategory()">
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Name</mat-label>
                <input matInput formControlName="name">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Image URL</mat-label>
                <input matInput formControlName="imageUrl">
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              {{ editingId ? 'Update' : 'Create' }}
            </button>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <table mat-table [dataSource]="categories" class="category-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let c">{{ c.name }}</td>
          </ng-container>
          <ng-container matColumnDef="slug">
            <th mat-header-cell *matHeaderCellDef>Slug</th>
            <td mat-cell *matCellDef="let c">{{ c.slug }}</td>
          </ng-container>
          <ng-container matColumnDef="description">
            <th mat-header-cell *matHeaderCellDef>Description</th>
            <td mat-cell *matCellDef="let c">{{ c.description || '-' }}</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Actions</th>
            <td mat-cell *matCellDef="let c">
              <button mat-icon-button (click)="editCategory(c)"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button color="warn" (click)="deleteCategory(c.id)"><mat-icon>delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        @if (categories.length === 0) {
          <p class="no-data">No categories yet. Click "Add Category" to create one.</p>
        }
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .form-card { padding: 24px; margin: 16px 0; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .category-table { width: 100%; margin-top: 16px; }
    .no-data { text-align: center; padding: 32px; color: #666; }
  `],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form: FormGroup;
  columns = ['name', 'slug', 'description', 'actions'];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.productService.getCategories().subscribe({
      next: (res) => { this.categories = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  resetForm(): void {
    this.editingId = null;
    this.form.reset();
  }

  editCategory(category: Category): void {
    this.editingId = category.id;
    this.showForm = true;
    this.form.patchValue({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl,
    });
  }

  saveCategory(): void {
    if (this.form.invalid) return;
    const data = this.form.value;
    const obs = this.editingId
      ? this.productService.updateCategory(this.editingId, data)
      : this.productService.createCategory(data);

    obs.subscribe({
      next: () => {
        this.snackBar.open(`Category ${this.editingId ? 'updated' : 'created'}`, 'Close', { duration: 3000 });
        this.showForm = false;
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving category', 'Close', { duration: 3000 }),
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Are you sure you want to delete this category?')) return;
    this.productService.deleteCategory(id).subscribe({
      next: () => {
        this.snackBar.open('Category deleted', 'Close', { duration: 3000 });
        this.loadCategories();
      },
      error: () => this.snackBar.open('Error deleting category', 'Close', { duration: 3000 }),
    });
  }
}
