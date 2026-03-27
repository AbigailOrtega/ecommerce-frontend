import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { AvailabilityType, DayOfWeek, PickupAvailability, PickupAvailabilityRequest, PickupException, PickupExceptionRequest, PickupLocation, PickupLocationRequest, ShippingConfig } from '@shared/models';

@Component({
  selector: 'app-shipping-management',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule,
    MatSlideToggleModule, MatDividerModule, MatTooltipModule, MatSelectModule,
    MatDatepickerModule, MatButtonToggleModule, CurrencyPipe],
  template: `
    <div class="container">
      <div class="header">
        <h1>Configuración de Entregas</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <!-- ── Configuración ── -->
      <mat-card class="config-card">
        <h2>Configuración de Envío por paquetería</h2>
        @if (configLoading) {
          <p class="hint">Cargando configuración...</p>
        } @else if (configForm) {
          <form [formGroup]="configForm" (ngSubmit)="saveConfig()">

            <!-- ── 1. Paquetería ── -->
            <div class="section-header-row">
              <h3 class="sub-title">Envío por paquetería</h3>
              <mat-slide-toggle formControlName="nationalEnabled" color="primary">Habilitado</mat-slide-toggle>
            </div>

            @if (configForm.get('nationalEnabled')?.value) {
              <p class="sub-label">Dirección de origen para guías</p>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Calle y número</mat-label>
                <input matInput formControlName="skydropxOriginStreet" placeholder="Ej. Reforma 222 Int. 5">
              </mat-form-field>
              <div class="row">
                <mat-form-field appearance="outline">
                  <mat-label>Código Postal</mat-label>
                  <input matInput formControlName="skydropxOriginPostalCode">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Ciudad</mat-label>
                  <input matInput formControlName="skydropxOriginCity">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Estado</mat-label>
                  <input matInput formControlName="skydropxOriginState">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>País (ISO)</mat-label>
                  <input matInput formControlName="skydropxOriginCountry" placeholder="MX">
                </mat-form-field>
              </div>

              <p class="sub-label">Datos del remitente</p>
              <div class="row">
                <mat-form-field appearance="outline">
                  <mat-label>Nombre</mat-label>
                  <input matInput formControlName="skydropxSenderName">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Email</mat-label>
                  <input matInput formControlName="skydropxSenderEmail">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Teléfono</mat-label>
                  <input matInput formControlName="skydropxSenderPhone">
                </mat-form-field>
              </div>

              <p class="sub-label">Dimensiones de paquete por defecto</p>
              <div class="row">
                <mat-form-field appearance="outline">
                  <mat-label>Peso (kg)</mat-label>
                  <input matInput type="number" min="0.1" step="0.1" formControlName="skydropxDefaultWeight">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Largo (cm)</mat-label>
                  <input matInput type="number" min="1" formControlName="skydropxDefaultLength">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Ancho (cm)</mat-label>
                  <input matInput type="number" min="1" formControlName="skydropxDefaultWidth">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Alto (cm)</mat-label>
                  <input matInput type="number" min="1" formControlName="skydropxDefaultHeight">
                </mat-form-field>
              </div>
            }

            <!-- ── 2. Envío gratis por monto mínimo ── -->
            <mat-divider style="margin: 24px 0 16px;"></mat-divider>
            <div class="section-header-row">
              <h3 class="sub-title">Envío gratis por monto mínimo</h3>
              <mat-slide-toggle formControlName="freeShippingEnabled" color="primary">Habilitado</mat-slide-toggle>
            </div>
            @if (configForm.get('freeShippingEnabled')?.value) {
              <mat-form-field appearance="outline">
                <mat-label>Monto mínimo para envío gratis ($)</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="freeShippingMinAmount">
                <mat-hint>El cliente obtiene envío gratis al superar este monto en su compra</mat-hint>
              </mat-form-field>
            }

            <!-- ── 3. Pick Up ── -->
            <mat-divider style="margin: 24px 0 16px;"></mat-divider>
            <div class="section-header-row">
              <h3 class="sub-title">Pick Up</h3>
              <mat-slide-toggle formControlName="pickupEnabled" color="primary">Habilitado</mat-slide-toggle>
            </div>

            @if (configForm.get('pickupEnabled')?.value) {
              <mat-form-field appearance="outline">
                <mat-label>Costo de Pick Up ($)</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="pickupCost">
              </mat-form-field>
            }

          </form>

          <!-- ── Puntos de Pick Up (misma card) ── -->
          @if (configForm.get('pickupEnabled')?.value) {
            <mat-divider style="margin: 24px 0 16px;"></mat-divider>
            <div class="locations-header">
              <h3 class="sub-title" style="margin:0;">Puntos de Pick Up</h3>
              <button mat-raised-button color="primary" (click)="openLocationForm()">
                <mat-icon>add</mat-icon> Agregar Punto
              </button>
            </div>

          @if (showLocationForm) {
            <mat-card class="inline-form">
              <h3>{{ editingLocation ? 'Editar' : 'Nuevo' }} Punto de Pick Up</h3>
              <form [formGroup]="locationForm" (ngSubmit)="saveLocation()">
                <div class="row">
                  <mat-form-field appearance="outline">
                    <mat-label>Nombre</mat-label>
                    <input matInput formControlName="name" placeholder="Ej. Sucursal Centro">
                  </mat-form-field>
                  <mat-form-field appearance="outline">
                    <mat-label>Ciudad</mat-label>
                    <input matInput formControlName="city">
                  </mat-form-field>
                </div>
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Dirección</mat-label>
                  <input matInput formControlName="address">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Estado</mat-label>
                  <input matInput formControlName="state">
                </mat-form-field>
                <div class="form-actions">
                  <button mat-button type="button" (click)="cancelLocationForm()">Cancelar</button>
                  <button mat-raised-button color="primary" type="submit" [disabled]="locationForm.invalid || savingLocation">
                    {{ savingLocation ? 'Guardando...' : 'Guardar' }}
                  </button>
                </div>
              </form>
            </mat-card>
          }

          @if (locationsLoading) {
            <p class="hint">Cargando puntos...</p>
          } @else if (locations.length === 0) {
            <p class="empty">No hay puntos de retiro aún.</p>
          } @else {
            @for (loc of locations; track loc.id) {
              <mat-card class="location-item" [class.inactive]="!loc.active">
                <div class="location-header">
                  <div class="location-info">
                    <strong>{{ loc.name }}</strong>
                    <span class="location-meta">{{ loc.address }} · {{ loc.city }}, {{ loc.state }}</span>
                    <span class="slot-count">{{ (loc.availabilities || []).length }} regla(s) de disponibilidad</span>
                  </div>
                  <div class="location-actions">
                    <mat-slide-toggle [checked]="loc.active" (change)="toggleLocation(loc)" color="primary"
                                      [matTooltip]="loc.active ? 'Desactivar' : 'Activar'"></mat-slide-toggle>
                    <button mat-icon-button color="primary" (click)="openLocationForm(loc)" matTooltip="Editar">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="deleteLocation(loc)" matTooltip="Eliminar">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>

                <!-- ── Disponibilidad ── -->
                <mat-divider style="margin: 12px 0;"></mat-divider>
                <div class="avail-section">
                  <div class="avail-header">
                    <strong class="avail-title">Disponibilidad (calendario)</strong>
                    <button mat-stroked-button color="primary" (click)="startAddAvailability(loc)"
                            [disabled]="addingAvailForLocationId === loc.id">
                      <mat-icon>add</mat-icon> Agregar regla
                    </button>
                  </div>

                  <!-- List existing rules with inline exceptions -->
                  @for (rule of (loc.availabilities || []); track rule.id) {
                    <div class="avail-item" [class.avail-inactive]="!rule.active">
                      <mat-icon class="avail-icon">{{ rule.type === 'RECURRING' ? 'repeat' : 'event' }}</mat-icon>
                      <span class="avail-label">{{ availabilityLabel(rule) }}</span>
                      <div class="avail-actions">
                        <mat-slide-toggle [checked]="rule.active"
                                          (change)="toggleAvailability(loc, rule)"
                                          color="primary"
                                          [matTooltip]="rule.active ? 'Desactivar' : 'Activar'">
                        </mat-slide-toggle>
                        <button mat-icon-button color="warn" (click)="deleteAvailability(loc, rule)" matTooltip="Eliminar">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>
                    </div>

                    <!-- Excepciones inline under each rule -->
                    <div class="exc-section">
                      <div class="exc-header">
                        <span class="exc-title">Excepciones</span>
                        <button mat-button color="warn" style="font-size:0.78rem;"
                                (click)="startAddException(rule.id)"
                                [disabled]="addingExceptionForRuleId === rule.id">
                          <mat-icon style="font-size:16px;height:16px;width:16px;">block</mat-icon> Bloquear fecha
                        </button>
                      </div>

                      @for (exc of (rule.exceptions || []); track exc.id) {
                        <div class="exc-item">
                          <mat-icon class="exc-icon">event_busy</mat-icon>
                          <span class="exc-label">{{ exceptionDateLabel(exc.date) }}{{ exc.reason ? ' — ' + exc.reason : '' }}</span>
                          <button mat-icon-button color="warn" (click)="removeException(loc.id, rule.id, exc.id)" matTooltip="Eliminar excepción">
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      }

                      @if ((rule.exceptions || []).length === 0 && addingExceptionForRuleId !== rule.id) {
                        <p class="exc-empty">Sin excepciones.</p>
                      }

                      @if (addingExceptionForRuleId === rule.id) {
                        <div class="add-exc-form">
                          <mat-form-field appearance="outline" class="exc-date-field">
                            <mat-label>Fecha a bloquear</mat-label>
                            <input matInput [matDatepicker]="excPicker"
                                   [min]="today"
                                   [ngModel]="newExcDate"
                                   (ngModelChange)="newExcDate = $event"
                                   [ngModelOptions]="{standalone: true}">
                            <mat-datepicker-toggle matSuffix [for]="excPicker"></mat-datepicker-toggle>
                            <mat-datepicker #excPicker></mat-datepicker>
                          </mat-form-field>
                          <mat-form-field appearance="outline" class="exc-reason-field">
                            <mat-label>Motivo (opcional)</mat-label>
                            <input matInput [(ngModel)]="newExcReason" [ngModelOptions]="{standalone: true}" placeholder="Ej. Día festivo">
                          </mat-form-field>
                          <div class="avail-form-actions">
                            <button mat-raised-button color="warn"
                                    (click)="saveException(loc.id, rule.id)"
                                    [disabled]="!newExcDate">
                              Guardar
                            </button>
                            <button mat-button (click)="cancelAddException()">Cancelar</button>
                          </div>
                        </div>
                      }
                    </div>
                  }

                  <!-- Add availability form (inline) -->
                  @if (addingAvailForLocationId === loc.id) {
                    <div class="add-avail-form">
                      <mat-button-toggle-group [(ngModel)]="newAvail.type" [ngModelOptions]="{standalone: true}"
                                               class="type-toggle">
                        <mat-button-toggle value="RECURRING">↻ Recurrente</mat-button-toggle>
                        <mat-button-toggle value="SPECIFIC_DATE">📅 Fecha específica</mat-button-toggle>
                      </mat-button-toggle-group>

                      @if (newAvail.type === 'RECURRING') {
                        <mat-form-field appearance="outline" class="avail-field">
                          <mat-label>Día de la semana</mat-label>
                          <mat-select [(ngModel)]="newAvail.dayOfWeek" [ngModelOptions]="{standalone: true}">
                            <mat-option value="MONDAY">Lunes</mat-option>
                            <mat-option value="TUESDAY">Martes</mat-option>
                            <mat-option value="WEDNESDAY">Miércoles</mat-option>
                            <mat-option value="THURSDAY">Jueves</mat-option>
                            <mat-option value="FRIDAY">Viernes</mat-option>
                            <mat-option value="SATURDAY">Sábado</mat-option>
                            <mat-option value="SUNDAY">Domingo</mat-option>
                          </mat-select>
                        </mat-form-field>
                      } @else {
                        <mat-form-field appearance="outline" class="avail-field">
                          <mat-label>Fecha específica</mat-label>
                          <input matInput [matDatepicker]="availPicker"
                                 [ngModel]="newAvailSpecificDate"
                                 (ngModelChange)="onAvailDateChange($event)"
                                 [ngModelOptions]="{standalone: true}">
                          <mat-datepicker-toggle matSuffix [for]="availPicker"></mat-datepicker-toggle>
                          <mat-datepicker #availPicker></mat-datepicker>
                        </mat-form-field>
                      }

                      <div class="avail-time-row">
                        <mat-form-field appearance="outline" class="avail-time-field">
                          <mat-label>Hora inicio</mat-label>
                          <input matInput type="time" [(ngModel)]="newAvail.startTime" [ngModelOptions]="{standalone: true}">
                        </mat-form-field>
                        <mat-form-field appearance="outline" class="avail-time-field">
                          <mat-label>Hora fin</mat-label>
                          <input matInput type="time" [(ngModel)]="newAvail.endTime" [ngModelOptions]="{standalone: true}">
                        </mat-form-field>
                        <mat-form-field appearance="outline" class="avail-cap-field">
                          <mat-label>Cap. máx.</mat-label>
                          <input matInput type="number" min="1" [(ngModel)]="newAvail.maxCapacity" [ngModelOptions]="{standalone: true}">
                        </mat-form-field>
                      </div>

                      <div class="avail-form-actions">
                        <button mat-raised-button color="primary"
                                (click)="saveAvailability(loc)"
                                [disabled]="!isNewAvailValid()">
                          Agregar
                        </button>
                        <button mat-button (click)="cancelAddAvailability()">Cancelar</button>
                      </div>
                    </div>
                  }
                </div>
              </mat-card>
            }
          }
          }

          <mat-divider style="margin: 24px 0 16px;"></mat-divider>
          <div class="form-actions">
            <button mat-raised-button color="primary" (click)="saveConfig()" [disabled]="savingConfig">
              {{ savingConfig ? 'Guardando...' : 'Guardar configuración' }}
            </button>
          </div>
        }
      </mat-card>
    </div>
  `,
  styles: [`
    .container { }
    .header { display: flex; justify-content: space-between; align-items: center; }
    .config-card { padding: 24px; margin-bottom: 24px; }
    .full-width { width: 100%; }
    .row { display: flex; gap: 16px; flex-wrap: wrap; }
    .row mat-form-field { flex: 1; min-width: 180px; }
    .toggle-row { display: flex; gap: 32px; flex-wrap: wrap; margin-bottom: 8px; }
    .sub-title { font-size: 0.95rem; font-weight: 600; color: #444; margin: 8px 0 12px; }
    .api-key-row { display: flex; align-items: flex-start; gap: 12px; }
    .api-key-row mat-form-field { flex: 1; }
    .api-badge { display: flex; align-items: center; gap: 4px; font-size: 0.8rem; font-weight: 600; padding: 6px 10px; border-radius: 16px; background: #ffebee; color: #c62828; white-space: nowrap; margin-top: 10px; }
    .api-badge.configured { background: #e8f5e9; color: #2e7d32; }
    .api-badge mat-icon { font-size: 16px; width: 16px; height: 16px; }
    .form-actions { display: flex; gap: 12px; margin-top: 12px; }
    .hint { color: #888; font-size: 0.9rem; margin: 8px 0 16px; }
    .empty { color: #666; margin-top: 16px; }
    .locations-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .inline-form { padding: 16px; margin-bottom: 16px; border: 1px solid #e3f2fd; }
    .location-item { padding: 16px; margin-bottom: 12px; border-left: 4px solid var(--theme-primary); }
    .location-item.inactive { border-left-color: #bbb; opacity: 0.75; }
    .location-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .location-info { display: flex; flex-direction: column; gap: 2px; }
    .location-info strong { font-size: 1rem; }
    .location-meta { font-size: 0.85rem; color: #666; }
    .slot-count { font-size: 0.8rem; color: var(--theme-primary); }
    .location-actions { display: flex; align-items: center; gap: 4px; }
    .slots-section { margin-top: 12px; }
    .slots-list { display: flex; flex-direction: column; gap: 4px; margin-bottom: 8px; }
    .slot-item { display: flex; justify-content: space-between; align-items: center; padding: 6px 8px; border-radius: 6px; background: #f8f8f8; font-size: 0.9rem; }
    .slot-item.slot-inactive { opacity: 0.6; }
    .slot-actions { display: flex; align-items: center; gap: 2px; }
    .add-slot-row { display: flex; align-items: center; gap: 8px; }
    .slot-input { flex: 1; }
    .add-slot-btn { font-size: 0.85rem; }
    .section-header-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .section-header-row .sub-title { margin: 0; }
    .sub-label { font-size: 0.82rem; font-weight: 600; color: #555; margin: 12px 0 4px; text-transform: uppercase; letter-spacing: 0.04em; }
    /* Availability */
    .avail-section { margin-top: 8px; }
    .avail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .avail-title { font-size: 0.875rem; color: #555; }
    .avail-item { display: flex; align-items: center; gap: 8px; padding: 6px 8px; border-radius: 6px; background: #f1f8e9; margin-bottom: 4px; font-size: 0.875rem; }
    .avail-item.avail-inactive { opacity: 0.55; background: #f5f5f5; }
    .avail-icon { font-size: 18px; width: 18px; height: 18px; color: #558b2f; flex-shrink: 0; }
    .avail-label { flex: 1; }
    .avail-actions { display: flex; align-items: center; gap: 4px; }
    .add-avail-form { margin-top: 10px; padding: 12px; background: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0; }
    .type-toggle { margin-bottom: 12px; }
    .avail-field { min-width: 200px; }
    .avail-time-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-start; }
    .avail-time-field { min-width: 130px; }
    .avail-cap-field { min-width: 110px; }
    .avail-form-actions { display: flex; gap: 8px; margin-top: 8px; }
    /* Exceptions */
    .exc-section { margin-top: 6px; padding-left: 4px; }
    .exc-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
    .exc-title { font-size: 0.8rem; color: #888; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 60%; }
    .exc-item { display: flex; align-items: center; gap: 8px; padding: 4px 8px; border-radius: 6px; background: #fce4ec; margin-bottom: 4px; font-size: 0.85rem; }
    .exc-icon { font-size: 16px; width: 16px; height: 16px; color: #c62828; flex-shrink: 0; }
    .exc-label { flex: 1; color: #555; }
    .exc-empty { font-size: 0.8rem; color: #bbb; margin: 4px 0 6px; }
    .add-exc-form { margin-top: 8px; padding: 12px; background: #fff3f3; border-radius: 8px; border: 1px solid #ffcdd2; display: flex; flex-wrap: wrap; gap: 12px; align-items: flex-start; }
    .exc-date-field { min-width: 180px; }
    .exc-reason-field { flex: 1; min-width: 180px; }
  `],
})
export class ShippingManagementComponent implements OnInit {
  configForm: FormGroup | null = null;
  config: ShippingConfig | null = null;
  configLoading = true;
  savingConfig = false;

  locations: PickupLocation[] = [];
  locationsLoading = true;
  locationForm: FormGroup;
  showLocationForm = false;
  editingLocation: PickupLocation | null = null;
  savingLocation = false;

  // Availability state
  addingAvailForLocationId: number | null = null;
  newAvail: PickupAvailabilityRequest = this.defaultAvail();
  newAvailSpecificDate: Date | null = null;

  // Exception state
  addingExceptionForRuleId: number | null = null;
  newExcDate: Date | null = null;
  newExcReason = '';
  readonly today = new Date();

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private snackBar: MatSnackBar,
  ) {
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadConfig();
    this.loadLocations();
  }

  loadConfig(): void {
    this.configLoading = true;
    this.adminService.getShippingConfig().subscribe({
      next: (res) => {
        this.config = res.data;
        this.configForm = this.fb.group({
          nationalEnabled: [res.data.nationalEnabled],
          pickupEnabled: [res.data.pickupEnabled],
          pickupCost: [res.data.pickupCost, [Validators.min(0)]],
          skydropxOriginStreet: [res.data.skydropxOriginStreet ?? ''],
          skydropxOriginPostalCode: [res.data.skydropxOriginPostalCode ?? ''],
          skydropxOriginCity: [res.data.skydropxOriginCity ?? ''],
          skydropxOriginState: [res.data.skydropxOriginState ?? ''],
          skydropxOriginCountry: [res.data.skydropxOriginCountry ?? 'MX'],
          skydropxSenderName: [res.data.skydropxSenderName ?? ''],
          skydropxSenderEmail: [res.data.skydropxSenderEmail ?? ''],
          skydropxSenderPhone: [res.data.skydropxSenderPhone ?? ''],
          skydropxDefaultWeight: [res.data.skydropxDefaultWeight ?? 1],
          skydropxDefaultLength: [res.data.skydropxDefaultLength ?? 20],
          skydropxDefaultWidth: [res.data.skydropxDefaultWidth ?? 20],
          skydropxDefaultHeight: [res.data.skydropxDefaultHeight ?? 10],
          freeShippingEnabled: [res.data.freeShippingEnabled ?? false],
          freeShippingMinAmount: [res.data.freeShippingMinAmount ?? null, [Validators.min(0)]],
        });
        this.configLoading = false;
      },
      error: () => this.configLoading = false,
    });
  }

  saveConfig(): void {
    if (!this.configForm) return;
    this.savingConfig = true;
    const val = this.configForm.value;
    const req: Partial<ShippingConfig> = {
      nationalEnabled: val.nationalEnabled,
      pickupEnabled: val.pickupEnabled,
      pickupCost: val.pickupCost,
      skydropxOriginStreet: val.skydropxOriginStreet,
      skydropxOriginPostalCode: val.skydropxOriginPostalCode,
      skydropxOriginCity: val.skydropxOriginCity,
      skydropxOriginState: val.skydropxOriginState,
      skydropxOriginCountry: val.skydropxOriginCountry,
      skydropxSenderName: val.skydropxSenderName,
      skydropxSenderEmail: val.skydropxSenderEmail,
      skydropxSenderPhone: val.skydropxSenderPhone,
      skydropxDefaultWeight: val.skydropxDefaultWeight,
      skydropxDefaultLength: val.skydropxDefaultLength,
      skydropxDefaultWidth: val.skydropxDefaultWidth,
      skydropxDefaultHeight: val.skydropxDefaultHeight,
      freeShippingEnabled: val.freeShippingEnabled,
      freeShippingMinAmount: val.freeShippingMinAmount,
    };
    this.adminService.updateShippingConfig(req).subscribe({
      next: (res) => {
        this.config = res.data;
        this.savingConfig = false;
        this.snackBar.open('Configuración guardada', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.savingConfig = false;
        this.snackBar.open(err.error?.message || 'Error al guardar', 'Cerrar', { duration: 4000 });
      },
    });
  }

  loadLocations(): void {
    this.locationsLoading = true;
    this.adminService.getPickupLocations().subscribe({
      next: (res) => {
        this.locations = res.data;
        // Load availabilities for each location
        this.locations.forEach(loc => this.loadAvailabilities(loc));
        this.locationsLoading = false;
      },
      error: () => this.locationsLoading = false,
    });
  }

  loadAvailabilities(loc: PickupLocation): void {
    this.adminService.getPickupAvailability(loc.id).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = { ...this.locations[idx], availabilities: res.data };
          this.locations = [...this.locations];
        }
      },
    });
  }

  openLocationForm(loc?: PickupLocation): void {
    this.editingLocation = loc ?? null;
    if (loc) {
      this.locationForm.patchValue({ name: loc.name, address: loc.address, city: loc.city, state: loc.state });
    } else {
      this.locationForm.reset();
    }
    this.showLocationForm = true;
  }

  cancelLocationForm(): void {
    this.showLocationForm = false;
    this.editingLocation = null;
  }

  saveLocation(): void {
    if (this.locationForm.invalid) return;
    this.savingLocation = true;
    const req: PickupLocationRequest = this.locationForm.value;

    const call = this.editingLocation
      ? this.adminService.updatePickupLocation(this.editingLocation.id, req)
      : this.adminService.createPickupLocation(req);

    call.subscribe({
      next: () => {
        this.savingLocation = false;
        this.cancelLocationForm();
        this.loadLocations();
        this.snackBar.open('Guardado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.savingLocation = false;
        this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 });
      },
    });
  }

  deleteLocation(loc: PickupLocation): void {
    if (!confirm(`¿Eliminar "${loc.name}"?`)) return;
    this.adminService.deletePickupLocation(loc.id).subscribe({
      next: () => {
        this.locations = this.locations.filter(l => l.id !== loc.id);
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  toggleLocation(loc: PickupLocation): void {
    this.adminService.togglePickupLocation(loc.id).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) this.locations[idx] = { ...this.locations[idx], active: res.data.active };
        this.locations = [...this.locations];
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  // ── Availability ─────────────────────────────────────────────────────────

  private defaultAvail(): PickupAvailabilityRequest {
    return { type: 'RECURRING', dayOfWeek: 'MONDAY', startTime: '10:00', endTime: '14:00', maxCapacity: 10 };
  }

  startAddAvailability(loc: PickupLocation): void {
    this.addingAvailForLocationId = loc.id;
    this.newAvail = this.defaultAvail();
    this.newAvailSpecificDate = null;
  }

  cancelAddAvailability(): void {
    this.addingAvailForLocationId = null;
    this.newAvail = this.defaultAvail();
    this.newAvailSpecificDate = null;
  }

  onAvailDateChange(date: Date | null): void {
    this.newAvailSpecificDate = date;
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      this.newAvail = { ...this.newAvail, specificDate: `${y}-${m}-${d}` };
    }
  }

  isNewAvailValid(): boolean {
    if (!this.newAvail.startTime || !this.newAvail.endTime || !this.newAvail.maxCapacity) return false;
    if (this.newAvail.type === 'RECURRING') return !!this.newAvail.dayOfWeek;
    return !!this.newAvail.specificDate;
  }

  saveAvailability(loc: PickupLocation): void {
    if (!this.isNewAvailValid()) return;
    const req: PickupAvailabilityRequest = { ...this.newAvail };
    if (req.type === 'RECURRING') delete req.specificDate;
    if (req.type === 'SPECIFIC_DATE') delete req.dayOfWeek;

    this.adminService.createPickupAvailability(loc.id, req).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          const avails = [...(this.locations[idx].availabilities || []), res.data];
          this.locations[idx] = { ...this.locations[idx], availabilities: avails };
          this.locations = [...this.locations];
        }
        this.cancelAddAvailability();
        this.snackBar.open('Regla de disponibilidad agregada', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  deleteAvailability(loc: PickupLocation, rule: PickupAvailability): void {
    if (!confirm(`¿Eliminar regla "${this.availabilityLabel(rule)}"?`)) return;
    this.adminService.deletePickupAvailability(loc.id, rule.id).subscribe({
      next: () => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = {
            ...this.locations[idx],
            availabilities: (this.locations[idx].availabilities || []).filter(a => a.id !== rule.id),
          };
          this.locations = [...this.locations];
        }
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  toggleAvailability(loc: PickupLocation, rule: PickupAvailability): void {
    this.adminService.togglePickupAvailability(loc.id, rule.id).subscribe({
      next: (res) => {
        const locIdx = this.locations.findIndex(l => l.id === loc.id);
        if (locIdx !== -1) {
          const avails = (this.locations[locIdx].availabilities || []).map(a =>
            a.id === rule.id ? { ...a, active: res.data.active } : a
          );
          this.locations[locIdx] = { ...this.locations[locIdx], availabilities: avails };
          this.locations = [...this.locations];
        }
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  availabilityLabel(rule: PickupAvailability): string {
    const dayLabels: Record<string, string> = {
      MONDAY: 'Lunes', TUESDAY: 'Martes', WEDNESDAY: 'Miércoles',
      THURSDAY: 'Jueves', FRIDAY: 'Viernes', SATURDAY: 'Sábado', SUNDAY: 'Domingo',
    };
    const timeRange = `${rule.startTime} – ${rule.endTime}`;
    const cap = `Cap: ${rule.maxCapacity}`;
    if (rule.type === 'RECURRING' && rule.dayOfWeek) {
      return `↻ ${dayLabels[rule.dayOfWeek] ?? rule.dayOfWeek} · ${timeRange} · ${cap}`;
    }
    return `📅 ${rule.specificDate ?? ''} · ${timeRange} · ${cap}`;
  }

  // ── Exceptions ───────────────────────────────────────────────────────────

  startAddException(ruleId: number): void {
    this.addingExceptionForRuleId = ruleId;
    this.newExcDate = null;
    this.newExcReason = '';
  }

  cancelAddException(): void {
    this.addingExceptionForRuleId = null;
    this.newExcDate = null;
    this.newExcReason = '';
  }

  saveException(lid: number, aid: number): void {
    if (!this.newExcDate) return;
    const d = this.newExcDate;
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const req: PickupExceptionRequest = { date: dateStr, reason: this.newExcReason || undefined };
    this.adminService.createPickupException(lid, aid, req).subscribe({
      next: (res) => {
        const locIdx = this.locations.findIndex(l => l.id === lid);
        if (locIdx !== -1) {
          const avails = (this.locations[locIdx].availabilities || []).map(a => {
            if (a.id === aid) {
              return { ...a, exceptions: [...(a.exceptions || []), res.data] };
            }
            return a;
          });
          this.locations[locIdx] = { ...this.locations[locIdx], availabilities: avails };
          this.locations = [...this.locations];
        }
        this.cancelAddException();
        this.snackBar.open('Excepción guardada', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error al guardar', 'Cerrar', { duration: 4000 }),
    });
  }

  removeException(lid: number, aid: number, eid: number): void {
    if (!confirm('¿Eliminar esta excepción?')) return;
    this.adminService.deletePickupException(lid, aid, eid).subscribe({
      next: () => {
        const locIdx = this.locations.findIndex(l => l.id === lid);
        if (locIdx !== -1) {
          const avails = (this.locations[locIdx].availabilities || []).map(a => {
            if (a.id === aid) {
              return { ...a, exceptions: (a.exceptions || []).filter(e => e.id !== eid) };
            }
            return a;
          });
          this.locations[locIdx] = { ...this.locations[locIdx], availabilities: avails };
          this.locations = [...this.locations];
        }
        this.snackBar.open('Excepción eliminada', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  exceptionDateLabel(dateStr: string): string {
    const [year, month, day] = dateStr.split('-').map(Number);
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
}
