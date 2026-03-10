import {
  MatTableModule
} from "./chunk-WC4CRWHR.js";
import {
  CartService
} from "./chunk-L245GHPG.js";
import {
  MatCard,
  MatCardModule
} from "./chunk-ZVZR7W4N.js";
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
  MatButton,
  MatButtonModule,
  MatIconButton,
  RouterLink
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
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
  ɵɵtextInterpolate1
} from "./chunk-RP6JOKCW.js";

// src/app/features/cart/cart.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = (a0) => ["/products", a0];
function CartComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 1)(1, "mat-icon", 3);
    \u0275\u0275text(2, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h2");
    \u0275\u0275text(4, "Your cart is empty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Looks like you haven't added anything to your cart yet.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 4);
    \u0275\u0275text(8, "Continue Shopping");
    \u0275\u0275elementEnd()();
  }
}
function CartComponent_Conditional_4_For_3_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Color: ", item_r3.selectedColorName, " ");
  }
}
function CartComponent_Conditional_4_For_3_Conditional_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " \xB7 ");
  }
}
function CartComponent_Conditional_4_For_3_Conditional_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" Size: ", item_r3.selectedSizeName, " ");
  }
}
function CartComponent_Conditional_4_For_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275template(1, CartComponent_Conditional_4_For_3_Conditional_6_Conditional_1_Template, 1, 1)(2, CartComponent_Conditional_4_For_3_Conditional_6_Conditional_2_Template, 1, 0)(3, CartComponent_Conditional_4_For_3_Conditional_6_Conditional_3_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.selectedColorName ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.selectedColorName && item_r3.selectedSizeName ? 2 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.selectedSizeName ? 3 : -1);
  }
}
function CartComponent_Conditional_4_For_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 6)(1, "div", 12);
    \u0275\u0275element(2, "img", 13);
    \u0275\u0275elementStart(3, "div", 14)(4, "a", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, CartComponent_Conditional_4_For_3_Conditional_6_Template, 4, 3, "p", 16);
    \u0275\u0275elementStart(7, "p", 17);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 18)(11, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_For_3_Template_button_click_11_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQuantity(item_r3, item_r3.quantity - 1));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 19);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_For_3_Template_button_click_16_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.updateQuantity(item_r3, item_r3.quantity + 1));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "span", 20);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 21);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_For_3_Template_button_click_22_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeItem(item_r3));
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r3.product.imageUrl || "https://via.placeholder.com/80", \u0275\u0275sanitizeUrl)("alt", item_r3.product.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c0, item_r3.product.slug));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.product.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r3.selectedColorName || item_r3.selectedSizeName ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 8, item_r3.product.price));
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r3.quantity);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(21, 10, item_r3.subtotal));
  }
}
function CartComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 5);
    \u0275\u0275repeaterCreate(2, CartComponent_Conditional_4_For_3_Template, 25, 14, "mat-card", 6, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-card", 7)(5, "h2");
    \u0275\u0275text(6, "Order Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 8)(8, "span");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 8)(14, "span");
    \u0275\u0275text(15, "Shipping");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Free");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(18, "hr");
    \u0275\u0275elementStart(19, "div", 9)(20, "span");
    \u0275\u0275text(21, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "currency");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "a", 10);
    \u0275\u0275text(26, " Proceed to Checkout ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 11);
    \u0275\u0275listener("click", function CartComponent_Conditional_4_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearCart());
    });
    \u0275\u0275text(28, "Clear Cart");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r3.cart.items());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Items (", ctx_r3.cart.itemCount(), ")");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(12, 3, ctx_r3.cart.total()));
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(24, 5, ctx_r3.cart.total()));
  }
}
var CartComponent = class _CartComponent {
  constructor(cart, snackBar) {
    this.cart = cart;
    this.snackBar = snackBar;
  }
  ngOnInit() {
    this.cart.loadCart();
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
      next: () => this.snackBar.open("Item removed", "Close", { duration: 2e3 })
    });
  }
  clearCart() {
    this.cart.clearCart().subscribe({
      next: () => this.snackBar.open("Cart cleared", "Close", { duration: 2e3 })
    });
  }
  static {
    this.\u0275fac = function CartComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CartComponent)(\u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CartComponent, selectors: [["app-cart"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 5, vars: 1, consts: [[1, "container"], [1, "empty-cart"], [1, "cart-layout"], [1, "empty-icon"], ["mat-raised-button", "", "color", "primary", "routerLink", "/"], [1, "cart-items"], [1, "cart-item"], [1, "cart-summary"], [1, "summary-row"], [1, "summary-row", "total"], ["mat-raised-button", "", "color", "primary", "routerLink", "/checkout", 1, "checkout-btn"], ["mat-button", "", "color", "warn", 1, "clear-btn", 3, "click"], [1, "item-content"], [3, "src", "alt"], [1, "item-info"], [1, "item-name", 3, "routerLink"], [1, "item-variant"], [1, "item-price"], [1, "quantity-controls"], ["mat-icon-button", "", 3, "click"], [1, "item-subtotal"], ["mat-icon-button", "", "color", "warn", 3, "click"]], template: function CartComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h1");
        \u0275\u0275text(2, "Shopping Cart");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CartComponent_Conditional_3_Template, 9, 0, "mat-card", 1)(4, CartComponent_Conditional_4_Template, 29, 7, "div", 2);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.cart.items().length === 0 ? 3 : 4);
      }
    }, dependencies: [RouterLink, MatTableModule, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatSnackBarModule, CurrencyPipe], styles: ["\n\n.empty-cart[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n}\n.empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ccc;\n}\n.cart-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 350px;\n  gap: 24px;\n}\n.cart-item[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.item-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 8px;\n}\n.item-content[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 4px;\n}\n.item-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #333;\n}\n.item-variant[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-size: 0.82rem;\n  margin: 2px 0 0;\n}\n.item-price[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 2px 0 0;\n}\n.quantity-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.item-subtotal[_ngcontent-%COMP%] {\n  font-weight: 600;\n  min-width: 80px;\n  text-align: right;\n}\n.cart-summary[_ngcontent-%COMP%] {\n  padding: 24px;\n  position: sticky;\n  top: 80px;\n}\n.summary-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n}\n.summary-row.total[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n}\n.checkout-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.clear-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 8px;\n}\n@media (max-width: 768px) {\n  .cart-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=cart.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CartComponent, { className: "CartComponent" });
})();
export {
  CartComponent
};
//# sourceMappingURL=chunk-O6WUQKSV.js.map
