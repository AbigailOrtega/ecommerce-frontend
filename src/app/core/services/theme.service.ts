import { DOCUMENT, Injectable, inject } from '@angular/core';
import { needsOutline, readableOnWhite, resolveTheme } from '../themes';
import { FONTS, DEFAULT_FONT_KEY } from '../fonts';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // DOCUMENT works on the server too, so the theme is already in the server-rendered HTML;
  // the browser then reuses those elements (found by id) instead of adding a second copy
  private readonly document = inject(DOCUMENT);
  private styleEl: HTMLStyleElement | null = null;
  private fontLinkEl: HTMLLinkElement | null = null;

  apply(themeKey: string | null | undefined, fontKey: string | null | undefined = null): void {
    this.applyTheme(themeKey);
    this.applyFont(fontKey);
  }

  private applyTheme(themeKey: string | null | undefined): void {
    // a palette, a validated custom color, or the default: nothing else is written into the CSS
    const t = resolveTheme(themeKey);

    const css = `
      :root {
        --theme-primary: ${t.primary};
        --theme-primary-dark: ${t.primaryDark};
        --theme-accent: ${t.accent};
        --theme-on-primary: ${t.onPrimary};
        --theme-on-accent: ${t.onAccent};
        /* the primary color as text on white backgrounds: prices, links, titles */
        --theme-primary-text: ${readableOnWhite(t.primary)};
      }
      mat-toolbar[color="primary"] {
        background-color: var(--theme-primary) !important;
        color: var(--theme-on-primary) !important;
      }
      .mat-mdc-raised-button.mat-primary,
      .mat-mdc-unelevated-button.mat-primary {
        --mat-button-filled-container-color: var(--theme-primary) !important;
        --mat-button-protected-container-color: var(--theme-primary) !important;
        --mat-button-filled-label-text-color: var(--theme-on-primary) !important;
        --mat-button-protected-label-text-color: var(--theme-on-primary) !important;
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
        color: var(--theme-on-accent) !important;
      }
      /* Stepper */
      .mat-stepper-horizontal, .mat-stepper-vertical {
        --mat-stepper-header-selected-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-done-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-edit-state-icon-background-color: var(--theme-primary) !important;
        --mat-stepper-header-selected-state-label-text-color: var(--theme-primary-text) !important;
        --mat-stepper-line-color: var(--theme-primary) !important;
      }
    ` + (needsOutline(t.primary) ? `
      /* white (or almost) on the white page: outline the bar and the filled buttons */
      mat-toolbar[color="primary"] { border-bottom: 1px solid #e0e0e0; }
      .mat-mdc-raised-button.mat-primary,
      .mat-mdc-unelevated-button.mat-primary { border: 1px solid #bdbdbd; }
    ` : '');

    this.styleEl ??= this.document.getElementById('app-dynamic-theme') as HTMLStyleElement | null;
    if (!this.styleEl) {
      this.styleEl = this.document.createElement('style');
      this.styleEl.id = 'app-dynamic-theme';
      this.document.head.appendChild(this.styleEl);
    }
    this.styleEl.textContent = css;
  }

  private applyFont(fontKey: string | null | undefined): void {
    const key = (fontKey && FONTS[fontKey]) ? fontKey : DEFAULT_FONT_KEY;
    const f = FONTS[key];

    // Inject or update the Google Fonts <link>
    this.fontLinkEl ??= this.document.getElementById('app-dynamic-font') as HTMLLinkElement | null;
    if (!this.fontLinkEl) {
      this.fontLinkEl = this.document.createElement('link');
      this.fontLinkEl.id = 'app-dynamic-font';
      this.fontLinkEl.rel = 'stylesheet';
      this.document.head.appendChild(this.fontLinkEl);
    }
    this.fontLinkEl.href = f.googleUrl;

    // Apply font-family to body
    this.document.body.style.fontFamily = f.fontFamily;
  }
}
