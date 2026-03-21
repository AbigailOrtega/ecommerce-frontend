import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-4CWOKWUJ.js";
import {
  OrderService
} from "./chunk-JY3BERTJ.js";
import {
  MatRadioButton,
  MatRadioGroup,
  MatRadioModule
} from "./chunk-MGAXNVYR.js";
import {
  ShippingService
} from "./chunk-L5O6LSS5.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-YPEJ5GST.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-4Y3BE5O3.js";
import {
  CartService
} from "./chunk-UDBIOAEY.js";
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
  MatLabel,
  MatSuffix
} from "./chunk-3KYEYZGS.js";
import {
  ControlContainer,
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
import {
  CdkPortalOutlet,
  PortalModule,
  TemplatePortal
} from "./chunk-VTPZX5UP.js";
import "./chunk-J25CCJ4O.js";
import "./chunk-SAONJULU.js";
import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-R7V3ES2J.js";
import {
  Router
} from "./chunk-ZS3NQH2Z.js";
import {
  BidiModule,
  Directionality,
  ENTER,
  ErrorStateMatcher,
  FocusKeyManager,
  FocusMonitor,
  HttpClient,
  MatButton,
  MatButtonModule,
  MatCommonModule,
  MatOption,
  MatRipple,
  MatRippleModule,
  Platform,
  SPACE,
  _getFocusedElementPierceShadowDom,
  hasModifierKey
} from "./chunk-TPU3W7C5.js";
import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from "./chunk-UIRNOPT5.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  ContentChild,
  ContentChildren,
  CurrencyPipe,
  DecimalPipe,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  NgTemplateOutlet,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  Subject,
  Subscription,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation$1,
  __async,
  __spreadProps,
  __spreadValues,
  booleanAttribute,
  forwardRef,
  from,
  inject,
  map,
  numberAttribute,
  of,
  setClassMetadata,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  ɵsetClassDebugInfo,
  ɵɵInheritDefinitionFeature,
  ɵɵInputTransformsFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵhostProperty,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵpureFunction2,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵviewQuery
} from "./chunk-N3527UH3.js";

// node_modules/@angular/cdk/fesm2022/stepper.mjs
var _c0 = ["*"];
function CdkStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
var CdkStepHeader = class _CdkStepHeader {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static {
    this.\u0275fac = function CdkStepHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepHeader)(\u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepHeader,
      selectors: [["", "cdkStepHeader", ""]],
      hostAttrs: ["role", "tab"],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepHeader, [{
    type: Directive,
    args: [{
      selector: "[cdkStepHeader]",
      host: {
        "role": "tab"
      },
      standalone: true
    }]
  }], () => [{
    type: ElementRef
  }], null);
})();
var CdkStepLabel = class _CdkStepLabel {
  constructor(template) {
    this.template = template;
  }
  static {
    this.\u0275fac = function CdkStepLabel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepLabel)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepLabel,
      selectors: [["", "cdkStepLabel", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepLabel, [{
    type: Directive,
    args: [{
      selector: "[cdkStepLabel]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var nextId = 0;
var STEP_STATE = {
  NUMBER: "number",
  EDIT: "edit",
  DONE: "done",
  ERROR: "error"
};
var STEPPER_GLOBAL_OPTIONS = new InjectionToken("STEPPER_GLOBAL_OPTIONS");
var CdkStep = class _CdkStep {
  /** Whether step is marked as completed. */
  get completed() {
    return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
  }
  set completed(value) {
    this._completedOverride = value;
  }
  _getDefaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
  /** Whether step has an error. */
  get hasError() {
    return this._customError == null ? this._getDefaultError() : this._customError;
  }
  set hasError(value) {
    this._customError = value;
  }
  _getDefaultError() {
    return this.stepControl && this.stepControl.invalid && this.interacted;
  }
  constructor(_stepper, stepperOptions) {
    this._stepper = _stepper;
    this.interacted = false;
    this.interactedStream = new EventEmitter();
    this.editable = true;
    this.optional = false;
    this._completedOverride = null;
    this._customError = null;
    this._stepperOptions = stepperOptions ? stepperOptions : {};
    this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
  }
  /** Selects this step component. */
  select() {
    this._stepper.selected = this;
  }
  /** Resets the step to its initial state. Note that this includes resetting form data. */
  reset() {
    this.interacted = false;
    if (this._completedOverride != null) {
      this._completedOverride = false;
    }
    if (this._customError != null) {
      this._customError = false;
    }
    if (this.stepControl) {
      this._childForms?.forEach((form) => form.resetForm?.());
      this.stepControl.reset();
    }
  }
  ngOnChanges() {
    this._stepper._stateChanged();
  }
  _markAsInteracted() {
    if (!this.interacted) {
      this.interacted = true;
      this.interactedStream.emit(this);
    }
  }
  /** Determines whether the error state can be shown. */
  _showError() {
    return this._stepperOptions.showError ?? this._customError != null;
  }
  static {
    this.\u0275fac = function CdkStep_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStep)(\u0275\u0275directiveInject(forwardRef(() => CdkStepper)), \u0275\u0275directiveInject(STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _CdkStep,
      selectors: [["cdk-step"]],
      contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, CdkStepLabel, 5);
          \u0275\u0275contentQuery(
            dirIndex,
            // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
            // provides themselves as such, but we don't want to have a concrete reference to both of
            // the directives. The type is marked as `Partial` in case we run into a class that provides
            // itself as `ControlContainer` but doesn't have the same interface as the directives.
            ControlContainer,
            5
          );
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._childForms = _t);
        }
      },
      viewQuery: function CdkStep_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(TemplateRef, 7);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.content = _t.first);
        }
      },
      inputs: {
        stepControl: "stepControl",
        label: "label",
        errorMessage: "errorMessage",
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        state: "state",
        editable: [2, "editable", "editable", booleanAttribute],
        optional: [2, "optional", "optional", booleanAttribute],
        completed: [2, "completed", "completed", booleanAttribute],
        hasError: [2, "hasError", "hasError", booleanAttribute]
      },
      outputs: {
        interactedStream: "interacted"
      },
      exportAs: ["cdkStep"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature, \u0275\u0275NgOnChangesFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CdkStep_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStep, [{
    type: Component,
    args: [{
      selector: "cdk-step",
      exportAs: "cdkStep",
      template: "<ng-template><ng-content/></ng-template>",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], () => [{
    type: CdkStepper,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => CdkStepper)]
    }]
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: ContentChild,
      args: [CdkStepLabel]
    }],
    _childForms: [{
      type: ContentChildren,
      args: [
        // Note: we look for `ControlContainer` here, because both `NgForm` and `FormGroupDirective`
        // provides themselves as such, but we don't want to have a concrete reference to both of
        // the directives. The type is marked as `Partial` in case we run into a class that provides
        // itself as `ControlContainer` but doesn't have the same interface as the directives.
        ControlContainer,
        {
          descendants: true
        }
      ]
    }],
    content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    stepControl: [{
      type: Input
    }],
    interactedStream: [{
      type: Output,
      args: ["interacted"]
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
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
    state: [{
      type: Input
    }],
    editable: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    optional: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    completed: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    hasError: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }]
  });
})();
var CdkStepper = class _CdkStepper {
  /** The index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index) {
    if (this.steps && this._steps) {
      if (!this._isValidIndex(index) && (typeof ngDevMode === "undefined" || ngDevMode)) {
        throw Error("cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.");
      }
      this.selected?._markAsInteracted();
      if (this._selectedIndex !== index && !this._anyControlsInvalidOrPending(index) && (index >= this._selectedIndex || this.steps.toArray()[index].editable)) {
        this._updateSelectedItemIndex(index);
      }
    } else {
      this._selectedIndex = index;
    }
  }
  /** The step that is selected. */
  get selected() {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : void 0;
  }
  set selected(step) {
    this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
  }
  /** Orientation of the stepper. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    this._orientation = value;
    if (this._keyManager) {
      this._keyManager.withVerticalOrientation(value === "vertical");
    }
  }
  constructor(_dir, _changeDetectorRef, _elementRef) {
    this._dir = _dir;
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    this._destroyed = new Subject();
    this.steps = new QueryList();
    this._sortedHeaders = new QueryList();
    this.linear = false;
    this._selectedIndex = 0;
    this.selectionChange = new EventEmitter();
    this.selectedIndexChange = new EventEmitter();
    this._orientation = "horizontal";
    this._groupId = nextId++;
  }
  ngAfterContentInit() {
    this._steps.changes.pipe(startWith(this._steps), takeUntil(this._destroyed)).subscribe((steps) => {
      this.steps.reset(steps.filter((step) => step._stepper === this));
      this.steps.notifyOnChanges();
    });
  }
  ngAfterViewInit() {
    this._stepHeader.changes.pipe(startWith(this._stepHeader), takeUntil(this._destroyed)).subscribe((headers) => {
      this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
        const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
        return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }));
      this._sortedHeaders.notifyOnChanges();
    });
    this._keyManager = new FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === "vertical");
    (this._dir ? this._dir.change : of()).pipe(startWith(this._layoutDirection()), takeUntil(this._destroyed)).subscribe((direction) => this._keyManager.withHorizontalOrientation(direction));
    this._keyManager.updateActiveItem(this._selectedIndex);
    this.steps.changes.subscribe(() => {
      if (!this.selected) {
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
      }
    });
    if (!this._isValidIndex(this._selectedIndex)) {
      this._selectedIndex = 0;
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this.steps.destroy();
    this._sortedHeaders.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Selects and focuses the next step in list. */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }
  /** Selects and focuses the previous step in list. */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }
  /** Resets the stepper to its initial state. Note that this includes clearing form data. */
  reset() {
    this._updateSelectedItemIndex(0);
    this.steps.forEach((step) => step.reset());
    this._stateChanged();
  }
  /** Returns a unique id for each step label element. */
  _getStepLabelId(i) {
    return `cdk-step-label-${this._groupId}-${i}`;
  }
  /** Returns unique id for each step content element. */
  _getStepContentId(i) {
    return `cdk-step-content-${this._groupId}-${i}`;
  }
  /** Marks the component to be change detected. */
  _stateChanged() {
    this._changeDetectorRef.markForCheck();
  }
  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index) {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return this._layoutDirection() === "rtl" ? "next" : "previous";
    } else if (position > 0) {
      return this._layoutDirection() === "rtl" ? "previous" : "next";
    }
    return "current";
  }
  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index, state2 = STEP_STATE.NUMBER) {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);
    return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state2);
  }
  _getDefaultIndicatorLogic(step, isCurrentStep) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (!step.completed || isCurrentStep) {
      return STEP_STATE.NUMBER;
    } else {
      return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
    }
  }
  _getGuidelineLogic(step, isCurrentStep, state2 = STEP_STATE.NUMBER) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (step.completed && !isCurrentStep) {
      return STEP_STATE.DONE;
    } else if (step.completed && isCurrentStep) {
      return state2;
    } else if (step.editable && isCurrentStep) {
      return STEP_STATE.EDIT;
    } else {
      return state2;
    }
  }
  _isCurrentStep(index) {
    return this._selectedIndex === index;
  }
  /** Returns the index of the currently-focused step header. */
  _getFocusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
  }
  _updateSelectedItemIndex(newIndex) {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex]
    });
    this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
    this._selectedIndex = newIndex;
    this.selectedIndexChange.emit(this._selectedIndex);
    this._stateChanged();
  }
  _onKeydown(event) {
    const hasModifier = hasModifierKey(event);
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    if (manager.activeItemIndex != null && !hasModifier && (keyCode === SPACE || keyCode === ENTER)) {
      this.selectedIndex = manager.activeItemIndex;
      event.preventDefault();
    } else {
      manager.setFocusOrigin("keyboard").onKeydown(event);
    }
  }
  _anyControlsInvalidOrPending(index) {
    if (this.linear && index >= 0) {
      return this.steps.toArray().slice(0, index).some((step) => {
        const control = step.stepControl;
        const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
        return isIncomplete && !step.optional && !step._completedOverride;
      });
    }
    return false;
  }
  _layoutDirection() {
    return this._dir && this._dir.value === "rtl" ? "rtl" : "ltr";
  }
  /** Checks whether the stepper contains the focused element. */
  _containsFocus() {
    const stepperElement = this._elementRef.nativeElement;
    const focusedElement = _getFocusedElementPierceShadowDom();
    return stepperElement === focusedElement || stepperElement.contains(focusedElement);
  }
  /** Checks whether the passed-in index is a valid step index. */
  _isValidIndex(index) {
    return index > -1 && (!this.steps || index < this.steps.length);
  }
  static {
    this.\u0275fac = function CdkStepper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepper)(\u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepper,
      selectors: [["", "cdkStepper", ""]],
      contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, CdkStep, 5);
          \u0275\u0275contentQuery(dirIndex, CdkStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
        }
      },
      inputs: {
        linear: [2, "linear", "linear", booleanAttribute],
        selectedIndex: [2, "selectedIndex", "selectedIndex", numberAttribute],
        selected: "selected",
        orientation: "orientation"
      },
      outputs: {
        selectionChange: "selectionChange",
        selectedIndexChange: "selectedIndexChange"
      },
      exportAs: ["cdkStepper"],
      standalone: true,
      features: [\u0275\u0275InputTransformsFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepper, [{
    type: Directive,
    args: [{
      selector: "[cdkStepper]",
      exportAs: "cdkStepper",
      standalone: true
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], {
    _steps: [{
      type: ContentChildren,
      args: [CdkStep, {
        descendants: true
      }]
    }],
    _stepHeader: [{
      type: ContentChildren,
      args: [CdkStepHeader, {
        descendants: true
      }]
    }],
    linear: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    selected: [{
      type: Input
    }],
    selectionChange: [{
      type: Output
    }],
    selectedIndexChange: [{
      type: Output
    }],
    orientation: [{
      type: Input
    }]
  });
})();
var CdkStepperNext = class _CdkStepperNext {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "submit";
  }
  static {
    this.\u0275fac = function CdkStepperNext_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperNext)(\u0275\u0275directiveInject(CdkStepper));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepperNext,
      selectors: [["button", "cdkStepperNext", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function CdkStepperNext_click_HostBindingHandler() {
            return ctx._stepper.next();
          });
        }
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperNext]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.next()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperPrevious = class _CdkStepperPrevious {
  constructor(_stepper) {
    this._stepper = _stepper;
    this.type = "button";
  }
  static {
    this.\u0275fac = function CdkStepperPrevious_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperPrevious)(\u0275\u0275directiveInject(CdkStepper));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _CdkStepperPrevious,
      selectors: [["button", "cdkStepperPrevious", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275listener("click", function CdkStepperPrevious_click_HostBindingHandler() {
            return ctx._stepper.previous();
          });
        }
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[cdkStepperPrevious]",
      host: {
        "[type]": "type",
        "(click)": "_stepper.previous()"
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: Input
    }]
  });
})();
var CdkStepperModule = class _CdkStepperModule {
  static {
    this.\u0275fac = function CdkStepperModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CdkStepperModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _CdkStepperModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      imports: [BidiModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkStepperModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/stepper.mjs
function MatStepHeader_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("ngTemplateOutlet", ctx_r0.iconOverrides[ctx_r0.state])("ngTemplateOutletContext", ctx_r0._getIconContext());
  }
}
function MatStepHeader_Conditional_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.completedLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.editableLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_1_Conditional_0_Template, 2, 1, "span", 8)(1, MatStepHeader_Conditional_4_Case_1_Conditional_1_Template, 2, 1, "span", 8);
    \u0275\u0275elementStart(2, "mat-icon", 7);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r0.state === "done" ? 0 : ctx_r0.state === "edit" ? 1 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, MatStepHeader_Conditional_4_Case_0_Template, 2, 1, "span", 7)(1, MatStepHeader_Conditional_4_Case_1_Template, 4, 2, "mat-icon", 7);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((tmp_1_0 = ctx_r0.state) === "number" ? 0 : 1);
  }
}
function MatStepHeader_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275elementContainer(1, 9);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", ctx.template);
  }
}
function MatStepHeader_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.label);
  }
}
function MatStepHeader_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0._intl.optionalLabel);
  }
}
function MatStepHeader_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 6);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.errorMessage);
  }
}
var _c02 = ["*"];
function MatStep_ng_template_0_ng_template_1_Template(rf, ctx) {
}
function MatStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
    \u0275\u0275template(1, MatStep_ng_template_0_ng_template_1_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("cdkPortalOutlet", ctx_r0._portal);
  }
}
var _c1 = (a0, a1) => ({
  step: a0,
  i: a1
});
var _c2 = (a0) => ({
  "animationDuration": a0
});
var _c3 = (a0, a1) => ({
  "value": a0,
  "params": a1
});
function MatStepper_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275projection(0);
  }
}
function MatStepper_Case_1_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 6);
  }
}
function MatStepper_Case_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainer(0, 5);
    \u0275\u0275template(1, MatStepper_Case_1_For_3_Conditional_1_Template, 1, 0, "div", 6);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const \u0275$index_8_r2 = ctx.$index;
    const \u0275$count_8_r3 = ctx.$count;
    \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(3, _c1, step_r1, \u0275$index_8_r2));
    \u0275\u0275advance();
    \u0275\u0275conditional(!(\u0275$index_8_r2 === \u0275$count_8_r3 - 1) ? 1 : -1);
  }
}
function MatStepper_Case_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275listener("@horizontalStepTransition.done", function MatStepper_Case_1_For_6_Template_div_animation_horizontalStepTransition_done_0_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementContainer(1, 8);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r7 = ctx.$implicit;
    const \u0275$index_16_r8 = ctx.$index;
    const ctx_r5 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("mat-horizontal-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_16_r8);
    \u0275\u0275property("@horizontalStepTransition", \u0275\u0275pureFunction2(8, _c3, ctx_r5._getAnimationDirection(\u0275$index_16_r8), \u0275\u0275pureFunction1(6, _c2, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_16_r8));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_16_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", step_r7.content);
  }
}
function MatStepper_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
    \u0275\u0275repeaterCreate(2, MatStepper_Case_1_For_3_Template, 2, 6, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 3);
    \u0275\u0275repeaterCreate(5, MatStepper_Case_1_For_6_Template, 2, 11, "div", 4, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r5.steps);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_Case_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275elementContainer(1, 5);
    \u0275\u0275elementStart(2, "div", 10)(3, "div", 11);
    \u0275\u0275listener("@verticalStepTransition.done", function MatStepper_Case_2_For_1_Template_div_animation_verticalStepTransition_done_3_listener($event) {
      \u0275\u0275restoreView(_r9);
      const ctx_r5 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r5._animationDone.next($event));
    });
    \u0275\u0275elementStart(4, "div", 12);
    \u0275\u0275elementContainer(5, 8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const step_r10 = ctx.$implicit;
    const \u0275$index_22_r11 = ctx.$index;
    const \u0275$count_22_r12 = ctx.$count;
    const ctx_r5 = \u0275\u0275nextContext(2);
    const stepTemplate_r4 = \u0275\u0275reference(4);
    \u0275\u0275advance();
    \u0275\u0275property("ngTemplateOutlet", stepTemplate_r4)("ngTemplateOutletContext", \u0275\u0275pureFunction2(10, _c1, step_r10, \u0275$index_22_r11));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-stepper-vertical-line", !(\u0275$index_22_r11 === \u0275$count_22_r12 - 1));
    \u0275\u0275advance();
    \u0275\u0275classProp("mat-vertical-stepper-content-inactive", ctx_r5.selectedIndex !== \u0275$index_22_r11);
    \u0275\u0275property("@verticalStepTransition", \u0275\u0275pureFunction2(15, _c3, ctx_r5._getAnimationDirection(\u0275$index_22_r11), \u0275\u0275pureFunction1(13, _c2, ctx_r5._getAnimationDuration())))("id", ctx_r5._getStepContentId(\u0275$index_22_r11));
    \u0275\u0275attribute("aria-labelledby", ctx_r5._getStepLabelId(\u0275$index_22_r11));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngTemplateOutlet", step_r10.content);
  }
}
function MatStepper_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, MatStepper_Case_2_For_1_Template, 6, 18, "div", 9, \u0275\u0275repeaterTrackByIdentity);
  }
  if (rf & 2) {
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r5.steps);
  }
}
function MatStepper_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-step-header", 13);
    \u0275\u0275listener("click", function MatStepper_ng_template_3_Template_mat_step_header_click_0_listener() {
      const step_r14 = \u0275\u0275restoreView(_r13).step;
      return \u0275\u0275resetView(step_r14.select());
    })("keydown", function MatStepper_ng_template_3_Template_mat_step_header_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r5 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r5._onKeydown($event));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r14 = ctx.step;
    const i_r15 = ctx.i;
    const ctx_r5 = \u0275\u0275nextContext();
    \u0275\u0275classProp("mat-horizontal-stepper-header", ctx_r5.orientation === "horizontal")("mat-vertical-stepper-header", ctx_r5.orientation === "vertical");
    \u0275\u0275property("tabIndex", ctx_r5._getFocusIndex() === i_r15 ? 0 : -1)("id", ctx_r5._getStepLabelId(i_r15))("index", i_r15)("state", ctx_r5._getIndicatorType(i_r15, step_r14.state))("label", step_r14.stepLabel || step_r14.label)("selected", ctx_r5.selectedIndex === i_r15)("active", ctx_r5._stepIsNavigable(i_r15, step_r14))("optional", step_r14.optional)("errorMessage", step_r14.errorMessage)("iconOverrides", ctx_r5._iconOverrides)("disableRipple", ctx_r5.disableRipple || !ctx_r5._stepIsNavigable(i_r15, step_r14))("color", step_r14.color || ctx_r5.color);
    \u0275\u0275attribute("aria-posinset", i_r15 + 1)("aria-setsize", ctx_r5.steps.length)("aria-controls", ctx_r5._getStepContentId(i_r15))("aria-selected", ctx_r5.selectedIndex == i_r15)("aria-label", step_r14.ariaLabel || null)("aria-labelledby", !step_r14.ariaLabel && step_r14.ariaLabelledby ? step_r14.ariaLabelledby : null)("aria-disabled", ctx_r5._stepIsNavigable(i_r15, step_r14) ? null : true);
  }
}
var MatStepLabel = class _MatStepLabel extends CdkStepLabel {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepLabel_BaseFactory;
      return function MatStepLabel_Factory(__ngFactoryType__) {
        return (\u0275MatStepLabel_BaseFactory || (\u0275MatStepLabel_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepLabel)))(__ngFactoryType__ || _MatStepLabel);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepLabel,
      selectors: [["", "matStepLabel", ""]],
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepLabel, [{
    type: Directive,
    args: [{
      selector: "[matStepLabel]",
      standalone: true
    }]
  }], null, null);
})();
var MatStepperIntl = class _MatStepperIntl {
  constructor() {
    this.changes = new Subject();
    this.optionalLabel = "Optional";
    this.completedLabel = "Completed";
    this.editableLabel = "Editable";
  }
  static {
    this.\u0275fac = function MatStepperIntl_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperIntl)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _MatStepperIntl,
      factory: _MatStepperIntl.\u0275fac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIntl, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatStepperIntl();
}
var MAT_STEPPER_INTL_PROVIDER = {
  provide: MatStepperIntl,
  deps: [[new Optional(), new SkipSelf(), MatStepperIntl]],
  useFactory: MAT_STEPPER_INTL_PROVIDER_FACTORY
};
var MatStepHeader = class _MatStepHeader extends CdkStepHeader {
  constructor(_intl, _focusMonitor, _elementRef, changeDetectorRef) {
    super(_elementRef);
    this._intl = _intl;
    this._focusMonitor = _focusMonitor;
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the step header. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
    return this.label instanceof MatStepLabel ? null : this.label;
  }
  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel() {
    return this.label instanceof MatStepLabel ? this.label : null;
  }
  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Template context variables that are exposed to the `matStepperIcon` instances. */
  _getIconContext() {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }
  _getDefaultTextForState(state2) {
    if (state2 == "number") {
      return `${this.index + 1}`;
    }
    if (state2 == "edit") {
      return "create";
    }
    if (state2 == "error") {
      return "warning";
    }
    return state2;
  }
  static {
    this.\u0275fac = function MatStepHeader_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepHeader)(\u0275\u0275directiveInject(MatStepperIntl), \u0275\u0275directiveInject(FocusMonitor), \u0275\u0275directiveInject(ElementRef), \u0275\u0275directiveInject(ChangeDetectorRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStepHeader,
      selectors: [["mat-step-header"]],
      hostAttrs: ["role", "tab", 1, "mat-step-header"],
      hostVars: 2,
      hostBindings: function MatStepHeader_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275classMap("mat-" + (ctx.color || "primary"));
        }
      },
      inputs: {
        state: "state",
        label: "label",
        errorMessage: "errorMessage",
        iconOverrides: "iconOverrides",
        index: "index",
        selected: "selected",
        active: "active",
        optional: "optional",
        disableRipple: "disableRipple",
        color: "color"
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      decls: 10,
      vars: 17,
      consts: [["matRipple", "", 1, "mat-step-header-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mat-step-icon-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-step-label"], [1, "mat-step-text-label"], [1, "mat-step-optional"], [1, "mat-step-sub-label-error"], ["aria-hidden", "true"], [1, "cdk-visually-hidden"], [3, "ngTemplateOutlet"]],
      template: function MatStepHeader_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275element(0, "div", 0);
          \u0275\u0275elementStart(1, "div")(2, "div", 1);
          \u0275\u0275template(3, MatStepHeader_Conditional_3_Template, 1, 2, "ng-container", 2)(4, MatStepHeader_Conditional_4_Template, 2, 1);
          \u0275\u0275elementEnd()();
          \u0275\u0275elementStart(5, "div", 3);
          \u0275\u0275template(6, MatStepHeader_Conditional_6_Template, 2, 1, "div", 4)(7, MatStepHeader_Conditional_7_Template, 2, 1, "div", 4)(8, MatStepHeader_Conditional_8_Template, 2, 1, "div", 5)(9, MatStepHeader_Conditional_9_Template, 2, 1, "div", 6);
          \u0275\u0275elementEnd();
        }
        if (rf & 2) {
          let tmp_8_0;
          \u0275\u0275property("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disableRipple);
          \u0275\u0275advance();
          \u0275\u0275classMapInterpolate1("mat-step-icon-state-", ctx.state, " mat-step-icon");
          \u0275\u0275classProp("mat-step-icon-selected", ctx.selected);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.iconOverrides && ctx.iconOverrides[ctx.state] ? 3 : 4);
          \u0275\u0275advance(2);
          \u0275\u0275classProp("mat-step-label-active", ctx.active)("mat-step-label-selected", ctx.selected)("mat-step-label-error", ctx.state == "error");
          \u0275\u0275advance();
          \u0275\u0275conditional((tmp_8_0 = ctx._templateLabel()) ? 6 : ctx._stringLabel() ? 7 : -1, tmp_8_0);
          \u0275\u0275advance(2);
          \u0275\u0275conditional(ctx.optional && ctx.state != "error" ? 8 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional(ctx.state === "error" ? 9 : -1);
        }
      },
      dependencies: [MatRipple, NgTemplateOutlet, MatIcon],
      styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-app-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-app-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-app-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-app-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-app-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-app-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-app-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-app-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-app-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-app-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-app-on-primary))}'],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepHeader, [{
    type: Component,
    args: [{
      selector: "mat-step-header",
      host: {
        "class": "mat-step-header",
        "[class]": '"mat-" + (color || "primary")',
        "role": "tab"
      },
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [MatRipple, NgTemplateOutlet, MatIcon],
      template: `<div class="mat-step-header-ripple mat-focus-indicator" matRipple
     [matRippleTrigger]="_getHostElement()"
     [matRippleDisabled]="disableRipple"></div>

<div class="mat-step-icon-state-{{state}} mat-step-icon" [class.mat-step-icon-selected]="selected">
  <div class="mat-step-icon-content">
    @if (iconOverrides && iconOverrides[state]) {
      <ng-container
        [ngTemplateOutlet]="iconOverrides[state]"
        [ngTemplateOutletContext]="_getIconContext()"></ng-container>
    } @else {
      @switch (state) {
        @case ('number') {
          <span aria-hidden="true">{{_getDefaultTextForState(state)}}</span>
        }

        @default {
          @if (state === 'done') {
            <span class="cdk-visually-hidden">{{_intl.completedLabel}}</span>
          } @else if (state === 'edit') {
            <span class="cdk-visually-hidden">{{_intl.editableLabel}}</span>
          }

          <mat-icon aria-hidden="true">{{_getDefaultTextForState(state)}}</mat-icon>
        }
      }
    }
  </div>
</div>
<div class="mat-step-label"
     [class.mat-step-label-active]="active"
     [class.mat-step-label-selected]="selected"
     [class.mat-step-label-error]="state == 'error'">
  @if (_templateLabel(); as templateLabel) {
    <!-- If there is a label template, use it. -->
    <div class="mat-step-text-label">
      <ng-container [ngTemplateOutlet]="templateLabel.template"></ng-container>
    </div>
  } @else if (_stringLabel()) {
    <!-- If there is no label template, fall back to the text label. -->
    <div class="mat-step-text-label">{{label}}</div>
  }

  @if (optional && state != 'error') {
    <div class="mat-step-optional">{{_intl.optionalLabel}}</div>
  }

  @if (state === 'error') {
    <div class="mat-step-sub-label-error">{{errorMessage}}</div>
  }
</div>

`,
      styles: ['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-app-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-app-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-app-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-app-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-app-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-app-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-app-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-app-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-app-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-app-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-app-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-app-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-app-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-app-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-app-on-primary))}']
    }]
  }], () => [{
    type: MatStepperIntl
  }, {
    type: FocusMonitor
  }, {
    type: ElementRef
  }, {
    type: ChangeDetectorRef
  }], {
    state: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    errorMessage: [{
      type: Input
    }],
    iconOverrides: [{
      type: Input
    }],
    index: [{
      type: Input
    }],
    selected: [{
      type: Input
    }],
    active: [{
      type: Input
    }],
    optional: [{
      type: Input
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }]
  });
})();
var DEFAULT_HORIZONTAL_ANIMATION_DURATION = "500ms";
var DEFAULT_VERTICAL_ANIMATION_DURATION = "225ms";
var matStepperAnimations = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: trigger("horizontalStepTransition", [
    state("previous", style({
      transform: "translate3d(-100%, 0, 0)",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      transform: "none",
      visibility: "inherit"
    })),
    state("next", style({
      transform: "translate3d(100%, 0, 0)",
      visibility: "hidden"
    })),
    transition("* => *", group([animate("{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_HORIZONTAL_ANIMATION_DURATION
      }
    })
  ]),
  /** Animation that transitions the step along the Y axis in a vertical stepper. */
  verticalStepTransition: trigger("verticalStepTransition", [
    state("previous", style({
      height: "0px",
      visibility: "hidden"
    })),
    state("next", style({
      height: "0px",
      visibility: "hidden"
    })),
    // Transition to `inherit`, rather than `visible`,
    // because visibility on a child element the one from the parent,
    // making this element focusable inside of a `hidden` element.
    state("current", style({
      height: "*",
      visibility: "inherit"
    })),
    transition("* <=> current", group([animate("{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)"), query("@*", animateChild(), {
      optional: true
    })]), {
      params: {
        "animationDuration": DEFAULT_VERTICAL_ANIMATION_DURATION
      }
    })
  ])
};
var MatStepperIcon = class _MatStepperIcon {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static {
    this.\u0275fac = function MatStepperIcon_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperIcon)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperIcon,
      selectors: [["ng-template", "matStepperIcon", ""]],
      inputs: {
        name: [0, "matStepperIcon", "name"]
      },
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperIcon, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepperIcon]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], {
    name: [{
      type: Input,
      args: ["matStepperIcon"]
    }]
  });
})();
var MatStepContent = class _MatStepContent {
  constructor(_template) {
    this._template = _template;
  }
  static {
    this.\u0275fac = function MatStepContent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepContent)(\u0275\u0275directiveInject(TemplateRef));
    };
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepContent,
      selectors: [["ng-template", "matStepContent", ""]],
      standalone: true
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepContent, [{
    type: Directive,
    args: [{
      selector: "ng-template[matStepContent]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var MatStep = class _MatStep extends CdkStep {
  constructor(stepper, _errorStateMatcher, _viewContainerRef, stepperOptions) {
    super(stepper, stepperOptions);
    this._errorStateMatcher = _errorStateMatcher;
    this._viewContainerRef = _viewContainerRef;
    this._isSelected = Subscription.EMPTY;
    this.stepLabel = void 0;
  }
  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes.pipe(switchMap(() => {
      return this._stepper.selectionChange.pipe(map((event) => event.selectedStep === this), startWith(this._stepper.selected === this));
    })).subscribe((isSelected) => {
      if (isSelected && this._lazyContent && !this._portal) {
        this._portal = new TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      }
    });
  }
  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control, form) {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }
  static {
    this.\u0275fac = function MatStep_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStep)(\u0275\u0275directiveInject(forwardRef(() => MatStepper)), \u0275\u0275directiveInject(ErrorStateMatcher, 4), \u0275\u0275directiveInject(ViewContainerRef), \u0275\u0275directiveInject(STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStep,
      selectors: [["mat-step"]],
      contentQueries: function MatStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatStepLabel, 5);
          \u0275\u0275contentQuery(dirIndex, MatStepContent, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stepLabel = _t.first);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._lazyContent = _t.first);
        }
      },
      hostAttrs: ["hidden", ""],
      inputs: {
        color: "color"
      },
      exportAs: ["matStep"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: ErrorStateMatcher,
        useExisting: _MatStep
      }, {
        provide: CdkStep,
        useExisting: _MatStep
      }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c02,
      decls: 1,
      vars: 0,
      consts: [[3, "cdkPortalOutlet"]],
      template: function MatStep_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, MatStep_ng_template_0_Template, 2, 1, "ng-template");
        }
      },
      dependencies: [CdkPortalOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStep, [{
    type: Component,
    args: [{
      selector: "mat-step",
      providers: [{
        provide: ErrorStateMatcher,
        useExisting: MatStep
      }, {
        provide: CdkStep,
        useExisting: MatStep
      }],
      encapsulation: ViewEncapsulation$1.None,
      exportAs: "matStep",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [CdkPortalOutlet],
      host: {
        "hidden": ""
        // Hide the steps so they don't affect the layout.
      },
      template: '<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]="_portal"></ng-template>\n</ng-template>\n'
    }]
  }], () => [{
    type: MatStepper,
    decorators: [{
      type: Inject,
      args: [forwardRef(() => MatStepper)]
    }]
  }, {
    type: ErrorStateMatcher,
    decorators: [{
      type: SkipSelf
    }]
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: ContentChild,
      args: [MatStepLabel]
    }],
    color: [{
      type: Input
    }],
    _lazyContent: [{
      type: ContentChild,
      args: [MatStepContent, {
        static: false
      }]
    }]
  });
})();
var MatStepper = class _MatStepper extends CdkStepper {
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value) ? value + "ms" : value;
  }
  constructor(dir, changeDetectorRef, elementRef) {
    super(dir, changeDetectorRef, elementRef);
    this._stepHeader = void 0;
    this._steps = void 0;
    this.steps = new QueryList();
    this.animationDone = new EventEmitter();
    this.labelPosition = "end";
    this.headerPosition = "top";
    this._iconOverrides = {};
    this._animationDone = new Subject();
    this._animationDuration = "";
    this._isServer = !inject(Platform).isBrowser;
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === "mat-vertical-stepper" ? "vertical" : "horizontal";
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._icons.forEach(({
      name,
      templateRef
    }) => this._iconOverrides[name] = templateRef);
    this.steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      if (event.toState === "current") {
        this.animationDone.emit();
      }
    });
  }
  _stepIsNavigable(index, step) {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
  _getAnimationDuration() {
    if (this.animationDuration) {
      return this.animationDuration;
    }
    return this.orientation === "horizontal" ? DEFAULT_HORIZONTAL_ANIMATION_DURATION : DEFAULT_VERTICAL_ANIMATION_DURATION;
  }
  static {
    this.\u0275fac = function MatStepper_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepper)(\u0275\u0275directiveInject(Directionality, 8), \u0275\u0275directiveInject(ChangeDetectorRef), \u0275\u0275directiveInject(ElementRef));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _MatStepper,
      selectors: [["mat-stepper"], ["mat-vertical-stepper"], ["mat-horizontal-stepper"], ["", "matStepper", ""]],
      contentQueries: function MatStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          \u0275\u0275contentQuery(dirIndex, MatStep, 5);
          \u0275\u0275contentQuery(dirIndex, MatStepperIcon, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._steps = _t);
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._icons = _t);
        }
      },
      viewQuery: function MatStepper_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuery(MatStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx._stepHeader = _t);
        }
      },
      hostAttrs: ["role", "tablist"],
      hostVars: 11,
      hostBindings: function MatStepper_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275attribute("aria-orientation", ctx.orientation);
          \u0275\u0275classProp("mat-stepper-horizontal", ctx.orientation === "horizontal")("mat-stepper-vertical", ctx.orientation === "vertical")("mat-stepper-label-position-end", ctx.orientation === "horizontal" && ctx.labelPosition == "end")("mat-stepper-label-position-bottom", ctx.orientation === "horizontal" && ctx.labelPosition == "bottom")("mat-stepper-header-position-bottom", ctx.headerPosition === "bottom");
        }
      },
      inputs: {
        disableRipple: "disableRipple",
        color: "color",
        labelPosition: "labelPosition",
        headerPosition: "headerPosition",
        animationDuration: "animationDuration"
      },
      outputs: {
        animationDone: "animationDone"
      },
      exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"],
      standalone: true,
      features: [\u0275\u0275ProvidersFeature([{
        provide: CdkStepper,
        useExisting: _MatStepper
      }]), \u0275\u0275InheritDefinitionFeature, \u0275\u0275StandaloneFeature],
      ngContentSelectors: _c02,
      decls: 5,
      vars: 2,
      consts: [["stepTemplate", ""], [1, "mat-horizontal-stepper-wrapper"], [1, "mat-horizontal-stepper-header-container"], [1, "mat-horizontal-content-container"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id", "mat-horizontal-stepper-content-inactive"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-stepper-horizontal-line"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id"], [3, "ngTemplateOutlet"], [1, "mat-step"], [1, "mat-vertical-content-container"], ["role", "tabpanel", 1, "mat-vertical-stepper-content", 3, "id"], [1, "mat-vertical-content"], [3, "click", "keydown", "tabIndex", "id", "index", "state", "label", "selected", "active", "optional", "errorMessage", "iconOverrides", "disableRipple", "color"]],
      template: function MatStepper_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275projectionDef();
          \u0275\u0275template(0, MatStepper_Conditional_0_Template, 1, 0)(1, MatStepper_Case_1_Template, 7, 0, "div", 1)(2, MatStepper_Case_2_Template, 2, 0)(3, MatStepper_ng_template_3_Template, 1, 23, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
        }
        if (rf & 2) {
          let tmp_2_0;
          \u0275\u0275conditional(ctx._isServer ? 0 : -1);
          \u0275\u0275advance();
          \u0275\u0275conditional((tmp_2_0 = ctx.orientation) === "horizontal" ? 1 : tmp_2_0 === "vertical" ? 2 : -1);
        }
      },
      dependencies: [NgTemplateOutlet, MatStepHeader],
      styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-app-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-app-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-app-outline));top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}'],
      encapsulation: 2,
      data: {
        animation: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition]
      },
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepper, [{
    type: Component,
    args: [{
      selector: "mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]",
      exportAs: "matStepper, matVerticalStepper, matHorizontalStepper",
      host: {
        "[class.mat-stepper-horizontal]": 'orientation === "horizontal"',
        "[class.mat-stepper-vertical]": 'orientation === "vertical"',
        "[class.mat-stepper-label-position-end]": 'orientation === "horizontal" && labelPosition == "end"',
        "[class.mat-stepper-label-position-bottom]": 'orientation === "horizontal" && labelPosition == "bottom"',
        "[class.mat-stepper-header-position-bottom]": 'headerPosition === "bottom"',
        "[attr.aria-orientation]": "orientation",
        "role": "tablist"
      },
      animations: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition],
      providers: [{
        provide: CdkStepper,
        useExisting: MatStepper
      }],
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [NgTemplateOutlet, MatStepHeader],
      template: `<!--
  We need to project the content somewhere to avoid hydration errors. Some observations:
  1. This is only necessary on the server.
  2. We get a hydration error if there aren't any nodes after the \`ng-content\`.
  3. We get a hydration error if \`ng-content\` is wrapped in another element.
-->
@if (_isServer) {
  <ng-content/>
}

@switch (orientation) {
  @case ('horizontal') {
    <div class="mat-horizontal-stepper-wrapper">
      <div class="mat-horizontal-stepper-header-container">
        @for (step of steps; track step; let i = $index, isLast = $last) {
          <ng-container
            [ngTemplateOutlet]="stepTemplate"
            [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
          @if (!isLast) {
            <div class="mat-stepper-horizontal-line"></div>
          }
        }
      </div>

      <div class="mat-horizontal-content-container">
        @for (step of steps; track step; let i = $index) {
          <div class="mat-horizontal-stepper-content" role="tabpanel"
               [@horizontalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@horizontalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-horizontal-stepper-content-inactive]="selectedIndex !== i">
            <ng-container [ngTemplateOutlet]="step.content"></ng-container>
          </div>
        }
      </div>
    </div>
  }

  @case ('vertical') {
    @for (step of steps; track step; let i = $index, isLast = $last) {
      <div class="mat-step">
        <ng-container
          [ngTemplateOutlet]="stepTemplate"
          [ngTemplateOutletContext]="{step: step, i: i}"></ng-container>
        <div class="mat-vertical-content-container" [class.mat-stepper-vertical-line]="!isLast">
          <div class="mat-vertical-stepper-content" role="tabpanel"
               [@verticalStepTransition]="{
                  'value': _getAnimationDirection(i),
                  'params': {'animationDuration': _getAnimationDuration()}
                }"
               (@verticalStepTransition.done)="_animationDone.next($event)"
               [id]="_getStepContentId(i)"
               [attr.aria-labelledby]="_getStepLabelId(i)"
               [class.mat-vertical-stepper-content-inactive]="selectedIndex !== i">
            <div class="mat-vertical-content">
              <ng-container [ngTemplateOutlet]="step.content"></ng-container>
            </div>
          </div>
        </div>
      </div>
    }
  }
}

<!-- Common step templating -->
<ng-template let-step="step" let-i="i" #stepTemplate>
  <mat-step-header
    [class.mat-horizontal-stepper-header]="orientation === 'horizontal'"
    [class.mat-vertical-stepper-header]="orientation === 'vertical'"
    (click)="step.select()"
    (keydown)="_onKeydown($event)"
    [tabIndex]="_getFocusIndex() === i ? 0 : -1"
    [id]="_getStepLabelId(i)"
    [attr.aria-posinset]="i + 1"
    [attr.aria-setsize]="steps.length"
    [attr.aria-controls]="_getStepContentId(i)"
    [attr.aria-selected]="selectedIndex == i"
    [attr.aria-label]="step.ariaLabel || null"
    [attr.aria-labelledby]="(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null"
    [attr.aria-disabled]="_stepIsNavigable(i, step) ? null : true"
    [index]="i"
    [state]="_getIndicatorType(i, step.state)"
    [label]="step.stepLabel || step.label"
    [selected]="selectedIndex === i"
    [active]="_stepIsNavigable(i, step)"
    [optional]="step.optional"
    [errorMessage]="step.errorMessage"
    [iconOverrides]="_iconOverrides"
    [disableRipple]="disableRipple || !_stepIsNavigable(i, step)"
    [color]="step.color || color"></mat-step-header>
</ng-template>
`,
      styles: ['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-app-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-app-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-app-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-app-outline));top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}']
    }]
  }], () => [{
    type: Directionality,
    decorators: [{
      type: Optional
    }]
  }, {
    type: ChangeDetectorRef
  }, {
    type: ElementRef
  }], {
    _stepHeader: [{
      type: ViewChildren,
      args: [MatStepHeader]
    }],
    _steps: [{
      type: ContentChildren,
      args: [MatStep, {
        descendants: true
      }]
    }],
    _icons: [{
      type: ContentChildren,
      args: [MatStepperIcon, {
        descendants: true
      }]
    }],
    animationDone: [{
      type: Output
    }],
    disableRipple: [{
      type: Input
    }],
    color: [{
      type: Input
    }],
    labelPosition: [{
      type: Input
    }],
    headerPosition: [{
      type: Input
    }],
    animationDuration: [{
      type: Input
    }]
  });
})();
var MatStepperNext = class _MatStepperNext extends CdkStepperNext {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepperNext_BaseFactory;
      return function MatStepperNext_Factory(__ngFactoryType__) {
        return (\u0275MatStepperNext_BaseFactory || (\u0275MatStepperNext_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperNext)))(__ngFactoryType__ || _MatStepperNext);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperNext,
      selectors: [["button", "matStepperNext", ""]],
      hostAttrs: [1, "mat-stepper-next"],
      hostVars: 1,
      hostBindings: function MatStepperNext_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperNext, [{
    type: Directive,
    args: [{
      selector: "button[matStepperNext]",
      host: {
        "class": "mat-stepper-next",
        "[type]": "type"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatStepperPrevious = class _MatStepperPrevious extends CdkStepperPrevious {
  static {
    this.\u0275fac = /* @__PURE__ */ (() => {
      let \u0275MatStepperPrevious_BaseFactory;
      return function MatStepperPrevious_Factory(__ngFactoryType__) {
        return (\u0275MatStepperPrevious_BaseFactory || (\u0275MatStepperPrevious_BaseFactory = \u0275\u0275getInheritedFactory(_MatStepperPrevious)))(__ngFactoryType__ || _MatStepperPrevious);
      };
    })();
  }
  static {
    this.\u0275dir = /* @__PURE__ */ \u0275\u0275defineDirective({
      type: _MatStepperPrevious,
      selectors: [["button", "matStepperPrevious", ""]],
      hostAttrs: [1, "mat-stepper-previous"],
      hostVars: 1,
      hostBindings: function MatStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 2) {
          \u0275\u0275hostProperty("type", ctx.type);
        }
      },
      standalone: true,
      features: [\u0275\u0275InheritDefinitionFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperPrevious, [{
    type: Directive,
    args: [{
      selector: "button[matStepperPrevious]",
      host: {
        "class": "mat-stepper-previous",
        "[type]": "type"
      },
      standalone: true
    }]
  }], null, null);
})();
var MatStepperModule = class _MatStepperModule {
  static {
    this.\u0275fac = function MatStepperModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MatStepperModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _MatStepperModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
      imports: [MatCommonModule, CommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStepper, MatStepHeader, MatCommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatStepperModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, CommonModule, PortalModule, CdkStepperModule, MatIconModule, MatRippleModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      exports: [MatCommonModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      providers: [MAT_STEPPER_INTL_PROVIDER, ErrorStateMatcher]
    }]
  }], null, null);
})();

// node_modules/@stripe/stripe-js/dist/index.mjs
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
var RELEASE_TRAIN = "clover";
var runtimeVersionToUrlVersion = function runtimeVersionToUrlVersion2(version) {
  return version === 3 ? "v3" : version;
};
var ORIGIN = "https://js.stripe.com";
var STRIPE_JS_URL = "".concat(ORIGIN, "/").concat(RELEASE_TRAIN, "/stripe.js");
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var STRIPE_JS_URL_REGEX = /^https:\/\/js\.stripe\.com\/(v3|[a-z]+)\/stripe\.js(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
var isStripeJSURL = function isStripeJSURL2(url) {
  return V3_URL_REGEX.test(url) || STRIPE_JS_URL_REGEX.test(url);
};
var findScript = function findScript2() {
  var scripts = document.querySelectorAll('script[src^="'.concat(ORIGIN, '"]'));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!isStripeJSURL(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript2(params) {
  var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
  var script = document.createElement("script");
  script.src = "".concat(STRIPE_JS_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper2(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: "stripe-js",
    version: "8.7.0",
    startTime
  });
};
var stripePromise$1 = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError2(reject) {
  return function(cause) {
    reject(new Error("Failed to load Stripe.js", {
      cause
    }));
  };
};
var onLoad = function onLoad2(resolve, reject) {
  return function() {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error("Stripe.js not available"));
    }
  };
};
var loadScript = function loadScript2(params) {
  if (stripePromise$1 !== null) {
    return stripePromise$1;
  }
  stripePromise$1 = new Promise(function(resolve, reject) {
    if (typeof window === "undefined" || typeof document === "undefined") {
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;
        script.removeEventListener("load", onLoadListener);
        script.removeEventListener("error", onErrorListener);
        (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener("load", onLoadListener);
      script.addEventListener("error", onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  return stripePromise$1["catch"](function(error) {
    stripePromise$1 = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe2(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var pk = args[0];
  if (typeof pk !== "string") {
    throw new Error("Expected publishable key to be of type string, got type ".concat(_typeof(pk), " instead."));
  }
  var isTestKey = pk.match(/^pk_test/);
  var version = runtimeVersionToUrlVersion(maybeStripe.version);
  var expectedVersion = RELEASE_TRAIN;
  if (isTestKey && version !== expectedVersion) {
    console.warn("Stripe.js@".concat(version, " was loaded on the page, but @stripe/stripe-js@").concat("8.7.0", " expected Stripe.js@").concat(expectedVersion, ". This may result in unexpected behavior. For more information, see https://docs.stripe.com/sdks/stripejs-versioning"));
  }
  var stripe = maybeStripe.apply(void 0, args);
  registerWrapper(stripe, startTime);
  return stripe;
};
var stripePromise;
var loadCalled = false;
var getStripePromise = function getStripePromise2() {
  if (stripePromise) {
    return stripePromise;
  }
  stripePromise = loadScript(null)["catch"](function(error) {
    stripePromise = null;
    return Promise.reject(error);
  });
  return stripePromise;
};
Promise.resolve().then(function() {
  return getStripePromise();
})["catch"](function(error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe2() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now();
  return getStripePromise().then(function(maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};

// src/app/core/services/payment.service.ts
var PaymentService = class _PaymentService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/payments`;
    this.stripe$ = null;
  }
  getStripeConfig() {
    return this.http.get(`${this.apiUrl}/stripe/config`);
  }
  getStripe() {
    if (!this.stripe$) {
      this.stripe$ = this.getStripeConfig().pipe(switchMap((res) => {
        const key = res.data.publishableKey;
        if (!key)
          return of(null);
        return from(loadStripe(key));
      }), shareReplay(1));
    }
    return this.stripe$;
  }
  createPaymentIntent(amount) {
    return this.http.post(`${this.apiUrl}/stripe/create-intent`, { amount });
  }
  // PayPal methods
  getPayPalConfig() {
    return this.http.get(`${this.apiUrl}/paypal/config`);
  }
  loadPayPalSdk(clientId) {
    return new Promise((resolve, reject) => {
      if (window.paypal) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=MXN`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
      document.head.appendChild(script);
    });
  }
  createPayPalOrder(amount) {
    return this.http.post(`${this.apiUrl}/paypal/create-order`, { amount });
  }
  capturePayPalOrder(orderId) {
    return this.http.post(`${this.apiUrl}/paypal/capture-order`, { orderId });
  }
  confirmPayPalPayment(orderNumber, captureId) {
    return this.http.post(`${this.apiUrl}/paypal/confirm-payment`, { orderNumber, captureId });
  }
  static {
    this.\u0275fac = function PaymentService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _PaymentService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PaymentService, factory: _PaymentService.\u0275fac, providedIn: "root" });
  }
};

// src/app/features/checkout/checkout.component.ts
var _c03 = ["stripeElement"];
var _c12 = ["paypalButtonContainer"];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.tempId;
function CheckoutComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 5)(1, "h3", 9);
    \u0275\u0275text(2, "Tus datos de contacto");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "form", 8)(4, "div", 31)(5, "mat-form-field", 32)(6, "mat-label");
    \u0275\u0275text(7, "Nombre");
    \u0275\u0275elementEnd();
    \u0275\u0275element(8, "input", 33);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-form-field", 32)(10, "mat-label");
    \u0275\u0275text(11, "Apellido");
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "input", 34);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "div", 31)(14, "mat-form-field", 32)(15, "mat-label");
    \u0275\u0275text(16, "Correo electr\xF3nico");
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "input", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-form-field", 32)(19, "mat-label");
    \u0275\u0275text(20, "Tel\xE9fono (opcional)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(21, "input", 36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("formGroup", ctx_r1.guestForm);
  }
}
function CheckoutComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Cargando opciones de env\xEDo...");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_11_Conditional_1_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectType("NATIONAL"));
    });
    \u0275\u0275elementStart(1, "span", 39);
    \u0275\u0275text(2, "\u{1F4E6}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "strong");
    \u0275\u0275text(5, "Env\xEDo Nacional");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "Precio calculado seg\xFAn distancia");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ((tmp_3_0 = ctx_r1.typeForm.get("shippingType")) == null ? null : tmp_3_0.value) === "NATIONAL");
  }
}
function CheckoutComponent_Conditional_11_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 38);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_11_Conditional_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.selectType("PICKUP"));
    });
    \u0275\u0275elementStart(1, "span", 39);
    \u0275\u0275text(2, "\u{1F3EA}");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 40)(4, "strong");
    \u0275\u0275text(5, "Pick Up");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("selected", ((tmp_3_0 = ctx_r1.typeForm.get("shippingType")) == null ? null : tmp_3_0.value) === "PICKUP");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Retira en uno de nuestros puntos \xB7 ", \u0275\u0275pipeBind1(8, 3, ctx_r1.shippingConfig == null ? null : ctx_r1.shippingConfig.pickupCost), "");
  }
}
function CheckoutComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275template(1, CheckoutComponent_Conditional_11_Conditional_1_Template, 8, 2, "div", 37)(2, CheckoutComponent_Conditional_11_Conditional_2_Template, 9, 5, "div", 37);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.shippingConfig == null ? null : ctx_r1.shippingConfig.nationalEnabled) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.shippingConfig == null ? null : ctx_r1.shippingConfig.pickupEnabled) ? 2 : -1);
  }
}
function CheckoutComponent_Conditional_16_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 47);
  }
}
function CheckoutComponent_Conditional_16_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.shippingCalcError);
  }
}
function CheckoutComponent_Conditional_16_Conditional_28_For_2_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rate_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", rate_r7.estimatedDays, " d\xEDa(s)");
  }
}
function CheckoutComponent_Conditional_16_Conditional_28_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_16_Conditional_28_For_2_Template_div_click_0_listener() {
      const rate_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectRate(rate_r7));
    });
    \u0275\u0275elementStart(1, "div", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 54);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, CheckoutComponent_Conditional_16_Conditional_28_For_2_Conditional_5_Template, 2, 1, "div", 55);
    \u0275\u0275elementStart(6, "div", 56);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rate_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classProp("rate-selected", (ctx_r1.selectedSkydropxRate == null ? null : ctx_r1.selectedSkydropxRate.id) === rate_r7.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rate_r7.carrier);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rate_r7.service);
    \u0275\u0275advance();
    \u0275\u0275conditional(rate_r7.estimatedDays ? 5 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 6, rate_r7.price));
  }
}
function CheckoutComponent_Conditional_16_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49);
    \u0275\u0275repeaterCreate(1, CheckoutComponent_Conditional_16_Conditional_28_For_2_Template, 9, 8, "div", 51, _forTrack0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.shippingRates.rates);
  }
}
function CheckoutComponent_Conditional_16_Conditional_29_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, ctx_r1.shippingRates.distanceKm, "1.1-1"), " km \u2014 ");
  }
}
function CheckoutComponent_Conditional_16_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 50)(1, "mat-icon");
    \u0275\u0275text(2, "location_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275template(4, CheckoutComponent_Conditional_16_Conditional_29_Conditional_4_Template, 2, 4);
    \u0275\u0275text(5, " Env\xEDo: ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(ctx_r1.shippingRates.distanceKm > 0 ? 4 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 2, ctx_r1.shippingRates.flatPrice));
  }
}
function CheckoutComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h3", 9);
    \u0275\u0275text(1, "Direcci\xF3n de entrega");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-form-field", 27)(3, "mat-label");
    \u0275\u0275text(4, "Direcci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "input", 41);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 31)(7, "mat-form-field", 32)(8, "mat-label");
    \u0275\u0275text(9, "Ciudad");
    \u0275\u0275elementEnd();
    \u0275\u0275element(10, "input", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "mat-form-field", 32)(12, "mat-label");
    \u0275\u0275text(13, "Estado");
    \u0275\u0275elementEnd();
    \u0275\u0275element(14, "input", 43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 31)(16, "mat-form-field", 32)(17, "mat-label");
    \u0275\u0275text(18, "C\xF3digo Postal");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "mat-form-field", 32)(21, "mat-label");
    \u0275\u0275text(22, "Pa\xEDs");
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "input", 45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "button", 46);
    \u0275\u0275listener("click", function CheckoutComponent_Conditional_16_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.calculateShipping());
    });
    \u0275\u0275template(25, CheckoutComponent_Conditional_16_Conditional_25_Template, 1, 0, "mat-spinner", 47);
    \u0275\u0275text(26, " Ver opciones de env\xEDo ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, CheckoutComponent_Conditional_16_Conditional_27_Template, 2, 1, "p", 48)(28, CheckoutComponent_Conditional_16_Conditional_28_Template, 3, 0, "div", 49)(29, CheckoutComponent_Conditional_16_Conditional_29_Template, 9, 4, "div", 50);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(24);
    \u0275\u0275property("disabled", !ctx_r1.isAddressReady() || ctx_r1.calculatingShipping);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.calculatingShipping ? 25 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.shippingCalcError ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r1.shippingRates == null ? null : ctx_r1.shippingRates.skydropxAvailable) && ctx_r1.shippingRates.rates.length > 0 ? 28 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.shippingRates && !ctx_r1.shippingRates.skydropxAvailable ? 29 : -1);
  }
}
function CheckoutComponent_Conditional_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Cargando puntos de retiro...");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const loc_r9 = ctx.$implicit;
    \u0275\u0275property("value", loc_r9.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", loc_r9.name, " \u2014 ", loc_r9.city, "");
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1, "Cargando fechas disponibles...");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_1_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Horario: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedTimeLabel);
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 27)(1, "mat-label");
    \u0275\u0275text(2, "Fecha de recolecci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 59);
    \u0275\u0275listener("dateChange", function CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_1_Template_input_dateChange_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.onPickupDateChange($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 60)(5, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_1_Conditional_7_Template, 7, 1, "div", 61);
  }
  if (rf & 2) {
    const picker_r11 = \u0275\u0275reference(6);
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", picker_r11)("matDatepickerFilter", ctx_r1.dateFilter)("min", ctx_r1.today);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r11);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.selectedTimeLabel ? 7 : -1);
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_0_Template, 2, 0, "p", 10)(1, CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Conditional_1_Template, 8, 5);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275conditional(ctx_r1.loadingDates ? 0 : 1);
  }
}
function CheckoutComponent_Conditional_17_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 27)(1, "mat-label");
    \u0275\u0275text(2, "Punto de retiro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 57);
    \u0275\u0275listener("selectionChange", function CheckoutComponent_Conditional_17_Conditional_3_Template_mat_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onLocationChange($event.value));
    });
    \u0275\u0275repeaterCreate(4, CheckoutComponent_Conditional_17_Conditional_3_For_5_Template, 2, 3, "mat-option", 58, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, CheckoutComponent_Conditional_17_Conditional_3_Conditional_6_Template, 2, 1);
    \u0275\u0275elementStart(7, "div", 50)(8, "mat-icon");
    \u0275\u0275text(9, "store");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span");
    \u0275\u0275text(11, "Costo de Pick Up: ");
    \u0275\u0275elementStart(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275pipe(14, "currency");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r1.pickupLocations);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.deliveryForm.get("pickupLocationId")) == null ? null : tmp_4_0.value) ? 6 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(14, 2, ctx_r1.shippingConfig == null ? null : ctx_r1.shippingConfig.pickupCost));
  }
}
function CheckoutComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h3", 9);
    \u0275\u0275text(1, "Selecciona punto de retiro");
    \u0275\u0275elementEnd();
    \u0275\u0275template(2, CheckoutComponent_Conditional_17_Conditional_2_Template, 2, 0, "p", 10)(3, CheckoutComponent_Conditional_17_Conditional_3_Template, 15, 4);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loadingLocations ? 2 : 3);
  }
}
function CheckoutComponent_Conditional_27_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r12.product.name, " x ", item_r12.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, item_r12.subtotal));
  }
}
function CheckoutComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CheckoutComponent_Conditional_27_For_1_Template, 6, 5, "div", 18, _forTrack0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.cart.items());
  }
}
function CheckoutComponent_Conditional_28_For_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r13.productName, " x ", item_r13.quantity, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 3, item_r13.subtotal));
  }
}
function CheckoutComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, CheckoutComponent_Conditional_28_For_1_Template, 6, 5, "div", 18, _forTrack1);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.cart.localItems());
  }
}
function CheckoutComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "currency");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("Cup\xF3n (", ctx_r1.cart.coupon().code, ") ", ctx_r1.cart.coupon().discountPercent, "% desc.");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind1(5, 3, ctx_r1.cart.discount()), "");
  }
}
function CheckoutComponent_Conditional_63_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62);
    \u0275\u0275text(1, " Completa tus datos de contacto (nombre y correo) para activar el pago con tarjeta. ");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_63_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "mat-spinner", 65);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando formulario de pago...");
    \u0275\u0275elementEnd()();
  }
}
function CheckoutComponent_Conditional_63_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.stripeError);
  }
}
function CheckoutComponent_Conditional_63_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CheckoutComponent_Conditional_63_Conditional_4_Conditional_0_Template, 4, 0, "div", 63);
    \u0275\u0275element(1, "div", null, 2);
    \u0275\u0275template(3, CheckoutComponent_Conditional_63_Conditional_4_Conditional_3_Template, 2, 1, "p", 64);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.stripeLoading ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.stripeError ? 3 : -1);
  }
}
function CheckoutComponent_Conditional_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 26)(1, "h4");
    \u0275\u0275text(2, "Datos de la tarjeta");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CheckoutComponent_Conditional_63_Conditional_3_Template, 2, 0, "p", 62)(4, CheckoutComponent_Conditional_63_Conditional_4_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.authService.isLoggedIn() && ctx_r1.guestForm.invalid ? 3 : 4);
  }
}
function CheckoutComponent_Conditional_64_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 62);
    \u0275\u0275text(1, " Completa tus datos de contacto (nombre y correo) para activar el pago con PayPal. ");
    \u0275\u0275elementEnd();
  }
}
function CheckoutComponent_Conditional_64_Conditional_4_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 63);
    \u0275\u0275element(1, "mat-spinner", 65);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Cargando PayPal...");
    \u0275\u0275elementEnd()();
  }
}
function CheckoutComponent_Conditional_64_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.paypalError);
  }
}
function CheckoutComponent_Conditional_64_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, CheckoutComponent_Conditional_64_Conditional_4_Conditional_0_Template, 4, 0, "div", 63);
    \u0275\u0275element(1, "div", null, 3);
    \u0275\u0275template(3, CheckoutComponent_Conditional_64_Conditional_4_Conditional_3_Template, 2, 1, "p", 64);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275conditional(ctx_r1.paypalLoading ? 0 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r1.paypalError ? 3 : -1);
  }
}
function CheckoutComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 26)(1, "h4");
    \u0275\u0275text(2, "PayPal");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, CheckoutComponent_Conditional_64_Conditional_3_Template, 2, 0, "p", 62)(4, CheckoutComponent_Conditional_64_Conditional_4_Template, 4, 2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275conditional(!ctx_r1.authService.isLoggedIn() && ctx_r1.guestForm.invalid ? 3 : 4);
  }
}
function CheckoutComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29);
    \u0275\u0275element(1, "mat-spinner", 66);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Procesando pago...");
    \u0275\u0275elementEnd()();
  }
}
var CheckoutComponent = class _CheckoutComponent {
  get shippingCostForSummary() {
    const type = this.typeForm.get("shippingType")?.value;
    if (type === "NATIONAL") {
      if (this.shippingRates?.skydropxAvailable)
        return this.selectedSkydropxRate?.price ?? 0;
      return this.shippingRates?.flatPrice ?? 0;
    }
    if (type === "PICKUP")
      return this.shippingConfig?.pickupCost ?? 0;
    return 0;
  }
  get shippingLabel() {
    const type = this.typeForm.get("shippingType")?.value;
    if (type === "NATIONAL") {
      if (this.selectedSkydropxRate) {
        return this.selectedSkydropxRate.carrier + " \u2013 " + this.selectedSkydropxRate.service;
      }
      return "Env\xEDo Nacional";
    }
    if (type === "PICKUP") {
      const locId = this.deliveryForm.get("pickupLocationId")?.value;
      const loc = this.pickupLocations.find((l) => l.id === locId);
      return loc ? "Pick Up \u2013 " + loc.name : "Pick Up";
    }
    return "";
  }
  get totalWithShipping() {
    return this.cart.total() + this.shippingCostForSummary;
  }
  constructor(fb, cart, authService, orderService, paymentService, shippingService, router, snackBar) {
    this.fb = fb;
    this.cart = cart;
    this.authService = authService;
    this.orderService = orderService;
    this.paymentService = paymentService;
    this.shippingService = shippingService;
    this.router = router;
    this.snackBar = snackBar;
    this.shippingConfig = null;
    this.loadingConfig = true;
    this.pickupLocations = [];
    this.loadingLocations = false;
    this.loadingDates = false;
    this.availableDates = /* @__PURE__ */ new Set();
    this.selectedTimeLabel = "";
    this.today = /* @__PURE__ */ new Date();
    this.shippingRates = null;
    this.selectedSkydropxRate = null;
    this.calculatingShipping = false;
    this.shippingCalcError = null;
    this.loading = false;
    this.processingPayment = false;
    this.stripeLoading = false;
    this.stripeError = null;
    this.stripeReady = false;
    this.paypalLoading = false;
    this.paypalError = null;
    this.paypalReady = false;
    this.savedOrderNumber = null;
    this.paypalMountRequested = false;
    this.paypalMounted = false;
    this.stripe = null;
    this.elements = null;
    this.clientSecret = null;
    this.paymentIntentId = null;
    this.stripeMountRequested = false;
    this.stripeMounted = false;
    this.dateFilter = (d) => {
      if (!d)
        return false;
      const iso = this.toIsoDate(d);
      return this.availableDates.has(iso);
    };
    this.guestForm = this.fb.group({
      guestFirstName: ["", Validators.required],
      guestLastName: ["", Validators.required],
      guestEmail: ["", [Validators.required, Validators.email]],
      guestPhone: [""]
    });
    this.typeForm = this.fb.group({
      shippingType: [null, Validators.required]
    });
    this.deliveryForm = this.fb.group({
      shippingAddress: [""],
      shippingCity: [""],
      shippingState: [""],
      shippingZipCode: [""],
      shippingCountry: [""],
      pickupLocationId: [null],
      pickupDate: [null]
    });
    this.paymentForm = this.fb.group({
      paymentMethod: ["stripe", Validators.required],
      notes: [""]
    });
    this.paymentForm.get("paymentMethod").valueChanges.subscribe((method) => {
      if (method !== "stripe")
        this.destroyStripeElement();
      if (method !== "paypal")
        this.destroyPayPalButtons();
    });
  }
  ngOnInit() {
    this.cart.loadCart();
    this.shippingService.getConfig().subscribe({
      next: (res) => {
        this.shippingConfig = res.data;
        this.loadingConfig = false;
      },
      error: () => this.loadingConfig = false
    });
  }
  ngAfterViewChecked() {
    if (this.stripeElementRef?.nativeElement && !this.stripeMounted && !this.stripeMountRequested && this.paymentForm.get("paymentMethod")?.value === "stripe" && (this.authService.isLoggedIn() || this.guestForm.valid)) {
      this.initStripeElement();
    }
    if (this.paypalButtonContainerRef?.nativeElement && !this.paypalMounted && !this.paypalMountRequested && this.paymentForm.get("paymentMethod")?.value === "paypal" && (this.authService.isLoggedIn() || this.guestForm.valid)) {
      this.initPayPalButtons();
    }
  }
  ngOnDestroy() {
    this.destroyStripeElement();
    this.destroyPayPalButtons();
  }
  selectType(type) {
    this.typeForm.patchValue({ shippingType: type });
    this.shippingRates = null;
    this.selectedSkydropxRate = null;
    this.shippingCalcError = null;
    if (type === "PICKUP" && this.pickupLocations.length === 0) {
      this.loadingLocations = true;
      this.shippingService.getPickupLocations().subscribe({
        next: (res) => {
          this.pickupLocations = res.data;
          this.loadingLocations = false;
        },
        error: () => this.loadingLocations = false
      });
    }
    const addressFields = ["shippingAddress", "shippingCity", "shippingCountry"];
    const pickupFields = ["pickupLocationId", "pickupDate"];
    if (type === "NATIONAL") {
      addressFields.forEach((f) => this.deliveryForm.get(f)?.setValidators(Validators.required));
      pickupFields.forEach((f) => this.deliveryForm.get(f)?.clearValidators());
    } else {
      addressFields.forEach((f) => this.deliveryForm.get(f)?.clearValidators());
      pickupFields.forEach((f) => this.deliveryForm.get(f)?.setValidators(Validators.required));
    }
    [...addressFields, ...pickupFields].forEach((f) => this.deliveryForm.get(f)?.updateValueAndValidity());
  }
  onLocationChange(locationId) {
    this.availableDates = /* @__PURE__ */ new Set();
    this.selectedTimeLabel = "";
    this.deliveryForm.patchValue({ pickupDate: null });
    if (!locationId)
      return;
    this.loadingDates = true;
    const from2 = this.toIsoDate(/* @__PURE__ */ new Date());
    const toDate = /* @__PURE__ */ new Date();
    toDate.setDate(toDate.getDate() + 60);
    const to = this.toIsoDate(toDate);
    this.orderService.getPickupAvailableDates(locationId, from2, to).subscribe({
      next: (res) => {
        this.availableDates = new Set(res.data);
        this.loadingDates = false;
      },
      error: () => this.loadingDates = false
    });
  }
  onPickupDateChange(date) {
    if (!date) {
      this.selectedTimeLabel = "";
      return;
    }
    const locationId = this.deliveryForm.get("pickupLocationId")?.value;
    if (!locationId)
      return;
    const iso = this.toIsoDate(date);
    const loc = this.pickupLocations.find((l) => l.id === locationId);
    this.selectedTimeLabel = iso;
  }
  toIsoDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  isAddressReady() {
    const v = this.deliveryForm.value;
    return !!(v.shippingAddress?.trim() && v.shippingCity?.trim() && v.shippingCountry?.trim());
  }
  calculateShipping() {
    if (!this.isAddressReady())
      return;
    this.calculatingShipping = true;
    this.shippingCalcError = null;
    this.shippingRates = null;
    this.selectedSkydropxRate = null;
    const v = this.deliveryForm.value;
    this.shippingService.calculateNational(v.shippingAddress, v.shippingCity, v.shippingState, v.shippingZipCode, v.shippingCountry).subscribe({
      next: (res) => {
        this.shippingRates = res.data;
        this.calculatingShipping = false;
        if (res.data.skydropxAvailable && res.data.rates.length === 1) {
          this.selectedSkydropxRate = res.data.rates[0];
        }
      },
      error: (err) => {
        this.calculatingShipping = false;
        this.shippingCalcError = err.error?.message || "No se pudo calcular el costo de env\xEDo.";
      }
    });
  }
  selectRate(rate) {
    this.selectedSkydropxRate = rate;
  }
  isDeliveryStepValid() {
    const type = this.typeForm.get("shippingType")?.value;
    if (type === "NATIONAL") {
      if (!this.isAddressReady() || !this.shippingRates)
        return false;
      if (this.shippingRates.skydropxAvailable)
        return !!this.selectedSkydropxRate;
      return true;
    }
    if (type === "PICKUP") {
      return !!(this.deliveryForm.get("pickupLocationId")?.value && this.deliveryForm.get("pickupDate")?.value);
    }
    return false;
  }
  initStripeElement() {
    this.stripeMountRequested = true;
    this.stripeLoading = true;
    this.stripeError = null;
    this.paymentService.getStripe().pipe(switchMap((stripe) => {
      this.stripe = stripe;
      if (!this.stripe)
        throw new Error("Stripe is not configured. Please use another payment method.");
      return this.paymentService.createPaymentIntent(this.totalWithShipping);
    })).subscribe({
      next: (intent) => {
        this.clientSecret = intent.data.clientSecret;
        this.paymentIntentId = intent.data.paymentIntentId;
        this.stripeLoading = false;
        if (!this.clientSecret || !this.stripeElementRef?.nativeElement) {
          this.stripeError = "Failed to initialize payment form.";
          return;
        }
        this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
        const paymentElement = this.elements.create("payment");
        paymentElement.mount(this.stripeElementRef.nativeElement);
        this.stripeMounted = true;
        paymentElement.on("ready", () => {
          this.stripeReady = true;
        });
        paymentElement.on("change", (event) => {
          this.stripeError = event.error?.message ?? null;
        });
      },
      error: (err) => {
        this.stripeLoading = false;
        this.stripeMountRequested = false;
        this.stripeError = err.error?.message || err.message || "Failed to load payment form.";
      }
    });
  }
  destroyStripeElement() {
    this.elements = null;
    this.stripeReady = false;
    this.clientSecret = null;
    this.stripeMounted = false;
    this.stripeMountRequested = false;
  }
  isPaymentStepValid() {
    const method = this.paymentForm.get("paymentMethod")?.value;
    if (method === "stripe")
      return this.stripeReady;
    if (method === "paypal")
      return this.paypalReady;
    return this.paymentForm.valid;
  }
  initPayPalButtons() {
    this.paypalMountRequested = true;
    this.paypalLoading = true;
    this.paypalError = null;
    this.paymentService.getPayPalConfig().subscribe({
      next: (res) => {
        const clientId = res.data.clientId;
        if (!clientId) {
          this.paypalLoading = false;
          this.paypalError = "PayPal is not configured.";
          this.paypalMountRequested = false;
          return;
        }
        this.paymentService.loadPayPalSdk(clientId).then(() => {
          this.paypalLoading = false;
          this.renderPayPalButtons();
        }).catch(() => {
          this.paypalLoading = false;
          this.paypalError = "Failed to load PayPal SDK.";
          this.paypalMountRequested = false;
        });
      },
      error: () => {
        this.paypalLoading = false;
        this.paypalError = "Failed to get PayPal configuration.";
        this.paypalMountRequested = false;
      }
    });
  }
  renderPayPalButtons() {
    const paypal = window.paypal;
    if (!paypal || !this.paypalButtonContainerRef?.nativeElement) {
      this.paypalError = "PayPal SDK not available.";
      return;
    }
    paypal.Buttons({
      createOrder: (_data, _actions) => {
        return new Promise((resolve, reject) => {
          this.paymentService.createPayPalOrder(this.totalWithShipping).subscribe({
            next: (res) => resolve(res.data.orderId),
            error: (err) => reject(err)
          });
        });
      },
      onApprove: (data, _actions) => {
        this.processingPayment = true;
        this.paymentService.capturePayPalOrder(data.orderID).subscribe({
          next: (res) => {
            const captureId = res.data.captureId || res.data.orderId;
            this.submitOrder(captureId, () => {
              const orderNumber = this.savedOrderNumber;
              this.paymentService.confirmPayPalPayment(orderNumber, captureId).subscribe({
                next: () => {
                  this.processingPayment = false;
                  this.onOrderSuccess(orderNumber);
                },
                error: () => {
                  this.processingPayment = false;
                  this.onOrderSuccess(orderNumber);
                }
              });
            });
          },
          error: (err) => {
            this.processingPayment = false;
            this.snackBar.open(err.error?.message || "Error al procesar PayPal", "Cerrar", { duration: 5e3 });
          }
        });
      },
      onError: (err) => {
        this.paypalError = "El pago con PayPal fall\xF3. Intenta de nuevo.";
        console.error("PayPal error:", err);
      }
    }).render(this.paypalButtonContainerRef.nativeElement);
    this.paypalMounted = true;
    this.paypalReady = true;
  }
  destroyPayPalButtons() {
    this.paypalReady = false;
    this.paypalMounted = false;
    this.paypalMountRequested = false;
    this.paypalError = null;
  }
  placeOrder() {
    this.loading = true;
    const method = this.paymentForm.get("paymentMethod")?.value;
    if (method === "stripe") {
      this.processStripePayment();
    } else if (method === "paypal") {
      this.loading = false;
    }
  }
  processStripePayment() {
    if (!this.stripe || !this.elements || !this.paymentIntentId) {
      this.snackBar.open("Formulario de pago no listo. Espera e intenta de nuevo.", "Cerrar", { duration: 5e3 });
      this.loading = false;
      return;
    }
    this.submitOrder(this.paymentIntentId, () => this.confirmStripePayment());
  }
  confirmStripePayment() {
    return __async(this, null, function* () {
      this.processingPayment = true;
      const { error, paymentIntent } = yield this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: { return_url: window.location.origin + "/orders" },
        redirect: "if_required"
      });
      this.processingPayment = false;
      if (error) {
        this.loading = false;
        this.onOrderSuccess(this.savedOrderNumber);
        this.snackBar.open(error.message || "Pago fallido. Tu pedido se actualizar\xE1 autom\xE1ticamente.", "Cerrar", { duration: 5e3 });
      } else if (paymentIntent) {
        if (paymentIntent.status === "succeeded" || paymentIntent.status === "processing" || paymentIntent.status === "requires_capture") {
          const msg = paymentIntent.status === "succeeded" ? "\xA1Pedido realizado con \xE9xito!" : "El pago est\xE1 siendo procesado. Tu pedido se confirmar\xE1 en breve.";
          this.snackBar.open(msg, "Cerrar", { duration: 5e3 });
          this.onOrderSuccess(this.savedOrderNumber);
        } else {
          this.loading = false;
          this.snackBar.open("El pago no se complet\xF3. Intenta de nuevo.", "Cerrar", { duration: 5e3 });
        }
      } else {
        this.loading = false;
        this.snackBar.open("El pago no se complet\xF3. Intenta de nuevo.", "Cerrar", { duration: 5e3 });
      }
    });
  }
  onOrderSuccess(orderNumber) {
    if (this.authService.isLoggedIn()) {
      this.cart.resetLocalCart();
      this.router.navigate(["/orders", orderNumber]);
    } else {
      const email = this.guestForm.get("guestEmail")?.value;
      const total = this.totalWithShipping;
      this.cart.clearLocalCart();
      this.router.navigate(["/confirmacion"], { state: { orderNumber, email, total } });
    }
  }
  submitOrder(paymentId, onOrderCreated) {
    const type = this.typeForm.get("shippingType")?.value;
    const v = this.deliveryForm.value;
    if (!this.authService.isLoggedIn()) {
      this.submitGuestOrder(paymentId, onOrderCreated);
      return;
    }
    const couponCode = this.cart.coupon()?.code;
    let request = __spreadValues(__spreadValues({
      paymentMethod: this.paymentForm.get("paymentMethod")?.value,
      notes: this.paymentForm.get("notes")?.value,
      shippingType: type
    }, paymentId && { paymentId }), couponCode && { couponCode });
    if (type === "NATIONAL") {
      request = __spreadValues(__spreadProps(__spreadValues({}, request), {
        shippingAddress: v.shippingAddress,
        shippingCity: v.shippingCity,
        shippingState: v.shippingState,
        shippingZipCode: v.shippingZipCode,
        shippingCountry: v.shippingCountry
      }), this.selectedSkydropxRate && { skydropxRateId: this.selectedSkydropxRate.id });
    } else if (type === "PICKUP") {
      const pickupDateObj = v.pickupDate;
      request = __spreadValues(__spreadProps(__spreadValues({}, request), {
        pickupLocationId: v.pickupLocationId
      }), pickupDateObj && { pickupDate: this.toIsoDate(pickupDateObj) });
    }
    this.orderService.createOrder(request).subscribe({
      next: (res) => {
        if (onOrderCreated) {
          this.savedOrderNumber = res.data.orderNumber;
          onOrderCreated();
        } else {
          this.cart.resetLocalCart();
          this.snackBar.open("\xA1Pedido realizado con \xE9xito!", "Cerrar", { duration: 5e3 });
          this.router.navigate(["/orders", res.data.orderNumber]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Error al realizar el pedido", "Cerrar", { duration: 5e3 });
      }
    });
  }
  submitGuestOrder(paymentId, onOrderCreated) {
    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched();
      this.loading = false;
      this.snackBar.open("Por favor completa tus datos de contacto", "Cerrar", { duration: 3e3 });
      return;
    }
    const type = this.typeForm.get("shippingType")?.value;
    const v = this.deliveryForm.value;
    const g = this.guestForm.value;
    const items = this.cart.localItems().map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      sizeId: item.selectedSizeId,
      colorName: item.selectedColorName
    }));
    let request = __spreadValues({
      guestFirstName: g.guestFirstName,
      guestLastName: g.guestLastName,
      guestEmail: g.guestEmail,
      guestPhone: g.guestPhone || void 0,
      items,
      paymentMethod: this.paymentForm.get("paymentMethod")?.value,
      notes: this.paymentForm.get("notes")?.value || void 0,
      shippingType: type
    }, paymentId && { paymentId });
    if (type === "NATIONAL") {
      request = __spreadValues(__spreadProps(__spreadValues({}, request), {
        shippingAddress: v.shippingAddress,
        shippingCity: v.shippingCity,
        shippingState: v.shippingState,
        shippingZipCode: v.shippingZipCode,
        shippingCountry: v.shippingCountry
      }), this.selectedSkydropxRate && { skydropxRateId: this.selectedSkydropxRate.id });
    } else if (type === "PICKUP") {
      const pickupDateObj = v.pickupDate;
      request = __spreadValues(__spreadProps(__spreadValues({}, request), {
        pickupLocationId: v.pickupLocationId
      }), pickupDateObj && { pickupDate: this.toIsoDate(pickupDateObj) });
    }
    this.orderService.createGuestOrder(request).subscribe({
      next: (res) => {
        if (onOrderCreated) {
          this.savedOrderNumber = res.data.orderNumber;
          onOrderCreated();
        } else {
          this.snackBar.open("\xA1Pedido realizado con \xE9xito!", "Cerrar", { duration: 5e3 });
          this.onOrderSuccess(res.data.orderNumber);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Error al realizar el pedido", "Cerrar", { duration: 5e3 });
      }
    });
  }
  static {
    this.\u0275fac = function CheckoutComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CheckoutComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(CartService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(OrderService), \u0275\u0275directiveInject(PaymentService), \u0275\u0275directiveInject(ShippingService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _CheckoutComponent, selectors: [["app-checkout"]], viewQuery: function CheckoutComponent_Query(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275viewQuery(_c03, 5);
        \u0275\u0275viewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t;
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.stripeElementRef = _t.first);
        \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paypalButtonContainerRef = _t.first);
      }
    }, standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 75, vars: 28, consts: [["stepper", ""], ["picker", ""], ["stripeElement", ""], ["paypalButtonContainer", ""], [1, "container", "checkout-container"], [1, "guest-card"], ["linear", ""], ["label", "Tipo de Env\xEDo", 3, "stepControl"], [3, "formGroup"], [1, "section-label"], [1, "hint"], [1, "type-options"], ["mat-raised-button", "", "color", "primary", "matStepperNext", "", 3, "disabled"], ["label", "Detalles de Entrega", 3, "stepControl"], [1, "step-actions"], ["mat-button", "", "matStepperPrevious", ""], ["label", "Revisar y Confirmar"], [1, "order-summary"], [1, "summary-item"], [1, "summary-item", "discount-row"], [1, "summary-item", "total"], ["mat-raised-button", "", "color", "primary", "matStepperNext", ""], ["label", "Pago"], ["formControlName", "paymentMethod", 1, "payment-options"], ["value", "stripe"], ["value", "paypal"], [1, "card-form"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "notes", "rows", "3"], [1, "processing-overlay"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], [1, "row"], ["appearance", "outline"], ["matInput", "", "formControlName", "guestFirstName"], ["matInput", "", "formControlName", "guestLastName"], ["matInput", "", "formControlName", "guestEmail", "type", "email"], ["matInput", "", "formControlName", "guestPhone"], [1, "type-card", 3, "selected"], [1, "type-card", 3, "click"], [1, "type-icon"], [1, "type-info"], ["matInput", "", "formControlName", "shippingAddress"], ["matInput", "", "formControlName", "shippingCity"], ["matInput", "", "formControlName", "shippingState"], ["matInput", "", "formControlName", "shippingZipCode"], ["matInput", "", "formControlName", "shippingCountry"], ["mat-stroked-button", "", "color", "primary", "type", "button", 3, "click", "disabled"], ["diameter", "18", 2, "display", "inline-block", "margin-right", "8px"], [1, "calc-error"], [1, "rates-list"], [1, "calc-result"], [1, "rate-card", 3, "rate-selected"], [1, "rate-card", 3, "click"], [1, "rate-carrier"], [1, "rate-service"], [1, "rate-days"], [1, "rate-price"], ["formControlName", "pickupLocationId", 3, "selectionChange"], [3, "value"], ["matInput", "", "formControlName", "pickupDate", 3, "dateChange", "matDatepicker", "matDatepickerFilter", "min"], ["matSuffix", "", 3, "for"], [1, "calc-result", "slot-info"], [1, "guest-paypal-hint"], [1, "stripe-loading"], [1, "stripe-error"], ["diameter", "24"], ["diameter", "40"]], template: function CheckoutComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 4)(1, "h1");
        \u0275\u0275text(2, "Checkout");
        \u0275\u0275elementEnd();
        \u0275\u0275template(3, CheckoutComponent_Conditional_3_Template, 22, 1, "mat-card", 5);
        \u0275\u0275elementStart(4, "mat-stepper", 6, 0)(6, "mat-step", 7)(7, "form", 8)(8, "h3", 9);
        \u0275\u0275text(9, "\xBFC\xF3mo deseas recibir tu pedido?");
        \u0275\u0275elementEnd();
        \u0275\u0275template(10, CheckoutComponent_Conditional_10_Template, 2, 0, "p", 10)(11, CheckoutComponent_Conditional_11_Template, 3, 2, "div", 11);
        \u0275\u0275elementStart(12, "button", 12);
        \u0275\u0275text(13, " Continuar ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(14, "mat-step", 13)(15, "form", 8);
        \u0275\u0275template(16, CheckoutComponent_Conditional_16_Template, 30, 5)(17, CheckoutComponent_Conditional_17_Template, 4, 1);
        \u0275\u0275elementStart(18, "div", 14)(19, "button", 15);
        \u0275\u0275text(20, "Atr\xE1s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "button", 12);
        \u0275\u0275text(22, " Continuar al Pago ");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(23, "mat-step", 16)(24, "mat-card", 17)(25, "h3");
        \u0275\u0275text(26, "Resumen del pedido");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, CheckoutComponent_Conditional_27_Template, 2, 0)(28, CheckoutComponent_Conditional_28_Template, 2, 0);
        \u0275\u0275element(29, "hr");
        \u0275\u0275elementStart(30, "div", 18)(31, "span");
        \u0275\u0275text(32, "Subtotal");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(33, "span");
        \u0275\u0275text(34);
        \u0275\u0275pipe(35, "currency");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(36, CheckoutComponent_Conditional_36_Template, 6, 5, "div", 19);
        \u0275\u0275elementStart(37, "div", 18)(38, "span");
        \u0275\u0275text(39);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "span");
        \u0275\u0275text(41);
        \u0275\u0275pipe(42, "currency");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 20)(44, "span");
        \u0275\u0275text(45, "Total");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "span");
        \u0275\u0275text(47);
        \u0275\u0275pipe(48, "currency");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(49, "div", 14)(50, "button", 15);
        \u0275\u0275text(51, "Atr\xE1s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "button", 21);
        \u0275\u0275text(53, " Continuar al Pago ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(54, "mat-step", 22)(55, "form", 8)(56, "h3");
        \u0275\u0275text(57, "Selecciona m\xE9todo de pago");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(58, "mat-radio-group", 23)(59, "mat-radio-button", 24);
        \u0275\u0275text(60, "Tarjeta de cr\xE9dito/d\xE9bito (Stripe)");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(61, "mat-radio-button", 25);
        \u0275\u0275text(62, "PayPal");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(63, CheckoutComponent_Conditional_63_Template, 5, 1, "mat-card", 26)(64, CheckoutComponent_Conditional_64_Template, 5, 1, "mat-card", 26);
        \u0275\u0275elementStart(65, "mat-form-field", 27)(66, "mat-label");
        \u0275\u0275text(67, "Notas del pedido (opcional)");
        \u0275\u0275elementEnd();
        \u0275\u0275element(68, "textarea", 28);
        \u0275\u0275elementEnd();
        \u0275\u0275template(69, CheckoutComponent_Conditional_69_Template, 4, 0, "div", 29);
        \u0275\u0275elementStart(70, "div", 14)(71, "button", 15);
        \u0275\u0275text(72, "Atr\xE1s");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(73, "button", 30);
        \u0275\u0275listener("click", function CheckoutComponent_Template_button_click_73_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.placeOrder());
        });
        \u0275\u0275text(74);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        let tmp_8_0;
        let tmp_9_0;
        let tmp_18_0;
        let tmp_19_0;
        \u0275\u0275advance(3);
        \u0275\u0275conditional(!ctx.authService.isLoggedIn() ? 3 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275property("stepControl", ctx.typeForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.typeForm);
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.loadingConfig ? 10 : 11);
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", ctx.typeForm.invalid);
        \u0275\u0275advance(2);
        \u0275\u0275property("stepControl", ctx.deliveryForm);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.deliveryForm);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_8_0 = ctx.typeForm.get("shippingType")) == null ? null : tmp_8_0.value) === "NATIONAL" ? 16 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_9_0 = ctx.typeForm.get("shippingType")) == null ? null : tmp_9_0.value) === "PICKUP" ? 17 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", !ctx.isDeliveryStepValid());
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.authService.isLoggedIn() ? 27 : 28);
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(35, 22, ctx.cart.subtotal()));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.cart.coupon() ? 36 : -1);
        \u0275\u0275advance(3);
        \u0275\u0275textInterpolate1("Env\xEDo (", ctx.shippingLabel, ")");
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(42, 24, ctx.shippingCostForSummary));
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(48, 26, ctx.totalWithShipping));
        \u0275\u0275advance(8);
        \u0275\u0275property("formGroup", ctx.paymentForm);
        \u0275\u0275advance(8);
        \u0275\u0275conditional(((tmp_18_0 = ctx.paymentForm.get("paymentMethod")) == null ? null : tmp_18_0.value) === "stripe" ? 63 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(((tmp_19_0 = ctx.paymentForm.get("paymentMethod")) == null ? null : tmp_19_0.value) === "paypal" ? 64 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275conditional(ctx.processingPayment ? 69 : -1);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.loading || !ctx.isPaymentStepValid());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.loading ? "Procesando..." : "Realizar Pedido", " ");
      }
    }, dependencies: [ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatCardModule, MatCard, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatSelectModule, MatSelect, MatOption, MatButtonModule, MatButton, MatStepperModule, MatStep, MatStepper, MatStepperNext, MatStepperPrevious, MatRadioModule, MatRadioGroup, MatRadioButton, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner, MatIconModule, MatIcon, MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle, CurrencyPipe, DecimalPipe], styles: ["\n\n.checkout-container[_ngcontent-%COMP%] {\n  max-width: 700px;\n}\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n.row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.section-label[_ngcontent-%COMP%] {\n  margin: 16px 0 12px;\n  font-size: 1rem;\n  color: #333;\n}\n.hint[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.9rem;\n  margin: 8px 0 16px;\n}\n.guest-card[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 16px 24px;\n}\n.type-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-bottom: 24px;\n}\n.type-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 16px;\n  border: 2px solid #ddd;\n  border-radius: 12px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.type-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.03);\n}\n.type-card.selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.06);\n}\n.type-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n}\n.type-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.type-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.type-info[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #666;\n  margin-top: 2px;\n}\n.calc-result[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 16px 0;\n  padding: 12px 16px;\n  background: #e8f5e9;\n  border-radius: 8px;\n  color: #2e7d32;\n  font-size: 0.95rem;\n}\n.slot-info[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.rates-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  margin: 16px 0;\n}\n.rate-card[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr auto auto;\n  align-items: center;\n  gap: 8px;\n  padding: 12px 16px;\n  border: 2px solid #e0e0e0;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: border-color 0.15s;\n  font-size: 0.9rem;\n}\n.rate-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.03);\n}\n.rate-card.rate-selected[_ngcontent-%COMP%] {\n  border-color: var(--theme-primary);\n  background: rgba(0, 0, 0, 0.06);\n}\n.rate-carrier[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1a1a2e;\n}\n.rate-service[_ngcontent-%COMP%] {\n  color: #555;\n  font-size: 0.85rem;\n}\n.rate-days[_ngcontent-%COMP%] {\n  color: #888;\n  font-size: 0.82rem;\n  white-space: nowrap;\n}\n.rate-price[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: var(--theme-primary);\n  white-space: nowrap;\n  text-align: right;\n}\n.calc-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  font-size: 0.875rem;\n  margin-top: 8px;\n}\n.payment-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin: 16px 0 24px;\n}\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  margin-top: 16px;\n}\n.order-summary[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  padding: 16px;\n}\n.summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n}\n.summary-item.total[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 1.1rem;\n}\n.discount-row[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-size: 0.9rem;\n}\n.card-form[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  padding: 16px;\n}\n.card-form[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 16px;\n}\n.processing-overlay[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin: 16px 0;\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.stripe-loading[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin-bottom: 16px;\n}\n.stripe-error[_ngcontent-%COMP%] {\n  color: #d32f2f;\n  margin-top: 8px;\n  font-size: 0.875rem;\n}\n.guest-paypal-hint[_ngcontent-%COMP%] {\n  color: #e65100;\n  background: #fff3e0;\n  border-radius: 8px;\n  padding: 10px 14px;\n  font-size: 0.875rem;\n  margin: 0;\n}\n/*# sourceMappingURL=checkout.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(CheckoutComponent, { className: "CheckoutComponent" });
})();
export {
  CheckoutComponent
};
//# sourceMappingURL=chunk-JZQRIABC.js.map
