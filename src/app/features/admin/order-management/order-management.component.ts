import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { Order, SkydropxQuotation, SkydropxRate } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [RouterLink, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule,
    MatSelectModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule, MatRadioModule,
    MatDividerModule, CurrencyPipe, DatePipe, LoadingComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Gestión de Pedidos</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      @if (loading) {
        <app-loading />
      } @else if (orders.length === 0) {
        <p class="empty-state">Sin pedidos.</p>
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
            <th mat-header-cell *matHeaderCellDef>Pedido #</th>
            <td mat-cell *matCellDef="let o">{{ o.orderNumber }}</td>
          </ng-container>
          <ng-container matColumnDef="customer">
            <th mat-header-cell *matHeaderCellDef>Cliente</th>
            <td mat-cell *matCellDef="let o">{{ o.user?.firstName }} {{ o.user?.lastName }}</td>
          </ng-container>
          <ng-container matColumnDef="total">
            <th mat-header-cell *matHeaderCellDef>Total</th>
            <td mat-cell *matCellDef="let o">
              {{ o.totalAmount | currency }}
              @if (o.discountAmount > 0) {
                <span class="discount-badge" [title]="'Coupon: ' + o.couponCode">
                  -{{ o.discountAmount | currency }}
                </span>
              }
            </td>
          </ng-container>
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Estado</th>
            <td mat-cell *matCellDef="let o">
              <mat-select [value]="o.status" (selectionChange)="updateStatus(o.id, $event.value)" class="status-select">
                @for (status of statuses; track status) {
                  <mat-option [value]="status">{{ status }}</mat-option>
                }
              </mat-select>
            </td>
          </ng-container>
          <ng-container matColumnDef="payment">
            <th mat-header-cell *matHeaderCellDef>Pago</th>
            <td mat-cell *matCellDef="let o">{{ o.paymentMethod }}</td>
          </ng-container>
          <ng-container matColumnDef="date">
            <th mat-header-cell *matHeaderCellDef>Fecha</th>
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
                          @if (item.selectedSizeName) { Talla: {{ item.selectedSizeName }} }
                        </span>
                      }
                      <span class="item-qty">× {{ item.quantity }}</span>
                      <span class="item-subtotal">{{ item.subtotal | currency }}</span>
                    </div>
                  }
                  <div class="totals-summary">
                    <div class="totals-row">
                      <span>Subtotal</span>
                      <span>{{ itemsSubtotal(o) | currency }}</span>
                    </div>
                    @if (o.discountAmount > 0) {
                      <div class="totals-row discount">
                        <span>Descuento <span class="coupon-code">{{ o.couponCode }}</span></span>
                        <span>-{{ o.discountAmount | currency }}</span>
                      </div>
                    }
                    @if (o.shippingCost > 0) {
                      <div class="totals-row">
                        <span>Envío ({{ o.shippingMethodName }})</span>
                        <span>{{ o.shippingCost | currency }}</span>
                      </div>
                    }
                    <div class="totals-row total-final">
                      <span>Total pagado</span>
                      <span>{{ o.totalAmount | currency }}</span>
                    </div>
                  </div>

                  <!-- Customer info -->
                  <div class="detail-block">
                    <span class="block-title">Cliente</span>
                    <div class="detail-row">
                      <mat-icon>person</mat-icon>
                      <span>
                        @if (o.user) { {{ o.user.firstName }} {{ o.user.lastName }} }
                        @else { {{ o.guestFirstName }} {{ o.guestLastName }} <em class="guest-tag">invitado</em> }
                      </span>
                    </div>
                    <div class="detail-row">
                      <mat-icon>email</mat-icon>
                      <span>{{ o.user?.email ?? o.guestEmail }}</span>
                    </div>
                    @if (o.guestPhone) {
                      <div class="detail-row">
                        <mat-icon>phone</mat-icon>
                        <span>{{ o.guestPhone }}</span>
                      </div>
                    }
                  </div>

                  <!-- Shipping / pickup info -->
                  <div class="detail-block">
                    @if (o.shippingType === 'PICKUP') {
                      <span class="block-title">
                        Punto de retiro
                        @if (o.pickupCancelled) {
                          <span class="cancelled-badge">RECOLECCIÓN CANCELADA</span>
                        }
                      </span>
                      <div class="detail-row">
                        <mat-icon>store</mat-icon>
                        <span>{{ o.pickupLocationName }}</span>
                      </div>
                      @if (o.pickupDate) {
                        <div class="detail-row">
                          <mat-icon>event</mat-icon>
                          <span>{{ o.pickupDate | date:'dd/MM/yyyy':'UTC' }}</span>
                        </div>
                      }
                      @if (o.pickupTimeSlotLabel && !o.pickupCancelled) {
                        <div class="detail-row">
                          <mat-icon>schedule</mat-icon>
                          <span>{{ o.pickupTimeSlotLabel }}</span>
                        </div>
                      }
                      @if (!o.pickupCancelled && o.status !== 'CANCELLED' && o.status !== 'DELIVERED' && o.status !== 'REFUNDED') {
                        <button mat-stroked-button color="warn" class="cancel-pickup-btn"
                                (click)="cancelPickup(o); $event.stopPropagation()"
                                [disabled]="cancellingPickupSet.has(o.id)">
                          <mat-icon>event_busy</mat-icon>
                          {{ cancellingPickupSet.has(o.id) ? 'Cancelando...' : 'Cancelar recolección' }}
                        </button>
                      }
                    } @else {
                      <span class="block-title">Dirección de envío</span>
                      <div class="detail-row">
                        <mat-icon>location_on</mat-icon>
                        <span>{{ o.shippingAddress }}, {{ o.shippingCity }}, {{ o.shippingState }} {{ o.shippingZipCode }}, {{ o.shippingCountry }}</span>
                      </div>
                    }
                  </div>

                  <!-- ── Skydropx Panel (only for NATIONAL orders) ── -->
                  @if (o.shippingType === 'NATIONAL') {
                    <mat-divider style="margin: 12px 0;"></mat-divider>
                    <div class="skydropx-panel">
                      <span class="panel-title">
                        <mat-icon class="panel-icon">local_shipping</mat-icon> Guía Skydropx
                      </span>

                      @if (o.skydropxShipmentId) {
                        <!-- Existing shipment -->
                        <div class="shipment-info">
                          <div class="shipment-row">
                            <span class="info-label">Carrier:</span>
                            <span>{{ o.carrierName }}</span>
                          </div>
                          <div class="shipment-row">
                            <span class="info-label">Tracking:</span>
                            <span class="tracking-number">{{ o.trackingNumber }}</span>
                          </div>
                          <div class="shipment-row">
                            <span class="info-label">Estado:</span>
                            <span class="status-chip">{{ o.shipmentStatus }}</span>
                          </div>
                          <button mat-raised-button color="primary"
                                  (click)="downloadLabel(o)"
                                  [disabled]="downloadingSet.has(o.id)">
                            @if (downloadingSet.has(o.id)) {
                              <mat-spinner diameter="18" style="display:inline-block;margin-right:6px;"></mat-spinner>
                            } @else {
                              <mat-icon>download</mat-icon>
                            }
                            {{ downloadingSet.has(o.id) ? 'Descargando...' : 'Descargar guía' }}
                          </button>
                          @if (!o.labelUrl || !o.labelUrl.startsWith('http')) {
                            <button mat-stroked-button (click)="refreshShipment(o)"
                                    [disabled]="refreshingSet.has(o.id)" title="Refrescar datos de la guía">
                              @if (refreshingSet.has(o.id)) {
                                <mat-spinner diameter="18" style="display:inline-block;"></mat-spinner>
                              } @else {
                                <mat-icon>refresh</mat-icon>
                              }
                            </button>
                          }
                          <button mat-stroked-button color="warn" (click)="cancelShipment(o)"
                                  [disabled]="cancellingSet.has(o.id)">
                            <mat-icon>cancel</mat-icon>
                            {{ cancellingSet.has(o.id) ? 'Cancelando...' : 'Cancelar guía' }}
                          </button>
                        </div>
                      } @else {
                        <!-- No shipment yet -->
                        @if (o.skydropxRateId && !quotations[o.id]) {
                          <!-- Customer already selected a rate at checkout -->
                          <p class="rate-preselected">
                            <mat-icon>check_circle</mat-icon>
                            Tarifa elegida por el cliente: <strong>{{ o.shippingMethodName }}</strong>
                          </p>
                          <div class="rates-actions">
                            <button mat-stroked-button (click)="getQuotation(o)" [disabled]="quotingSet.has(o.id)">
                              <mat-icon>search</mat-icon> Cambiar tarifa
                            </button>
                            <button mat-raised-button color="primary"
                                    [disabled]="creatingSet.has(o.id)"
                                    (click)="createShipmentDirect(o)">
                              @if (creatingSet.has(o.id)) {
                                <mat-spinner diameter="18" style="display:inline-block;margin-right:6px;"></mat-spinner>
                              } @else {
                                <mat-icon>receipt_long</mat-icon>
                              }
                              Generar guía
                            </button>
                          </div>
                        } @else if (!quotations[o.id]) {
                          <button mat-stroked-button color="primary" (click)="getQuotation(o)"
                                  [disabled]="quotingSet.has(o.id)">
                            @if (quotingSet.has(o.id)) {
                              <mat-spinner diameter="18" style="display:inline-block;margin-right:6px;"></mat-spinner>
                            } @else {
                              <mat-icon>search</mat-icon>
                            }
                            Cotizar con Skydropx
                          </button>
                        } @else {
                          <!-- Rate selection after manual quote -->
                          <div class="rates-list">
                            @for (rate of quotations[o.id]!.rates; track rate.id) {
                              <div class="rate-item" [class.rate-selected]="selectedRates[o.id] === rate.id"
                                   (click)="selectedRates[o.id] = rate.id">
                                <mat-radio-button [value]="rate.id" [checked]="selectedRates[o.id] === rate.id"
                                                  color="primary" (click)="$event.stopPropagation()">
                                </mat-radio-button>
                                <div class="rate-info">
                                  <span class="rate-carrier">{{ rate.carrier }}</span>
                                  <span class="rate-service">{{ rate.service }}</span>
                                </div>
                                @if (rate.estimatedDays) {
                                  <span class="rate-days">{{ rate.estimatedDays }} día(s)</span>
                                }
                                <span class="rate-price">{{ rate.price | currency }}</span>
                              </div>
                            }
                          </div>
                          <div class="rates-actions">
                            <button mat-button (click)="quotations[o.id] = null; selectedRates[o.id] = null">
                              <mat-icon>refresh</mat-icon> Nueva cotización
                            </button>
                            <button mat-raised-button color="primary"
                                    [disabled]="!selectedRates[o.id] || creatingSet.has(o.id)"
                                    (click)="createShipment(o)">
                              @if (creatingSet.has(o.id)) {
                                <mat-spinner diameter="18" style="display:inline-block;margin-right:6px;"></mat-spinner>
                              } @else {
                                <mat-icon>receipt_long</mat-icon>
                              }
                              Generar guía
                            </button>
                          </div>
                        }
                      }
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
    .item-variant { color: var(--theme-primary); font-size: 0.82rem; }
    .item-qty { color: #666; }
    .item-subtotal { font-weight: 600; margin-left: auto; }
    .totals-summary { border-top: 1px solid #e0e0e0; margin-top: 8px; padding-top: 8px; display: flex; flex-direction: column; gap: 4px; align-items: flex-end; min-width: 260px; align-self: flex-end; }
    .totals-row { display: flex; justify-content: space-between; width: 260px; font-size: 0.88rem; color: #555; }
    .totals-row.discount { color: #2e7d32; }
    .totals-row.total-final { font-weight: 700; font-size: 0.95rem; color: #1a1a2e; border-top: 1px solid #ccc; padding-top: 4px; margin-top: 2px; }
    .coupon-code { background: #e8f5e9; color: #2e7d32; font-size: 0.75rem; padding: 1px 6px; border-radius: 8px; margin-left: 4px; font-weight: 600; }
    .discount-badge { display: inline-block; background: #e8f5e9; color: #2e7d32; font-size: 0.72rem; padding: 1px 6px; border-radius: 8px; margin-left: 6px; font-weight: 600; cursor: help; }
    .empty-state { margin-top: 32px; text-align: center; color: #888; font-size: 1rem; }

    .detail-block { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; color: #555; margin-top: 8px; padding: 10px 14px; background: #fff; border-radius: 8px; border: 1px solid #e8e8e8; }
    .block-title { font-weight: 700; font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em; color: #999; margin-bottom: 2px; display: flex; align-items: center; gap: 8px; }
    .detail-row { display: flex; align-items: center; gap: 8px; }
    .detail-row mat-icon { font-size: 16px; width: 16px; height: 16px; color: #90a4ae; flex-shrink: 0; }
    .guest-tag { background: #fce4ec; color: #c62828; font-size: 0.72rem; padding: 1px 6px; border-radius: 6px; margin-left: 4px; }
    .cancelled-badge { background: #ff5722; color: white; font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 8px; letter-spacing: 0.04em; }
    .info-label { font-weight: 600; color: #333; }

    .skydropx-panel { display: flex; flex-direction: column; gap: 12px; }
    .panel-title { display: flex; align-items: center; gap: 6px; font-weight: 600; font-size: 0.95rem; color: #1a1a2e; }
    .panel-icon { font-size: 20px; width: 20px; height: 20px; color: var(--theme-primary); }

    .shipment-info { display: flex; flex-direction: column; gap: 8px; }
    .shipment-row { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; }
    .tracking-number { font-family: monospace; background: #f0f0f0; padding: 2px 8px; border-radius: 4px; }
    .status-chip { background: #e3f2fd; color: #1565c0; padding: 2px 8px; border-radius: 12px; font-size: 0.8rem; font-weight: 600; }

    .rates-list { display: flex; flex-direction: column; gap: 6px; max-width: 600px; }
    .rate-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border: 1px solid #e0e0e0; border-radius: 8px; cursor: pointer; transition: border-color 0.15s; font-size: 0.88rem; }
    .rate-item:hover { border-color: var(--theme-primary); }
    .rate-item.rate-selected { border-color: var(--theme-primary); background: rgba(0,0,0,0.06); }
    .rate-info { display: flex; flex-direction: column; flex: 1; }
    .rate-carrier { font-weight: 600; color: #1a1a2e; }
    .rate-service { font-size: 0.8rem; color: #666; }
    .rate-days { color: #888; font-size: 0.82rem; white-space: nowrap; }
    .rate-price { font-weight: 700; color: var(--theme-primary); white-space: nowrap; margin-left: auto; }
    .rates-actions { display: flex; align-items: center; gap: 10px; margin-top: 8px; }
    .rate-preselected { display: flex; align-items: center; gap: 6px; font-size: 0.88rem; color: #2e7d32; margin: 0 0 4px; }
    .rate-preselected mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .cancel-pickup-btn { margin-top: 8px; font-size: 0.82rem; }
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

  // Skydropx state
  quotations: Record<number, SkydropxQuotation | null> = {};
  selectedRates: Record<number, string | null> = {};
  quotingSet = new Set<number>();
  creatingSet = new Set<number>();
  cancellingSet = new Set<number>();
  refreshingSet = new Set<number>();
  downloadingSet = new Set<number>();
  cancellingPickupSet = new Set<number>();

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
        this.snackBar.open('Error al cargar los pedidos', 'Cerrar', { duration: 4000 });
      },
    });
  }

  toggleExpand(order: Order): void {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }

  updateStatus(orderId: number, status: string): void {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.snackBar.open('Estado del pedido actualizado', 'Cerrar', { duration: 3000 }),
      error: () => this.snackBar.open('Error al actualizar el estado', 'Cerrar', { duration: 3000 }),
    });
  }

  onPage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }

  itemsSubtotal(order: Order): number {
    return order.items.reduce((sum, item) => sum + item.subtotal, 0);
  }

  getQuotation(order: Order): void {
    this.quotingSet.add(order.id);
    this.adminService.getSkydropxQuotation(order.id).subscribe({
      next: (res) => {
        this.quotations[order.id] = res.data;
        this.quotingSet.delete(order.id);
      },
      error: (err) => {
        this.quotingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al cotizar', 'Cerrar', { duration: 5000 });
      },
    });
  }

  createShipmentDirect(order: Order): void {
    if (!order.skydropxRateId) return;
    this.creatingSet.add(order.id);
    this.adminService.createSkydropxShipment(order.id, order.skydropxRateId).subscribe({
      next: (res) => {
        this.creatingSet.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open('Guía generada exitosamente', 'Cerrar', { duration: 4000 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al generar guía', 'Cerrar', { duration: 5000 });
      },
    });
  }

  createShipment(order: Order): void {
    const rateId = this.selectedRates[order.id];
    if (!rateId) return;

    this.creatingSet.add(order.id);
    this.adminService.createSkydropxShipment(order.id, rateId).subscribe({
      next: (res) => {
        this.creatingSet.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        delete this.quotations[order.id];
        delete this.selectedRates[order.id];
        this.snackBar.open('Guía generada exitosamente', 'Cerrar', { duration: 4000 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al generar guía', 'Cerrar', { duration: 5000 });
      },
    });
  }

  downloadLabel(order: Order): void {
    this.downloadingSet.add(order.id);
    this.adminService.downloadSkydropxLabel(order.id).subscribe({
      next: (blob) => {
        this.downloadingSet.delete(order.id);
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `guia-${order.orderNumber}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'La guía aún no está disponible, intenta en unos segundos', 'Cerrar', { duration: 5000 });
      },
    });
  }

  refreshShipment(order: Order): void {
    this.refreshingSet.add(order.id);
    this.adminService.refreshSkydropxShipment(order.id).subscribe({
      next: (res) => {
        this.refreshingSet.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open('Datos actualizados', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.refreshingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al obtener guía', 'Cerrar', { duration: 5000 });
      },
    });
  }

  cancelPickup(order: Order): void {
    const reason = prompt('Motivo de cancelación (opcional):') ?? undefined;
    this.cancellingPickupSet.add(order.id);
    this.adminService.cancelPickup(order.id, reason || undefined).subscribe({
      next: (res) => {
        this.cancellingPickupSet.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open('Recolección cancelada — el cliente podrá reagendar', 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        this.cancellingPickupSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al cancelar recolección', 'Cerrar', { duration: 4000 });
      },
    });
  }

  cancelShipment(order: Order): void {
    if (!confirm('¿Cancelar la guía de envío de este pedido?')) return;
    this.cancellingSet.add(order.id);
    this.adminService.cancelSkydropxShipment(order.id).subscribe({
      next: (res) => {
        this.cancellingSet.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open('Guía cancelada', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.cancellingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al cancelar', 'Cerrar', { duration: 5000 });
      },
    });
  }
}
