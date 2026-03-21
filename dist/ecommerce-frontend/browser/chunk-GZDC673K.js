import {
  MatCard,
  MatCardModule
} from "./chunk-WL5UKMCF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  Router,
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  MatAnchor,
  MatButtonModule
} from "./chunk-TPU3W7C5.js";
import {
  CurrencyPipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N3527UH3.js";

// src/app/features/checkout/order-confirmation/order-confirmation.component.ts
function OrderConfirmationComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 3);
    \u0275\u0275text(1, "Pedido ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("#", ctx_r0.orderNumber, "");
  }
}
function OrderConfirmationComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Enviamos la confirmaci\xF3n a ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0.email);
  }
}
function OrderConfirmationComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Total: ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 1, ctx_r0.total));
  }
}
var OrderConfirmationComponent = class _OrderConfirmationComponent {
  constructor(router) {
    this.router = router;
    this.orderNumber = null;
    this.email = null;
    this.total = null;
  }
  ngOnInit() {
    const state = this.router.getCurrentNavigation()?.extras?.state ?? history.state;
    if (state) {
      this.orderNumber = state["orderNumber"] ?? null;
      this.email = state["email"] ?? null;
      this.total = state["total"] ?? null;
    }
  }
  static {
    this.\u0275fac = function OrderConfirmationComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderConfirmationComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _OrderConfirmationComponent, selectors: [["app-order-confirmation"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 3, consts: [[1, "container", "confirmation-container"], [1, "confirmation-card"], [1, "success-icon"], [1, "order-number"], [1, "email-notice"], [1, "total-notice"], [1, "hint"], [1, "actions"], ["mat-raised-button", "", "color", "primary", "routerLink", "/register"], ["mat-stroked-button", "", "routerLink", "/"]], template: function OrderConfirmationComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-icon", 2);
        \u0275\u0275text(3, "check_circle");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "h1");
        \u0275\u0275text(5, "\xA1Pedido confirmado!");
        \u0275\u0275elementEnd();
        \u0275\u0275template(6, OrderConfirmationComponent_Conditional_6_Template, 4, 1, "p", 3)(7, OrderConfirmationComponent_Conditional_7_Template, 4, 1, "p", 4)(8, OrderConfirmationComponent_Conditional_8_Template, 5, 3, "p", 5);
        \u0275\u0275elementStart(9, "p", 6);
        \u0275\u0275text(10, "Revisa tu bandeja de entrada para los detalles de tu pedido.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "div", 7)(12, "a", 8);
        \u0275\u0275text(13, "Crear cuenta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "a", 9);
        \u0275\u0275text(15, "Seguir comprando");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.orderNumber ? 6 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.email ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.total ? 8 : -1);
      }
    }, dependencies: [RouterLink, MatButtonModule, MatAnchor, MatIconModule, MatIcon, MatCardModule, MatCard, CurrencyPipe], styles: ["\n\n.confirmation-container[_ngcontent-%COMP%] {\n  max-width: 560px;\n  margin: 48px auto;\n  padding: 16px;\n}\n.confirmation-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 32px;\n}\n.success-icon[_ngcontent-%COMP%] {\n  font-size: 72px;\n  width: 72px;\n  height: 72px;\n  color: #2e7d32;\n  margin-bottom: 16px;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\n.order-number[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: #333;\n  margin: 8px 0;\n}\n.email-notice[_ngcontent-%COMP%] {\n  color: #555;\n  margin: 8px 0;\n}\n.total-notice[_ngcontent-%COMP%] {\n  color: #333;\n  font-size: 1.05rem;\n  margin: 8px 0;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.9rem;\n  margin: 16px 0 32px;\n}\n.actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n/*# sourceMappingURL=order-confirmation.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(OrderConfirmationComponent, { className: "OrderConfirmationComponent" });
})();
export {
  OrderConfirmationComponent
};
//# sourceMappingURL=chunk-GZDC673K.js.map
