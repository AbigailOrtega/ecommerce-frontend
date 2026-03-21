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
  standalone: true,
  imports: [
    RouterLink, CurrencyPipe, DatePipe, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatDividerModule, MatTabsModule, MatBadgeModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatSelectModule,
    MatSnackBarModule, LoadingComponent,
  ],
  template: `
    <div class="container">
      <div class="page-header">
        <h1>Agenda de envíos</h1>
        <button mat-icon-button (click)="load()" title="Actualizar">
          <mat-icon>refresh</mat-icon>
        </button>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      @if (loading) {
        <app-loading />
      } @else {
        <mat-tab-group>

          <!-- ── Envíos nacionales ───────────────────────────── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="tab-icon">local_shipping</mat-icon>
              Envíos pendientes
              @if (schedule?.shipments?.length) {
                <span class="tab-badge">{{ schedule!.shipments.length }}</span>
              }
            </ng-template>

            @if (!schedule?.shipments?.length) {
              <div class="empty-state">
                <mat-icon>check_circle</mat-icon>
                <p>No hay envíos nacionales pendientes.</p>
              </div>
            } @else {
              <div class="cards-grid">
                @for (order of schedule!.shipments; track order.id) {
                  <mat-card class="order-card">
                    <mat-card-header>
                      <div class="card-title-row">
                        <span class="order-number">{{ order.orderNumber }}</span>
                        <span class="status-chip" [class]="'status-' + order.status.toLowerCase()">
                          {{ statusLabel(order.status) }}
                        </span>
                      </div>
                    </mat-card-header>

                    <mat-card-content>
                      <div class="info-row">
                        <mat-icon>person</mat-icon>
                        <span>
                          @if (order.user) {
                            {{ order.user.firstName }} {{ order.user.lastName }}
                          } @else {
                            {{ order.guestFirstName }} {{ order.guestLastName }}
                            <em class="guest-tag">invitado</em>
                          }
                        </span>
                      </div>

                      <div class="info-row">
                        <mat-icon>email</mat-icon>
                        <span>{{ order.user?.email ?? order.guestEmail }}</span>
                      </div>

                      @if (order.shippingAddress) {
                        <div class="info-row">
                          <mat-icon>location_on</mat-icon>
                          <span>
                            {{ order.shippingAddress }},
                            {{ order.shippingCity }},
                            {{ order.shippingState }}
                            {{ order.shippingZipCode }}
                          </span>
                        </div>
                      }

                      @if (order.shippingMethodName) {
                        <div class="info-row">
                          <mat-icon>inventory_2</mat-icon>
                          <span>{{ order.shippingMethodName }}</span>
                        </div>
                      }

                      @if (order.trackingNumber) {
                        <div class="info-row tracking">
                          <mat-icon>qr_code</mat-icon>
                          <span>Tracking: <strong>{{ order.trackingNumber }}</strong></span>
                          @if (order.carrierName) {
                            <span class="carrier">{{ order.carrierName }}</span>
                          }
                        </div>
                      }

                      <mat-divider />

                      <div class="items-list">
                        @for (item of order.items; track item.id) {
                          <div class="item-row">
                            <span class="item-name">{{ item.productName }}</span>
                            <span class="item-qty">x{{ item.quantity }}</span>
                            @if (item.selectedSizeName) {
                              <span class="item-size">{{ item.selectedColorName }} / {{ item.selectedSizeName }}</span>
                            }
                          </div>
                        }
                      </div>

                      <div class="card-footer">
                        <span class="total">{{ order.totalAmount | currency:'MXN':'symbol-narrow' }}</span>
                        <span class="date">{{ order.createdAt | date:'dd MMM yyyy' }}</span>
                      </div>
                    </mat-card-content>

                    <mat-card-actions>
                      <a mat-button color="primary" routerLink="/admin/orders">
                        <mat-icon>open_in_new</mat-icon> Ver en pedidos
                      </a>
                    </mat-card-actions>
                  </mat-card>
                }
              </div>
            }
          </mat-tab>

          <!-- ── Pickups ─────────────────────────────────────── -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="tab-icon">store</mat-icon>
              Pickups
              @if (totalPickups) {
                <span class="tab-badge">{{ totalPickups }}</span>
              }
            </ng-template>

            <!-- Filtros -->
            <div class="filter-bar">
              <mat-form-field appearance="outline" class="date-filter-field">
                <mat-label>Filtrar por fecha</mat-label>
                <input matInput [matDatepicker]="filterPicker"
                       [ngModel]="filterDate"
                       (ngModelChange)="filterDate = $event"
                       [ngModelOptions]="{standalone: true}"
                       placeholder="Seleccionar fecha">
                <mat-datepicker-toggle matSuffix [for]="filterPicker"></mat-datepicker-toggle>
                <mat-datepicker #filterPicker></mat-datepicker>
              </mat-form-field>

              @if (uniqueTimeSlots.length > 0) {
                <mat-form-field appearance="outline" class="slot-filter-field">
                  <mat-label>Horario</mat-label>
                  <mat-select [(ngModel)]="filterTimeSlot" [ngModelOptions]="{standalone: true}">
                    <mat-option value="">Todos los horarios</mat-option>
                    @for (slot of uniqueTimeSlots; track slot) {
                      <mat-option [value]="slot">{{ slot }}</mat-option>
                    }
                  </mat-select>
                </mat-form-field>
              }

              @if (filterDate || filterTimeSlot) {
                <button mat-button (click)="clearFilters()">
                  <mat-icon>clear</mat-icon> Limpiar filtros
                </button>
              }
            </div>

            @if (!schedule?.pickups?.length) {
              <div class="empty-state">
                <mat-icon>check_circle</mat-icon>
                <p>No hay pickups pendientes.</p>
              </div>
            } @else if (filteredPickups.length === 0) {
              <div class="empty-state">
                <mat-icon>search_off</mat-icon>
                <p>Sin recolecciones para los filtros seleccionados.</p>
              </div>
            } @else {
              @for (group of filteredPickups; track group.locationName) {
                <div class="location-group">
                  <div class="location-header">
                    <mat-icon>store_mall_directory</mat-icon>
                    <h2>{{ group.locationName }}</h2>
                    <span class="count-badge">{{ group.orders.length }}</span>
                  </div>

                  <div class="cards-grid">
                    @for (order of group.orders; track order.id) {
                      <mat-card class="order-card">
                        <mat-card-header>
                          <div class="card-title-row">
                            <span class="order-number">{{ order.orderNumber }}</span>
                            <span class="status-chip" [class]="'status-' + order.status.toLowerCase()">
                              {{ statusLabel(order.status) }}
                            </span>
                          </div>
                        </mat-card-header>

                        <mat-card-content>
                          <div class="info-row">
                            <mat-icon>person</mat-icon>
                            <span>
                              @if (order.user) {
                                {{ order.user.firstName }} {{ order.user.lastName }}
                              } @else {
                                {{ order.guestFirstName }} {{ order.guestLastName }}
                                <em class="guest-tag">invitado</em>
                              }
                            </span>
                          </div>

                          <div class="info-row">
                            <mat-icon>email</mat-icon>
                            <span>{{ order.user?.email ?? order.guestEmail }}</span>
                          </div>

                          @if (order.pickupDate) {
                            <div class="info-row date-row">
                              <mat-icon>event</mat-icon>
                              <span><strong>{{ order.pickupDate | date:'EEEE dd/MM/yyyy':'UTC' }}</strong></span>
                            </div>
                          }

                          @if (order.pickupTimeSlotLabel) {
                            <div class="info-row slot-row">
                              <mat-icon>schedule</mat-icon>
                              <span><strong>{{ order.pickupTimeSlotLabel }}</strong></span>
                            </div>
                          }

                          <mat-divider />

                          <div class="items-list">
                            @for (item of order.items; track item.id) {
                              <div class="item-row">
                                <span class="item-name">{{ item.productName }}</span>
                                <span class="item-qty">x{{ item.quantity }}</span>
                                @if (item.selectedSizeName) {
                                  <span class="item-size">{{ item.selectedColorName }} / {{ item.selectedSizeName }}</span>
                                }
                              </div>
                            }
                          </div>

                          <div class="card-footer">
                            <span class="total">{{ order.totalAmount | currency:'MXN':'symbol-narrow' }}</span>
                            <span class="date">{{ order.createdAt | date:'dd MMM yyyy' }}</span>
                          </div>
                        </mat-card-content>

                        <mat-card-actions>
                          <a mat-button color="primary" routerLink="/admin/orders">
                            <mat-icon>open_in_new</mat-icon> Ver en pedidos
                          </a>
                          @if (!order.pickupCancelled && order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && order.status !== 'REFUNDED') {
                            <button mat-button color="warn"
                                    (click)="cancelPickup(order)"
                                    [disabled]="cancellingPickupSet.has(order.id)">
                              <mat-icon>event_busy</mat-icon>
                              {{ cancellingPickupSet.has(order.id) ? 'Cancelando...' : 'Cancelar recolección' }}
                            </button>
                          }
                        </mat-card-actions>
                      </mat-card>
                    }
                  </div>
                </div>
              }
            }
          </mat-tab>

        </mat-tab-group>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 1200px; margin: 0 auto; padding: 24px 16px; }

    .page-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 24px;
    }
    .page-header h1 { margin: 0; flex: 1; font-size: 1.6rem; font-weight: 700; }

    /* Tab label extras */
    .tab-icon { font-size: 18px; width: 18px; height: 18px; margin-right: 6px; vertical-align: middle; }
    .tab-badge {
      display: inline-flex; align-items: center; justify-content: center;
      background: #f44336; color: white;
      border-radius: 10px; font-size: 11px; font-weight: 700;
      min-width: 18px; height: 18px; padding: 0 5px; margin-left: 6px;
    }

    /* Empty state */
    .empty-state {
      text-align: center; padding: 60px 16px; color: #aaa;
    }
    .empty-state mat-icon { font-size: 56px; width: 56px; height: 56px; color: #4caf50; margin-bottom: 12px; }
    .empty-state p { font-size: 1.05rem; margin: 0; }

    /* Location group */
    .location-group { margin-bottom: 32px; }
    .location-header {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 0 8px;
    }
    .location-header mat-icon { color: #1565c0; font-size: 28px; width: 28px; height: 28px; }
    .location-header h2 { margin: 0; font-size: 1.2rem; font-weight: 600; flex: 1; }
    .count-badge {
      background: #1565c0; color: white; border-radius: 12px;
      font-size: 12px; font-weight: 700; padding: 2px 10px;
    }

    /* Cards grid */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 16px 0;
    }

    .order-card { border-radius: 10px; }

    .card-title-row {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; gap: 8px;
    }
    .order-number { font-size: 0.9rem; font-weight: 700; color: #212121; }

    /* Status chips */
    .status-chip {
      font-size: 11px; font-weight: 600; padding: 2px 10px;
      border-radius: 10px; text-transform: uppercase; letter-spacing: 0.4px;
    }
    .status-confirmed  { background: #e3f2fd; color: #1565c0; }
    .status-processing { background: #fff3e0; color: #e65100; }
    .status-shipped    { background: #e8f5e9; color: #2e7d32; }

    /* Info rows */
    .info-row {
      display: flex; align-items: flex-start; gap: 8px;
      font-size: 0.88rem; color: #555; margin: 8px 0;
    }
    .info-row mat-icon { font-size: 18px; width: 18px; height: 18px; flex-shrink: 0; color: #90a4ae; }
    .date-row mat-icon { color: #1565c0; }
    .date-row span { color: #212121; text-transform: capitalize; }
    .slot-row mat-icon { color: #f57c00; }
    .slot-row span { color: #212121; }

    .guest-tag {
      display: inline-block; margin-left: 6px;
      font-size: 10px; background: #fce4ec; color: #c62828;
      border-radius: 6px; padding: 1px 6px;
    }

    .tracking { align-items: center; }
    .carrier {
      background: #ede7f6; color: #4527a0;
      font-size: 10px; font-weight: 600;
      border-radius: 6px; padding: 2px 7px; margin-left: 4px;
    }

    mat-divider { margin: 10px 0; }

    /* Items */
    .items-list { margin: 8px 0; }
    .item-row {
      display: flex; gap: 8px; align-items: baseline;
      font-size: 0.85rem; padding: 2px 0;
    }
    .item-name { flex: 1; color: #333; }
    .item-qty { font-weight: 600; color: #212121; }
    .item-size { font-size: 0.78rem; color: #999; }

    /* Footer */
    .card-footer {
      display: flex; justify-content: space-between; align-items: center;
      margin-top: 10px; padding-top: 6px;
    }
    .total { font-size: 1rem; font-weight: 700; color: #212121; }
    .date { font-size: 0.8rem; color: #999; }

    /* Filter bar */
    .filter-bar {
      display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
      padding: 16px 0 8px;
    }
    .date-filter-field { min-width: 200px; }
    .slot-filter-field { min-width: 180px; }

    @media (max-width: 600px) {
      .cards-grid { grid-template-columns: 1fr; }
      .filter-bar { flex-direction: column; align-items: stretch; }
      .date-filter-field, .slot-filter-field { width: 100%; }
    }
  `],
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
