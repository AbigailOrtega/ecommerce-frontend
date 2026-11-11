import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminService } from '@core/services/admin.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { AccountingReportComponent, isoDay } from './accounting-report/accounting-report.component';
import { ApiResponse, InventoryItem, ProductSalesItem, SalesDataPoint, SalesReport } from '@shared/models';

type ReportData = SalesReport | ProductSalesItem[] | InventoryItem[];

type ReportType = 'sales' | 'top' | 'least' | 'inventory' | 'outofstock' | 'accounting';
type SalesPeriod = 'week' | 'month' | 'year' | 'custom';

/** The days a shortcut covers, up to today: the last 7 days, this month or this year. */
export function presetRange(p: Exclude<SalesPeriod, 'custom'>, today = new Date()): { from: string; to: string } {
  const start = p === 'week' ? new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)
              : p === 'year' ? new Date(today.getFullYear(), 0, 1)
              : new Date(today.getFullYear(), today.getMonth(), 1);
  return { from: isoDay(start), to: isoDay(today) };
}

@Component({
    selector: 'app-reports',
    imports: [
        RouterLink, FormsModule,
        MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
        MatProgressSpinnerModule, MatTooltipModule,
        LoadingComponent, AccountingReportComponent,
    ],
    templateUrl: './reports.component.html',
    styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;

  reportType: ReportType = 'sales';
  period: SalesPeriod = 'month';
  from = presetRange('month').from;
  to = presetRange('month').to;
  loading = false;
  hasData = false;
  dataLoaded = false;

  salesReport: SalesReport | null = null;
  productItems: ProductSalesItem[] = [];
  inventoryItems: InventoryItem[] = [];

  kpis: { icon: string; value: string; label: string }[] = [];
  tableHeaders: string[] = [];
  tableRows: string[][] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadReport();
  }

  selectType(type: ReportType): void {
    this.reportType = type;
    // the accounts have their own screen, with its own dates and loading
    if (type === 'accounting') return;
    this.loadReport();
  }

  setPeriod(p: Exclude<SalesPeriod, 'custom'>): void {
    this.period = p;
    ({ from: this.from, to: this.to } = presetRange(p));
    this.loadReport();
  }

  /** Dates typed by the admin; loads once both are set and in order. */
  setRange(from: string, to: string): void {
    this.from = from;
    this.to = to;
    this.period = 'custom';
    if (this.rangeValid()) this.loadReport();
  }

  rangeValid(): boolean {
    return !!this.from && !!this.to && this.from <= this.to;
  }

  loadReport(): void {
    this.loading = true;
    this.hasData = false;
    this.dataLoaded = false;

    const obs: Observable<ApiResponse<ReportData>> = this.reportType === 'sales'   ? this.adminService.getSalesReport(this.from, this.to)
              : this.reportType === 'top'     ? this.adminService.getTopSellingProducts()
              : this.reportType === 'least'   ? this.adminService.getLeastSellingProducts()
              : this.reportType === 'inventory' ? this.adminService.getInventoryReport()
              : this.adminService.getOutOfStockProducts();

    obs.subscribe({
      next: (res) => {
        this.loading = false;
        this.dataLoaded = true;
        this.processData(res.data);
        if (this.hasData) setTimeout(() => this.drawChart(), 60);
      },
      error: () => { this.loading = false; this.dataLoaded = true; },
    });
  }

  private processData(data: ReportData): void {
    if (this.reportType === 'sales') {
      this.salesReport = data as SalesReport;
      const points = this.salesReport.data;
      this.hasData = points.length > 0;
      if (!this.hasData) return;
      const avg = points.length ? this.salesReport.totalRevenue / points.length : 0;
      this.kpis = [
        { icon: 'shopping_bag', value: String(this.salesReport.totalOrders), label: 'Pedidos' },
        { icon: 'attach_money', value: this.fmtCurrency(this.salesReport.totalRevenue), label: 'Ingresos totales' },
        { icon: 'trending_up', value: this.fmtCurrency(avg), label: 'Promedio por día' },
      ];
      this.tableHeaders = ['Fecha', 'Pedidos', 'Ingresos'];
      this.tableRows = points.map(p => [p.date, String(p.orderCount), this.fmtCurrency(p.revenue)]);

    } else if (this.reportType === 'top' || this.reportType === 'least') {
      this.productItems = data as ProductSalesItem[];
      this.hasData = this.productItems.length > 0;
      if (!this.hasData) return;
      const totalUnits = this.productItems.reduce((s, i) => s + i.unitsSold, 0);
      const totalRev = this.productItems.reduce((s, i) => s + i.revenue, 0);
      this.kpis = [
        { icon: 'inventory_2', value: String(this.productItems.length), label: 'Productos' },
        { icon: 'shopping_cart', value: String(totalUnits), label: 'Unidades vendidas' },
        { icon: 'attach_money', value: this.fmtCurrency(totalRev), label: 'Ingresos totales' },
      ];
      this.tableHeaders = ['Producto', 'Unidades vendidas', 'Ingresos', 'Stock actual'];
      this.tableRows = this.productItems.map(p => [
        p.productName, String(p.unitsSold), this.fmtCurrency(p.revenue), String(p.currentStock)
      ]);

    } else {
      this.inventoryItems = data as InventoryItem[];
      this.hasData = this.inventoryItems.length > 0;
      if (!this.hasData) return;
      const inStock = this.inventoryItems.filter(i => i.stock > 0).length;
      const zeroStock = this.inventoryItems.filter(i => i.stock === 0).length;
      this.kpis = [
        { icon: 'inventory_2', value: String(this.inventoryItems.length), label: 'Productos totales' },
        { icon: 'check_circle', value: String(inStock), label: 'Con stock' },
        { icon: 'warning', value: String(zeroStock), label: 'Sin stock' },
      ];
      const isOutOfStock = this.reportType === 'outofstock';
      this.tableHeaders = isOutOfStock
        ? ['Producto', 'SKU', 'Stock total', 'Sin existencia', 'Precio', 'Activo']
        : ['Producto', 'SKU', 'Stock', 'Precio', 'Activo'];
      this.tableRows = this.inventoryItems.map(i => isOutOfStock
        ? [i.name, i.sku ?? '—', String(i.stock), (i.outOfStockVariants && i.outOfStockVariants.length > 0) ? i.outOfStockVariants.join(', ') : '—', this.fmtCurrency(i.price), i.active ? 'Sí' : 'No']
        : [i.name, i.sku ?? '—', String(i.stock), this.fmtCurrency(i.price), i.active ? 'Sí' : 'No']
      );
    }
  }

  // ── Chart drawing ─────────────────────────────────────────────────────────

  private drawChart(): void {
    const canvas = this.chartRef?.nativeElement;
    if (!canvas) return;

    if (this.reportType === 'sales' && this.salesReport) {
      const pts = this.salesReport.data;
      this.drawLineChart(canvas,
        pts.map(p => p.date.slice(5)),
        pts.map(p => Number(p.revenue)),
        `Ventas – ${this.salesReport.period}`,
        '#1565c0');

    } else if (this.reportType === 'top' || this.reportType === 'least') {
      const color = this.reportType === 'top' ? '#2e7d32' : '#ef6c00';
      this.drawHBarChart(canvas,
        this.productItems.slice(0, 15).map(p => p.productName),
        this.productItems.slice(0, 15).map(p => p.unitsSold),
        this.reportType === 'top' ? 'Productos más vendidos (unidades)' : 'Productos menos vendidos (unidades)',
        color);

    } else if (this.reportType === 'inventory') {
      const top20 = [...this.inventoryItems].sort((a, b) => b.stock - a.stock).slice(0, 20);
      this.drawHBarChart(canvas, top20.map(i => i.name), top20.map(i => i.stock),
        'Inventario – Top 20 por stock', '#1565c0');

    } else {
      // outofstock – just show a simple message on canvas
      const W = canvas.parentElement?.clientWidth || 800;
      canvas.width = W;
      canvas.height = 100;
      const ctx = canvas.getContext('2d')!;
      ctx.clearRect(0, 0, W, 100);
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, W, 100);
      ctx.fillStyle = '#e53935';
      ctx.font = 'bold 16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${this.inventoryItems.length} productos sin stock`, W / 2, 56);
    }
  }

  private drawLineChart(canvas: HTMLCanvasElement, labels: string[], values: number[], title: string, color: string): void {
    const W = canvas.parentElement?.clientWidth || 800;
    const H = 360;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const P = { t: 52, r: 24, b: 64, l: 90 };
    const cW = W - P.l - P.r;
    const cH = H - P.t - P.b;
    const n = values.length;
    const max = Math.max(...values, 1) * 1.1;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);

    // Title
    ctx.fillStyle = '#212121';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, W / 2, 30);

    const GRIDS = 5;
    for (let i = 0; i <= GRIDS; i++) {
      const y = P.t + cH - (i / GRIDS) * cH;
      ctx.strokeStyle = '#e0e0e0';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(P.l, y); ctx.lineTo(P.l + cW, y); ctx.stroke();
      ctx.fillStyle = '#888';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(this.fmtCurrency((i / GRIDS) * max), P.l - 6, y + 4);
    }

    if (n < 2) return;
    const step = cW / (n - 1);

    // Fill
    ctx.fillStyle = color + '1a';
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - (v / max) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(P.l + (n - 1) * step, P.t + cH);
    ctx.lineTo(P.l, P.t + cH);
    ctx.closePath();
    ctx.fill();

    // Line
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - (v / max) * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Dots
    ctx.fillStyle = color;
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - (v / max) * cH;
      ctx.beginPath(); ctx.arc(x, y, 3.5, 0, Math.PI * 2); ctx.fill();
    });

    // X labels
    const maxLbls = Math.min(n, 12);
    const lblStep = Math.ceil(n / maxLbls);
    ctx.fillStyle = '#666';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    labels.forEach((l, i) => {
      if (i % lblStep === 0 || i === n - 1) {
        ctx.fillText(l, P.l + i * step, P.t + cH + 18);
      }
    });
  }

  private drawHBarChart(canvas: HTMLCanvasElement, labels: string[], values: number[], title: string, color: string): void {
    const W = canvas.parentElement?.clientWidth || 800;
    const BAR_H = 26;
    const BAR_GAP = 14;
    const P = { t: 52, r: 90, b: 20, l: 210 };
    const H = P.t + labels.length * (BAR_H + BAR_GAP) + P.b;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d')!;
    const cW = W - P.l - P.r;
    const max = Math.max(...values, 1) * 1.1;

    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#212121';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(title, W / 2, 30);

    labels.forEach((lbl, i) => {
      const y = P.t + i * (BAR_H + BAR_GAP);
      const bW = (values[i] / max) * cW;

      ctx.fillStyle = color + '22';
      ctx.fillRect(P.l, y, cW, BAR_H);
      ctx.fillStyle = color;
      ctx.fillRect(P.l, y, bW, BAR_H);

      ctx.fillStyle = '#333';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'right';
      const short = lbl.length > 28 ? lbl.slice(0, 25) + '…' : lbl;
      ctx.fillText(short, P.l - 8, y + BAR_H / 2 + 4);

      ctx.fillStyle = '#555';
      ctx.textAlign = 'left';
      ctx.fillText(String(values[i]), P.l + bW + 6, y + BAR_H / 2 + 4);
    });
  }

  // ── Downloads ─────────────────────────────────────────────────────────────

  downloadImage(): void {
    const canvas = this.chartRef?.nativeElement;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = `reporte-${this.reportType}-${Date.now()}.png`;
    a.click();
  }

  downloadExcel(): void {
    const bom = '\uFEFF';
    const csvHeaders = this.tableHeaders.join(',');
    const csvRows = this.tableRows.map(r => r.map(c => `"${c}"`).join(','));
    const csv = bom + [csvHeaders, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `reporte-${this.reportType}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  downloadPDF(): void {
    const canvas = this.chartRef?.nativeElement;
    const chartImg = canvas ? canvas.toDataURL('image/png') : '';
    const dateStr = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = this.reportTitle();
    const thead = this.tableHeaders.map(h => `<th>${h}</th>`).join('');
    const tbody = this.tableRows.map(r =>
      `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`
    ).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>${title}</title>
<style>
  body{font-family:Arial,sans-serif;padding:28px;color:#212121}
  h1{color:#1565c0;border-bottom:2px solid #1565c0;padding-bottom:8px;margin-bottom:4px}
  .meta{color:#777;font-size:.85em;margin-bottom:20px}
  img{max-width:100%;border:1px solid #e0e0e0;border-radius:6px;margin-bottom:20px;display:block}
  table{width:100%;border-collapse:collapse;font-size:.88em}
  th{background:#1565c0;color:#fff;padding:8px 12px;text-align:left}
  td{padding:6px 12px;border-bottom:1px solid #e0e0e0}
  tr:nth-child(even) td{background:#f8f8f8}
</style></head><body>
<h1>${title}</h1>
<p class="meta">Generado: ${dateStr}</p>
${chartImg ? `<img src="${chartImg}" />` : ''}
<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
<script>window.print();</script>
</body></html>`;

    const w = window.open('', '_blank');
    if (w) { w.document.write(html); w.document.close(); }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────

  private reportTitle(): string {
    const map: Record<ReportType, string> = {
      sales: `Ventas – ${this.salesReport?.period ?? ''}`,
      top: 'Productos más vendidos',
      least: 'Productos menos vendidos',
      inventory: 'Inventario',
      outofstock: 'Productos sin stock',
      accounting: 'Contabilidad',
    };
    return map[this.reportType];
  }

  private fmtCurrency(n: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(n);
  }
}
