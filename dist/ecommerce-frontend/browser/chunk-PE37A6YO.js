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
import "./chunk-FQ2SHJAF.js";
import {
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  MatButton,
  MatButtonModule
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
  ɵɵtextInterpolate1
} from "./chunk-N3527UH3.js";

// src/app/features/auth/forgot-password/forgot-password.component.ts
function ForgotPasswordComponent_Conditional_8_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_Conditional_8_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Correo inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function ForgotPasswordComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 5);
    \u0275\u0275listener("ngSubmit", function ForgotPasswordComponent_Conditional_8_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "mat-form-field", 6)(2, "mat-label");
    \u0275\u0275text(3, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "input", 7);
    \u0275\u0275template(5, ForgotPasswordComponent_Conditional_8_Conditional_5_Template, 2, 0, "mat-error")(6, ForgotPasswordComponent_Conditional_8_Conditional_6_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 8);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_2_0;
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_2_0 = ctx_r1.form.get("email")) == null ? null : tmp_2_0.hasError("required")) && ((tmp_2_0 = ctx_r1.form.get("email")) == null ? null : tmp_2_0.touched) ? 5 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_3_0 = ctx_r1.form.get("email")) == null ? null : tmp_3_0.hasError("email")) && ((tmp_3_0 = ctx_r1.form.get("email")) == null ? null : tmp_3_0.touched) ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.loading);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loading ? "Enviando..." : "Enviar enlace", " ");
  }
}
function ForgotPasswordComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 2);
    \u0275\u0275text(1, "Si existe una cuenta con ese correo, recibir\xE1s un enlace de recuperaci\xF3n.");
    \u0275\u0275elementEnd();
  }
}
var ForgotPasswordComponent = class _ForgotPasswordComponent {
  constructor(fb, auth, snackBar) {
    this.fb = fb;
    this.auth = auth;
    this.snackBar = snackBar;
    this.loading = false;
    this.submitted = false;
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.loading = true;
    this.auth.forgotPassword(this.form.value.email).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open("Algo sali\xF3 mal. Por favor intenta de nuevo.", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function ForgotPasswordComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ForgotPasswordComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForgotPasswordComponent, selectors: [["app-forgot-password"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 14, vars: 1, consts: [[1, "auth-container"], [3, "formGroup"], [1, "success-message"], ["align", "end"], ["routerLink", "/login"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "email", "type", "email"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"]], template: function ForgotPasswordComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Olvid\xE9 mi contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-subtitle");
        \u0275\u0275text(6, "Ingresa tu correo para recibir un enlace de recuperaci\xF3n.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content");
        \u0275\u0275template(8, ForgotPasswordComponent_Conditional_8_Template, 9, 5, "form", 1)(9, ForgotPasswordComponent_Conditional_9_Template, 2, 0, "p", 2);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "mat-card-actions", 3)(11, "p")(12, "a", 4);
        \u0275\u0275text(13, "Volver a iniciar sesi\xF3n");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275conditional(!ctx.submitted ? 8 : 9);
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatInputModule, MatInput, MatButtonModule, MatButton, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 60vh;\n  padding: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: 100%;\n  padding: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n}\nmat-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-weight: 500;\n}\n.success-message[_ngcontent-%COMP%] {\n  color: #388e3c;\n  font-size: 0.95rem;\n}\n/*# sourceMappingURL=forgot-password.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForgotPasswordComponent, { className: "ForgotPasswordComponent" });
})();
export {
  ForgotPasswordComponent
};
//# sourceMappingURL=chunk-PE37A6YO.js.map
