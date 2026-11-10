import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { DashboardStats, Order } from '@shared/models';
import { ORDER_STATUS_ORDER, orderStatusLabel, orderStatusTone } from '@shared/order-status';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
    selector: 'app-dashboard',
    imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, CurrencyPipe, DatePipe, LoadingComponent],
    template: `
    <div class="container">
      <h1>Panel de Administración</h1>


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
            <div class="card-head">
              <h2>Pedidos recientes</h2>
              <a mat-button routerLink="/admin/orders">Ver todos</a>
            </div>
            <div class="table-scroll">
            <table mat-table [dataSource]="stats.recentOrders">
              <ng-container matColumnDef="orderNumber">
                <th mat-header-cell *matHeaderCellDef>Pedido</th>
                <td mat-cell *matCellDef="let o">{{ o.orderNumber }}</td>
              </ng-container>
              <ng-container matColumnDef="customer">
                <th mat-header-cell *matHeaderCellDef>Cliente</th>
                <td mat-cell *matCellDef="let o">{{ customerName(o) }}</td>
              </ng-container>
              <ng-container matColumnDef="total">
                <th mat-header-cell *matHeaderCellDef>Total</th>
                <td mat-cell *matCellDef="let o">{{ o.totalAmount | currency }}</td>
              </ng-container>
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef>Estado</th>
                <td mat-cell *matCellDef="let o"><span class="status-chip" [class]="'tone-' + statusTone(o.status)">{{ statusLabel(o.status) }}</span></td>
              </ng-container>
              <ng-container matColumnDef="date">
                <th mat-header-cell *matHeaderCellDef>Fecha</th>
                <td mat-cell *matCellDef="let o">{{ o.createdAt | date:'short' }}</td>
              </ng-container>
              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
            </div>
          </mat-card>

          <mat-card class="status-breakdown">
            <h2>Pedidos por estado</h2>
            @for (row of statusRows; track row.status) {
              <div class="status-row">
                <span class="status-chip" [class]="'tone-' + statusTone(row.status)">{{ statusLabel(row.status) }}</span>
                <span class="count">{{ row.count }}</span>
              </div>
            } @empty {
              <p class="empty">Todavía no hay pedidos.</p>
            }
          </mat-card>
        </div>
      }
    </div>
  `,
    styles: [`
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
    .stat-card { display: flex; align-items: center; gap: 16px; padding: 20px; }
    .stat-card mat-icon { font-size: 40px; width: 40px; height: 40px; color: var(--theme-primary-text, var(--theme-primary)); }
    .stat-card h3 { margin: 0; font-size: 1.6rem; }
    .stat-card p { margin: 0; color: #666; }
    .stat-card.revenue mat-icon { color: #4caf50; }
    .dashboard-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
    .recent-orders, .status-breakdown { padding: 20px; min-width: 0; overflow: hidden; }
    .status-row span:first-child { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
    .table-scroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .status-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f0f0f0; }
    .count { font-weight: 600; }
    .status-row { align-items: center; }
    .card-head { display: flex; justify-content: space-between; align-items: center; }
    .card-head h2 { margin: 0; }
    .empty { color: #777; }
    .status-chip { display: inline-block; padding: 2px 10px; border-radius: 999px; font-size: 0.8rem; font-weight: 500; white-space: nowrap; }
    .tone-neutral  { background: #eeeeee; color: #424242; }
    .tone-info     { background: #e3f2fd; color: #0d47a1; }
    .tone-progress { background: #ede7f6; color: #4527a0; }
    .tone-success  { background: #e8f5e9; color: #1b5e20; }
    .tone-warning  { background: #fff3e0; color: #8a4b00; }
    .tone-danger   { background: #ffebee; color: #b71c1c; }
    @media (max-width: 768px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .dashboard-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
      .stat-card { padding: 14px; gap: 10px; }
      .stat-card mat-icon { font-size: 28px; width: 28px; height: 28px; }
      .stat-card h3 { font-size: 1.2rem; }
      .recent-orders, .status-breakdown { padding: 14px 10px; }
      .recent-orders h2, .status-breakdown h2 { font-size: 1rem; margin: 0 0 10px; }
      .table-scroll table td, .table-scroll table th { font-size: 0.78rem; padding: 6px 8px !important; white-space: nowrap; }
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;
  displayedColumns = ['orderNumber', 'customer', 'total', 'status', 'date'];

  readonly statusLabel = orderStatusLabel;
  readonly statusTone = orderStatusTone;

  /** The statuses that have orders, in the order a sale goes through them. */
  get statusRows(): { status: string; count: number }[] {
    const counts = this.stats?.ordersByStatus ?? {};
    const known = ORDER_STATUS_ORDER.filter(s => (counts[s] ?? 0) > 0);
    const others = Object.keys(counts).filter(s => !ORDER_STATUS_ORDER.includes(s) && counts[s] > 0);
    return [...known, ...others].map(status => ({ status, count: counts[status] }));
  }

  /** The account's name, or the guest's: guest orders have no user. */
  customerName(o: Order): string {
    const name = o.user ? `${o.user.firstName} ${o.user.lastName}` : `${o.guestFirstName ?? ''} ${o.guestLastName ?? ''}`;
    return name.trim() || 'Invitado';
  }

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => { this.stats = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
