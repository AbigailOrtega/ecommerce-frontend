import {
  AuthService
} from "./chunk-KYTBZJSG.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-6VTQI43K.js";
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix
} from "./chunk-JDEIMQFJ.js";
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
} from "./chunk-MKJAF7VR.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
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
  MatButton,
  MatButtonModule,
  MatIconButton,
  Router,
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
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-RP6JOKCW.js";

// src/app/features/auth/login/login.component.ts
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Invalid email");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Password is required");
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
        this.snackBar.open("Login successful!", "Close", { duration: 3e3 });
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Login failed", "Close", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 8, consts: [[1, "auth-container"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "email", "type", "email"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"], ["align", "end"], ["routerLink", "/register"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Sign In");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-subtitle");
        \u0275\u0275text(6, "Welcome back! Please sign in to continue.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "form", 1);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_8_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(9, "mat-form-field", 2)(10, "mat-label");
        \u0275\u0275text(11, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275element(12, "input", 3);
        \u0275\u0275template(13, LoginComponent_Conditional_13_Template, 2, 0, "mat-error")(14, LoginComponent_Conditional_14_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "mat-form-field", 2)(16, "mat-label");
        \u0275\u0275text(17, "Password");
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
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "mat-card-actions", 7)(26, "p");
        \u0275\u0275text(27, "Don't have an account? ");
        \u0275\u0275elementStart(28, "a", 8);
        \u0275\u0275text(29, "Sign Up");
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
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Signing in..." : "Sign In", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 60vh;\n  padding: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 420px;\n  width: 100%;\n  padding: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\nmat-card-actions[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.9rem;\n}\nmat-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-weight: 500;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent" });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-SAVSBFG4.js.map
