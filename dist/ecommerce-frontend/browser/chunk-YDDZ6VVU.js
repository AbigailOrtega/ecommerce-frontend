import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-4Y3BE5O3.js";
import {
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-N3527UH3.js";

// src/app/shared/components/loading/loading.component.ts
var LoadingComponent = class _LoadingComponent {
  static {
    this.\u0275fac = function LoadingComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoadingComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoadingComponent, selectors: [["app-loading"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 2, vars: 0, consts: [[1, "loading-container"], ["diameter", "48"]], template: function LoadingComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275element(1, "mat-spinner", 1);
        \u0275\u0275elementEnd();
      }
    }, dependencies: [MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 48px;\n}\n/*# sourceMappingURL=loading.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoadingComponent, { className: "LoadingComponent" });
})();

export {
  LoadingComponent
};
//# sourceMappingURL=chunk-YDDZ6VVU.js.map
