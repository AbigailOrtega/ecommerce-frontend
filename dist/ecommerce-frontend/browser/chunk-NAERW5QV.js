import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-XJ2Z6WGZ.js";
import {
  AdminService
} from "./chunk-DPPNASQT.js";
import {
  MatTableModule
} from "./chunk-3YZFWUW6.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-JITF7FU4.js";
import {
  MatDivider,
  MatDividerModule
} from "./chunk-7WR3W74A.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-4CWOKWUJ.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-YPEJ5GST.js";
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
  MatLabel,
  MatSuffix
} from "./chunk-3KYEYZGS.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MinValidator,
  NG_VALUE_ACCESSOR,
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
import {
  SelectionModel
} from "./chunk-SAONJULU.js";
import "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  RouterLink
} from "./chunk-ZS3NQH2Z.js";
import {
  DOWN_ARROW,
  Directionality,
  ENTER,
  FocusMonitor,
  LEFT_ARROW,
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatIconButton,
  MatOption,
  MatPseudoCheckbox,
  MatRipple,
  MatRippleModule,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW
} from "./chunk-TPU3W7C5.js";
import "./chunk-UIRNOPT5.js";
import {
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
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
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵInputTransformsFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinjectAttribute,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-N3527UH3.js";

// node_modules/@angular/material/fesm2022/button-toggle.mjs
var _c0 = ["button"];
var _c1 = ["*"];
function MatButtonToggle_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-pseudo-checkbox", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.disabled);
  }
}
function MatButtonToggle_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-pseudo-checkbox", 3);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r1.disabled);
  }
}
var MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS = new InjectionToken("MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS", {
  providedIn: "root",
  factory: MAT_BUTTON_TOGGLE_GROUP_DEFAULT_OPTIONS_FACTORY
});
function MAT_BUTTON_TOGGLE_GROUP_DEFAULT_OPTIONS_FACTORY() {
  return {
    hideSingleSelectionIndicator: false,
    hideMultipleSelectionIndicator: false,
    disabledInteractive: false
  };
}
var MAT_BUTTON_TOGGLE_GROUP = new InjectionToken("MatButtonToggleGroup");
var MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MatButtonToggleGroup),
  multi: true
};
var uniqueIdCounter = 0;
var MatButtonToggleChange = class {
  constructor(source, value) {
    this.source = source;
    this.value = value;
  }
};
var MatButtonToggleGroup = class _MatButtonToggleGroup {
  /** `name` attribute for the underlying `input` element. */
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
    this._markButtonsForCheck();
  }
  /** Value of the toggle group. */
  get value() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    if (this.multiple) {
      return selected.map((toggle) => toggle.value);
    }
    return selected[0] ? selected[0].value : void 0;
  }
  set value(newValue) {
    this._setSelectionByValue(newValue);
    this.valueChange.emit(this.value);
  }
  /** Selected button toggles in the group. */
  get selected() {
    const selected = this._selectionModel ? this._selectionModel.selected : [];
    return this.multiple ? selected : selected[0] || null;
  }
  /** Whether multiple button toggles can be selected. */
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = value;
    this._markButtonsForCheck();
  }
  /** Whether multiple button toggle group is disabled. */
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._markButtonsForCheck();
  }
  /** Whether buttons in the group should be interactive while they're disabled. */
  get disabledInteractive() {
    return this._disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
    this._markButtonsForCheck();
  }
  /** The layout direction of the toggle button group. */
  get dir() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Whether checkmark indicator for single-selection button toggle groups is hidden. */
  get hideSingleSelectionIndicator() {
    return this._hideSingleSelectionIndicator;
  }
  set hideSingleSelectionIndicator(value) {
    this._hideSingleSelectionIndicator = value;
    this._markButtonsForCheck();
  }
  /** Whether checkmark indicator for multiple-selection button toggle groups is hidden. */
  get hideMultipleSelectionIndicator() {
    return this._hideMultipleSelectionIndicator;
  }
  set hideMultipleSelectionIndicator(value) {
    this._hideMultipleSelectionIndicator = value;
    this._markButtonsForCheck();
  }
  constructor(_changeDetector, defaultOptions, _dir) {
    this._changeDetector = _changeDetector;
    this._dir = _dir;
    this._multiple = false;
    this._disabled = false;
    this._disabledInteractive = false;
    this._controlValueAccessorChangeFn = () => {
    };
    this._onTouched = () => {
    };
    this._name = `mat-button-toggle-group-${uniqueIdCounter++}`;
    this.valueChange = new EventEmitter();
    this.change = new EventEmitter();
    this.appearance = defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : "standard";
    this.hideSingleSelectionIndicator = defaultOptions?.hideSingleSelectionIndicator ?? false;
    this.hideMultipleSelectionIndicator = defaultOptions?.hideMultipleSelectionIndicator ?? false;
  }
  ngOnInit() {
    this._selectionModel = new SelectionModel(this.multiple, void 0, false);
  }
  ngAfterContentInit() {
    this._selectionModel.select(...this._buttonToggles.filter((toggle) => toggle.checked));
    if (!this.multiple) {
      this._initializeTabIndex();
    }
  }
  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value Value to be set to the model.
   */
  writeValue(value) {
    this.value = value;
    this._changeDetector.markForCheck();
  }
  // Implemented as part of ControlValueAccessor.
  registerOnChange(fn) {
    this._controlValueAccessorChangeFn = fn;
  }
  // Implemented as part of ControlValueAccessor.
  registerOnTouched(fn) {
    this._onTouched = fn;
  }
  // Implemented as part of ControlValueAccessor.
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  /** Handle keydown event calling to single-select button toggle. */
  _keydown(event) {
    if (this.multiple || this.disabled) {
      return;
    }
    const target = event.target;
    const buttonId = target.id;
    const index = this._buttonToggles.toArray().findIndex((toggle) => {
      return toggle.buttonId === buttonId;
    });
    let nextButton = null;
    switch (event.keyCode) {
      case SPACE:
      case ENTER:
        nextButton = this._buttonToggles.get(index) || null;
        break;
      case UP_ARROW:
        nextButton = this._getNextButton(index, -1);
        break;
      case LEFT_ARROW:
        nextButton = this._getNextButton(index, this.dir === "ltr" ? -1 : 1);
        break;
      case DOWN_ARROW:
        nextButton = this._getNextButton(index, 1);
        break;
      case RIGHT_ARROW:
        nextButton = this._getNextButton(index, this.dir === "ltr" ? 1 : -1);
        break;
      default:
        return;
    }
    if (nextButton) {
      event.preventDefault();
      nextButton._onButtonClick();
      nextButton.focus();
    }
  }
  /** Dispatch change event with current selection and group value. */
  _emitChangeEvent(toggle) {
    const event = new MatButtonToggleChange(toggle, this.value);
    this._rawValue = event.value;
    this._controlValueAccessorChangeFn(event.value);
    this.change.emit(event);
  }
  /**
   * Syncs a button toggle's selected state with the model value.
   * @param toggle Toggle to be synced.
   * @param select Whether the toggle should be selected.
   * @param isUserInput Whether the change was a result of a user interaction.
   * @param deferEvents Whether to defer emitting the change events.
   */
  _syncButtonToggle(toggle, select, isUserInput = false, deferEvents = false) {
    if (!this.multiple && this.selected && !toggle.checked) {
      this.selected.checked = false;
    }
    if (this._selectionModel) {
      if (select) {
        this._selectionModel.select(toggle);
      } else {
        this._selectionModel.deselect(toggle);
      }
    } else {
      deferEvents = true;
    }
    if (deferEvents) {
      Promise.resolve().then(() => this._updateModelValue(toggle, isUserInput));
    } else {
      this._updateModelValue(toggle, isUserInput);
    }
  }
  /** Checks whether a button toggle is selected. */
  _isSelected(toggle) {
    return this._selectionModel && this._selectionModel.isSelected(toggle);
  }
  /** Determines whether a button toggle should be checked on init. */
  _isPrechecked(toggle) {
    if (typeof this._rawValue === "undefined") {
      return false;
    }
    if (this.multiple && Array.isArray(this._rawValue)) {
      return this._rawValue.some((value) => toggle.value != null && value === toggle.value);
    }
    return toggle.value === this._rawValue;
  }
  /** Initializes the tabindex attribute using the radio pattern. */
  _initializeTabIndex() {
    this._buttonToggles.forEach((toggle) => {
      toggle.tabIndex = -1;
    });
    if (this.selected) {
      this.selected.tabIndex = 0;
    } else {
      for (let i = 0; i < this._buttonToggles.length; i++) {
        const toggle = this._buttonToggles.get(i);
        if (!toggle.disabled) {
          toggle.tabIndex = 0;
          break;
        }
      }
    }
    this._markButtonsForCheck();
  }
  /** Obtain the subsequent toggle to which the focus shifts. */
  _getNextButton(startIndex, offset) {
    const items = this._buttonToggles;
    for (let i = 1; i <= items.length; i++) {
      const index = (startIndex + offset * i + items.length) % items.length;
      const item = items.get(index);
      if (item && !item.disabled) {
        return item;
      }
    }
    return null;
  }
  /** Updates the selection state of the toggles in the group based on a value. */
  _setSelectionByValue(value) {
    this._rawValue = value;
    if (!this._buttonToggles) {
      return;
    }
    if (this.multiple && value) {
      if (!Array.isArray(value) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("Value must be an array in multiple-selection mode.");
      }
      this._clearSelection();
      value.forEach((currentValue) => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }
  /** Clears the selected toggles. */
  _clearSelection() {
    this._selectionModel.clear();
    this._buttonToggles.forEach((toggle) => {
      toggle.checked = false;
      if (!this.multiple) {
        toggle.tabIndex = -1;
      }
    });
  }
  /** Selects a value if there's a toggle that corresponds to it. */
  _selectValue(value) {
    const correspondingOption = this._buttonToggles.find((toggle) => {
      return toggle.value != null && toggle.value === value;
    });
    if (correspondingOption) {
      correspondingOption.checked = true;
      this._selectionModel.select(correspondingOption);
      if (!this.multiple) {
        correspondingOption.tabIndex = 0;
      }
    }
  }
  /** Syncs up the group's value with the model and emits the change event. */
  _updateModelValue(toggle, isUserInput) {
    if (isUserInput) {
      this._emitChangeEvent(toggle);
    }
    this.valueChange.emit(this.value);
  }
  /** Marks all of the child button toggles to be checked. */
  _markButtonsForCheck() {
    this._buttonToggles?.forEach((toggle) => toggle._markForCheck());
  }
  static {
    this.\u0275fac = function MatButtonToggleGroup_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggleGroup)(\u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, 8), \u0275\u0275directiveInject(Directionality, 8));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatButtonToggleGroup,
      selectors: [["mat-button-toggle-group"]],
      contentQueries: function MatButtonToggleGroup_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatButtonToggle, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._buttonToggles = _t);
        }
      },
      hostAttrs: [1, "mat-button-toggle-group"],
      hostVars: 6,
      hostBindings: function MatButtonToggleGroup_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("keydown", function MatButtonToggleGroup_keydown_HostBindingHandler($event) {
            return ctx._keydown($event);
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("role", ctx.multiple ? "group" : "radiogroup")("aria-disabled", ctx.disabled);
          \u0275\u0275classProp("mat-button-toggle-vertical", ctx.vertical)("mat-button-toggle-group-appearance-standard", ctx.appearance === "standard");
        }
      },
      inputs: {
        appearance: "appearance",
        name: "name",
        vertical: [2, "vertical", "vertical", booleanAttribute],
        value: "value",
        multiple: [2, "multiple", "multiple", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute],
        hideSingleSelectionIndicator: [2, "hideSingleSelectionIndicator", "hideSingleSelectionIndicator", booleanAttribute],
        hideMultipleSelectionIndicator: [2, "hideMultipleSelectionIndicator", "hideMultipleSelectionIndicator", booleanAttribute]
      },
      outputs: {
        valueChange: "valueChange",
        change: "change"
      },
      exportAs: ["matButtonToggleGroup"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, {
        provide: MAT_BUTTON_TOGGLE_GROUP,
        useExisting: _MatButtonToggleGroup
      }]), \u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggleGroup, [{
    type: Directive,
    args: [{
      selector: "mat-button-toggle-group",
      providers: [MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, {
        provide: MAT_BUTTON_TOGGLE_GROUP,
        useExisting: MatButtonToggleGroup
      }],
      host: {
        "class": "mat-button-toggle-group",
        "(keydown)": "_keydown($event)",
        "[attr.role]": "multiple ? 'group' : 'radiogroup'",
        "[attr.aria-disabled]": "disabled",
        "[class.mat-button-toggle-vertical]": "vertical",
        "[class.mat-button-toggle-group-appearance-standard]": 'appearance === "standard"'
      },
      exportAs: "matButtonToggleGroup",
      standalone: true
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS]
    }]
  }, {
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }], {
    _buttonToggles: [{
      type: ContentChildren,
      args: [forwardRef(() => MatButtonToggle), {
        // Note that this would technically pick up toggles
        // from nested groups, but that's not a case that we support.
        descendants: true
      }]
    }],
    appearance: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    vertical: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    value: [{
      type: Input
    }],
    valueChange: [{
      type: Output
    }],
    multiple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
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
    hideSingleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hideMultipleSelectionIndicator: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var MatButtonToggle = class _MatButtonToggle {
  /** Unique ID for the underlying `button` element. */
  get buttonId() {
    return `${this.id}-button`;
  }
  /** Tabindex of the toggle. */
  get tabIndex() {
    return this._tabIndex;
  }
  set tabIndex(value) {
    this._tabIndex = value;
    this._markForCheck();
  }
  /** The appearance style of the button. */
  get appearance() {
    return this.buttonToggleGroup ? this.buttonToggleGroup.appearance : this._appearance;
  }
  set appearance(value) {
    this._appearance = value;
  }
  /** Whether the button is checked. */
  get checked() {
    return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
  }
  set checked(value) {
    if (value !== this._checked) {
      this._checked = value;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  /** Whether the button is disabled. */
  get disabled() {
    return this._disabled || this.buttonToggleGroup && this.buttonToggleGroup.disabled;
  }
  set disabled(value) {
    this._disabled = value;
  }
  /** Whether the button should remain interactive when it is disabled. */
  get disabledInteractive() {
    return this._disabledInteractive || this.buttonToggleGroup !== null && this.buttonToggleGroup.disabledInteractive;
  }
  set disabledInteractive(value) {
    this._disabledInteractive = value;
  }
  constructor(toggleGroup, _changeDetectorRef, _elementRef, _focusMonitor, defaultTabIndex, defaultOptions) {
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._focusMonitor = _focusMonitor;
    this._checked = false;
    this.ariaLabelledby = null;
    this._disabled = false;
    this.change = new EventEmitter();
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = parsedTabIndex || parsedTabIndex === 0 ? parsedTabIndex : null;
    this.buttonToggleGroup = toggleGroup;
    this.appearance = defaultOptions && defaultOptions.appearance ? defaultOptions.appearance : "standard";
    this.disabledInteractive = defaultOptions?.disabledInteractive ?? false;
  }
  ngOnInit() {
    const group = this.buttonToggleGroup;
    this.id = this.id || `mat-button-toggle-${uniqueIdCounter++}`;
    if (group) {
      if (group._isPrechecked(this)) {
        this.checked = true;
      } else if (group._isSelected(this) !== this._checked) {
        group._syncButtonToggle(this, this._checked);
      }
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    const group = this.buttonToggleGroup;
    this._focusMonitor.stopMonitoring(this._elementRef);
    if (group && group._isSelected(this)) {
      group._syncButtonToggle(this, false, false, true);
    }
  }
  /** Focuses the button. */
  focus(options) {
    this._buttonElement.nativeElement.focus(options);
  }
  /** Checks the button toggle due to an interaction with the underlying native button. */
  _onButtonClick() {
    if (this.disabled) {
      return;
    }
    const newChecked = this.isSingleSelector() ? true : !this._checked;
    if (newChecked !== this._checked) {
      this._checked = newChecked;
      if (this.buttonToggleGroup) {
        this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
        this.buttonToggleGroup._onTouched();
      }
    }
    if (this.isSingleSelector()) {
      const focusable = this.buttonToggleGroup._buttonToggles.find((toggle) => {
        return toggle.tabIndex === 0;
      });
      if (focusable) {
        focusable.tabIndex = -1;
      }
      this.tabIndex = 0;
    }
    this.change.emit(new MatButtonToggleChange(this, this.value));
  }
  /**
   * Marks the button toggle as needing checking for change detection.
   * This method is exposed because the parent button toggle group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    this._changeDetectorRef.markForCheck();
  }
  /** Gets the name that should be assigned to the inner DOM node. */
  _getButtonName() {
    if (this.isSingleSelector()) {
      return this.buttonToggleGroup.name;
    }
    return this.name || null;
  }
  /** Whether the toggle is in single selection mode. */
  isSingleSelector() {
    return this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
  }
  static {
    this.\u0275fac = function MatButtonToggle_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggle)(\u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_GROUP, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275injectAttribute("tabindex"), \u0275\u0275directiveInject(MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatButtonToggle,
      selectors: [["mat-button-toggle"]],
      viewQuery: function MatButtonToggle_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(_c0, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._buttonElement = _t.first);
        }
      },
      hostAttrs: ["role", "presentation", 1, "mat-button-toggle"],
      hostVars: 14,
      hostBindings: function MatButtonToggle_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("focus", function MatButtonToggle_focus_HostBindingHandler() {
            return ctx.focus();
          });
        }
        if (rf & 2) {
          \u0275\u0275attribute("aria-label", null)("aria-labelledby", null)("id", ctx.id)("name", null);
          \u0275\u0275classProp("mat-button-toggle-standalone", !ctx.buttonToggleGroup)("mat-button-toggle-checked", ctx.checked)("mat-button-toggle-disabled", ctx.disabled)("mat-button-toggle-disabled-interactive", ctx.disabledInteractive)("mat-button-toggle-appearance-standard", ctx.appearance === "standard");
        }
      },
      inputs: {
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        id: "id",
        name: "name",
        value: "value",
        tabIndex: "tabIndex",
        disableRipple: [2, "disableRipple", "disableRipple", booleanAttribute],
        appearance: "appearance",
        checked: [2, "checked", "checked", booleanAttribute],
        disabled: [2, "disabled", "disabled", booleanAttribute],
        disabledInteractive: [2, "disabledInteractive", "disabledInteractive", booleanAttribute]
      },
      outputs: {
        change: "change"
      },
      exportAs: ["matButtonToggle"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c1,
      decls: 8,
      vars: 14,
      consts: [["button", ""], ["type", "button", 1, "mat-button-toggle-button", "mat-focus-indicator", 3, "click", "id", "disabled"], [1, "mat-button-toggle-label-content"], ["state", "checked", "aria-hidden", "true", "appearance", "minimal", 1, "mat-mdc-option-pseudo-checkbox", 3, "disabled"], [1, "mat-button-toggle-focus-overlay"], ["matRipple", "", 1, "mat-button-toggle-ripple", 3, "matRippleTrigger", "matRippleDisabled"]],
      template: function MatButtonToggle_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = \u0275\u0275getCurrentView();
          \u0275\u0275projectionDef();
          \u0275\u0275elementStart(0, "button", 1, 0);
          \u0275\u0275listener("click", function MatButtonToggle_Template_button_click_0_listener() {
            \u0275\u0275restoreView(_r1);
            return \u0275\u0275resetView(ctx._onButtonClick());
          });
          \u0275\u0275elementStart(2, "span", 2);
          \u0275\u0275template(3, MatButtonToggle_Conditional_3_Template, 1, 1, "mat-pseudo-checkbox", 3)(4, MatButtonToggle_Conditional_4_Template, 1, 1, "mat-pseudo-checkbox", 3);
          \u0275\u0275projection(5);
          \u0275\u0275elementEnd()();
          \u0275\u0275element(6, "span", 4)(7, "span", 5);
        }
        if (rf & 2) {
          const button_r3 = \u0275\u0275reference(1);
          \u0275\u0275property("id", ctx.buttonId)("disabled", ctx.disabled && !ctx.disabledInteractive || null);
          \u0275\u0275attribute("role", ctx.isSingleSelector() ? "radio" : "button")("tabindex", ctx.disabled && !ctx.disabledInteractive ? -1 : ctx.tabIndex)("aria-pressed", !ctx.isSingleSelector() ? ctx.checked : null)("aria-checked", ctx.isSingleSelector() ? ctx.checked : null)("name", ctx._getButtonName())("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby)("aria-disabled", ctx.disabled && ctx.disabledInteractive ? "true" : null);
          \u0275\u0275advance(3);
          \u0275\u0275conditional(ctx.buttonToggleGroup && ctx.checked && !ctx.buttonToggleGroup.multiple && !ctx.buttonToggleGroup.hideSingleSelectionIndicator ? 3 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.buttonToggleGroup && ctx.checked && ctx.buttonToggleGroup.multiple && !ctx.buttonToggleGroup.hideMultipleSelectionIndicator ? 4 : -1);
          \u0275\u0275advance(3);
          \u0275\u0275property("matRippleTrigger", button_r3)("matRippleDisabled", ctx.disableRipple || ctx.disabled);
        }
      },
      dependencies: [MatRipple, MatPseudoCheckbox],
      styles: [".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-legacy-button-toggle-selected-state-text-color)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{pointer-events:none;color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-legacy-button-toggle-disabled-state-text-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-disabled-interactive{pointer-events:auto}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color, var(--mat-app-on-surface));background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font, var(--mat-app-label-large-font));font-size:var(--mat-standard-button-toggle-label-text-size, var(--mat-app-label-large-size));line-height:var(--mat-standard-button-toggle-label-text-line-height, var(--mat-app-label-large-line-height));font-weight:var(--mat-standard-button-toggle-label-text-weight, var(--mat-app-label-large-weight));letter-spacing:var(--mat-standard-button-toggle-label-text-tracking, var(--mat-app-label-large-tracking))}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container));background-color:var(--mat-standard-button-toggle-selected-state-background-color, var(--mat-app-secondary-container))}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-standard-button-toggle-disabled-selected-state-text-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color, var(--mat-app-on-surface))}.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}@media(hover: none){.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggle, [{
    type: Component,
    args: [{
      selector: "mat-button-toggle",
      encapsulation: ViewEncapsulation$1.None,
      exportAs: "matButtonToggle",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.mat-button-toggle-standalone]": "!buttonToggleGroup",
        "[class.mat-button-toggle-checked]": "checked",
        "[class.mat-button-toggle-disabled]": "disabled",
        "[class.mat-button-toggle-disabled-interactive]": "disabledInteractive",
        "[class.mat-button-toggle-appearance-standard]": 'appearance === "standard"',
        "class": "mat-button-toggle",
        "[attr.aria-label]": "null",
        "[attr.aria-labelledby]": "null",
        "[attr.id]": "id",
        "[attr.name]": "null",
        "(focus)": "focus()",
        "role": "presentation"
      },
      standalone: true,
      imports: [MatRipple, MatPseudoCheckbox],
      template: `<button #button class="mat-button-toggle-button mat-focus-indicator"
        type="button"
        [id]="buttonId"
        [attr.role]="isSingleSelector() ? 'radio' : 'button'"
        [attr.tabindex]="disabled && !disabledInteractive ? -1 : tabIndex"
        [attr.aria-pressed]="!isSingleSelector() ? checked : null"
        [attr.aria-checked]="isSingleSelector() ? checked : null"
        [disabled]="(disabled && !disabledInteractive) || null"
        [attr.name]="_getButtonName()"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledby"
        [attr.aria-disabled]="disabled && disabledInteractive ? 'true' : null"
        (click)="_onButtonClick()">
  <span class="mat-button-toggle-label-content">
    <!-- Render checkmark at the beginning for single-selection. -->
    @if (buttonToggleGroup && checked && !buttonToggleGroup.multiple && !buttonToggleGroup.hideSingleSelectionIndicator) {
      <mat-pseudo-checkbox
          class="mat-mdc-option-pseudo-checkbox"
          [disabled]="disabled"
          state="checked"
          aria-hidden="true"
          appearance="minimal"></mat-pseudo-checkbox>
    }
    <!-- Render checkmark at the beginning for multiple-selection. -->
    @if (buttonToggleGroup && checked && buttonToggleGroup.multiple && !buttonToggleGroup.hideMultipleSelectionIndicator) {
      <mat-pseudo-checkbox
          class="mat-mdc-option-pseudo-checkbox"
          [disabled]="disabled"
          state="checked"
          aria-hidden="true"
          appearance="minimal"></mat-pseudo-checkbox>
    }
    <ng-content></ng-content>
  </span>
</button>

<span class="mat-button-toggle-focus-overlay"></span>
<span class="mat-button-toggle-ripple" matRipple
     [matRippleTrigger]="button"
     [matRippleDisabled]="this.disableRipple || this.disabled">
</span>
`,
      styles: [".mat-button-toggle-standalone,.mat-button-toggle-group{position:relative;display:inline-flex;flex-direction:row;white-space:nowrap;overflow:hidden;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0);border-radius:var(--mat-legacy-button-toggle-shape)}.mat-button-toggle-standalone:not([class*=mat-elevation-z]),.mat-button-toggle-group:not([class*=mat-elevation-z]){box-shadow:0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)}.cdk-high-contrast-active .mat-button-toggle-standalone,.cdk-high-contrast-active .mat-button-toggle-group{outline:solid 1px}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.mat-button-toggle-group-appearance-standard{border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container))}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]){box-shadow:none}.cdk-high-contrast-active .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,.cdk-high-contrast-active .mat-button-toggle-group-appearance-standard{outline:0}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle{white-space:nowrap;position:relative;color:var(--mat-legacy-button-toggle-text-color);font-family:var(--mat-legacy-button-toggle-label-text-font);font-size:var(--mat-legacy-button-toggle-label-text-size);line-height:var(--mat-legacy-button-toggle-label-text-line-height);font-weight:var(--mat-legacy-button-toggle-label-text-weight);letter-spacing:var(--mat-legacy-button-toggle-label-text-tracking);--mat-minimal-pseudo-checkbox-selected-checkmark-color: var(--mat-legacy-button-toggle-selected-state-text-color)}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-legacy-button-toggle-focus-state-layer-opacity)}.mat-button-toggle .mat-icon svg{vertical-align:top}.mat-button-toggle .mat-pseudo-checkbox{margin-right:12px}[dir=rtl] .mat-button-toggle .mat-pseudo-checkbox{margin-right:0;margin-left:12px}.mat-button-toggle-checked{color:var(--mat-legacy-button-toggle-selected-state-text-color);background-color:var(--mat-legacy-button-toggle-selected-state-background-color)}.mat-button-toggle-disabled{pointer-events:none;color:var(--mat-legacy-button-toggle-disabled-state-text-color);background-color:var(--mat-legacy-button-toggle-disabled-state-background-color);--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-legacy-button-toggle-disabled-state-text-color)}.mat-button-toggle-disabled.mat-button-toggle-checked{background-color:var(--mat-legacy-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-disabled-interactive{pointer-events:auto}.mat-button-toggle-appearance-standard{color:var(--mat-standard-button-toggle-text-color, var(--mat-app-on-surface));background-color:var(--mat-standard-button-toggle-background-color);font-family:var(--mat-standard-button-toggle-label-text-font, var(--mat-app-label-large-font));font-size:var(--mat-standard-button-toggle-label-text-size, var(--mat-app-label-large-size));line-height:var(--mat-standard-button-toggle-label-text-line-height, var(--mat-app-label-large-line-height));font-weight:var(--mat-standard-button-toggle-label-text-weight, var(--mat-app-label-large-weight));letter-spacing:var(--mat-standard-button-toggle-label-text-tracking, var(--mat-app-label-large-tracking))}.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard+.mat-button-toggle-appearance-standard{border-left:none;border-right:none;border-top:solid 1px var(--mat-standard-button-toggle-divider-color, var(--mat-app-outline))}.mat-button-toggle-appearance-standard.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-selected-state-text-color, var(--mat-app-on-secondary-container));background-color:var(--mat-standard-button-toggle-selected-state-background-color, var(--mat-app-secondary-container))}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled{color:var(--mat-standard-button-toggle-disabled-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-state-background-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox{--mat-minimal-pseudo-checkbox-disabled-selected-checkmark-color: var(--mat-standard-button-toggle-disabled-selected-state-text-color)}.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked{color:var(--mat-standard-button-toggle-disabled-selected-state-text-color);background-color:var(--mat-standard-button-toggle-disabled-selected-state-background-color)}.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{background-color:var(--mat-standard-button-toggle-state-layer-color, var(--mat-app-on-surface))}.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-hover-state-layer-opacity, var(--mat-app-hover-state-layer-opacity))}.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:var(--mat-standard-button-toggle-focus-state-layer-opacity, var(--mat-app-focus-state-layer-opacity))}@media(hover: none){.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay{display:none}}.mat-button-toggle-label-content{-webkit-user-select:none;user-select:none;display:inline-block;padding:0 16px;line-height:var(--mat-legacy-button-toggle-height);position:relative}.mat-button-toggle-appearance-standard .mat-button-toggle-label-content{padding:0 12px;line-height:var(--mat-standard-button-toggle-height)}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit;pointer-events:none;opacity:0;background-color:var(--mat-legacy-button-toggle-state-layer-color)}.cdk-high-contrast-active .mat-button-toggle-checked .mat-button-toggle-focus-overlay{border-bottom:solid 500px;opacity:.5;height:0}.cdk-high-contrast-active .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay{opacity:.6}.cdk-high-contrast-active .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay{border-bottom:solid 500px}.mat-button-toggle .mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-button-toggle-button{border:0;background:none;color:inherit;padding:0;margin:0;font:inherit;outline:none;width:100%;cursor:pointer}.mat-button-toggle-disabled .mat-button-toggle-button{cursor:default}.mat-button-toggle-button::-moz-focus-inner{border:0}.mat-button-toggle-standalone.mat-button-toggle-appearance-standard{--mat-focus-indicator-border-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:last-of-type .mat-button-toggle-button::before{border-top-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-right-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}.mat-button-toggle-group-appearance-standard .mat-button-toggle:first-of-type .mat-button-toggle-button::before{border-top-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full));border-bottom-left-radius:var(--mat-standard-button-toggle-shape, var(--mat-app-corner-full))}"]
    }]
  }], () => [{
    type: MatButtonToggleGroup,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_BUTTON_TOGGLE_GROUP]
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }, {
    type: FocusMonitor
  }, {
    type: void 0,
    decorators: [{
      type: Attribute,
      args: ["tabindex"]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS]
    }]
  }], {
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    _buttonElement: [{
      type: ViewChild,
      args: ["button"]
    }],
    id: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    disableRipple: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    appearance: [{
      type: Input
    }],
    checked: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    disabled: [{
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
    }]
  });
})();
var MatButtonToggleModule = class _MatButtonToggleModule {
  static {
    this.\u0275fac = function MatButtonToggleModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatButtonToggleModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatButtonToggleModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [MatCommonModule, MatRippleModule, MatButtonToggle, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatButtonToggleModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, MatRippleModule, MatButtonToggleGroup, MatButtonToggle],
      exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle]
    }]
  }], null, null);
})();

// src/app/features/admin/shipping-management/shipping-management.component.ts
var _forTrack0 = ($index, $item) => $item.id;
var _c02 = () => [];
var _c12 = () => ({ standalone: true });
function ShippingManagementComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Cargando configuraci\xF3n...");
    \u0275\u0275elementEnd();
  }
}
function ShippingManagementComponent_Conditional_10_Conditional_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 22)(1, "mat-label");
    \u0275\u0275text(2, "Costo de Pick Up ($)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 39);
    \u0275\u0275elementEnd();
  }
}
function ShippingManagementComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 8);
    \u0275\u0275listener("ngSubmit", function ShippingManagementComponent_Conditional_10_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.saveConfig());
    });
    \u0275\u0275elementStart(1, "div", 9)(2, "h3", 10);
    \u0275\u0275text(3, "Skydropx (Gu\xEDas de env\xEDo)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 11)(5, "mat-icon");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 12)(9, "mat-slide-toggle", 13);
    \u0275\u0275text(10, " Modo Sandbox (demo) ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 14)(12, "mat-form-field", 15)(13, "mat-label");
    \u0275\u0275text(14, "API Key (Client ID)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(15, "input", 16);
    \u0275\u0275elementStart(16, "button", 17);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_10_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showSkydropxId = !ctx_r1.showSkydropxId);
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-form-field", 15)(20, "mat-label");
    \u0275\u0275text(21, "API Secret Key (Client Secret)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(22, "input", 18);
    \u0275\u0275elementStart(23, "button", 17);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_10_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showSkydropxSecret = !ctx_r1.showSkydropxSecret);
    });
    \u0275\u0275elementStart(24, "mat-icon");
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "p", 19);
    \u0275\u0275text(27, "Direcci\xF3n de origen para gu\xEDas");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "mat-form-field", 15)(29, "mat-label");
    \u0275\u0275text(30, "Calle y n\xFAmero");
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "input", 20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 21)(33, "mat-form-field", 22)(34, "mat-label");
    \u0275\u0275text(35, "C\xF3digo Postal");
    \u0275\u0275elementEnd();
    \u0275\u0275element(36, "input", 23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "mat-form-field", 22)(38, "mat-label");
    \u0275\u0275text(39, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275element(40, "input", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "mat-form-field", 22)(42, "mat-label");
    \u0275\u0275text(43, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(44, "input", 25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "mat-form-field", 22)(46, "mat-label");
    \u0275\u0275text(47, "Pa\xEDs (ISO)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(48, "input", 26);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(49, "p", 19);
    \u0275\u0275text(50, "Datos del remitente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "div", 21)(52, "mat-form-field", 22)(53, "mat-label");
    \u0275\u0275text(54, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(55, "input", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "mat-form-field", 22)(57, "mat-label");
    \u0275\u0275text(58, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(59, "input", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "mat-form-field", 22)(61, "mat-label");
    \u0275\u0275text(62, "Tel\xE9fono");
    \u0275\u0275elementEnd();
    \u0275\u0275element(63, "input", 29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "p", 19);
    \u0275\u0275text(65, "Dimensiones de paquete por defecto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "div", 21)(67, "mat-form-field", 22)(68, "mat-label");
    \u0275\u0275text(69, "Peso (kg)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(70, "input", 30);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(71, "mat-form-field", 22)(72, "mat-label");
    \u0275\u0275text(73, "Largo (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(74, "input", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(75, "mat-form-field", 22)(76, "mat-label");
    \u0275\u0275text(77, "Ancho (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(78, "input", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "mat-form-field", 22)(80, "mat-label");
    \u0275\u0275text(81, "Alto (cm)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(82, "input", 33);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(83, "mat-divider", 34);
    \u0275\u0275elementStart(84, "div", 9)(85, "h3", 10);
    \u0275\u0275text(86, "Pick Up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(87, "mat-slide-toggle", 35);
    \u0275\u0275text(88, "Habilitado");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(89, ShippingManagementComponent_Conditional_10_Conditional_89_Template, 4, 0, "mat-form-field", 22);
    \u0275\u0275element(90, "mat-divider", 34);
    \u0275\u0275elementStart(91, "h3", 10);
    \u0275\u0275text(92, "WhatsApp de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(93, "mat-form-field", 22)(94, "mat-label");
    \u0275\u0275text(95, "N\xFAmero WhatsApp (con c\xF3digo de pa\xEDs)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(96, "input", 36);
    \u0275\u0275elementStart(97, "mat-hint");
    \u0275\u0275text(98, 'Sin espacios ni "+". Se muestra como bot\xF3n flotante en la tienda.');
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(99, "div", 37)(100, "button", 38);
    \u0275\u0275text(101);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_9_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.configForm);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("configured", ctx_r1.config == null ? null : ctx_r1.config.hasSkydropxCredentials);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r1.config == null ? null : ctx_r1.config.hasSkydropxCredentials) ? "check_circle" : "cancel");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.config == null ? null : ctx_r1.config.hasSkydropxCredentials) ? "Conectado" : "No configurado", " ");
    \u0275\u0275advance(8);
    \u0275\u0275property("type", ctx_r1.showSkydropxId ? "text" : "password");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.showSkydropxId ? "visibility_off" : "visibility");
    \u0275\u0275advance(4);
    \u0275\u0275property("type", ctx_r1.showSkydropxSecret ? "text" : "password");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.showSkydropxSecret ? "visibility_off" : "visibility");
    \u0275\u0275advance(64);
    \u0275\u0275conditional(((tmp_9_0 = ctx_r1.configForm.get("pickupEnabled")) == null ? null : tmp_9_0.value) ? 89 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275property("disabled", ctx_r1.savingConfig);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingConfig ? "Guardando..." : "Guardar configuraci\xF3n", " ");
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 42)(1, "h3");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 8);
    \u0275\u0275listener("ngSubmit", function ShippingManagementComponent_Conditional_11_Conditional_8_Template_form_ngSubmit_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.saveLocation());
    });
    \u0275\u0275elementStart(4, "div", 21)(5, "mat-form-field", 22)(6, "mat-label");
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 22)(10, "mat-label");
    \u0275\u0275text(11, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 15)(14, "mat-label");
    \u0275\u0275text(15, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "input", 46);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-form-field", 22)(18, "mat-label");
    \u0275\u0275text(19, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(20, "input", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 37)(22, "button", 48);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_8_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.cancelLocationForm());
    });
    \u0275\u0275text(23, "Cancelar");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 38);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r1.editingLocation ? "Editar" : "Nuevo", " Punto de Pick Up");
    \u0275\u0275advance();
    \u0275\u0275property("formGroup", ctx_r1.locationForm);
    \u0275\u0275advance(21);
    \u0275\u0275property("disabled", ctx_r1.locationForm.invalid || ctx_r1.savingLocation);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.savingLocation ? "Guardando..." : "Guardar", " ");
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 5);
    \u0275\u0275text(1, "Cargando puntos...");
    \u0275\u0275elementEnd();
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 43);
    \u0275\u0275text(1, "No hay puntos de retiro a\xFAn.");
    \u0275\u0275elementEnd();
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 72)(4, "mat-slide-toggle", 56);
    \u0275\u0275listener("change", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_20_Template_mat_slide_toggle_change_4_listener() {
      const slot_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleSlot(loc_r6, slot_r8));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 58);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_20_Template_button_click_5_listener() {
      const slot_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteSlot(loc_r6, slot_r8));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const slot_r8 = ctx.$implicit;
    \u0275\u0275classProp("slot-inactive", !slot_r8.active);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(slot_r8.label);
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", slot_r8.active)("matTooltip", slot_r8.active ? "Desactivar" : "Activar");
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62)(1, "mat-form-field", 73)(2, "mat-label");
    \u0275\u0275text(3, "Ej. Lunes 10:00 \u2013 14:00");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_21_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.newSlotLabel, $event) || (ctx_r1.newSlotLabel = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 75);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_21_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r9);
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveSlot(loc_r6));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 76);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_21_Template_button_click_8_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.cancelAddSlot());
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newSlotLabel);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(3, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.newSlotLabel.trim());
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 77);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.startAddSlot(loc_r6.id));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Agregar horario (texto libre) ");
    \u0275\u0275elementEnd();
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 78)(1, "mat-icon", 79);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 80);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 81)(6, "mat-slide-toggle", 56);
    \u0275\u0275listener("change", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_33_Template_mat_slide_toggle_change_6_listener() {
      const rule_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleAvailability(loc_r6, rule_r12));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 58);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_33_Template_button_click_7_listener() {
      const rule_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteAvailability(loc_r6, rule_r12));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "close");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const rule_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275classProp("avail-inactive", !rule_r12.active);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rule_r12.type === "RECURRING" ? "repeat" : "event");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.availabilityLabel(rule_r12));
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", rule_r12.active)("matTooltip", rule_r12.active ? "Desactivar" : "Activar");
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 85)(1, "mat-label");
    \u0275\u0275text(2, "D\xEDa de la semana");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 94);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_6_Template_mat_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r14);
      const ctx_r1 = \u0275\u0275nextContext(5);
      \u0275\u0275twoWayBindingSet(ctx_r1.newAvail.dayOfWeek, $event) || (ctx_r1.newAvail.dayOfWeek = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "mat-option", 95);
    \u0275\u0275text(5, "Lunes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-option", 96);
    \u0275\u0275text(7, "Martes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-option", 97);
    \u0275\u0275text(9, "Mi\xE9rcoles");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-option", 98);
    \u0275\u0275text(11, "Jueves");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-option", 99);
    \u0275\u0275text(13, "Viernes");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-option", 100);
    \u0275\u0275text(15, "S\xE1bado");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "mat-option", 101);
    \u0275\u0275text(17, "Domingo");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newAvail.dayOfWeek);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(2, _c12));
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 85)(1, "mat-label");
    \u0275\u0275text(2, "Fecha espec\xEDfica");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 102);
    \u0275\u0275listener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_7_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.onAvailDateChange($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 103)(5, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const availPicker_r16 = \u0275\u0275reference(6);
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", availPicker_r16)("ngModel", ctx_r1.newAvailSpecificDate)("ngModelOptions", \u0275\u0275pureFunction0(4, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("for", availPicker_r16);
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 70)(1, "mat-button-toggle-group", 82);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_mat_button_toggle_group_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.newAvail.type, $event) || (ctx_r1.newAvail.type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "mat-button-toggle", 83);
    \u0275\u0275text(3, "\u21BB Recurrente");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-button-toggle", 84);
    \u0275\u0275text(5, "\u{1F4C5} Fecha espec\xEDfica");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_6_Template, 18, 3, "mat-form-field", 85)(7, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Conditional_7_Template, 7, 5, "mat-form-field", 85);
    \u0275\u0275elementStart(8, "div", 86)(9, "mat-form-field", 87)(10, "mat-label");
    \u0275\u0275text(11, "Hora inicio");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_input_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.newAvail.startTime, $event) || (ctx_r1.newAvail.startTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 87)(14, "mat-label");
    \u0275\u0275text(15, "Hora fin");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_input_ngModelChange_16_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.newAvail.endTime, $event) || (ctx_r1.newAvail.endTime = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "mat-form-field", 89)(18, "mat-label");
    \u0275\u0275text(19, "Cap. m\xE1x.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "input", 90);
    \u0275\u0275twoWayListener("ngModelChange", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_input_ngModelChange_20_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      \u0275\u0275twoWayBindingSet(ctx_r1.newAvail.maxCapacity, $event) || (ctx_r1.newAvail.maxCapacity = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 91)(22, "button", 92);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r13);
      const loc_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.saveAvailability(loc_r6));
    });
    \u0275\u0275text(23, " Agregar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 93);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.cancelAddAvailability());
    });
    \u0275\u0275text(25, "Cancelar");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newAvail.type);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(10, _c12));
    \u0275\u0275advance(5);
    \u0275\u0275conditional(ctx_r1.newAvail.type === "RECURRING" ? 6 : 7);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newAvail.startTime);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c12));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newAvail.endTime);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(12, _c12));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.newAvail.maxCapacity);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(13, _c12));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isNewAvailValid());
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 50)(1, "div", 51)(2, "div", 52)(3, "strong");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 53);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 54);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 55)(10, "mat-slide-toggle", 56);
    \u0275\u0275listener("change", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template_mat_slide_toggle_change_10_listener() {
      const loc_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.toggleLocation(loc_r6));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 57);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template_button_click_11_listener() {
      const loc_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.openLocationForm(loc_r6));
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 58);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template_button_click_14_listener() {
      const loc_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteLocation(loc_r6));
    });
    \u0275\u0275elementStart(15, "mat-icon");
    \u0275\u0275text(16, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(17, "div", 59)(18, "div", 60);
    \u0275\u0275repeaterCreate(19, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_20_Template, 8, 5, "div", 61, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(21, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_21_Template, 11, 4, "div", 62)(22, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_22_Template, 4, 0, "button", 63);
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "mat-divider", 64);
    \u0275\u0275elementStart(24, "div", 65)(25, "div", 66)(26, "strong", 67);
    \u0275\u0275text(27, "Disponibilidad (calendario)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 68);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template_button_click_28_listener() {
      const loc_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.startAddAvailability(loc_r6));
    });
    \u0275\u0275elementStart(29, "mat-icon");
    \u0275\u0275text(30, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31, " Agregar regla ");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(32, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_For_33_Template, 10, 6, "div", 69, _forTrack0);
    \u0275\u0275template(34, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Conditional_34_Template, 26, 14, "div", 70);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const loc_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("inactive", !loc_r6.active);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(loc_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3("", loc_r6.address, " \xB7 ", loc_r6.city, ", ", loc_r6.state, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", loc_r6.timeSlots.length, " horario(s) \xB7 ", (loc_r6.availabilities || \u0275\u0275pureFunction0(13, _c02)).length, " regla(s) de disponibilidad");
    \u0275\u0275advance(2);
    \u0275\u0275property("checked", loc_r6.active)("matTooltip", loc_r6.active ? "Desactivar" : "Activar");
    \u0275\u0275advance(9);
    \u0275\u0275repeater(loc_r6.timeSlots);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.addingSlotForLocationId === loc_r6.id ? 21 : 22);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.addingAvailForLocationId === loc_r6.id);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(loc_r6.availabilities || \u0275\u0275pureFunction0(14, _c02));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.addingAvailForLocationId === loc_r6.id ? 34 : -1);
  }
}
function ShippingManagementComponent_Conditional_11_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, ShippingManagementComponent_Conditional_11_Conditional_11_For_1_Template, 35, 15, "mat-card", 49, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275repeater(ctx_r1.locations);
  }
}
function ShippingManagementComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 7)(1, "div", 40)(2, "h2");
    \u0275\u0275text(3, "Puntos de Pick Up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 41);
    \u0275\u0275listener("click", function ShippingManagementComponent_Conditional_11_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.openLocationForm());
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Agregar Punto ");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(8, ShippingManagementComponent_Conditional_11_Conditional_8_Template, 26, 4, "mat-card", 42)(9, ShippingManagementComponent_Conditional_11_Conditional_9_Template, 2, 0, "p", 5)(10, ShippingManagementComponent_Conditional_11_Conditional_10_Template, 2, 0, "p", 43)(11, ShippingManagementComponent_Conditional_11_Conditional_11_Template, 2, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275conditional(ctx_r1.showLocationForm ? 8 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.locationsLoading ? 9 : ctx_r1.locations.length === 0 ? 10 : 11);
  }
}
var ShippingManagementComponent = class _ShippingManagementComponent {
  constructor(fb, adminService, snackBar) {
    this.fb = fb;
    this.adminService = adminService;
    this.snackBar = snackBar;
    this.configForm = null;
    this.config = null;
    this.configLoading = true;
    this.savingConfig = false;
    this.showSkydropxId = false;
    this.showSkydropxSecret = false;
    this.locations = [];
    this.locationsLoading = true;
    this.showLocationForm = false;
    this.editingLocation = null;
    this.savingLocation = false;
    this.addingSlotForLocationId = null;
    this.newSlotLabel = "";
    this.addingAvailForLocationId = null;
    this.newAvail = this.defaultAvail();
    this.newAvailSpecificDate = null;
    this.locationForm = this.fb.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required]
    });
  }
  ngOnInit() {
    this.loadConfig();
    this.loadLocations();
  }
  loadConfig() {
    this.configLoading = true;
    this.adminService.getShippingConfig().subscribe({
      next: (res) => {
        this.config = res.data;
        this.configForm = this.fb.group({
          pickupEnabled: [res.data.pickupEnabled],
          pickupCost: [res.data.pickupCost, [Validators.min(0)]],
          skydropxClientId: [""],
          skydropxClientSecret: [""],
          skydropxOriginStreet: [res.data.skydropxOriginStreet ?? ""],
          skydropxOriginPostalCode: [res.data.skydropxOriginPostalCode ?? ""],
          skydropxOriginCity: [res.data.skydropxOriginCity ?? ""],
          skydropxOriginState: [res.data.skydropxOriginState ?? ""],
          skydropxOriginCountry: [res.data.skydropxOriginCountry ?? "MX"],
          skydropxSenderName: [res.data.skydropxSenderName ?? ""],
          skydropxSenderEmail: [res.data.skydropxSenderEmail ?? ""],
          skydropxSenderPhone: [res.data.skydropxSenderPhone ?? ""],
          skydropxDefaultWeight: [res.data.skydropxDefaultWeight ?? 1],
          skydropxDefaultLength: [res.data.skydropxDefaultLength ?? 20],
          skydropxDefaultWidth: [res.data.skydropxDefaultWidth ?? 20],
          skydropxDefaultHeight: [res.data.skydropxDefaultHeight ?? 10],
          skydropxSandbox: [res.data.skydropxSandbox ?? false],
          whatsappNumber: [res.data.whatsappNumber ?? ""]
        });
        this.configLoading = false;
      },
      error: () => this.configLoading = false
    });
  }
  saveConfig() {
    if (!this.configForm)
      return;
    this.savingConfig = true;
    const val = this.configForm.value;
    const req = {
      pickupEnabled: val.pickupEnabled,
      pickupCost: val.pickupCost,
      skydropxOriginStreet: val.skydropxOriginStreet,
      skydropxOriginPostalCode: val.skydropxOriginPostalCode,
      skydropxOriginCity: val.skydropxOriginCity,
      skydropxOriginState: val.skydropxOriginState,
      skydropxOriginCountry: val.skydropxOriginCountry,
      skydropxSenderName: val.skydropxSenderName,
      skydropxSenderEmail: val.skydropxSenderEmail,
      skydropxSenderPhone: val.skydropxSenderPhone,
      skydropxDefaultWeight: val.skydropxDefaultWeight,
      skydropxDefaultLength: val.skydropxDefaultLength,
      skydropxDefaultWidth: val.skydropxDefaultWidth,
      skydropxDefaultHeight: val.skydropxDefaultHeight,
      skydropxSandbox: val.skydropxSandbox,
      whatsappNumber: val.whatsappNumber
    };
    if (val.skydropxClientId?.trim()) {
      req.skydropxClientId = val.skydropxClientId;
    }
    if (val.skydropxClientSecret?.trim()) {
      req.skydropxClientSecret = val.skydropxClientSecret;
    }
    this.adminService.updateShippingConfig(req).subscribe({
      next: (res) => {
        this.config = res.data;
        this.savingConfig = false;
        this.configForm?.patchValue({ skydropxClientId: "", skydropxClientSecret: "" });
        this.snackBar.open("Configuraci\xF3n guardada", "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.savingConfig = false;
        this.snackBar.open(err.error?.message || "Error al guardar", "Cerrar", { duration: 4e3 });
      }
    });
  }
  loadLocations() {
    this.locationsLoading = true;
    this.adminService.getPickupLocations().subscribe({
      next: (res) => {
        this.locations = res.data;
        this.locations.forEach((loc) => this.loadAvailabilities(loc));
        this.locationsLoading = false;
      },
      error: () => this.locationsLoading = false
    });
  }
  loadAvailabilities(loc) {
    this.adminService.getPickupAvailability(loc.id).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), { availabilities: res.data });
          this.locations = [...this.locations];
        }
      }
    });
  }
  openLocationForm(loc) {
    this.editingLocation = loc ?? null;
    if (loc) {
      this.locationForm.patchValue({ name: loc.name, address: loc.address, city: loc.city, state: loc.state });
    } else {
      this.locationForm.reset();
    }
    this.showLocationForm = true;
  }
  cancelLocationForm() {
    this.showLocationForm = false;
    this.editingLocation = null;
  }
  saveLocation() {
    if (this.locationForm.invalid)
      return;
    this.savingLocation = true;
    const req = this.locationForm.value;
    const call = this.editingLocation ? this.adminService.updatePickupLocation(this.editingLocation.id, req) : this.adminService.createPickupLocation(req);
    call.subscribe({
      next: () => {
        this.savingLocation = false;
        this.cancelLocationForm();
        this.loadLocations();
        this.snackBar.open("Guardado", "Cerrar", { duration: 3e3 });
      },
      error: (err) => {
        this.savingLocation = false;
        this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 });
      }
    });
  }
  deleteLocation(loc) {
    if (!confirm(`\xBFEliminar "${loc.name}"?`))
      return;
    this.adminService.deletePickupLocation(loc.id).subscribe({
      next: () => {
        this.locations = this.locations.filter((l) => l.id !== loc.id);
        this.snackBar.open("Eliminado", "Cerrar", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  toggleLocation(loc) {
    this.adminService.togglePickupLocation(loc.id).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1)
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), { active: res.data.active });
        this.locations = [...this.locations];
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  startAddSlot(locationId) {
    this.addingSlotForLocationId = locationId;
    this.newSlotLabel = "";
  }
  cancelAddSlot() {
    this.addingSlotForLocationId = null;
    this.newSlotLabel = "";
  }
  saveSlot(loc) {
    if (!this.newSlotLabel.trim())
      return;
    const req = { label: this.newSlotLabel.trim() };
    this.adminService.addTimeSlot(loc.id, req).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), {
            timeSlots: [...this.locations[idx].timeSlots, res.data]
          });
          this.locations = [...this.locations];
        }
        this.cancelAddSlot();
        this.snackBar.open("Horario agregado", "Cerrar", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  deleteSlot(loc, slot) {
    if (!confirm(`\xBFEliminar horario "${slot.label}"?`))
      return;
    this.adminService.deleteTimeSlot(loc.id, slot.id).subscribe({
      next: () => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), {
            timeSlots: this.locations[idx].timeSlots.filter((s) => s.id !== slot.id)
          });
          this.locations = [...this.locations];
        }
        this.snackBar.open("Eliminado", "Cerrar", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  toggleSlot(loc, slot) {
    this.adminService.toggleTimeSlot(loc.id, slot.id).subscribe({
      next: (res) => {
        const locIdx = this.locations.findIndex((l) => l.id === loc.id);
        if (locIdx !== -1) {
          const slots = this.locations[locIdx].timeSlots.map((s) => s.id === slot.id ? __spreadProps(__spreadValues({}, s), { active: res.data.active }) : s);
          this.locations[locIdx] = __spreadProps(__spreadValues({}, this.locations[locIdx]), { timeSlots: slots });
          this.locations = [...this.locations];
        }
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  // ── Availability ─────────────────────────────────────────────────────────
  defaultAvail() {
    return { type: "RECURRING", dayOfWeek: "MONDAY", startTime: "10:00", endTime: "14:00", maxCapacity: 10 };
  }
  startAddAvailability(loc) {
    this.addingAvailForLocationId = loc.id;
    this.newAvail = this.defaultAvail();
    this.newAvailSpecificDate = null;
  }
  cancelAddAvailability() {
    this.addingAvailForLocationId = null;
    this.newAvail = this.defaultAvail();
    this.newAvailSpecificDate = null;
  }
  onAvailDateChange(date) {
    this.newAvailSpecificDate = date;
    if (date) {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      this.newAvail = __spreadProps(__spreadValues({}, this.newAvail), { specificDate: `${y}-${m}-${d}` });
    }
  }
  isNewAvailValid() {
    if (!this.newAvail.startTime || !this.newAvail.endTime || !this.newAvail.maxCapacity)
      return false;
    if (this.newAvail.type === "RECURRING")
      return !!this.newAvail.dayOfWeek;
    return !!this.newAvail.specificDate;
  }
  saveAvailability(loc) {
    if (!this.isNewAvailValid())
      return;
    const req = __spreadValues({}, this.newAvail);
    if (req.type === "RECURRING")
      delete req.specificDate;
    if (req.type === "SPECIFIC_DATE")
      delete req.dayOfWeek;
    this.adminService.createPickupAvailability(loc.id, req).subscribe({
      next: (res) => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1) {
          const avails = [...this.locations[idx].availabilities || [], res.data];
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), { availabilities: avails });
          this.locations = [...this.locations];
        }
        this.cancelAddAvailability();
        this.snackBar.open("Regla de disponibilidad agregada", "Cerrar", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  deleteAvailability(loc, rule) {
    if (!confirm(`\xBFEliminar regla "${this.availabilityLabel(rule)}"?`))
      return;
    this.adminService.deletePickupAvailability(loc.id, rule.id).subscribe({
      next: () => {
        const idx = this.locations.findIndex((l) => l.id === loc.id);
        if (idx !== -1) {
          this.locations[idx] = __spreadProps(__spreadValues({}, this.locations[idx]), {
            availabilities: (this.locations[idx].availabilities || []).filter((a) => a.id !== rule.id)
          });
          this.locations = [...this.locations];
        }
        this.snackBar.open("Eliminado", "Cerrar", { duration: 3e3 });
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  toggleAvailability(loc, rule) {
    this.adminService.togglePickupAvailability(loc.id, rule.id).subscribe({
      next: (res) => {
        const locIdx = this.locations.findIndex((l) => l.id === loc.id);
        if (locIdx !== -1) {
          const avails = (this.locations[locIdx].availabilities || []).map((a) => a.id === rule.id ? __spreadProps(__spreadValues({}, a), { active: res.data.active }) : a);
          this.locations[locIdx] = __spreadProps(__spreadValues({}, this.locations[locIdx]), { availabilities: avails });
          this.locations = [...this.locations];
        }
      },
      error: (err) => this.snackBar.open(err.error?.message || "Error", "Cerrar", { duration: 4e3 })
    });
  }
  availabilityLabel(rule) {
    const dayLabels = {
      MONDAY: "Lunes",
      TUESDAY: "Martes",
      WEDNESDAY: "Mi\xE9rcoles",
      THURSDAY: "Jueves",
      FRIDAY: "Viernes",
      SATURDAY: "S\xE1bado",
      SUNDAY: "Domingo"
    };
    const timeRange = `${rule.startTime} \u2013 ${rule.endTime}`;
    const cap = `Cap: ${rule.maxCapacity}`;
    if (rule.type === "RECURRING" && rule.dayOfWeek) {
      return `\u21BB ${dayLabels[rule.dayOfWeek] ?? rule.dayOfWeek} \xB7 ${timeRange} \xB7 ${cap}`;
    }
    return `\u{1F4C5} ${rule.specificDate ?? ""} \xB7 ${timeRange} \xB7 ${cap}`;
  }
  static {
    this.\u0275fac = function ShippingManagementComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShippingManagementComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(AdminService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ShippingManagementComponent, selectors: [["app-shipping-management"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 12, vars: 2, consts: [["availPicker", ""], [1, "container"], [1, "header"], ["mat-button", "", "routerLink", "/admin"], [1, "config-card"], [1, "hint"], [3, "formGroup"], [1, "locations-card"], [3, "ngSubmit", "formGroup"], [1, "section-header-row"], [1, "sub-title"], [1, "api-badge"], [1, "toggle-row", 2, "margin-bottom", "12px"], ["formControlName", "skydropxSandbox", "color", "accent"], [1, "api-key-row"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "skydropxClientId", "placeholder", "Ingresa tu API Key", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["matInput", "", "formControlName", "skydropxClientSecret", "placeholder", "Ingresa tu API Secret Key", 3, "type"], [1, "sub-label"], ["matInput", "", "formControlName", "skydropxOriginStreet", "placeholder", "Ej. Reforma 222 Int. 5"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "skydropxOriginPostalCode"], ["matInput", "", "formControlName", "skydropxOriginCity"], ["matInput", "", "formControlName", "skydropxOriginState"], ["matInput", "", "formControlName", "skydropxOriginCountry", "placeholder", "MX"], ["matInput", "", "formControlName", "skydropxSenderName"], ["matInput", "", "formControlName", "skydropxSenderEmail"], ["matInput", "", "formControlName", "skydropxSenderPhone"], ["matInput", "", "type", "number", "min", "0.1", "step", "0.1", "formControlName", "skydropxDefaultWeight"], ["matInput", "", "type", "number", "min", "1", "formControlName", "skydropxDefaultLength"], ["matInput", "", "type", "number", "min", "1", "formControlName", "skydropxDefaultWidth"], ["matInput", "", "type", "number", "min", "1", "formControlName", "skydropxDefaultHeight"], [2, "margin", "24px 0 16px"], ["formControlName", "pickupEnabled", "color", "primary"], ["matInput", "", "formControlName", "whatsappNumber", "placeholder", "Ej. 5215512345678"], [1, "form-actions"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["matInput", "", "type", "number", "min", "0", "step", "0.01", "formControlName", "pickupCost"], [1, "locations-header"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "inline-form"], [1, "empty"], ["matInput", "", "formControlName", "name", "placeholder", "Ej. Sucursal Centro"], ["matInput", "", "formControlName", "city"], ["matInput", "", "formControlName", "address"], ["matInput", "", "formControlName", "state"], ["mat-button", "", "type", "button", 3, "click"], [1, "location-item", 3, "inactive"], [1, "location-item"], [1, "location-header"], [1, "location-info"], [1, "location-meta"], [1, "slot-count"], [1, "location-actions"], ["color", "primary", 3, "change", "checked", "matTooltip"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Editar", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "Eliminar", 3, "click"], [1, "slots-section"], [1, "slots-list"], [1, "slot-item", 3, "slot-inactive"], [1, "add-slot-row"], ["mat-stroked-button", "", 1, "add-slot-btn"], [2, "margin", "12px 0"], [1, "avail-section"], [1, "avail-header"], [1, "avail-title"], ["mat-stroked-button", "", "color", "primary", 3, "click", "disabled"], [1, "avail-item", 3, "avail-inactive"], [1, "add-avail-form"], [1, "slot-item"], [1, "slot-actions"], ["appearance", "outline", 1, "slot-input"], ["matInput", "", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], ["mat-stroked-button", "", 1, "add-slot-btn", 3, "click"], [1, "avail-item"], [1, "avail-icon"], [1, "avail-label"], [1, "avail-actions"], [1, "type-toggle", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "RECURRING"], ["value", "SPECIFIC_DATE"], ["appearance", "outline", 1, "avail-field"], [1, "avail-time-row"], ["appearance", "outline", 1, "avail-time-field"], ["matInput", "", "type", "time", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["appearance", "outline", 1, "avail-cap-field"], ["matInput", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "avail-form-actions"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["mat-button", "", 3, "click"], [3, "ngModelChange", "ngModel", "ngModelOptions"], ["value", "MONDAY"], ["value", "TUESDAY"], ["value", "WEDNESDAY"], ["value", "THURSDAY"], ["value", "FRIDAY"], ["value", "SATURDAY"], ["value", "SUNDAY"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matSuffix", "", 3, "for"]], template: function ShippingManagementComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "h1");
        \u0275\u0275text(3, "Configuraci\xF3n de Entregas");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "a", 3);
        \u0275\u0275text(5, "\u2190 Panel");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "mat-card", 4)(7, "h2");
        \u0275\u0275text(8, "Configuraci\xF3n de Env\xEDo");
        \u0275\u0275elementEnd();
        \u0275\u0275template(9, ShippingManagementComponent_Conditional_9_Template, 2, 0, "p", 5)(10, ShippingManagementComponent_Conditional_10_Template, 102, 12, "form", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275template(11, ShippingManagementComponent_Conditional_11_Template, 12, 2, "mat-card", 7);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance(9);
        \u0275\u0275conditional(ctx.configLoading ? 9 : ctx.configForm ? 10 : -1);
        \u0275\u0275advance(2);
        \u0275\u0275conditional((ctx.configForm == null ? null : (tmp_1_0 = ctx.configForm.get("pickupEnabled")) == null ? null : tmp_1_0.value) ? 11 : -1);
      }
    }, dependencies: [
      RouterLink,
      FormsModule,
      \u0275NgNoValidate,
      DefaultValueAccessor,
      NumberValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      MinValidator,
      NgModel,
      ReactiveFormsModule,
      FormGroupDirective,
      FormControlName,
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
      MatSuffix,
      MatInputModule,
      MatInput,
      MatCardModule,
      MatCard,
      MatSnackBarModule,
      MatSlideToggleModule,
      MatSlideToggle,
      MatDividerModule,
      MatDivider,
      MatTooltipModule,
      MatTooltip,
      MatSelectModule,
      MatSelect,
      MatOption,
      MatDatepickerModule,
      MatDatepicker,
      MatDatepickerInput,
      MatDatepickerToggle,
      MatButtonToggleModule,
      MatButtonToggleGroup,
      MatButtonToggle
    ], styles: ["\n\n.container[_ngcontent-%COMP%] {\n}\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.config-card[_ngcontent-%COMP%], \n.locations-card[_ngcontent-%COMP%] {\n  padding: 24px;\n  margin-bottom: 24px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 180px;\n}\n.toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 32px;\n  flex-wrap: wrap;\n  margin-bottom: 8px;\n}\n.sub-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: #444;\n  margin: 8px 0 12px;\n}\n.api-key-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n}\n.api-key-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.api-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  padding: 6px 10px;\n  border-radius: 16px;\n  background: #ffebee;\n  color: #c62828;\n  white-space: nowrap;\n  margin-top: 10px;\n}\n.api-badge.configured[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.api-badge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 12px;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.9rem;\n  margin: 8px 0 16px;\n}\n.empty[_ngcontent-%COMP%] {\n  color: #666;\n  margin-top: 16px;\n}\n.locations-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n}\n.inline-form[_ngcontent-%COMP%] {\n  padding: 16px;\n  margin-bottom: 16px;\n  border: 1px solid #e3f2fd;\n}\n.location-item[_ngcontent-%COMP%] {\n  padding: 16px;\n  margin-bottom: 12px;\n  border-left: 4px solid var(--theme-primary);\n}\n.location-item.inactive[_ngcontent-%COMP%] {\n  border-left-color: #bbb;\n  opacity: 0.75;\n}\n.location-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n}\n.location-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.location-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.location-meta[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n}\n.slot-count[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--theme-primary);\n}\n.location-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.slots-section[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n.slots-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 8px;\n}\n.slot-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 6px 8px;\n  border-radius: 6px;\n  background: #f8f8f8;\n  font-size: 0.9rem;\n}\n.slot-item.slot-inactive[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n.slot-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n}\n.add-slot-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.slot-input[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.add-slot-btn[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n}\n.section-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 12px;\n}\n.section-header-row[_ngcontent-%COMP%]   .sub-title[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.sub-label[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  font-weight: 600;\n  color: #555;\n  margin: 12px 0 4px;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.avail-section[_ngcontent-%COMP%] {\n  margin-top: 8px;\n}\n.avail-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n.avail-title[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #555;\n}\n.avail-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  border-radius: 6px;\n  background: #f1f8e9;\n  margin-bottom: 4px;\n  font-size: 0.875rem;\n}\n.avail-item.avail-inactive[_ngcontent-%COMP%] {\n  opacity: 0.55;\n  background: #f5f5f5;\n}\n.avail-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: #558b2f;\n  flex-shrink: 0;\n}\n.avail-label[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.avail-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.add-avail-form[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding: 12px;\n  background: #f9f9f9;\n  border-radius: 8px;\n  border: 1px solid #e0e0e0;\n}\n.type-toggle[_ngcontent-%COMP%] {\n  margin-bottom: 12px;\n}\n.avail-field[_ngcontent-%COMP%] {\n  min-width: 200px;\n}\n.avail-time-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n  align-items: flex-start;\n}\n.avail-time-field[_ngcontent-%COMP%] {\n  min-width: 130px;\n}\n.avail-cap-field[_ngcontent-%COMP%] {\n  min-width: 110px;\n}\n.avail-form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-top: 8px;\n}\n/*# sourceMappingURL=shipping-management.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ShippingManagementComponent, { className: "ShippingManagementComponent" });
})();
export {
  ShippingManagementComponent
};
//# sourceMappingURL=chunk-NAERW5QV.js.map
