import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { ReportsComponent } from './reports.component';
import { InventoryItem, ProductSalesItem, SalesReport } from '@shared/models';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeSalesReport(overrides: Partial<SalesReport> = {}): SalesReport {
  return {
    period: 'Este mes',
    totalRevenue: 1500,
    totalOrders: 5,
    data: [
      { date: '2025-03-01', orderCount: 3, revenue: 900 },
      { date: '2025-03-02', orderCount: 2, revenue: 600 },
    ],
    ...overrides,
  };
}

function makeProductSales(overrides: Partial<ProductSalesItem> = {}): ProductSalesItem {
  return { productId: 1, productName: 'Camiseta', unitsSold: 50, revenue: 1499.5, currentStock: 20, ...overrides };
}

function makeInventoryItem(overrides: Partial<InventoryItem> = {}): InventoryItem {
  return { productId: 1, name: 'Camiseta', sku: 'SKU-1', stock: 20, price: 29.99, active: true, ...overrides };
}

// ── Test suite ─────────────────────────────────────────────────────────────

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;
  let adminService: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    adminService = jasmine.createSpyObj('AdminService', [
      'getSalesReport',
      'getTopSellingProducts',
      'getLeastSellingProducts',
      'getInventoryReport',
      'getOutOfStockProducts',
    ]);

    // Default: all methods return empty/minimal valid responses
    adminService.getSalesReport.and.returnValue(
      of({ success: true, data: makeSalesReport({ data: [] }) })
    );
    adminService.getTopSellingProducts.and.returnValue(of({ success: true, data: [] }));
    adminService.getLeastSellingProducts.and.returnValue(of({ success: true, data: [] }));
    adminService.getInventoryReport.and.returnValue(of({ success: true, data: [] }));
    adminService.getOutOfStockProducts.and.returnValue(of({ success: true, data: [] }));

    await TestBed.configureTestingModule({
      imports: [ReportsComponent, NoopAnimationsModule],
      providers: [{ provide: AdminService, useValue: adminService }, provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Initial state ──────────────────────────────────────────────────────

  describe('initial state', () => {
    it('defaults to sales report type', () => {
      expect(component.reportType).toBe('sales');
    });

    it('defaults to month period', () => {
      expect(component.period).toBe('month');
    });

    it('calls getSalesReport on init', () => {
      expect(adminService.getSalesReport).toHaveBeenCalledWith('month');
    });
  });

  // ── selectType() ───────────────────────────────────────────────────────

  describe('selectType()', () => {
    it('sets reportType and reloads when switching to top-selling', fakeAsync(() => {
      adminService.getTopSellingProducts.and.returnValue(
        of({ success: true, data: [makeProductSales()] })
      );

      component.selectType('top');
      tick(60);

      expect(component.reportType).toBe('top');
      expect(adminService.getTopSellingProducts).toHaveBeenCalled();
    }));

    it('sets reportType and reloads when switching to inventory', fakeAsync(() => {
      adminService.getInventoryReport.and.returnValue(
        of({ success: true, data: [makeInventoryItem()] })
      );

      component.selectType('inventory');
      tick(60);

      expect(component.reportType).toBe('inventory');
      expect(adminService.getInventoryReport).toHaveBeenCalled();
    }));

    it('sets reportType to outofstock and calls getOutOfStockProducts', fakeAsync(() => {
      adminService.getOutOfStockProducts.and.returnValue(
        of({ success: true, data: [] })
      );

      component.selectType('outofstock');
      tick();

      expect(component.reportType).toBe('outofstock');
      expect(adminService.getOutOfStockProducts).toHaveBeenCalled();
    }));

    it('sets reportType to least and calls getLeastSellingProducts', fakeAsync(() => {
      component.selectType('least');
      tick();

      expect(component.reportType).toBe('least');
      expect(adminService.getLeastSellingProducts).toHaveBeenCalled();
    }));
  });

  // ── setPeriod() ────────────────────────────────────────────────────────

  describe('setPeriod()', () => {
    it('updates period and reloads sales report', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.setPeriod('week');
      tick(60);

      expect(component.period).toBe('week');
      expect(adminService.getSalesReport).toHaveBeenCalledWith('week');
    }));

    it('period selector only calls getSalesReport (not other endpoints)', fakeAsync(() => {
      component.setPeriod('year');
      tick();

      expect(adminService.getTopSellingProducts).not.toHaveBeenCalled();
      expect(adminService.getSalesReport).toHaveBeenCalledWith('year');
    }));
  });

  // ── loadReport() — data processing ────────────────────────────────────

  describe('loadReport()', () => {
    it('sets hasData = true when sales report has data points', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.loadReport();
      tick(60);

      expect(component.hasData).toBeTrue();
    }));

    it('sets hasData = false when sales data array is empty', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport({ data: [] }) })
      );

      component.loadReport();
      tick();

      expect(component.hasData).toBeFalse();
    }));

    it('sets loading = false after successful load', fakeAsync(() => {
      component.loadReport();
      tick();

      expect(component.loading).toBeFalse();
    }));

    it('sets loading = false on error', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(throwError(() => new Error('Network error')));

      component.loadReport();
      tick();

      expect(component.loading).toBeFalse();
      expect(component.dataLoaded).toBeTrue();
    }));

    it('builds KPI cards for sales report', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.loadReport();
      tick(60);

      expect(component.kpis.length).toBeGreaterThan(0);
      expect(component.kpis.some(k => k.label === 'Pedidos')).toBeTrue();
      expect(component.kpis.some(k => k.label === 'Ingresos totales')).toBeTrue();
    }));

    it('builds table rows for sales report', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.loadReport();
      tick(60);

      expect(component.tableRows.length).toBe(2);
      expect(component.tableHeaders).toEqual(['Fecha', 'Pedidos', 'Ingresos']);
    }));

    it('builds KPI cards for top-selling products', fakeAsync(() => {
      adminService.getTopSellingProducts.and.returnValue(
        of({ success: true, data: [makeProductSales()] })
      );

      component.selectType('top');
      tick(60);

      expect(component.kpis.some(k => k.label === 'Unidades vendidas')).toBeTrue();
      expect(component.tableHeaders).toEqual(['Producto', 'Unidades vendidas', 'Ingresos', 'Stock actual']);
    }));

    it('builds KPI cards for inventory report', fakeAsync(() => {
      adminService.getInventoryReport.and.returnValue(
        of({ success: true, data: [makeInventoryItem(), makeInventoryItem({ productId: 2, stock: 0 })] })
      );

      component.selectType('inventory');
      tick(60);

      expect(component.kpis.some(k => k.label === 'Productos totales')).toBeTrue();
    }));
  });

  // ── downloadExcel() ────────────────────────────────────────────────────

  describe('downloadExcel()', () => {
    it('does not throw when called after data is loaded', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.loadReport();
      tick(60);

      // Create the anchor element BEFORE setting up the spy so document.createElement
      // is not yet intercepted when the real element is constructed.
      const anchorEl = Object.assign(document.createElement('a'), { click: jasmine.createSpy('click') });
      spyOn(document, 'createElement').and.returnValue(anchorEl);

      expect(() => component.downloadExcel()).not.toThrow();
    }));
  });

  // ── downloadImage() ────────────────────────────────────────────────────

  describe('downloadImage()', () => {
    it('does not throw when chartRef is undefined', () => {
      (component as any).chartRef = undefined;
      expect(() => component.downloadImage()).not.toThrow();
    });

    it('creates an anchor and clicks it when canvas is present', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );
      component.loadReport();
      tick(60);
      fixture.detectChanges();

      const anchorEl = Object.assign(document.createElement('a'), { click: jasmine.createSpy('click') });
      spyOn(document, 'createElement').and.returnValue(anchorEl);
      component.downloadImage();
      expect((anchorEl.click as jasmine.Spy).calls.any()).toBeTrue();
    }));
  });

  // ── downloadPDF() ────────────────────────────────────────────────────────

  describe('downloadPDF()', () => {
    it('does not throw when called', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );
      component.loadReport();
      tick(60);

      spyOn(window, 'open').and.returnValue(null);
      expect(() => component.downloadPDF()).not.toThrow();
    }));

    it('calls window.open with _blank', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );
      component.loadReport();
      tick(60);

      const openSpy = spyOn(window, 'open').and.returnValue(null);
      component.downloadPDF();
      expect(openSpy).toHaveBeenCalledWith('', '_blank');
    }));
  });

  // ── processData — least / outofstock / inventory ──────────────────────

  describe('processData for non-sales types', () => {
    it('least: sets hasData and correct tableHeaders', fakeAsync(() => {
      adminService.getLeastSellingProducts.and.returnValue(
        of({ success: true, data: [makeProductSales()] })
      );

      component.selectType('least');
      tick(60);

      expect(component.hasData).toBeTrue();
      expect(component.tableHeaders).toEqual(['Producto', 'Unidades vendidas', 'Ingresos', 'Stock actual']);
    }));

    it('outofstock: hasData = false when empty', fakeAsync(() => {
      adminService.getOutOfStockProducts.and.returnValue(
        of({ success: true, data: [] })
      );

      component.selectType('outofstock');
      tick();

      expect(component.hasData).toBeFalse();
    }));

    it('outofstock: hasData = true with items', fakeAsync(() => {
      adminService.getOutOfStockProducts.and.returnValue(
        of({ success: true, data: [makeInventoryItem({ stock: 0 })] })
      );

      component.selectType('outofstock');
      tick(60);

      expect(component.hasData).toBeTrue();
      expect(component.tableHeaders).toEqual(['Producto', 'SKU', 'Stock', 'Precio', 'Activo']);
    }));

    it('inventory: shows "Con stock" and "Sin stock" KPIs', fakeAsync(() => {
      adminService.getInventoryReport.and.returnValue(
        of({ success: true, data: [
          makeInventoryItem({ productId: 1, stock: 10 }),
          makeInventoryItem({ productId: 2, stock: 0 }),
        ] })
      );

      component.selectType('inventory');
      tick(60);

      expect(component.kpis.some(k => k.label === 'Con stock')).toBeTrue();
      expect(component.kpis.some(k => k.label === 'Sin stock')).toBeTrue();
      const sinStock = component.kpis.find(k => k.label === 'Sin stock');
      expect(sinStock?.value).toBe('1');
    }));

    it('setPeriod("year") calls getSalesReport with "year"', fakeAsync(() => {
      adminService.getSalesReport.and.returnValue(
        of({ success: true, data: makeSalesReport() })
      );

      component.setPeriod('year');
      tick(60);

      expect(component.period).toBe('year');
      expect(adminService.getSalesReport).toHaveBeenCalledWith('year');
    }));
  });
});
