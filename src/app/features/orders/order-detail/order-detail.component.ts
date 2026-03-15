import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { TicketService } from '@core/services/ticket.service';
import { Order, Ticket } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatSnackBarModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent],
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
            @if (order.discountAmount || order.shippingCost) {
              <div class="order-subtotal-row">
                <span>Subtotal</span>
                <span>{{ (order.totalAmount + (order.discountAmount ?? 0) - (order.shippingCost ?? 0)) | currency }}</span>
              </div>
              @if (order.discountAmount) {
                <div class="order-subtotal-row discount">
                  <span>Coupon {{ order.couponCode ? '(' + order.couponCode + ')' : '' }}</span>
                  <span>-{{ order.discountAmount | currency }}</span>
                </div>
              }
              @if (order.shippingCost) {
                <div class="order-subtotal-row">
                  <span>Shipping{{ order.shippingMethodName ? ' (' + order.shippingMethodName + ')' : '' }}</span>
                  <span>{{ order.shippingCost | currency }}</span>
                </div>
              }
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
              @if (order.shippingType === 'PICKUP') {
                <h3>Punto de Retiro</h3>
                <p>{{ order.pickupLocationName }}</p>
                @if (order.pickupTimeSlotLabel) {
                  <p class="date">Horario: {{ order.pickupTimeSlotLabel }}</p>
                }
              } @else {
                <h3>Dirección de Envío</h3>
                <p>{{ order.shippingAddress }}<br>
                  {{ order.shippingCity }}, {{ order.shippingState }} {{ order.shippingZipCode }}<br>
                  {{ order.shippingCountry }}</p>
              }
            </mat-card>

            @if (order.trackingNumber) {
              <mat-card class="info-card tracking-card">
                <h3><mat-icon class="tracking-icon">local_shipping</mat-icon> Seguimiento</h3>
                @if (order.carrierName) {
                  <p class="tracking-row"><span class="tl">Carrier:</span> {{ order.carrierName }}</p>
                }
                <p class="tracking-row">
                  <span class="tl">Tracking:</span>
                  <span class="tracking-num">{{ order.trackingNumber }}</span>
                </p>
                @if (order.shipmentStatus) {
                  <p class="tracking-row"><span class="tl">Estado:</span> {{ order.shipmentStatus }}</p>
                }
                @if (order.labelUrl) {
                  <a mat-stroked-button color="primary" [href]="order.labelUrl" target="_blank" rel="noopener" style="margin-top:8px;">
                    <mat-icon>download</mat-icon> Ver guía
                  </a>
                }
              </mat-card>
            }

            <mat-card class="info-card">
              <h3>Payment</h3>
              <p>Method: {{ order.paymentMethod | titlecase }}</p>
              @if (order.paymentId) {
                <p class="payment-id">Transaction: {{ order.paymentId }}</p>
              }
            </mat-card>

            <!-- Report a Problem — only for DELIVERED orders -->
            @if (order.status === 'DELIVERED') {
              <mat-card class="info-card problem-card">
                @if (ticket) {
                  <div class="ticket-sent">
                    <mat-icon class="ticket-icon">support_agent</mat-icon>
                    <h3>Ticket #{{ ticket.id }} — {{ ticket.status }}</h3>
                    <p><strong>{{ ticket.subject }}</strong></p>
                    <p class="ticket-desc">{{ ticket.description }}</p>
                    @if (ticket.adminNotes) {
                      <div class="admin-notes">
                        <mat-icon>comment</mat-icon>
                        <span>{{ ticket.adminNotes }}</span>
                      </div>
                    }
                  </div>
                } @else if (showForm) {
                  <h3>Report a Problem</h3>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Subject</mat-label>
                    <input matInput [(ngModel)]="ticketSubject" placeholder="e.g. Product arrived damaged">
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Description</mat-label>
                    <textarea matInput [(ngModel)]="ticketDescription" rows="4"
                              placeholder="Describe the issue in detail..."></textarea>
                  </mat-form-field>
                  <div class="form-actions">
                    <button mat-raised-button color="warn" (click)="submitTicket()"
                            [disabled]="submitting || !ticketSubject.trim() || !ticketDescription.trim()">
                      {{ submitting ? 'Sending...' : 'Submit Ticket' }}
                    </button>
                    <button mat-button (click)="showForm = false">Cancel</button>
                  </div>
                } @else {
                  <button mat-stroked-button color="warn" (click)="showForm = true" class="report-btn">
                    <mat-icon>report_problem</mat-icon> Report a Problem
                  </button>
                }
              </mat-card>
            }
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
    .order-subtotal-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem; color: #666; }
    .order-subtotal-row.discount { color: #2e7d32; }
    .order-total { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 1.2rem; font-weight: 700; border-top: 1px solid #eee; margin-top: 8px; }
    .info-card { margin-bottom: 16px; }
    .date { color: #666; font-size: 0.9rem; margin-top: 8px; }
    .payment-id { color: #999; font-size: 0.85rem; word-break: break-all; }
    .problem-card { border: 1px solid #ffcdd2; }
    .report-btn { width: 100%; }
    .full-width { width: 100%; margin-top: 8px; }
    .form-actions { display: flex; gap: 8px; margin-top: 4px; }
    .ticket-sent { display: flex; flex-direction: column; gap: 6px; }
    .ticket-icon { font-size: 32px; width: 32px; height: 32px; color: #3f51b5; }
    .ticket-desc { color: #555; font-size: 0.9rem; }
    .admin-notes { display: flex; gap: 8px; align-items: flex-start; background: #e3f2fd; border-radius: 6px; padding: 10px; margin-top: 8px; font-size: 0.9rem; color: #1565c0; }
    .tracking-card { border: 1px solid #e3f2fd; }
    .tracking-icon { vertical-align: middle; margin-right: 6px; font-size: 20px; width: 20px; height: 20px; color: #3f51b5; }
    .tracking-row { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; margin: 4px 0; }
    .tl { font-weight: 600; color: #444; min-width: 60px; }
    .tracking-num { font-family: monospace; background: #f0f4ff; padding: 2px 8px; border-radius: 4px; font-size: 0.88rem; }
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
  showForm = false;
  submitting = false;
  ticketSubject = '';
  ticketDescription = '';
  ticket: Ticket | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber')!;
    this.orderService.getOrderByNumber(orderNumber).subscribe({
      next: (res) => {
        this.order = res.data;
        this.loading = false;
        if (res.data.status === 'DELIVERED') {
          this.loadMyTicket();
        }
      },
      error: () => this.loading = false,
    });
  }

  private loadMyTicket(): void {
    this.ticketService.getMyTickets().subscribe({
      next: (res) => {
        this.ticket = res.data.find(t => t.orderNumber === this.order!.orderNumber) ?? null;
      },
    });
  }

  submitTicket(): void {
    if (!this.ticketSubject.trim() || !this.ticketDescription.trim()) return;
    this.submitting = true;
    this.ticketService.createTicket(this.order!.orderNumber, {
      subject: this.ticketSubject.trim(),
      description: this.ticketDescription.trim(),
    }).subscribe({
      next: (res) => {
        this.ticket = res.data;
        this.showForm = false;
        this.submitting = false;
        this.snackBar.open('Ticket submitted. We\'ll review it shortly.', 'Close', { duration: 4000 });
      },
      error: (err) => {
        this.submitting = false;
        this.snackBar.open(err.error?.message || 'Error submitting ticket', 'Close', { duration: 3000 });
      },
    });
  }
}
