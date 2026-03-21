import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-UE3BHG3N.js";
import "./chunk-JITF7FU4.js";
import {
  ProductService
} from "./chunk-PECVZCK6.js";
import {
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import "./chunk-YPEJ5GST.js";
import "./chunk-4Y3BE5O3.js";
import {
  CartService
} from "./chunk-UDBIOAEY.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-US5PAJIM.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/features/products/product-list/product-list.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => [12, 24, 48];
var _c1 = (a0) => ["/products", a0];
function ProductListComponent_Conditional_0_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 10);
    \u0275\u0275element(1, "img", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("href", banner_r1.linkUrl, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("src", banner_r1.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProductListComponent_Conditional_0_For_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 11);
  }
  if (rf & 2) {
    const banner_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", banner_r1.imageUrl, \u0275\u0275sanitizeUrl);
  }
}
function ProductListComponent_Conditional_0_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, ProductListComponent_Conditional_0_For_3_Conditional_1_Template, 2, 2, "a", 10)(2, ProductListComponent_Conditional_0_For_3_Conditional_2_Template, 1, 1, "img", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(banner_r1.linkUrl ? 1 : 2);
  }
}
function ProductListComponent_Conditional_0_Conditional_4_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 16);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_0_Conditional_4_For_6_Template_span_click_0_listener() {
      const \u0275$index_26_r5 = \u0275\u0275restoreView(_r4).$index;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.goToSlide(\u0275$index_26_r5));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const \u0275$index_26_r5 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("active", \u0275$index_26_r5 === ctx_r2.carouselIndex);
  }
}
function ProductListComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 12);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_0_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.prevSlide());
    });
    \u0275\u0275text(1, "\u2039");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 13);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_0_Conditional_4_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.nextSlide());
    });
    \u0275\u0275text(3, "\u203A");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14);
    \u0275\u0275repeaterCreate(5, ProductListComponent_Conditional_0_Conditional_4_For_6_Template, 1, 2, "span", 15, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r2.banners);
  }
}
function ProductListComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 0)(1, "div", 8);
    \u0275\u0275repeaterCreate(2, ProductListComponent_Conditional_0_For_3_Template, 3, 1, "div", 9, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ProductListComponent_Conditional_0_Conditional_4_Template, 7, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275styleProp("transform", "translateX(-" + ctx_r2.carouselIndex * 100 + "%)");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.banners);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.banners.length > 1 ? 4 : -1);
  }
}
function ProductListComponent_Conditional_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 17);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_12_For_4_Template_button_click_0_listener() {
      const cat_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.selectCategory(cat_r8.id));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("active", ctx_r2.selectedCategory === cat_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", cat_r8.name, " ");
  }
}
function ProductListComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 6)(1, "button", 17);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_12_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.selectCategory(0));
    });
    \u0275\u0275text(2, " Todos ");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(3, ProductListComponent_Conditional_12_For_4_Template, 2, 3, "button", 18, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("active", ctx_r2.selectedCategory === 0);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.categories);
  }
}
function ProductListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function ProductListComponent_Conditional_14_For_2_Conditional_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const product_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275textInterpolate1(" +", product_r11.categories.length - 1, "");
  }
}
function ProductListComponent_Conditional_14_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26);
    \u0275\u0275text(1);
    \u0275\u0275template(2, ProductListComponent_Conditional_14_For_2_Conditional_7_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(product_r11.categories[0].name);
    \u0275\u0275advance();
    \u0275\u0275conditional(product_r11.categories.length > 1 ? 2 : -1);
  }
}
function ProductListComponent_Conditional_14_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 31);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 4, product_r11.discountedPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 6, product_r11.price));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", product_r11.activePromotionName, " -", product_r11.activePromotionDiscount, "%");
  }
}
function ProductListComponent_Conditional_14_For_2_Conditional_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 30);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, product_r11.compareAtPrice));
  }
}
function ProductListComponent_Conditional_14_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ProductListComponent_Conditional_14_For_2_Conditional_10_Conditional_3_Template, 3, 3, "span", 30);
  }
  if (rf & 2) {
    const product_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, product_r11.price));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(product_r11.compareAtPrice ? 3 : -1);
  }
}
function ProductListComponent_Conditional_14_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 20)(1, "a", 23);
    \u0275\u0275element(2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-card-content")(4, "a", 25)(5, "h3");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, ProductListComponent_Conditional_14_For_2_Conditional_7_Template, 3, 2, "p", 26);
    \u0275\u0275elementStart(8, "div", 27);
    \u0275\u0275template(9, ProductListComponent_Conditional_14_For_2_Conditional_9_Template, 8, 8)(10, ProductListComponent_Conditional_14_For_2_Conditional_10_Template, 4, 4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "mat-card-actions")(12, "button", 28);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_14_For_2_Template_button_click_12_listener() {
      const product_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.onAddToCartClick(product_r11));
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "add_shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const product_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c1, product_r11.slug));
    \u0275\u0275advance();
    \u0275\u0275property("src", product_r11.imageUrl || "https://via.placeholder.com/300x200?text=No+Image", \u0275\u0275sanitizeUrl)("alt", product_r11.name);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(11, _c1, product_r11.slug));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r11.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(product_r11.categories && product_r11.categories.length > 0 ? 7 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(product_r11.discountedPrice ? 9 : 10);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", !ctx_r2.hasAnyStock(product_r11));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.cartBtnLabel(product_r11), " ");
  }
}
function ProductListComponent_Conditional_14_ForEmpty_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "No se encontraron productos.");
    \u0275\u0275elementEnd();
  }
}
function ProductListComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, ProductListComponent_Conditional_14_For_2_Template, 16, 13, "mat-card", 20, _forTrack0, false, ProductListComponent_Conditional_14_ForEmpty_3_Template, 2, 0, "p", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-paginator", 22);
    \u0275\u0275listener("page", function ProductListComponent_Conditional_14_Template_mat_paginator_page_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onPageChange($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.products);
    \u0275\u0275advance(3);
    \u0275\u0275property("length", ctx_r2.totalElements)("pageSize", ctx_r2.pageSize)("pageIndex", ctx_r2.currentPage)("pageSizeOptions", \u0275\u0275pureFunction0(5, _c0));
  }
}
function ProductListComponent_Conditional_15_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38)(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 47);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 2, ctx_r2.popupProduct.discountedPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(6, 4, ctx_r2.popupProduct.price));
  }
}
function ProductListComponent_Conditional_15_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 38);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx_r2.popupProduct.price));
  }
}
function ProductListComponent_Conditional_15_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_For_19_Template_button_click_0_listener() {
      const c_r14 = \u0275\u0275restoreView(_r13).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.popupSelectColor(c_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r14 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ctx_r2.popupSelectedColor === c_r14)("oos", !ctx_r2.colorHasStock(c_r14));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", c_r14.name, " ");
  }
}
function ProductListComponent_Conditional_15_Conditional_20_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Conditional_20_For_7_Template_button_click_0_listener() {
      const s_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(s_r16.stock > 0 && ctx_r2.popupSelectSize(s_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const s_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("selected", ctx_r2.popupSelectedSize === s_r16)("oos", s_r16.stock === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", s_r16.name, " ");
  }
}
function ProductListComponent_Conditional_15_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39)(1, "p", 40);
    \u0275\u0275text(2, "Talla: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 41);
    \u0275\u0275repeaterCreate(6, ProductListComponent_Conditional_15_Conditional_20_For_7_Template, 2, 5, "button", 42, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((ctx_r2.popupSelectedSize == null ? null : ctx_r2.popupSelectedSize.name) || "Selecciona una talla");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.popupSelectedColor.sizes);
  }
}
function ProductListComponent_Conditional_15_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.popupSelectedSize.stock, " disponible(s)");
  }
}
function ProductListComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePopup());
    });
    \u0275\u0275elementStart(1, "div", 34);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "div", 35)(3, "h3");
    \u0275\u0275text(4, "Seleccionar opciones");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 36);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePopup());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "p", 37);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, ProductListComponent_Conditional_15_Conditional_10_Template, 7, 6, "p", 38)(11, ProductListComponent_Conditional_15_Conditional_11_Template, 3, 3, "p", 38);
    \u0275\u0275elementStart(12, "div", 39)(13, "p", 40);
    \u0275\u0275text(14, "Color: ");
    \u0275\u0275elementStart(15, "strong");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 41);
    \u0275\u0275repeaterCreate(18, ProductListComponent_Conditional_15_For_19_Template, 2, 5, "button", 42, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(20, ProductListComponent_Conditional_15_Conditional_20_Template, 8, 1, "div", 39)(21, ProductListComponent_Conditional_15_Conditional_21_Template, 2, 1, "p", 43);
    \u0275\u0275elementStart(22, "div", 44)(23, "button", 45);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closePopup());
    });
    \u0275\u0275text(24, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 28);
    \u0275\u0275listener("click", function ProductListComponent_Conditional_15_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmAddToCart());
    });
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r2.popupProduct.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.popupProduct.discountedPrice ? 10 : 11);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx_r2.popupSelectedColor == null ? null : ctx_r2.popupSelectedColor.name) || "Selecciona un color");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.popupProduct.colors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.popupSelectedColor && ctx_r2.popupSelectedColor.sizes.length > 0 ? 20 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.popupSelectedColor && ctx_r2.popupSelectedSize ? 21 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", !ctx_r2.canConfirmPopup() || ctx_r2.addingToCart);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.addingToCart ? "Agregando..." : "Agregar al carrito", " ");
  }
}
var ProductListComponent = class _ProductListComponent {
  constructor(productService, cartService, authService, snackBar) {
    this.productService = productService;
    this.cartService = cartService;
    this.authService = authService;
    this.snackBar = snackBar;
    this.products = [];
    this.categories = [];
    this.banners = [];
    this.carouselIndex = 0;
    this.autoPlayTimer = null;
    this.loading = true;
    this.searchQuery = "";
    this.selectedCategory = 0;
    this.currentPage = 0;
    this.pageSize = 12;
    this.totalElements = 0;
    this.popupProduct = null;
    this.popupSelectedColor = null;
    this.popupSelectedSize = null;
    this.addingToCart = false;
  }
  ngOnInit() {
    this.loadProducts();
    this.productService.getCategories().subscribe((res) => this.categories = res.data);
    this.productService.getActiveBanners().subscribe((res) => {
      this.banners = res.data;
      if (this.banners.length > 1)
        this.startAutoPlay();
    });
  }
  ngOnDestroy() {
    this.stopAutoPlay();
  }
  startAutoPlay() {
    this.autoPlayTimer = setInterval(() => this.nextSlide(), 4500);
  }
  stopAutoPlay() {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }
  nextSlide() {
    this.carouselIndex = (this.carouselIndex + 1) % this.banners.length;
  }
  prevSlide() {
    this.carouselIndex = (this.carouselIndex - 1 + this.banners.length) % this.banners.length;
  }
  goToSlide(index) {
    this.carouselIndex = index;
    this.stopAutoPlay();
    if (this.banners.length > 1)
      this.startAutoPlay();
  }
  loadProducts() {
    this.loading = true;
    const obs = this.searchQuery ? this.productService.searchProducts(this.searchQuery, this.currentPage, this.pageSize) : this.selectedCategory ? this.productService.getProductsByCategory(this.selectedCategory, this.currentPage, this.pageSize) : this.productService.getProducts(this.currentPage, this.pageSize);
    obs.subscribe({
      next: (res) => {
        this.products = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  // Stock helpers
  hasAnyStock(product) {
    if (product.colors && product.colors.length > 0) {
      return product.colors.some((c) => c.sizes.some((s) => s.stock > 0));
    }
    return product.stockQuantity > 0;
  }
  colorHasStock(color) {
    return color.sizes.some((s) => s.stock > 0);
  }
  cartBtnLabel(product) {
    if (!this.hasAnyStock(product))
      return "Sin existencia";
    if (product.colors && product.colors.length > 0)
      return "Ver opciones";
    return "Agregar al carrito";
  }
  // Add to cart flow
  onAddToCartClick(product) {
    if (product.colors && product.colors.length > 0) {
      this.popupProduct = product;
      this.popupSelectedColor = null;
      this.popupSelectedSize = null;
      return;
    }
    if (!this.authService.isLoggedIn()) {
      const price = product.discountedPrice ?? product.price;
      this.cartService.addLocalItem({
        productId: product.id,
        productName: product.name,
        imageUrl: product.imageUrl,
        price,
        quantity: 1,
        subtotal: price
      });
      this.snackBar.open(`${product.name} agregado al carrito`, "Cerrar", { duration: 2e3 });
      return;
    }
    this.cartService.addToCart(product.id).subscribe({
      next: () => this.snackBar.open(`${product.name} agregado al carrito`, "Cerrar", { duration: 2e3 }),
      error: () => this.snackBar.open("Error al agregar al carrito", "Cerrar", { duration: 3e3 })
    });
  }
  // Popup methods
  popupSelectColor(color) {
    this.popupSelectedColor = color;
    this.popupSelectedSize = null;
  }
  popupSelectSize(size) {
    this.popupSelectedSize = size;
  }
  canConfirmPopup() {
    if (!this.popupSelectedColor)
      return false;
    if (this.popupSelectedColor.sizes.length > 0) {
      return this.popupSelectedSize !== null && this.popupSelectedSize.stock > 0;
    }
    return false;
  }
  confirmAddToCart() {
    if (!this.popupProduct || !this.canConfirmPopup())
      return;
    if (!this.authService.isLoggedIn()) {
      const price = this.popupProduct.discountedPrice ?? this.popupProduct.price;
      this.cartService.addLocalItem({
        productId: this.popupProduct.id,
        productName: this.popupProduct.name,
        imageUrl: this.popupSelectedColor?.images?.[0] ?? this.popupProduct.imageUrl,
        price,
        quantity: 1,
        selectedSizeId: this.popupSelectedSize?.id,
        selectedSizeName: this.popupSelectedSize?.name,
        selectedColorName: this.popupSelectedColor?.name,
        subtotal: price
      });
      this.snackBar.open(`${this.popupProduct.name} agregado al carrito`, "Cerrar", { duration: 2e3 });
      this.closePopup();
      return;
    }
    this.addingToCart = true;
    this.cartService.addToCart(this.popupProduct.id, 1, this.popupSelectedSize?.id).subscribe({
      next: () => {
        this.snackBar.open(`${this.popupProduct.name} agregado al carrito`, "Cerrar", { duration: 2e3 });
        this.addingToCart = false;
        this.closePopup();
      },
      error: () => {
        this.snackBar.open("Error al agregar al carrito", "Cerrar", { duration: 3e3 });
        this.addingToCart = false;
      }
    });
  }
  closePopup() {
    this.popupProduct = null;
    this.popupSelectedColor = null;
    this.popupSelectedSize = null;
  }
  onSearch() {
    this.currentPage = 0;
    this.selectedCategory = 0;
    this.loadProducts();
  }
  selectCategory(id) {
    this.selectedCategory = id;
    this.currentPage = 0;
    this.searchQuery = "";
    this.loadProducts();
  }
  onCategoryChange() {
    this.currentPage = 0;
    this.searchQuery = "";
    this.loadProducts();
  }
  onPageChange(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
  static {
    this.\u0275fac = function ProductListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductListComponent)(\u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductListComponent, selectors: [["app-product-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 16, vars: 5, consts: [[1, "carousel-root"], [1, "container"], [1, "filters"], ["appearance", "outline", 1, "search-field"], ["matInput", "", 3, "ngModelChange", "keyup.enter", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], [1, "category-nav"], [1, "popup-backdrop"], [1, "carousel-track"], [1, "carousel-slide"], ["target", "_blank", "rel", "noopener", 3, "href"], ["alt", "Promotional banner", 1, "carousel-img", 3, "src"], ["aria-label", "Previous", 1, "carousel-arrow", "left", 3, "click"], ["aria-label", "Next", 1, "carousel-arrow", "right", 3, "click"], [1, "carousel-dots"], [1, "dot", 3, "active"], [1, "dot", 3, "click"], [1, "cat-chip", 3, "click"], [1, "cat-chip", 3, "active"], [1, "product-grid"], [1, "product-card"], [1, "no-results"], [3, "page", "length", "pageSize", "pageIndex", "pageSizeOptions"], [3, "routerLink"], ["mat-card-image", "", 1, "product-image", 3, "src", "alt"], [1, "product-name", 3, "routerLink"], [1, "category-tag"], [1, "price-row"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "price", "discounted"], [1, "compare-price"], [1, "promo-badge"], [1, "price"], [1, "popup-backdrop", 3, "click"], [1, "popup-panel", 3, "click"], [1, "popup-header"], ["mat-icon-button", "", 3, "click"], [1, "popup-product-name"], [1, "popup-price"], [1, "popup-group"], [1, "popup-label"], [1, "popup-options"], [1, "opt-btn", 3, "selected", "oos"], [1, "popup-stock"], [1, "popup-actions"], ["mat-button", "", 3, "click"], [1, "discounted-popup"], [1, "original-popup"], [1, "opt-btn", 3, "click"]], template: function ProductListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProductListComponent_Conditional_0_Template, 5, 3, "div", 0);
        \u0275\u0275elementStart(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Nuestros Productos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "div", 2)(5, "mat-form-field", 3)(6, "mat-label");
        \u0275\u0275text(7, "Buscar productos...");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "input", 4);
        \u0275\u0275twoWayListener("ngModelChange", function ProductListComponent_Template_input_ngModelChange_8_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.searchQuery, $event) || (ctx.searchQuery = $event);
          return $event;
        });
        \u0275\u0275listener("keyup.enter", function ProductListComponent_Template_input_keyup_enter_8_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "button", 5);
        \u0275\u0275listener("click", function ProductListComponent_Template_button_click_9_listener() {
          return ctx.onSearch();
        });
        \u0275\u0275elementStart(10, "mat-icon");
        \u0275\u0275text(11, "search");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275template(12, ProductListComponent_Conditional_12_Template, 5, 2, "nav", 6)(13, ProductListComponent_Conditional_13_Template, 1, 0, "app-loading")(14, ProductListComponent_Conditional_14_Template, 5, 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(15, ProductListComponent_Conditional_15_Template, 27, 7, "div", 7);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.banners.length > 0 ? 0 : -1);
        \u0275\u0275advance(8);
        \u0275\u0275twoWayProperty("ngModel", ctx.searchQuery);
        \u0275\u0275advance(4);
        \u0275\u0275conditional(ctx.categories.length > 0 ? 12 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 13 : 14);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.popupProduct ? 15 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardImage, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatPaginatorModule, MatPaginator, MatChipsModule, MatSnackBarModule, CurrencyPipe, LoadingComponent], styles: ["\n\n.carousel-root[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n  background: #000;\n  line-height: 0;\n}\n.carousel-track[_ngcontent-%COMP%] {\n  display: flex;\n  transition: transform 0.5s ease;\n  will-change: transform;\n}\n.carousel-slide[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  width: 100%;\n}\n.carousel-img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 380px;\n  object-fit: cover;\n  display: block;\n}\n.carousel-arrow[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(0, 0, 0, 0.45);\n  color: white;\n  border: none;\n  font-size: 2.5rem;\n  line-height: 1;\n  padding: 4px 14px;\n  cursor: pointer;\n  z-index: 10;\n  border-radius: 4px;\n  transition: background 0.2s;\n}\n.carousel-arrow[_ngcontent-%COMP%]:hover {\n  background: rgba(0, 0, 0, 0.7);\n}\n.carousel-arrow.left[_ngcontent-%COMP%] {\n  left: 12px;\n}\n.carousel-arrow.right[_ngcontent-%COMP%] {\n  right: 12px;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 12px;\n  left: 50%;\n  transform: translateX(-50%);\n  display: flex;\n  gap: 8px;\n  z-index: 10;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.5);\n  cursor: pointer;\n  transition: background 0.2s, transform 0.2s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: white;\n  transform: scale(1.2);\n}\n.filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n  margin-bottom: 12px;\n}\n.search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 250px;\n}\n.category-nav[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-bottom: 24px;\n  padding: 4px 0;\n}\n.cat-chip[_ngcontent-%COMP%] {\n  padding: 7px 18px;\n  border: 1.5px solid #d0d0d0;\n  border-radius: 999px;\n  background: white;\n  color: #444;\n  font-size: 0.9rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition:\n    background 0.15s,\n    border-color 0.15s,\n    color 0.15s,\n    box-shadow 0.15s;\n  white-space: nowrap;\n  line-height: 1.4;\n}\n.cat-chip[_ngcontent-%COMP%]:hover:not(.active) {\n  border-color: var(--theme-primary);\n  color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.06);\n}\n.cat-chip.active[_ngcontent-%COMP%] {\n  background: var(--theme-primary);\n  border-color: var(--theme-primary);\n  color: white;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n.product-card[_ngcontent-%COMP%] {\n  cursor: pointer;\n  transition: transform 0.2s;\n}\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);\n}\n.product-image[_ngcontent-%COMP%] {\n  height: 200px;\n  object-fit: cover;\n}\n.product-name[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 8px 0 4px;\n  font-size: 1.1rem;\n  color: #333;\n}\n.category-tag[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.85rem;\n  margin: 0 0 8px;\n}\n.price-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: var(--theme-primary);\n}\n.price.discounted[_ngcontent-%COMP%] {\n  color: #e53935;\n}\n.compare-price[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  color: #999;\n  text-decoration: line-through;\n}\n.promo-badge[_ngcontent-%COMP%] {\n  background: #ff5722;\n  color: white;\n  font-size: 0.75rem;\n  padding: 2px 6px;\n  border-radius: 4px;\n  white-space: nowrap;\n}\n.no-results[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px;\n  color: #666;\n  font-size: 1.1rem;\n  grid-column: 1 / -1;\n}\nmat-card-actions[_ngcontent-%COMP%] {\n  padding: 8px 16px 16px;\n}\n.popup-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.popup-panel[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 12px;\n  padding: 24px;\n  min-width: 320px;\n  max-width: 480px;\n  width: 90%;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);\n}\n.popup-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 4px;\n}\n.popup-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.1rem;\n}\n.popup-product-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1rem;\n  margin: 0 0 2px;\n  color: #333;\n}\n.popup-price[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-weight: 700;\n  font-size: 1.1rem;\n  margin: 0 0 16px;\n}\n.discounted-popup[_ngcontent-%COMP%] {\n  color: #e53935;\n}\n.original-popup[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #999;\n  text-decoration: line-through;\n  margin-left: 4px;\n}\n.popup-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.popup-label[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 0.9rem;\n  color: #555;\n}\n.popup-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.opt-btn[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1.5px solid #ccc;\n  border-radius: 4px;\n  background: white;\n  cursor: pointer;\n  font-size: 0.9rem;\n  transition: all 0.15s;\n}\n.opt-btn[_ngcontent-%COMP%]:hover:not(.oos) {\n  border-color: var(--theme-primary);\n  color: var(--theme-primary);\n}\n.opt-btn.selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n  background: var(--theme-primary);\n  color: white;\n}\n.opt-btn.oos[_ngcontent-%COMP%] {\n  color: #bbb;\n  border-color: #eee;\n  text-decoration: line-through;\n  cursor: default;\n}\n.popup-stock[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #2e7d32;\n  margin: -8px 0 8px;\n}\n.popup-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n/*# sourceMappingURL=product-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductListComponent, { className: "ProductListComponent" });
})();
export {
  ProductListComponent
};
//# sourceMappingURL=chunk-34R4WJAA.js.map
