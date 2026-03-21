import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-XJ2Z6WGZ.js";
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
  MatTooltip,
  MatTooltipModule
} from "./chunk-JITF7FU4.js";
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
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
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
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  DatePipe,
  __spreadValues,
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/features/admin/coupon-management/coupon-management.component.ts
function CouponManagementComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function CouponManagementComponent_Conditional_29_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.cancelEdit());
    });
    \u0275\u0275text(1, "Cancelar");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_th_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "C\xF3digo");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(c_r3.code);
  }
}
function CouponManagementComponent_th_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Descuento");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", c_r4.discountPercent, "%");
  }
}
function CouponManagementComponent_th_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Expira");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, c_r5.expiresAt, "mediumDate"));
  }
}
function CouponManagementComponent_th_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Uso");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const c_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", c_r6.usageCount, "", c_r6.usageLimit ? " / " + c_r6.usageLimit : "", " ");
  }
}
function CouponManagementComponent_th_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 28)(1, "mat-slide-toggle", 29);
    \u0275\u0275listener("change", function CouponManagementComponent_td_46_Template_mat_slide_toggle_change_1_listener() {
      const c_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggle(c_r8));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const c_r8 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("checked", c_r8.active);
  }
}
function CouponManagementComponent_th_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 27);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function CouponManagementComponent_td_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 28)(1, "button", 30);
    \u0275\u0275listener("click", function CouponManagementComponent_td_49_Template_button_click_1_listener() {
      const c_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.edit(c_r10));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 31);
    \u0275\u0275listener("click", function CouponManagementComponent_td_49_Template_button_click_4_listener() {
      const c_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.delete(c_r10));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function CouponManagementComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 32);
  }
}
function CouponManagementComponent_tr_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 33);
  }
}
function CouponManagementComponent_Conditional_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1, "Sin cupones a\xFAn. Crea uno arriba.");
    \u0275\u0275elementEnd();
  }
}
var CouponManagementComponent = class _CouponManagementComponent {
  constructor(admin, snackBar) {
    this.admin = admin;
    this.snackBar = snackBar;
    this.coupons = [];
    this.displayedColumns = ["code", "discount", "expires", "usage", "active", "actions"];
    this.saving = false;
    this.editingId = null;
    this.form = {
      code: "",
      discountPercent: 10,
      expiresAt: "",
      usageLimit: void 0
    };
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.admin.getCoupons().subscribe({ next: (res) => this.coupons = res.data });
  }
  isValid() {
    return !!this.form.code.trim() && this.form.discountPercent > 0 && this.form.discountPercent <= 100 && !!this.form.expiresAt;
  }
  save() {
    this.saving = true;
    const req = __spreadValues({
      code: this.form.code.trim().toUpperCase(),
      discountPercent: this.form.discountPercent,
      expiresAt: this.form.expiresAt
    }, this.form.usageLimit ? { usageLimit: this.form.usageLimit } : {});
    const obs = this.editingId ? this.admin.updateCoupon(this.editingId, req) : this.admin.createCoupon(req);
    obs.subscribe({
      next: () => {
        this.saving = false;
        this.snackBar.open(this.editingId ? "Cup\xF3n actualizado" : "Cup\xF3n creado", "Cerrar", { duration: 2e3 });
        this.resetForm();
        this.load();
      },
      error: (err) => {
        this.saving = false;
        this.snackBar.open(err.error?.message || "Error al guardar el cup\xF3n", "Cerrar", { duration: 3e3 });
      }
    });
  }
  edit(c) {
    this.editingId = c.id;
    this.form = {
      code: c.code,
      discountPercent: c.discountPercent,
      expiresAt: c.expiresAt.substring(0, 10),
      usageLimit: c.usageLimit
    };
  }
  cancelEdit() {
    this.resetForm();
  }
  toggle(c) {
    this.admin.toggleCoupon(c.id).subscribe({
      next: (res) => {
        c.active = res.data.active;
        this.snackBar.open(`Cup\xF3n ${c.active ? "activado" : "desactivado"}`, "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al cambiar estado del cup\xF3n", "Cerrar", { duration: 2e3 })
    });
  }
  delete(c) {
    if (!confirm(`\xBFEliminar cup\xF3n "${c.code}"?`))
      return;
    this.admin.deleteCoupon(c.id).subscribe({
      next: () => {
        this.snackBar.open("Cup\xF3n eliminado", "Cerrar", { duration: 2e3 });
        this.load();
      },
      error: () => this.snackBar.open("Error al eliminar el cup\xF3n", "Cerrar", { duration: 2e3 })
    });
  }
  resetForm() {
    this.editingId = null;
    this.form = { code: "", discountPercent: 10, expiresAt: "", usageLimit: void 0 };
  }
  static {
    this.\u0275fac = function CouponManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CouponManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CouponManagementComponent, selectors: [["app-coupon-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 53, vars: 12, consts: [[1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "form-card"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "placeholder", "MYCODE20", 2, "text-transform", "uppercase", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "min", "1", "max", "100", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "date", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-button", ""], [1, "table-card"], ["mat-table", "", 1, "full-width", 3, "dataSource"], ["matColumnDef", "code"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "discount"], ["matColumnDef", "expires"], ["matColumnDef", "usage"], ["matColumnDef", "active"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "empty"], ["mat-button", "", 3, "click"], ["mat-header-cell", ""], ["mat-cell", ""], ["matTooltip", "Activar/desactivar", 3, "change", "checked"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Editar", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Eliminar", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function CouponManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Gesti\xF3n de Cupones");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 2);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-card", 3)(7, "h2");
        \u0275\u0275text(8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "div", 4)(10, "mat-form-field", 5)(11, "mat-label");
        \u0275\u0275text(12, "C\xF3digo (ej. BUENFIN10)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "input", 6);
        \u0275\u0275twoWayListener("ngModelChange", function CouponManagementComponent_Template_input_ngModelChange_13_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.code, $event) || (ctx.form.code = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(14, "mat-form-field", 5)(15, "mat-label");
        \u0275\u0275text(16, "Descuento %");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 7);
        \u0275\u0275twoWayListener("ngModelChange", function CouponManagementComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.discountPercent, $event) || (ctx.form.discountPercent = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-form-field", 5)(19, "mat-label");
        \u0275\u0275text(20, "Expira el");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function CouponManagementComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.expiresAt, $event) || (ctx.form.expiresAt = $event);
          return $event;
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "mat-form-field", 5)(23, "mat-label");
        \u0275\u0275text(24, "L\xEDmite de uso (vac\xEDo = ilimitado)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function CouponManagementComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.form.usageLimit, $event) || (ctx.form.usageLimit = $event);
          return $event;
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(26, "div", 10)(27, "button", 11);
        \u0275\u0275listener("click", function CouponManagementComponent_Template_button_click_27_listener() {
          return ctx.save();
        });
        \u0275\u0275text(28);
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, CouponManagementComponent_Conditional_29_Template, 2, 0, "button", 12);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "mat-card", 13)(31, "table", 14);
        \u0275\u0275elementContainerStart(32, 15);
        \u0275\u0275template(33, CouponManagementComponent_th_33_Template, 2, 0, "th", 16)(34, CouponManagementComponent_td_34_Template, 3, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(35, 18);
        \u0275\u0275template(36, CouponManagementComponent_th_36_Template, 2, 0, "th", 16)(37, CouponManagementComponent_td_37_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(38, 19);
        \u0275\u0275template(39, CouponManagementComponent_th_39_Template, 2, 0, "th", 16)(40, CouponManagementComponent_td_40_Template, 3, 4, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(41, 20);
        \u0275\u0275template(42, CouponManagementComponent_th_42_Template, 2, 0, "th", 16)(43, CouponManagementComponent_td_43_Template, 2, 2, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(44, 21);
        \u0275\u0275template(45, CouponManagementComponent_th_45_Template, 2, 0, "th", 16)(46, CouponManagementComponent_td_46_Template, 2, 1, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275elementContainerStart(47, 22);
        \u0275\u0275template(48, CouponManagementComponent_th_48_Template, 2, 0, "th", 16)(49, CouponManagementComponent_td_49_Template, 7, 0, "td", 17);
        \u0275\u0275elementContainerEnd();
        \u0275\u0275template(50, CouponManagementComponent_tr_50_Template, 1, 0, "tr", 23)(51, CouponManagementComponent_tr_51_Template, 1, 0, "tr", 24);
        \u0275\u0275elementEnd();
        \u0275\u0275template(52, CouponManagementComponent_Conditional_52_Template, 2, 0, "p", 25);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275textInterpolate(ctx.editingId ? "Editar Cup\xF3n" : "Nuevo Cup\xF3n");
        \u0275\u0275advance(5);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.code);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.discountPercent);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.expiresAt);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.usageLimit);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.saving || !ctx.isValid());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.saving ? "Guardando..." : ctx.editingId ? "Actualizar" : "Crear", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.editingId ? 29 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275property("dataSource", ctx.coupons);
        \u0275\u0275advance(19);
        \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.coupons.length === 0 ? 52 : -1);
      }
    }, dependencies: [RouterLink, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatCardModule, MatCard, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSlideToggleModule, MatSlideToggle, MatSnackBarModule, MatTooltipModule, MatTooltip, DatePipe], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 8px;\n}\n.table-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.empty[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n  color: #888;\n}\n@media (max-width: 600px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=coupon-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CouponManagementComponent, { className: "CouponManagementComponent" });
})();
export {
  CouponManagementComponent
};
//# sourceMappingURL=chunk-PIFDLMWO.js.map
