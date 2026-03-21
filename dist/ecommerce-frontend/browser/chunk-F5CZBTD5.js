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
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-N3527UH3.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "El correo es requerido");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Correo inv\xE1lido");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La contrase\xF1a es requerida");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(fb, auth, router, snackBar) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
    this.hidePassword = true;
    this.loading = false;
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.loading = true;
    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.snackBar.open("\xA1Sesi\xF3n iniciada!", "Cerrar", { duration: 3e3 });
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Error al iniciar sesi\xF3n", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 33, vars: 8, consts: [[1, "auth-container"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "email", "type", "email"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"], [1, "forgot-link"], ["routerLink", "/forgot-password"], ["align", "end"], ["routerLink", "/register"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Iniciar sesi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-subtitle");
        \u0275\u0275text(6, "\xA1Bienvenido! Por favor inicia sesi\xF3n para continuar.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "form", 1);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_8_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(9, "mat-form-field", 2)(10, "mat-label");
        \u0275\u0275text(11, "Correo electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "input", 3);
        \u0275\u0275template(13, LoginComponent_Conditional_13_Template, 2, 0, "mat-error")(14, LoginComponent_Conditional_14_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-form-field", 2)(16, "mat-label");
        \u0275\u0275text(17, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(18, "input", 4);
        \u0275\u0275elementStart(19, "button", 5);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_19_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(20, "mat-icon");
        \u0275\u0275text(21);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(22, LoginComponent_Conditional_22_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "button", 6);
        \u0275\u0275text(24);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p", 7)(26, "a", 8);
        \u0275\u0275text(27, "\xBFOlvidaste tu contrase\xF1a?");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(28, "mat-card-actions", 9)(29, "p");
        \u0275\u0275text(30, "\xBFNo tienes cuenta? ");
        \u0275\u0275elementStart(31, "a", 10);
        \u0275\u0275text(32, "Reg\xEDstrate");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.hasError("required")) && ((tmp_1_0 = ctx.form.get("email")) == null ? null : tmp_1_0.touched) ? 13 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.hasError("email")) && ((tmp_2_0 = ctx.form.get("email")) == null ? null : tmp_2_0.touched) ? 14 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_5_0 = ctx.form.get("password")) == null ? null : tmp_5_0.hasError("required")) && ((tmp_5_0 = ctx.form.get("password")) == null ? null : tmp_5_0.touched) ? 22 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Iniciando sesi\xF3n..." : "Iniciar sesi\xF3n", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 60vh;\n  padding: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: 100%;\n  padding: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n}\nmat-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-weight: 500;\n}\n.forgot-link[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 0.9rem;\n  text-align: right;\n}\n.forgot-link[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-F5CZBTD5.js.map
