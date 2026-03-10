import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { Order } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [RouterLink, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSelectModule, MatChipsModule, MatSnackBarModule, CurrencyPipe, DatePipe, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Order Management</h1>
        <a mat-button routerLink="/admin">&larr; Dashboard</a>
      </div>

      @if (loading) {
        <app-loading />
      } @else if (orders.length === 0) {
        <p class="empty-state">No orders found.</p>
      } @else {
        <table mat-table [dataSource]="orders" [multiTemplateDataRows]="true" class="order-table">

          <ng-container matColumnDef="expand">
            <th mat-header-cell *matHeaderCellDef></th>
            <td mat-cell *matCellDef="let o">
              <button mat-icon-button (click)="toggleExpand(o); $event.stopPropagation()">
                <mat-icon>{{ expandedOrderId === o.id ? 'expand_less' : 'expand_more' }}</mat-icon>
              </button>
            </td>
          </ng-container>

          <ng-container matColumnDef="orderNumber">
            <th mat-header-cell *matHeaderCellDef>Order #</th>
            <td mat-cell *matCellDef="let o">{{ o.orderNumber }}</td>
          </ng-container>
          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Customer</th>
            <td mat-cell *matCellDef="let o">{{ o.user?.firstName }} {{ o.user?.lastName }}</td>
          </ng-container>
          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let o">{{ o.totalAmount | currency }}</td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let o">
              <mat-select [value]="o.status" (selectionChange)="updateStatus(o.id, $event.value)" class="status-select">
                @for (status of statuses; track status) {
                  <mat-option [value]="status">{{ status }}</mat-option>
                }
              </mat-select>
            </td>
          </ng-container>
          <ng-container matColumnDef="payment">
            <th mat-header-cell *matHeaderCellDef>Payment</th>
            <td mat-cell *matCellDef="let o">{{ o.paymentMethod }}</td>
          </ng-container>
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Date</th>
            <td mat-cell *matCellDef="let o">{{ o.createdAt | date:'short' }}</td>
          </ng-container>

          <!-- Expandable detail row -->
          <ng-container matColumnDef="expandedDetail">
            <td mat-cell *matCellDef="let o" [attr.colspan]="columns.length">
              @if (expandedOrderId === o.id) {
                <div class="items-panel">
                  @for (item of o.items; track item.id) {
                    <div class="item-row">
                      <span class="item-name">{{ item.productName }}</span>
                      @if (item.selectedColorName || item.selectedSizeName) {
                        <span class="item-variant">
                          @if (item.selectedColorName) { Color: {{ item.selectedColorName }} }
                          @if (item.selectedColorName && item.selectedSizeName) { &middot; }
                          @if (item.selectedSizeName) { Size: {{ item.selectedSizeName }} }
                        </span>
                      }
                      <span class="item-qty">× {{ item.quantity }}</span>
                      <span class="item-subtotal">{{ item.subtotal | currency }}</span>
                    </div>
                  }
                </div>
              }
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;" class="main-row"
              (click)="toggleExpand(row)"></tr>
          <tr mat-row *matRowDef="let row; columns: ['expandedDetail'];" class="detail-row"></tr>

        </table>
        <mat-paginator [length]="totalElements" [pageSize]="pageSize" (page)="onPage($event)" />
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .order-table { width: 100%; margin-top: 16px; }
    .status-select { width: 140px; }
    .main-row { cursor: pointer; }
    .main-row:hover { background: #f5f5f5; }
    .detail-row td { padding: 0 !important; border-bottom: none; }

    .items-panel {
      padding: 12px 16px 16px 56px;
      background: #f9f9fb;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .item-row {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.9rem;
    }
    .item-name { font-weight: 500; color: #333; min-width: 160px; }
    .item-variant { color: #3f51b5; font-size: 0.82rem; }
    .item-qty { color: #666; }
    .item-subtotal { font-weight: 600; margin-left: auto; }
    .empty-state { margin-top: 32px; text-align: center; color: #888; font-size: 1rem; }
  `],
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  columns = ['expand', 'orderNumber', 'customer', 'total', 'status', 'payment', 'date'];
  statuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
  totalElements = 0;
  pageSize = 20;
  currentPage = 0;
  expandedOrderId: number | null = null;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.adminService.getAllOrders(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.orders = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to load orders', 'Close', { duration: 4000 });
      },
    });
  }

  toggleExpand(order: Order): void {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }

  updateStatus(orderId: number, status: string): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.snackBar.open('Order status updated', 'Close', { duration: 3000 }),
      error: () => this.snackBar.open('Failed to update status', 'Close', { duration: 3000 }),
    });
  }

  onPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }
}
