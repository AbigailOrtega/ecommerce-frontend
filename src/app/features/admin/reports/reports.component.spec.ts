import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { ReportsComponent, presetRange } from './reports.component';
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
      'getCategorySales',
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
      const m = presetRange('month');
      expect(adminService.getSalesReport).toHaveBeenCalledWith(m.from, m.to);
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
      const w = presetRange('week');
      expect(adminService.getSalesReport).toHaveBeenCalledWith(w.from, w.to);
    }));

    it('period selector only calls getSalesReport (not other endpoints)', fakeAsync(() => {
      component.setPeriod('year');
      tick();

      expect(adminService.getTopSellingProducts).not.toHaveBeenCalled();
      const y = presetRange('year');
      expect(adminService.getSalesReport).toHaveBeenCalledWith(y.from, y.to);
    }));

    it('dates typed by the admin load that range and mark the period as custom', fakeAsync(() => {
      adminService.getSalesReport.calls.reset();
      component.setRange('2026-10-03', '2026-10-20');
      tick();

      expect(component.period).toBe('custom');
      expect(adminService.getSalesReport).toHaveBeenCalledOnceWith('2026-10-03', '2026-10-20');
    }));

    it('does not load while "Hasta" is before "Desde", and says why', fakeAsync(() => {
      adminService.getSalesReport.calls.reset();
      component.setRange('2026-10-20', '2026-10-03');
      tick();
      fixture.detectChanges();

      expect(adminService.getSalesReport).not.toHaveBeenCalled();
      expect(fixture.nativeElement.textContent).toContain('debe ser igual o posterior');
    }));
  });

  describe('product rows', () => {
    it('product reports remember each row\'s product, and a row opens it in Admin → Productos', fakeAsync(() => {
      adminService.getOutOfStockProducts.and.returnValue(
        of({ success: true, data: [makeInventoryItem({ productId: 9, slug: 'falda-floral' } as any)] }));
      const router = TestBed.inject(Router);
      const nav = spyOn(router, 'navigate').and.resolveTo(true);

      component.selectType('outofstock');
      tick(60);
      fixture.detectChanges();

      expect(component.rowProducts).toEqual([{ id: 9, slug: 'falda-floral' }]);
      const row = fixture.nativeElement.querySelector('[data-testid="report-row-9"]') as HTMLElement;
      const store = fixture.nativeElement.querySelector('[data-testid="report-store-9"]') as HTMLAnchorElement;
      expect(store.getAttribute('href')).toBe('/products/falda-floral');
      expect(store.target).toBe('_blank');

      row.click();
      expect(nav).toHaveBeenCalledWith(['/admin/products'], { queryParams: { edit: 9 } });
    }));

    it('the sales report rows are not product links', fakeAsync(() => {
      component.setPeriod('month');
      tick(60);
      expect(component.rowProducts).toEqual([]);
    }));
  });

  describe('by category', () => {
    const rows = [
      { categoryId: 3, name: 'Camisas', visible: true, unitsSold: 12, orders: 9, revenue: 2400 },
      { categoryId: 5, name: 'Ofertas', visible: false, unitsSold: 4, orders: 4, revenue: 600 },
      { categoryId: 7, name: 'Faldas', visible: true, unitsSold: 0, orders: 0, revenue: 0 },
    ];

    it('asks for the chosen dates and shows each category, the hidden ones marked', fakeAsync(() => {
      adminService.getCategorySales.and.returnValue(of({ success: true, data: rows }));
      component.setRange('2026-11-01', '2026-11-11');
      component.selectType('categories');
      tick(60);

      expect(adminService.getCategorySales).toHaveBeenCalledWith('2026-11-01', '2026-11-11');
      expect(component.usesDates).toBeTrue();
      expect(component.tableHeaders).toEqual(['Categoría', 'Unidades vendidas', 'Pedidos', 'Ingresos']);
      expect(component.tableRows.map(r => r[0])).toEqual(['Camisas', 'Ofertas (oculta)', 'Faldas']);
      expect(component.kpis[0]).toEqual(jasmine.objectContaining({ value: '2', label: 'Categorías con ventas' }));
      expect(component.kpis[1]).toEqual(jasmine.objectContaining({ value: 'Camisas', label: 'La más vendida' }));
    }));

    it('a row opens Productos filtered by that category', fakeAsync(() => {
      adminService.getCategorySales.and.returnValue(of({ success: true, data: rows }));
      const nav = spyOn(TestBed.inject(Router), 'navigate').and.resolveTo(true);
      component.selectType('categories');
      tick(60);
      fixture.detectChanges();

      (fixture.nativeElement.querySelector('[data-testid="category-row-3"]') as HTMLElement).click();
      expect(nav).toHaveBeenCalledWith(['/admin/products'], { queryParams: { category: 3 } });
    }));

    it('a period where nothing sold says there is no data', fakeAsync(() => {
      adminService.getCategorySales.and.returnValue(of({ success: true, data: [{ ...rows[2] }] }));
      component.selectType('categories');
      tick(60);
      expect(component.hasData).toBeFalse();
    }));
  });

  describe('presetRange()', () => {
    const today = new Date(2026, 10, 11);
    it('last 7 days include today', () => expect(presetRange('week', today)).toEqual({ from: '2026-11-05', to: '2026-11-11' }));
    it('this month starts on the 1st', () => expect(presetRange('month', today)).toEqual({ from: '2026-11-01', to: '2026-11-11' }));
    it('this year starts on January 1st', () => expect(presetRange('year', today)).toEqual({ from: '2026-01-01', to: '2026-11-11' }));
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
        of({ success: true, data: [makeInventoryItem({ stock: 0, outOfStockVariants: ['M / Rojo', 'L / Azul'] })] })
      );

      component.selectType('outofstock');
      tick(60);

      expect(component.hasData).toBeTrue();
      expect(component.tableHeaders).toEqual(['Producto', 'SKU', 'Stock total', 'Sin existencia', 'Precio', 'Activo']);
      expect(component.tableRows[0][3]).toBe('M / Rojo, L / Azul');
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
      const y = presetRange('year');
      expect(adminService.getSalesReport).toHaveBeenCalledWith(y.from, y.to);
    }));
  });
});
