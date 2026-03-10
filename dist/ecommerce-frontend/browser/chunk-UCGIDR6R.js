import {
  AdminService
} from "./chunk-CZXKLA4A.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-IBRNATXH.js";
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
  MatSelect,
  MatSelectModule
} from "./chunk-ZSXSKPBP.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-6VTQI43K.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-7VTKONPA.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-JDEIMQFJ.js";
import {
  CheckboxRequiredValidator,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControlStatus,
  NgControlStatusGroup,
  NgModel,
  NumberValueAccessor,
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
  FocusMonitor,
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  MatOption,
  MatRipple,
  RouterLink,
  _MatInternalFormField
} from "./chunk-7NMHCVKZ.js";
import "./chunk-2SZ2QW3D.js";
import {
  ANIMATION_MODULE_TYPE,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  CurrencyPipe,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation$1,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  forwardRef,
  numberAttribute,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
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
} from "./chunk-RP6JOKCW.js";

// node_modules/@angular/material/fesm2022/slide-toggle.mjs
var _c0 = ["switch"];
var _c1 = ["*"];
function MatSlideToggle_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12);
    \u0275\u0275element(2, "path", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "svg", 14);
    \u0275\u0275element(4, "path", 15);
    \u0275\u0275elementEnd()();
  }
}
var MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("mat-slide-toggle-default-options", {
  providedIn: "root",
  factory: () => ({
    disableToggleValue: false,
    hideIcon: false,
    disabledInteractive: false
  })
});
var MAT_SLIDE_TOGGLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatSlideToggle),
  multi: true
};
var MatSlideToggleChange = class {
  constructor(source, checked) {
    this.source = source;
    this.checked = checked;
  }
};
var nextUniqueId = 0;
var MatSlideToggle = class _MatSlideToggle {
  _createChangeEvent(isChecked) {
    return new MatSlideToggleChange(this, isChecked);
  }
  /** Returns the unique id for the visual hidden button. */
  get buttonId() {
    return `${this.id || this._uniqueId}-button`;
  }
  /** Focuses the slide-toggle. */
  focus() {
    this._switchElement.nativeElement.focus();
  }
  /** Whether the slide-toggle element is checked or not. */
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = value;
    this._changeDetectorRef.markForCheck();
  }
  /** Returns the unique id for the visual hidden input. */
  get inputId() {
    return `${this.id || this._uniqueId}-input`;
  }
  constructor(_elementRef, _focusMonitor, _changeDetectorRef, tabIndex, defaults, animationMode) {
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._changeDetectorRef = _changeDetectorRef;
    this.defaults = defaults;
    this._onChange = (_) => {
    };
    this._onTouched = () => {
    };
    this._validatorOnChange = () => {
    };
    this._checked = false;
    this.name = null;
    this.labelPosition = "after";
    this.ariaLabel = null;
    this.ariaLabelledby = null;
    this.disabled = false;
    this.disableRipple = false;
    this.tabIndex = 0;
    this.change = new EventEmitter();
    this.toggleChange = new EventEmitter();
    this.tabIndex = parseInt(tabIndex) || 0;
    this.color = defaults.color || "accent";
    this._noopAnimations = animationMode === "NoopAnimations";
    this.id = this._uniqueId = `mat-mdc-slide-toggle-${++nextUniqueId}`;
    this.hideIcon = defaults.hideIcon ?? false;
    this.disabledInteractive = defaults.disabledInteractive ?? false;
    this._labelId = this._uniqueId + "-label";
  }
  ngAfterContentInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (focusOrigin === "keyboard" || focusOrigin === "program") {
        this._focused = true;
        this._changeDetectorRef.markForCheck();
      } else if (!focusOrigin) {
        Promise.resolve().then(() => {
          this._focused = false;
          this._onTouched();
          this._changeDetectorRef.markForCheck();
        });
      }
    });
  }
  ngOnChanges(changes) {
    if (changes["required"]) {
      this._validatorOnChange();
    }
  }
  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Implemented as part of ControlValueAccessor. */
  writeValue(value) {
    this.checked = !!value;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnChange(fn) {
    this._onChange = fn;
  }
  /** Implemented as part of ControlValueAccessor. */
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  /** Implemented as a part of Validator. */
  validate(control) {
    return this.required && control.value !== true ? {
      "required": true
    } : null;
  }
  /** Implemented as a part of Validator. */
  registerOnValidatorChange(fn) {
    this._validatorOnChange = fn;
  }
  /** Implemented as a part of ControlValueAccessor. */
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }
  /** Toggles the checked state of the slide-toggle. */
  toggle() {
    this.checked = !this.checked;
    this._onChange(this.checked);
  }
  /**
   * Emits a change event on the `change` output. Also notifies the FormControl about the change.
   */
  _emitChangeEvent() {
    this._onChange(this.checked);
    this.change.emit(this._createChangeEvent(this.checked));
  }
  /** Method being called whenever the underlying button is clicked. */
  _handleClick() {
    if (!this.disabled) {
      this.toggleChange.emit();
      if (!this.defaults.disableToggleValue) {
        this.checked = !this.checked;
        this._onChange(this.checked);
        this.change.emit(new MatSlideToggleChange(this, this.checked));
      }
    }
  }
  _getAriaLabelledBy() {
    if (this.ariaLabelledby) {
      return this.ariaLabelledby;
    }
    return this.ariaLabel ? null : this._labelId;
  }
  static {
    this.\u0275fac = function MatSlideToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatSlideToggle)(\u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS), \u0275\u0275directiveInject(ANIMATION_MODULE_TYPE, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatSlideToggle,
      selectors: [["mat-slide-toggle"]],
      viewQuery: function MatSlideToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._switchElement = _t.first);
        }
      },
      hostAttrs: [1, "mat-mdc-slide-toggle"],
      hostVars: 13,
      hostBindings: function MatSlideToggle_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("id", ctx.id);
          \u0275\u0275attribute("tabindex", null)("aria-label", null)("name", null)("aria-labelledby", null);
          \u0275\u0275classMap(ctx.color ? "mat-" + ctx.color : "");
          \u0275\u0275classProp("mat-mdc-slide-toggle-focused", ctx._focused)("mat-mdc-slide-toggle-checked", ctx.checked)("_mat-animation-noopable", ctx._noopAnimations);
        }
      },
      inputs: {
        name: "name",
        id: "id",
        labelPosition: "labelPosition",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        ariaDescribedby: [0, "aria-describedby", "ariaDescribedby"],
        required: [2, "required", "required", booleanAttribute],
        color: "color",
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        tabIndex: [2, "tabIndex", "tabIndex", (value) => value == null ? 0 : numberAttribute(value)],
        checked: [2, "checked", "checked", booleanAttribute],
        hideIcon: [2, "hideIcon", "hideIcon", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change",
        toggleChange: "toggleChange"
      },
      exportAs: ["matSlideToggle"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: _MatSlideToggle,
        multi: true
      }]), \u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c1,
      decls: 13,
      vars: 27,
      consts: [["switch", ""], ["mat-internal-form-field", "", 3, "labelPosition"], ["role", "switch", "type", "button", 1, "mdc-switch", 3, "click", "tabIndex", "disabled"], [1, "mdc-switch__track"], [1, "mdc-switch__handle-track"], [1, "mdc-switch__handle"], [1, "mdc-switch__shadow"], [1, "mdc-elevation-overlay"], [1, "mdc-switch__ripple"], ["mat-ripple", "", 1, "mat-mdc-slide-toggle-ripple", "mat-mdc-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleCentered"], [1, "mdc-switch__icons"], [1, "mdc-label", 3, "click", "for"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--on"], ["d", "M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"], ["viewBox", "0 0 24 24", "aria-hidden", "true", 1, "mdc-switch__icon", "mdc-switch__icon--off"], ["d", "M20 13H4v-2h16v2z"]],
      template: function MatSlideToggle_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "div", 1)(1, "button", 2, 0);
          \u0275\u0275listener("click", function MatSlideToggle_Template_button_click_1_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._handleClick());
          });
          \u0275\u0275element(3, "span", 3);
          \u0275\u0275elementStart(4, "span", 4)(5, "span", 5)(6, "span", 6);
          \u0275\u0275element(7, "span", 7);
          \u0275\u0275elementEnd();
          \u0275\u0275elementStart(8, "span", 8);
          \u0275\u0275element(9, "span", 9);
          \u0275\u0275elementEnd();
          \u0275\u0275template(10, MatSlideToggle_Conditional_10_Template, 5, 0, "span", 10);
          \u0275\u0275elementEnd()()();
          \u0275\u0275elementStart(11, "label", 11);
          \u0275\u0275listener("click", function MatSlideToggle_Template_label_click_11_listener($event) {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView($event.stopPropagation());
          });
          \u0275\u0275projection(12);
          \u0275\u0275elementEnd()();
        }
        if (rf & 2) {
          const switch_r2 = \u0275\u0275reference(2);
          \u0275\u0275property("labelPosition", ctx.labelPosition);
          \u0275\u0275advance();
          \u0275\u0275classProp("mdc-switch--selected", ctx.checked)("mdc-switch--unselected", !ctx.checked)("mdc-switch--checked", ctx.checked)("mdc-switch--disabled", ctx.disabled)("mat-mdc-slide-toggle-disabled-interactive", ctx.disabledInteractive);
          \u0275\u0275property("tabIndex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("disabled", ctx.disabled && !ctx.disabledInteractive);
          \u0275\u0275attribute("id", ctx.buttonId)("name", ctx.name)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx._getAriaLabelledBy())("aria-describedby", ctx.ariaDescribedby)("aria-required", ctx.required || null)("aria-checked", ctx.checked)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
          \u0275\u0275advance(8);
          \u0275\u0275property("matRippleTrigger", switch_r2)("matRippleDisabled", ctx.disableRipple || ctx.disabled)("matRippleCentered", true);
          \u0275\u0275advance();
          \u0275\u0275conditional(!ctx.hideIcon ? 10 : -1);
          \u0275\u0275advance();
          \u0275\u0275property("for", ctx.buttonId);
          \u0275\u0275attribute("id", ctx._labelId);
        }
      },
      dependencies: [MatRipple, _MatInternalFormField],
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mdc-switch-track-height);border-radius:var(--mdc-switch-track-shape, var(--mat-app-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color, var(--mat-app-outline))}.cdk-high-contrast-active .mdc-switch__track::before,.cdk-high-contrast-active .mdc-switch__track::after{border-color:currentColor}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-switch-selected-track-outline-width);border-color:var(--mat-switch-selected-track-outline-color)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color, var(--mat-app-on-surface))}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mdc-switch-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, var(--mat-app-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mdc-switch-selected-track-color, var(--mat-app-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, var(--mat-app-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, var(--mat-app-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, var(--mat-app-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, var(--mat-app-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mdc-switch-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mdc-switch-handle-width);height:var(--mdc-switch-handle-height);border-radius:var(--mdc-switch-handle-shape, var(--mat-app-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size);margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size);margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}.cdk-high-contrast-active .mdc-switch__handle::before,.cdk-high-contrast-active .mdc-switch__handle::after{border-color:currentColor}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mat-app-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, var(--mat-app-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, var(--mat-app-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, var(--mat-app-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, var(--mat-app-on-surface))}.mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mdc-switch-state-layer-size);height:var(--mdc-switch-state-layer-size)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-pressed-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-selected-pressed-state-layer-color, var(--mat-app-primary));opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size);fill:var(--mdc-switch-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size);fill:var(--mdc-switch-selected-icon-color, var(--mat-app-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mat-app-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-switch-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-switch-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-switch-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-switch-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-switch-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-switch-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggle, [{
    type: Component,
    args: [{
      selector: "mat-slide-toggle",
      host: {
        "class": "mat-mdc-slide-toggle",
        "[id]": "id",
        // Needs to be removed since it causes some a11y issues (see #21266).
        "[attr.tabindex]": "null",
        "[attr.aria-label]": "null",
        "[attr.name]": "null",
        "[attr.aria-labelledby]": "null",
        "[class.mat-mdc-slide-toggle-focused]": "_focused",
        "[class.mat-mdc-slide-toggle-checked]": "checked",
        "[class._mat-animation-noopable]": "_noopAnimations",
        "[class]": 'color ? "mat-" + color : ""'
      },
      exportAs: "matSlideToggle",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [MAT_SLIDE_TOGGLE_VALUE_ACCESSOR, {
        provide: NG_VALIDATORS,
        useExisting: MatSlideToggle,
        multi: true
      }],
      standalone: true,
      imports: [MatRipple, _MatInternalFormField],
      template: `<div mat-internal-form-field [labelPosition]="labelPosition">
  <button
    class="mdc-switch"
    role="switch"
    type="button"
    [class.mdc-switch--selected]="checked"
    [class.mdc-switch--unselected]="!checked"
    [class.mdc-switch--checked]="checked"
    [class.mdc-switch--disabled]="disabled"
    [class.mat-mdc-slide-toggle-disabled-interactive]="disabledInteractive"
    [tabIndex]="disabled && !disabledInteractive ? -1 : tabIndex"
    [disabled]="disabled && !disabledInteractive"
    [attr.id]="buttonId"
    [attr.name]="name"
    [attr.aria-label]="ariaLabel"
    [attr.aria-labelledby]="_getAriaLabelledBy()"
    [attr.aria-describedby]="ariaDescribedby"
    [attr.aria-required]="required || null"
    [attr.aria-checked]="checked"
    [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
    (click)="_handleClick()"
    #switch>
    <span class="mdc-switch__track"></span>
    <span class="mdc-switch__handle-track">
      <span class="mdc-switch__handle">
        <span class="mdc-switch__shadow">
          <span class="mdc-elevation-overlay"></span>
        </span>
        <span class="mdc-switch__ripple">
          <span class="mat-mdc-slide-toggle-ripple mat-mdc-focus-indicator" mat-ripple
            [matRippleTrigger]="switch"
            [matRippleDisabled]="disableRipple || disabled"
            [matRippleCentered]="true"></span>
        </span>
        @if (!hideIcon) {
          <span class="mdc-switch__icons">
            <svg
              class="mdc-switch__icon mdc-switch__icon--on"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z" />
            </svg>
            <svg
              class="mdc-switch__icon mdc-switch__icon--off"
              viewBox="0 0 24 24"
              aria-hidden="true">
              <path d="M20 13H4v-2h16v2z" />
            </svg>
          </span>
        }
      </span>
    </span>
  </button>

  <!--
    Clicking on the label will trigger another click event from the button.
    Stop propagation here so other listeners further up in the DOM don't execute twice.
  -->
  <label class="mdc-label" [for]="buttonId" [attr.id]="_labelId" (click)="$event.stopPropagation()">
    <ng-content></ng-content>
  </label>
</div>
`,
      styles: ['.mdc-switch{align-items:center;background:none;border:none;cursor:pointer;display:inline-flex;flex-shrink:0;margin:0;outline:none;overflow:visible;padding:0;position:relative;width:var(--mdc-switch-track-width)}.mdc-switch.mdc-switch--disabled{cursor:default;pointer-events:none}.mdc-switch.mat-mdc-slide-toggle-disabled-interactive{pointer-events:auto}.mdc-switch__track{overflow:hidden;position:relative;width:100%;height:var(--mdc-switch-track-height);border-radius:var(--mdc-switch-track-shape, var(--mat-app-corner-full))}.mdc-switch--disabled.mdc-switch .mdc-switch__track{opacity:var(--mdc-switch-disabled-track-opacity)}.mdc-switch__track::before,.mdc-switch__track::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";height:100%;left:0;position:absolute;width:100%;border-width:var(--mat-switch-track-outline-width);border-color:var(--mat-switch-track-outline-color, var(--mat-app-outline))}.cdk-high-contrast-active .mdc-switch__track::before,.cdk-high-contrast-active .mdc-switch__track::after{border-color:currentColor}.mdc-switch--selected .mdc-switch__track::before,.mdc-switch--selected .mdc-switch__track::after{border-width:var(--mat-switch-selected-track-outline-width);border-color:var(--mat-switch-selected-track-outline-color)}.mdc-switch--disabled .mdc-switch__track::before,.mdc-switch--disabled .mdc-switch__track::after{border-width:var(--mat-switch-disabled-unselected-track-outline-width);border-color:var(--mat-switch-disabled-unselected-track-outline-color, var(--mat-app-on-surface))}.mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);transform:translateX(0);background:var(--mdc-switch-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__track::before{transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before{transform:translateX(-100%)}.mdc-switch--selected .mdc-switch__track::before{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch--unselected .mdc-switch__track::before{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-hover-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before{background:var(--mdc-switch-unselected-focus-track-color, var(--mat-app-surface-variant))}.mdc-switch:enabled:active .mdc-switch__track::before{background:var(--mdc-switch-unselected-pressed-track-color, var(--mat-app-surface-variant))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before,.mdc-switch.mdc-switch--disabled .mdc-switch__track::before{background:var(--mdc-switch-disabled-unselected-track-color, var(--mat-app-surface-variant))}.mdc-switch__track::after{transform:translateX(-100%);background:var(--mdc-switch-selected-track-color, var(--mat-app-primary))}[dir=rtl] .mdc-switch__track::after{transform:translateX(100%)}.mdc-switch--selected .mdc-switch__track::after{transform:translateX(0)}.mdc-switch--selected .mdc-switch__track::after{opacity:var(--mat-switch-visible-track-opacity);transition:var(--mat-switch-visible-track-transition)}.mdc-switch--unselected .mdc-switch__track::after{opacity:var(--mat-switch-hidden-track-opacity);transition:var(--mat-switch-hidden-track-transition)}.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-hover-track-color, var(--mat-app-primary))}.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after{background:var(--mdc-switch-selected-focus-track-color, var(--mat-app-primary))}.mdc-switch:enabled:active .mdc-switch__track::after{background:var(--mdc-switch-selected-pressed-track-color, var(--mat-app-primary))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after,.mdc-switch.mdc-switch--disabled .mdc-switch__track::after{background:var(--mdc-switch-disabled-selected-track-color, var(--mat-app-on-surface))}.mdc-switch__handle-track{height:100%;pointer-events:none;position:absolute;top:0;transition:transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);left:0;right:auto;transform:translateX(0);width:calc(100% - var(--mdc-switch-handle-width))}[dir=rtl] .mdc-switch__handle-track{left:auto;right:0}.mdc-switch--selected .mdc-switch__handle-track{transform:translateX(100%)}[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track{transform:translateX(-100%)}.mdc-switch__handle{display:flex;pointer-events:auto;position:absolute;top:50%;transform:translateY(-50%);left:0;right:auto;transition:width 75ms cubic-bezier(0.4, 0, 0.2, 1),height 75ms cubic-bezier(0.4, 0, 0.2, 1),margin 75ms cubic-bezier(0.4, 0, 0.2, 1);width:var(--mdc-switch-handle-width);height:var(--mdc-switch-handle-height);border-radius:var(--mdc-switch-handle-shape, var(--mat-app-corner-full))}[dir=rtl] .mdc-switch__handle{left:auto;right:0}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle{width:var(--mat-switch-unselected-handle-size);height:var(--mat-switch-unselected-handle-size);margin:var(--mat-switch-unselected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-unselected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle{width:var(--mat-switch-selected-handle-size);height:var(--mat-switch-selected-handle-size);margin:var(--mat-switch-selected-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons){margin:var(--mat-switch-selected-with-icon-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons){width:var(--mat-switch-with-icon-handle-size);height:var(--mat-switch-with-icon-handle-size)}.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle{width:var(--mat-switch-pressed-handle-size);height:var(--mat-switch-pressed-handle-size)}.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-selected-pressed-handle-horizontal-margin)}.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle{margin:var(--mat-switch-unselected-pressed-handle-horizontal-margin)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-selected-handle-opacity)}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after{opacity:var(--mat-switch-disabled-unselected-handle-opacity)}.mdc-switch__handle::before,.mdc-switch__handle::after{border:1px solid rgba(0,0,0,0);border-radius:inherit;box-sizing:border-box;content:"";width:100%;height:100%;left:0;position:absolute;top:0;transition:background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1),border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);z-index:-1}.cdk-high-contrast-active .mdc-switch__handle::before,.cdk-high-contrast-active .mdc-switch__handle::after{border-color:currentColor}.mdc-switch--selected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-selected-handle-color, var(--mat-app-on-primary))}.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-hover-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-selected-focus-handle-color, var(--mat-app-primary-container))}.mdc-switch--selected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-selected-pressed-handle-color, var(--mat-app-primary-container))}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after,.mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-selected-handle-color, var(--mat-app-surface))}.mdc-switch--unselected:enabled .mdc-switch__handle::after{background:var(--mdc-switch-unselected-handle-color, var(--mat-app-outline))}.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-hover-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after{background:var(--mdc-switch-unselected-focus-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected:enabled:active .mdc-switch__handle::after{background:var(--mdc-switch-unselected-pressed-handle-color, var(--mat-app-on-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after{background:var(--mdc-switch-disabled-unselected-handle-color, var(--mat-app-on-surface))}.mdc-switch__handle::before{background:var(--mdc-switch-handle-surface-color)}.mdc-switch__shadow{border-radius:inherit;bottom:0;left:0;position:absolute;right:0;top:0}.mdc-switch:enabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-handle-elevation-shadow)}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow,.mdc-switch.mdc-switch--disabled .mdc-switch__shadow{box-shadow:var(--mdc-switch-disabled-handle-elevation-shadow)}.mdc-switch__ripple{left:50%;position:absolute;top:50%;transform:translate(-50%, -50%);z-index:-1;width:var(--mdc-switch-state-layer-size);height:var(--mdc-switch-state-layer-size)}.mdc-switch__ripple::after{content:"";opacity:0}.mdc-switch--disabled .mdc-switch__ripple::after{display:none}.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after{display:block}.mdc-switch:hover .mdc-switch__ripple::after{opacity:.04;transition:75ms opacity cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mdc-switch .mdc-switch__ripple::after{opacity:.12}.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after,.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after,.mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-hover-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-focus-state-layer-color, var(--mat-app-on-surface))}.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-unselected-pressed-state-layer-color, var(--mat-app-on-surface));opacity:var(--mdc-switch-unselected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after{background:var(--mdc-switch-selected-hover-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after{background:var(--mdc-switch-selected-focus-state-layer-color, var(--mat-app-primary))}.mdc-switch--selected:enabled:active .mdc-switch__ripple::after{background:var(--mdc-switch-selected-pressed-state-layer-color, var(--mat-app-primary));opacity:var(--mdc-switch-selected-pressed-state-layer-opacity, var(--mat-app-pressed-state-layer-opacity));transition:opacity 75ms linear}.mdc-switch__icons{position:relative;height:100%;width:100%;z-index:1}.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-unselected-icon-opacity)}.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons{opacity:var(--mdc-switch-disabled-selected-icon-opacity)}.mdc-switch__icon{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0;opacity:0;transition:opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1)}.mdc-switch--unselected .mdc-switch__icon{width:var(--mdc-switch-unselected-icon-size);height:var(--mdc-switch-unselected-icon-size);fill:var(--mdc-switch-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-unselected-icon-color, var(--mat-app-surface-variant))}.mdc-switch--selected .mdc-switch__icon{width:var(--mdc-switch-selected-icon-size);height:var(--mdc-switch-selected-icon-size);fill:var(--mdc-switch-selected-icon-color, var(--mat-app-on-primary-container))}.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon{fill:var(--mdc-switch-disabled-selected-icon-color, var(--mat-app-on-surface))}.mdc-switch--selected .mdc-switch__icon--on,.mdc-switch--unselected .mdc-switch__icon--off{opacity:1;transition:opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1)}.mat-mdc-slide-toggle{-webkit-user-select:none;user-select:none;display:inline-block;-webkit-tap-highlight-color:rgba(0,0,0,0);outline:0}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,.mat-mdc-slide-toggle .mdc-switch__ripple::after{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:50%;pointer-events:none}.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty){transform:translateZ(0)}.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-mdc-focus-indicator::before{content:""}.mat-mdc-slide-toggle .mat-internal-form-field{color:var(--mat-switch-label-text-color, var(--mat-app-on-surface));font-family:var(--mat-switch-label-text-font, var(--mat-app-body-medium-font));line-height:var(--mat-switch-label-text-line-height, var(--mat-app-body-medium-line-height));font-size:var(--mat-switch-label-text-size, var(--mat-app-body-medium-size));letter-spacing:var(--mat-switch-label-text-tracking, var(--mat-app-body-medium-tracking));font-weight:var(--mat-switch-label-text-weight, var(--mat-app-body-medium-weight))}.mat-mdc-slide-toggle .mat-ripple-element{opacity:.12}.mat-mdc-slide-toggle .mat-mdc-focus-indicator::before{border-radius:50%}.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after{transition:none}.mat-mdc-slide-toggle .mdc-switch:enabled+.mdc-label{cursor:pointer}.mat-mdc-slide-toggle .mdc-switch--disabled+label{color:var(--mdc-switch-disabled-label-text-color)}']
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: FocusMonitor
  }, {
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [ANIMATION_MODULE_TYPE]
    }]
  }], {
    _switchElement: [{
      type: ViewChild,
      args: ["switch"]
    }],
    name: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    ariaDescribedby: [{
      type: Input,
      args: ["aria-describedby"]
    }],
    required: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    color: [{
      type: Input
    }],
    disabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    tabIndex: [{
      type: Input,
      args: [{
        transform: (value) => value == null ? 0 : numberAttribute(value)
      }]
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideIcon: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabledInteractive: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    change: [{
      type: Output
    }],
    toggleChange: [{
      type: Output
    }]
  });
})();
var MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatSlideToggleRequiredValidator),
  multi: true
};
var MatSlideToggleRequiredValidator = class _MatSlideToggleRequiredValidator extends CheckboxRequiredValidator {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatSlideToggleRequiredValidator_BaseFactory;
      return function MatSlideToggleRequiredValidator_Factory(__ngFactoryType__) {
        return (\u0275MatSlideToggleRequiredValidator_BaseFactory || (\u0275MatSlideToggleRequiredValidator_BaseFactory = \u0275\u0275getInheritedFactory(_MatSlideToggleRequiredValidator)))(__ngFactoryType__ || _MatSlideToggleRequiredValidator);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatSlideToggleRequiredValidator,
      selectors: [["mat-slide-toggle", "required", "", "formControlName", ""], ["mat-slide-toggle", "required", "", "formControl", ""], ["mat-slide-toggle", "required", "", "ngModel", ""]],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR]), \u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleRequiredValidator, [{
    type: Directive,
    args: [{
      selector: `mat-slide-toggle[required][formControlName],
             mat-slide-toggle[required][formControl], mat-slide-toggle[required][ngModel]`,
      providers: [MAT_SLIDE_TOGGLE_REQUIRED_VALIDATOR],
      standalone: true
    }]
  }], null, null);
})();
var _MatSlideToggleRequiredValidatorModule = class __MatSlideToggleRequiredValidatorModule {
  static {
    this.\u0275fac = function _MatSlideToggleRequiredValidatorModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || __MatSlideToggleRequiredValidatorModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: __MatSlideToggleRequiredValidatorModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(_MatSlideToggleRequiredValidatorModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggleRequiredValidator],
      exports: [MatSlideToggleRequiredValidator]
    }]
  }], null, null);
})();
var MatSlideToggleModule = class _MatSlideToggleModule {
  static {
    this.\u0275fac = function MatSlideToggleModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatSlideToggleModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatSlideToggleModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatSlideToggle, MatCommonModule, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSlideToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatSlideToggle, MatCommonModule],
      exports: [MatSlideToggle, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/features/admin/product-management/product-management.component.ts
var _c02 = ["colorFileInput"];
var _forTrack0 = ($index, $item) => $item.id;
var _c12 = () => ({ standalone: true });
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
    \u0275\u0275text(1, "Main");
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
    \u0275\u0275text(3, "Add Photo");
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
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c12));
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", se_r11.stock);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c12));
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
    \u0275\u0275text(12, "Sizes");
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
    \u0275\u0275text(19, "Add");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ce_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", ce_r4.name);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c12));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ce_r4.images);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ce_r4.images.length < ctx_r1.maxColorImages ? 9 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ce_r4.sizes);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ce_r4.newSizeName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c12));
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
    \u0275\u0275text(7, "Name");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 8)(10, "mat-label");
    \u0275\u0275text(11, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 11)(14, "mat-label");
    \u0275\u0275text(15, "Description");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "textarea", 12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "div", 7)(18, "mat-form-field", 8)(19, "mat-label");
    \u0275\u0275text(20, "Price");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-form-field", 8)(23, "mat-label");
    \u0275\u0275text(24, "Compare Price");
    \u0275\u0275elementEnd();
    \u0275\u0275element(25, "input", 14);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ProductManagementComponent_Conditional_10_Conditional_26_Template, 4, 0, "mat-form-field", 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 15)(28, "div", 16)(29, "label", 17);
    \u0275\u0275text(30, "Colors & Images (optional)");
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
    \u0275\u0275text(34, " Add Color ");
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
    \u0275\u0275text(41, "Categories");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "mat-select", 21);
    \u0275\u0275repeaterCreate(43, ProductManagementComponent_Conditional_10_For_44_Template, 2, 2, "mat-option", 22, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "div", 23)(46, "mat-slide-toggle", 24);
    \u0275\u0275text(47, "Featured");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "mat-slide-toggle", 25);
    \u0275\u0275text(49, "Active");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "button", 26);
    \u0275\u0275text(51);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.editingId ? "Edit" : "New", " Product");
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
    \u0275\u0275textInterpolate1(" ", ctx_r1.editingId ? "Update" : "Create", " ");
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
    \u0275\u0275text(1, "Image");
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
    \u0275\u0275text(1, "Name");
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
    \u0275\u0275text(1, "Price");
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
    \u0275\u0275textInterpolate3(" ", ctx_r1.totalColorStock(p_r18), " (", p_r18.colors.length, " color", p_r18.colors.length !== 1 ? "s" : "", ") ");
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
    \u0275\u0275text(1, "Active");
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
    \u0275\u0275textInterpolate(p_r19.active ? "Yes" : "No");
  }
}
function ProductManagementComponent_Conditional_12_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 60);
    \u0275\u0275text(1, "Actions");
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
      this.snackBar.open(`Maximum ${MAX_COLOR_IMAGES} images per color`, "Close", { duration: 3e3 });
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
        this.snackBar.open(err.error?.message || "Image upload failed", "Close", { duration: 3e3 });
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
        this.snackBar.open(`Product ${this.editingId ? "updated" : "created"}`, "Close", { duration: 3e3 });
        this.showForm = false;
        this.resetForm();
        this.loadProducts();
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error saving product", "Close", { duration: 3e3 })
    });
  }
  deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?"))
      return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.snackBar.open("Product deleted", "Close", { duration: 3e3 });
        this.loadProducts();
      },
      error: () => this.snackBar.open("Error deleting product", "Close", { duration: 3e3 })
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
        \u0275\u0275viewQuery(_c02, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.colorFileInputRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 13, vars: 3, consts: [["colorFileInput", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "form-card"], [3, "ngSubmit", "formGroup"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "name"], ["matInput", "", "formControlName", "sku"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "description", "rows", "3"], ["matInput", "", "formControlName", "price", "type", "number"], ["matInput", "", "formControlName", "compareAtPrice", "type", "number"], [1, "colors-section"], [1, "section-header"], [1, "section-label"], ["type", "button", "mat-stroked-button", "", 3, "click"], [1, "color-card"], ["type", "file", "accept", "image/*", "hidden", "", 3, "change"], ["formControlName", "categoryIds", "multiple", ""], [3, "value"], [1, "toggles"], ["formControlName", "featured"], ["formControlName", "active"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["matInput", "", "formControlName", "stockQuantity", "type", "number"], [1, "color-card-header"], ["placeholder", "Color name (e.g. Red, Blue...)", 1, "color-name-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", "mat-icon-button", "", "color", "warn", 3, "click"], [1, "images-grid"], [1, "image-slot", "filled"], [1, "image-slot", "empty"], [1, "sizes-section"], [1, "sizes-label"], [1, "sizes-list"], [1, "size-row"], [1, "add-size-row"], ["placeholder", "Add size...", 1, "size-name-input", 3, "ngModelChange", "keydown.enter", "ngModel", "ngModelOptions"], [1, "slot-img", 3, "src", "alt"], [1, "main-badge"], ["type", "button", "mat-icon-button", "", 1, "slot-delete", 3, "click"], [1, "image-slot", "empty", 3, "click"], ["diameter", "28"], ["placeholder", "Size", 1, "size-name-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "number", "min", "0", "placeholder", "Stock", 1, "size-stock-input", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["type", "button", "mat-icon-button", "", 3, "click"], ["mat-table", "", 1, "product-table", 3, "dataSource"], ["matColumnDef", "image"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "price"], ["matColumnDef", "stock"], ["matColumnDef", "active"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "page", "length", "pageSize"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "table-thumb", 3, "src", "alt"], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function ProductManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Product Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3);
        \u0275\u0275text(5, "\u2190 Dashboard");
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
        \u0275\u0275textInterpolate1(" ", ctx.showForm ? "Cancel" : "Add Product", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.showForm ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.loading ? 11 : 12);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, NgModel, ReactiveFormsModule, FormGroupDirective, FormControlName, RouterLink, MatTableModule, MatTable, MatHeaderCellDef, MatHeaderRowDef, MatColumnDef, MatCellDef, MatRowDef, MatHeaderCell, MatCell, MatHeaderRow, MatRow, MatButtonModule, MatAnchor, MatButton, MatIconButton, MatIconModule, MatIcon, MatPaginatorModule, MatPaginator, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatSlideToggleModule, MatSlideToggle, MatCardModule, MatCard, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner, CurrencyPipe, LoadingComponent], styles: ["\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.form-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin: 16px 0;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: flex-start;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toggles[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 24px;\n  margin: 16px 0;\n}\n.product-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n}\n.table-thumb[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n  object-fit: cover;\n  border-radius: 4px;\n}\n.section-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  display: block;\n}\n.colors-section[_ngcontent-%COMP%] {\n  margin: 16px 0;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 12px;\n}\n.color-card[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n  border-radius: 8px;\n  padding: 16px;\n  margin-bottom: 16px;\n  background: #fafafa;\n}\n.color-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.color-name-input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 8px 12px;\n  font-size: 14px;\n  outline: none;\n}\n.color-name-input[_ngcontent-%COMP%]:focus {\n  border-color: #3f51b5;\n}\n.images-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.image-slot[_ngcontent-%COMP%] {\n  width: 100px;\n  height: 100px;\n  border-radius: 8px;\n  overflow: hidden;\n  position: relative;\n}\n.image-slot.filled[_ngcontent-%COMP%] {\n  border: 1px solid #ddd;\n}\n.image-slot.empty[_ngcontent-%COMP%] {\n  border: 2px dashed #ccc;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  cursor: pointer;\n  color: #999;\n  font-size: 11px;\n}\n.image-slot.empty[_ngcontent-%COMP%]:hover {\n  border-color: #3f51b5;\n  color: #3f51b5;\n}\n.slot-img[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.main-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  background: #3f51b5;\n  color: white;\n  font-size: 10px;\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n.slot-delete[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 2px;\n  right: 2px;\n  width: 28px;\n  height: 28px;\n  background: rgba(0, 0, 0, 0.5) !important;\n  color: white !important;\n}\n.slot-delete[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  line-height: 16px;\n}\n.sizes-section[_ngcontent-%COMP%] {\n  border-top: 1px solid #eee;\n  padding-top: 12px;\n}\n.sizes-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: rgba(0, 0, 0, 0.6);\n  display: block;\n  margin-bottom: 8px;\n  font-weight: 500;\n}\n.sizes-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.size-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.add-size-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 4px;\n}\n.size-name-input[_ngcontent-%COMP%] {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 6px 10px;\n  font-size: 13px;\n  outline: none;\n  width: 120px;\n}\n.size-name-input[_ngcontent-%COMP%]:focus {\n  border-color: #3f51b5;\n}\n.size-stock-input[_ngcontent-%COMP%] {\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  padding: 6px 10px;\n  font-size: 13px;\n  outline: none;\n  width: 80px;\n  text-align: center;\n}\n.size-stock-input[_ngcontent-%COMP%]:focus {\n  border-color: #3f51b5;\n}\n/*# sourceMappingURL=product-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductManagementComponent, { className: "ProductManagementComponent" });
})();
export {
  ProductManagementComponent
};
//# sourceMappingURL=chunk-UCGIDR6R.js.map
