import {
  ProductService
} from "./chunk-AB4V5TRK.js";
import {
  LoadingComponent
} from "./chunk-A35IXTLQ.js";
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
} from "./chunk-WC4CRWHR.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-6VTQI43K.js";
import "./chunk-7VTKONPA.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-JDEIMQFJ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-MKJAF7VR.js";
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
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RP6JOKCW.js";

// src/app/features/admin/category-management/category-management.component.ts
function CategoryManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 4)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 5);
    \u0275\u0275listener("ngSubmit", function CategoryManagementComponent_Conditional_10_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveCategory());
    });
    \u0275\u0275elementStart(4, "div", 6)(5, "mat-form-field", 7)(6, "mat-label");
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 7)(10, "mat-label");
    \u0275\u0275text(11, "Image URL");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 10)(14, "mat-label");
    \u0275\u0275text(15, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "textarea", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 12);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.editingId ? "Edit" : "New", " Category");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", ctx_r1.form.invalid);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId ? "Update" : "Create", " ");
  }
}
function CategoryManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function CategoryManagementComponent_Conditional_12_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "Name");
    \u0275\u0275elementEnd();
  }
}
function CategoryManagementComponent_Conditional_12_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r3.name);
  }
}
function CategoryManagementComponent_Conditional_12_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "Slug");
    \u0275\u0275elementEnd();
  }
}
function CategoryManagementComponent_Conditional_12_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r4.slug);
  }
}
function CategoryManagementComponent_Conditional_12_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "Description");
    \u0275\u0275elementEnd();
  }
}
function CategoryManagementComponent_Conditional_12_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(c_r5.description || "-");
  }
}
function CategoryManagementComponent_Conditional_12_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 23);
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function CategoryManagementComponent_Conditional_12_td_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 24)(1, "button", 25);
    \u0275\u0275listener("click", function CategoryManagementComponent_Conditional_12_td_12_Template_button_click_1_listener() {
      const c_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editCategory(c_r7));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 26);
    \u0275\u0275listener("click", function CategoryManagementComponent_Conditional_12_td_12_Template_button_click_4_listener() {
      const c_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteCategory(c_r7.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function CategoryManagementComponent_Conditional_12_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 27);
  }
}
function CategoryManagementComponent_Conditional_12_tr_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 28);
  }
}
function CategoryManagementComponent_Conditional_12_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 22);
    \u0275\u0275text(1, 'No categories yet. Click "Add Category" to create one.');
    \u0275\u0275elementEnd();
  }
}
function CategoryManagementComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "table", 13);
    \u0275\u0275elementContainerStart(1, 14);
    \u0275\u0275template(2, CategoryManagementComponent_Conditional_12_th_2_Template, 2, 0, "th", 15)(3, CategoryManagementComponent_Conditional_12_td_3_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 17);
    \u0275\u0275template(5, CategoryManagementComponent_Conditional_12_th_5_Template, 2, 0, "th", 15)(6, CategoryManagementComponent_Conditional_12_td_6_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 18);
    \u0275\u0275template(8, CategoryManagementComponent_Conditional_12_th_8_Template, 2, 0, "th", 15)(9, CategoryManagementComponent_Conditional_12_td_9_Template, 2, 1, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 19);
    \u0275\u0275template(11, CategoryManagementComponent_Conditional_12_th_11_Template, 2, 0, "th", 15)(12, CategoryManagementComponent_Conditional_12_td_12_Template, 7, 0, "td", 16);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(13, CategoryManagementComponent_Conditional_12_tr_13_Template, 1, 0, "tr", 20)(14, CategoryManagementComponent_Conditional_12_tr_14_Template, 1, 0, "tr", 21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(15, CategoryManagementComponent_Conditional_12_Conditional_15_Template, 2, 0, "p", 22);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.categories);
    \u0275\u0275advance(13);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.columns);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.categories.length === 0 ? 15 : -1);
  }
}
var CategoryManagementComponent = class _CategoryManagementComponent {
  constructor(fb, productService, snackBar) {
    this.fb = fb;
    this.productService = productService;
    this.snackBar = snackBar;
    this.categories = [];
    this.loading = true;
    this.showForm = false;
    this.editingId = null;
    this.columns = ["name", "slug", "description", "actions"];
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      imageUrl: [""]
    });
  }
  ngOnInit() {
    this.loadCategories();
  }
  loadCategories() {
    this.loading = true;
    this.productService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  resetForm() {
    this.editingId = null;
    this.form.reset();
  }
  editCategory(category) {
    this.editingId = category.id;
    this.showForm = true;
    this.form.patchValue({
      name: category.name,
      description: category.description,
      imageUrl: category.imageUrl
    });
  }
  saveCategory() {
    if (this.form.invalid)
      return;
    const data = this.form.value;
    const obs = this.editingId ? this.productService.updateCategory(this.editingId, data) : this.productService.createCategory(data);
    obs.subscribe({
      next: () => {
        this.snackBar.open(`Category ${this.editingId ? "updated" : "created"}`, "Close", { duration: 3e3 });
        this.showForm = false;
        this.resetForm();
        this.loadCategories();
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error saving category", "Close", { duration: 3e3 })
    });
  }
  deleteCategory(id) {
    if (!confirm("Are you sure you want to delete this category?"))
      return;
    this.productService.deleteCategory(id).subscribe({
      next: () => {
        this.snackBar.open("Category deleted", "Close", { duration: 3e3 });
        this.loadCategories();
      },
      error: () => this.snackBar.open("Error deleting category", "Close", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function CategoryManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CategoryManagementComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CategoryManagementComponent, selectors: [["app-category-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 3, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "name"], ["matInput", "", "formControlName", "imageUrl"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "description", "rows", "3"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["mat-table", "", 1, "category-table", 3, "dataSource"], ["matColumnDef", "name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "slug"], ["matColumnDef", "description"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "no-data"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function CategoryManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Category Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Dashboard");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 3);
        \u0275\u0275listener("click", function CategoryManagementComponent_Template_button_click_6_listener() {
          ctx.showForm = !ctx.showForm;
          return ctx.resetForm();
        });
        \u0275\u0275elementStart(7, "mat-icon");
        \u0275\u0275text(8, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, CategoryManagementComponent_Conditional_10_Template, 19, 4, "mat-card", 4)(11, CategoryManagementComponent_Conditional_11_Template, 1, 0, "app-loading")(12, CategoryManagementComponent_Conditional_12_Template, 16, 4);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1(" ", ctx.showForm ? "Cancel" : "Add Category", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 11 : 12);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, ReactiveFormsModule, FormGroupDirective, FormControlName, RouterLink, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatCardModule, MatCard, MatSnackBarModule, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin: 16px 0;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.category-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n  color: #666;\n}\n/*# sourceMappingURL=category-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CategoryManagementComponent, { className: "CategoryManagementComponent" });
})();
export {
  CategoryManagementComponent
};
//# sourceMappingURL=chunk-N7NXUR4R.js.map
