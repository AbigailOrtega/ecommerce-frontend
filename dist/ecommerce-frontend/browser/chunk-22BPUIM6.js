import {
  MatChip,
  MatChipsModule
} from "./chunk-NFSWPOPY.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
import {
  MatTableModule
} from "./chunk-WC4CRWHR.js";
import {
  OrderService
} from "./chunk-RCKNSVHU.js";
import "./chunk-7VTKONPA.js";
import "./chunk-JDEIMQFJ.js";
import "./chunk-MKJAF7VR.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-ZVZR7W4N.js";
import "./chunk-CH3NEX64.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-766SFS74.js";
import {
  MatAnchor,
  MatButtonModule,
  RouterLink
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
import {
  CurrencyPipe,
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-RP6JOKCW.js";

// src/app/features/orders/order-list/order-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/orders", a0];
function OrderListComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function OrderListComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 1)(1, "mat-icon", 2);
    \u0275\u0275text(2, "receipt_long");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "No orders yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Start shopping to see your orders here.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 3);
    \u0275\u0275text(8, "Browse Products");
    \u0275\u0275elementEnd()();
  }
}
function OrderListComponent_Conditional_5_For_1_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r1.productName, " x", item_r1.quantity, "");
  }
}
function OrderListComponent_Conditional_5_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 4)(1, "div", 5)(2, "div")(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 6);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-chip");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275repeaterCreate(11, OrderListComponent_Conditional_5_For_1_For_12_Template, 2, 2, "span", 8, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 9)(14, "span", 10);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "a", 11);
    \u0275\u0275text(18, "View Details");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Order ", order_r2.orderNumber, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(7, 7, order_r2.createdAt, "medium"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("status-" + order_r2.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r2.status);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(order_r2.items);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 10, order_r2.totalAmount));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c0, order_r2.orderNumber));
  }
}
function OrderListComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, OrderListComponent_Conditional_5_For_1_Template, 19, 14, "mat-card", 4, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r2.orders);
  }
}
var OrderListComponent = class _OrderListComponent {
  constructor(orderService) {
    this.orderService = orderService;
    this.orders = [];
    this.loading = true;
  }
  ngOnInit() {
    this.orderService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  static {
    this.\u0275fac = function OrderListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderListComponent)(\u0275\u0275directiveInject(OrderService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderListComponent, selectors: [["app-order-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 6, vars: 1, consts: [[1, "container"], [1, "empty"], [1, "empty-icon"], ["mat-raised-button", "", "color", "primary", "routerLink", "/"], [1, "order-card"], [1, "order-header"], [1, "date"], [1, "order-items"], [1, "item-name"], [1, "order-footer"], [1, "total"], ["mat-button", "", "color", "primary", 3, "routerLink"]], template: function OrderListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "My Orders");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, OrderListComponent_Conditional_3_Template, 1, 0, "app-loading")(4, OrderListComponent_Conditional_4_Template, 9, 0, "mat-card", 1)(5, OrderListComponent_Conditional_5_Template, 2, 0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loading ? 3 : ctx.orders.length === 0 ? 4 : 5);
      }
    }, dependencies: [RouterLink, MatTableModule, MatButtonModule, MatAnchor, MatChipsModule, MatChip, MatCardModule, MatCard, MatIconModule, MatIcon, CurrencyPipe, DatePipe, LoadingComponent], styles: ["\n\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n}\n.order-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding: 20px;\n}\n.order-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.date[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n  margin-left: 12px;\n}\n.order-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n.item-name[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  padding: 4px 12px;\n  border-radius: 16px;\n  font-size: 0.9rem;\n}\n.order-footer[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.total[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0 !important;\n  color: #e65100 !important;\n}\n.status-confirmed[_ngcontent-%COMP%] {\n  background: #e3f2fd !important;\n  color: #1565c0 !important;\n}\n.status-processing[_ngcontent-%COMP%] {\n  background: #e8eaf6 !important;\n  color: #283593 !important;\n}\n.status-shipped[_ngcontent-%COMP%] {\n  background: #e0f2f1 !important;\n  color: #00695c !important;\n}\n.status-delivered[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n.status-refunded[_ngcontent-%COMP%] {\n  background: #fce4ec !important;\n  color: #ad1457 !important;\n}\n/*# sourceMappingURL=order-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderListComponent, { className: "OrderListComponent" });
})();
export {
  OrderListComponent
};
//# sourceMappingURL=chunk-22BPUIM6.js.map
