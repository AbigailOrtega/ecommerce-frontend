import {
  MatDivider,
  MatDividerModule
} from "./chunk-7WR3W74A.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import {
  OrderService
} from "./chunk-JY3BERTJ.js";
import "./chunk-4Y3BE5O3.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-US5PAJIM.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-632HDFWS.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WS62BK7G.js";
import "./chunk-W6S7N6HL.js";
import "./chunk-VTPZX5UP.js";
import "./chunk-J25CCJ4O.js";
import "./chunk-SAONJULU.js";
import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  HttpClient,
  MatAnchor,
  MatButton,
  MatButtonModule
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
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
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/core/services/ticket.service.ts
var TicketService = class _TicketService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}`;
  }
  createTicket(orderNumber, request) {
    return this.http.post(`${this.apiUrl}/orders/${orderNumber}/tickets`, request);
  }
  getMyTickets() {
    return this.http.get(`${this.apiUrl}/tickets`);
  }
  getTicketById(id) {
    return this.http.get(`${this.apiUrl}/tickets/${id}`);
  }
  static {
    this.\u0275fac = function TicketService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TicketService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TicketService, factory: _TicketService.\u0275fac, providedIn: "root" });
  }
};

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
    \u0275\u0275textInterpolate1(" Talla: ", item_r1.selectedSizeName, " ");
  }
}
function OrderDetailComponent_Conditional_1_For_10_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
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
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 10)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, OrderDetailComponent_Conditional_1_For_10_Conditional_4_Template, 4, 3, "span", 11);
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 12);
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
    \u0275\u0275textInterpolate2("Cant: ", item_r1.quantity, " \xD7 ", \u0275\u0275pipeBind1(7, 5, item_r1.productPrice), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 7, item_r1.subtotal));
  }
}
function OrderDetailComponent_Conditional_1_Conditional_11_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 14)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Cup\xF3n ", ctx_r1.order.couponCode ? "(" + ctx_r1.order.couponCode + ")" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(5, 2, ctx_r1.order.discountAmount), "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_11_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Env\xEDo", ctx_r1.order.shippingMethodName ? " (" + ctx_r1.order.shippingMethodName + ")" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 2, ctx_r1.order.shippingCost));
  }
}
function OrderDetailComponent_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "span");
    \u0275\u0275text(2, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, OrderDetailComponent_Conditional_1_Conditional_11_Conditional_6_Template, 6, 4, "div", 14)(7, OrderDetailComponent_Conditional_1_Conditional_11_Conditional_7_Template, 6, 4, "div", 13);
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, ctx_r1.order.totalAmount + ((tmp_2_0 = ctx_r1.order.discountAmount) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0) - ((tmp_2_0 = ctx_r1.order.shippingCost) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : 0)));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order.discountAmount ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order.shippingCost ? 7 : -1);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_28_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Horario: ", ctx_r1.order.pickupTimeSlotLabel, "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Punto de Retiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, OrderDetailComponent_Conditional_1_Conditional_28_Conditional_4_Template, 2, 1, "p", 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.order.pickupLocationName);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order.pickupTimeSlotLabel ? 4 : -1);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Direcci\xF3n de Env\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3);
    \u0275\u0275element(4, "br");
    \u0275\u0275text(5);
    \u0275\u0275element(6, "br");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.order.shippingAddress);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" ", ctx_r1.order.shippingCity, ", ", ctx_r1.order.shippingState, " ", ctx_r1.order.shippingZipCode, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.shippingCountry, "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_30_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16)(1, "span", 17);
    \u0275\u0275text(2, "Transportista:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.carrierName, "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_30_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16)(1, "span", 17);
    \u0275\u0275text(2, "Estado:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.order.shipmentStatus, "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_30_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 19)(1, "mat-icon");
    \u0275\u0275text(2, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ver gu\xEDa ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("href", ctx_r1.order.labelUrl, \u0275\u0275sanitizeUrl);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 6)(1, "h3")(2, "mat-icon", 15);
    \u0275\u0275text(3, "local_shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Seguimiento");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, OrderDetailComponent_Conditional_1_Conditional_30_Conditional_5_Template, 4, 1, "p", 16);
    \u0275\u0275elementStart(6, "p", 16)(7, "span", 17);
    \u0275\u0275text(8, "Rastreo:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 18);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, OrderDetailComponent_Conditional_1_Conditional_30_Conditional_11_Template, 4, 1, "p", 16)(12, OrderDetailComponent_Conditional_1_Conditional_30_Conditional_12_Template, 4, 1, "a", 19);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.order.carrierName ? 5 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.order.trackingNumber);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order.shipmentStatus ? 11 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order.labelUrl ? 12 : -1);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Transacci\xF3n: ", ctx_r1.order.paymentId, "");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "mat-icon");
    \u0275\u0275text(2, "comment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.ticket.adminNotes);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20)(1, "mat-icon", 22);
    \u0275\u0275text(2, "support_agent");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p")(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "p", 23);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, OrderDetailComponent_Conditional_1_Conditional_38_Conditional_1_Conditional_10_Template, 5, 1, "div", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Ticket #", ctx_r1.ticket.id, " \u2014 ", ctx_r1.ticket.status, "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.ticket.subject);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.ticket.description);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.ticket.adminNotes ? 10 : -1);
  }
}
function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3");
    \u0275\u0275text(1, "Reportar un problema");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-form-field", 25)(3, "mat-label");
    \u0275\u0275text(4, "Asunto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 26);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.ticketSubject, $event) || (ctx_r1.ticketSubject = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 25)(7, "mat-label");
    \u0275\u0275text(8, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "textarea", 27);
    \u0275\u0275twoWayListener("ngModelChange", function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template_textarea_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r1.ticketDescription, $event) || (ctx_r1.ticketDescription = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 28)(11, "button", 29);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.submitTicket());
    });
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "button", 30);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showForm = false);
    });
    \u0275\u0275text(14, "Cancelar");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.ticketSubject);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.ticketDescription);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.submitting || !ctx_r1.ticketSubject.trim() || !ctx_r1.ticketDescription.trim());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Enviando..." : "Enviar ticket", " ");
  }
}
function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function OrderDetailComponent_Conditional_1_Conditional_38_Conditional_3_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.showForm = true);
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "report_problem");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Reportar un problema ");
    \u0275\u0275elementEnd();
  }
}
function OrderDetailComponent_Conditional_1_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 8);
    \u0275\u0275template(1, OrderDetailComponent_Conditional_1_Conditional_38_Conditional_1_Template, 11, 5, "div", 20)(2, OrderDetailComponent_Conditional_1_Conditional_38_Conditional_2_Template, 15, 4)(3, OrderDetailComponent_Conditional_1_Conditional_38_Conditional_3_Template, 4, 0, "button", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.ticket ? 1 : ctx_r1.showForm ? 2 : 3);
  }
}
function OrderDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "a", 1);
    \u0275\u0275text(2, "\u2190 Volver a pedidos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h1");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 2)(6, "mat-card")(7, "h3");
    \u0275\u0275text(8, "Art\xEDculos del pedido");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(9, OrderDetailComponent_Conditional_1_For_10_Template, 12, 9, null, null, _forTrack0);
    \u0275\u0275template(11, OrderDetailComponent_Conditional_1_Conditional_11_Template, 8, 5);
    \u0275\u0275elementStart(12, "div", 3)(13, "span");
    \u0275\u0275text(14, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "currency");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div")(19, "mat-card", 4)(20, "h3");
    \u0275\u0275text(21, "Estado del pedido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-chip");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "p", 5);
    \u0275\u0275text(25);
    \u0275\u0275pipe(26, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "mat-card", 4);
    \u0275\u0275template(28, OrderDetailComponent_Conditional_1_Conditional_28_Template, 5, 2)(29, OrderDetailComponent_Conditional_1_Conditional_29_Template, 8, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(30, OrderDetailComponent_Conditional_1_Conditional_30_Template, 13, 4, "mat-card", 6);
    \u0275\u0275elementStart(31, "mat-card", 4)(32, "h3");
    \u0275\u0275text(33, "Pago");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "p");
    \u0275\u0275text(35);
    \u0275\u0275pipe(36, "titlecase");
    \u0275\u0275elementEnd();
    \u0275\u0275template(37, OrderDetailComponent_Conditional_1_Conditional_37_Template, 2, 1, "p", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(38, OrderDetailComponent_Conditional_1_Conditional_38_Template, 4, 1, "mat-card", 8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Pedido ", ctx_r1.order.orderNumber, "");
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.order.items);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order.discountAmount || ctx_r1.order.shippingCost ? 11 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 12, ctx_r1.order.totalAmount));
    \u0275\u0275advance(6);
    \u0275\u0275classMap("status-" + ctx_r1.order.status.toLowerCase());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.order.status);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Realizado el ", \u0275\u0275pipeBind2(26, 14, ctx_r1.order.createdAt, "medium"), "");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.order.shippingType === "PICKUP" ? 28 : 29);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order.trackingNumber ? 30 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("M\xE9todo: ", \u0275\u0275pipeBind1(36, 17, ctx_r1.order.paymentMethod), "");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.order.paymentId ? 37 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.order.status === "DELIVERED" ? 38 : -1);
  }
}
var OrderDetailComponent = class _OrderDetailComponent {
  constructor(route, orderService, ticketService, snackBar) {
    this.route = route;
    this.orderService = orderService;
    this.ticketService = ticketService;
    this.snackBar = snackBar;
    this.order = null;
    this.loading = true;
    this.showForm = false;
    this.submitting = false;
    this.ticketSubject = "";
    this.ticketDescription = "";
    this.ticket = null;
  }
  ngOnInit() {
    const orderNumber = this.route.snapshot.paramMap.get("orderNumber");
    this.orderService.getOrderByNumber(orderNumber).subscribe({
      next: (res) => {
        this.order = res.data;
        this.loading = false;
        if (res.data.status === "DELIVERED") {
          this.loadMyTicket();
        }
      },
      error: () => this.loading = false
    });
  }
  loadMyTicket() {
    this.ticketService.getMyTickets().subscribe({
      next: (res) => {
        this.ticket = res.data.find((t) => t.orderNumber === this.order.orderNumber) ?? null;
      }
    });
  }
  submitTicket() {
    if (!this.ticketSubject.trim() || !this.ticketDescription.trim())
      return;
    this.submitting = true;
    this.ticketService.createTicket(this.order.orderNumber, {
      subject: this.ticketSubject.trim(),
      description: this.ticketDescription.trim()
    }).subscribe({
      next: (res) => {
        this.ticket = res.data;
        this.showForm = false;
        this.submitting = false;
        this.snackBar.open("Ticket enviado. Lo revisaremos pronto.", "Cerrar", { duration: 4e3 });
      },
      error: (err) => {
        this.submitting = false;
        this.snackBar.open(err.error?.message || "Error al enviar el ticket", "Cerrar", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function OrderDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(TicketService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderDetailComponent, selectors: [["app-order-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "container"], ["mat-button", "", "routerLink", "/orders", 1, "back-link"], [1, "order-grid"], [1, "order-total"], [1, "info-card"], [1, "date"], [1, "info-card", "tracking-card"], [1, "payment-id"], [1, "info-card", "problem-card"], [1, "order-item"], [1, "item-info"], [1, "item-variant"], [1, "item-total"], [1, "order-subtotal-row"], [1, "order-subtotal-row", "discount"], [1, "tracking-icon"], [1, "tracking-row"], [1, "tl"], [1, "tracking-num"], ["mat-stroked-button", "", "color", "primary", "target", "_blank", "rel", "noopener", 2, "margin-top", "8px", 3, "href"], [1, "ticket-sent"], ["mat-stroked-button", "", "color", "warn", 1, "report-btn"], [1, "ticket-icon"], [1, "ticket-desc"], [1, "admin-notes"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "placeholder", "ej. El producto lleg\xF3 da\xF1ado", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "4", "placeholder", "Describe el problema con detalle...", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["mat-button", "", 3, "click"], ["mat-stroked-button", "", "color", "warn", 1, "report-btn", 3, "click"]], template: function OrderDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, OrderDetailComponent_Conditional_0_Template, 1, 0, "app-loading")(1, OrderDetailComponent_Conditional_1_Template, 39, 19, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.loading ? 0 : ctx.order ? 1 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, MatCardModule, MatCard, MatButtonModule, MatAnchor, MatButton, MatChipsModule, MatChip, MatDividerModule, MatDivider, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatIconModule, MatIcon, MatSnackBarModule, CurrencyPipe, DatePipe, TitleCasePipe, LoadingComponent], styles: ["\n\n.back-link[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.order-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n.order-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 0;\n}\n.item-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.item-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: var(--theme-primary) !important;\n  font-size: 0.85rem !important;\n}\n.item-total[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.order-subtotal-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 6px 0;\n  font-size: 0.9rem;\n  color: #666;\n}\n.order-subtotal-row.discount[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.order-total[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 16px 0 0;\n  font-size: 1.2rem;\n  font-weight: 700;\n  border-top: 1px solid #eee;\n  margin-top: 8px;\n}\n.info-card[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.date[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin-top: 8px;\n}\n.payment-id[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n  word-break: break-all;\n}\n.problem-card[_ngcontent-%COMP%] {\n  border: 1px solid #ffcdd2;\n}\n.report-btn[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 8px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 4px;\n}\n.ticket-sent[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.ticket-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: var(--theme-primary);\n}\n.ticket-desc[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 0.9rem;\n}\n.admin-notes[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: flex-start;\n  background: #e3f2fd;\n  border-radius: 6px;\n  padding: 10px;\n  margin-top: 8px;\n  font-size: 0.9rem;\n  color: #1565c0;\n}\n.tracking-card[_ngcontent-%COMP%] {\n  border: 1px solid #e3f2fd;\n}\n.tracking-icon[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  margin-right: 6px;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--theme-primary);\n}\n.tracking-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.9rem;\n  margin: 4px 0;\n}\n.tl[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #444;\n  min-width: 60px;\n}\n.tracking-num[_ngcontent-%COMP%] {\n  font-family: monospace;\n  background: #f0f4ff;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.88rem;\n}\n.status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0 !important;\n  color: #e65100 !important;\n}\n.status-confirmed[_ngcontent-%COMP%] {\n  background: #e3f2fd !important;\n  color: #1565c0 !important;\n}\n.status-delivered[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.status-cancelled[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n@media (max-width: 768px) {\n  .order-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=order-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderDetailComponent, { className: "OrderDetailComponent" });
})();
export {
  OrderDetailComponent
};
//# sourceMappingURL=chunk-BLURLPED.js.map
