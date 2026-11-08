import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
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
    imports: [RouterLink, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule,
        MatSelectModule, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule, MatRadioModule,
        MatDividerModule, CurrencyPipe, DatePipe, LoadingComponent],
    templateUrl: './order-management.component.html',
    styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  loading = true;
  private readonly desktopColumns = ['expand', 'orderNumber', 'customer', 'shippingType', 'total', 'status', 'payment', 'date'];
  private readonly desktopFilterColumns = ['f-expand', 'f-orderNumber', 'f-customer', 'f-shippingType', 'f-total', 'f-status', 'f-payment', 'f-date'];
  private readonly mobileColumns = ['expand', 'orderNumber', 'status', 'date'];
  private readonly mobileFilterColumns = ['f-expand', 'f-orderNumber', 'f-status', 'f-date'];
  isMobile = window.innerWidth < 768;
  showMobileFilters = false;

  get visibleColumns() { return this.isMobile ? this.mobileColumns : this.desktopColumns; }
  get visibleFilterColumns() { return this.isMobile ? this.mobileFilterColumns : this.desktopFilterColumns; }

  @HostListener('window:resize')
  onResize() { this.isMobile = window.innerWidth < 768; }
  filterStatus = '';
  filterShippingType = '';
  filterPayment = '';
  filterDateFrom = '';
  filterDateTo = '';
  filterSearch = '';
  private searchDebounce: ReturnType<typeof setTimeout> | null = null;
  statuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED', 'SHIPMENT_PENDING', 'DELIVERY_ATTEMPT', 'DELIVERY_EXCEPTION'];
  totalElements = 0;
  pageSize = 20;
  currentPage = 0;
  expandedOrderId: number | null = null;

  // Skydropx state
  quotations: Record<number, SkydropxQuotation | null> = {};
  selectedRates: Record<number, string | null> = {};
  quotingSet = new Set<number>();
  creatingSet = new Set<number>();
  carrierErrorOrders = new Set<number>();
  cancellingSet = new Set<number>();
  refreshingSet = new Set<number>();
  downloadingSet = new Set<number>();
  cancellingPickupSet = new Set<number>();

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnDestroy(): void {
    if (this.searchDebounce) clearTimeout(this.searchDebounce);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  onSearchChange(): void {
    if (this.searchDebounce) clearTimeout(this.searchDebounce);
    this.searchDebounce = setTimeout(() => this.applyFilters(), 400);
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.loadOrders();
  }

  hasActiveFilters(): boolean {
    return !!(this.filterStatus || this.filterShippingType || this.filterPayment ||
              this.filterDateFrom || this.filterDateTo || this.filterSearch);
  }

  clearFilters(): void {
    this.filterStatus = '';
    this.filterShippingType = '';
    this.filterPayment = '';
    this.filterDateFrom = '';
    this.filterDateTo = '';
    this.filterSearch = '';
    this.currentPage = 0;
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    const dateFrom = this.filterDateFrom ? `${this.filterDateFrom}T00:00:00` : '';
    const dateTo = this.filterDateTo ? `${this.filterDateTo}T23:59:59` : '';
    this.adminService.getAllOrders(
      this.currentPage, this.pageSize,
      this.filterStatus, this.filterShippingType,
      this.filterPayment, dateFrom, dateTo, this.filterSearch
    ).subscribe({
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
        this.carrierErrorOrders.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        const msg = res.data.status === 'SHIPMENT_PENDING'
          ? 'Skydropx no devolvió el label en 60s. Usa "Reintentar guía" para obtenerlo.'
          : 'Guía generada exitosamente';
        this.snackBar.open(msg, 'Cerrar', { duration: res.data.status === 'SHIPMENT_PENDING' ? 8000 : 4000 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        const errMsg: string = err.error?.message || '';
        if (errMsg.includes('no pudo generar la guía')) {
          this.carrierErrorOrders.add(order.id);
          this.snackBar.open('El carrier rechazó el envío. Cotizando alternativas...', 'Cerrar', { duration: 5000 });
          this.getQuotation(order);
        } else {
          this.snackBar.open(errMsg || 'Error al generar guía', 'Cerrar', { duration: 5000 });
        }
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
        this.carrierErrorOrders.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        delete this.quotations[order.id];
        delete this.selectedRates[order.id];
        const msg = res.data.status === 'SHIPMENT_PENDING'
          ? 'Skydropx no devolvió el label en 60s. Usa "Reintentar guía" para obtenerlo.'
          : 'Guía generada exitosamente';
        this.snackBar.open(msg, 'Cerrar', { duration: res.data.status === 'SHIPMENT_PENDING' ? 8000 : 4000 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        const errMsg: string = err.error?.message || '';
        if (errMsg.includes('no pudo generar la guía')) {
          this.carrierErrorOrders.add(order.id);
          this.snackBar.open('El carrier rechazó el envío. Cotizando alternativas...', 'Cerrar', { duration: 5000 });
          this.getQuotation(order);
        } else {
          this.snackBar.open(errMsg || 'Error al generar guía', 'Cerrar', { duration: 5000 });
        }
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
        const msg = res.data.status !== 'SHIPMENT_PENDING' && res.data.labelUrl && res.data.trackingNumber
          ? 'Guía lista — se notificó al cliente'
          : res.data.status === 'SHIPMENT_PENDING'
            ? 'Skydropx aún no tiene el label listo. Intenta más tarde.'
            : 'Datos actualizados';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        this.refreshingSet.delete(order.id);
        const errMsg: string = err.error?.message || '';
        if (errMsg.includes('no pudo generar la guía')) {
          this.carrierErrorOrders.add(order.id);
        }
        this.snackBar.open(errMsg || 'Error al obtener guía', 'Cerrar', { duration: 5000 });
      },
    });
  }

  cancelAndRequote(order: Order): void {
    if (!confirm('¿Cancelar la guía actual y cotizar con otra paquetería?')) return;
    this.cancellingSet.add(order.id);
    this.adminService.cancelSkydropxShipment(order.id).subscribe({
      next: (res) => {
        this.cancellingSet.delete(order.id);
        this.carrierErrorOrders.delete(order.id);
        const idx = this.orders.findIndex(o => o.id === order.id);
        if (idx !== -1) this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.getQuotation(res.data);
      },
      error: (err) => {
        this.cancellingSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al cancelar guía', 'Cerrar', { duration: 5000 });
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

  shipmentStatusLabel(status: string | null | undefined): string {
    switch (status?.toLowerCase()) {
      case 'pending':           return 'En espera';
      case 'created':           return 'Guía creada';
      case 'picked_up':         return 'Recolectado';
      case 'in_transit':        return 'En tránsito';
      case 'last_mile':         return 'En reparto';
      case 'delivery_attempt':  return 'Intento de entrega';
      case 'delivered':         return 'Entregado';
      case 'canceled':
      case 'cancelled':         return 'Cancelado';
      case 'exception':         return 'Problema en entrega';
      default:                  return status || '—';
    }
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
