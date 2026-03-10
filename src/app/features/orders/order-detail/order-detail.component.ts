import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { Order } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatChipsModule, MatDividerModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent],
  template: `
    @if (loading) {
      <app-loading />
    } @else if (order) {
      <div class="container">
        <a mat-button routerLink="/orders" class="back-link">&larr; Back to Orders</a>
        <h1>Order {{ order.orderNumber }}</h1>

        <div class="order-grid">
          <mat-card>
            <h3>Order Items</h3>
            @for (item of order.items; track item.id) {
              <div class="order-item">
                <div class="item-info">
                  <strong>{{ item.productName }}</strong>
                  @if (item.selectedColorName || item.selectedSizeName) {
                    <span class="item-variant">
                      @if (item.selectedColorName) { Color: {{ item.selectedColorName }} }
                      @if (item.selectedColorName && item.selectedSizeName) { &middot; }
                      @if (item.selectedSizeName) { Size: {{ item.selectedSizeName }} }
                    </span>
                  }
                  <span>Qty: {{ item.quantity }} &times; {{ item.productPrice | currency }}</span>
                </div>
                <span class="item-total">{{ item.subtotal | currency }}</span>
              </div>
              <mat-divider />
            }
            <div class="order-total">
              <span>Total</span>
              <span>{{ order.totalAmount | currency }}</span>
            </div>
          </mat-card>

          <div>
            <mat-card class="info-card">
              <h3>Order Status</h3>
              <mat-chip [class]="'status-' + order.status.toLowerCase()">{{ order.status }}</mat-chip>
              <p class="date">Placed on {{ order.createdAt | date:'medium' }}</p>
            </mat-card>

            <mat-card class="info-card">
              <h3>Shipping Address</h3>
              <p>{{ order.shippingAddress }}<br>
                {{ order.shippingCity }}, {{ order.shippingState }} {{ order.shippingZipCode }}<br>
                {{ order.shippingCountry }}</p>
            </mat-card>

            <mat-card class="info-card">
              <h3>Payment</h3>
              <p>Method: {{ order.paymentMethod | titlecase }}</p>
              @if (order.paymentId) {
                <p class="payment-id">Transaction: {{ order.paymentId }}</p>
              }
            </mat-card>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .back-link { margin-bottom: 8px; }
    .order-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
    mat-card { padding: 20px; }
    .order-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
    .item-info { display: flex; flex-direction: column; gap: 4px; }
    .item-info span { color: #666; font-size: 0.9rem; }
    .item-variant { color: #3f51b5 !important; font-size: 0.85rem !important; }
    .item-total { font-weight: 600; }
    .order-total { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 1.2rem; font-weight: 700; }
    .info-card { margin-bottom: 16px; }
    .date { color: #666; font-size: 0.9rem; margin-top: 8px; }
    .payment-id { color: #999; font-size: 0.85rem; word-break: break-all; }
    .status-pending { background: #fff3e0 !important; color: #e65100 !important; }
    .status-confirmed { background: #e3f2fd !important; color: #1565c0 !important; }
    .status-delivered { background: #e8f5e9 !important; color: #2e7d32 !important; }
    .status-cancelled { background: #ffebee !important; color: #c62828 !important; }
    @media (max-width: 768px) { .order-grid { grid-template-columns: 1fr; } }
  `],
})
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private orderService: OrderService) {}

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber')!;
    this.orderService.getOrderByNumber(orderNumber).subscribe({
      next: (res) => { this.order = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
