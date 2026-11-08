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
    imports: [FormsModule, RouterLink, MatCardModule, MatButtonModule, MatChipsModule,
        MatDividerModule, MatFormFieldModule, MatInputModule, MatIconModule,
        MatDatepickerModule, MatSelectModule,
        MatSnackBarModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent],
    templateUrl: './order-detail.component.html',
    styleUrl: './order-detail.component.scss'
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
