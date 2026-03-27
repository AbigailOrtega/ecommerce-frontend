import { Component, HostListener, OnInit } from '@angular/core';
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
        <h1>Gestión de Categorías</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <button mat-raised-button color="primary" (click)="showForm = !showForm; resetForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancelar' : 'Agregar Categoría' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Editar' : 'Nueva' }} Categoría</h2>
          <form [formGroup]="form" (ngSubmit)="saveCategory()">
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="name">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>URL de imagen</mat-label>
                <input matInput formControlName="imageUrl">
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>
            <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
              {{ editingId ? 'Actualizar' : 'Crear' }}
            </button>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {

        <!-- Mobile filter bar -->
        @if (isMobile) {
          <div class="mobile-filter-bar">
            <button mat-stroked-button (click)="showMobileFilters = !showMobileFilters" class="mobile-filter-toggle">
              <mat-icon>{{ showMobileFilters ? 'expand_less' : 'filter_list' }}</mat-icon>
              Filtros
              @if (filterSearch) { <span class="active-dot"></span> }
            </button>
            @if (filterSearch) {
              <button mat-button class="clear-mob-btn" (click)="filterSearch = ''">
                <mat-icon>clear</mat-icon> Limpiar
              </button>
            }
          </div>
          @if (showMobileFilters) {
            <div class="mobile-filters-panel">
              <div class="mf-row">
                <label class="mf-label">Buscar</label>
                <div class="fi-wrap">
                  <input class="fi" [(ngModel)]="filterSearch" placeholder="Nombre, slug o descripción…">
                  @if (filterSearch) {
                    <button mat-icon-button class="fi-clear" (click)="filterSearch = ''"><mat-icon>close</mat-icon></button>
                  }
                </div>
              </div>
            </div>
          }
        }

        <div class="table-wrap">
          <table mat-table [dataSource]="filteredCategories" class="category-table">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Nombre</th>
              <td mat-cell *matCellDef="let c">{{ c.name }}</td>
            </ng-container>
            <ng-container matColumnDef="slug">
              <th mat-header-cell *matHeaderCellDef>Slug</th>
              <td mat-cell *matCellDef="let c">{{ c.slug }}</td>
            </ng-container>
            <ng-container matColumnDef="description">
              <th mat-header-cell *matHeaderCellDef>Descripción</th>
              <td mat-cell *matCellDef="let c">{{ c.description || '-' }}</td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Acciones</th>
              <td mat-cell *matCellDef="let c">
                <button mat-icon-button (click)="editCategory(c)"><mat-icon>edit</mat-icon></button>
                <button mat-icon-button color="warn" (click)="deleteCategory(c.id)"><mat-icon>delete</mat-icon></button>
              </td>
            </ng-container>

            <!-- Filter row columns -->
            <ng-container matColumnDef="f-name">
              <th mat-header-cell *matHeaderCellDef class="filter-cell">
                <div class="fi-wrap">
                  <input class="fi" [(ngModel)]="filterSearch" placeholder="Buscar…">
                  @if (filterSearch) {
                    <button mat-icon-button class="fi-clear" (click)="filterSearch = ''"><mat-icon>close</mat-icon></button>
                  }
                </div>
              </th>
            </ng-container>
            <ng-container matColumnDef="f-slug">
              <th mat-header-cell *matHeaderCellDef class="filter-cell"></th>
            </ng-container>
            <ng-container matColumnDef="f-description">
              <th mat-header-cell *matHeaderCellDef class="filter-cell"></th>
            </ng-container>
            <ng-container matColumnDef="f-actions">
              <th mat-header-cell *matHeaderCellDef class="filter-cell"></th>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="visibleColumns"></tr>
            @if (!isMobile) {
              <tr mat-header-row *matHeaderRowDef="visibleFilterColumns" class="filter-row"></tr>
            }
            <tr mat-row *matRowDef="let row; columns: visibleColumns;"></tr>
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell no-data-cell" [attr.colspan]="visibleColumns.length">
                Sin categorías con los filtros aplicados.
              </td>
            </tr>

          </table>
        </div>
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .form-card { padding: 24px; margin: 16px 0; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; margin-top: 16px; }
    .category-table { width: 100%; white-space: nowrap; }
    .no-data-cell { text-align: center; color: #888; padding: 32px !important; font-size: 1rem; white-space: normal; }

    /* Filter row */
    .filter-row th { padding-top: 4px !important; padding-bottom: 4px !important; background: #fafafa; border-bottom: 1px solid #e0e0e0; }
    .filter-cell { padding: 4px 8px !important; }
    .fi-wrap { position: relative; display: flex; align-items: center; }
    .fi { border: 1px solid #ccc; border-radius: 4px; padding: 4px 28px 4px 8px; font-size: 0.8rem; width: 100%; min-width: 120px; outline: none; background: #fff; }
    .fi:focus { border-color: var(--theme-primary, #3f51b5); }
    .fi-clear { position: absolute; right: 0; width: 24px; height: 24px; min-width: unset; padding: 0; color: #999; }

    /* Mobile filters */
    .mobile-filter-bar { display: flex; align-items: center; gap: 8px; margin-top: 12px; }
    .mobile-filter-toggle { font-size: 0.85rem; position: relative; }
    .active-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: var(--theme-primary, #3f51b5); border-radius: 50%; }
    .clear-mob-btn { font-size: 0.8rem; color: #888; }
    .mobile-filters-panel { background: #fafafa; border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px 16px; margin-top: 8px; display: flex; flex-direction: column; gap: 10px; }
    .mf-row { display: flex; align-items: center; gap: 10px; }
    .mf-label { font-size: 0.78rem; color: #666; min-width: 60px; }

    @media (max-width: 600px) {
      .row { flex-direction: column; gap: 0; }
      .row mat-form-field { width: 100%; }
      .form-card { padding: 14px; }
    }
  `],
})
export class CategoryManagementComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  form: FormGroup;

  filterSearch = '';
  showMobileFilters = false;
  isMobile = window.innerWidth < 768;

  private readonly allColumns = ['name', 'slug', 'description', 'actions'];
  private readonly mobileColumns = ['name', 'actions'];
  private readonly allFilterColumns = ['f-name', 'f-slug', 'f-description', 'f-actions'];
  private readonly mobileFilterColumns = ['f-name', 'f-actions'];

  get visibleColumns() { return this.isMobile ? this.mobileColumns : this.allColumns; }
  get visibleFilterColumns() { return this.isMobile ? this.mobileFilterColumns : this.allFilterColumns; }

  get filteredCategories(): Category[] {
    const q = this.filterSearch.trim().toLowerCase();
    if (!q) return this.categories;
    return this.categories.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.slug?.toLowerCase().includes(q)) ||
      (c.description?.toLowerCase().includes(q))
    );
  }

  @HostListener('window:resize') onResize() { this.isMobile = window.innerWidth < 768; }

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
        this.snackBar.open(`Categoría ${this.editingId ? 'actualizada' : 'creada'}`, 'Cerrar', { duration: 3000 });
        this.showForm = false;
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error al guardar la categoría', 'Cerrar', { duration: 3000 }),
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;
    this.productService.deleteCategory(id).subscribe({
      next: () => {
        this.snackBar.open('Categoría eliminada', 'Cerrar', { duration: 3000 });
        this.loadCategories();
      },
      error: () => this.snackBar.open('Error al eliminar la categoría', 'Cerrar', { duration: 3000 }),
    });
  }
}
