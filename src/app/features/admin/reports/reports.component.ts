import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AdminService } from '@core/services/admin.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { InventoryItem, ProductSalesItem, SalesDataPoint, SalesReport } from '@shared/models';

type ReportType = 'sales' | 'top' | 'least' | 'inventory' | 'outofstock';
type SalesPeriod = 'week' | 'month' | 'year';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    RouterLink, CurrencyPipe, DatePipe, DecimalPipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatProgressSpinnerModule, MatTooltipModule,
    LoadingComponent,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Reportes</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <!-- ── Type selector ───────────────────────────────────── -->
      <mat-card class="selector-card">
        <div class="type-row">
          <button mat-stroked-button [class.active-type]="reportType === 'sales'"
                  (click)="selectType('sales')">
            <mat-icon>show_chart</mat-icon> Ventas
          </button>
          <button mat-stroked-button [class.active-type]="reportType === 'top'"
                  (click)="selectType('top')">
            <mat-icon>emoji_events</mat-icon> Más vendidos
          </button>
          <button mat-stroked-button [class.active-type]="reportType === 'least'"
                  (click)="selectType('least')">
            <mat-icon>trending_down</mat-icon> Menos vendidos
          </button>
          <button mat-stroked-button [class.active-type]="reportType === 'inventory'"
                  (click)="selectType('inventory')">
            <mat-icon>inventory_2</mat-icon> Inventario
          </button>
          <button mat-stroked-button [class.active-type]="reportType === 'outofstock'"
                  (click)="selectType('outofstock')">
            <mat-icon>warning</mat-icon> Sin stock
          </button>
        </div>

        @if (reportType === 'sales') {
          <div class="period-row">
            <span class="period-label">Período:</span>
            <button mat-stroked-button [class.active-period]="period === 'week'"
                    (click)="setPeriod('week')">Semana</button>
            <button mat-stroked-button [class.active-period]="period === 'month'"
                    (click)="setPeriod('month')">Mes</button>
            <button mat-stroked-button [class.active-period]="period === 'year'"
                    (click)="setPeriod('year')">Año</button>
          </div>
        }
      </mat-card>

      <!-- ── Loading ─────────────────────────────────────────── -->
      @if (loading) {
        <app-loading />
      }

      <!-- ── Summary KPIs ────────────────────────────────────── -->
      @if (!loading && hasData) {
        <div class="kpi-row">
          @for (kpi of kpis; track kpi.label) {
            <mat-card class="kpi-card">
              <mat-icon>{{ kpi.icon }}</mat-icon>
              <div>
                <p class="kpi-value">{{ kpi.value }}</p>
                <p class="kpi-label">{{ kpi.label }}</p>
              </div>
            </mat-card>
          }
        </div>

        <!-- ── Chart ──────────────────────────────────────────── -->
        <mat-card class="chart-card">
          <canvas #chart></canvas>
        </mat-card>

        <!-- ── Download row ────────────────────────────────────── -->
        <div class="download-row">
          <button mat-raised-button color="primary" (click)="downloadPDF()">
            <mat-icon>picture_as_pdf</mat-icon> PDF
          </button>
          <button mat-raised-button color="accent" (click)="downloadExcel()">
            <mat-icon>table_chart</mat-icon> Excel
          </button>
          <button mat-raised-button (click)="downloadImage()">
            <mat-icon>image</mat-icon> Imagen
          </button>
        </div>

        <!-- ── Data table ──────────────────────────────────────── -->
        <mat-card class="table-card">
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  @for (h of tableHeaders; track h) {
                    <th>{{ h }}</th>
                  }
                </tr>
              </thead>
              <tbody>
                @for (row of tableRows; track $index) {
                  <tr>
                    @for (cell of row; track $index) {
                      <td>{{ cell }}</td>
                    }
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </mat-card>
      }

      @if (!loading && !hasData && dataLoaded) {
        <div class="empty-state">
          <mat-icon>bar_chart</mat-icon>
          <p>No hay datos disponibles para este reporte.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .container { margin: 0 auto; padding: 24px 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header h1 { margin: 0; }

    /* Selector */
    .selector-card { padding: 16px 20px; margin-bottom: 20px; }
    .type-row { display: flex; gap: 10px; flex-wrap: wrap; }
    .type-row button { display: flex; align-items: center; gap: 6px; }
    .type-row mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .period-row { display: flex; align-items: center; gap: 10px; margin-top: 16px; padding-top: 16px; border-top: 1px solid #e0e0e0; }
    .period-label { font-size: 0.9rem; color: #666; }
    .active-type { background: var(--theme-primary) !important; color: white !important; }
    .active-period { background: #1565c0 !important; color: white !important; }

    /* KPIs */
    .kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 20px; }
    .kpi-card { display: flex; align-items: center; gap: 14px; padding: 16px 20px; }
    .kpi-card mat-icon { font-size: 32px; width: 32px; height: 32px; color: var(--theme-primary); }
    .kpi-value { margin: 0; font-size: 1.3rem; font-weight: 700; color: #212121; }
    .kpi-label { margin: 2px 0 0; font-size: 0.8rem; color: #777; }

    /* Chart */
    .chart-card { padding: 16px; margin-bottom: 16px; overflow: hidden; }
    canvas { display: block; width: 100%; }

    /* Downloads */
    .download-row { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }

    /* Table */
    .table-card { padding: 0; overflow: hidden; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
    th { background: #1565c0; color: white; padding: 10px 14px; text-align: left; white-space: nowrap; }
    td { padding: 8px 14px; border-bottom: 1px solid #f0f0f0; }
    tr:nth-child(even) td { background: #fafafa; }
    tr:hover td { background: #f5f5f5; }

    /* Empty */
    .empty-state { text-align: center; padding: 60px 16px; color: #aaa; }
    .empty-state mat-icon { font-size: 56px; width: 56px; height: 56px; margin-bottom: 12px; }
    .empty-state p { font-size: 1rem; margin: 0; }
  `],
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chartRef!: ElementRef<HTMLCanvasElement>;

  reportType: ReportType = 'sales';
  period: SalesPeriod = 'month';
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
    this.loadReport();
  }

  setPeriod(p: SalesPeriod): void {
    this.period = p;
    this.loadReport();
  }

  loadReport(): void {
    this.loading = true;
    this.hasData = false;
    this.dataLoaded = false;

    const obs: Observable<any> = this.reportType === 'sales'   ? this.adminService.getSalesReport(this.period)
              : this.reportType === 'top'     ? this.adminService.getTopSellingProducts()
              : this.reportType === 'least'   ? this.adminService.getLeastSellingProducts()
              : this.reportType === 'inventory' ? this.adminService.getInventoryReport()
              : this.adminService.getOutOfStockProducts();

    obs.subscribe({
      next: (res: any) => {
        this.loading = false;
        this.dataLoaded = true;
        this.processData(res.data);
        if (this.hasData) setTimeout(() => this.drawChart(), 60);
      },
      error: () => { this.loading = false; this.dataLoaded = true; },
    });
  }

  private processData(data: any): void {
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
      this.tableHeaders = ['Producto', 'SKU', 'Stock', 'Precio', 'Activo'];
      this.tableRows = this.inventoryItems.map(i => [
        i.name, i.sku ?? '—', String(i.stock), this.fmtCurrency(i.price), i.active ? 'Sí' : 'No'
      ]);
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
    };
    return map[this.reportType];
  }

  private fmtCurrency(n: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 }).format(n);
  }
}
