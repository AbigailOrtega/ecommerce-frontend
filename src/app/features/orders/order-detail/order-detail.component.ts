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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { OrderService } from '@core/services/order.service';
import { TicketService } from '@core/services/ticket.service';
import { Order, PickupAvailability, Ticket } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule,
    MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule,
    MatDatepickerModule, MatSelectModule,
    MatSnackBarModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent],
  template: `
    @if (loading) {
      <app-loading />
    } @else if (order) {
      <div class="container">
        <a mat-button routerLink="/orders" class="back-link">&larr; Volver a pedidos</a>
        <h1>Pedido {{ order.orderNumber }}</h1>

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
              <h3>Estado del pedido</h3>
              <mat-chip [class]="'status-' + order.status.toLowerCase()">{{ order.status }}</mat-chip>
              <p class="date">Realizado el {{ order.createdAt | date:'medium' }}</p>
            </mat-card>

            <mat-card class="info-card" [class.cancelled-card]="order.pickupCancelled">
              @if (order.shippingType === 'PICKUP') {
                <h3>Punto de Retiro</h3>
                <p>{{ order.pickupLocationName }}</p>
                @if (order.pickupDate) {
                  <p class="date">Fecha: <strong>{{ order.pickupDate | date:'dd/MM/yyyy':'UTC' }}</strong>
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
                <p>{{ order.shippingAddress }}<br>
                  {{ order.shippingCity }}, {{ order.shippingState }} {{ order.shippingZipCode }}<br>
                  {{ order.shippingCountry }}</p>
              }
            </mat-card>

            <!-- ── No puedo asistir (cliente cancela/reagenda) ── -->
            @if (!order.pickupCancelled && order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && order.status !== 'REFUNDED' && order.shippingType === 'PICKUP') {
              @if (!showCancelSection) {
                <button mat-stroked-button class="cant-attend-btn" (click)="openCancelSection()">
                  <mat-icon>event_busy</mat-icon> No puedo asistir
                </button>
              } @else {
                <mat-card class="info-card cancel-section-card">
                  <h3><mat-icon class="reschedule-icon">event_repeat</mat-icon> Cancelar o reagendar recolección</h3>
                  <p class="reschedule-msg">
                    ¿No puedes recoger tu pedido el
                    <strong>{{ order.pickupDate | date:'dd/MM/yyyy':'UTC' }}</strong>?
                    Elige una nueva fecha o cancela para reagendar después.
                  </p>

                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Nueva fecha de recolección (opcional)</mat-label>
                    <input matInput [matDatepicker]="selfPicker"
                           [ngModel]="rescheduleDate"
                           (ngModelChange)="onRescheduleDateChange($event)"
                           [min]="today"
                           [matDatepickerFilter]="isAvailableDate"
                           [ngModelOptions]="{standalone: true}"
                           placeholder="Selecciona una fecha para reagendar">
                    <mat-datepicker-toggle matSuffix [for]="selfPicker"></mat-datepicker-toggle>
                    <mat-datepicker #selfPicker></mat-datepicker>
                  </mat-form-field>

                  @if (availableSlots.length > 1) {
                    <mat-form-field appearance="outline" class="full-width">
                      <mat-label>Horario disponible</mat-label>
                      <mat-select [(ngModel)]="selectedSlotId" [ngModelOptions]="{standalone: true}">
                        @for (slot of availableSlots; track slot.id) {
                          <mat-option [value]="slot.id">{{ slot.startTime }} – {{ slot.endTime }}</mat-option>
                        }
                      </mat-select>
                    </mat-form-field>
                  }

                  <div class="cancel-actions">
                    @if (rescheduleDate) {
                      <button mat-raised-button color="primary"
                              [disabled]="rescheduling"
                              (click)="submitReschedule()">
                        {{ rescheduling ? 'Guardando...' : 'Confirmar nueva fecha' }}
                      </button>
                    }
                    <button mat-stroked-button color="warn"
                            [disabled]="cancellingPickup"
                            (click)="cancelOwnPickup()">
                      {{ cancellingPickup ? 'Cancelando...' : 'Solo cancelar por ahora' }}
                    </button>
                    <button mat-button (click)="closeCancelSection()">Volver</button>
                  </div>
                </mat-card>
              }
            }

            <!-- ── Reagendar recolección (cancelada por tienda o por cliente) ── -->
            @if (order.pickupCancelled && order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && order.status !== 'REFUNDED') {
              <mat-card class="info-card reschedule-card">
                <h3><mat-icon class="reschedule-icon">event_repeat</mat-icon> Reagendar recolección</h3>
                <p class="reschedule-msg">
                  Tu recolección del
                  <strong>{{ order.pickupDate | date:'dd/MM/yyyy':'UTC' }}</strong>
                  fue cancelada. Por favor elige una nueva fecha.
                </p>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nueva fecha de recolección</mat-label>
                  <input matInput [matDatepicker]="reschedulePicker"
                         [ngModel]="rescheduleDate"
                         (ngModelChange)="onRescheduleDateChange($event)"
                         [min]="today"
                         [matDatepickerFilter]="isAvailableDate"
                         [ngModelOptions]="{standalone: true}"
                         placeholder="Selecciona fecha">
                  <mat-datepicker-toggle matSuffix [for]="reschedulePicker"></mat-datepicker-toggle>
                  <mat-datepicker #reschedulePicker></mat-datepicker>
                </mat-form-field>

                @if (availableSlots.length > 1) {
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Horario disponible</mat-label>
                    <mat-select [(ngModel)]="selectedSlotId" [ngModelOptions]="{standalone: true}">
                      @for (slot of availableSlots; track slot.id) {
                        <mat-option [value]="slot.id">{{ slot.startTime }} – {{ slot.endTime }}</mat-option>
                      }
                    </mat-select>
                  </mat-form-field>
                }

                <button mat-raised-button color="primary"
                        [disabled]="!rescheduleDate || rescheduling"
                        (click)="submitReschedule()">
                  {{ rescheduling ? 'Guardando...' : 'Confirmar nueva fecha' }}
                </button>
              </mat-card>
            }

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
              @if (order.paymentId) {
                <p class="payment-id">Transacción: {{ order.paymentId }}</p>
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
                  <h3>Reportar un problema</h3>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Asunto</mat-label>
                    <input matInput [(ngModel)]="ticketSubject" placeholder="ej. El producto llegó dañado">
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Descripción</mat-label>
                    <textarea matInput [(ngModel)]="ticketDescription" rows="4"
                              placeholder="Describe el problema con detalle..."></textarea>
                  </mat-form-field>
                  <div class="form-actions">
                    <button mat-raised-button color="warn" (click)="submitTicket()"
                            [disabled]="submitting || !ticketSubject.trim() || !ticketDescription.trim()">
                      {{ submitting ? 'Enviando...' : 'Enviar ticket' }}
                    </button>
                    <button mat-button (click)="showForm = false">Cancelar</button>
                  </div>
                } @else {
                  <button mat-stroked-button color="warn" (click)="showForm = true" class="report-btn">
                    <mat-icon>report_problem</mat-icon> Reportar un problema
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
    .item-variant { color: var(--theme-primary) !important; font-size: 0.85rem !important; }
    .item-total { font-weight: 600; }
    .order-subtotal-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 0.9rem; color: #666; }
    .order-subtotal-row.discount { color: #2e7d32; }
    .order-total { display: flex; justify-content: space-between; padding: 16px 0 0; font-size: 1.2rem; font-weight: 700; border-top: 1px solid #eee; margin-top: 8px; }
    .info-card { margin-bottom: 16px; }
    .date { color: #666; font-size: 0.9rem; margin-top: 8px; }
    .payment-id { color: #999; font-size: 0.85rem; word-break: break-all; }
    .cancelled-card { border: 1px solid #ffcc80; background: #fffde7; }
    .cancelled-tag { display: inline-block; background: #ffcc02; color: #b71c1c; font-size: 0.72rem; font-weight: 700; padding: 1px 7px; border-radius: 8px; margin-left: 8px; text-transform: uppercase; }
    .cant-attend-btn { width: 100%; margin-bottom: 16px; color: #e65100; border-color: #ffcc80; }
    .cancel-section-card { border: 1px solid #ffcc80; background: #fff8f0; margin-bottom: 16px; }
    .cancel-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
    .reschedule-card { border: 1px solid #ffe082; background: #fffde7; }
    .reschedule-icon { vertical-align: middle; margin-right: 6px; font-size: 20px; width: 20px; height: 20px; color: #f57c00; }
    .reschedule-msg { font-size: 0.9rem; color: #555; margin-bottom: 16px; }
    .problem-card { border: 1px solid #ffcdd2; }
    .report-btn { width: 100%; }
    .full-width { width: 100%; margin-top: 8px; }
    .form-actions { display: flex; gap: 8px; margin-top: 4px; }
    .ticket-sent { display: flex; flex-direction: column; gap: 6px; }
    .ticket-icon { font-size: 32px; width: 32px; height: 32px; color: var(--theme-primary); }
    .ticket-desc { color: #555; font-size: 0.9rem; }
    .admin-notes { display: flex; gap: 8px; align-items: flex-start; background: #e3f2fd; border-radius: 6px; padding: 10px; margin-top: 8px; font-size: 0.9rem; color: #1565c0; }
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
export class OrderDetailComponent implements OnInit {
  order: Order | null = null;
  loading = true;
  showForm = false;
  submitting = false;
  ticketSubject = '';
  ticketDescription = '';
  ticket: Ticket | null = null;

  // Reschedule / cancel state
  availableDates: string[] = [];
  availableSlots: PickupAvailability[] = [];
  rescheduleDate: Date | null = null;
  selectedSlotId: number | null = null;
  rescheduling = false;
  cancellingPickup = false;
  showCancelSection = false;
  readonly today = new Date();

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
        if (res.data.pickupCancelled && res.data.pickupLocationId) {
          this.loadAvailableDates(res.data.pickupLocationId);
        }
      },
      error: () => this.loading = false,
    });
  }

  openCancelSection(): void {
    this.showCancelSection = true;
    this.rescheduleDate = null;
    this.availableSlots = [];
    if (this.order?.pickupLocationId && this.availableDates.length === 0) {
      this.loadAvailableDates(this.order.pickupLocationId);
    }
  }

  closeCancelSection(): void {
    this.showCancelSection = false;
    this.rescheduleDate = null;
    this.availableSlots = [];
  }

  cancelOwnPickup(): void {
    if (!this.order) return;
    this.cancellingPickup = true;
    this.orderService.cancelOwnPickup(this.order.orderNumber).subscribe({
      next: (res) => {
        this.order = res.data;
        this.cancellingPickup = false;
        this.showCancelSection = false;
        this.snackBar.open('Recolección cancelada. Puedes reagendar cuando quieras.', 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        this.cancellingPickup = false;
        this.snackBar.open(err.error?.message || 'Error al cancelar', 'Cerrar', { duration: 4000 });
      },
    });
  }

  private loadAvailableDates(locationId: number): void {
    const from = new Date();
    const to = new Date();
    to.setMonth(to.getMonth() + 3);
    const fmt = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.orderService.getPickupAvailableDates(locationId, fmt(from), fmt(to)).subscribe({
      next: (res) => this.availableDates = res.data,
    });
  }

  readonly isAvailableDate = (date: Date | null): boolean => {
    if (!date) return false;
    const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
    return this.availableDates.includes(iso);
  };

  onRescheduleDateChange(date: Date | null): void {
    this.rescheduleDate = date;
    this.selectedSlotId = null;
    this.availableSlots = [];
    if (date && this.order?.pickupLocationId) {
      const iso = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
      this.orderService.getPickupSlotsForDate(this.order.pickupLocationId, iso).subscribe({
        next: (res) => {
          this.availableSlots = res.data;
          if (res.data.length === 1) this.selectedSlotId = res.data[0].id;
        },
      });
    }
  }

  submitReschedule(): void {
    if (!this.rescheduleDate || !this.order) return;
    const d = this.rescheduleDate;
    const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    this.rescheduling = true;
    this.orderService.reschedulePickup(this.order.orderNumber, iso, this.selectedSlotId ?? undefined).subscribe({
      next: (res) => {
        this.order = res.data;
        this.rescheduling = false;
        this.rescheduleDate = null;
        this.availableSlots = [];
        this.showCancelSection = false;
        this.snackBar.open('Recolección reagendada correctamente', 'Cerrar', { duration: 4000 });
      },
      error: (err) => {
        this.rescheduling = false;
        this.snackBar.open(err.error?.message || 'Error al reagendar', 'Cerrar', { duration: 4000 });
      },
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
        this.snackBar.open('Ticket enviado. Lo revisaremos pronto.', 'Cerrar', { duration: 4000 });
      },
      error: (err) => {
        this.submitting = false;
        this.snackBar.open(err.error?.message || 'Error al enviar el ticket', 'Cerrar', { duration: 3000 });
      },
    });
  }
}
