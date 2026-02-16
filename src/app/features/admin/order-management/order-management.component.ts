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
      } @else {
        <table mat-table [dataSource]="orders" class="order-table">
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
          <tr mat-header-row *matHeaderRowDef="columns"></tr>
          <tr mat-row *matRowDef="let row; columns: columns;"></tr>
        </table>
        <mat-paginator [length]="totalElements" [pageSize]="pageSize" (page)="onPage($event)" />
      }
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .order-table { width: 100%; margin-top: 16px; }
    .status-select { width: 140px; }
  `],
})
export class OrderManagementComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  columns = ['orderNumber', 'customer', 'total', 'status', 'payment', 'date'];
  statuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
  totalElements = 0;
  pageSize = 20;
  currentPage = 0;

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
      error: () => this.loading = false,
    });
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
