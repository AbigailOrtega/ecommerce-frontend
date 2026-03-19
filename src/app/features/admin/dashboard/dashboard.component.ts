import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe, KeyValuePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { DashboardStats } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, CurrencyPipe, DatePipe, KeyValuePipe, LoadingComponent],
  template: `
    <div class="container">
      <h1>Panel de Administración</h1>

      <div class="admin-nav">
        <a mat-raised-button routerLink="/admin/categories"><mat-icon>category</mat-icon> Categorías</a>
        <a mat-raised-button routerLink="/admin/products"><mat-icon>inventory_2</mat-icon> Productos</a>
        <a mat-raised-button routerLink="/admin/orders"><mat-icon>receipt_long</mat-icon> Pedidos</a>
        <a mat-raised-button routerLink="/admin/users"><mat-icon>people</mat-icon> Usuarios</a>
        <a mat-raised-button routerLink="/admin/promotions"><mat-icon>local_offer</mat-icon> Promociones</a>
        <a mat-raised-button routerLink="/admin/banners"><mat-icon>image</mat-icon> Banners</a>
        <a mat-raised-button routerLink="/admin/coupons"><mat-icon>confirmation_number</mat-icon> Cupones</a>
        <a mat-raised-button routerLink="/admin/reviews"><mat-icon>rate_review</mat-icon> Reseñas</a>
        <a mat-raised-button routerLink="/admin/tickets"><mat-icon>support_agent</mat-icon> Tickets</a>
        <a mat-raised-button routerLink="/admin/shipping"><mat-icon>local_shipping</mat-icon> Envíos</a>
        <a mat-raised-button routerLink="/admin/store-info"><mat-icon>storefront</mat-icon> Info General</a>
      </div>

      @if (loading) {
        <app-loading />
      } @else if (stats) {
        <div class="stats-grid">
          <mat-card class="stat-card">
            <mat-icon>shopping_bag</mat-icon>
            <div>
              <h3>{{ stats.totalOrders }}</h3>
              <p>Pedidos totales</p>
            </div>
          </mat-card>
          <mat-card class="stat-card">
            <mat-icon>inventory_2</mat-icon>
            <div>
              <h3>{{ stats.totalProducts }}</h3>
              <p>Productos</p>
            </div>
          </mat-card>
          <mat-card class="stat-card">
            <mat-icon>people</mat-icon>
            <div>
              <h3>{{ stats.totalUsers }}</h3>
              <p>Usuarios</p>
            </div>
          </mat-card>
          <mat-card class="stat-card revenue">
            <mat-icon>attach_money</mat-icon>
            <div>
              <h3>{{ stats.totalRevenue | currency }}</h3>
              <p>Ingresos</p>
            </div>
          </mat-card>
        </div>

        <div class="dashboard-grid">
          <mat-card class="recent-orders">
            <h2>Pedidos recientes</h2>
            <table mat-table [dataSource]="stats.recentOrders">
              <ng-container matColumnDef="orderNumber">
                <th mat-header-cell *matHeaderCellDef>Pedido</th>
                <td mat-cell *matCellDef="let o">{{ o.orderNumber }}</td>
              </ng-container>
              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Cliente</th>
                <td mat-cell *matCellDef="let o">{{ o.user?.firstName }} {{ o.user?.lastName }}</td>
              </ng-container>
              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef>Total</th>
                <td mat-cell *matCellDef="let o">{{ o.totalAmount | currency }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Estado</th>
                <td mat-cell *matCellDef="let o">{{ o.status }}</td>
              </ng-container>
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Fecha</th>
                <td mat-cell *matCellDef="let o">{{ o.createdAt | date:'short' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </mat-card>

          <mat-card class="status-breakdown">
            <h2>Pedidos por estado</h2>
            @for (entry of stats.ordersByStatus | keyvalue; track entry.key) {
              <div class="status-row">
                <span>{{ entry.key }}</span>
                <span class="count">{{ entry.value }}</span>
              </div>
            }
          </mat-card>
        </div>
      }
    </div>
  `,
  styles: [`
    .admin-nav { display: flex; gap: 12px; margin-bottom: 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 20px; }
    .stat-card mat-icon { font-size: 40px; width: 40px; height: 40px; color: var(--theme-primary); }
    .stat-card h3 { margin: 0; font-size: 1.6rem; }
    .stat-card p { margin: 0; color: #666; }
    .stat-card.revenue mat-icon { color: #4caf50; }
    .dashboard-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
    .recent-orders, .status-breakdown { padding: 20px; }
    .status-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .count { font-weight: 600; }
    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .dashboard-grid { grid-template-columns: 1fr; }
    }
  `],
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  displayedColumns = ['orderNumber', 'customer', 'total', 'status', 'date'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => { this.stats = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
