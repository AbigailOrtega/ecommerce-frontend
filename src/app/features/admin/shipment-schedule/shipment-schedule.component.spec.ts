import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { ShipmentScheduleComponent } from './shipment-schedule.component';
import { Order, UpcomingSchedule } from '@shared/models';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeOrder(overrides: Partial<Order> = {}): Order {
  return {
    id: 1,
    orderNumber: 'ORD-001',
    items: [],
    totalAmount: 500,
    status: 'CONFIRMED',
    shippingAddress: 'Calle 1',
    shippingCity: 'CDMX',
    shippingState: 'CMX',
    shippingZipCode: '06600',
    shippingCountry: 'MX',
    createdAt: new Date().toISOString(),
    shippingType: 'NATIONAL',
    ...overrides,
  };
}

function makeSchedule(overrides: Partial<UpcomingSchedule> = {}): UpcomingSchedule {
  return {
    shipments: [],
    pickups: [],
    ...overrides,
  };
}

// ── Test suite ─────────────────────────────────────────────────────────────

describe('ShipmentScheduleComponent', () => {
  let component: ShipmentScheduleComponent;
  let fixture: ComponentFixture<ShipmentScheduleComponent>;
  let adminService: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    adminService = jasmine.createSpyObj('AdminService', ['getUpcomingSchedule']);
    adminService.getUpcomingSchedule.and.returnValue(
      of({ success: true, data: makeSchedule() })
    );

    await TestBed.configureTestingModule({
      imports: [ShipmentScheduleComponent, NoopAnimationsModule],
      providers: [{ provide: AdminService, useValue: adminService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ShipmentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Initialization ─────────────────────────────────────────────────────

  describe('ngOnInit', () => {
    it('calls getUpcomingSchedule on init', () => {
      expect(adminService.getUpcomingSchedule).toHaveBeenCalled();
    });

    it('sets loading = false after data loads', fakeAsync(() => {
      component.load();
      tick();
      expect(component.loading).toBeFalse();
    }));

    it('sets schedule from response data', fakeAsync(() => {
      const schedule = makeSchedule({ shipments: [makeOrder()] });
      adminService.getUpcomingSchedule.and.returnValue(of({ success: true, data: schedule }));

      component.load();
      tick();

      expect(component.schedule).toEqual(schedule);
      expect(component.schedule!.shipments.length).toBe(1);
    }));

    it('sets loading = false on error', fakeAsync(() => {
      adminService.getUpcomingSchedule.and.returnValue(throwError(() => new Error('Network')));

      component.load();
      tick();

      expect(component.loading).toBeFalse();
    }));
  });

  // ── load() ────────────────────────────────────────────────────────────

  describe('load()', () => {
    it('resets loading = true then false', fakeAsync(() => {
      adminService.getUpcomingSchedule.and.returnValue(
        of({ success: true, data: makeSchedule() })
      );

      component.load();
      expect(component.loading).toBeTrue();
      tick();
      expect(component.loading).toBeFalse();
    }));

    it('replaces schedule on each call', fakeAsync(() => {
      const first = makeSchedule({ shipments: [makeOrder()] });
      adminService.getUpcomingSchedule.and.returnValue(of({ success: true, data: first }));
      component.load();
      tick();
      expect(component.schedule!.shipments.length).toBe(1);

      const second = makeSchedule({ shipments: [] });
      adminService.getUpcomingSchedule.and.returnValue(of({ success: true, data: second }));
      component.load();
      tick();
      expect(component.schedule!.shipments.length).toBe(0);
    }));
  });

  // ── totalPickups getter ────────────────────────────────────────────────

  describe('totalPickups', () => {
    it('returns 0 when schedule is null', () => {
      component.schedule = null;
      expect(component.totalPickups).toBe(0);
    });

    it('returns 0 when pickups is empty', fakeAsync(() => {
      adminService.getUpcomingSchedule.and.returnValue(
        of({ success: true, data: makeSchedule({ pickups: [] }) })
      );
      component.load();
      tick();
      expect(component.totalPickups).toBe(0);
    }));

    it('sums orders across all pickup groups', fakeAsync(() => {
      const schedule = makeSchedule({
        pickups: [
          { locationName: 'Norte', orders: [makeOrder(), makeOrder({ id: 2 })] },
          { locationName: 'Sur',   orders: [makeOrder({ id: 3 })] },
        ],
      });
      adminService.getUpcomingSchedule.and.returnValue(of({ success: true, data: schedule }));
      component.load();
      tick();
      expect(component.totalPickups).toBe(3);
    }));
  });

  // ── statusLabel() ──────────────────────────────────────────────────────

  describe('statusLabel()', () => {
    it('returns Spanish label for CONFIRMED', () => {
      expect(component.statusLabel('CONFIRMED')).toBe('Confirmado');
    });

    it('returns Spanish label for PROCESSING', () => {
      expect(component.statusLabel('PROCESSING')).toBe('Procesando');
    });

    it('returns original status string for unknown values', () => {
      expect(component.statusLabel('SOME_UNKNOWN')).toBe('SOME_UNKNOWN');
    });

    it('returns empty string for undefined input', () => {
      expect(component.statusLabel(undefined)).toBe('');
    });
  });
});
