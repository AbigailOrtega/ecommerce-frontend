import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-3YZFWUW6.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import "./chunk-4Y3BE5O3.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
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
  MatButtonModule
} from "./chunk-TPU3W7C5.js";
import {
  CurrencyPipe,
  DatePipe,
  KeyValuePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2
} from "./chunk-N3527UH3.js";

// src/app/features/admin/dashboard/dashboard.component.ts
var _forTrack0 = ($index, $item) => $item.key;
function DashboardComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function DashboardComponent_Conditional_57_th_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Pedido");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_57_td_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r1.orderNumber);
  }
}
function DashboardComponent_Conditional_57_th_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Cliente");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_57_td_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", o_r2.user == null ? null : o_r2.user.firstName, " ", o_r2.user == null ? null : o_r2.user.lastName, "");
  }
}
function DashboardComponent_Conditional_57_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_57_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, o_r3.totalAmount));
  }
}
function DashboardComponent_Conditional_57_th_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_57_td_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r4.status);
  }
}
function DashboardComponent_Conditional_57_th_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 32);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_Conditional_57_td_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 33);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, o_r5.createdAt, "short"));
  }
}
function DashboardComponent_Conditional_57_tr_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 34);
  }
}
function DashboardComponent_Conditional_57_tr_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 35);
  }
}
function DashboardComponent_Conditional_57_For_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r6.key);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r6.value);
  }
}
function DashboardComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "mat-card", 16)(2, "mat-icon");
    \u0275\u0275text(3, "shopping_bag");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p");
    \u0275\u0275text(8, "Pedidos totales");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "mat-card", 16)(10, "mat-icon");
    \u0275\u0275text(11, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "div")(13, "h3");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16, "Productos");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "mat-card", 16)(18, "mat-icon");
    \u0275\u0275text(19, "people");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div")(21, "h3");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p");
    \u0275\u0275text(24, "Usuarios");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(25, "mat-card", 17)(26, "mat-icon");
    \u0275\u0275text(27, "attach_money");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div")(29, "h3");
    \u0275\u0275text(30);
    \u0275\u0275pipe(31, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "p");
    \u0275\u0275text(33, "Ingresos");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(34, "div", 18)(35, "mat-card", 19)(36, "h2");
    \u0275\u0275text(37, "Pedidos recientes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "table", 20);
    \u0275\u0275elementContainerStart(39, 21);
    \u0275\u0275template(40, DashboardComponent_Conditional_57_th_40_Template, 2, 0, "th", 22)(41, DashboardComponent_Conditional_57_td_41_Template, 2, 1, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(42, 24);
    \u0275\u0275template(43, DashboardComponent_Conditional_57_th_43_Template, 2, 0, "th", 22)(44, DashboardComponent_Conditional_57_td_44_Template, 2, 2, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(45, 25);
    \u0275\u0275template(46, DashboardComponent_Conditional_57_th_46_Template, 2, 0, "th", 22)(47, DashboardComponent_Conditional_57_td_47_Template, 3, 3, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(48, 26);
    \u0275\u0275template(49, DashboardComponent_Conditional_57_th_49_Template, 2, 0, "th", 22)(50, DashboardComponent_Conditional_57_td_50_Template, 2, 1, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(51, 27);
    \u0275\u0275template(52, DashboardComponent_Conditional_57_th_52_Template, 2, 0, "th", 22)(53, DashboardComponent_Conditional_57_td_53_Template, 3, 4, "td", 23);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(54, DashboardComponent_Conditional_57_tr_54_Template, 1, 0, "tr", 28)(55, DashboardComponent_Conditional_57_tr_55_Template, 1, 0, "tr", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "mat-card", 30)(57, "h2");
    \u0275\u0275text(58, "Pedidos por estado");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(59, DashboardComponent_Conditional_57_For_60_Template, 5, 2, "div", 31, _forTrack0);
    \u0275\u0275pipe(61, "keyvalue");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r6.stats.totalOrders);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r6.stats.totalProducts);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r6.stats.totalUsers);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(31, 7, ctx_r6.stats.totalRevenue));
    \u0275\u0275advance(8);
    \u0275\u0275property("dataSource", ctx_r6.stats.recentOrders);
    \u0275\u0275advance(16);
    \u0275\u0275property("matHeaderRowDef", ctx_r6.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r6.displayedColumns);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(\u0275\u0275pipeBind1(61, 9, ctx_r6.stats.ordersByStatus));
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(adminService) {
    this.adminService = adminService;
    this.stats = null;
    this.loading = true;
    this.displayedColumns = ["orderNumber", "customer", "total", "status", "date"];
  }
  ngOnInit() {
    this.adminService.getDashboardStats().subscribe({
      next: (res) => {
        this.stats = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DashboardComponent)(\u0275\u0275directiveInject(AdminService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 58, vars: 1, consts: [[1, "container"], [1, "admin-nav"], ["mat-raised-button", "", "routerLink", "/admin/categories"], ["mat-raised-button", "", "routerLink", "/admin/products"], ["mat-raised-button", "", "routerLink", "/admin/orders"], ["mat-raised-button", "", "routerLink", "/admin/users"], ["mat-raised-button", "", "routerLink", "/admin/promotions"], ["mat-raised-button", "", "routerLink", "/admin/banners"], ["mat-raised-button", "", "routerLink", "/admin/coupons"], ["mat-raised-button", "", "routerLink", "/admin/reviews"], ["mat-raised-button", "", "routerLink", "/admin/tickets"], ["mat-raised-button", "", "routerLink", "/admin/shipping"], ["mat-raised-button", "", "routerLink", "/admin/shipments"], ["mat-raised-button", "", "routerLink", "/admin/store-info"], ["mat-raised-button", "", "routerLink", "/admin/reports"], [1, "stats-grid"], [1, "stat-card"], [1, "stat-card", "revenue"], [1, "dashboard-grid"], [1, "recent-orders"], ["mat-table", "", 3, "dataSource"], ["matColumnDef", "orderNumber"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "customer"], ["matColumnDef", "total"], ["matColumnDef", "status"], ["matColumnDef", "date"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "status-breakdown"], [1, "status-row"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""], [1, "count"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Panel de Administraci\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(3, "div", 1)(4, "a", 2)(5, "mat-icon");
        \u0275\u0275text(6, "category");
        \u0275\u0275elementEnd();
        \u0275\u0275text(7, " Categor\xEDas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "a", 3)(9, "mat-icon");
        \u0275\u0275text(10, "inventory_2");
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, " Productos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "a", 4)(13, "mat-icon");
        \u0275\u0275text(14, "receipt_long");
        \u0275\u0275elementEnd();
        \u0275\u0275text(15, " Pedidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "a", 5)(17, "mat-icon");
        \u0275\u0275text(18, "people");
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " Usuarios");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "a", 6)(21, "mat-icon");
        \u0275\u0275text(22, "local_offer");
        \u0275\u0275elementEnd();
        \u0275\u0275text(23, " Promociones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "a", 7)(25, "mat-icon");
        \u0275\u0275text(26, "image");
        \u0275\u0275elementEnd();
        \u0275\u0275text(27, " Banners");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "a", 8)(29, "mat-icon");
        \u0275\u0275text(30, "confirmation_number");
        \u0275\u0275elementEnd();
        \u0275\u0275text(31, " Cupones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "a", 9)(33, "mat-icon");
        \u0275\u0275text(34, "rate_review");
        \u0275\u0275elementEnd();
        \u0275\u0275text(35, " Rese\xF1as");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "a", 10)(37, "mat-icon");
        \u0275\u0275text(38, "support_agent");
        \u0275\u0275elementEnd();
        \u0275\u0275text(39, " Tickets");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "a", 11)(41, "mat-icon");
        \u0275\u0275text(42, "local_shipping");
        \u0275\u0275elementEnd();
        \u0275\u0275text(43, " Config. Entregas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "a", 12)(45, "mat-icon");
        \u0275\u0275text(46, "calendar_month");
        \u0275\u0275elementEnd();
        \u0275\u0275text(47, " Agenda Env\xEDos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "a", 13)(49, "mat-icon");
        \u0275\u0275text(50, "storefront");
        \u0275\u0275elementEnd();
        \u0275\u0275text(51, " Info General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "a", 14)(53, "mat-icon");
        \u0275\u0275text(54, "bar_chart");
        \u0275\u0275elementEnd();
        \u0275\u0275text(55, " Reportes");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(56, DashboardComponent_Conditional_56_Template, 1, 0, "app-loading")(57, DashboardComponent_Conditional_57_Template, 62, 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(56);
        \u0275\u0275conditional(ctx.loading ? 56 : ctx.stats ? 57 : -1);
      }
    }, dependencies: [RouterLink, MatCardModule, MatCard, MatButtonModule, MatAnchor, MatIconModule, MatIcon, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, CurrencyPipe, DatePipe, KeyValuePipe, LoadingComponent], styles: ["\n\n.admin-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.stats-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px;\n}\n.stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  color: var(--theme-primary);\n}\n.stat-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.6rem;\n}\n.stat-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #666;\n}\n.stat-card.revenue[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 24px;\n}\n.recent-orders[_ngcontent-%COMP%], \n.status-breakdown[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.status-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n  border-bottom: 1px solid #f0f0f0;\n}\n.count[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n@media (max-width: 768px) {\n  .stats-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent" });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-DQA2IC44.js.map
