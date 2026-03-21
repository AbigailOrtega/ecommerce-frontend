import {
  ɵɵdefineInjectable
} from "./chunk-N3527UH3.js";

// src/app/core/themes.ts
var THEMES = {
  azul: { label: "Azul", primary: "#3f51b5", primaryDark: "#303f9f", accent: "#ff4081" },
  verde: { label: "Verde", primary: "#2e7d32", primaryDark: "#1b5e20", accent: "#69f0ae" },
  naranja: { label: "Naranja", primary: "#e65100", primaryDark: "#bf360c", accent: "#ffd740" },
  morado: { label: "Morado", primary: "#6a1b9a", primaryDark: "#4a148c", accent: "#ea80fc" },
  rosa: { label: "Rosa", primary: "#ad1457", primaryDark: "#880e4f", accent: "#ff80ab" },
  negro: { label: "Negro", primary: "#212121", primaryDark: "#000000", accent: "#ffd740" }
};
var DEFAULT_THEME_KEY = "azul";

// src/app/core/services/theme.service.ts
var ThemeService = class _ThemeService {
  constructor() {
    this.styleEl = null;
  }
  apply(themeKey) {
    const key = themeKey && THEMES[themeKey] ? themeKey : DEFAULT_THEME_KEY;
    const t = THEMES[key];
    const css = `
      :root {
        --theme-primary: ${t.primary};
        --theme-primary-dark: ${t.primaryDark};
        --theme-accent: ${t.accent};
      }
      mat-toolbar[color="primary"] {
        background-color: var(--theme-primary) !important;
      }
      .mat-mdc-raised-button.mat-primary,
      .mat-mdc-unelevated-button.mat-primary {
        --mdc-filled-button-container-color: var(--theme-primary) !important;
        --mdc-protected-button-container-color: var(--theme-primary) !important;
      }
      .mat-mdc-fab.mat-primary,
      .mat-mdc-mini-fab.mat-primary {
        --mat-fab-container-color: var(--theme-primary) !important;
      }
      .mat-mdc-icon-button.mat-primary {
        --mat-icon-button-state-layer-color: var(--theme-primary) !important;
      }
      .mat-badge-content {
        background: var(--theme-accent) !important;
      }
      /* Stepper */
      .mat-stepper-horizontal, .mat-stepper-vertical {
        --mat-stepper-header-selected-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-done-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-edit-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-selected-state-label-text-color: var(--theme-primary) !important;
        --mat-stepper-line-color: var(--theme-primary) !important;
      }
    `;
    if (!this.styleEl) {
      this.styleEl = document.createElement("style");
      this.styleEl.id = "app-dynamic-theme";
      document.head.appendChild(this.styleEl);
    }
    this.styleEl.textContent = css;
  }
  static {
    this.\u0275fac = function ThemeService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ThemeService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ThemeService, factory: _ThemeService.\u0275fac, providedIn: "root" });
  }
};

export {
  THEMES,
  DEFAULT_THEME_KEY,
  ThemeService
};
//# sourceMappingURL=chunk-T3IDVL5T.js.map
