import {
  MatDivider,
  MatDividerModule
} from "./chunk-7WR3W74A.js";
import {
  ProductService
} from "./chunk-PECVZCK6.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-VPRZG4RE.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
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
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
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
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-WS62BK7G.js";
import {
  AuthService
} from "./chunk-UCCDLCX6.js";
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
  HttpParams,
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  CurrencyPipe,
  DatePipe,
  __spreadProps,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-N3527UH3.js";

// src/app/core/services/review.service.ts
var ReviewService = class _ReviewService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/products`;
  }
  getProductReviews(productId, page = 0, size = 10) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(`${this.apiUrl}/${productId}/reviews`, { params });
  }
  getProductSummary(productId) {
    return this.http.get(`${this.apiUrl}/${productId}/reviews/summary`);
  }
  createReview(productId, request) {
    return this.http.post(`${this.apiUrl}/${productId}/reviews`, request);
  }
  deleteReview(reviewId) {
    return this.http.delete(`${environment.apiUrl}/reviews/${reviewId}`);
  }
  static {
    this.\u0275fac = function ReviewService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ReviewService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReviewService, factory: _ReviewService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/products/product-reviews/product-reviews.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c0 = () => [1, 2, 3, 4, 5];
var _c1 = () => [5, 4, 3, 2, 1];
function ProductReviewsComponent_Conditional_3_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("filled", ctx_r1.summary.averageRating != null && star_r1 <= ctx_r1.roundRating(ctx_r1.summary.averageRating));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.summary.averageRating != null && star_r1 <= ctx_r1.roundRating(ctx_r1.summary.averageRating) ? "star" : "star_border", " ");
  }
}
function ProductReviewsComponent_Conditional_3_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-icon", 18);
    \u0275\u0275text(4, "star");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 19);
    \u0275\u0275element(6, "div", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 21);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const star_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(star_r3);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r1.getBarPercent(star_r3), "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.summary.ratingDistribution[star_r3] || 0);
  }
}
function ProductReviewsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11);
    \u0275\u0275repeaterCreate(5, ProductReviewsComponent_Conditional_3_For_6_Template, 2, 3, "mat-icon", 12, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 13);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 14);
    \u0275\u0275repeaterCreate(10, ProductReviewsComponent_Conditional_3_For_11_Template, 9, 4, "div", 15, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.summary.averageRating ? ctx_r1.summary.averageRating.toFixed(1) : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(3, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r1.summary.totalReviews, " ", ctx_r1.summary.totalReviews === 1 ? "rese\xF1a" : "rese\xF1as", "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(4, _c1));
  }
}
function ProductReviewsComponent_Conditional_4_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-icon", 31);
    \u0275\u0275listener("mouseenter", function ProductReviewsComponent_Conditional_4_For_11_Template_mat_icon_mouseenter_0_listener() {
      const star_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hoveredRating = star_r6);
    })("mouseleave", function ProductReviewsComponent_Conditional_4_For_11_Template_mat_icon_mouseleave_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.hoveredRating = 0);
    })("click", function ProductReviewsComponent_Conditional_4_For_11_Template_mat_icon_click_0_listener() {
      const star_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectRating(star_r6));
    });
    \u0275\u0275text(1, " star ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", star_r6 <= ctx_r1.selectedRating)("hovered", star_r6 <= ctx_r1.hoveredRating);
  }
}
function ProductReviewsComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 3)(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Escribir una rese\xF1a");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "form", 22);
    \u0275\u0275listener("ngSubmit", function ProductReviewsComponent_Conditional_4_Template_form_ngSubmit_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitReview());
    });
    \u0275\u0275elementStart(6, "div", 23)(7, "span", 24);
    \u0275\u0275text(8, "Calificaci\xF3n *");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div", 25);
    \u0275\u0275repeaterCreate(10, ProductReviewsComponent_Conditional_4_For_11_Template, 2, 4, "mat-icon", 26, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "mat-form-field", 27)(13, "mat-label");
    \u0275\u0275text(14, "T\xEDtulo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-form-field", 27)(17, "mat-label");
    \u0275\u0275text(18, "Comentario");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "textarea", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 30);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("formGroup", ctx_r1.reviewForm);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(3, _c0));
    \u0275\u0275advance(10);
    \u0275\u0275property("disabled", ctx_r1.reviewForm.invalid || ctx_r1.selectedRating === 0 || ctx_r1.submitting);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.submitting ? "Enviando..." : "Publicar rese\xF1a", " ");
  }
}
function ProductReviewsComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 4);
    \u0275\u0275text(1, "Ya has publicado una rese\xF1a para este producto.");
    \u0275\u0275elementEnd();
  }
}
function ProductReviewsComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 6);
    \u0275\u0275text(1, "Sin rese\xF1as a\xFAn. \xA1S\xE9 el primero en opinar!");
    \u0275\u0275elementEnd();
  }
}
function ProductReviewsComponent_For_9_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 35)(1, "mat-icon", 42);
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Compra verificada");
    \u0275\u0275elementEnd();
  }
}
function ProductReviewsComponent_For_9_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 43);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const star_r7 = ctx.$implicit;
    const review_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("filled", star_r7 <= review_r8.rating);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", star_r7 <= review_r8.rating ? "star" : "star_border", " ");
  }
}
function ProductReviewsComponent_For_9_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function ProductReviewsComponent_For_9_Conditional_16_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const review_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.deleteReview(review_r8.id));
    });
    \u0275\u0275text(1, "Eliminar");
    \u0275\u0275elementEnd();
  }
}
function ProductReviewsComponent_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "div", 32)(2, "div", 33)(3, "span", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ProductReviewsComponent_For_9_Conditional_5_Template, 4, 0, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 36);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 37);
    \u0275\u0275repeaterCreate(10, ProductReviewsComponent_For_9_For_11_Template, 2, 3, "mat-icon", 38, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 39);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "p", 40);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ProductReviewsComponent_For_9_Conditional_16_Template, 2, 0, "button", 41);
    \u0275\u0275element(17, "mat-divider");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const review_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(review_r8.userName);
    \u0275\u0275advance();
    \u0275\u0275conditional(review_r8.verified ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 6, review_r8.createdAt, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275repeater(\u0275\u0275pureFunction0(9, _c0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(review_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(review_r8.comment);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.canDeleteReview(review_r8) ? 16 : -1);
  }
}
function ProductReviewsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8)(1, "button", 45);
    \u0275\u0275listener("click", function ProductReviewsComponent_Conditional_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadMore());
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Cargando..." : "Ver m\xE1s", " ");
  }
}
var ProductReviewsComponent = class _ProductReviewsComponent {
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  get currentUserId() {
    return this.authService.user()?.id;
  }
  get isAdmin() {
    return this.authService.isAdmin();
  }
  constructor(fb, reviewService, authService, snackBar) {
    this.fb = fb;
    this.reviewService = reviewService;
    this.authService = authService;
    this.snackBar = snackBar;
    this.reviews = [];
    this.summary = null;
    this.selectedRating = 0;
    this.hoveredRating = 0;
    this.loading = false;
    this.submitting = false;
    this.alreadyReviewed = false;
    this.canReview = false;
    this.currentPage = 0;
    this.isLastPage = true;
  }
  ngOnInit() {
    this.reviewForm = this.fb.group({
      title: ["", Validators.required],
      comment: ["", Validators.required]
    });
    this.loadSummary();
    this.loadReviews();
  }
  loadSummary() {
    this.reviewService.getProductSummary(this.productId).subscribe({
      next: (res) => {
        this.summary = res.data;
      }
    });
  }
  loadReviews() {
    this.loading = true;
    this.reviewService.getProductReviews(this.productId, this.currentPage, 10).subscribe({
      next: (res) => {
        this.reviews = [...this.reviews, ...res.data.content];
        this.isLastPage = res.data.last;
        this.checkAlreadyReviewed();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  loadMore() {
    this.currentPage++;
    this.loadReviews();
  }
  checkAlreadyReviewed() {
    if (this.isLoggedIn && this.currentUserId) {
      this.alreadyReviewed = this.reviews.some((r) => r.userId === this.currentUserId);
      this.canReview = this.reviews.some((r) => r.verified && r.userId === this.currentUserId) || !this.alreadyReviewed;
    }
  }
  selectRating(star) {
    this.selectedRating = star;
    this.reviewForm.patchValue({ rating: star });
  }
  roundRating(avg) {
    return Math.round(avg);
  }
  getBarPercent(star) {
    if (!this.summary || this.summary.totalReviews === 0)
      return 0;
    const count = this.summary.ratingDistribution[star] || 0;
    return count / this.summary.totalReviews * 100;
  }
  canDeleteReview(review) {
    return this.isLoggedIn && (review.userId === this.currentUserId || this.isAdmin);
  }
  submitReview() {
    if (this.reviewForm.invalid || this.selectedRating === 0)
      return;
    this.submitting = true;
    const request = __spreadProps(__spreadValues({}, this.reviewForm.value), { rating: this.selectedRating });
    this.reviewService.createReview(this.productId, request).subscribe({
      next: (res) => {
        this.reviews.unshift(res.data);
        this.alreadyReviewed = true;
        this.reviewForm.reset();
        this.selectedRating = 0;
        this.submitting = false;
        this.loadSummary();
        this.snackBar.open("\xA1Rese\xF1a publicada!", "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message || "Error al publicar la rese\xF1a";
        this.snackBar.open(msg, "Cerrar", { duration: 4e3 });
      }
    });
  }
  deleteReview(reviewId) {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter((r) => r.id !== reviewId);
        if (this.currentUserId) {
          this.alreadyReviewed = this.reviews.some((r) => r.userId === this.currentUserId);
        }
        this.loadSummary();
        this.snackBar.open("Rese\xF1a eliminada", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al eliminar la rese\xF1a", "Cerrar", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function ProductReviewsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductReviewsComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ReviewService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductReviewsComponent, selectors: [["app-product-reviews"]], inputs: { productId: "productId" }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 4, consts: [[1, "reviews-section"], [1, "section-title"], [1, "summary-card"], [1, "review-form-card"], [1, "already-reviewed"], [1, "section-divider"], [1, "no-reviews"], [1, "review-item"], [1, "load-more"], [1, "avg-block"], [1, "avg-number"], [1, "stars-row"], [1, "star-icon", 3, "filled"], [1, "total-label"], [1, "distribution"], [1, "dist-row"], [1, "star-icon"], [1, "dist-label"], [1, "dist-star"], [1, "dist-bar-bg"], [1, "dist-bar-fill"], [1, "dist-count"], [3, "ngSubmit", "formGroup"], [1, "star-selector"], [1, "form-label"], [1, "star-row"], [1, "star-select", 3, "selected", "hovered"], [1, "full-width"], ["matInput", "", "formControlName", "title", "placeholder", "Resume tu experiencia"], ["matInput", "", "formControlName", "comment", "rows", "4", "placeholder", "Comparte tu opini\xF3n..."], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], [1, "star-select", 3, "mouseenter", "mouseleave", "click"], [1, "review-header"], [1, "reviewer-info"], [1, "reviewer-name"], [1, "verified-badge"], [1, "review-date"], [1, "review-stars"], [1, "review-star", 3, "filled"], [1, "review-title"], [1, "review-comment"], ["mat-button", "", "color", "warn"], [1, "verified-icon"], [1, "review-star"], ["mat-button", "", "color", "warn", 3, "click"], ["mat-stroked-button", "", 3, "click", "disabled"]], template: function ProductReviewsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
        \u0275\u0275text(2, "Rese\xF1as de clientes");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, ProductReviewsComponent_Conditional_3_Template, 12, 5, "div", 2)(4, ProductReviewsComponent_Conditional_4_Template, 22, 4, "mat-card", 3)(5, ProductReviewsComponent_Conditional_5_Template, 2, 0, "p", 4);
        \u0275\u0275element(6, "mat-divider", 5);
        \u0275\u0275template(7, ProductReviewsComponent_Conditional_7_Template, 2, 0, "p", 6);
        \u0275\u0275repeaterCreate(8, ProductReviewsComponent_For_9_Template, 18, 10, "div", 7, _forTrack0);
        \u0275\u0275template(10, ProductReviewsComponent_Conditional_10_Template, 3, 2, "div", 8);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.summary ? 3 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLoggedIn && !ctx.alreadyReviewed && ctx.canReview ? 4 : ctx.isLoggedIn && ctx.alreadyReviewed ? 5 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.reviews.length === 0 && !ctx.loading ? 7 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.reviews);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(!ctx.isLastPage && ctx.reviews.length > 0 ? 10 : -1);
      }
    }, dependencies: [
      ReactiveFormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      FormGroupDirective,
      FormControlName,
      DatePipe,
      MatCardModule,
      MatCard,
      MatCardContent,
      MatCardHeader,
      MatCardTitle,
      MatButtonModule,
      MatButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatInputModule,
      MatInput,
      MatDividerModule,
      MatDivider,
      MatSnackBarModule
    ], styles: ["\n\n.reviews-section[_ngcontent-%COMP%] {\n  padding: 32px 0;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  margin-bottom: 24px;\n}\n.summary-card[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 40px;\n  align-items: flex-start;\n  margin-bottom: 32px;\n  background: #f9f9f9;\n  padding: 24px;\n  border-radius: 8px;\n  flex-wrap: wrap;\n}\n.avg-block[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  min-width: 100px;\n}\n.avg-number[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  font-weight: 700;\n  color: var(--theme-primary);\n  line-height: 1;\n}\n.stars-row[_ngcontent-%COMP%] {\n  display: flex;\n}\n.star-icon[_ngcontent-%COMP%] {\n  color: #ccc;\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.star-icon.filled[_ngcontent-%COMP%] {\n  color: #f5a623;\n}\n.total-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #888;\n}\n.distribution[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n}\n.dist-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-bottom: 4px;\n}\n.dist-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  min-width: 12px;\n  text-align: right;\n}\n.dist-star[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  color: #f5a623;\n}\n.dist-bar-bg[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 8px;\n  background: #e0e0e0;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.dist-bar-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: #f5a623;\n  border-radius: 4px;\n  transition: width 0.3s;\n}\n.dist-count[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #888;\n  min-width: 20px;\n}\n.review-form-card[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.form-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: rgba(0, 0, 0, 0.6);\n  margin-bottom: 8px;\n  display: block;\n}\n.star-selector[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.star-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.star-select[_ngcontent-%COMP%] {\n  cursor: pointer;\n  color: #ccc;\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  transition: color 0.15s;\n}\n.star-select.selected[_ngcontent-%COMP%], \n.star-select.hovered[_ngcontent-%COMP%] {\n  color: #f5a623;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.already-reviewed[_ngcontent-%COMP%] {\n  color: #666;\n  font-style: italic;\n  margin-bottom: 16px;\n}\n.section-divider[_ngcontent-%COMP%] {\n  margin: 24px 0;\n}\n.no-reviews[_ngcontent-%COMP%] {\n  color: #888;\n}\n.review-item[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n.review-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin-bottom: 8px;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.reviewer-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-wrap: wrap;\n}\n.reviewer-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.verified-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  font-size: 0.75rem;\n  color: #2e7d32;\n  background: #e8f5e9;\n  padding: 2px 8px;\n  border-radius: 12px;\n}\n.verified-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.review-date[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #888;\n}\n.review-stars[_ngcontent-%COMP%] {\n  display: flex;\n  margin-bottom: 8px;\n}\n.review-star[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #ccc;\n}\n.review-star.filled[_ngcontent-%COMP%] {\n  color: #f5a623;\n}\n.review-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin: 0 0 4px;\n}\n.review-comment[_ngcontent-%COMP%] {\n  color: #555;\n  margin: 0 0 8px;\n  line-height: 1.5;\n}\n.load-more[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n}\n/*# sourceMappingURL=product-reviews.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductReviewsComponent, { className: "ProductReviewsComponent" });
})();

// src/app/features/products/product-detail/product-detail.component.ts
var _forTrack02 = ($index, $item) => $item.id;
var _c02 = () => ["/"];
var _c12 = (a0) => ({ category: a0 });
function ProductDetailComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_4_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 23);
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
    \u0275\u0275elementStart(0, "button", 19);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_4_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.prev());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "chevron_left");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "button", 20);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_4_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.next());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "chevron_right");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 21);
    \u0275\u0275repeaterCreate(7, ProductDetailComponent_Conditional_1_Conditional_4_For_8_Template, 1, 2, "span", 22, \u0275\u0275repeaterTrackByIdentity);
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
    \u0275\u0275elementStart(0, "img", 25);
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
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_5_For_2_Template, 1, 4, "img", 24, \u0275\u0275repeaterTrackByIdentity);
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
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "/");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Conditional_7_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, ProductDetailComponent_Conditional_1_Conditional_7_For_2_Conditional_2_Template, 2, 0, "span", 27);
  }
  if (rf & 2) {
    const cat_r9 = ctx.$implicit;
    const \u0275$index_40_r10 = ctx.$index;
    const \u0275$count_40_r11 = ctx.$count;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(4, _c02))("queryParams", \u0275\u0275pureFunction1(5, _c12, cat_r9.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r9.name);
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_40_r10 === \u0275$count_40_r11 - 1) ? 2 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, ProductDetailComponent_Conditional_1_Conditional_7_For_2_Template, 3, 7, null, null, _forTrack02);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r2.product.categories);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 29);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-chip", 30);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 4, ctx_r2.product.discountedPrice));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 6, ctx_r2.product.price));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("", ctx_r2.product.activePromotionName, " \u2212", ctx_r2.product.activePromotionDiscount, "%");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 29);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 32);
    \u0275\u0275text(4, "Oferta");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, ctx_r2.product.compareAtPrice));
  }
}
function ProductDetailComponent_Conditional_1_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 31);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, ProductDetailComponent_Conditional_1_Conditional_12_Conditional_3_Template, 5, 3);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 2, ctx_r2.product.price));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.product.compareAtPrice ? 3 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 33)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" En existencia (", ctx_r2.product.stockQuantity, ")");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 34)(1, "mat-icon");
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Sin existencia");
    \u0275\u0275elementEnd();
  }
}
function ProductDetailComponent_Conditional_1_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductDetailComponent_Conditional_1_Conditional_16_Conditional_0_Template, 4, 1, "mat-chip", 33)(1, ProductDetailComponent_Conditional_1_Conditional_16_Conditional_1_Template, 4, 0, "mat-chip", 34);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r2.product.stockQuantity > 0 ? 0 : 1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("SKU: ", ctx_r2.product.sku, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_18_For_8_Template_button_click_0_listener() {
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
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_9_For_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_9_For_7_Template_button_click_0_listener() {
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
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "p", 36);
    \u0275\u0275text(2, "Talla: ");
    \u0275\u0275elementStart(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 37);
    \u0275\u0275repeaterCreate(6, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_9_For_7_Template, 2, 5, "button", 40, _forTrack02);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate((tmp_3_0 = ctx_r2.selectedSize == null ? null : ctx_r2.selectedSize.name) !== null && tmp_3_0 !== void 0 ? tmp_3_0 : "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.selectedColor.sizes);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate3("", ctx_r2.selectedSize.stock, " disponible(s) para ", ctx_r2.selectedColor.name, " / ", ctx_r2.selectedSize.name, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 42);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Sin existencia para ", ctx_r2.selectedColor.name, " / ", ctx_r2.selectedSize.name, "");
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Conditional_0_Template, 2, 3, "p", 41)(1, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Conditional_1_Template, 2, 2, "p", 42);
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r2.selectedSize.stock > 0 ? 0 : 1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 35)(2, "p", 36);
    \u0275\u0275text(3, "Color: ");
    \u0275\u0275elementStart(4, "strong");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 37);
    \u0275\u0275repeaterCreate(7, ProductDetailComponent_Conditional_1_Conditional_18_For_8_Template, 2, 3, "button", 38, _forTrack02);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(9, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_9_Template, 8, 1, "div", 35)(10, ProductDetailComponent_Conditional_1_Conditional_18_Conditional_10_Template, 2, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate((tmp_2_0 = ctx_r2.selectedColor == null ? null : ctx_r2.selectedColor.name) !== null && tmp_2_0 !== void 0 ? tmp_2_0 : "");
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r2.colors);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.selectedColor && ctx_r2.selectedColor.sizes.length > 0 ? 9 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.selectedColor && ctx_r2.selectedSize ? 10 : -1);
  }
}
function ProductDetailComponent_Conditional_1_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1, "Por favor selecciona color y talla antes de agregar al carrito.");
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
    \u0275\u0275elementStart(10, "div", 7);
    \u0275\u0275template(11, ProductDetailComponent_Conditional_1_Conditional_11_Template, 8, 8)(12, ProductDetailComponent_Conditional_1_Conditional_12_Template, 4, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 8);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 9);
    \u0275\u0275template(16, ProductDetailComponent_Conditional_1_Conditional_16_Template, 2, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(17, ProductDetailComponent_Conditional_1_Conditional_17_Template, 2, 1, "p", 10)(18, ProductDetailComponent_Conditional_1_Conditional_18_Template, 11, 3, "div", 11);
    \u0275\u0275elementStart(19, "div", 12)(20, "button", 13);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.quantity > 1 && (ctx_r2.quantity = ctx_r2.quantity - 1));
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "remove");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "span", 14);
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "button", 13);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.quantity = ctx_r2.quantity + 1);
    });
    \u0275\u0275elementStart(26, "mat-icon");
    \u0275\u0275text(27, "add");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(28, ProductDetailComponent_Conditional_1_Conditional_28_Template, 2, 0, "p", 15);
    \u0275\u0275elementStart(29, "button", 16);
    \u0275\u0275listener("click", function ProductDetailComponent_Conditional_1_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.addToCart());
    });
    \u0275\u0275elementStart(30, "mat-icon");
    \u0275\u0275text(31, "add_shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "div", 17);
    \u0275\u0275element(34, "app-product-reviews", 18);
    \u0275\u0275elementEnd();
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
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.product.discountedPrice ? 11 : 12);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.product.description);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.colors.length === 0 ? 16 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.product.sku ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.colors.length > 0 ? 18 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.quantity);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r2.colors.length > 0 && (!ctx_r2.selectedColor || ctx_r2.selectedColor.sizes.length > 0 && !ctx_r2.selectedSize) ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.isAddToCartDisabled());
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.addToCartLabel(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("productId", ctx_r2.product.id);
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
        return "Selecciona un color";
      if (this.selectedColor.sizes.length > 0 && !this.selectedSize)
        return "Selecciona una talla";
      if (this.selectedSize && this.selectedSize.stock === 0)
        return "Sin existencia";
    } else if (this.product?.stockQuantity === 0) {
      return "Sin existencia";
    }
    return "Agregar al carrito";
  }
  addToCart() {
    if (!this.product)
      return;
    if (!this.authService.isLoggedIn()) {
      const price = this.product.discountedPrice ?? this.product.price;
      this.cartService.addLocalItem({
        productId: this.product.id,
        productName: this.product.name,
        imageUrl: this.selectedColor?.images?.[0] ?? this.product.imageUrl,
        price,
        quantity: this.quantity,
        selectedSizeId: this.selectedSize?.id,
        selectedSizeName: this.selectedSize?.name,
        selectedColorName: this.selectedColor?.name,
        subtotal: price * this.quantity
      });
      this.snackBar.open("\xA1Agregado al carrito!", "Cerrar", { duration: 2e3 });
      return;
    }
    this.cartService.addToCart(this.product.id, this.quantity, this.selectedSize?.id).subscribe({
      next: () => this.snackBar.open("\xA1Agregado al carrito!", "Cerrar", { duration: 2e3 }),
      error: () => this.snackBar.open("Error al agregar al carrito", "Cerrar", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function ProductDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductDetailComponent, selectors: [["app-product-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 1, consts: [[1, "container", "detail-grid"], [1, "image-section"], [1, "carousel"], [1, "main-image", 3, "src", "alt"], [1, "thumbnail-row"], [1, "info-section"], [1, "breadcrumbs"], [1, "price-section"], [1, "description"], [1, "stock-info"], [1, "sku"], [1, "variants-section"], [1, "quantity-section"], ["mat-icon-button", "", 3, "click"], [1, "quantity"], [1, "selection-warning"], ["mat-raised-button", "", "color", "primary", 1, "add-btn", 3, "click", "disabled"], [1, "container"], [3, "productId"], ["mat-icon-button", "", 1, "carousel-btn", "prev", 3, "click", "disabled"], ["mat-icon-button", "", 1, "carousel-btn", "next", 3, "click", "disabled"], [1, "carousel-dots"], [1, "dot", 3, "active"], [1, "dot", 3, "click"], [1, "thumbnail", 3, "src", "selected", "alt"], [1, "thumbnail", 3, "click", "src", "alt"], [1, "breadcrumb", 3, "routerLink", "queryParams"], [1, "separator"], [1, "price", "promo-price"], [1, "compare-price"], [1, "promo-chip"], [1, "price"], [1, "sale-chip"], [1, "in-stock"], [1, "out-of-stock"], [1, "variant-group"], [1, "variant-label"], [1, "variant-options"], [1, "variant-btn", 3, "selected"], [1, "variant-btn", 3, "click"], [1, "variant-btn", 3, "selected", "out-of-stock-btn"], [1, "variant-stock", "in-stock-text"], [1, "variant-stock", "out-of-stock-text"]], template: function ProductDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, ProductDetailComponent_Conditional_0_Template, 1, 0, "app-loading")(1, ProductDetailComponent_Conditional_1_Template, 35, 16);
      }
      if (rf & 2) {
        \u0275\u0275conditional(ctx.loading ? 0 : ctx.product ? 1 : -1);
      }
    }, dependencies: [RouterLink, MatCardModule, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatChipsModule, MatChip, MatSnackBarModule, CurrencyPipe, LoadingComponent, ProductReviewsComponent], styles: ["\n\n.detail-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 48px;\n  padding: 32px 16px;\n}\n.carousel[_ngcontent-%COMP%] {\n  position: relative;\n}\n.main-image[_ngcontent-%COMP%] {\n  width: 100%;\n  border-radius: 8px;\n  object-fit: cover;\n  max-height: 500px;\n  display: block;\n}\n.carousel-btn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  background: rgba(255, 255, 255, 0.9) !important;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n.carousel-btn.prev[_ngcontent-%COMP%] {\n  left: 8px;\n}\n.carousel-btn.next[_ngcontent-%COMP%] {\n  right: 8px;\n}\n.carousel-dots[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 8px;\n  margin-top: 12px;\n}\n.dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  background: #ccc;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n.dot.active[_ngcontent-%COMP%] {\n  background: var(--theme-primary);\n}\n.thumbnail-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n  flex-wrap: wrap;\n}\n.thumbnail[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  border: 2px solid transparent;\n}\n.thumbnail[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n}\n.thumbnail.selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n}\n.breadcrumbs[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n  flex-wrap: wrap;\n}\n.breadcrumb[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n}\n.separator[_ngcontent-%COMP%] {\n  color: #ccc;\n  font-size: 0.9rem;\n}\nh1[_ngcontent-%COMP%] {\n  margin: 8px 0 16px;\n}\n.price-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.price[_ngcontent-%COMP%] {\n  font-size: 1.8rem;\n  font-weight: 700;\n  color: var(--theme-primary);\n}\n.price.promo-price[_ngcontent-%COMP%] {\n  color: #e53935;\n}\n.compare-price[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #999;\n  text-decoration: line-through;\n}\n.sale-chip[_ngcontent-%COMP%] {\n  background: #ff5722 !important;\n  color: white !important;\n}\n.promo-chip[_ngcontent-%COMP%] {\n  background: #e53935 !important;\n  color: white !important;\n}\n.description[_ngcontent-%COMP%] {\n  color: #555;\n  line-height: 1.6;\n  margin-bottom: 24px;\n}\n.stock-info[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.in-stock[_ngcontent-%COMP%] {\n  background: #e8f5e9 !important;\n  color: #2e7d32 !important;\n}\n.out-of-stock[_ngcontent-%COMP%] {\n  background: #ffebee !important;\n  color: #c62828 !important;\n}\n.sku[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 0.85rem;\n}\n.quantity-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 24px 0;\n}\n.quantity[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 500;\n  min-width: 32px;\n  text-align: center;\n}\n.selection-warning[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #e65100;\n  margin: 0 0 8px;\n}\n.add-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px;\n  font-size: 1.1rem;\n}\n.variants-section[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.variant-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.variant-label[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n  color: #555;\n}\n.variant-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}\n.variant-btn[_ngcontent-%COMP%] {\n  padding: 6px 16px;\n  border: 1.5px solid #ccc;\n  border-radius: 4px;\n  background: white;\n  cursor: pointer;\n  font-size: 0.9rem;\n  transition: all 0.15s;\n}\n.variant-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n  color: var(--theme-primary);\n}\n.variant-btn.selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n  background: var(--theme-primary);\n  color: white;\n}\n.variant-btn.out-of-stock-btn[_ngcontent-%COMP%] {\n  color: #bbb;\n  border-color: #eee;\n  text-decoration: line-through;\n  cursor: default;\n}\n.variant-stock[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n}\n.in-stock-text[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.out-of-stock-text[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n@media (max-width: 768px) {\n  .detail-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 24px;\n  }\n}\n/*# sourceMappingURL=product-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductDetailComponent, { className: "ProductDetailComponent" });
})();
export {
  ProductDetailComponent
};
//# sourceMappingURL=chunk-XJNF3VIG.js.map
