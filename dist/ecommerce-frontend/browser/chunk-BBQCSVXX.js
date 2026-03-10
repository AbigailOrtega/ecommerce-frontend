import {
  AdminService
} from "./chunk-CZXKLA4A.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-IBRNATXH.js";
import {
  MatChipsModule
} from "./chunk-NFSWPOPY.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
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
} from "./chunk-WC4CRWHR.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-ZSXSKPBP.js";
import "./chunk-7VTKONPA.js";
import "./chunk-JDEIMQFJ.js";
import {
  FormsModule
} from "./chunk-MKJAF7VR.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-BIQB4PB7.js";
import "./chunk-25XTNFPS.js";
import "./chunk-CH3NEX64.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-766SFS74.js";
import {
  MatAnchor,
  MatButtonModule,
  MatIconButton,
  MatOption,
  RouterLink
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
import {
  CurrencyPipe,
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-RP6JOKCW.js";

// src/app/features/admin/order-management/order-management.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => ["expandedDetail"];
function OrderManagementComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function OrderManagementComponent_Conditional_7_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 18);
  }
}
function OrderManagementComponent_Conditional_7_td_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 19)(1, "button", 20);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_7_td_3_Template_button_click_1_listener($event) {
      const o_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.toggleExpand(o_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const o_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.expandedOrderId === o_r3.id ? "expand_less" : "expand_more");
  }
}
function OrderManagementComponent_Conditional_7_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Order #");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r5.orderNumber);
  }
}
function OrderManagementComponent_Conditional_7_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Customer");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", o_r6.user == null ? null : o_r6.user.firstName, " ", o_r6.user == null ? null : o_r6.user.lastName, "");
  }
}
function OrderManagementComponent_Conditional_7_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, o_r7.totalAmount));
  }
}
function OrderManagementComponent_Conditional_7_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_15_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const status_r10 = ctx.$implicit;
    \u0275\u0275property("value", status_r10);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(status_r10);
  }
}
function OrderManagementComponent_Conditional_7_td_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 19)(1, "mat-select", 21);
    \u0275\u0275listener("selectionChange", function OrderManagementComponent_Conditional_7_td_15_Template_mat_select_selectionChange_1_listener($event) {
      const o_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(o_r9.id, $event.value));
    });
    \u0275\u0275repeaterCreate(2, OrderManagementComponent_Conditional_7_td_15_For_3_Template, 2, 2, "mat-option", 22, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r9 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("value", o_r9.status);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.statuses);
  }
}
function OrderManagementComponent_Conditional_7_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Payment");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r11.paymentMethod);
  }
}
function OrderManagementComponent_Conditional_7_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 18);
    \u0275\u0275text(1, "Date");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, o_r12.createdAt, "short"));
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r13.selectedColorName, " ");
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Size: ", item_r13.selectedSizeName, " ");
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275template(1, OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_1_Template, 1, 1)(2, OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_2_Template, 1, 0)(3, OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r13.selectedColorName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r13.selectedColorName && item_r13.selectedSizeName ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r13.selectedSizeName ? 3 : -1);
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "span", 25);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Conditional_3_Template, 4, 3, "span", 26);
    \u0275\u0275elementStart(4, "span", 27);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 28);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.productName);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r13.selectedColorName || item_r13.selectedSizeName ? 3 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\xD7 ", item_r13.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 4, item_r13.subtotal));
  }
}
function OrderManagementComponent_Conditional_7_td_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275repeaterCreate(1, OrderManagementComponent_Conditional_7_td_23_Conditional_1_For_2_Template, 9, 6, "div", 24, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275repeater(o_r14.items);
  }
}
function OrderManagementComponent_Conditional_7_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 19);
    \u0275\u0275template(1, OrderManagementComponent_Conditional_7_td_23_Conditional_1_Template, 3, 0, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275attribute("colspan", ctx_r3.columns.length);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.expandedOrderId === o_r14.id ? 1 : -1);
  }
}
function OrderManagementComponent_Conditional_7_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 29);
  }
}
function OrderManagementComponent_Conditional_7_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 30);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_7_tr_25_Template_tr_click_0_listener() {
      const row_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleExpand(row_r16));
    });
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_7_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 31);
  }
}
function OrderManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 3);
    \u0275\u0275elementContainerStart(1, 4);
    \u0275\u0275template(2, OrderManagementComponent_Conditional_7_th_2_Template, 1, 0, "th", 5)(3, OrderManagementComponent_Conditional_7_td_3_Template, 4, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 7);
    \u0275\u0275template(5, OrderManagementComponent_Conditional_7_th_5_Template, 2, 0, "th", 5)(6, OrderManagementComponent_Conditional_7_td_6_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 8);
    \u0275\u0275template(8, OrderManagementComponent_Conditional_7_th_8_Template, 2, 0, "th", 5)(9, OrderManagementComponent_Conditional_7_td_9_Template, 2, 2, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 9);
    \u0275\u0275template(11, OrderManagementComponent_Conditional_7_th_11_Template, 2, 0, "th", 5)(12, OrderManagementComponent_Conditional_7_td_12_Template, 3, 3, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 10);
    \u0275\u0275template(14, OrderManagementComponent_Conditional_7_th_14_Template, 2, 0, "th", 5)(15, OrderManagementComponent_Conditional_7_td_15_Template, 4, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 11);
    \u0275\u0275template(17, OrderManagementComponent_Conditional_7_th_17_Template, 2, 0, "th", 5)(18, OrderManagementComponent_Conditional_7_td_18_Template, 2, 1, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 12);
    \u0275\u0275template(20, OrderManagementComponent_Conditional_7_th_20_Template, 2, 0, "th", 5)(21, OrderManagementComponent_Conditional_7_td_21_Template, 3, 4, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 13);
    \u0275\u0275template(23, OrderManagementComponent_Conditional_7_td_23_Template, 2, 2, "td", 6);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(24, OrderManagementComponent_Conditional_7_tr_24_Template, 1, 0, "tr", 14)(25, OrderManagementComponent_Conditional_7_tr_25_Template, 1, 0, "tr", 15)(26, OrderManagementComponent_Conditional_7_tr_26_Template, 1, 0, "tr", 16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-paginator", 17);
    \u0275\u0275listener("page", function OrderManagementComponent_Conditional_7_Template_mat_paginator_page_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPage($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r3.orders);
    \u0275\u0275advance(24);
    \u0275\u0275property("matHeaderRowDef", ctx_r3.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r3.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", \u0275\u0275pureFunction0(6, _c0));
    \u0275\u0275advance();
    \u0275\u0275property("length", ctx_r3.totalElements)("pageSize", ctx_r3.pageSize);
  }
}
var OrderManagementComponent = class _OrderManagementComponent {
  constructor(adminService, snackBar) {
    this.adminService = adminService;
    this.snackBar = snackBar;
    this.orders = [];
    this.loading = true;
    this.columns = ["expand", "orderNumber", "customer", "total", "status", "payment", "date"];
    this.statuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"];
    this.totalElements = 0;
    this.pageSize = 20;
    this.currentPage = 0;
    this.expandedOrderId = null;
  }
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading = true;
    this.adminService.getAllOrders(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.orders = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  toggleExpand(order) {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }
  updateStatus(orderId, status) {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.snackBar.open("Order status updated", "Close", { duration: 3e3 }),
      error: () => this.snackBar.open("Failed to update status", "Close", { duration: 3e3 })
    });
  }
  onPage(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }
  static {
    this.\u0275fac = function OrderManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderManagementComponent, selectors: [["app-order-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 1, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-table", "", 1, "order-table", 3, "dataSource"], ["matColumnDef", "expand"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "orderNumber"], ["matColumnDef", "customer"], ["matColumnDef", "total"], ["matColumnDef", "status"], ["matColumnDef", "payment"], ["matColumnDef", "date"], ["matColumnDef", "expandedDetail"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "main-row", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["mat-row", "", "class", "detail-row", 4, "matRowDef", "matRowDefColumns"], [3, "page", "length", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", 3, "click"], [1, "status-select", 3, "selectionChange", "value"], [3, "value"], [1, "items-panel"], [1, "item-row"], [1, "item-name"], [1, "item-variant"], [1, "item-qty"], [1, "item-subtotal"], ["mat-header-row", ""], ["mat-row", "", 1, "main-row", 3, "click"], ["mat-row", "", 1, "detail-row"]], template: function OrderManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Order Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Dashboard");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, OrderManagementComponent_Conditional_6_Template, 1, 0, "app-loading")(7, OrderManagementComponent_Conditional_7_Template, 28, 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.loading ? 6 : 7);
      }
    }, dependencies: [RouterLink, FormsModule, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatIconButton, MatIconModule, MatIcon, MatPaginatorModule, MatPaginator, MatSelectModule, MatSelect, MatOption, MatChipsModule, MatSnackBarModule, CurrencyPipe, DatePipe, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.order-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.status-select[_ngcontent-%COMP%] {\n  width: 140px;\n}\n.main-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.main-row[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.detail-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0 !important;\n  border-bottom: none;\n}\n.items-panel[_ngcontent-%COMP%] {\n  padding: 12px 16px 16px 56px;\n  background: #f9f9fb;\n  border-bottom: 1px solid #e0e0e0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 0.9rem;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n  min-width: 160px;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-size: 0.82rem;\n}\n.item-qty[_ngcontent-%COMP%] {\n  color: #666;\n}\n.item-subtotal[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-left: auto;\n}\n/*# sourceMappingURL=order-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderManagementComponent, { className: "OrderManagementComponent" });
})();
export {
  OrderManagementComponent
};
//# sourceMappingURL=chunk-BBQCSVXX.js.map
