import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { AdminService } from '@core/services/admin.service';
import { AccountingReport, LedgerRow } from '@shared/models';
import { AccountingReportComponent, isoDay, ledgerCsv, paymentMethodLabel } from './accounting-report.component';

function row(overrides: Partial<LedgerRow> = {}): LedgerRow {
  return {
    movement: 'VENTA', date: '2026-10-05T12:30:00', orderNumber: 'ORD-1', customer: 'Ana "La" Ruiz', email: 'ana@example.com',
    status: 'DELIVERED', paymentMethod: 'stripe', paymentId: 'pi_1', couponCode: null, shippingType: 'NATIONAL',
    productSales: 1000, discount: 100, shipping: 150, total: 1050, paymentFee: 40.8, labelCost: 120, costOfGoods: 400,
    ...overrides,
  };
}

function report(overrides: Partial<AccountingReport['summary']> = {}): AccountingReport {
  return {
    from: '2026-10-01', to: '2026-10-31',
    summary: {
      paidOrders: 2, productSales: 1300, discounts: 100, shippingCharged: 150, totalCollected: 1350,
      refundedOrders: 1, refunds: 400, netSales: 950, paymentFees: 40.8, ordersMissingFee: 0,
      labelCosts: 120, shipmentsMissingCost: 0, costOfGoods: 250, unitsMissingCost: 0, grossProfit: 539.2,
      paidThenCancelled: 0, ...overrides,
    },
    byPaymentMethod: [{ method: 'stripe', orders: 1, collected: 1050, fees: 40.8 }],
    daily: [{ date: '2026-10-05', orderCount: 2, revenue: 1350 }],
    ledger: [row(), row({ movement: 'REEMBOLSO', orderNumber: 'ORD-2', total: -400, productSales: -400, discount: 0, shipping: 0, paymentFee: null, labelCost: null, costOfGoods: -150 })],
  };
}

describe('AccountingReportComponent', () => {
  let fixture: ComponentFixture<AccountingReportComponent>;
  let component: AccountingReportComponent;
  let admin: jasmine.SpyObj<AdminService>;

  beforeEach(async () => {
    admin = jasmine.createSpyObj('AdminService', ['getAccountingReport', 'getProductCosts', 'setProductCost']);
    admin.getAccountingReport.and.returnValue(of({ success: true, data: report() }));
    admin.getProductCosts.and.returnValue(of({ success: true, data: [
      { id: 7, name: 'Vestido lino', sku: 'V-1', price: 500, costPrice: null, active: true },
      { id: 8, name: 'Blusa', sku: null, price: 300, costPrice: 120, active: false },
    ] }));
    admin.setProductCost.and.returnValue(of({ success: true, message: 'Costo guardado; también se aplicó a 2 ventas anteriores', data: 2 }));

    await TestBed.configureTestingModule({
      imports: [AccountingReportComponent, NoopAnimationsModule],
      providers: [{ provide: AdminService, useValue: admin }],
    }).compileComponents();
    fixture = TestBed.createComponent(AccountingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads this month on open, and the product costs', () => {
    const now = new Date();
    expect(admin.getAccountingReport).toHaveBeenCalledWith(isoDay(new Date(now.getFullYear(), now.getMonth(), 1)), isoDay(now));
    expect(admin.getProductCosts).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('[data-testid="acct-profit"]').textContent).toContain('539.20');
  });

  it('"Mes anterior" asks from its first to its last day', () => {
    component.previousMonth();
    const now = new Date();
    expect(admin.getAccountingReport).toHaveBeenCalledWith(
      isoDay(new Date(now.getFullYear(), now.getMonth() - 1, 1)), isoDay(new Date(now.getFullYear(), now.getMonth(), 0)));
  });

  it('does not ask for a backwards range', () => {
    admin.getAccountingReport.calls.reset();
    component.setRange('2026-10-31', '2026-10-01');
    expect(admin.getAccountingReport).not.toHaveBeenCalled();
  });

  it('shows the breakdown down to the gross profit', () => {
    const text = fixture.nativeElement.querySelector('[data-testid="acct-breakdown"]').textContent;
    for (const label of ['Ventas de productos', 'Descuentos', 'Envío cobrado', 'Total cobrado', 'Reembolsos', 'Ventas netas',
      'Comisiones de pago', 'Guías de envío', 'Costo de las prendas', 'Utilidad bruta']) {
      expect(text).toContain(label);
    }
  });

  it('warns about what is missing for a true profit', () => {
    admin.getAccountingReport.and.returnValue(of({ success: true, data: report({ ordersMissingFee: 2, unitsMissingCost: 1, shipmentsMissingCost: 0, paidThenCancelled: 1 }) }));
    component.load();
    fixture.detectChanges();
    const w = component.warnings();
    expect(w.length).toBe(3);
    expect(w[0]).toContain('2 pagos');
    expect(w[1]).toContain('1 prenda vendida');
    expect(w[2]).toContain('revisa si devolviste el dinero');
  });

  it('shows the server message when the range is rejected', () => {
    admin.getAccountingReport.and.returnValue(throwError(() => ({ error: { message: 'El periodo puede ser de hasta 400 días' } })));
    component.setRange('2024-01-01', '2026-01-01');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="alert"]').textContent).toContain('400 días');
    expect(component.report()).toBeNull();
  });

  it('saves a cost, then reloads the report', () => {
    const p = component.costs()[0];
    expect(component.isDirty(p)).toBeFalse();
    component.setDraft(7, '210.5');
    expect(component.isDirty(p)).toBeTrue();
    expect(component.productMargin(p)).toBe('58%');
    admin.getAccountingReport.calls.reset();
    component.saveCost(p);
    expect(admin.setProductCost).toHaveBeenCalledWith(7, 210.5);
    expect(component.costs()[0].costPrice).toBe(210.5);
    expect(component.isDirty(component.costs()[0])).toBeFalse();
    expect(admin.getAccountingReport).toHaveBeenCalled();
  });

  it('does not save a negative cost', () => {
    component.setDraft(7, -3);
    expect(component.isDirty(component.costs()[0])).toBeFalse();
    component.saveCost(component.costs()[0]);
    expect(admin.setProductCost).not.toHaveBeenCalled();
  });

  it('filters products by name or SKU', () => {
    component.costFilter.set('v-1');
    expect(component.filteredCosts().map(p => p.id)).toEqual([7]);
  });
});

describe('ledgerCsv', () => {
  it('one line per movement, numbers plain, text quoted, Excel BOM', () => {
    const csv = ledgerCsv(report().ledger);
    expect(csv.startsWith('﻿"Movimiento"')).toBeTrue();
    const lines = csv.split('\r\n');
    expect(lines.length).toBe(3);
    expect(lines[1]).toContain('"Venta","2026-10-05 12:30","ORD-1","Ana ""La"" Ruiz"');
    expect(lines[1]).toContain('"Tarjeta (Stripe)"');
    expect(lines[1]).toContain('"Envío",1000.00,100.00,150.00,1050.00,40.80,120.00,400.00');
    expect(lines[2]).toContain('"Reembolso"');
    expect(lines[2]).toContain('-400.00');
    expect(lines[2].endsWith(',,-150.00')).toBeTrue();
  });

  it('labels payment methods in Spanish', () => {
    expect(paymentMethodLabel('paypal')).toBe('PayPal');
    expect(paymentMethodLabel('COD')).toBe('Pago al recibir');
    expect(paymentMethodLabel(null)).toBe('Otro');
  });
});
