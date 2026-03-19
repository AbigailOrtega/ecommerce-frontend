import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { ProductService } from '@core/services/product.service';
import { Promotion, PromotionRequest, Product } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-promotion-management',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, RouterLink,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatCardModule, MatSnackBarModule, CurrencyPipe, DatePipe, LoadingComponent,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Promociones</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <button mat-raised-button color="primary" (click)="toggleForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancelar' : 'Agregar Promoción' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Editar' : 'Nueva' }} Promotion</h2>
          <form [formGroup]="form" (ngSubmit)="save()">
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Nombre</mat-label>
                <input matInput formControlName="name">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Descuento %</mat-label>
                <input matInput type="number" formControlName="discountPercent" min="0.01" max="100">
              </mat-form-field>
            </div>
            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Fecha de inicio</mat-label>
                <input matInput type="date" formControlName="startDate">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Fecha de fin</mat-label>
                <input matInput type="date" formControlName="endDate">
              </mat-form-field>
            </div>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Productos</mat-label>
              <mat-select formControlName="productIds" multiple>
                @for (product of allProducts; track product.id) {
                  <mat-option [value]="product.id">{{ product.name }} ({{ product.price | currency }})</mat-option>
                }
              </mat-select>
            </mat-form-field>
            <div class="form-actions">
              <button mat-button type="button" (click)="toggleForm()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || saving">
                {{ saving ? 'Guardando...' : 'Guardar' }}
              </button>
            </div>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <table mat-table [dataSource]="promotions" class="promo-table">
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Nombre</th>
            <td mat-cell *matCellDef="let p">{{ p.name }}</td>
          </ng-container>
          <ng-container matColumnDef="discount">
            <th mat-header-cell *matHeaderCellDef>Descuento %</th>
            <td mat-cell *matCellDef="let p">{{ p.discountPercent }}%</td>
          </ng-container>
          <ng-container matColumnDef="startDate">
            <th mat-header-cell *matHeaderCellDef>Inicio</th>
            <td mat-cell *matCellDef="let p">{{ p.startDate | date:'mediumDate' }}</td>
          </ng-container>
          <ng-container matColumnDef="endDate">
            <th mat-header-cell *matHeaderCellDef>Fin</th>
            <td mat-cell *matCellDef="let p">{{ p.endDate | date:'mediumDate' }}</td>
          </ng-container>
          <ng-container matColumnDef="active">
            <th mat-header-cell *matHeaderCellDef>Activo</th>
            <td mat-cell *matCellDef="let p">
              <span [class]="p.active ? 'badge-active' : 'badge-inactive'">{{ p.active ? 'Activo' : 'Inactivo' }}</span>
            </td>
          </ng-container>
          <ng-container matColumnDef="products">
            <th mat-header-cell *matHeaderCellDef>Productos</th>
            <td mat-cell *matCellDef="let p">{{ p.products.length }} product(s)</td>
          </ng-container>
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let p">
              <button mat-icon-button (click)="edit(p)" title="Editar"><mat-icon>edit</mat-icon></button>
              <button mat-icon-button (click)="toggle(p)" [title]="p.active ? 'Desactivar' : 'Activar'">
                <mat-icon>{{ p.active ? 'toggle_on' : 'toggle_off' }}</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="delete(p)" title="Eliminar"><mat-icon>delete</mat-icon></button>
            </td>
          </ng-container>
          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
        @if (promotions.length === 0) {
          <p class="no-data">Sin promociones. Crea una arriba.</p>
        }
      }
    </div>
  `,
  styles: [`
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .form-card { padding: 24px; margin: 16px 0; }
    .row { display: flex; gap: 16px; }
    .row mat-form-field { flex: 1; }
    .full-width { width: 100%; }
    .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
    .promo-table { width: 100%; margin-top: 16px; }
    .badge-active { background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
    .badge-inactive { background: #ffebee; color: #c62828; padding: 2px 8px; border-radius: 4px; font-size: 0.85rem; }
    .no-data { text-align: center; color: #666; padding: 32px; }
  `],
})
export class PromotionManagementComponent implements OnInit {
  promotions: Promotion[] = [];
  allProducts: Product[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  saving = false;
  displayedColumns = ['name', 'discount', 'startDate', 'endDate', 'active', 'products', 'actions'];

  form: FormGroup;

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      discountPercent: [null, [Validators.required, Validators.min(0.01), Validators.max(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productIds: [[], [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    this.loadPromotions();
    this.loadProducts();
  }

  loadPromotions(): void {
    this.loading = true;
    this.adminService.getPromotions().subscribe({
      next: (res) => { this.promotions = res.data; this.loading = false; },
      error: () => { this.loading = false; this.snackBar.open('Error al cargar las promociones', 'Cerrar', { duration: 3000 }); },
    });
  }

  loadProducts(): void {
    this.productService.getProducts(0, 200).subscribe({
      next: (res) => this.allProducts = res.data.content,
      error: () => {},
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm(): void {
    this.editingId = null;
    this.form.reset({ productIds: [] });
  }

  edit(promotion: Promotion): void {
    this.editingId = promotion.id;
    this.form.patchValue({
      name: promotion.name,
      discountPercent: promotion.discountPercent,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      productIds: promotion.products.map(p => p.id),
    });
    this.showForm = true;
  }

  save(): void {
    if (this.form.invalid) return;
    this.saving = true;
    const req: PromotionRequest = this.form.value;
    const obs = this.editingId
      ? this.adminService.updatePromotion(this.editingId, req)
      : this.adminService.createPromotion(req);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.resetForm();
        this.loadPromotions();
        this.snackBar.open('Promoción guardada', 'Cerrar', { duration: 2000 });
      },
      error: (err) => {
        this.saving = false;
        const msg = err?.error?.message || 'Error al guardar la promoción';
        this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
      },
    });
  }

  toggle(promotion: Promotion): void {
    this.adminService.togglePromotion(promotion.id).subscribe({
      next: (res) => {
        const idx = this.promotions.findIndex(p => p.id === promotion.id);
        if (idx !== -1) this.promotions[idx] = res.data;
        this.snackBar.open(`Promoción ${res.data.active ? 'activada' : 'desactivada'}`, 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al cambiar estado de la promoción', 'Cerrar', { duration: 3000 }),
    });
  }

  delete(promotion: Promotion): void {
    if (!confirm(`¿Eliminar promoción "${promotion.name}"?`)) return;
    this.adminService.deletePromotion(promotion.id).subscribe({
      next: () => {
        this.promotions = this.promotions.filter(p => p.id !== promotion.id);
        this.snackBar.open('Promoción eliminada', 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al eliminar la promoción', 'Cerrar', { duration: 3000 }),
    });
  }
}
