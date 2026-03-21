import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  MatTableModule
} from "./chunk-3YZFWUW6.js";
import {
  LoadingComponent
} from "./chunk-YDDZ6VVU.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-4Y3BE5O3.js";
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
  MatHint,
  MatLabel
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  ReactiveFormsModule,
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
  MatIconButton
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  DatePipe,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-N3527UH3.js";

// src/app/features/admin/banner-management/banner-management.component.ts
var _c0 = ["fileInput"];
var _forTrack0 = ($index, $item) => $item.id;
function BannerManagementComponent_Conditional_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 15);
    \u0275\u0275elementStart(1, "p");
    \u0275\u0275text(2, "Uploading\u2026");
    \u0275\u0275elementEnd();
  }
}
function BannerManagementComponent_Conditional_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 16);
    \u0275\u0275elementStart(1, "div", 17)(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Cambiar imagen");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.previewUrl, \u0275\u0275sanitizeUrl);
  }
}
function BannerManagementComponent_Conditional_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 18);
    \u0275\u0275text(1, "add_photo_alternate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "Haz clic para subir imagen del banner");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 19);
    \u0275\u0275text(5, "Recomendado: 1200\xD7300 px o m\xE1s ancho");
    \u0275\u0275elementEnd();
  }
}
function BannerManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 5)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 7);
    \u0275\u0275listener("ngSubmit", function BannerManagementComponent_Conditional_10_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.save());
    });
    \u0275\u0275elementStart(4, "div", 8);
    \u0275\u0275listener("click", function BannerManagementComponent_Conditional_10_Template_div_click_4_listener() {
      \u0275\u0275restoreView(_r1);
      const fileInput_r3 = \u0275\u0275reference(9);
      return \u0275\u0275resetView(fileInput_r3.click());
    });
    \u0275\u0275template(5, BannerManagementComponent_Conditional_10_Conditional_5_Template, 3, 0)(6, BannerManagementComponent_Conditional_10_Conditional_6_Template, 5, 1)(7, BannerManagementComponent_Conditional_10_Conditional_7_Template, 6, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 9, 0);
    \u0275\u0275listener("change", function BannerManagementComponent_Conditional_10_Template_input_change_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-form-field", 10)(11, "mat-label");
    \u0275\u0275text(12, "URL del enlace (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "input", 11);
    \u0275\u0275elementStart(14, "mat-hint");
    \u0275\u0275text(15, "A d\xF3nde ir al hacer clic en el banner");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 12)(17, "button", 13);
    \u0275\u0275listener("click", function BannerManagementComponent_Conditional_10_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleForm());
    });
    \u0275\u0275text(18, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 14);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.editingId ? "Editar Banner" : "Nuevo Banner");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance();
    \u0275\u0275classProp("has-image", ctx_r1.previewUrl);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.uploading ? 5 : ctx_r1.previewUrl ? 6 : 7);
    \u0275\u0275advance(14);
    \u0275\u0275property("disabled", !ctx_r1.previewUrl || ctx_r1.uploading || ctx_r1.saving);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.saving ? "Guardando..." : "Guardar Banner", " ");
  }
}
function BannerManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function BannerManagementComponent_Conditional_12_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 26)(1, "mat-icon", 32);
    \u0275\u0275text(2, "link");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banner_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", banner_r5.linkUrl, "");
  }
}
function BannerManagementComponent_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 22)(1, "div", 23);
    \u0275\u0275element(2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, BannerManagementComponent_Conditional_12_For_2_Conditional_6_Template, 4, 1, "p", 26);
    \u0275\u0275elementStart(7, "p", 27);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 28)(11, "button", 29);
    \u0275\u0275listener("click", function BannerManagementComponent_Conditional_12_For_2_Template_button_click_11_listener() {
      const banner_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.edit(banner_r5));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 30);
    \u0275\u0275listener("click", function BannerManagementComponent_Conditional_12_For_2_Template_button_click_14_listener() {
      const banner_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.toggle(banner_r5));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "button", 31);
    \u0275\u0275listener("click", function BannerManagementComponent_Conditional_12_For_2_Template_button_click_17_listener() {
      const banner_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.delete(banner_r5));
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const banner_r5 = ctx.$implicit;
    \u0275\u0275classProp("inactive", !banner_r5.active);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", banner_r5.imageUrl, \u0275\u0275sanitizeUrl)("alt", "Banner " + banner_r5.id);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(banner_r5.active ? "badge-active" : "badge-inactive");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banner_r5.active ? "Activo" : "Inactivo", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(banner_r5.linkUrl ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("A\xF1adido ", \u0275\u0275pipeBind2(9, 11, banner_r5.createdAt, "mediumDate"), "");
    \u0275\u0275advance(6);
    \u0275\u0275property("title", banner_r5.active ? "Desactivar" : "Activar");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(banner_r5.active ? "toggle_on" : "toggle_off");
  }
}
function BannerManagementComponent_Conditional_12_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 21);
    \u0275\u0275text(1, "Sin banners a\xFAn. Agrega uno arriba.");
    \u0275\u0275elementEnd();
  }
}
function BannerManagementComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275repeaterCreate(1, BannerManagementComponent_Conditional_12_For_2_Template, 20, 14, "mat-card", 20, _forTrack0);
    \u0275\u0275template(3, BannerManagementComponent_Conditional_12_Conditional_3_Template, 2, 0, "p", 21);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.banners);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.banners.length === 0 ? 3 : -1);
  }
}
var BannerManagementComponent = class _BannerManagementComponent {
  constructor(adminService, fb, snackBar) {
    this.adminService = adminService;
    this.fb = fb;
    this.snackBar = snackBar;
    this.banners = [];
    this.loading = true;
    this.showForm = false;
    this.editingId = null;
    this.uploading = false;
    this.saving = false;
    this.previewUrl = null;
    this.form = this.fb.group({
      linkUrl: [""]
    });
  }
  ngOnInit() {
    this.loadBanners();
  }
  loadBanners() {
    this.loading = true;
    this.adminService.getBanners().subscribe({
      next: (res) => {
        this.banners = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.snackBar.open("Error al cargar los banners", "Cerrar", { duration: 3e3 });
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
    this.previewUrl = null;
    this.form.reset();
  }
  edit(banner) {
    this.editingId = banner.id;
    this.previewUrl = banner.imageUrl;
    this.form.patchValue({ linkUrl: banner.linkUrl || "" });
    this.showForm = true;
  }
  onFileSelected(event) {
    const file = event.target.files?.[0];
    if (!file)
      return;
    this.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        this.previewUrl = res.data["url"];
        this.uploading = false;
      },
      error: () => {
        this.uploading = false;
        this.snackBar.open("Error al subir la imagen", "Cerrar", { duration: 3e3 });
      }
    });
    this.fileInput.nativeElement.value = "";
  }
  save() {
    if (!this.previewUrl)
      return;
    this.saving = true;
    const req = {
      imageUrl: this.previewUrl,
      linkUrl: this.form.value.linkUrl || void 0
    };
    const obs = this.editingId ? this.adminService.updateBanner(this.editingId, req) : this.adminService.createBanner(req);
    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.resetForm();
        this.loadBanners();
        this.snackBar.open("Banner guardado", "Cerrar", { duration: 2e3 });
      },
      error: () => {
        this.saving = false;
        this.snackBar.open("Error al guardar el banner", "Cerrar", { duration: 3e3 });
      }
    });
  }
  toggle(banner) {
    this.adminService.toggleBanner(banner.id).subscribe({
      next: (res) => {
        const idx = this.banners.findIndex((b) => b.id === banner.id);
        if (idx !== -1)
          this.banners[idx] = res.data;
        this.snackBar.open(`Banner ${res.data.active ? "activado" : "desactivado"}`, "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al cambiar estado del banner", "Cerrar", { duration: 3e3 })
    });
  }
  delete(banner) {
    if (!confirm("\xBFEliminar este banner?"))
      return;
    this.adminService.deleteBanner(banner.id).subscribe({
      next: () => {
        this.banners = this.banners.filter((b) => b.id !== banner.id);
        this.snackBar.open("Banner eliminado", "Cerrar", { duration: 2e3 });
      },
      error: () => this.snackBar.open("Error al eliminar el banner", "Cerrar", { duration: 3e3 })
    });
  }
  static {
    this.\u0275fac = function BannerManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _BannerManagementComponent)(\u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BannerManagementComponent, selectors: [["app-banner-management"]], viewQuery: function BannerManagementComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.fileInput = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 3, consts: [["fileInput", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "form-card"], [1, "banner-list"], [3, "ngSubmit", "formGroup"], [1, "upload-area", 3, "click"], ["type", "file", "accept", "image/*", 1, "hidden-input", 3, "change"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "linkUrl", "placeholder", "https://..."], [1, "form-actions"], ["mat-button", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "40"], ["alt", "Banner preview", 1, "preview-img", 3, "src"], [1, "overlay"], [1, "upload-icon"], [1, "hint"], [1, "banner-card", 3, "inactive"], [1, "no-data"], [1, "banner-card"], [1, "banner-img-wrap"], [1, "banner-thumb", 3, "src", "alt"], [1, "banner-info"], [1, "link-url"], [1, "created"], [1, "banner-actions"], ["mat-icon-button", "", "title", "Editar", 3, "click"], ["mat-icon-button", "", 3, "click", "title"], ["mat-icon-button", "", "color", "warn", "title", "Eliminar", 3, "click"], [1, "small-icon"]], template: function BannerManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Banners Promocionales");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 4);
        \u0275\u0275listener("click", function BannerManagementComponent_Template_button_click_6_listener() {
          return ctx.toggleForm();
        });
        \u0275\u0275elementStart(7, "mat-icon");
        \u0275\u0275text(8, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, BannerManagementComponent_Conditional_10_Template, 21, 7, "mat-card", 5)(11, BannerManagementComponent_Conditional_11_Template, 1, 0, "app-loading")(12, BannerManagementComponent_Conditional_12_Template, 4, 1, "div", 6);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1(" ", ctx.showForm ? "Cancelar" : "Agregar Banner", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 11 : 12);
      }
    }, dependencies: [
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
      RouterLink,
      MatTableModule,
      MatButtonModule,
      MatAnchor,
      MatButton,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatFormFieldModule,
      MatFormField,
      MatLabel,
      MatHint,
      MatInputModule,
      MatInput,
      MatCardModule,
      MatCard,
      MatSnackBarModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      DatePipe,
      LoadingComponent
    ], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin: 16px 0;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n.hidden-input[_ngcontent-%COMP%] {\n  display: none;\n}\n.upload-area[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  border-radius: 8px;\n  padding: 32px;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 0.2s;\n  position: relative;\n  min-height: 160px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n}\n.upload-area[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n}\n.upload-area.has-image[_ngcontent-%COMP%] {\n  padding: 0;\n  border-style: solid;\n  overflow: hidden;\n}\n.upload-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #aaa;\n  margin-bottom: 8px;\n}\n.upload-area[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0;\n  color: #555;\n}\n.upload-area[_ngcontent-%COMP%]   .hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: #999;\n}\n.preview-img[_ngcontent-%COMP%] {\n  width: 100%;\n  max-height: 220px;\n  object-fit: cover;\n  display: block;\n}\n.overlay[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  color: white;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.upload-area[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.banner-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 16px;\n}\n.banner-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 12px;\n}\n.banner-card.inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.banner-img-wrap[_ngcontent-%COMP%] {\n  flex: 0 0 200px;\n}\n.banner-thumb[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 4px;\n  display: block;\n}\n.banner-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.link-url[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  color: #555;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.small-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.created[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.8rem;\n  color: #999;\n}\n.banner-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n}\n.badge-active[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n}\n.badge-inactive[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n  padding: 2px 8px;\n  border-radius: 4px;\n  font-size: 0.8rem;\n}\n.no-data[_ngcontent-%COMP%] {\n  text-align: center;\n  color: #666;\n  padding: 32px;\n}\n/*# sourceMappingURL=banner-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BannerManagementComponent, { className: "BannerManagementComponent" });
})();
export {
  BannerManagementComponent
};
//# sourceMappingURL=chunk-ZLMZ5TAZ.js.map
