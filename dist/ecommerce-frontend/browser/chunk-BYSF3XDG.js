import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  DEFAULT_THEME_KEY,
  THEMES,
  ThemeService
} from "./chunk-T3IDVL5T.js";
import {
  StoreInfoService
} from "./chunk-CBRWNEVA.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-JITF7FU4.js";
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
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-WL5UKMCF.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgModel
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
  __spreadProps,
  __spreadValues,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
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
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-N3527UH3.js";

// src/app/features/admin/store-info/store-info.component.ts
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function StoreInfoComponent_For_61_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 34);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_For_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function StoreInfoComponent_For_61_Template_button_click_0_listener() {
      const entry_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.selectTheme(entry_r3.key));
    });
    \u0275\u0275template(1, StoreInfoComponent_For_61_Conditional_1_Template, 2, 0, "mat-icon", 34);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("background", entry_r3.primary);
    \u0275\u0275classProp("selected", ctx_r3.selectedTheme === entry_r3.key);
    \u0275\u0275property("matTooltip", entry_r3.label);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.selectedTheme === entry_r3.key ? 1 : -1);
  }
}
function StoreInfoComponent_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275element(1, "img", 35);
    \u0275\u0275elementStart(2, "button", 36);
    \u0275\u0275listener("click", function StoreInfoComponent_Conditional_68_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.removeLogo());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r3.logoPreview, \u0275\u0275sanitizeUrl);
  }
}
function StoreInfoComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "Sin logo. Se mostrar\xE1 en la barra de navegaci\xF3n.");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_Conditional_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 26);
  }
}
function StoreInfoComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "upload");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_Conditional_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 26);
  }
}
function StoreInfoComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "upload");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_Conditional_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 24);
    \u0275\u0275text(1, "No hay im\xE1genes. Sube la primera para el carrusel.");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_Conditional_89_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37);
    \u0275\u0275element(1, "img", 38);
    \u0275\u0275elementStart(2, "div", 39)(3, "button", 40);
    \u0275\u0275listener("click", function StoreInfoComponent_Conditional_89_For_2_Template_button_click_3_listener() {
      const \u0275$index_179_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.moveUp(\u0275$index_179_r9));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "arrow_upward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "button", 41);
    \u0275\u0275listener("click", function StoreInfoComponent_Conditional_89_For_2_Template_button_click_6_listener() {
      const \u0275$index_179_r9 = \u0275\u0275restoreView(_r8).$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.moveDown(\u0275$index_179_r9));
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "arrow_downward");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 42);
    \u0275\u0275listener("click", function StoreInfoComponent_Conditional_89_For_2_Template_button_click_9_listener() {
      const img_r10 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeImage(img_r10.id));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const img_r10 = ctx.$implicit;
    const \u0275$index_179_r9 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r10.url, \u0275\u0275sanitizeUrl)("alt", "Imagen " + (\u0275$index_179_r9 + 1));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", \u0275$index_179_r9 === 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("disabled", \u0275$index_179_r9 === ctx_r3.images.length - 1);
  }
}
function StoreInfoComponent_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275repeaterCreate(1, StoreInfoComponent_Conditional_89_For_2_Template, 12, 4, "div", 37, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r3.images);
  }
}
function StoreInfoComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 26);
  }
}
function StoreInfoComponent_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function StoreInfoComponent_Conditional_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 32)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Guardado correctamente");
    \u0275\u0275elementEnd();
  }
}
var StoreInfoComponent = class _StoreInfoComponent {
  constructor(storeInfoService, adminService, themeService) {
    this.storeInfoService = storeInfoService;
    this.adminService = adminService;
    this.themeService = themeService;
    this.form = {};
    this.images = [];
    this.saving = false;
    this.saveSuccess = false;
    this.uploading = false;
    this.logoPreview = null;
    this.uploadingLogo = false;
    this.selectedTheme = DEFAULT_THEME_KEY;
    this.themeEntries = Object.entries(THEMES).map(([key, val]) => ({ key, label: val.label, primary: val.primary }));
  }
  ngOnInit() {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => {
        const d = res.data;
        this.form = { name: d.name, aboutText: d.aboutText, mission: d.mission, vision: d.vision, phone: d.phone, instagramUrl: d.instagramUrl, facebookUrl: d.facebookUrl };
        this.images = d.images ?? [];
        this.logoPreview = d.logoUrl ?? null;
        if (d.themeKey)
          this.selectedTheme = d.themeKey;
      }
    });
  }
  selectTheme(key) {
    this.selectedTheme = key;
    this.themeService.apply(key);
  }
  saveAll() {
    this.saving = true;
    this.saveSuccess = false;
    this.storeInfoService.update(__spreadProps(__spreadValues({}, this.form), {
      themeKey: this.selectedTheme
    })).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3e3);
      },
      error: () => {
        this.saving = false;
      }
    });
  }
  onLogoChange(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file)
      return;
    this.uploadingLogo = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        const url = res.data.url;
        this.storeInfoService.update({ logoUrl: url }).subscribe({
          next: () => {
            this.logoPreview = url;
            this.uploadingLogo = false;
          },
          error: () => {
            this.uploadingLogo = false;
          }
        });
      },
      error: () => {
        this.uploadingLogo = false;
      }
    });
    input.value = "";
  }
  removeLogo() {
    this.storeInfoService.update({ logoUrl: "" }).subscribe({
      next: () => {
        this.logoPreview = null;
      }
    });
  }
  onFileChange(event) {
    const input = event.target;
    const file = input.files?.[0];
    if (!file)
      return;
    this.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        const url = res.data.url;
        this.storeInfoService.addImage(url).subscribe({
          next: (imgRes) => {
            this.images.push(imgRes.data);
            this.uploading = false;
          },
          error: () => {
            this.uploading = false;
          }
        });
      },
      error: () => {
        this.uploading = false;
      }
    });
    input.value = "";
  }
  removeImage(id) {
    this.storeInfoService.deleteImage(id).subscribe({
      next: () => {
        this.images = this.images.filter((img) => img.id !== id);
      }
    });
  }
  moveUp(index) {
    if (index === 0)
      return;
    [this.images[index - 1], this.images[index]] = [this.images[index], this.images[index - 1]];
    this.sendReorder();
  }
  moveDown(index) {
    if (index === this.images.length - 1)
      return;
    [this.images[index], this.images[index + 1]] = [this.images[index + 1], this.images[index]];
    this.sendReorder();
  }
  sendReorder() {
    const ids = this.images.map((img) => img.id);
    this.storeInfoService.reorder(ids).subscribe();
  }
  static {
    this.\u0275fac = function StoreInfoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StoreInfoComponent)(\u0275\u0275directiveInject(StoreInfoService), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(ThemeService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StoreInfoComponent, selectors: [["app-admin-store-info"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 96, vars: 17, consts: [["logoInput", ""], ["fileInput", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "section-card"], [1, "form-grid"], ["appearance", "outline"], ["matInput", "", "placeholder", "Ej. Mi Tienda", 3, "ngModelChange", "ngModel"], ["matInput", "", "placeholder", "+52 55 1234 5678", 3, "ngModelChange", "ngModel"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "rows", "4", "placeholder", "Cu\xE9ntanos sobre tu tienda...", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "3", "placeholder", "\xBFCu\xE1l es la misi\xF3n de tu tienda?", 3, "ngModelChange", "ngModel"], ["matInput", "", "rows", "3", "placeholder", "\xBFCu\xE1l es la visi\xF3n de tu tienda?", 3, "ngModelChange", "ngModel"], [1, "social-hint"], ["matPrefix", "", 1, "social-prefix", "instagram-icon"], ["matInput", "", "placeholder", "https://instagram.com/tutienda", 3, "ngModelChange", "ngModel"], ["matPrefix", "", 1, "social-prefix", "facebook-icon"], ["matInput", "", "placeholder", "https://facebook.com/tutienda", 3, "ngModelChange", "ngModel"], [1, "theme-hint"], [1, "theme-swatches"], [1, "swatch-btn", 3, "background", "selected", "matTooltip"], [1, "logo-section"], [1, "logo-preview"], [1, "empty-msg"], ["mat-raised-button", "", "color", "accent", 3, "click", "disabled"], ["diameter", "20"], ["type", "file", "accept", "image/*", "hidden", "", 3, "change"], [1, "upload-row"], [1, "image-grid"], [1, "save-row"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "success-msg"], [1, "swatch-btn", 3, "click", "matTooltip"], [2, "color", "white", "font-size", "18px", "line-height", "18px"], ["alt", "Logo", 3, "src"], ["mat-icon-button", "", "color", "warn", "title", "Eliminar logo", 3, "click"], [1, "image-item"], [3, "src", "alt"], [1, "image-actions"], ["mat-icon-button", "", "title", "Subir", 3, "click", "disabled"], ["mat-icon-button", "", "title", "Bajar", 3, "click", "disabled"], ["mat-icon-button", "", "color", "warn", "title", "Eliminar", 3, "click"]], template: function StoreInfoComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "h1");
        \u0275\u0275text(3, "Informaci\xF3n General");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 4);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-card", 5)(7, "mat-card-header")(8, "mat-card-title");
        \u0275\u0275text(9, "Datos de la tienda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "mat-card-content")(11, "div", 6)(12, "mat-form-field", 7)(13, "mat-label");
        \u0275\u0275text(14, "Nombre de la tienda");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "input", 8);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_input_ngModelChange_15_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.name, $event) || (ctx.form.name = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(16, "mat-form-field", 7)(17, "mat-label");
        \u0275\u0275text(18, "Tel\xE9fono");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "input", 9);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_input_ngModelChange_19_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.phone, $event) || (ctx.form.phone = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "mat-form-field", 10)(21, "mat-label");
        \u0275\u0275text(22, "Descripci\xF3n (Sobre nosotros)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "textarea", 11);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_textarea_ngModelChange_23_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.aboutText, $event) || (ctx.form.aboutText = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(24, "mat-form-field", 7)(25, "mat-label");
        \u0275\u0275text(26, "Misi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "textarea", 12);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_textarea_ngModelChange_27_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.mission, $event) || (ctx.form.mission = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "mat-form-field", 7)(29, "mat-label");
        \u0275\u0275text(30, "Visi\xF3n");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "textarea", 13);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_textarea_ngModelChange_31_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.vision, $event) || (ctx.form.vision = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(32, "mat-card", 5)(33, "mat-card-header")(34, "mat-card-title");
        \u0275\u0275text(35, "Redes sociales");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(36, "mat-card-content")(37, "p", 14);
        \u0275\u0275text(38, "Solo se mostrar\xE1n las redes que tengan URL configurada.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "div", 6)(40, "mat-form-field", 7)(41, "mat-label");
        \u0275\u0275text(42, "Instagram");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "mat-icon", 15);
        \u0275\u0275text(44, "photo_camera");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_input_ngModelChange_45_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.instagramUrl, $event) || (ctx.form.instagramUrl = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(46, "mat-form-field", 7)(47, "mat-label");
        \u0275\u0275text(48, "Facebook");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "mat-icon", 17);
        \u0275\u0275text(50, "facebook");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "input", 18);
        \u0275\u0275twoWayListener("ngModelChange", function StoreInfoComponent_Template_input_ngModelChange_51_listener($event) {
          \u0275\u0275restoreView(_r1);
          \u0275\u0275twoWayBindingSet(ctx.form.facebookUrl, $event) || (ctx.form.facebookUrl = $event);
          return \u0275\u0275resetView($event);
        });
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275elementStart(52, "mat-card", 5)(53, "mat-card-header")(54, "mat-card-title");
        \u0275\u0275text(55, "Color de la tienda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "mat-card-content")(57, "p", 19);
        \u0275\u0275text(58, "Elige la paleta de colores principal del sitio.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(59, "div", 20);
        \u0275\u0275repeaterCreate(60, StoreInfoComponent_For_61_Template, 2, 6, "button", 21, _forTrack0);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(62, "mat-card", 5)(63, "mat-card-header")(64, "mat-card-title");
        \u0275\u0275text(65, "Logo de la tienda");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(66, "mat-card-content")(67, "div", 22);
        \u0275\u0275template(68, StoreInfoComponent_Conditional_68_Template, 5, 1, "div", 23)(69, StoreInfoComponent_Conditional_69_Template, 2, 0, "p", 24);
        \u0275\u0275elementStart(70, "button", 25);
        \u0275\u0275listener("click", function StoreInfoComponent_Template_button_click_70_listener() {
          \u0275\u0275restoreView(_r1);
          const logoInput_r6 = \u0275\u0275reference(75);
          return \u0275\u0275resetView(logoInput_r6.click());
        });
        \u0275\u0275template(71, StoreInfoComponent_Conditional_71_Template, 1, 0, "mat-spinner", 26)(72, StoreInfoComponent_Conditional_72_Template, 2, 0, "mat-icon");
        \u0275\u0275text(73);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(74, "input", 27, 0);
        \u0275\u0275listener("change", function StoreInfoComponent_Template_input_change_74_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onLogoChange($event));
        });
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(76, "mat-card", 5)(77, "mat-card-header")(78, "mat-card-title");
        \u0275\u0275text(79, "Im\xE1genes del carrusel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(80, "mat-card-content")(81, "div", 28)(82, "button", 25);
        \u0275\u0275listener("click", function StoreInfoComponent_Template_button_click_82_listener() {
          \u0275\u0275restoreView(_r1);
          const fileInput_r7 = \u0275\u0275reference(87);
          return \u0275\u0275resetView(fileInput_r7.click());
        });
        \u0275\u0275template(83, StoreInfoComponent_Conditional_83_Template, 1, 0, "mat-spinner", 26)(84, StoreInfoComponent_Conditional_84_Template, 2, 0, "mat-icon");
        \u0275\u0275text(85, " Subir imagen ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(86, "input", 27, 1);
        \u0275\u0275listener("change", function StoreInfoComponent_Template_input_change_86_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.onFileChange($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275template(88, StoreInfoComponent_Conditional_88_Template, 2, 0, "p", 24)(89, StoreInfoComponent_Conditional_89_Template, 3, 0, "div", 29);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(90, "div", 30)(91, "button", 31);
        \u0275\u0275listener("click", function StoreInfoComponent_Template_button_click_91_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.saveAll());
        });
        \u0275\u0275template(92, StoreInfoComponent_Conditional_92_Template, 1, 0, "mat-spinner", 26)(93, StoreInfoComponent_Conditional_93_Template, 2, 0, "mat-icon");
        \u0275\u0275text(94, " Guardar cambios ");
        \u0275\u0275elementEnd();
        \u0275\u0275template(95, StoreInfoComponent_Conditional_95_Template, 4, 0, "span", 32);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(15);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.name);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.phone);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.aboutText);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.mission);
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.vision);
        \u0275\u0275advance(14);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.instagramUrl);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.form.facebookUrl);
        \u0275\u0275advance(9);
        \u0275\u0275repeater(ctx.themeEntries);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(ctx.logoPreview ? 68 : 69);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.uploadingLogo);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.uploadingLogo ? 71 : 72);
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1(" ", ctx.logoPreview ? "Cambiar logo" : "Subir logo", " ");
        \u0275\u0275advance(9);
        \u0275\u0275property("disabled", ctx.uploading);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.uploading ? 83 : 84);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.images.length === 0 ? 88 : 89);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", ctx.saving);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.saving ? 92 : 93);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.saveSuccess ? 95 : -1);
      }
    }, dependencies: [FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatInputModule, MatInput, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip, RouterLink], styles: ["\n\n.container[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  padding: 24px 16px;\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n.header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.section-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.form-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 16px;\n  padding-top: 16px;\n}\n.full-width[_ngcontent-%COMP%] {\n  grid-column: 1 / -1;\n}\n.save-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 8px 0 32px;\n}\n.success-msg[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: #4caf50;\n  font-weight: 500;\n}\n.success-msg[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.logo-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding-top: 8px;\n  flex-wrap: wrap;\n}\n.logo-preview[_ngcontent-%COMP%] {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n}\n.logo-preview[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  height: 64px;\n  max-width: 200px;\n  object-fit: contain;\n  border: 1px solid #e0e0e0;\n  border-radius: 6px;\n  padding: 4px;\n}\n.upload-row[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  padding-top: 8px;\n}\n.empty-msg[_ngcontent-%COMP%] {\n  color: #999;\n  font-style: italic;\n}\n.image-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 16px;\n}\n.image-item[_ngcontent-%COMP%] {\n  position: relative;\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n}\n.image-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 130px;\n  object-fit: cover;\n  display: block;\n}\n.image-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 4px;\n  padding: 4px;\n  background: rgba(255, 255, 255, 0.95);\n}\n.theme-hint[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 8px 0 16px;\n}\n.theme-swatches[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  padding-top: 4px;\n}\n.swatch-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  border: 3px solid transparent;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform 0.15s, border-color 0.15s;\n}\n.swatch-btn[_ngcontent-%COMP%]:hover {\n  transform: scale(1.12);\n}\n.swatch-btn.selected[_ngcontent-%COMP%] {\n  border-color: rgba(0, 0, 0, 0.35);\n  transform: scale(1.12);\n}\n.social-hint[_ngcontent-%COMP%] {\n  color: #666;\n  font-size: 0.9rem;\n  margin: 8px 0 16px;\n}\n.social-prefix[_ngcontent-%COMP%] {\n  margin-right: 4px;\n  font-size: 20px;\n}\n.instagram-icon[_ngcontent-%COMP%] {\n  color: #E1306C;\n}\n.facebook-icon[_ngcontent-%COMP%] {\n  color: #1877F2;\n}\n@media (max-width: 600px) {\n  .form-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n/*# sourceMappingURL=store-info.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StoreInfoComponent, { className: "StoreInfoComponent" });
})();
export {
  StoreInfoComponent
};
//# sourceMappingURL=chunk-BYSF3XDG.js.map
