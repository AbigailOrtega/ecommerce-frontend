import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { DatePickerOnClickDirective } from '@shared/directives/date-picker-on-click.directive';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '@core/services/admin.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { orderStatusLabel } from '@shared/order-status';
import { AccountingReport, LedgerRow, ProductCostItem } from '@shared/models';

/** yyyy-mm-dd of a local date. */
export function isoDay(d: Date): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export function paymentMethodLabel(method: string | null | undefined): string {
  switch ((method ?? '').toLowerCase()) {
    case 'stripe': return 'Tarjeta (Stripe)';
    case 'paypal': return 'PayPal';
    case 'cod': return 'Pago al recibir';
    case '': case 'otro': return 'Otro';
    default: return method!;
  }
}

/** One cell of a CSV line: numbers plain (Excel sums them), text quoted. */
function csvCell(v: string | number | null | undefined): string {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return v.toFixed(2);
  return `"${v.replace(/"/g, '""')}"`;
}

/** The sales ledger as CSV (opens in Excel): one line per sale or refund. */
export function ledgerCsv(rows: LedgerRow[]): string {
  const headers = ['Movimiento', 'Fecha', 'Pedido', 'Cliente', 'Correo', 'Estado actual', 'Método de pago', 'ID del pago',
    'Cupón', 'Entrega', 'Productos', 'Descuento', 'Envío cobrado', 'Total', 'Comisión de pago', 'Costo de guía', 'Costo de prendas'];
  const lines = rows.map(r => [
    r.movement === 'VENTA' ? 'Venta' : 'Reembolso',
    r.date.replace('T', ' ').slice(0, 16),
    r.orderNumber, r.customer, r.email, orderStatusLabel(r.status), paymentMethodLabel(r.paymentMethod), r.paymentId,
    r.couponCode, r.shippingType === 'PICKUP' ? 'Recolección' : r.shippingType === 'NATIONAL' ? 'Envío' : r.shippingType,
    r.productSales, r.discount, r.shipping, r.total, r.paymentFee, r.labelCost, r.costOfGoods,
  ].map(csvCell).join(','));
  return '﻿' + [headers.map(csvCell).join(','), ...lines].join('\r\n');
}

interface BreakdownLine { label: string; amount: number; sign: '' | '−' | '+' | '='; strong?: boolean; hint?: string }

/**
 * Reportes → Contabilidad: what came in and what it cost for a range of days, the ledger to hand
 * to the accountant, and the cost of each garment.
 */
@Component({
  selector: 'app-accounting-report',
  imports: [DatePickerOnClickDirective, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule,
    MatSnackBarModule, LoadingComponent],
  template: `
    <mat-card class="range-card">
      <div class="range-row">
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Desde</mat-label>
          <input matInput type="date" data-testid="acct-from" [ngModel]="from()" (ngModelChange)="setRange($event, to())" [max]="to()">
        </mat-form-field>
        <mat-form-field appearance="outline" subscriptSizing="dynamic">
          <mat-label>Hasta</mat-label>
          <input matInput type="date" data-testid="acct-to" [ngModel]="to()" (ngModelChange)="setRange(from(), $event)" [min]="from()">
        </mat-form-field>
        <div class="quick">
          <button mat-stroked-button type="button" (click)="thisMonth()">Este mes</button>
          <button mat-stroked-button type="button" data-testid="acct-prev-month" (click)="previousMonth()">Mes anterior</button>
          <button mat-stroked-button type="button" (click)="thisYear()">Este año</button>
        </div>
      </div>
      <p class="note">Las ventas cuentan el día en que se pagaron; los reembolsos, el día en que se hicieron. Los pedidos sin pagar no cuentan.</p>
    </mat-card>

    @if (loading()) { <app-loading /> }
    @if (error()) { <p class="error" role="alert">{{ error() }}</p> }

    @if (report(); as r) {
      @if (warnings().length) {
        <mat-card class="warnings" data-testid="acct-warnings">
          @for (w of warnings(); track w) {
            <p><mat-icon>info</mat-icon><span>{{ w }}</span></p>
          }
        </mat-card>
      }

      <div class="kpis" data-testid="acct-summary">
        <mat-card class="kpi"><span class="label">Total cobrado</span><span class="value">{{ money(r.summary.totalCollected) }}</span><span class="sub">{{ r.summary.paidOrders }} {{ r.summary.paidOrders === 1 ? 'pedido' : 'pedidos' }}</span></mat-card>
        <mat-card class="kpi"><span class="label">Reembolsos</span><span class="value">{{ money(r.summary.refunds) }}</span><span class="sub">{{ r.summary.refundedOrders }} {{ r.summary.refundedOrders === 1 ? 'pedido' : 'pedidos' }}</span></mat-card>
        <mat-card class="kpi"><span class="label">Comisiones de pago</span><span class="value">{{ money(r.summary.paymentFees) }}</span></mat-card>
        <mat-card class="kpi"><span class="label">Guías de envío</span><span class="value">{{ money(r.summary.labelCosts) }}</span></mat-card>
        <mat-card class="kpi"><span class="label">Costo de las prendas</span><span class="value">{{ money(r.summary.costOfGoods) }}</span></mat-card>
        <mat-card class="kpi profit" data-testid="acct-profit"><span class="label">Utilidad bruta</span><span class="value" [class.negative]="r.summary.grossProfit < 0">{{ money(r.summary.grossProfit) }}</span><span class="sub">{{ margin(r) }}</span></mat-card>
      </div>

      <div class="actions">
        <button mat-flat-button color="primary" type="button" data-testid="acct-ledger-download" (click)="downloadLedger()" [disabled]="!r.ledger.length">
          <mat-icon>table_chart</mat-icon> Libro de ventas (Excel)
        </button>
        <button mat-stroked-button type="button" (click)="print()"><mat-icon>print</mat-icon> Imprimir / PDF</button>
      </div>

      <div class="grid">
        <mat-card class="table-card">
          <h3>Desglose</h3>
          <table data-testid="acct-breakdown">
            <tbody>
              @for (l of breakdown(); track l.label) {
                <tr [class.strong]="l.strong">
                  <td class="sign">{{ l.sign }}</td>
                  <td>{{ l.label }} @if (l.hint) { <small>{{ l.hint }}</small> }</td>
                  <td class="num">{{ money(l.amount) }}</td>
                </tr>
              }
            </tbody>
          </table>
        </mat-card>

        <mat-card class="table-card">
          <h3>Por método de pago</h3>
          @if (r.byPaymentMethod.length) {
            <div class="table-wrap">
            <table data-testid="acct-methods">
              <thead><tr><th>Método</th><th class="num">Pedidos</th><th class="num">Cobrado</th><th class="num">Comisiones</th><th class="num">Neto</th></tr></thead>
              <tbody>
                @for (m of r.byPaymentMethod; track m.method) {
                  <tr><td>{{ methodLabel(m.method) }}</td><td class="num">{{ m.orders }}</td><td class="num">{{ money(m.collected) }}</td>
                    <td class="num">{{ money(m.fees) }}</td><td class="num">{{ money(m.collected - m.fees) }}</td></tr>
                }
              </tbody>
            </table>
            </div>
            <p class="note">"Neto" es lo que debería llegar a tu cuenta: compáralo con los depósitos de Stripe y PayPal.</p>
          } @else {
            <p class="note">No hubo ventas pagadas en estas fechas.</p>
          }
        </mat-card>
      </div>
    }

    <mat-card class="table-card costs" data-testid="acct-costs">
      <div class="costs-head">
        <div>
          <h3>Costo de las prendas</h3>
          <p class="note">Lo que te costó cada producto (solo lo ves tú). Con él se calcula la utilidad. Si lo capturas después de vender, se aplica también a las ventas anteriores que no tenían costo.</p>
        </div>
        <mat-form-field appearance="outline" subscriptSizing="dynamic" class="search">
          <mat-label>Buscar producto</mat-label>
          <input matInput [ngModel]="costFilter()" (ngModelChange)="costFilter.set($event)">
        </mat-form-field>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Producto</th><th class="num">Precio</th><th class="num">Costo</th><th class="num">Margen</th><th></th></tr></thead>
          <tbody>
            @for (p of filteredCosts(); track p.id) {
              <tr [class.inactive]="!p.active">
                <td>{{ p.name }} @if (!p.active) { <small>(inactivo)</small> }</td>
                <td class="num">{{ money(p.price) }}</td>
                <td class="num">
                  <input class="cost-input" type="number" min="0" step="0.01" inputmode="decimal"
                         [attr.data-testid]="'cost-input-' + p.id" [attr.aria-label]="'Costo de ' + p.name"
                         [ngModel]="draft()[p.id] ?? p.costPrice" (ngModelChange)="setDraft(p.id, $event)"
                         (keydown.enter)="saveCost(p)">
                </td>
                <td class="num">{{ productMargin(p) }}</td>
                <td>
                  <button mat-button type="button" [attr.data-testid]="'cost-save-' + p.id"
                          [disabled]="!isDirty(p) || saving() === p.id" (click)="saveCost(p)">Guardar</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="note">No hay productos.</td></tr>
            }
          </tbody>
        </table>
      </div>
    </mat-card>
  `,
  styles: `
    :host { display: block; }
    .range-card, .table-card, .warnings { padding: 16px 20px; margin-bottom: 16px; }
    .range-row { display: flex; flex-wrap: wrap; gap: 12px; align-items: center; }
    .range-row mat-form-field { width: 170px; }
    .quick { display: flex; gap: 8px; flex-wrap: wrap; }
    .note { color: var(--mat-sys-on-surface-variant, #666); font-size: .85rem; margin: 8px 0 0; }
    .error { color: #b3261e; }
    .warnings p { display: flex; gap: 8px; align-items: flex-start; margin: 4px 0; font-size: .9rem; }
    .warnings mat-icon { color: #b26a00; flex: none; font-size: 20px; width: 20px; height: 20px; }
    .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(145px, 1fr)); gap: 12px; margin-bottom: 16px; }
    .kpi { padding: 14px 16px; display: flex; flex-direction: column; gap: 2px; }
    .kpi .label { font-size: .8rem; color: var(--mat-sys-on-surface-variant, #666); }
    .kpi .value { font-size: 1.25rem; font-weight: 700; }
    .kpi .sub { font-size: .78rem; color: var(--mat-sys-on-surface-variant, #777); }
    .kpi.profit { border: 2px solid var(--theme-primary, #1565c0); }
    .negative { color: #b3261e; }
    .actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 16px; }
    h3 { margin: 0 0 10px; font-size: 1rem; }
    table { width: 100%; border-collapse: collapse; font-size: .88rem; }
    th { text-align: left; padding: 8px 10px; border-bottom: 2px solid #e0e0e0; white-space: nowrap; }
    td { padding: 7px 10px; border-bottom: 1px solid #f0f0f0; }
    td small { color: #888; display: block; font-size: .75rem; }
    .num { text-align: right; white-space: nowrap; }
    .sign { width: 14px; color: #888; }
    tr.strong td { font-weight: 700; border-top: 1px solid #bdbdbd; }
    .table-wrap { overflow-x: auto; }
    .costs-head { display: flex; flex-wrap: wrap; gap: 12px; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .costs-head > div { flex: 1 1 280px; }
    .search { width: 220px; }
    .cost-input { width: 96px; padding: 6px 8px; border: 1px solid #bdbdbd; border-radius: 6px; text-align: right; font: inherit; }
    tr.inactive td { color: #999; }
    @media (max-width: 600px) {
      .range-row mat-form-field, .search { width: 100%; }
      .range-card, .table-card, .warnings { padding: 12px; }
    }
  `,
})
export class AccountingReportComponent implements OnInit {
  private admin = inject(AdminService);
  private snack = inject(MatSnackBar);

  from = signal('');
  to = signal('');
  loading = signal(false);
  error = signal('');
  report = signal<AccountingReport | null>(null);

  costs = signal<ProductCostItem[]>([]);
  costFilter = signal('');
  draft = signal<Record<number, number | null>>({});
  saving = signal<number | null>(null);

  filteredCosts = computed(() => {
    const q = this.costFilter().trim().toLowerCase();
    return q ? this.costs().filter(p => p.name.toLowerCase().includes(q) || (p.sku ?? '').toLowerCase().includes(q)) : this.costs();
  });

  warnings = computed(() => {
    const s = this.report()?.summary;
    if (!s) return [];
    const w: string[] = [];
    if (s.ordersMissingFee) w.push(`${s.ordersMissingFee} ${s.ordersMissingFee === 1 ? 'pago' : 'pagos'} con tarjeta o PayPal todavía sin comisión: se consultan solas a Stripe y PayPal cada 15 minutos.`);
    if (s.unitsMissingCost) w.push(`${s.unitsMissingCost} ${s.unitsMissingCost === 1 ? 'prenda vendida' : 'prendas vendidas'} sin costo: captúralo abajo, en "Costo de las prendas", para que la utilidad sea real.`);
    if (s.shipmentsMissingCost) w.push(`${s.shipmentsMissingCost} ${s.shipmentsMissingCost === 1 ? 'envío' : 'envíos'} sin costo de guía registrado (guías anteriores a este reporte o hechas fuera de Skydropx).`);
    if (s.paidThenCancelled) w.push(`${s.paidThenCancelled} ${s.paidThenCancelled === 1 ? 'pedido pagado y luego cancelado' : 'pedidos pagados y luego cancelados'} sin reembolso registrado: revisa si devolviste el dinero. Mientras tanto se cuentan como venta.`);
    return w;
  });

  breakdown = computed<BreakdownLine[]>(() => {
    const s = this.report()?.summary;
    if (!s) return [];
    return [
      { sign: '', label: 'Ventas de productos', amount: s.productSales, hint: 'con promociones aplicadas' },
      { sign: '−', label: 'Descuentos (cupones)', amount: s.discounts },
      { sign: '+', label: 'Envío cobrado', amount: s.shippingCharged },
      { sign: '=', label: 'Total cobrado', amount: s.totalCollected, strong: true },
      { sign: '−', label: 'Reembolsos', amount: s.refunds },
      { sign: '=', label: 'Ventas netas', amount: s.netSales, strong: true },
      { sign: '−', label: 'Comisiones de pago', amount: s.paymentFees, hint: 'Stripe y PayPal' },
      { sign: '−', label: 'Guías de envío', amount: s.labelCosts, hint: 'Skydropx' },
      { sign: '−', label: 'Costo de las prendas', amount: s.costOfGoods, hint: 'vendidas menos devueltas' },
      { sign: '=', label: 'Utilidad bruta', amount: s.grossProfit, strong: true, hint: 'antes de impuestos y otros gastos' },
    ];
  });

  ngOnInit(): void {
    this.thisMonth();
    this.loadCosts();
  }

  thisMonth(): void {
    const now = new Date();
    this.setRange(isoDay(new Date(now.getFullYear(), now.getMonth(), 1)), isoDay(now));
  }

  previousMonth(): void {
    const now = new Date();
    this.setRange(isoDay(new Date(now.getFullYear(), now.getMonth() - 1, 1)), isoDay(new Date(now.getFullYear(), now.getMonth(), 0)));
  }

  thisYear(): void {
    const now = new Date();
    this.setRange(isoDay(new Date(now.getFullYear(), 0, 1)), isoDay(now));
  }

  setRange(from: string, to: string): void {
    this.from.set(from);
    this.to.set(to);
    if (from && to && from <= to) this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    this.admin.getAccountingReport(this.from(), this.to()).subscribe({
      next: res => { this.report.set(res.data); this.loading.set(false); },
      error: err => {
        this.loading.set(false);
        this.report.set(null);
        this.error.set(err?.error?.message ?? 'No se pudo cargar el reporte. Intenta de nuevo.');
      },
    });
  }

  loadCosts(): void {
    this.admin.getProductCosts().subscribe({ next: res => this.costs.set(res.data) });
  }

  setDraft(id: number, value: number | string | null): void {
    const v = value === '' || value === null || value === undefined ? null : Number(value);
    this.draft.update(d => ({ ...d, [id]: v }));
  }

  isDirty(p: ProductCostItem): boolean {
    if (!(p.id in this.draft())) return false;
    const v = this.draft()[p.id];
    return v !== p.costPrice && !(v !== null && (Number.isNaN(v) || v < 0));
  }

  saveCost(p: ProductCostItem): void {
    if (!this.isDirty(p)) return;
    const value = this.draft()[p.id];
    this.saving.set(p.id);
    this.admin.setProductCost(p.id, value).subscribe({
      next: res => {
        this.saving.set(null);
        this.costs.update(list => list.map(x => x.id === p.id ? { ...x, costPrice: value === null ? null : Math.round(value * 100) / 100 } : x));
        this.draft.update(d => { const { [p.id]: _, ...rest } = d; return rest; });
        this.snack.open(res.message ?? 'Costo guardado', 'OK', { duration: 3500 });
        if (this.report()) this.load();
      },
      error: err => {
        this.saving.set(null);
        this.snack.open(err?.error?.message ?? 'No se pudo guardar el costo', 'OK', { duration: 4000 });
      },
    });
  }

  productMargin(p: ProductCostItem): string {
    const cost = p.id in this.draft() ? this.draft()[p.id] : p.costPrice;
    if (cost === null || cost === undefined || Number.isNaN(cost) || !p.price) return '—';
    return `${Math.round(((p.price - cost) / p.price) * 100)}%`;
  }

  margin(r: AccountingReport): string {
    return r.summary.netSales > 0 ? `${Math.round((r.summary.grossProfit / r.summary.netSales) * 100)}% de las ventas netas` : '';
  }

  methodLabel(m: string): string {
    return paymentMethodLabel(m);
  }

  money(n: number | null | undefined): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(n ?? 0);
  }

  downloadLedger(): void {
    const r = this.report();
    if (!r) return;
    const blob = new Blob([ledgerCsv(r.ledger)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `libro-de-ventas_${r.from}_a_${r.to}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  print(): void {
    const r = this.report();
    if (!r) return;
    const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const rows = this.breakdown().map(l =>
      `<tr${l.strong ? ' class="s"' : ''}><td>${l.sign}</td><td>${esc(l.label)}</td><td class="n">${this.money(l.amount)}</td></tr>`).join('');
    const methods = r.byPaymentMethod.map(m =>
      `<tr><td>${esc(this.methodLabel(m.method))}</td><td class="n">${m.orders}</td><td class="n">${this.money(m.collected)}</td><td class="n">${this.money(m.fees)}</td><td class="n">${this.money(m.collected - m.fees)}</td></tr>`).join('');
    const warnings = this.warnings().map(w => `<li>${esc(w)}</li>`).join('');
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Contabilidad ${r.from} a ${r.to}</title>
<style>body{font-family:Arial,sans-serif;padding:28px;color:#212121}h1{font-size:1.4em;margin:0 0 4px}
.meta{color:#666;margin:0 0 20px}table{border-collapse:collapse;width:100%;max-width:640px;margin-bottom:24px;font-size:.9em}
td,th{padding:6px 10px;border-bottom:1px solid #e0e0e0;text-align:left}.n{text-align:right}tr.s td{font-weight:700;border-top:1px solid #999}
ul{font-size:.85em;color:#555}</style></head><body>
<h1>Contabilidad</h1><p class="meta">Del ${r.from} al ${r.to} · ventas por fecha de pago, reembolsos por fecha de reembolso</p>
<table><tbody>${rows}</tbody></table>
<h2 style="font-size:1.1em">Por método de pago</h2>
<table><thead><tr><th>Método</th><th class="n">Pedidos</th><th class="n">Cobrado</th><th class="n">Comisiones</th><th class="n">Neto</th></tr></thead><tbody>${methods}</tbody></table>
${warnings ? `<ul>${warnings}</ul>` : ''}
<script>window.print();</script></body></html>`;
    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
  }
}
