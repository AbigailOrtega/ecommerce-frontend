import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { OrderService } from '@core/services/order.service';
import { ApiResponse, Order, PickupAvailability } from '@shared/models';

/** How the buyer is allowed to change the pickup: their account, or the emailed link's token. */
export interface PickupActions {
  reschedule(pickupDate: string, pickupAvailabilityId?: number): Observable<ApiResponse<Order>>;
  cancel(): Observable<ApiResponse<Order>>;
}

const FINAL_STATUSES = ['CANCELLED', 'DELIVERED', 'REFUNDED'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

/**
 * "Reprogramar recolección" / "Cancelar recolección" for a pickup order, on the order page of an
 * account and on the page of the emailed link. A cancelled pickup goes straight to choosing a date.
 */
@Component({
  selector: 'app-pickup-manage',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDatepickerModule,
    MatSelectModule, MatSnackBarModule, DatePipe],
  template: `
    @if (canChange) {
      <section class="pickup-manage" data-testid="pickup-manage">
        @if (order.pickupCancelled) {
          <p class="notice"><mat-icon>event_busy</mat-icon>
            Tu recolección del <strong>{{ order.pickupDate | date:'dd/MM/yyyy':'UTC' }}</strong> está cancelada.
            Elige una nueva fecha cuando quieras; tu pedido sigue pagado.</p>
        }
        @if (!order.pickupCancelled && !choosing) {
          <div class="actions">
            <button mat-flat-button color="primary" (click)="startReschedule()" data-testid="pickup-reschedule">
              <mat-icon>event_repeat</mat-icon> Reprogramar recolección
            </button>
            <button mat-stroked-button color="warn" (click)="cancelPickup()" [disabled]="busy" data-testid="pickup-cancel">
              <mat-icon>event_busy</mat-icon> {{ busy ? 'Cancelando…' : 'Cancelar recolección' }}
            </button>
          </div>
        }
        @if (choosing || order.pickupCancelled) {
          <div class="choose">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nueva fecha de recolección</mat-label>
              <input matInput [matDatepicker]="picker" [ngModel]="newDate" (ngModelChange)="onDate($event)"
                     [min]="today" [matDatepickerFilter]="isAvailable" readonly (click)="picker.open()"
                     placeholder="Elige un día disponible" data-testid="pickup-date">
              <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
              @if (loadingDates) { <mat-hint>Cargando días disponibles…</mat-hint> }
              @else if (availableDates.length === 0) { <mat-hint>No hay días disponibles por ahora; escríbenos para coordinar.</mat-hint> }
            </mat-form-field>
            @if (slots.length > 1) {
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Horario</mat-label>
                <mat-select [(ngModel)]="slotId" data-testid="pickup-slot">
                  @for (slot of slots; track slot.id) {
                    <mat-option [value]="slot.id">{{ slot.startTime }} – {{ slot.endTime }}</mat-option>
                  }
                </mat-select>
              </mat-form-field>
            }
            <div class="actions">
              <button mat-flat-button color="primary" [disabled]="!newDate || (slots.length > 1 && !slotId) || busy"
                      (click)="confirmReschedule()" data-testid="pickup-confirm">
                {{ busy ? 'Guardando…' : 'Confirmar nueva fecha' }}
              </button>
              @if (!order.pickupCancelled) {
                <button mat-button (click)="choosing = false">Volver</button>
              }
            </div>
          </div>
        }
      </section>
    }
  `,
  styles: [`
    .pickup-manage { margin: 16px 0; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; }
    .actions mat-icon { margin-right: 4px; }
    .notice { display: flex; gap: 8px; align-items: flex-start; background: #fff3e0; color: #6d3d00; padding: 12px 14px; border-radius: 8px; margin: 0 0 12px; }
    .choose { margin-top: 12px; max-width: 420px; }
    .full-width { width: 100%; }
  `],
})
export class PickupManageComponent implements OnChanges {
  @Input({ required: true }) order!: Order;
  @Input({ required: true }) actions!: PickupActions;
  @Output() orderChange = new EventEmitter<Order>();

  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  readonly today = new Date();
  choosing = false;
  busy = false;
  loadingDates = false;
  availableDates: string[] = [];
  slots: PickupAvailability[] = [];
  newDate: Date | null = null;
  slotId: number | null = null;

  get canChange(): boolean {
    return this.order?.shippingType === 'PICKUP' && !FINAL_STATUSES.includes(this.order.status) && !!this.order.pickupLocationId;
  }

  ngOnChanges(): void {
    if (this.canChange && this.order.pickupCancelled) this.loadDates();
  }

  readonly isAvailable = (d: Date | null): boolean => !!d && this.availableDates.includes(iso(d));

  startReschedule(): void {
    this.choosing = true;
    this.loadDates();
  }

  onDate(d: Date | null): void {
    this.newDate = d;
    this.slotId = null;
    this.slots = [];
    if (!d) return;
    this.orderService.getPickupSlotsForDate(this.order.pickupLocationId!, iso(d)).subscribe({
      next: res => { this.slots = res.data; if (res.data.length === 1) this.slotId = res.data[0].id; },
    });
  }

  confirmReschedule(): void {
    if (!this.newDate) return;
    this.busy = true;
    this.actions.reschedule(iso(this.newDate), this.slotId ?? undefined).subscribe({
      next: res => {
        this.done(res.data, 'Listo: tu recolección quedó reprogramada. Te enviamos la confirmación por correo.');
        this.choosing = false;
        this.newDate = null;
        this.slots = [];
      },
      error: err => this.failed(err, 'No se pudo reprogramar'),
    });
  }

  cancelPickup(): void {
    if (!confirm('¿Cancelar tu cita de recolección? Tu pedido sigue pagado y podrás elegir otra fecha cuando quieras.')) return;
    this.busy = true;
    this.actions.cancel().subscribe({
      next: res => { this.done(res.data, 'Recolección cancelada. Elige una nueva fecha cuando quieras.'); this.loadDates(); },
      error: err => this.failed(err, 'No se pudo cancelar'),
    });
  }

  private loadDates(): void {
    if (this.availableDates.length || this.loadingDates || !this.order.pickupLocationId) return;
    const to = new Date();
    to.setMonth(to.getMonth() + 3);
    this.loadingDates = true;
    this.orderService.getPickupAvailableDates(this.order.pickupLocationId, iso(new Date()), iso(to)).subscribe({
      next: res => { this.availableDates = res.data; this.loadingDates = false; },
      error: () => this.loadingDates = false,
    });
  }

  private done(order: Order, message: string): void {
    this.busy = false;
    this.order = order;
    this.orderChange.emit(order);
    this.snackBar.open(message, 'Cerrar', { duration: 5000 });
  }

  private failed(err: any, fallback: string): void {
    this.busy = false;
    this.snackBar.open(err?.error?.message || fallback, 'Cerrar', { duration: 5000 });
  }
}
