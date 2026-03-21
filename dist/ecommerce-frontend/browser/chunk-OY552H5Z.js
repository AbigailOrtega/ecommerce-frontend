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
  MatPaginator,
  MatPaginatorModule
} from "./chunk-UE3BHG3N.js";
import "./chunk-JITF7FU4.js";
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
  MatLabel
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
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
  __spreadProps,
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
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-N3527UH3.js";

// src/app/features/admin/product-management/product-management.component.ts
var _c0 = ["colorFileInput"];
var _forTrack0 = ($index, $item) => $item.id;
var _c1 = () => ({ standalone: true });
function ProductManagementComponent_Conditional_10_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 8)(1, "mat-label");
    \u0275\u0275text(2, "Stock");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 27);
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_10_For_36_For_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Principal");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_10_For_36_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275element(1, "img", 40);
    \u0275\u0275template(2, ProductManagementComponent_Conditional_10_For_36_For_8_Conditional_2_Template, 2, 0, "span", 41);
    \u0275\u0275elementStart(3, "button", 42);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_For_36_For_8_Template_button_click_3_listener() {
      const \u0275$index_99_r7 = \u0275\u0275restoreView(_r6).$index;
      const \u0275$index_85_r5 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeColorImage(\u0275$index_85_r5, \u0275$index_99_r7));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const img_r8 = ctx.$implicit;
    const \u0275$index_99_r7 = ctx.$index;
    \u0275\u0275advance();
    \u0275\u0275property("src", img_r8, \u0275\u0275sanitizeUrl)("alt", "Image " + (\u0275$index_99_r7 + 1));
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_99_r7 === 0 ? 2 : -1);
  }
}
function ProductManagementComponent_Conditional_10_For_36_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 44);
  }
}
function ProductManagementComponent_Conditional_10_For_36_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "add_photo_alternate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Agregar foto");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_10_For_36_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_For_36_Conditional_9_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const \u0275$index_85_r5 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.triggerColorImageUpload(\u0275$index_85_r5));
    });
    \u0275\u0275template(1, ProductManagementComponent_Conditional_10_For_36_Conditional_9_Conditional_1_Template, 1, 0, "mat-spinner", 44)(2, ProductManagementComponent_Conditional_10_For_36_Conditional_9_Conditional_2_Template, 4, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ce_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(ce_r4.uploading ? 1 : 2);
  }
}
function ProductManagementComponent_Conditional_10_For_36_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function ProductManagementComponent_Conditional_10_For_36_For_15_Template_input_ngModelChange_1_listener($event) {
      const se_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(se_r11.name, $event) || (se_r11.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "input", 46);
    \u0275\u0275twoWayListener("ngModelChange", function ProductManagementComponent_Conditional_10_For_36_For_15_Template_input_ngModelChange_2_listener($event) {
      const se_r11 = \u0275\u0275restoreView(_r10).$implicit;
      \u0275\u0275twoWayBindingSet(se_r11.stock, $event) || (se_r11.stock = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 47);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_For_36_For_15_Template_button_click_3_listener() {
      const \u0275$index_133_r12 = \u0275\u0275restoreView(_r10).$index;
      const \u0275$index_85_r5 = \u0275\u0275nextContext().$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeSize(\u0275$index_85_r5, \u0275$index_133_r12));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const se_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", se_r11.name);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", se_r11.stock);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c1));
  }
}
function ProductManagementComponent_Conditional_10_For_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 28)(2, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function ProductManagementComponent_Conditional_10_For_36_Template_input_ngModelChange_2_listener($event) {
      const ce_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(ce_r4.name, $event) || (ce_r4.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 30);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_For_36_Template_button_click_3_listener() {
      const \u0275$index_85_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.removeColor(\u0275$index_85_r5));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 31);
    \u0275\u0275repeaterCreate(7, ProductManagementComponent_Conditional_10_For_36_For_8_Template, 6, 3, "div", 32, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(9, ProductManagementComponent_Conditional_10_For_36_Conditional_9_Template, 3, 1, "div", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 34)(11, "span", 35);
    \u0275\u0275text(12, "Tallas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 36);
    \u0275\u0275repeaterCreate(14, ProductManagementComponent_Conditional_10_For_36_For_15_Template, 6, 6, "div", 37, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementStart(16, "div", 38)(17, "input", 39);
    \u0275\u0275twoWayListener("ngModelChange", function ProductManagementComponent_Conditional_10_For_36_Template_input_ngModelChange_17_listener($event) {
      const ce_r4 = \u0275\u0275restoreView(_r3).$implicit;
      \u0275\u0275twoWayBindingSet(ce_r4.newSizeName, $event) || (ce_r4.newSizeName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("keydown.enter", function ProductManagementComponent_Conditional_10_For_36_Template_input_keydown_enter_17_listener($event) {
      const \u0275$index_85_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      $event.preventDefault();
      return \u0275\u0275resetView(ctx_r1.addSize(\u0275$index_85_r5));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "button", 18);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_For_36_Template_button_click_18_listener() {
      const \u0275$index_85_r5 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.addSize(\u0275$index_85_r5));
    });
    \u0275\u0275text(19, "Agregar");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ce_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ce_r4.name);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c1));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ce_r4.images);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ce_r4.images.length < ctx_r1.maxColorImages ? 9 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ce_r4.sizes);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ce_r4.newSizeName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c1));
  }
}
function ProductManagementComponent_Conditional_10_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const cat_r13 = ctx.$implicit;
    \u0275\u0275property("value", cat_r13.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(cat_r13.name);
  }
}
function ProductManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 5)(1, "h2");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 6);
    \u0275\u0275listener("ngSubmit", function ProductManagementComponent_Conditional_10_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveProduct());
    });
    \u0275\u0275elementStart(4, "div", 7)(5, "mat-form-field", 8)(6, "mat-label");
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 8)(10, "mat-label");
    \u0275\u0275text(11, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 11)(14, "mat-label");
    \u0275\u0275text(15, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "textarea", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 7)(18, "mat-form-field", 8)(19, "mat-label");
    \u0275\u0275text(20, "Precio");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 8)(23, "mat-label");
    \u0275\u0275text(24, "Precio comparativo");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ProductManagementComponent_Conditional_10_Conditional_26_Template, 4, 0, "mat-form-field", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 15)(28, "div", 16)(29, "label", 17);
    \u0275\u0275text(30, "Colores e im\xE1genes (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "button", 18);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_10_Template_button_click_31_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.addColor());
    });
    \u0275\u0275elementStart(32, "mat-icon");
    \u0275\u0275text(33, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(34, " Agregar color ");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(35, ProductManagementComponent_Conditional_10_For_36_Template, 20, 7, "div", 19, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "input", 20, 0);
    \u0275\u0275listener("change", function ProductManagementComponent_Conditional_10_Template_input_change_37_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onColorFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "mat-form-field", 11)(40, "mat-label");
    \u0275\u0275text(41, "Categor\xEDas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "mat-select", 21);
    \u0275\u0275repeaterCreate(43, ProductManagementComponent_Conditional_10_For_44_Template, 2, 2, "mat-option", 22, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 23)(46, "mat-slide-toggle", 24);
    \u0275\u0275text(47, "Destacado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "mat-slide-toggle", 25);
    \u0275\u0275text(49, "Activo");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "button", 26);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.editingId ? "Editar" : "Nuevo", " Producto");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.form);
    \u0275\u0275advance(23);
    \u0275\u0275conditional(ctx_r1.colorEntries.length === 0 ? 26 : -1);
    \u0275\u0275advance(9);
    \u0275\u0275repeater(ctx_r1.colorEntries);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r1.categories);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.form.invalid || ctx_r1.isAnyUploading());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId ? "Actualizar" : "Crear", " ");
  }
}
function ProductManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-loading");
  }
}
function ProductManagementComponent_Conditional_12_th_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Imagen");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "img", 62);
  }
  if (rf & 2) {
    const p_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("src", p_r15.imageUrl, \u0275\u0275sanitizeUrl)("alt", p_r15.name);
  }
}
function ProductManagementComponent_Conditional_12_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61);
    \u0275\u0275template(1, ProductManagementComponent_Conditional_12_td_3_Conditional_1_Template, 1, 2, "img", 62);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r15 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r15.imageUrl ? 1 : -1);
  }
}
function ProductManagementComponent_Conditional_12_th_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Nombre");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r16 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r16.name);
  }
}
function ProductManagementComponent_Conditional_12_th_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Precio");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "currency");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r17 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(2, 1, p_r17.price));
  }
}
function ProductManagementComponent_Conditional_12_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Stock");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_12_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate3(" ", ctx_r1.totalColorStock(p_r18), " (", p_r18.colors.length, " color", p_r18.colors.length !== 1 ? "es" : "", ") ");
  }
}
function ProductManagementComponent_Conditional_12_td_12_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const p_r18 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", p_r18.stockQuantity, " ");
  }
}
function ProductManagementComponent_Conditional_12_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61);
    \u0275\u0275template(1, ProductManagementComponent_Conditional_12_td_12_Conditional_1_Template, 1, 3)(2, ProductManagementComponent_Conditional_12_td_12_Conditional_2_Template, 1, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r18 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(p_r18.colors && p_r18.colors.length > 0 ? 1 : 2);
  }
}
function ProductManagementComponent_Conditional_12_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Activo");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(p_r19.active ? "S\xED" : "No");
  }
}
function ProductManagementComponent_Conditional_12_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Acciones");
    \u0275\u0275elementEnd();
  }
}
function ProductManagementComponent_Conditional_12_td_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 61)(1, "button", 63);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_12_td_18_Template_button_click_1_listener() {
      const p_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editProduct(p_r21));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 64);
    \u0275\u0275listener("click", function ProductManagementComponent_Conditional_12_td_18_Template_button_click_4_listener() {
      const p_r21 = \u0275\u0275restoreView(_r20).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteProduct(p_r21.id));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function ProductManagementComponent_Conditional_12_tr_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function ProductManagementComponent_Conditional_12_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 66);
  }
}
function ProductManagementComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "table", 48);
    \u0275\u0275elementContainerStart(1, 49);
    \u0275\u0275template(2, ProductManagementComponent_Conditional_12_th_2_Template, 2, 0, "th", 50)(3, ProductManagementComponent_Conditional_12_td_3_Template, 2, 1, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(4, 52);
    \u0275\u0275template(5, ProductManagementComponent_Conditional_12_th_5_Template, 2, 0, "th", 50)(6, ProductManagementComponent_Conditional_12_td_6_Template, 2, 1, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(7, 53);
    \u0275\u0275template(8, ProductManagementComponent_Conditional_12_th_8_Template, 2, 0, "th", 50)(9, ProductManagementComponent_Conditional_12_td_9_Template, 3, 3, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(10, 54);
    \u0275\u0275template(11, ProductManagementComponent_Conditional_12_th_11_Template, 2, 0, "th", 50)(12, ProductManagementComponent_Conditional_12_td_12_Template, 3, 1, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 55);
    \u0275\u0275template(14, ProductManagementComponent_Conditional_12_th_14_Template, 2, 0, "th", 50)(15, ProductManagementComponent_Conditional_12_td_15_Template, 2, 1, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 56);
    \u0275\u0275template(17, ProductManagementComponent_Conditional_12_th_17_Template, 2, 0, "th", 50)(18, ProductManagementComponent_Conditional_12_td_18_Template, 7, 0, "td", 51);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(19, ProductManagementComponent_Conditional_12_tr_19_Template, 1, 0, "tr", 57)(20, ProductManagementComponent_Conditional_12_tr_20_Template, 1, 0, "tr", 58);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "mat-paginator", 59);
    \u0275\u0275listener("page", function ProductManagementComponent_Conditional_12_Template_mat_paginator_page_21_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onPage($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("dataSource", ctx_r1.products);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.columns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.columns);
    \u0275\u0275advance();
    \u0275\u0275property("length", ctx_r1.totalElements)("pageSize", ctx_r1.pageSize);
  }
}
var MAX_COLOR_IMAGES = 6;
var ProductManagementComponent = class _ProductManagementComponent {
  constructor(fb, adminService, productService, snackBar) {
    this.fb = fb;
    this.adminService = adminService;
    this.productService = productService;
    this.snackBar = snackBar;
    this.products = [];
    this.categories = [];
    this.loading = true;
    this.showForm = false;
    this.editingId = null;
    this.maxColorImages = MAX_COLOR_IMAGES;
    this.colorEntries = [];
    this.currentUploadColorIndex = -1;
    this.columns = ["image", "name", "price", "stock", "active", "actions"];
    this.totalElements = 0;
    this.pageSize = 20;
    this.currentPage = 0;
    this.form = this.fb.group({
      name: ["", Validators.required],
      description: [""],
      price: [0, [Validators.required, Validators.min(0.01)]],
      compareAtPrice: [null],
      sku: [""],
      stockQuantity: [0],
      categoryIds: [[]],
      featured: [false],
      active: [true]
    });
  }
  ngOnInit() {
    this.loadProducts();
    this.productService.getCategories().subscribe((res) => this.categories = res.data);
  }
  loadProducts() {
    this.loading = true;
    this.adminService.getAllProducts(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.products = res.data.content;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  resetForm() {
    this.editingId = null;
    this.colorEntries = [];
    this.form.reset({ price: 0, stockQuantity: 0, featured: false, active: true, categoryIds: [] });
  }
  editProduct(product) {
    this.editingId = product.id;
    this.showForm = true;
    this.colorEntries = (product.colors || []).map((c) => ({
      name: c.name,
      images: [...c.images],
      sizes: c.sizes.map((s) => ({ name: s.name, stock: s.stock })),
      newSizeName: "",
      uploading: false
    }));
    this.form.patchValue({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      categoryIds: product.categories?.map((c) => c.id) || [],
      featured: product.featured,
      active: product.active
    });
  }
  // Colors
  addColor() {
    this.colorEntries = [...this.colorEntries, { name: "", images: [], sizes: [], newSizeName: "", uploading: false }];
  }
  removeColor(index) {
    this.colorEntries = this.colorEntries.filter((_, i) => i !== index);
  }
  // Sizes per color
  addSize(colorIndex) {
    const ce = this.colorEntries[colorIndex];
    const name = ce.newSizeName.trim();
    if (!name)
      return;
    ce.sizes = [...ce.sizes, { name, stock: 0 }];
    ce.newSizeName = "";
  }
  removeSize(colorIndex, sizeIndex) {
    const ce = this.colorEntries[colorIndex];
    ce.sizes = ce.sizes.filter((_, i) => i !== sizeIndex);
  }
  // Images per color
  triggerColorImageUpload(colorIndex) {
    this.currentUploadColorIndex = colorIndex;
    this.colorFileInputRef.nativeElement.value = "";
    this.colorFileInputRef.nativeElement.click();
  }
  onColorFileSelected(event) {
    const input = event.target;
    if (!input.files?.length)
      return;
    const ci = this.currentUploadColorIndex;
    if (ci < 0 || ci >= this.colorEntries.length)
      return;
    const ce = this.colorEntries[ci];
    if (ce.images.length >= MAX_COLOR_IMAGES) {
      this.snackBar.open(`M\xE1ximo ${MAX_COLOR_IMAGES} im\xE1genes por color`, "Cerrar", { duration: 3e3 });
      return;
    }
    const file = input.files[0];
    ce.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        ce.images = [...ce.images, res.data.url];
        ce.uploading = false;
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || "Error al subir imagen", "Cerrar", { duration: 3e3 });
        ce.uploading = false;
      }
    });
  }
  removeColorImage(colorIndex, imageIndex) {
    const ce = this.colorEntries[colorIndex];
    ce.images = ce.images.filter((_, i) => i !== imageIndex);
  }
  isAnyUploading() {
    return this.colorEntries.some((ce) => ce.uploading);
  }
  totalColorStock(product) {
    return (product.colors || []).reduce((sum, c) => sum + c.sizes.reduce((s2, sz) => s2 + sz.stock, 0), 0);
  }
  saveProduct() {
    if (this.form.invalid)
      return;
    const colors = this.colorEntries.filter((ce) => ce.name.trim()).map((ce) => ({
      name: ce.name.trim(),
      images: ce.images,
      sizes: ce.sizes.filter((s) => s.name.trim()).map((s) => ({ name: s.name.trim(), stock: s.stock }))
    }));
    const firstImage = this.colorEntries[0]?.images[0] || null;
    const payload = __spreadProps(__spreadValues({}, this.form.value), {
      images: this.colorEntries[0]?.images || [],
      imageUrl: firstImage,
      colors
    });
    const obs = this.editingId ? this.productService.updateProduct(this.editingId, payload) : this.productService.createProduct(payload);
    obs.subscribe({
      next: () => {
        this.snackBar.open(`Product ${this.editingId ? "updated" : "created"}`, "Cerrar", { duration: 3e3 });
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error saving product", "Cerrar", { duration: 3e3 })
    });
  }
  deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?"))
      return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open("Product deleted", "Cerrar", { duration: 3e3 });
        this.loadProducts();
      },
      error: () => this.snackBar.open("Error deleting product", "Cerrar", { duration: 3e3 })
    });
  }
  onPage(event) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }
  static {
    this.\u0275fac = function ProductManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductManagementComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(ProductService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductManagementComponent, selectors: [["app-product-management"]], viewQuery: function ProductManagementComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.colorFileInputRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 3, consts: [["colorFileInput", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "name"], ["matInput", "", "formControlName", "sku"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "description", "rows", "3"], ["matInput", "", "formControlName", "price", "type", "number"], ["matInput", "", "formControlName", "compareAtPrice", "type", "number"], [1, "colors-section"], [1, "section-header"], [1, "section-label"], ["type", "button", "mat-stroked-button", "", 3, "click"], [1, "color-card"], ["type", "file", "accept", "image/*", "hidden", "", 3, "change"], ["formControlName", "categoryIds", "multiple", ""], [3, "value"], [1, "toggles"], ["formControlName", "featured"], ["formControlName", "active"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["matInput", "", "formControlName", "stockQuantity", "type", "number"], [1, "color-card-header"], ["placeholder", "Nombre del color (ej. Rojo, Azul...)", 1, "color-name-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", "mat-icon-button", "", "color", "warn", 3, "click"], [1, "images-grid"], [1, "image-slot", "filled"], [1, "image-slot", "empty"], [1, "sizes-section"], [1, "sizes-label"], [1, "sizes-list"], [1, "size-row"], [1, "add-size-row"], ["placeholder", "Agregar talla... ", 1, "size-name-input", 3, "ngModelChange", "keydown.enter", "ngModel", "ngModelOptions"], [1, "slot-img", 3, "src", "alt"], [1, "main-badge"], ["type", "button", "mat-icon-button", "", 1, "slot-delete", 3, "click"], [1, "image-slot", "empty", 3, "click"], ["diameter", "28"], ["placeholder", "Talla", 1, "size-name-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "placeholder", "Stock", 1, "size-stock-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", "mat-icon-button", "", 3, "click"], ["mat-table", "", 1, "product-table", 3, "dataSource"], ["matColumnDef", "image"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "price"], ["matColumnDef", "stock"], ["matColumnDef", "active"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "page", "length", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "table-thumb", 3, "src", "alt"], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function ProductManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Gesti\xF3n de Productos");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "button", 4);
        \u0275\u0275listener("click", function ProductManagementComponent_Template_button_click_6_listener() {
          ctx.showForm = !ctx.showForm;
          return ctx.resetForm();
        });
        \u0275\u0275elementStart(7, "mat-icon");
        \u0275\u0275text(8, "add");
        \u0275\u0275elementEnd();
        \u0275\u0275text(9);
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, ProductManagementComponent_Conditional_10_Template, 52, 5, "mat-card", 5)(11, ProductManagementComponent_Conditional_11_Template, 1, 0, "app-loading")(12, ProductManagementComponent_Conditional_12_Template, 22, 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275textInterpolate1(" ", ctx.showForm ? "Cancelar" : "Agregar Producto", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 11 : 12);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName, RouterLink, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatPaginatorModule, MatPaginator, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatSlideToggleModule, MatSlideToggle, MatCardModule, MatCard, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner, CurrencyPipe, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin: 16px 0;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toggles[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin: 16px 0;\n}\n.product-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.table-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  display: block;\n}\n.colors-section[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.color-card[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n  background: #fafafa;\n}\n.color-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.color-name-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 8px 12px;\n  font-size: 14px;\n  outline: none;\n}\n.color-name-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--theme-primary);\n}\n.images-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.image-slot[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border-radius: 8px;\n  overflow: hidden;\n  position: relative;\n}\n.image-slot.filled[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n}\n.image-slot.empty[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  cursor: pointer;\n  color: #999;\n  font-size: 11px;\n}\n.image-slot.empty[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n  color: var(--theme-primary);\n}\n.slot-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.main-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  background: var(--theme-primary);\n  color: white;\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.slot-delete[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 28px;\n  height: 28px;\n  background: rgba(0, 0, 0, 0.5) !important;\n  color: white !important;\n}\n.slot-delete[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n}\n.sizes-section[_ngcontent-%COMP%] {\n  border-top: 1px solid #eee;\n  padding-top: 12px;\n}\n.sizes-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n}\n.sizes-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.size-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.add-size-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 4px;\n}\n.size-name-input[_ngcontent-%COMP%] {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 6px 10px;\n  font-size: 13px;\n  outline: none;\n  width: 120px;\n}\n.size-name-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--theme-primary);\n}\n.size-stock-input[_ngcontent-%COMP%] {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 6px 10px;\n  font-size: 13px;\n  outline: none;\n  width: 80px;\n  text-align: center;\n}\n.size-stock-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--theme-primary);\n}\n/*# sourceMappingURL=product-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductManagementComponent, { className: "ProductManagementComponent" });
})();
export {
  ProductManagementComponent
};
//# sourceMappingURL=chunk-OY552H5Z.js.map
