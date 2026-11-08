import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { AdminService } from '@core/services/admin.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { Order, PickupGroup, UpcomingSchedule } from '@shared/models';

@Component({
    selector: 'app-shipment-schedule',
    imports: [
        RouterLink, CurrencyPipe, DatePipe, FormsModule,
        MatCardModule, MatButtonModule, MatIconModule,
        MatChipsModule, MatDividerModule, MatTabsModule, MatBadgeModule,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
        MatSnackBarModule, LoadingComponent,
    ],
    templateUrl: './shipment-schedule.component.html',
    styleUrl: './shipment-schedule.component.scss'
})
export class ShipmentScheduleComponent implements OnInit {
  schedule: UpcomingSchedule | null = null;
  loading = true;

  filterDate: Date | null = null;
  filterTimeSlot = '';

  get totalPickups(): number {
    return this.schedule?.pickups.reduce((sum, g) => sum + g.orders.length, 0) ?? 0;
  }

  get uniqueTimeSlots(): string[] {
    const slots = new Set<string>();
    this.schedule?.pickups.forEach(g =>
      g.orders.forEach(o => { if (o.pickupTimeSlotLabel) slots.add(o.pickupTimeSlotLabel); })
    );
    return [...slots].sort();
  }

  get filteredPickups(): PickupGroup[] {
    if (!this.schedule?.pickups) return [];
    const dateStr = this.filterDate ? this.toDateStr(this.filterDate) : null;
    if (!dateStr && !this.filterTimeSlot) return this.schedule.pickups;

    return this.schedule.pickups
      .map(g => ({
        ...g,
        orders: g.orders.filter(o => {
          const dateMatch = !dateStr || o.pickupDate === dateStr;
          const slotMatch = !this.filterTimeSlot || o.pickupTimeSlotLabel === this.filterTimeSlot;
          return dateMatch && slotMatch;
        }),
      }))
      .filter(g => g.orders.length > 0);
  }

  clearFilters(): void {
    this.filterDate = null;
    this.filterTimeSlot = '';
  }

  private toDateStr(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  cancellingPickupSet = new Set<number>();

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.adminService.getUpcomingSchedule().subscribe({
      next: (res) => { this.schedule = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }

  cancelPickup(order: Order): void {
    const reason = prompt('Motivo de cancelación (opcional):') ?? undefined;
    this.cancellingPickupSet.add(order.id);
    this.adminService.cancelPickup(order.id, reason || undefined).subscribe({
      next: (res) => {
        this.cancellingPickupSet.delete(order.id);
        // Update the order in the loaded schedule
        if (this.schedule) {
          this.schedule = {
            ...this.schedule,
            pickups: this.schedule.pickups.map(g => ({
              ...g,
              orders: g.orders.map(o => o.id === order.id ? res.data : o),
            })),
          };
        }
        this.snackBar.open('Recolección cancelada — el cliente podrá reagendar', 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        this.cancellingPickupSet.delete(order.id);
        this.snackBar.open(err.error?.message || 'Error al cancelar recolección', 'Cerrar', { duration: 4000 });
      },
    });
  }

  statusLabel(status?: string): string {
    const map: Record<string, string> = {
      CONFIRMED: 'Confirmado',
      PROCESSING: 'Procesando',
      SHIPPED: 'Enviado',
    };
    return status ? (map[status] ?? status) : '';
  }
}
