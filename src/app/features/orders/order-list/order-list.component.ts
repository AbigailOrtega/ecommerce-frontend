import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { Order } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [RouterLink, MatTableModule, MatButtonModule, MatChipsModule, MatCardModule, MatIconModule, CurrencyPipe, DatePipe, LoadingComponent],
  template: `
    <div class="container">
      <h1>My Orders</h1>

      @if (loading) {
        <app-loading />
      } @else if (orders.length === 0) {
        <mat-card class="empty">
          <mat-icon class="empty-icon">receipt_long</mat-icon>
          <h2>No orders yet</h2>
          <p>Start shopping to see your orders here.</p>
          <a mat-raised-button color="primary" routerLink="/">Browse Products</a>
        </mat-card>
      } @else {
        @for (order of orders; track order.id) {
          <mat-card class="order-card">
            <div class="order-header">
              <div>
                <strong>Order {{ order.orderNumber }}</strong>
                <span class="date">{{ order.createdAt | date:'medium' }}</span>
              </div>
              <mat-chip [class]="'status-' + order.status.toLowerCase()">{{ order.status }}</mat-chip>
            </div>
            <div class="order-items">
              @for (item of order.items; track item.id) {
                <span class="item-name">{{ item.productName }} x{{ item.quantity }}</span>
              }
            </div>
            <div class="order-footer">
              <span class="total">{{ order.totalAmount | currency }}</span>
              <a mat-button color="primary" [routerLink]="['/orders', order.orderNumber]">View Details</a>
            </div>
          </mat-card>
        }
      }
    </div>
  `,
  styles: [`
    .empty { text-align: center; padding: 48px; }
    .empty-icon { font-size: 64px; width: 64px; height: 64px; color: #ccc; }
    .order-card { margin-bottom: 16px; padding: 20px; }
    .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .date { color: #999; font-size: 0.85rem; margin-left: 12px; }
    .order-items { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
    .item-name { background: #f5f5f5; padding: 4px 12px; border-radius: 16px; font-size: 0.9rem; }
    .order-footer { display: flex; justify-content: space-between; align-items: center; }
    .total { font-size: 1.2rem; font-weight: 600; }
    .status-pending { background: #fff3e0 !important; color: #e65100 !important; }
    .status-confirmed { background: #e3f2fd !important; color: #1565c0 !important; }
    .status-processing { background: #e8eaf6 !important; color: #283593 !important; }
    .status-shipped { background: #e0f2f1 !important; color: #00695c !important; }
    .status-delivered { background: #e8f5e9 !important; color: #2e7d32 !important; }
    .status-cancelled { background: #ffebee !important; color: #c62828 !important; }
    .status-refunded { background: #fce4ec !important; color: #ad1457 !important; }
  `],
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getUserOrders().subscribe({
      next: (res) => { this.orders = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
