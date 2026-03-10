import {
  MatDivider,
  MatDividerModule
} from "./chunk-KHC7WLL2.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-NFSWPOPY.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
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
import {
  ActivatedRoute,
  MatAnchor,
  MatButtonModule,
  RouterLink
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
import {
  CurrencyPipe,
  DatePipe,
  TitleCasePipe,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-RP6JOKCW.js";

// src/app/features/orders/order-detail/order-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function OrderDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r1.selectedColorName, " ");
  }
}
function OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Size: ", item_r1.selectedSizeName, " ");
  }
}
function OrderDetailComponent_Conditional_1_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 9);
    \u0275\u0275template(1, OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_1_Template, 1, 1)(2, OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_2_Template, 1, 0)(3, OrderDetailComponent_Conditional_1_For_10_Conditional_4_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.selectedColorName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.selectedColorName && item_r1.selectedSizeName ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.selectedSizeName ? 3 : -1);
  }
}
function OrderDetailComponent_Conditional_1_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 8)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, OrderDetailComponent_Conditional_1_For_10_Conditional_4_Template, 4, 3, "span", 9);
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 10);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(11, "mat-divider");
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r1.productName);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.selectedColorName || item_r1.selectedSizeName ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Qty: ", item_r1.quantity, " \xD7 ", \u0275\u0275pipeBind1(7, 5, item_r1.productPrice), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 7, item_r1.subtotal));
  }
}
function OrderDetailComponent_Conditional_1_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Transaction: ", ctx_r1.order.paymentId, "");
  }
}
function OrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
    \u0275\u0275text(2, "\u2190 Back to Orders");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 2)(6, "mat-card")(7, "h3");
    \u0275\u0275text(8, "Order Items");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, OrderDetailComponent_Conditional_1_For_10_Template, 12, 9, null, null, _forTrack0);
    \u0275\u0275elementStart(11, "div", 3)(12, "span");
    \u0275\u0275text(13, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div")(18, "mat-card", 4)(19, "h3");
    \u0275\u0275text(20, "Order Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "mat-chip");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 5);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-card", 4)(27, "h3");
    \u0275\u0275text(28, "Shipping Address");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "p");
    \u0275\u0275text(30);
    \u0275\u0275element(31, "br");
    \u0275\u0275text(32);
    \u0275\u0275element(33, "br");
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "mat-card", 4)(36, "h3");
    \u0275\u0275text(37, "Payment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "p");
    \u0275\u0275text(39);
    \u0275\u0275pipe(40, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275template(41, OrderDetailComponent_Conditional_1_Conditional_41_Template, 2, 1, "p", 6);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Order ", ctx_r1.order.orderNumber, "");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.order.items);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(16, 13, ctx_r1.order.totalAmount));
    \u0275\u0275advance(6);
    \u0275\u0275classMap("status-" + ctx_r1.order.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.order.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Placed on ", \u0275\u0275pipeBind2(25, 15, ctx_r1.order.createdAt, "medium"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingAddress);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r1.order.shippingCity, ", ", ctx_r1.order.shippingState, " ", ctx_r1.order.shippingZipCode, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.shippingCountry, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("Method: ", \u0275\u0275pipeBind1(40, 18, ctx_r1.order.paymentMethod), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order.paymentId ? 41 : -1);
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  constructor(route, orderService) {
    this.route = route;
    this.orderService = orderService;
    this.order = null;
    this.loading = true;
  }
  ngOnInit() {
    const orderNumber = this.route.snapshot.paramMap.get("orderNumber");
    this.orderService.getOrderByNumber(orderNumber).subscribe({
      next: (res) => {
        this.order = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  static {
    this.\u0275fac = function OrderDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(OrderService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "container"], ["mat-button", "", "routerLink", "/orders", 1, "back-link"], [1, "order-grid"], [1, "order-total"], [1, "info-card"], [1, "date"], [1, "payment-id"], [1, "order-item"], [1, "item-info"], [1, "item-variant"], [1, "item-total"]], template: function OrderDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, OrderDetailComponent_Conditional_0_Template, 1, 0, "app-loading")(1, OrderDetailComponent_Conditional_1_Template, 42, 20, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.loading ? 0 : ctx.order ? 1 : -1);
      }
    }, dependencies: [RouterLink, MatCardModule, MatCard, MatButtonModule, MatAnchor, MatChipsModule, MatChip, MatDividerModule, MatDivider, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent], styles: ["\n\n.back-link[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.order-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 0;\n}\n.item-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.item-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: #3f51b5 !important;\n  font-size: 0.85rem !important;\n}\n.item-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 0 0;\n  font-size: 1.2rem;\n  font-weight: 700;\n}\n.info-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.date[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}\n.payment-id[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n  word-break: break-all;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0 !important;\n  color: #e65100 !important;\n}\n.status-confirmed[_ngcontent-%COMP%] {\n  background: #e3f2fd !important;\n  color: #1565c0 !important;\n}\n.status-delivered[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n@media (max-width: 768px) {\n  .order-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=order-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent" });
})();
export {
  OrderDetailComponent
};
//# sourceMappingURL=chunk-ZORXDF6U.js.map
