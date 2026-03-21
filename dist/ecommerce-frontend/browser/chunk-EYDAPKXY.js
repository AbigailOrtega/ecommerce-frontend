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
  MatPaginator,
  MatPaginatorModule
} from "./chunk-UE3BHG3N.js";
import "./chunk-JITF7FU4.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-7WR3W74A.js";
import {
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import {
  MatRadioButton,
  MatRadioModule
} from "./chunk-MGAXNVYR.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-YPEJ5GST.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-4Y3BE5O3.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-632HDFWS.js";
import "./chunk-3KYEYZGS.js";
import {
  FormsModule
} from "./chunk-WS62BK7G.js";
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
  MatButtonModule,
  MatIconButton,
  MatOption
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  CurrencyPipe,
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
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
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate5
} from "./chunk-N3527UH3.js";

// src/app/features/admin/order-management/order-management.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => ["expandedDetail"];
function OrderManagementComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function OrderManagementComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Sin pedidos.");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 19);
  }
}
function OrderManagementComponent_Conditional_8_td_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 20)(1, "button", 21);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_3_Template_button_click_1_listener($event) {
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
function OrderManagementComponent_Conditional_8_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Pedido #");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r5.orderNumber);
  }
}
function OrderManagementComponent_Conditional_8_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Cliente");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", o_r6.user == null ? null : o_r6.user.firstName, " ", o_r6.user == null ? null : o_r6.user.lastName, "");
  }
}
function OrderManagementComponent_Conditional_8_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Total");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("title", "Coupon: " + o_r7.couponCode);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" -", \u0275\u0275pipeBind1(2, 2, o_r7.discountAmount), " ");
  }
}
function OrderManagementComponent_Conditional_8_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275template(3, OrderManagementComponent_Conditional_8_td_12_Conditional_3_Template, 3, 4, "span", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(2, 2, o_r7.totalAmount), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r7.discountAmount > 0 ? 3 : -1);
  }
}
function OrderManagementComponent_Conditional_8_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Estado");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_15_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
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
function OrderManagementComponent_Conditional_8_td_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 20)(1, "mat-select", 23);
    \u0275\u0275listener("selectionChange", function OrderManagementComponent_Conditional_8_td_15_Template_mat_select_selectionChange_1_listener($event) {
      const o_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateStatus(o_r9.id, $event.value));
    });
    \u0275\u0275repeaterCreate(2, OrderManagementComponent_Conditional_8_td_15_For_3_Template, 2, 2, "mat-option", 24, \u0275\u0275repeaterTrackByIdentity);
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
function OrderManagementComponent_Conditional_8_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Pago");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(o_r11.paymentMethod);
  }
}
function OrderManagementComponent_Conditional_8_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 19);
    \u0275\u0275text(1, "Fecha");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
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
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r13.selectedColorName, " ");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Talla: ", item_r13.selectedSizeName, " ");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 33);
    \u0275\u0275template(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_1_Template, 1, 1)(2, OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_2_Template, 1, 0)(3, OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Conditional_3_Template, 1, 1);
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
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Conditional_3_Template, 4, 3, "span", 33);
    \u0275\u0275elementStart(4, "span", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 35);
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
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "span");
    \u0275\u0275text(2, "Descuento ");
    \u0275\u0275elementStart(3, "span", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(o_r14.couponCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(7, 2, o_r14.discountAmount), "");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Env\xEDo (", o_r14.shippingMethodName, ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, o_r14.shippingCost));
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "Punto de retiro:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", o_r14.pickupLocationName, " \xB7 ", o_r14.pickupTimeSlotLabel, "");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 37);
    \u0275\u0275text(1, "Direcci\xF3n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate5("", o_r14.shippingAddress, ", ", o_r14.shippingCity, ", ", o_r14.shippingState, " ", o_r14.shippingZipCode, ", ", o_r14.shippingCountry, "");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "download");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 51);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "refresh");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.refreshShipment(o_r14));
    });
    \u0275\u0275template(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Conditional_1_Template, 1, 0, "mat-spinner", 51)(2, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r3.refreshingSet.has(o_r14.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.refreshingSet.has(o_r14.id) ? 1 : 2);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43)(2, "span", 37);
    \u0275\u0275text(3, "Carrier:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 43)(7, "span", 37);
    \u0275\u0275text(8, "Tracking:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 44);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 43)(12, "span", 37);
    \u0275\u0275text(13, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 45);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 46);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r15);
      const o_r14 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.downloadLabel(o_r14));
    });
    \u0275\u0275template(17, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_17_Template, 1, 0, "mat-spinner", 47)(18, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_18_Template, 2, 0, "mat-icon");
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275template(20, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Conditional_20_Template, 3, 2, "button", 48);
    \u0275\u0275elementStart(21, "button", 49);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r15);
      const o_r14 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.cancelShipment(o_r14));
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r14.carrierName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r14.trackingNumber);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r14.shipmentStatus);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.downloadingSet.has(o_r14.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.downloadingSet.has(o_r14.id) ? 17 : 18);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.downloadingSet.has(o_r14.id) ? "Descargando..." : "Descargar gu\xEDa", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(!o_r14.labelUrl || !o_r14.labelUrl.startsWith("http") ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.cancellingSet.has(o_r14.id));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r3.cancellingSet.has(o_r14.id) ? "Cancelando..." : "Cancelar gu\xEDa", " ");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "receipt_long");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "p", 53)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Tarifa elegida por el cliente: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 54)(7, "button", 55);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r17);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.getQuotation(o_r14));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10, " Cambiar tarifa ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 46);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r17);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.createShipmentDirect(o_r14));
    });
    \u0275\u0275template(12, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Conditional_12_Template, 1, 0, "mat-spinner", 47)(13, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Conditional_13_Template, 2, 0, "mat-icon");
    \u0275\u0275text(14, " Generar gu\xEDa ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(o_r14.shippingMethodName);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.quotingSet.has(o_r14.id));
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r3.creatingSet.has(o_r14.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.creatingSet.has(o_r14.id) ? 12 : 13);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 56);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r18);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.getQuotation(o_r14));
    });
    \u0275\u0275template(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Conditional_1_Template, 1, 0, "mat-spinner", 47)(2, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275text(3, " Cotizar con Skydropx ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r3.quotingSet.has(o_r14.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.quotingSet.has(o_r14.id) ? 1 : 2);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rate_r21 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", rate_r21.estimatedDays, " d\xEDa(s)");
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Template_div_click_0_listener() {
      const rate_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const o_r14 = \u0275\u0275nextContext(5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.selectedRates[o_r14.id] = rate_r21.id);
    });
    \u0275\u0275elementStart(1, "mat-radio-button", 61);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Template_mat_radio_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r20);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 62)(3, "span", 63);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 64);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Conditional_7_Template, 2, 1, "span", 65);
    \u0275\u0275elementStart(8, "span", 66);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rate_r21 = ctx.$implicit;
    const o_r14 = \u0275\u0275nextContext(5).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("rate-selected", ctx_r3.selectedRates[o_r14.id] === rate_r21.id);
    \u0275\u0275advance();
    \u0275\u0275property("value", rate_r21.id)("checked", ctx_r3.selectedRates[o_r14.id] === rate_r21.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(rate_r21.carrier);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rate_r21.service);
    \u0275\u0275advance();
    \u0275\u0275conditional(rate_r21.estimatedDays ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 8, rate_r21.price));
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "receipt_long");
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 57);
    \u0275\u0275repeaterCreate(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_For_2_Template, 11, 10, "div", 58, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54)(4, "button", 59);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r19);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      ctx_r3.quotations[o_r14.id] = null;
      return \u0275\u0275resetView(ctx_r3.selectedRates[o_r14.id] = null);
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Nueva cotizaci\xF3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "button", 46);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r19);
      const o_r14 = \u0275\u0275nextContext(4).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.createShipment(o_r14));
    });
    \u0275\u0275template(9, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Conditional_9_Template, 1, 0, "mat-spinner", 47)(10, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Conditional_10_Template, 2, 0, "mat-icon");
    \u0275\u0275text(11, " Generar gu\xEDa ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(4).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.quotations[o_r14.id].rates);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", !ctx_r3.selectedRates[o_r14.id] || ctx_r3.creatingSet.has(o_r14.id));
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.creatingSet.has(o_r14.id) ? 9 : 10);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_0_Template, 15, 4)(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_1_Template, 4, 2, "button", 52)(2, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Conditional_2_Template, 12, 2);
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(o_r14.skydropxRateId && !ctx_r3.quotations[o_r14.id] ? 0 : !ctx_r3.quotations[o_r14.id] ? 1 : 2);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-divider", 38);
    \u0275\u0275elementStart(1, "div", 39)(2, "span", 40)(3, "mat-icon", 41);
    \u0275\u0275text(4, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Gu\xEDa Skydropx ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_6_Template, 25, 9, "div", 42)(7, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Conditional_7_Template, 3, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275conditional(o_r14.skydropxShipmentId ? 6 : 7);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275repeaterCreate(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_For_2_Template, 9, 6, "div", 26, _forTrack0);
    \u0275\u0275elementStart(3, "div", 27)(4, "div", 28)(5, "span");
    \u0275\u0275text(6, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span");
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(10, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_10_Template, 8, 4, "div", 29)(11, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_11_Template, 6, 4, "div", 28);
    \u0275\u0275elementStart(12, "div", 30)(13, "span");
    \u0275\u0275text(14, "Total pagado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 31);
    \u0275\u0275template(19, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_19_Template, 4, 2)(20, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_20_Template, 4, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Conditional_21_Template, 8, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const o_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(o_r14.items);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 6, ctx_r3.itemsSubtotal(o_r14)));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r14.discountAmount > 0 ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(o_r14.shippingCost > 0 ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 8, o_r14.totalAmount));
    \u0275\u0275advance(3);
    \u0275\u0275conditional(o_r14.shippingType === "PICKUP" ? 19 : 20);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(o_r14.shippingType === "NATIONAL" ? 21 : -1);
  }
}
function OrderManagementComponent_Conditional_8_td_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 20);
    \u0275\u0275template(1, OrderManagementComponent_Conditional_8_td_23_Conditional_1_Template, 22, 10, "div", 25);
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
function OrderManagementComponent_Conditional_8_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 67);
  }
}
function OrderManagementComponent_Conditional_8_tr_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 68);
    \u0275\u0275listener("click", function OrderManagementComponent_Conditional_8_tr_25_Template_tr_click_0_listener() {
      const row_r23 = \u0275\u0275restoreView(_r22).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleExpand(row_r23));
    });
    \u0275\u0275elementEnd();
  }
}
function OrderManagementComponent_Conditional_8_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 69);
  }
}
function OrderManagementComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 4);
    \u0275\u0275elementContainerStart(1, 5);
    \u0275\u0275template(2, OrderManagementComponent_Conditional_8_th_2_Template, 1, 0, "th", 6)(3, OrderManagementComponent_Conditional_8_td_3_Template, 4, 1, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 8);
    \u0275\u0275template(5, OrderManagementComponent_Conditional_8_th_5_Template, 2, 0, "th", 6)(6, OrderManagementComponent_Conditional_8_td_6_Template, 2, 1, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 9);
    \u0275\u0275template(8, OrderManagementComponent_Conditional_8_th_8_Template, 2, 0, "th", 6)(9, OrderManagementComponent_Conditional_8_td_9_Template, 2, 2, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 10);
    \u0275\u0275template(11, OrderManagementComponent_Conditional_8_th_11_Template, 2, 0, "th", 6)(12, OrderManagementComponent_Conditional_8_td_12_Template, 4, 4, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 11);
    \u0275\u0275template(14, OrderManagementComponent_Conditional_8_th_14_Template, 2, 0, "th", 6)(15, OrderManagementComponent_Conditional_8_td_15_Template, 4, 1, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 12);
    \u0275\u0275template(17, OrderManagementComponent_Conditional_8_th_17_Template, 2, 0, "th", 6)(18, OrderManagementComponent_Conditional_8_td_18_Template, 2, 1, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 13);
    \u0275\u0275template(20, OrderManagementComponent_Conditional_8_th_20_Template, 2, 0, "th", 6)(21, OrderManagementComponent_Conditional_8_td_21_Template, 3, 4, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 14);
    \u0275\u0275template(23, OrderManagementComponent_Conditional_8_td_23_Template, 2, 2, "td", 7);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(24, OrderManagementComponent_Conditional_8_tr_24_Template, 1, 0, "tr", 15)(25, OrderManagementComponent_Conditional_8_tr_25_Template, 1, 0, "tr", 16)(26, OrderManagementComponent_Conditional_8_tr_26_Template, 1, 0, "tr", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "mat-paginator", 18);
    \u0275\u0275listener("page", function OrderManagementComponent_Conditional_8_Template_mat_paginator_page_27_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.onPage($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r3.orders)("multiTemplateDataRows", true);
    \u0275\u0275advance(24);
    \u0275\u0275property("matHeaderRowDef", ctx_r3.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r3.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", \u0275\u0275pureFunction0(7, _c0));
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
    this.quotations = {};
    this.selectedRates = {};
    this.quotingSet = /* @__PURE__ */ new Set();
    this.creatingSet = /* @__PURE__ */ new Set();
    this.cancellingSet = /* @__PURE__ */ new Set();
    this.refreshingSet = /* @__PURE__ */ new Set();
    this.downloadingSet = /* @__PURE__ */ new Set();
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
      error: () => {
        this.loading = false;
        this.snackBar.open("Error al cargar los pedidos", "Cerrar", { duration: 4e3 });
      }
    });
  }
  toggleExpand(order) {
    this.expandedOrderId = this.expandedOrderId === order.id ? null : order.id;
  }
  updateStatus(orderId, status) {
    this.adminService.updateOrderStatus(orderId, status).subscribe({
      next: () => this.snackBar.open("Estado del pedido actualizado", "Cerrar", { duration: 3e3 }),
      error: () => this.snackBar.open("Error al actualizar el estado", "Cerrar", { duration: 3e3 })
    });
  }
  onPage(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadOrders();
  }
  itemsSubtotal(order) {
    return order.items.reduce((sum, item) => sum + item.subtotal, 0);
  }
  getQuotation(order) {
    this.quotingSet.add(order.id);
    this.adminService.getSkydropxQuotation(order.id).subscribe({
      next: (res) => {
        this.quotations[order.id] = res.data;
        this.quotingSet.delete(order.id);
      },
      error: (err) => {
        this.quotingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "Error al cotizar", "Cerrar", { duration: 5e3 });
      }
    });
  }
  createShipmentDirect(order) {
    if (!order.skydropxRateId)
      return;
    this.creatingSet.add(order.id);
    this.adminService.createSkydropxShipment(order.id, order.skydropxRateId).subscribe({
      next: (res) => {
        this.creatingSet.delete(order.id);
        const idx = this.orders.findIndex((o) => o.id === order.id);
        if (idx !== -1)
          this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open("Gu\xEDa generada exitosamente", "Cerrar", { duration: 4e3 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "Error al generar gu\xEDa", "Cerrar", { duration: 5e3 });
      }
    });
  }
  createShipment(order) {
    const rateId = this.selectedRates[order.id];
    if (!rateId)
      return;
    this.creatingSet.add(order.id);
    this.adminService.createSkydropxShipment(order.id, rateId).subscribe({
      next: (res) => {
        this.creatingSet.delete(order.id);
        const idx = this.orders.findIndex((o) => o.id === order.id);
        if (idx !== -1)
          this.orders[idx] = res.data;
        this.orders = [...this.orders];
        delete this.quotations[order.id];
        delete this.selectedRates[order.id];
        this.snackBar.open("Gu\xEDa generada exitosamente", "Cerrar", { duration: 4e3 });
      },
      error: (err) => {
        this.creatingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "Error al generar gu\xEDa", "Cerrar", { duration: 5e3 });
      }
    });
  }
  downloadLabel(order) {
    this.downloadingSet.add(order.id);
    this.adminService.downloadSkydropxLabel(order.id).subscribe({
      next: (blob) => {
        this.downloadingSet.delete(order.id);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `guia-${order.orderNumber}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        this.downloadingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "La gu\xEDa a\xFAn no est\xE1 disponible, intenta en unos segundos", "Cerrar", { duration: 5e3 });
      }
    });
  }
  refreshShipment(order) {
    this.refreshingSet.add(order.id);
    this.adminService.refreshSkydropxShipment(order.id).subscribe({
      next: (res) => {
        this.refreshingSet.delete(order.id);
        const idx = this.orders.findIndex((o) => o.id === order.id);
        if (idx !== -1)
          this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open("Datos actualizados", "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.refreshingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "Error al obtener gu\xEDa", "Cerrar", { duration: 5e3 });
      }
    });
  }
  cancelShipment(order) {
    if (!confirm("\xBFCancelar la gu\xEDa de env\xEDo de este pedido?"))
      return;
    this.cancellingSet.add(order.id);
    this.adminService.cancelSkydropxShipment(order.id).subscribe({
      next: (res) => {
        this.cancellingSet.delete(order.id);
        const idx = this.orders.findIndex((o) => o.id === order.id);
        if (idx !== -1)
          this.orders[idx] = res.data;
        this.orders = [...this.orders];
        this.snackBar.open("Gu\xEDa cancelada", "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.cancellingSet.delete(order.id);
        this.snackBar.open(err.error?.message || "Error al cancelar", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function OrderManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderManagementComponent, selectors: [["app-order-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 9, vars: 1, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "empty-state"], ["mat-table", "", 1, "order-table", 3, "dataSource", "multiTemplateDataRows"], ["matColumnDef", "expand"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "orderNumber"], ["matColumnDef", "customer"], ["matColumnDef", "total"], ["matColumnDef", "status"], ["matColumnDef", "payment"], ["matColumnDef", "date"], ["matColumnDef", "expandedDetail"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "main-row", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["mat-row", "", "class", "detail-row", 4, "matRowDef", "matRowDefColumns"], [3, "page", "length", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", 3, "click"], [1, "discount-badge", 3, "title"], [1, "status-select", 3, "selectionChange", "value"], [3, "value"], [1, "items-panel"], [1, "item-row"], [1, "totals-summary"], [1, "totals-row"], [1, "totals-row", "discount"], [1, "totals-row", "total-final"], [1, "shipping-info"], [1, "item-name"], [1, "item-variant"], [1, "item-qty"], [1, "item-subtotal"], [1, "coupon-code"], [1, "info-label"], [2, "margin", "12px 0"], [1, "skydropx-panel"], [1, "panel-title"], [1, "panel-icon"], [1, "shipment-info"], [1, "shipment-row"], [1, "tracking-number"], [1, "status-chip"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "18", 2, "display", "inline-block", "margin-right", "6px"], ["mat-stroked-button", "", "title", "Refrescar datos de la gu\xEDa", 3, "disabled"], ["mat-stroked-button", "", "color", "warn", 3, "click", "disabled"], ["mat-stroked-button", "", "title", "Refrescar datos de la gu\xEDa", 3, "click", "disabled"], ["diameter", "18", 2, "display", "inline-block"], ["mat-stroked-button", "", "color", "primary", 3, "disabled"], [1, "rate-preselected"], [1, "rates-actions"], ["mat-stroked-button", "", 3, "click", "disabled"], ["mat-stroked-button", "", "color", "primary", 3, "click", "disabled"], [1, "rates-list"], [1, "rate-item", 3, "rate-selected"], ["mat-button", "", 3, "click"], [1, "rate-item", 3, "click"], ["color", "primary", 3, "click", "value", "checked"], [1, "rate-info"], [1, "rate-carrier"], [1, "rate-service"], [1, "rate-days"], [1, "rate-price"], ["mat-header-row", ""], ["mat-row", "", 1, "main-row", 3, "click"], ["mat-row", "", 1, "detail-row"]], template: function OrderManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gesti\xF3n de Pedidos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, OrderManagementComponent_Conditional_6_Template, 1, 0, "app-loading")(7, OrderManagementComponent_Conditional_7_Template, 2, 0, "p", 3)(8, OrderManagementComponent_Conditional_8_Template, 28, 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.loading ? 6 : ctx.orders.length === 0 ? 7 : 8);
      }
    }, dependencies: [RouterLink, FormsModule, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatPaginatorModule, MatPaginator, MatSelectModule, MatSelect, MatOption, MatChipsModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner, MatRadioModule, MatRadioButton, MatDividerModule, MatDivider, CurrencyPipe, DatePipe, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.order-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.status-select[_ngcontent-%COMP%] {\n  width: 140px;\n}\n.main-row[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.main-row[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n}\n.detail-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 0 !important;\n  border-bottom: none;\n}\n.items-panel[_ngcontent-%COMP%] {\n  padding: 12px 16px 16px 56px;\n  background: #f9f9fb;\n  border-bottom: 1px solid #e0e0e0;\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.item-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  font-size: 0.9rem;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n  min-width: 160px;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-size: 0.82rem;\n}\n.item-qty[_ngcontent-%COMP%] {\n  color: #666;\n}\n.item-subtotal[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-left: auto;\n}\n.totals-summary[_ngcontent-%COMP%] {\n  border-top: 1px solid #e0e0e0;\n  margin-top: 8px;\n  padding-top: 8px;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  align-items: flex-end;\n  min-width: 260px;\n  align-self: flex-end;\n}\n.totals-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  width: 260px;\n  font-size: 0.88rem;\n  color: #555;\n}\n.totals-row.discount[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.totals-row.total-final[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 0.95rem;\n  color: #1a1a2e;\n  border-top: 1px solid #ccc;\n  padding-top: 4px;\n  margin-top: 2px;\n}\n.coupon-code[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  font-size: 0.75rem;\n  padding: 1px 6px;\n  border-radius: 8px;\n  margin-left: 4px;\n  font-weight: 600;\n}\n.discount-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  background: #e8f5e9;\n  color: #2e7d32;\n  font-size: 0.72rem;\n  padding: 1px 6px;\n  border-radius: 8px;\n  margin-left: 6px;\n  font-weight: 600;\n  cursor: help;\n}\n.empty-state[_ngcontent-%COMP%] {\n  margin-top: 32px;\n  text-align: center;\n  color: #888;\n  font-size: 1rem;\n}\n.shipping-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.85rem;\n  color: #555;\n  margin-top: 4px;\n}\n.info-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.skydropx-panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.panel-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  color: #1a1a2e;\n}\n.panel-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--theme-primary);\n}\n.shipment-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.shipment-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.88rem;\n}\n.tracking-number[_ngcontent-%COMP%] {\n  font-family: monospace;\n  background: #f0f0f0;\n  padding: 2px 8px;\n  border-radius: 4px;\n}\n.status-chip[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n  padding: 2px 8px;\n  border-radius: 12px;\n  font-size: 0.8rem;\n  font-weight: 600;\n}\n.rates-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  max-width: 600px;\n}\n.rate-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: border-color 0.15s;\n  font-size: 0.88rem;\n}\n.rate-item[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n}\n.rate-item.rate-selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.06);\n}\n.rate-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n}\n.rate-carrier[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1a1a2e;\n}\n.rate-service[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #666;\n}\n.rate-days[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.82rem;\n  white-space: nowrap;\n}\n.rate-price[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--theme-primary);\n  white-space: nowrap;\n  margin-left: auto;\n}\n.rates-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  margin-top: 8px;\n}\n.rate-preselected[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.88rem;\n  color: #2e7d32;\n  margin: 0 0 4px;\n}\n.rate-preselected[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n/*# sourceMappingURL=order-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderManagementComponent, { className: "OrderManagementComponent" });
})();
export {
  OrderManagementComponent
};
//# sourceMappingURL=chunk-EYDAPKXY.js.map
