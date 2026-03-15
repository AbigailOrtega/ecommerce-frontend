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
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { PickupLocation, PickupLocationRequest, PickupTimeSlotRequest, ShippingConfig } from '@shared/models';

@Component({
  selector: 'app-shipping-management',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule,
    MatSlideToggleModule, MatDividerModule, MatTooltipModule, CurrencyPipe],
  template: `
    <div class="container">
      <h1>Gestión de Envíos</h1>

      <!-- ── Sección 1: Configuración ── -->
      <mat-card class="config-card">
        <h2>Configuración de Envío</h2>
        @if (configLoading) {
          <p class="hint">Cargando configuración...</p>
        } @else if (configForm) {
          <form [formGroup]="configForm" (ngSubmit)="saveConfig()">

            <div class="toggle-row">
              <mat-slide-toggle formControlName="nationalEnabled" color="primary">
                Envío Nacional habilitado
              </mat-slide-toggle>
              <mat-slide-toggle formControlName="pickupEnabled" color="primary">
                Pick Up habilitado
              </mat-slide-toggle>
            </div>

            <mat-divider style="margin: 16px 0;"></mat-divider>
            <h3 class="sub-title">Envío Nacional (Google Maps)</h3>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Dirección de origen (tienda)</mat-label>
              <input matInput formControlName="originAddress" placeholder="Ej. Av. Insurgentes Sur 1234, CDMX, México">
            </mat-form-field>

            <div class="api-key-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Google Maps API Key</mat-label>
                <input matInput [type]="showApiKey ? 'text' : 'password'" formControlName="googleMapsApiKey"
                       placeholder="Ingresa tu API key">
                <button mat-icon-button matSuffix type="button" (click)="showApiKey = !showApiKey"
                        [matTooltip]="showApiKey ? 'Ocultar' : 'Mostrar'">
                  <mat-icon>{{ showApiKey ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>
              <span class="api-badge" [class.configured]="config?.hasApiKey">
                <mat-icon>{{ config?.hasApiKey ? 'check_circle' : 'cancel' }}</mat-icon>
                {{ config?.hasApiKey ? 'Configurada' : 'No configurada' }}
              </span>
            </div>

            <div class="row">
              <mat-form-field appearance="outline">
                <mat-label>Precio base ($)</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="nationalBasePrice">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Precio por km ($)</mat-label>
                <input matInput type="number" min="0" step="0.01" formControlName="nationalPricePerKm">
              </mat-form-field>
            </div>

            <mat-divider style="margin: 16px 0;"></mat-divider>
            <h3 class="sub-title">Pick Up</h3>

            <mat-form-field appearance="outline">
              <mat-label>Costo de Pick Up ($)</mat-label>
              <input matInput type="number" min="0" step="0.01" formControlName="pickupCost">
            </mat-form-field>

            <mat-divider style="margin: 16px 0;"></mat-divider>
            <div class="section-header-row">
              <h3 class="sub-title">Skydropx (Guías de envío)</h3>
              <span class="api-badge" [class.configured]="config?.hasSkydropxCredentials">
                <mat-icon>{{ config?.hasSkydropxCredentials ? 'check_circle' : 'cancel' }}</mat-icon>
                {{ config?.hasSkydropxCredentials ? 'Conectado' : 'No configurado' }}
              </span>
            </div>

            <div class="toggle-row" style="margin-bottom: 12px;">
              <mat-slide-toggle formControlName="skydropxSandbox" color="accent">
                Modo Sandbox (demo)
              </mat-slide-toggle>
            </div>

            <div class="api-key-row">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>API Key (Client ID)</mat-label>
                <input matInput [type]="showSkydropxId ? 'text' : 'password'" formControlName="skydropxClientId"
                       placeholder="Ingresa tu API Key">
                <button mat-icon-button matSuffix type="button" (click)="showSkydropxId = !showSkydropxId">
                  <mat-icon>{{ showSkydropxId ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>API Secret Key (Client Secret)</mat-label>
                <input matInput [type]="showSkydropxSecret ? 'text' : 'password'" formControlName="skydropxClientSecret"
                       placeholder="Ingresa tu API Secret Key">
                <button mat-icon-button matSuffix type="button" (click)="showSkydropxSecret = !showSkydropxSecret">
                  <mat-icon>{{ showSkydropxSecret ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
              </mat-form-field>
            </div>

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

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="savingConfig">
                {{ savingConfig ? 'Guardando...' : 'Guardar configuración' }}
              </button>
            </div>
          </form>
        }
      </mat-card>

      <!-- ── Sección 2: Puntos de Pick Up ── -->
      @if (config?.pickupEnabled || true) {
        <mat-card class="locations-card">
          <div class="locations-header">
            <h2>Puntos de Pick Up</h2>
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
                    <span class="slot-count">{{ loc.timeSlots.length }} horario(s)</span>
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

                <!-- Time slots -->
                <div class="slots-section">
                  <div class="slots-list">
                    @for (slot of loc.timeSlots; track slot.id) {
                      <div class="slot-item" [class.slot-inactive]="!slot.active">
                        <span>{{ slot.label }}</span>
                        <div class="slot-actions">
                          <mat-slide-toggle [checked]="slot.active" (change)="toggleSlot(loc, slot)"
                                            color="primary" [matTooltip]="slot.active ? 'Desactivar' : 'Activar'"></mat-slide-toggle>
                          <button mat-icon-button color="warn" (click)="deleteSlot(loc, slot)" matTooltip="Eliminar">
                            <mat-icon>close</mat-icon>
                          </button>
                        </div>
                      </div>
                    }
                  </div>

                  <!-- Add slot inline -->
                  @if (addingSlotForLocationId === loc.id) {
                    <div class="add-slot-row">
                      <mat-form-field appearance="outline" class="slot-input">
                        <mat-label>Ej. Lunes 10:00 – 14:00</mat-label>
                        <input matInput [(ngModel)]="newSlotLabel" [ngModelOptions]="{standalone: true}">
                      </mat-form-field>
                      <button mat-icon-button color="primary" (click)="saveSlot(loc)" [disabled]="!newSlotLabel.trim()">
                        <mat-icon>check</mat-icon>
                      </button>
                      <button mat-icon-button (click)="cancelAddSlot()">
                        <mat-icon>close</mat-icon>
                      </button>
                    </div>
                  } @else {
                    <button mat-stroked-button (click)="startAddSlot(loc.id)" class="add-slot-btn">
                      <mat-icon>schedule</mat-icon> Agregar horario
                    </button>
                  }
                </div>
              </mat-card>
            }
          }
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .container { max-width: 900px; }
    .config-card, .locations-card { padding: 24px; margin-bottom: 24px; }
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
    .location-item { padding: 16px; margin-bottom: 12px; border-left: 4px solid #3f51b5; }
    .location-item.inactive { border-left-color: #bbb; opacity: 0.75; }
    .location-header { display: flex; justify-content: space-between; align-items: flex-start; }
    .location-info { display: flex; flex-direction: column; gap: 2px; }
    .location-info strong { font-size: 1rem; }
    .location-meta { font-size: 0.85rem; color: #666; }
    .slot-count { font-size: 0.8rem; color: #3f51b5; }
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
  `],
})
export class ShippingManagementComponent implements OnInit {
  configForm: FormGroup | null = null;
  config: ShippingConfig | null = null;
  configLoading = true;
  savingConfig = false;
  showApiKey = false;
  showSkydropxId = false;
  showSkydropxSecret = false;

  locations: PickupLocation[] = [];
  locationsLoading = true;
  locationForm: FormGroup;
  showLocationForm = false;
  editingLocation: PickupLocation | null = null;
  savingLocation = false;

  addingSlotForLocationId: number | null = null;
  newSlotLabel = '';

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
          originAddress: [res.data.originAddress ?? ''],
          googleMapsApiKey: [''],
          nationalBasePrice: [res.data.nationalBasePrice, [Validators.min(0)]],
          nationalPricePerKm: [res.data.nationalPricePerKm, [Validators.min(0)]],
          pickupCost: [res.data.pickupCost, [Validators.min(0)]],
          skydropxClientId: [''],
          skydropxClientSecret: [''],
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
          skydropxSandbox: [res.data.skydropxSandbox ?? false],
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
      nationalBasePrice: val.nationalBasePrice,
      nationalPricePerKm: val.nationalPricePerKm,
      originAddress: val.originAddress,
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
      skydropxSandbox: val.skydropxSandbox,
    };
    if (val.googleMapsApiKey?.trim()) {
      (req as any).googleMapsApiKey = val.googleMapsApiKey;
    }
    if (val.skydropxClientId?.trim()) {
      (req as any).skydropxClientId = val.skydropxClientId;
    }
    if (val.skydropxClientSecret?.trim()) {
      (req as any).skydropxClientSecret = val.skydropxClientSecret;
    }

    this.adminService.updateShippingConfig(req).subscribe({
      next: (res) => {
        this.config = res.data;
        this.savingConfig = false;
        this.configForm?.patchValue({ googleMapsApiKey: '', skydropxClientId: '', skydropxClientSecret: '' });
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
      next: (res) => { this.locations = res.data; this.locationsLoading = false; },
      error: () => this.locationsLoading = false,
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

  startAddSlot(locationId: number): void {
    this.addingSlotForLocationId = locationId;
    this.newSlotLabel = '';
  }

  cancelAddSlot(): void {
    this.addingSlotForLocationId = null;
    this.newSlotLabel = '';
  }

  saveSlot(loc: PickupLocation): void {
    if (!this.newSlotLabel.trim()) return;
    const req: PickupTimeSlotRequest = { label: this.newSlotLabel.trim() };
    this.adminService.addTimeSlot(loc.id, req).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = {
            ...this.locations[idx],
            timeSlots: [...this.locations[idx].timeSlots, res.data],
          };
          this.locations = [...this.locations];
        }
        this.cancelAddSlot();
        this.snackBar.open('Horario agregado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  deleteSlot(loc: PickupLocation, slot: { id: number; label: string; active: boolean }): void {
    if (!confirm(`¿Eliminar horario "${slot.label}"?`)) return;
    this.adminService.deleteTimeSlot(loc.id, slot.id).subscribe({
      next: () => {
        const idx = this.locations.findIndex(l => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = {
            ...this.locations[idx],
            timeSlots: this.locations[idx].timeSlots.filter(s => s.id !== slot.id),
          };
          this.locations = [...this.locations];
        }
        this.snackBar.open('Eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }

  toggleSlot(loc: PickupLocation, slot: { id: number; label: string; active: boolean }): void {
    this.adminService.toggleTimeSlot(loc.id, slot.id).subscribe({
      next: (res) => {
        const locIdx = this.locations.findIndex(l => l.id === loc.id);
        if (locIdx !== -1) {
          const slots = this.locations[locIdx].timeSlots.map(s =>
            s.id === slot.id ? { ...s, active: res.data.active } : s
          );
          this.locations[locIdx] = { ...this.locations[locIdx], timeSlots: slots };
          this.locations = [...this.locations];
        }
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error', 'Cerrar', { duration: 4000 }),
    });
  }
}
