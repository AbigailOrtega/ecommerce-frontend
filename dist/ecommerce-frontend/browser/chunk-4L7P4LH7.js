import {
  ProductService
} from "./chunk-AB4V5TRK.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-NFSWPOPY.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
import {
  AuthService
} from "./chunk-KYTBZJSG.js";
import "./chunk-7VTKONPA.js";
import "./chunk-JDEIMQFJ.js";
import "./chunk-MKJAF7VR.js";
import {
  CartService
} from "./chunk-L245GHPG.js";
import {
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
  ActivatedRoute,
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
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-RP6JOKCW.js";

// src/app/features/products/product-detail/product-detail.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => ["/"];
var _c1 = (a0) => ({ category: a0 });
function ProductDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_4_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_4_For_8_Template_span_click_0_listener() {
      const \u0275$index_26_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.activeIndex = \u0275$index_26_r5);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_26_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", \u0275$index_26_r5 === ctx_r2.activeIndex);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 18);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.prev());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 19);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.next());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 20);
    \u0275\u0275repeaterCreate(7, ProductDetailComponent_Conditional_1_Conditional_4_For_8_Template, 1, 2, "span", 21, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.activeIndex === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", ctx_r2.activeIndex === ctx_r2.carouselImages.length - 1);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r2.carouselImages);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_5_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "img", 24);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_5_For_2_Template_img_click_0_listener() {
      const \u0275$index_32_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.activeIndex = \u0275$index_32_r7);
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const img_r8 = ctx.$implicit;
    const \u0275$index_32_r7 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", \u0275$index_32_r7 === ctx_r2.activeIndex);
    \u0275\u0275property("src", img_r8, \u0275\u0275sanitizeUrl)("alt", "Image " + (\u0275$index_32_r7 + 1));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_5_For_2_Template, 1, 4, "img", 23, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.carouselImages);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_7_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1, "/");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, ProductDetailComponent_Conditional_1_Conditional_7_For_2_Conditional_2_Template, 2, 0, "span", 26);
  }
  if (rf & 2) {
    const cat_r9 = ctx.$implicit;
    const \u0275$index_40_r10 = ctx.$index;
    const \u0275$count_40_r11 = ctx.$count;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c0))("queryParams", \u0275\u0275pureFunction1(5, _c1, cat_r9.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_40_r10 === \u0275$count_40_r11 - 1) ? 2 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_7_For_2_Template, 3, 7, null, null, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.product.categories);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 28);
    \u0275\u0275text(4, "Sale");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx_r2.product.compareAtPrice));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 29)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" In Stock (", ctx_r2.product.stockQuantity, ")");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 30)(1, "mat-icon");
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Out of Stock");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_0_Template, 4, 1, "mat-chip", 29)(1, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_1_Template, 4, 0, "mat-chip", 30);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.product.stockQuantity > 0 ? 0 : 1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 11);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("SKU: ", ctx_r2.product.sku, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_20_For_8_Template_button_click_0_listener() {
      const c_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.selectColor(c_r13));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.selectedColor === c_r13);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r13.name, " ");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_9_For_7_Template_button_click_0_listener() {
      const s_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.selectSize(s_r15));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("selected", ctx_r2.selectedSize === s_r15)("out-of-stock-btn", s_r15.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r15.name, " ");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "p", 32);
    \u0275\u0275text(2, "Size: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 33);
    \u0275\u0275repeaterCreate(6, ProductDetailComponent_Conditional_1_Conditional_20_Conditional_9_For_7_Template, 2, 5, "button", 36, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r2.selectedSize == null ? null : ctx_r2.selectedSize.name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.selectedColor.sizes);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 37);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", ctx_r2.selectedSize.stock, " in stock for ", ctx_r2.selectedColor.name, " / ", ctx_r2.selectedSize.name, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Out of stock for ", ctx_r2.selectedColor.name, " / ", ctx_r2.selectedSize.name, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Conditional_0_Template, 2, 3, "p", 37)(1, ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Conditional_1_Template, 2, 2, "p", 38);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r2.selectedSize.stock > 0 ? 0 : 1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 31)(2, "p", 32);
    \u0275\u0275text(3, "Color: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 33);
    \u0275\u0275repeaterCreate(7, ProductDetailComponent_Conditional_1_Conditional_20_For_8_Template, 2, 3, "button", 34, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ProductDetailComponent_Conditional_1_Conditional_20_Conditional_9_Template, 8, 1, "div", 31)(10, ProductDetailComponent_Conditional_1_Conditional_20_Conditional_10_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r2.selectedColor == null ? null : ctx_r2.selectedColor.name);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.colors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedColor && ctx_r2.selectedColor.sizes.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedColor && ctx_r2.selectedSize ? 10 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1, "Please select a color and size before adding to cart.");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
    \u0275\u0275element(3, "img", 3);
    \u0275\u0275template(4, ProductDetailComponent_Conditional_1_Conditional_4_Template, 9, 2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ProductDetailComponent_Conditional_1_Conditional_5_Template, 3, 0, "div", 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 5);
    \u0275\u0275template(7, ProductDetailComponent_Conditional_1_Conditional_7_Template, 3, 0, "div", 6);
    \u0275\u0275elementStart(8, "h1");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 7)(11, "span", 8);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(14, ProductDetailComponent_Conditional_1_Conditional_14_Template, 5, 3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p", 9);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 10);
    \u0275\u0275template(18, ProductDetailComponent_Conditional_1_Conditional_18_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(19, ProductDetailComponent_Conditional_1_Conditional_19_Template, 2, 1, "p", 11)(20, ProductDetailComponent_Conditional_1_Conditional_20_Template, 11, 3, "div", 12);
    \u0275\u0275elementStart(21, "div", 13)(22, "button", 14);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.quantity > 1 && (ctx_r2.quantity = ctx_r2.quantity - 1));
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "span", 15);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 14);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.quantity = ctx_r2.quantity + 1);
    });
    \u0275\u0275elementStart(28, "mat-icon");
    \u0275\u0275text(29, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, ProductDetailComponent_Conditional_1_Conditional_30_Template, 2, 0, "p", 16);
    \u0275\u0275elementStart(31, "button", 17);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart());
    });
    \u0275\u0275elementStart(32, "mat-icon");
    \u0275\u0275text(33, "add_shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("src", ctx_r2.carouselImages[ctx_r2.activeIndex], \u0275\u0275sanitizeUrl)("alt", ctx_r2.product.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.carouselImages.length > 1 ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.carouselImages.length > 1 ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.product.categories && ctx_r2.product.categories.length > 0 ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.product.name);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(13, 16, ctx_r2.product.price));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.product.compareAtPrice ? 14 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.product.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.colors.length === 0 ? 18 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.product.sku ? 19 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.colors.length > 0 ? 20 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.colors.length > 0 && (!ctx_r2.selectedColor || ctx_r2.selectedColor.sizes.length > 0 && !ctx_r2.selectedSize) ? 30 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isAddToCartDisabled());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.addToCartLabel(), " ");
  }
}
var ProductDetailComponent = class _ProductDetailComponent {
  constructor(route, productService, cartService, authService, snackBar) {
    this.route = route;
    this.productService = productService;
    this.cartService = cartService;
    this.authService = authService;
    this.snackBar = snackBar;
    this.product = null;
    this.loading = true;
    this.quantity = 1;
    this.activeIndex = 0;
    this.carouselImages = [];
    this.colors = [];
    this.selectedColor = null;
    this.selectedSize = null;
  }
  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get("slug");
    this.productService.getProductBySlug(slug).subscribe({
      next: (res) => {
        this.product = res.data;
        this.colors = res.data.colors || [];
        if (this.colors.length > 0) {
          this.selectColor(this.colors[0]);
        } else {
          this.buildCarouselImages();
        }
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  buildCarouselImages() {
    if (!this.product)
      return;
    const all = [];
    if (this.product.imageUrl)
      all.push(this.product.imageUrl);
    for (const img of this.product.images || []) {
      if (!all.includes(img))
        all.push(img);
    }
    this.carouselImages = all.length > 0 ? all : ["https://via.placeholder.com/500x400?text=No+Image"];
    this.activeIndex = 0;
  }
  selectColor(color) {
    this.selectedColor = color;
    this.selectedSize = color.sizes.length > 0 ? color.sizes[0] : null;
    const imgs = color.images.length > 0 ? color.images : [];
    if (imgs.length > 0) {
      this.carouselImages = imgs;
    } else {
      this.buildCarouselImages();
    }
    this.activeIndex = 0;
  }
  selectSize(size) {
    this.selectedSize = size;
  }
  prev() {
    if (this.activeIndex > 0)
      this.activeIndex--;
  }
  next() {
    if (this.activeIndex < this.carouselImages.length - 1)
      this.activeIndex++;
  }
  isAddToCartDisabled() {
    if (!this.product)
      return true;
    if (this.colors.length > 0) {
      if (!this.selectedColor)
        return true;
      if (this.selectedColor.sizes.length > 0 && !this.selectedSize)
        return true;
      if (this.selectedSize && this.selectedSize.stock === 0)
        return true;
    } else {
      if (this.product.stockQuantity === 0)
        return true;
    }
    return false;
  }
  addToCartLabel() {
    if (this.colors.length > 0) {
      if (!this.selectedColor)
        return "Select Color";
      if (this.selectedColor.sizes.length > 0 && !this.selectedSize)
        return "Select Size";
      if (this.selectedSize && this.selectedSize.stock === 0)
        return "Out of Stock";
    } else if (this.product?.stockQuantity === 0) {
      return "Out of Stock";
    }
    return "Add to Cart";
  }
  addToCart() {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open("Please sign in first", "Close", { duration: 3e3 });
      return;
    }
    if (!this.product)
      return;
    this.cartService.addToCart(this.product.id, this.quantity, this.selectedSize?.id).subscribe({
      next: () => this.snackBar.open("Added to cart!", "Close", { duration: 2e3 }),
      error: () => this.snackBar.open("Failed to add to cart", "Close", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "container", "detail-grid"], [1, "image-section"], [1, "carousel"], [1, "main-image", 3, "src", "alt"], [1, "thumbnail-row"], [1, "info-section"], [1, "breadcrumbs"], [1, "price-section"], [1, "price"], [1, "description"], [1, "stock-info"], [1, "sku"], [1, "variants-section"], [1, "quantity-section"], ["mat-icon-button", "", 3, "click"], [1, "quantity"], [1, "selection-warning"], ["mat-raised-button", "", "color", "primary", 1, "add-btn", 3, "click", "disabled"], ["mat-icon-button", "", 1, "carousel-btn", "prev", 3, "click", "disabled"], ["mat-icon-button", "", 1, "carousel-btn", "next", 3, "click", "disabled"], [1, "carousel-dots"], [1, "dot", 3, "active"], [1, "dot", 3, "click"], [1, "thumbnail", 3, "src", "selected", "alt"], [1, "thumbnail", 3, "click", "src", "alt"], [1, "breadcrumb", 3, "routerLink", "queryParams"], [1, "separator"], [1, "compare-price"], [1, "sale-chip"], [1, "in-stock"], [1, "out-of-stock"], [1, "variant-group"], [1, "variant-label"], [1, "variant-options"], [1, "variant-btn", 3, "selected"], [1, "variant-btn", 3, "click"], [1, "variant-btn", 3, "selected", "out-of-stock-btn"], [1, "variant-stock", "in-stock-text"], [1, "variant-stock", "out-of-stock-text"]], template: function ProductDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProductDetailComponent_Conditional_0_Template, 1, 0, "app-loading")(1, ProductDetailComponent_Conditional_1_Template, 35, 18, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.loading ? 0 : ctx.product ? 1 : -1);
      }
    }, dependencies: [RouterLink, MatCardModule, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatChipsModule, MatChip, MatSnackBarModule, CurrencyPipe, LoadingComponent], styles: ["\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  padding: 32px 16px;\n}\n.carousel[_ngcontent-%COMP%] {\n  position: relative;\n}\n.main-image[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 8px;\n  object-fit: cover;\n  max-height: 500px;\n  display: block;\n}\n.carousel-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(255, 255, 255, 0.9) !important;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n.carousel-btn.prev[_ngcontent-%COMP%] {\n  left: 8px;\n}\n.carousel-btn.next[_ngcontent-%COMP%] {\n  right: 8px;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-top: 12px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #ccc;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: #3f51b5;\n}\n.thumbnail-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n.thumbnail[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  border: 2px solid transparent;\n}\n.thumbnail[_ngcontent-%COMP%]:hover {\n  border-color: #3f51b5;\n}\n.thumbnail.selected[_ngcontent-%COMP%] {\n  border-color: #3f51b5;\n}\n.breadcrumbs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n}\n.separator[_ngcontent-%COMP%] {\n  color: #ccc;\n  font-size: 0.9rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 8px 0 16px;\n}\n.price-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: #3f51b5;\n}\n.compare-price[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #999;\n  text-decoration: line-through;\n}\n.sale-chip[_ngcontent-%COMP%] {\n  background: #ff5722 !important;\n  color: white !important;\n}\n.description[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.6;\n  margin-bottom: 24px;\n}\n.stock-info[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.in-stock[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.out-of-stock[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n.sku[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n}\n.quantity-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 24px 0;\n}\n.quantity[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 500;\n  min-width: 32px;\n  text-align: center;\n}\n.selection-warning[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #e65100;\n  margin: 0 0 8px;\n}\n.add-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  font-size: 1.1rem;\n}\n.variants-section[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.variant-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.variant-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: #555;\n}\n.variant-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.variant-btn[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1.5px solid #ccc;\n  border-radius: 4px;\n  background: white;\n  cursor: pointer;\n  font-size: 0.9rem;\n  transition: all 0.15s;\n}\n.variant-btn[_ngcontent-%COMP%]:hover {\n  border-color: #3f51b5;\n  color: #3f51b5;\n}\n.variant-btn.selected[_ngcontent-%COMP%] {\n  border-color: #3f51b5;\n  background: #3f51b5;\n  color: white;\n}\n.variant-btn.out-of-stock-btn[_ngcontent-%COMP%] {\n  color: #bbb;\n  border-color: #eee;\n  text-decoration: line-through;\n  cursor: default;\n}\n.variant-stock[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.in-stock-text[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.out-of-stock-text[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n@media (max-width: 768px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=product-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent" });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-4L7P4LH7.js.map
