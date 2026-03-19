import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { Coupon, CouponRequest } from '@shared/models';

@Component({
  selector: 'app-coupon-management',
  standalone: true,
  imports: [FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatSlideToggleModule, MatSnackBarModule, MatTooltipModule, DatePipe],
  template: `
    <div class="container">
      <h1>Gestión de Cupones</h1>

      <mat-card class="form-card">
        <h2>{{ editingId ? 'Editar Cupón' : 'Nuevo Cupón' }}</h2>
        <div class="form-grid">
          <mat-form-field appearance="outline">
            <mat-label>Código (ej. BUENFIN10)</mat-label>
            <input matInput [(ngModel)]="form.code" placeholder="MYCODE20" style="text-transform:uppercase">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Descuento %</mat-label>
            <input matInput type="number" [(ngModel)]="form.discountPercent" min="1" max="100">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Expira el</mat-label>
            <input matInput type="date" [(ngModel)]="form.expiresAt">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Límite de uso (vacío = ilimitado)</mat-label>
            <input matInput type="number" [(ngModel)]="form.usageLimit" min="1">
          </mat-form-field>
        </div>
        <div class="form-actions">
          <button mat-raised-button color="primary" (click)="save()" [disabled]="saving || !isValid()">
            {{ saving ? 'Guardando...' : (editingId ? 'Actualizar' : 'Crear') }}
          </button>
          @if (editingId) {
            <button mat-button (click)="cancelEdit()">Cancelar</button>
          }
        </div>
      </mat-card>

      <mat-card class="table-card">
        <table mat-table [dataSource]="coupons" class="full-width">

          <ng-container matColumnDef="code">
            <th mat-header-cell *matHeaderCellDef>Código</th>
            <td mat-cell *matCellDef="let c"><strong>{{ c.code }}</strong></td>
          </ng-container>

          <ng-container matColumnDef="discount">
            <th mat-header-cell *matHeaderCellDef>Descuento</th>
            <td mat-cell *matCellDef="let c">{{ c.discountPercent }}%</td>
          </ng-container>

          <ng-container matColumnDef="expires">
            <th mat-header-cell *matHeaderCellDef>Expira</th>
            <td mat-cell *matCellDef="let c">{{ c.expiresAt | date:'mediumDate' }}</td>
          </ng-container>

          <ng-container matColumnDef="usage">
            <th mat-header-cell *matHeaderCellDef>Uso</th>
            <td mat-cell *matCellDef="let c">
              {{ c.usageCount }}{{ c.usageLimit ? ' / ' + c.usageLimit : '' }}
            </td>
          </ng-container>

          <ng-container matColumnDef="active">
            <th mat-header-cell *matHeaderCellDef>Activo</th>
            <td mat-cell *matCellDef="let c">
              <mat-slide-toggle [checked]="c.active" (change)="toggle(c)" matTooltip="Activar/desactivar"></mat-slide-toggle>
            </td>
          </ng-container>

          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let c">
              <button mat-icon-button color="primary" (click)="edit(c)" matTooltip="Editar">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="delete(c)" matTooltip="Eliminar">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>

        @if (coupons.length === 0) {
          <p class="empty">Sin cupones aún. Crea uno arriba.</p>
        }
      </mat-card>
    </div>
  `,
  styles: [`
    .form-card { padding: 24px; margin-bottom: 24px; }
    .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .form-actions { display: flex; gap: 12px; margin-top: 8px; }
    .table-card { padding: 16px; }
    .full-width { width: 100%; }
    .empty { text-align: center; padding: 24px; color: #888; }
    @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }
  `],
})
export class CouponManagementComponent implements OnInit {
  coupons: Coupon[] = [];
  displayedColumns = ['code', 'discount', 'expires', 'usage', 'active', 'actions'];
  saving = false;
  editingId: number | null = null;

  form: CouponRequest & { usageLimit?: number } = {
    code: '',
    discountPercent: 10,
    expiresAt: '',
    usageLimit: undefined,
  };

  constructor(private admin: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.admin.getCoupons().subscribe({ next: (res) => this.coupons = res.data });
  }

  isValid(): boolean {
    return !!this.form.code.trim() && this.form.discountPercent > 0 && this.form.discountPercent <= 100 && !!this.form.expiresAt;
  }

  save(): void {
    this.saving = true;
    const req: CouponRequest = {
      code: this.form.code.trim().toUpperCase(),
      discountPercent: this.form.discountPercent,
      expiresAt: this.form.expiresAt,
      ...(this.form.usageLimit ? { usageLimit: this.form.usageLimit } : {}),
    };

    const obs = this.editingId
      ? this.admin.updateCoupon(this.editingId, req)
      : this.admin.createCoupon(req);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open(this.editingId ? 'Cupón actualizado' : 'Cupón creado', 'Cerrar', { duration: 2000 });
        this.resetForm();
        this.load();
      },
      error: (err) => {
        this.saving = false;
        this.snackBar.open(err.error?.message || 'Error al guardar el cupón', 'Cerrar', { duration: 3000 });
      },
    });
  }

  edit(c: Coupon): void {
    this.editingId = c.id;
    this.form = {
      code: c.code,
      discountPercent: c.discountPercent,
      expiresAt: c.expiresAt.substring(0, 10),
      usageLimit: c.usageLimit,
    };
  }

  cancelEdit(): void {
    this.resetForm();
  }

  toggle(c: Coupon): void {
    this.admin.toggleCoupon(c.id).subscribe({
      next: (res) => {
        c.active = res.data.active;
        this.snackBar.open(`Cupón ${c.active ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al cambiar estado del cupón', 'Cerrar', { duration: 2000 }),
    });
  }

  delete(c: Coupon): void {
    if (!confirm(`¿Eliminar cupón "${c.code}"?`)) return;
    this.admin.deleteCoupon(c.id).subscribe({
      next: () => {
        this.snackBar.open('Cupón eliminado', 'Cerrar', { duration: 2000 });
        this.load();
      },
      error: () => this.snackBar.open('Error al eliminar el cupón', 'Cerrar', { duration: 2000 }),
    });
  }

  private resetForm(): void {
    this.editingId = null;
    this.form = { code: '', discountPercent: 10, expiresAt: '', usageLimit: undefined };
  }
}
