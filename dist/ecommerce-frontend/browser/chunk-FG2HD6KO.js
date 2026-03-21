import {
  MatInput,
  MatInputModule
} from "./chunk-US5PAJIM.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-WL5UKMCF.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-632HDFWS.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
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
import "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
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
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N3527UH3.js";

// src/app/features/auth/reset-password/reset-password.component.ts
function ResetPasswordComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 1);
    \u0275\u0275text(1, "Token inv\xE1lido o faltante. Por favor solicita un nuevo enlace.");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_Conditional_9_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La contrase\xF1a es requerida");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_Conditional_9_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La contrase\xF1a debe tener al menos 8 caracteres");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_Conditional_9_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Las contrase\xF1as no coinciden");
    \u0275\u0275elementEnd();
  }
}
function ResetPasswordComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 5);
    \u0275\u0275listener("ngSubmit", function ResetPasswordComponent_Conditional_9_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "mat-form-field", 6)(2, "mat-label");
    \u0275\u0275text(3, "Nueva contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 7);
    \u0275\u0275elementStart(5, "button", 8);
    \u0275\u0275listener("click", function ResetPasswordComponent_Conditional_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hidePassword = !ctx_r1.hidePassword);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ResetPasswordComponent_Conditional_9_Conditional_8_Template, 2, 0, "mat-error")(9, ResetPasswordComponent_Conditional_9_Conditional_9_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 6)(11, "mat-label");
    \u0275\u0275text(12, "Confirmar contrase\xF1a");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 9);
    \u0275\u0275elementStart(14, "button", 8);
    \u0275\u0275listener("click", function ResetPasswordComponent_Conditional_9_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.hideConfirm = !ctx_r1.hideConfirm);
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, ResetPasswordComponent_Conditional_9_Conditional_17_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 10);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_8_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(4);
    \u0275\u0275property("type", ctx_r1.hidePassword ? "password" : "text");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.hidePassword ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.form.get("newPassword")) == null ? null : tmp_4_0.hasError("required")) && ((tmp_4_0 = ctx_r1.form.get("newPassword")) == null ? null : tmp_4_0.touched) ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r1.form.get("newPassword")) == null ? null : tmp_5_0.hasError("minlength")) && ((tmp_5_0 = ctx_r1.form.get("newPassword")) == null ? null : tmp_5_0.touched) ? 9 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("type", ctx_r1.hideConfirm ? "password" : "text");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.hideConfirm ? "visibility_off" : "visibility");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_8_0 = ctx_r1.form.get("confirmPassword")) == null ? null : tmp_8_0.touched) && ctx_r1.form.hasError("passwordsMismatch") ? 17 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Updating..." : "Restablecer contrase\xF1a", " ");
  }
}
function passwordsMatchValidator(control) {
  const password = control.get("newPassword");
  const confirm = control.get("confirmPassword");
  if (!password || !confirm)
    return null;
  return password.value === confirm.value ? null : { passwordsMismatch: true };
}
var ResetPasswordComponent = class _ResetPasswordComponent {
  constructor(fb, route, router, auth, snackBar) {
    this.fb = fb;
    this.route = route;
    this.router = router;
    this.auth = auth;
    this.snackBar = snackBar;
    this.token = null;
    this.loading = false;
    this.hidePassword = true;
    this.hideConfirm = true;
    this.form = this.fb.group({
      newPassword: ["", [Validators.required, Validators.minLength(8)]],
      confirmPassword: ["", Validators.required]
    }, { validators: passwordsMatchValidator });
  }
  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get("token");
  }
  onSubmit() {
    if (this.form.invalid || !this.token)
      return;
    this.loading = true;
    this.auth.resetPassword(this.token, this.form.value.newPassword).subscribe({
      next: () => {
        this.snackBar.open("Contrase\xF1a actualizada exitosamente.", "Cerrar", { duration: 4e3 });
        this.router.navigate(["/login"]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Token inv\xE1lido o expirado.", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function ResetPasswordComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ResetPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ResetPasswordComponent, selectors: [["app-reset-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 1, consts: [[1, "auth-container"], [1, "error-message"], [3, "formGroup"], ["align", "end"], ["routerLink", "/login"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "newPassword", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["matInput", "", "formControlName", "confirmPassword", 3, "type"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"]], template: function ResetPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Restablecer contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-subtitle");
        \u0275\u0275text(6, "Ingresa tu nueva contrase\xF1a.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content");
        \u0275\u0275template(8, ResetPasswordComponent_Conditional_8_Template, 2, 0, "p", 1)(9, ResetPasswordComponent_Conditional_9_Template, 20, 10, "form", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-card-actions", 3)(11, "p")(12, "a", 4);
        \u0275\u0275text(13, "Volver a iniciar sesi\xF3n");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(!ctx.token ? 8 : 9);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 60vh;\n  padding: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: 100%;\n  padding: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n}\nmat-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-weight: 500;\n}\n.error-message[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-size: 0.95rem;\n}\n/*# sourceMappingURL=reset-password.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ResetPasswordComponent, { className: "ResetPasswordComponent" });
})();
export {
  ResetPasswordComponent
};
//# sourceMappingURL=chunk-FG2HD6KO.js.map
