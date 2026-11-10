import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { RouterLink } from '@angular/router';
import { StoreInfoService } from '@core/services/store-info.service';
import { AdminService } from '@core/services/admin.service';
import { ThemeService } from '@core/services/theme.service';
import { StoreInfo, StoreImage } from '@shared/models';
import { THEMES, DEFAULT_THEME_KEY, customHex, customThemeKey, resolveTheme } from '@core/themes';
import { FONTS, DEFAULT_FONT_KEY } from '@core/fonts';

@Component({
    selector: 'app-admin-store-info',
    imports: [
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    RouterLink
],
    templateUrl: './store-info.component.html',
    styleUrl: './store-info.component.scss'
})
export class StoreInfoComponent implements OnInit {
  form: Partial<StoreInfo> = {};
  images: StoreImage[] = [];
  saving = false;
  saveSuccess = false;
  uploading = false;
  logoPreview: string | null = null;
  uploadingLogo = false;
  selectedTheme = DEFAULT_THEME_KEY;
  selectedFont = DEFAULT_FONT_KEY;

  readonly themeEntries = Object.entries(THEMES).map(([key, val]) => ({ key, label: val.label, primary: val.primary }));
  readonly fontEntries = Object.entries(FONTS).map(([key, val]) => ({ key, label: val.label, fontFamily: val.fontFamily }));

  constructor(
    private storeInfoService: StoreInfoService,
    private adminService: AdminService,
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => {
        const d = res.data;
        this.form = { name: d.name, showNameInNavbar: d.showNameInNavbar ?? true, aboutText: d.aboutText, mission: d.mission, vision: d.vision, phone: d.phone, email: d.email, privacyPolicy: d.privacyPolicy, instagramUrl: d.instagramUrl, facebookUrl: d.facebookUrl, whatsappNumber: d.whatsappNumber };
        this.images = d.images ?? [];
        this.logoPreview = d.logoUrl ?? null;
        if (d.themeKey) this.selectedTheme = d.themeKey;
        const saved = customHex(d.themeKey);
        if (saved) this.customColor = saved;
        if (d.fontKey) this.selectedFont = d.fontKey;
      },
    });
  }

  selectTheme(key: string): void {
    this.selectedTheme = key;
    this.themeService.apply(key, this.selectedFont);
  }

  // ── Custom color ──
  /** The color in the "Personalizado" box (kept when a palette is picked, to come back to it). */
  customColor = '#1e7a7f';
  customColorInvalid = false;

  get isCustom(): boolean {
    return customHex(this.selectedTheme) !== null;
  }

  get customPreview() {
    return resolveTheme(customThemeKey(this.customColor));
  }

  get customTextIsDark(): boolean {
    return this.isCustom && this.customPreview.onPrimary !== '#ffffff';
  }

  pickCustomColor(value: string): void {
    const hex = value.trim().toLowerCase();
    const normalized = /^#?[0-9a-f]{6}$/.test(hex) ? (hex.startsWith('#') ? hex : '#' + hex) : null;
    this.customColorInvalid = !normalized;
    if (!normalized) return;
    this.customColor = normalized;
    this.selectTheme(customThemeKey(normalized));
  }

  selectFont(key: string): void {
    this.selectedFont = key;
    this.themeService.apply(this.selectedTheme, key);
  }

  saveAll(): void {
    this.saving = true;
    this.saveSuccess = false;
    this.storeInfoService.update({
      ...this.form,
      themeKey: this.selectedTheme,
      fontKey: this.selectedFont,
    }).subscribe({
      next: () => {
        this.saving = false;
        this.saveSuccess = true;
        setTimeout(() => this.saveSuccess = false, 3000);
      },
      error: () => { this.saving = false; },
    });
  }

  onLogoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploadingLogo = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        const url = res.data.url;
        this.storeInfoService.update({ logoUrl: url }).subscribe({
          next: () => {
            this.logoPreview = url;
            this.uploadingLogo = false;
          },
          error: () => { this.uploadingLogo = false; },
        });
      },
      error: () => { this.uploadingLogo = false; },
    });
    input.value = '';
  }

  removeLogo(): void {
    this.storeInfoService.update({ logoUrl: '' }).subscribe({
      next: () => { this.logoPreview = null; },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        const url = res.data.url;
        this.storeInfoService.addImage(url).subscribe({
          next: (imgRes) => {
            this.images.push(imgRes.data);
            this.uploading = false;
          },
          error: () => { this.uploading = false; },
        });
      },
      error: () => { this.uploading = false; },
    });
    input.value = '';
  }

  removeImage(id: number): void {
    this.storeInfoService.deleteImage(id).subscribe({
      next: () => { this.images = this.images.filter(img => img.id !== id); },
    });
  }

  moveUp(index: number): void {
    if (index === 0) return;
    [this.images[index - 1], this.images[index]] = [this.images[index], this.images[index - 1]];
    this.sendReorder();
  }

  moveDown(index: number): void {
    if (index === this.images.length - 1) return;
    [this.images[index], this.images[index + 1]] = [this.images[index + 1], this.images[index]];
    this.sendReorder();
  }

  private sendReorder(): void {
    const ids = this.images.map(img => img.id);
    this.storeInfoService.reorder(ids).subscribe();
  }
}
