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

// src/app/features/auth/register/register.component.ts
function RegisterComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "La contrase\xF1a debe tener al menos 8 caracteres");
    \u0275\u0275elementEnd();
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(fb, auth, router, snackBar) {
    this.fb = fb;
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
    this.hidePassword = true;
    this.loading = false;
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: [""],
      password: ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  onSubmit() {
    if (this.form.invalid)
      return;
    this.loading = true;
    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.snackBar.open("\xA1Cuenta creada exitosamente!", "Cerrar", { duration: 3e3 });
        this.router.navigate(["/"]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Error al registrarse", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _RegisterComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 41, vars: 6, consts: [[1, "auth-container"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "firstName"], ["matInput", "", "formControlName", "lastName"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "email", "type", "email"], ["matInput", "", "formControlName", "phone"], ["matInput", "", "formControlName", "password", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"], ["align", "end"], ["routerLink", "/login"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
        \u0275\u0275text(4, "Crear cuenta");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "mat-card-subtitle");
        \u0275\u0275text(6, "\xA1\xDAnete hoy!");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "mat-card-content")(8, "form", 1);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_8_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(9, "div", 2)(10, "mat-form-field", 3)(11, "mat-label");
        \u0275\u0275text(12, "Nombre");
        \u0275\u0275elementEnd();
        \u0275\u0275element(13, "input", 4);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "mat-form-field", 3)(15, "mat-label");
        \u0275\u0275text(16, "Apellido");
        \u0275\u0275elementEnd();
        \u0275\u0275element(17, "input", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "mat-form-field", 6)(19, "mat-label");
        \u0275\u0275text(20, "Correo electr\xF3nico");
        \u0275\u0275elementEnd();
        \u0275\u0275element(21, "input", 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(22, "mat-form-field", 6)(23, "mat-label");
        \u0275\u0275text(24, "Tel\xE9fono (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(25, "input", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-form-field", 6)(27, "mat-label");
        \u0275\u0275text(28, "Contrase\xF1a");
        \u0275\u0275elementEnd();
        \u0275\u0275element(29, "input", 9);
        \u0275\u0275elementStart(30, "button", 10);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_30_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(31, "mat-icon");
        \u0275\u0275text(32);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(33, RegisterComponent_Conditional_33_Template, 2, 0, "mat-error");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 11);
        \u0275\u0275text(35);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(36, "mat-card-actions", 12)(37, "p");
        \u0275\u0275text(38, "\xBFYa tienes cuenta? ");
        \u0275\u0275elementStart(39, "a", 13);
        \u0275\u0275text(40, "Iniciar sesi\xF3n");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_3_0;
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.form);
        \u0275\u0275advance(21);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_3_0 = ctx.form.get("password")) == null ? null : tmp_3_0.hasError("minlength")) && ((tmp_3_0 = ctx.form.get("password")) == null ? null : tmp_3_0.touched) ? 33 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Creando cuenta..." : "Crear cuenta", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, RouterLink, MatCardModule, MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle, MatFormFieldModule, MatFormField, MatLabel, MatError, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 60vh;\n  padding: 24px;\n}\nmat-card[_ngcontent-%COMP%] {\n  max-width: 480px;\n  width: 100%;\n  padding: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\nmat-card-actions[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--theme-primary);\n  font-weight: 500;\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent" });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-X7HI73U4.js.map
