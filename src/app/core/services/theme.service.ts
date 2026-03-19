import { Injectable } from '@angular/core';
import { THEMES, DEFAULT_THEME_KEY } from '../themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private styleEl: HTMLStyleElement | null = null;

  apply(themeKey: string | null | undefined): void {
    const key = (themeKey && THEMES[themeKey]) ? themeKey : DEFAULT_THEME_KEY;
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
      this.styleEl = document.createElement('style');
      this.styleEl.id = 'app-dynamic-theme';
      document.head.appendChild(this.styleEl);
    }
    this.styleEl.textContent = css;
  }
}
