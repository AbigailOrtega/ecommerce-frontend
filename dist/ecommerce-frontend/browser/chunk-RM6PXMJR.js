import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  MatTooltipModule
} from "./chunk-JITF7FU4.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import {
  MatProgressSpinnerModule
} from "./chunk-4Y3BE5O3.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import "./chunk-W6S7N6HL.js";
import "./chunk-VTPZX5UP.js";
import "./chunk-J25CCJ4O.js";
import "./chunk-SAONJULU.js";
import "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  MatAnchor,
  MatButton,
  MatButtonModule
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-N3527UH3.js";

// src/app/features/admin/reports/reports.component.ts
var _c0 = ["chart"];
var _forTrack0 = ($index, $item) => $item.label;
function ReportsComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7)(1, "span", 9);
    \u0275\u0275text(2, "Per\xEDodo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 6);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_28_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("week"));
    });
    \u0275\u0275text(4, "Semana");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 6);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("month"));
    });
    \u0275\u0275text(6, "Mes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 6);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_28_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setPeriod("year"));
    });
    \u0275\u0275text(8, "A\xF1o");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275classProp("active-period", ctx_r1.period === "week");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active-period", ctx_r1.period === "month");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("active-period", ctx_r1.period === "year");
  }
}
function ReportsComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function ReportsComponent_Conditional_30_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "p", 19);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 20);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const kpi_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r4.icon);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kpi_r4.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kpi_r4.label);
  }
}
function ReportsComponent_Conditional_30_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const h_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(h_r5);
  }
}
function ReportsComponent_Conditional_30_For_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cell_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cell_r6);
  }
}
function ReportsComponent_Conditional_30_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr");
    \u0275\u0275repeaterCreate(1, ReportsComponent_Conditional_30_For_28_For_2_Template, 2, 1, "td", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(row_r7);
  }
}
function ReportsComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 10);
    \u0275\u0275repeaterCreate(1, ReportsComponent_Conditional_30_For_2_Template, 8, 3, "mat-card", 11, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-card", 12);
    \u0275\u0275element(4, "canvas", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 13)(7, "button", 14);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_30_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadPDF());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "picture_as_pdf");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " PDF ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 15);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_30_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadExcel());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "table_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(14, " Excel ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 16);
    \u0275\u0275listener("click", function ReportsComponent_Conditional_30_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.downloadImage());
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "image");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Imagen ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-card", 17)(20, "div", 18)(21, "table")(22, "thead")(23, "tr");
    \u0275\u0275repeaterCreate(24, ReportsComponent_Conditional_30_For_25_Template, 2, 1, "th", null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "tbody");
    \u0275\u0275repeaterCreate(27, ReportsComponent_Conditional_30_For_28_Template, 3, 0, "tr", null, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.kpis);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.tableHeaders);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r1.tableRows);
  }
}
function ReportsComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 8)(1, "mat-icon");
    \u0275\u0275text(2, "bar_chart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No hay datos disponibles para este reporte.");
    \u0275\u0275elementEnd()();
  }
}
var ReportsComponent = class _ReportsComponent {
  constructor(adminService) {
    this.adminService = adminService;
    this.reportType = "sales";
    this.period = "month";
    this.loading = false;
    this.hasData = false;
    this.dataLoaded = false;
    this.salesReport = null;
    this.productItems = [];
    this.inventoryItems = [];
    this.kpis = [];
    this.tableHeaders = [];
    this.tableRows = [];
  }
  ngOnInit() {
    this.loadReport();
  }
  selectType(type) {
    this.reportType = type;
    this.loadReport();
  }
  setPeriod(p) {
    this.period = p;
    this.loadReport();
  }
  loadReport() {
    this.loading = true;
    this.hasData = false;
    this.dataLoaded = false;
    const obs = this.reportType === "sales" ? this.adminService.getSalesReport(this.period) : this.reportType === "top" ? this.adminService.getTopSellingProducts() : this.reportType === "least" ? this.adminService.getLeastSellingProducts() : this.reportType === "inventory" ? this.adminService.getInventoryReport() : this.adminService.getOutOfStockProducts();
    obs.subscribe({
      next: (res) => {
        this.loading = false;
        this.dataLoaded = true;
        this.processData(res.data);
        if (this.hasData)
          setTimeout(() => this.drawChart(), 60);
      },
      error: () => {
        this.loading = false;
        this.dataLoaded = true;
      }
    });
  }
  processData(data) {
    if (this.reportType === "sales") {
      this.salesReport = data;
      const points = this.salesReport.data;
      this.hasData = points.length > 0;
      if (!this.hasData)
        return;
      const avg = points.length ? this.salesReport.totalRevenue / points.length : 0;
      this.kpis = [
        { icon: "shopping_bag", value: String(this.salesReport.totalOrders), label: "Pedidos" },
        { icon: "attach_money", value: this.fmtCurrency(this.salesReport.totalRevenue), label: "Ingresos totales" },
        { icon: "trending_up", value: this.fmtCurrency(avg), label: "Promedio por d\xEDa" }
      ];
      this.tableHeaders = ["Fecha", "Pedidos", "Ingresos"];
      this.tableRows = points.map((p) => [p.date, String(p.orderCount), this.fmtCurrency(p.revenue)]);
    } else if (this.reportType === "top" || this.reportType === "least") {
      this.productItems = data;
      this.hasData = this.productItems.length > 0;
      if (!this.hasData)
        return;
      const totalUnits = this.productItems.reduce((s, i) => s + i.unitsSold, 0);
      const totalRev = this.productItems.reduce((s, i) => s + i.revenue, 0);
      this.kpis = [
        { icon: "inventory_2", value: String(this.productItems.length), label: "Productos" },
        { icon: "shopping_cart", value: String(totalUnits), label: "Unidades vendidas" },
        { icon: "attach_money", value: this.fmtCurrency(totalRev), label: "Ingresos totales" }
      ];
      this.tableHeaders = ["Producto", "Unidades vendidas", "Ingresos", "Stock actual"];
      this.tableRows = this.productItems.map((p) => [
        p.productName,
        String(p.unitsSold),
        this.fmtCurrency(p.revenue),
        String(p.currentStock)
      ]);
    } else {
      this.inventoryItems = data;
      this.hasData = this.inventoryItems.length > 0;
      if (!this.hasData)
        return;
      const inStock = this.inventoryItems.filter((i) => i.stock > 0).length;
      const zeroStock = this.inventoryItems.filter((i) => i.stock === 0).length;
      this.kpis = [
        { icon: "inventory_2", value: String(this.inventoryItems.length), label: "Productos totales" },
        { icon: "check_circle", value: String(inStock), label: "Con stock" },
        { icon: "warning", value: String(zeroStock), label: "Sin stock" }
      ];
      this.tableHeaders = ["Producto", "SKU", "Stock", "Precio", "Activo"];
      this.tableRows = this.inventoryItems.map((i) => [
        i.name,
        i.sku ?? "\u2014",
        String(i.stock),
        this.fmtCurrency(i.price),
        i.active ? "S\xED" : "No"
      ]);
    }
  }
  // ── Chart drawing ─────────────────────────────────────────────────────────
  drawChart() {
    const canvas = this.chartRef?.nativeElement;
    if (!canvas)
      return;
    if (this.reportType === "sales" && this.salesReport) {
      const pts = this.salesReport.data;
      this.drawLineChart(canvas, pts.map((p) => p.date.slice(5)), pts.map((p) => Number(p.revenue)), `Ventas \u2013 ${this.salesReport.period}`, "#1565c0");
    } else if (this.reportType === "top" || this.reportType === "least") {
      const color = this.reportType === "top" ? "#2e7d32" : "#ef6c00";
      this.drawHBarChart(canvas, this.productItems.slice(0, 15).map((p) => p.productName), this.productItems.slice(0, 15).map((p) => p.unitsSold), this.reportType === "top" ? "Productos m\xE1s vendidos (unidades)" : "Productos menos vendidos (unidades)", color);
    } else if (this.reportType === "inventory") {
      const top20 = [...this.inventoryItems].sort((a, b) => b.stock - a.stock).slice(0, 20);
      this.drawHBarChart(canvas, top20.map((i) => i.name), top20.map((i) => i.stock), "Inventario \u2013 Top 20 por stock", "#1565c0");
    } else {
      const W = canvas.parentElement?.clientWidth || 800;
      canvas.width = W;
      canvas.height = 100;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, W, 100);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, W, 100);
      ctx.fillStyle = "#e53935";
      ctx.font = "bold 16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(`${this.inventoryItems.length} productos sin stock`, W / 2, 56);
    }
  }
  drawLineChart(canvas, labels, values, title, color) {
    const W = canvas.parentElement?.clientWidth || 800;
    const H = 360;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const P = { t: 52, r: 24, b: 64, l: 90 };
    const cW = W - P.l - P.r;
    const cH = H - P.t - P.b;
    const n = values.length;
    const max = Math.max(...values, 1) * 1.1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#212121";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, W / 2, 30);
    const GRIDS = 5;
    for (let i = 0; i <= GRIDS; i++) {
      const y = P.t + cH - i / GRIDS * cH;
      ctx.strokeStyle = "#e0e0e0";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(P.l, y);
      ctx.lineTo(P.l + cW, y);
      ctx.stroke();
      ctx.fillStyle = "#888";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(this.fmtCurrency(i / GRIDS * max), P.l - 6, y + 4);
    }
    if (n < 2)
      return;
    const step = cW / (n - 1);
    ctx.fillStyle = color + "1a";
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - v / max * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.lineTo(P.l + (n - 1) * step, P.t + cH);
    ctx.lineTo(P.l, P.t + cH);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - v / max * cH;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = color;
    values.forEach((v, i) => {
      const x = P.l + i * step;
      const y = P.t + cH - v / max * cH;
      ctx.beginPath();
      ctx.arc(x, y, 3.5, 0, Math.PI * 2);
      ctx.fill();
    });
    const maxLbls = Math.min(n, 12);
    const lblStep = Math.ceil(n / maxLbls);
    ctx.fillStyle = "#666";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    labels.forEach((l, i) => {
      if (i % lblStep === 0 || i === n - 1) {
        ctx.fillText(l, P.l + i * step, P.t + cH + 18);
      }
    });
  }
  drawHBarChart(canvas, labels, values, title, color) {
    const W = canvas.parentElement?.clientWidth || 800;
    const BAR_H = 26;
    const BAR_GAP = 14;
    const P = { t: 52, r: 90, b: 20, l: 210 };
    const H = P.t + labels.length * (BAR_H + BAR_GAP) + P.b;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const cW = W - P.l - P.r;
    const max = Math.max(...values, 1) * 1.1;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = "#212121";
    ctx.font = "bold 15px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(title, W / 2, 30);
    labels.forEach((lbl, i) => {
      const y = P.t + i * (BAR_H + BAR_GAP);
      const bW = values[i] / max * cW;
      ctx.fillStyle = color + "22";
      ctx.fillRect(P.l, y, cW, BAR_H);
      ctx.fillStyle = color;
      ctx.fillRect(P.l, y, bW, BAR_H);
      ctx.fillStyle = "#333";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "right";
      const short = lbl.length > 28 ? lbl.slice(0, 25) + "\u2026" : lbl;
      ctx.fillText(short, P.l - 8, y + BAR_H / 2 + 4);
      ctx.fillStyle = "#555";
      ctx.textAlign = "left";
      ctx.fillText(String(values[i]), P.l + bW + 6, y + BAR_H / 2 + 4);
    });
  }
  // ── Downloads ─────────────────────────────────────────────────────────────
  downloadImage() {
    const canvas = this.chartRef?.nativeElement;
    if (!canvas)
      return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `reporte-${this.reportType}-${Date.now()}.png`;
    a.click();
  }
  downloadExcel() {
    const bom = "\uFEFF";
    const csvHeaders = this.tableHeaders.join(",");
    const csvRows = this.tableRows.map((r) => r.map((c) => `"${c}"`).join(","));
    const csv = bom + [csvHeaders, ...csvRows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reporte-${this.reportType}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }
  downloadPDF() {
    const canvas = this.chartRef?.nativeElement;
    const chartImg = canvas ? canvas.toDataURL("image/png") : "";
    const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" });
    const title = this.reportTitle();
    const thead = this.tableHeaders.map((h) => `<th>${h}</th>`).join("");
    const tbody = this.tableRows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("");
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
${chartImg ? `<img src="${chartImg}" />` : ""}
<table><thead><tr>${thead}</tr></thead><tbody>${tbody}</tbody></table>
<script>window.print();<\/script>
</body></html>`;
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(html);
      w.document.close();
    }
  }
  // ── Helpers ───────────────────────────────────────────────────────────────
  reportTitle() {
    const map = {
      sales: `Ventas \u2013 ${this.salesReport?.period ?? ""}`,
      top: "Productos m\xE1s vendidos",
      least: "Productos menos vendidos",
      inventory: "Inventario",
      outofstock: "Productos sin stock"
    };
    return map[this.reportType];
  }
  fmtCurrency(n) {
    return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN", minimumFractionDigits: 2 }).format(n);
  }
  static {
    this.\u0275fac = function ReportsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReportsComponent)(\u0275\u0275directiveInject(AdminService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], viewQuery: function ReportsComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 32, vars: 14, consts: [["chart", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "selector-card"], [1, "type-row"], ["mat-stroked-button", "", 3, "click"], [1, "period-row"], [1, "empty-state"], [1, "period-label"], [1, "kpi-row"], [1, "kpi-card"], [1, "chart-card"], [1, "download-row"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["mat-raised-button", "", 3, "click"], [1, "table-card"], [1, "table-wrap"], [1, "kpi-value"], [1, "kpi-label"]], template: function ReportsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Reportes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-card", 4)(7, "div", 5)(8, "button", 6);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_8_listener() {
          return ctx.selectType("sales");
        });
        \u0275\u0275elementStart(9, "mat-icon");
        \u0275\u0275text(10, "show_chart");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Ventas ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "button", 6);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_12_listener() {
          return ctx.selectType("top");
        });
        \u0275\u0275elementStart(13, "mat-icon");
        \u0275\u0275text(14, "emoji_events");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " M\xE1s vendidos ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "button", 6);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_16_listener() {
          return ctx.selectType("least");
        });
        \u0275\u0275elementStart(17, "mat-icon");
        \u0275\u0275text(18, "trending_down");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " Menos vendidos ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "button", 6);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_20_listener() {
          return ctx.selectType("inventory");
        });
        \u0275\u0275elementStart(21, "mat-icon");
        \u0275\u0275text(22, "inventory_2");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Inventario ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "button", 6);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_24_listener() {
          return ctx.selectType("outofstock");
        });
        \u0275\u0275elementStart(25, "mat-icon");
        \u0275\u0275text(26, "warning");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Sin stock ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(28, ReportsComponent_Conditional_28_Template, 9, 6, "div", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, ReportsComponent_Conditional_29_Template, 1, 0, "app-loading")(30, ReportsComponent_Conditional_30_Template, 29, 0)(31, ReportsComponent_Conditional_31_Template, 5, 0, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275classProp("active-type", ctx.reportType === "sales");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active-type", ctx.reportType === "top");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active-type", ctx.reportType === "least");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active-type", ctx.reportType === "inventory");
        \u0275\u0275advance(4);
        \u0275\u0275classProp("active-type", ctx.reportType === "outofstock");
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.reportType === "sales" ? 28 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 29 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading && ctx.hasData ? 30 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(!ctx.loading && !ctx.hasData && ctx.dataLoaded ? 31 : -1);
      }
    }, dependencies: [
      RouterLink,
      MatCardModule,
      MatCard,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconModule,
      MatIcon,
      MatProgressSpinnerModule,
      MatTooltipModule,
      LoadingComponent
    ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  padding: 24px 16px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.selector-card[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  margin-bottom: 20px;\n}\n.type-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  flex-wrap: wrap;\n}\n.type-row[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.type-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.period-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 16px;\n  padding-top: 16px;\n  border-top: 1px solid #e0e0e0;\n}\n.period-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #666;\n}\n.active-type[_ngcontent-%COMP%] {\n  background: var(--theme-primary) !important;\n  color: white !important;\n}\n.active-period[_ngcontent-%COMP%] {\n  background: #1565c0 !important;\n  color: white !important;\n}\n.kpi-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n  margin-bottom: 20px;\n}\n.kpi-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  padding: 16px 20px;\n}\n.kpi-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--theme-primary);\n}\n.kpi-value[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.3rem;\n  font-weight: 700;\n  color: #212121;\n}\n.kpi-label[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 0.8rem;\n  color: #777;\n}\n.chart-card[_ngcontent-%COMP%] {\n  padding: 16px;\n  margin-bottom: 16px;\n  overflow: hidden;\n}\ncanvas[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n}\n.download-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 20px;\n  flex-wrap: wrap;\n}\n.table-card[_ngcontent-%COMP%] {\n  padding: 0;\n  overflow: hidden;\n}\n.table-wrap[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 0.88rem;\n}\nth[_ngcontent-%COMP%] {\n  background: #1565c0;\n  color: white;\n  padding: 10px 14px;\n  text-align: left;\n  white-space: nowrap;\n}\ntd[_ngcontent-%COMP%] {\n  padding: 8px 14px;\n  border-bottom: 1px solid #f0f0f0;\n}\ntr[_ngcontent-%COMP%]:nth-child(even)   td[_ngcontent-%COMP%] {\n  background: #fafafa;\n}\ntr[_ngcontent-%COMP%]:hover   td[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 16px;\n  color: #aaa;\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  width: 56px;\n  height: 56px;\n  margin-bottom: 12px;\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  margin: 0;\n}\n/*# sourceMappingURL=reports.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent" });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-RM6PXMJR.js.map
