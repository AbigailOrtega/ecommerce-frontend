import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { Order } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-track-order',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatChipsModule, MatDividerModule,
    CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent,
  ],
  template: `
    <div class="track-container">
      <mat-card class="search-card">
        <mat-icon class="search-icon">search</mat-icon>
        <h1>Rastrear pedido</h1>
        <p class="subtitle">Ingresa tu número de pedido para ver el estado de tu compra.</p>

        <form (ngSubmit)="search()" class="search-form">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Número de pedido</mat-label>
            <input matInput [(ngModel)]="orderNumber" name="orderNumber"
                   placeholder="ej. ORD-A1B2C3D4" autocomplete="off">
            <mat-icon matSuffix>confirmation_number</mat-icon>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="loading || !orderNumber.trim()">
            {{ loading ? 'Buscando...' : 'Buscar' }}
          </button>
        </form>

        @if (searched && !loading && !order) {
          <div class="not-found">
            <mat-icon>error_outline</mat-icon>
            <p>{{ errorMessage }}</p>
          </div>
        }
      </mat-card>

      @if (loading) {
        <app-loading />
      }

      @if (order) {
        <div class="order-grid">
          <mat-card>
            <h3>Artículos del pedido</h3>
            @for (item of order.items; track item.id) {
              <div class="order-item">
                <div class="item-info">
                  <strong>{{ item.productName }}</strong>
                  @if (item.selectedColorName || item.selectedSizeName) {
                    <span class="item-variant">
                      @if (item.selectedColorName) { Color: {{ item.selectedColorName }} }
                      @if (item.selectedColorName && item.selectedSizeName) { &middot; }
                      @if (item.selectedSizeName) { Talla: {{ item.selectedSizeName }} }
                    </span>
                  }
                  <span>Cant: {{ item.quantity }} &times; {{ item.productPrice | currency }}</span>
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
                  <span>Cupón {{ order.couponCode ? '(' + order.couponCode + ')' : '' }}</span>
                  <span>-{{ order.discountAmount | currency }}</span>
                </div>
              }
              @if (order.shippingCost) {
                <div class="order-subtotal-row">
                  <span>Envío{{ order.shippingMethodName ? ' (' + order.shippingMethodName + ')' : '' }}</span>
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
              <h3>Pedido {{ order.orderNumber }}</h3>
              <mat-chip [class]="'status-' + order.status.toLowerCase()">{{ order.status }}</mat-chip>
              <p class="date">Realizado el {{ order.createdAt | date:'medium' }}</p>
            </mat-card>

            <mat-card class="info-card" [class.cancelled-card]="order.pickupCancelled">
              @if (order.shippingType === 'PICKUP') {
                <h3>Punto de Retiro</h3>
                <p>{{ order.pickupLocationName }}</p>
                @if (order.pickupDate) {
                  <p class="date">
                    Fecha: <strong>{{ order.pickupDate | date:'dd/MM/yyyy':'UTC' }}</strong>
                    @if (order.pickupCancelled) {
                      <span class="cancelled-tag">Cancelada</span>
                    }
                  </p>
                }
                @if (order.pickupTimeSlotLabel && !order.pickupCancelled) {
                  <p class="date">Horario: {{ order.pickupTimeSlotLabel }}</p>
                }
              } @else {
                <h3>Dirección de Envío</h3>
                <p>
                  {{ order.shippingAddress }}<br>
                  {{ order.shippingCity }}, {{ order.shippingState }} {{ order.shippingZipCode }}<br>
                  {{ order.shippingCountry }}
                </p>
              }
            </mat-card>

            @if (order.trackingNumber) {
              <mat-card class="info-card tracking-card">
                <h3><mat-icon class="tracking-icon">local_shipping</mat-icon> Seguimiento</h3>
                @if (order.carrierName) {
                  <p class="tracking-row"><span class="tl">Transportista:</span> {{ order.carrierName }}</p>
                }
                <p class="tracking-row">
                  <span class="tl">Rastreo:</span>
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
              <h3>Pago</h3>
              <p>Método: {{ order.paymentMethod | titlecase }}</p>
            </mat-card>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .track-container { max-width: 960px; margin: 0 auto; padding: 24px 16px; }
    .search-card { padding: 32px; text-align: center; margin-bottom: 32px; }
    .search-icon { font-size: 48px; width: 48px; height: 48px; color: var(--theme-primary); margin-bottom: 8px; }
    h1 { margin: 8px 0 4px; font-size: 1.6rem; }
    .subtitle { color: #666; margin-bottom: 24px; }
    .search-form { display: flex; gap: 12px; align-items: flex-start; justify-content: center; flex-wrap: wrap; }
    .search-field { min-width: 280px; }
    .not-found { display: flex; align-items: center; gap: 8px; color: #c62828; margin-top: 16px; justify-content: center; }
    .not-found mat-icon { font-size: 20px; width: 20px; height: 20px; }
    .order-grid { display: grid; grid-template-columns: 1fr 350px; gap: 24px; }
    mat-card { padding: 20px; }
    .order-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
    .item-info { display: flex; flex-direction: column; gap: 4px; }
    .item-info span { color: #666; font-size: 0.9rem; }
    .item-variant { color: var(--theme-primary) !important; font-size: 0.85rem !important; }
    .item-total { font-weight: 600; }
    .order-subtotal-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem; color: #666; }
    .order-subtotal-row.discount { color: #2e7d32; }
    .order-total { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 1.2rem; font-weight: 700; border-top: 1px solid #eee; margin-top: 8px; }
    .info-card { margin-bottom: 16px; }
    .date { color: #666; font-size: 0.9rem; margin-top: 8px; }
    .cancelled-card { border: 1px solid #ffcc80; background: #fffde7; }
    .cancelled-tag { display: inline-block; background: #ffcc02; color: #b71c1c; font-size: 0.72rem; font-weight: 700; padding: 1px 7px; border-radius: 8px; margin-left: 8px; text-transform: uppercase; }
    .tracking-card { border: 1px solid #e3f2fd; }
    .tracking-icon { vertical-align: middle; margin-right: 6px; font-size: 20px; width: 20px; height: 20px; color: var(--theme-primary); }
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
export class TrackOrderComponent {
  orderNumber = '';
  order: Order | null = null;
  loading = false;
  searched = false;
  errorMessage = '';

  constructor(private orderService: OrderService) {}

  search(): void {
    const num = this.orderNumber.trim().toUpperCase();
    if (!num) return;
    this.loading = true;
    this.order = null;
    this.searched = false;
    this.errorMessage = '';
    this.orderService.trackOrder(num).subscribe({
      next: (res) => {
        this.order = res.data;
        this.loading = false;
        this.searched = true;
      },
      error: (err) => {
        this.order = null;
        this.loading = false;
        this.searched = true;
        if (err.status === 404) {
          this.errorMessage = 'No encontramos ningún pedido con ese número. Verifica que sea correcto.';
        } else if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'No tienes permiso para ver este pedido.';
        } else {
          this.errorMessage = `Error al buscar el pedido (${err.status}). Intenta de nuevo más tarde.`;
        }
      },
    });
  }
}
