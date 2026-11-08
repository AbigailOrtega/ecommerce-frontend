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
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminService } from '@core/services/admin.service';
import { AvailabilityType, DayOfWeek, PickupAvailability, PickupAvailabilityRequest, PickupException, PickupExceptionRequest, PickupLocation, PickupLocationRequest, ShippingConfig } from '@shared/models';

@Component({
    selector: 'app-shipping-management',
    imports: [RouterLink, FormsModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule,
        MatFormFieldModule, MatInputModule, MatCardModule, MatSnackBarModule,
        MatSlideToggleModule, MatDividerModule, MatTooltipModule, MatSelectModule,
        MatDatepickerModule, MatButtonToggleModule],
    templateUrl: './shipping-management.component.html',
    styleUrl: './shipping-management.component.scss'
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
