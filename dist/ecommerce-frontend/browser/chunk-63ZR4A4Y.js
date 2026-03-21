import {
  CartService
} from "./chunk-UDBIOAEY.js";
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
  MatLabel,
  MatSuffix
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-WS62BK7G.js";
import {
  AuthService
} from "./chunk-UCCDLCX6.js";
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
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  CurrencyPipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/features/cart/cart.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.tempId;
var _c0 = (a0) => ["/products", a0];
function CartComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 1)(1, "mat-icon", 3);
    \u0275\u0275text(2, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Tu carrito est\xE1 vac\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "A\xFAn no has agregado productos a tu carrito.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 4);
    \u0275\u0275text(8, "Seguir comprando");
    \u0275\u0275elementEnd()();
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r2.selectedColorName, " ");
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Talla: ", item_r2.selectedSizeName, " ");
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275template(1, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_1_Template, 1, 1)(2, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_2_Template, 1, 0)(3, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.selectedColorName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.selectedColorName && item_r2.selectedSizeName ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.selectedSizeName ? 3 : -1);
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17)(1, "span", 22);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 23);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 3, item_r2.product.price));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 5, item_r2.product.discountedPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", item_r2.product.activePromotionDiscount, "% off");
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, item_r2.product.price));
  }
}
function CartComponent_Conditional_4_Conditional_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "div", 12);
    \u0275\u0275element(2, "img", 13);
    \u0275\u0275elementStart(3, "div", 14)(4, "a", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_6_Template, 4, 3, "p", 16)(7, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_7_Template, 9, 7, "p", 17)(8, CartComponent_Conditional_4_Conditional_2_For_1_Conditional_8_Template, 3, 3, "p", 17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 18)(10, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_2_For_1_Template_button_click_10_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateQuantity(item_r2, item_r2.quantity - 1));
    });
    \u0275\u0275elementStart(11, "mat-icon");
    \u0275\u0275text(12, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "span");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_2_For_1_Template_button_click_15_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateQuantity(item_r2, item_r2.quantity + 1));
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "span", 20);
    \u0275\u0275text(19);
    \u0275\u0275pipe(20, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 21);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_2_For_1_Template_button_click_21_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeItem(item_r2));
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r2.product.imageUrl || "https://via.placeholder.com/80", \u0275\u0275sanitizeUrl)("alt", item_r2.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(10, _c0, item_r2.product.slug));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.product.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.selectedColorName || item_r2.selectedSizeName ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r2.product.discountedPrice ? 7 : 8);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r2.quantity);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(20, 8, item_r2.subtotal));
  }
}
function CartComponent_Conditional_4_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CartComponent_Conditional_4_Conditional_2_For_1_Template, 24, 12, "mat-card", 11, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.cart.items());
  }
}
function CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r5.selectedColorName, " ");
  }
}
function CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Talla: ", item_r5.selectedSizeName, " ");
  }
}
function CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275template(1, CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_1_Template, 1, 1)(2, CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_2_Template, 1, 0)(3, CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.selectedColorName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.selectedColorName && item_r5.selectedSizeName ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.selectedSizeName ? 3 : -1);
  }
}
function CartComponent_Conditional_4_Conditional_3_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 11)(1, "div", 12);
    \u0275\u0275element(2, "img", 13);
    \u0275\u0275elementStart(3, "div", 14)(4, "span", 25);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CartComponent_Conditional_4_Conditional_3_For_1_Conditional_6_Template, 4, 3, "p", 16);
    \u0275\u0275elementStart(7, "p", 17);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 18)(11, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_3_For_1_Template_button_click_11_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cart.updateLocalQuantity(item_r5.tempId, item_r5.quantity - 1));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_3_For_1_Template_button_click_16_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cart.updateLocalQuantity(item_r5.tempId, item_r5.quantity + 1));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "span", 20);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 21);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_3_For_1_Template_button_click_22_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.cart.removeLocalItem(item_r5.tempId));
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r5.imageUrl || "https://via.placeholder.com/80", \u0275\u0275sanitizeUrl)("alt", item_r5.productName);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.productName);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r5.selectedColorName || item_r5.selectedSizeName ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 7, item_r5.price));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r5.quantity);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 9, item_r5.subtotal));
  }
}
function CartComponent_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CartComponent_Conditional_4_Conditional_3_For_1_Template, 25, 11, "mat-card", 11, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r2.cart.localItems());
  }
}
function CartComponent_Conditional_4_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 26)(1, "mat-form-field", 27)(2, "mat-label");
    \u0275\u0275text(3, "C\xF3digo de cup\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function CartComponent_Conditional_4_Conditional_13_Conditional_0_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r2.couponCode, $event) || (ctx_r2.couponCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keyup.enter", function CartComponent_Conditional_4_Conditional_13_Conditional_0_Template_input_keyup_enter_4_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.applyCoupon());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-icon", 29);
    \u0275\u0275text(6, "local_offer");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 30);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_13_Conditional_0_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.applyCoupon());
    });
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.couponCode);
    \u0275\u0275property("disabled", ctx_r2.applyingCoupon);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r2.couponCode || ctx_r2.applyingCoupon);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.applyingCoupon ? "..." : "Aplicar", " ");
  }
}
function CartComponent_Conditional_4_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 31)(1, "mat-icon", 32);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span")(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 33);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_13_Conditional_1_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.removeCoupon());
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 34)(11, "span");
    \u0275\u0275text(12, "Descuento");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "span", 35);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.cart.coupon().code);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2014 ", ctx_r2.cart.coupon().discountPercent, "% off");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(15, 3, ctx_r2.cart.discount()), "");
  }
}
function CartComponent_Conditional_4_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CartComponent_Conditional_4_Conditional_13_Conditional_0_Template, 9, 4, "div", 26)(1, CartComponent_Conditional_4_Conditional_13_Conditional_1_Template, 16, 5);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(!ctx_r2.cart.coupon() ? 0 : 1);
  }
}
function CartComponent_Conditional_4_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_28_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.clearCart());
    });
    \u0275\u0275text(1, "Vaciar carrito");
    \u0275\u0275elementEnd();
  }
}
function CartComponent_Conditional_4_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 36);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.cart.clearLocalCart());
    });
    \u0275\u0275text(1, "Vaciar carrito");
    \u0275\u0275elementEnd();
  }
}
function CartComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 5);
    \u0275\u0275template(2, CartComponent_Conditional_4_Conditional_2_Template, 2, 0)(3, CartComponent_Conditional_4_Conditional_3_Template, 2, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card", 6)(5, "h2");
    \u0275\u0275text(6, "Resumen del pedido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 7)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(13, CartComponent_Conditional_4_Conditional_13_Template, 2, 1);
    \u0275\u0275elementStart(14, "div", 7)(15, "span");
    \u0275\u0275text(16, "Env\xEDo");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span");
    \u0275\u0275text(18, "Calculado en checkout");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(19, "hr");
    \u0275\u0275elementStart(20, "div", 8)(21, "span");
    \u0275\u0275text(22, "Subtotal");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "a", 9);
    \u0275\u0275text(27, " Ir al pago ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(28, CartComponent_Conditional_4_Conditional_28_Template, 2, 0, "button", 10)(29, CartComponent_Conditional_4_Conditional_29_Template, 2, 0, "button", 10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.auth.isLoggedIn() ? 2 : 3);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Productos (", ctx_r2.cart.itemCount(), ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 6, ctx_r2.cart.subtotal()));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.auth.isLoggedIn() ? 13 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(25, 8, ctx_r2.cart.total()));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.auth.isLoggedIn() ? 28 : 29);
  }
}
var CartComponent = class _CartComponent {
  constructor(cart, auth, snackBar) {
    this.cart = cart;
    this.auth = auth;
    this.snackBar = snackBar;
    this.couponCode = "";
    this.applyingCoupon = false;
  }
  ngOnInit() {
    this.cart.loadCart();
  }
  isEmpty() {
    return this.auth.isLoggedIn() ? this.cart.items().length === 0 : this.cart.localItems().length === 0;
  }
  applyCoupon() {
    if (!this.couponCode.trim())
      return;
    this.applyingCoupon = true;
    this.cart.validateCoupon(this.couponCode).subscribe({
      next: (res) => {
        this.applyingCoupon = false;
        this.couponCode = "";
        this.snackBar.open(`Cup\xF3n aplicado: ${res.data.discountPercent}% de descuento`, "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.applyingCoupon = false;
        this.snackBar.open(err.error?.message || "C\xF3digo de cup\xF3n inv\xE1lido", "Cerrar", { duration: 3e3 });
      }
    });
  }
  removeCoupon() {
    this.cart.removeCoupon();
    this.snackBar.open("Cup\xF3n eliminado", "Cerrar", { duration: 2e3 });
  }
  updateQuantity(item, quantity) {
    if (quantity <= 0) {
      this.removeItem(item);
      return;
    }
    this.cart.updateQuantity(item.id, quantity).subscribe();
  }
  removeItem(item) {
    this.cart.removeItem(item.id).subscribe({
      next: () => this.snackBar.open("Producto eliminado", "Cerrar", { duration: 2e3 })
    });
  }
  clearCart() {
    this.cart.clearCart().subscribe({
      next: () => this.snackBar.open("Carrito vaciado", "Cerrar", { duration: 2e3 })
    });
  }
  static {
    this.\u0275fac = function CartComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CartComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 1, consts: [[1, "container"], [1, "empty-cart"], [1, "cart-layout"], [1, "empty-icon"], ["mat-raised-button", "", "color", "primary", "routerLink", "/"], [1, "cart-items"], [1, "cart-summary"], [1, "summary-row"], [1, "summary-row", "total"], ["mat-raised-button", "", "color", "primary", "routerLink", "/checkout", 1, "checkout-btn"], ["mat-button", "", "color", "warn", 1, "clear-btn"], [1, "cart-item"], [1, "item-content"], [3, "src", "alt"], [1, "item-info"], [1, "item-name", 3, "routerLink"], [1, "item-variant"], [1, "item-price"], [1, "quantity-controls"], ["mat-icon-button", "", 3, "click"], [1, "item-subtotal"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "original-price"], [1, "discounted-price"], [1, "promo-badge"], [1, "item-name"], [1, "coupon-row"], ["appearance", "outline", 1, "coupon-field"], ["matInput", "", "placeholder", "ej. BUENFIN10", 3, "ngModelChange", "keyup.enter", "ngModel", "disabled"], ["matSuffix", ""], ["mat-stroked-button", "", 3, "click", "disabled"], [1, "coupon-applied"], [1, "coupon-icon"], ["mat-icon-button", "", "title", "Remove coupon", 3, "click"], [1, "summary-row", "discount-row"], [1, "discount-value"], ["mat-button", "", "color", "warn", 1, "clear-btn", 3, "click"]], template: function CartComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Mi Carrito");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CartComponent_Conditional_3_Template, 9, 0, "mat-card", 1)(4, CartComponent_Conditional_4_Template, 30, 10, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.isEmpty() ? 3 : 4);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatSnackBarModule, CurrencyPipe], styles: ["\n\n.empty-cart[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n}\n.cart-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 24px;\n}\n.cart-item[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.item-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 8px;\n}\n.item-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 4px;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-size: 0.82rem;\n  margin: 2px 0 0;\n}\n.item-price[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 2px 0 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-wrap: wrap;\n}\n.original-price[_ngcontent-%COMP%] {\n  text-decoration: line-through;\n  color: #aaa;\n  font-size: 0.85rem;\n}\n.discounted-price[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-weight: 600;\n}\n.promo-badge[_ngcontent-%COMP%] {\n  background: #d32f2f;\n  color: #fff;\n  font-size: 0.7rem;\n  padding: 1px 6px;\n  border-radius: 10px;\n}\n.quantity-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.item-subtotal[_ngcontent-%COMP%] {\n  font-weight: 600;\n  min-width: 80px;\n  text-align: right;\n}\n.cart-summary[_ngcontent-%COMP%] {\n  padding: 24px;\n  position: sticky;\n  top: 80px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n}\n.summary-row.total[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n}\n.coupon-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 8px 0 4px;\n}\n.coupon-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.coupon-applied[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #e8f5e9;\n  border-radius: 6px;\n  padding: 6px 10px;\n  margin: 8px 0 4px;\n  font-size: 0.9rem;\n}\n.coupon-icon[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.coupon-applied[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.discount-row[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.discount-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.checkout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 8px;\n}\n@media (max-width: 768px) {\n  .cart-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=cart.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent" });
})();
export {
  CartComponent
};
//# sourceMappingURL=chunk-63ZR4A4Y.js.map
