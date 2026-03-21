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
  ProductService
} from "./chunk-PECVZCK6.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-YPEJ5GST.js";
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
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
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
  ɵɵclassMap,
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-N3527UH3.js";

// src/app/features/admin/promotion-management/promotion-management.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function PromotionManagementComponent_Conditional_10_For_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 14);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const product_r3 = ctx.$implicit;
    \u0275\u0275property("value", product_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", product_r3.name, " (", \u0275\u0275pipeBind1(2, 3, product_r3.price), ")");
  }
}
function PromotionManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 4)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 5);
    \u0275\u0275listener("ngSubmit", function PromotionManagementComponent_Conditional_10_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(4, "div", 6)(5, "mat-form-field", 7)(6, "mat-label");
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 7)(10, "mat-label");
    \u0275\u0275text(11, "Descuento %");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 6)(14, "mat-form-field", 7)(15, "mat-label");
    \u0275\u0275text(16, "Fecha de inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 7)(19, "mat-label");
    \u0275\u0275text(20, "Fecha de fin");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-form-field", 12)(23, "mat-label");
    \u0275\u0275text(24, "Productos");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "mat-select", 13);
    \u0275\u0275repeaterCreate(26, PromotionManagementComponent_Conditional_10_For_27_Template, 3, 5, "mat-option", 14, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 15)(29, "button", 16);
    \u0275\u0275listener("click", function PromotionManagementComponent_Conditional_10_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleForm());
    });
    \u0275\u0275text(30, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 17);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.editingId ? "Editar" : "Nueva", " Promotion");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(23);
    \u0275\u0275repeater(ctx_r1.allProducts);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Guardando..." : "Guardar", " ");
  }
}
function PromotionManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function PromotionManagementComponent_Conditional_12_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r4.name);
  }
}
function PromotionManagementComponent_Conditional_12_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Descuento %");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r5.discountPercent, "%");
  }
}
function PromotionManagementComponent_Conditional_12_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Inicio");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, p_r6.startDate, "mediumDate"));
  }
}
function PromotionManagementComponent_Conditional_12_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Fin");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r7 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, p_r7.endDate, "mediumDate"));
  }
}
function PromotionManagementComponent_Conditional_12_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const p_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMap(p_r8.active ? "badge-active" : "badge-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r8.active ? "Activo" : "Inactivo");
  }
}
function PromotionManagementComponent_Conditional_12_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Productos");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 32);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r9 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", p_r9.products.length, " product(s)");
  }
}
function PromotionManagementComponent_Conditional_12_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 31);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_td_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 32)(1, "button", 33);
    \u0275\u0275listener("click", function PromotionManagementComponent_Conditional_12_td_21_Template_button_click_1_listener() {
      const p_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(p_r11));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 34);
    \u0275\u0275listener("click", function PromotionManagementComponent_Conditional_12_td_21_Template_button_click_4_listener() {
      const p_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle(p_r11));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 35);
    \u0275\u0275listener("click", function PromotionManagementComponent_Conditional_12_td_21_Template_button_click_7_listener() {
      const p_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.delete(p_r11));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const p_r11 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275property("title", p_r11.active ? "Desactivar" : "Activar");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(p_r11.active ? "toggle_on" : "toggle_off");
  }
}
function PromotionManagementComponent_Conditional_12_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 36);
  }
}
function PromotionManagementComponent_Conditional_12_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 37);
  }
}
function PromotionManagementComponent_Conditional_12_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 30);
    \u0275\u0275text(1, "Sin promociones. Crea una arriba.");
    \u0275\u0275elementEnd();
  }
}
function PromotionManagementComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 18);
    \u0275\u0275elementContainerStart(1, 19);
    \u0275\u0275template(2, PromotionManagementComponent_Conditional_12_th_2_Template, 2, 0, "th", 20)(3, PromotionManagementComponent_Conditional_12_td_3_Template, 2, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 22);
    \u0275\u0275template(5, PromotionManagementComponent_Conditional_12_th_5_Template, 2, 0, "th", 20)(6, PromotionManagementComponent_Conditional_12_td_6_Template, 2, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 23);
    \u0275\u0275template(8, PromotionManagementComponent_Conditional_12_th_8_Template, 2, 0, "th", 20)(9, PromotionManagementComponent_Conditional_12_td_9_Template, 3, 4, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 24);
    \u0275\u0275template(11, PromotionManagementComponent_Conditional_12_th_11_Template, 2, 0, "th", 20)(12, PromotionManagementComponent_Conditional_12_td_12_Template, 3, 4, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 25);
    \u0275\u0275template(14, PromotionManagementComponent_Conditional_12_th_14_Template, 2, 0, "th", 20)(15, PromotionManagementComponent_Conditional_12_td_15_Template, 3, 3, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 26);
    \u0275\u0275template(17, PromotionManagementComponent_Conditional_12_th_17_Template, 2, 0, "th", 20)(18, PromotionManagementComponent_Conditional_12_td_18_Template, 2, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 27);
    \u0275\u0275template(20, PromotionManagementComponent_Conditional_12_th_20_Template, 2, 0, "th", 20)(21, PromotionManagementComponent_Conditional_12_td_21_Template, 10, 2, "td", 21);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(22, PromotionManagementComponent_Conditional_12_tr_22_Template, 1, 0, "tr", 28)(23, PromotionManagementComponent_Conditional_12_tr_23_Template, 1, 0, "tr", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, PromotionManagementComponent_Conditional_12_Conditional_24_Template, 2, 0, "p", 30);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.promotions);
    \u0275\u0275advance(22);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.promotions.length === 0 ? 24 : -1);
  }
}
var PromotionManagementComponent = class _PromotionManagementComponent {
  constructor(adminService, productService, fb, snackBar) {
    this.adminService = adminService;
    this.productService = productService;
    this.fb = fb;
    this.snackBar = snackBar;
    this.promotions = [];
    this.allProducts = [];
    this.loading = true;
    this.showForm = false;
    this.editingId = null;
    this.saving = false;
    this.displayedColumns = ["name", "discount", "startDate", "endDate", "active", "products", "actions"];
    this.form = this.fb.group({
      name: ["", Validators.required],
      discountPercent: [null, [Validators.required, Validators.min(0.01), Validators.max(100)]],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      productIds: [[], [Validators.required, Validators.minLength(1)]]
    });
  }
  ngOnInit() {
    this.loadPromotions();
    this.loadProducts();
  }
  loadPromotions() {
    this.loading = true;
    this.adminService.getPromotions().subscribe({
      next: (res) => {
        this.promotions = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open("Error al cargar las promociones", "Cerrar", { duration: 3e3 });
      }
    });
  }
  loadProducts() {
    this.productService.getProducts(0, 200).subscribe({
      next: (res) => this.allProducts = res.data.content,
      error: () => {
      }
    });
  }
  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm)
      this.resetForm();
  }
  resetForm() {
    this.editingId = null;
    this.form.reset({ productIds: [] });
  }
  edit(promotion) {
    this.editingId = promotion.id;
    this.form.patchValue({
      name: promotion.name,
      discountPercent: promotion.discountPercent,
      startDate: promotion.startDate,
      endDate: promotion.endDate,
      productIds: promotion.products.map((p) => p.id)
    });
    this.showForm = true;
  }
  save() {
    if (this.form.invalid)
      return;
    this.saving = true;
    const req = this.form.value;
    const obs = this.editingId ? this.adminService.updatePromotion(this.editingId, req) : this.adminService.createPromotion(req);
    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.resetForm();
        this.loadPromotions();
        this.snackBar.open("Promoci\xF3n guardada", "Cerrar", { duration: 2e3 });
      },
      error: (err) => {
        this.saving = false;
        const msg = err?.error?.message || "Error al guardar la promoci\xF3n";
        this.snackBar.open(msg, "Cerrar", { duration: 3e3 });
      }
    });
  }
  toggle(promotion) {
    this.adminService.togglePromotion(promotion.id).subscribe({
      next: (res) => {
        const idx = this.promotions.findIndex((p) => p.id === promotion.id);
        if (idx !== -1)
          this.promotions[idx] = res.data;
        this.snackBar.open(`Promoci\xF3n ${res.data.active ? "activada" : "desactivada"}`, "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al cambiar estado de la promoci\xF3n", "Cerrar", { duration: 3e3 })
    });
  }
  delete(promotion) {
    if (!confirm(`\xBFEliminar promoci\xF3n "${promotion.name}"?`))
      return;
    this.adminService.deletePromotion(promotion.id).subscribe({
      next: () => {
        this.promotions = this.promotions.filter((p) => p.id !== promotion.id);
        this.snackBar.open("Promoci\xF3n eliminada", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al eliminar la promoci\xF3n", "Cerrar", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function PromotionManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PromotionManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PromotionManagementComponent, selectors: [["app-promotion-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 3, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "name"], ["matInput", "", "type", "number", "formControlName", "discountPercent", "min", "0.01", "max", "100"], ["matInput", "", "type", "date", "formControlName", "startDate"], ["matInput", "", "type", "date", "formControlName", "endDate"], ["appearance", "outline", 1, "full-width"], ["formControlName", "productIds", "multiple", ""], [3, "value"], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["mat-table", "", 1, "promo-table", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "discount"], ["matColumnDef", "startDate"], ["matColumnDef", "endDate"], ["matColumnDef", "active"], ["matColumnDef", "products"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "no-data"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", "title", "Editar", 3, "click"], ["mat-icon-button", "", 3, "click", "title"], ["mat-icon-button", "", "color", "warn", "title", "Eliminar", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function PromotionManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gesti\xF3n de Promociones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 3);
        \u0275\u0275listener("click", function PromotionManagementComponent_Template_button_click_6_listener() {
          return ctx.toggleForm();
        });
        \u0275\u0275elementStart(7, "mat-icon");
        \u0275\u0275text(8, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, PromotionManagementComponent_Conditional_10_Template, 33, 4, "mat-card", 4)(11, PromotionManagementComponent_Conditional_11_Template, 1, 0, "app-loading")(12, PromotionManagementComponent_Conditional_12_Template, 25, 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1(" ", ctx.showForm ? "Cancelar" : "Agregar Promoci\xF3n", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 11 : 12);
      }
    }, dependencies: [
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MinValidator,
      MaxValidator,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatTableModule,
      MatTable,
      MatHeaderCellDef,
      MatHeaderRowDef,
      MatColumnDef,
      MatCellDef,
      MatRowDef,
      MatHeaderCell,
      MatCell,
      MatHeaderRow,
      MatRow,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatInputModule,
      MatInput,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatCardModule,
      MatCard,
      MatSnackBarModule,
      CurrencyPipe,
      DatePipe,
      LoadingComponent
    ], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin: 16px 0;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 8px;\n}\n.promo-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.badge-active[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.badge-inactive[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.85rem;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  padding: 32px;\n}\n/*# sourceMappingURL=promotion-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PromotionManagementComponent, { className: "PromotionManagementComponent" });
})();
export {
  PromotionManagementComponent
};
//# sourceMappingURL=chunk-RIJDTT5G.js.map
