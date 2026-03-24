import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StoreInfoService } from '@core/services/store-info.service';
import { AdminService } from '@core/services/admin.service';
import { ThemeService } from '@core/services/theme.service';
import { StoreInfo, StoreImage } from '@shared/models';
import { THEMES, DEFAULT_THEME_KEY } from '@core/themes';
import { FONTS, DEFAULT_FONT_KEY } from '@core/fonts';

@Component({
  selector: 'app-admin-store-info',
  standalone: true,
  imports: [
    FormsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatTooltipModule,
    NgIf, NgFor, RouterLink,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Información General</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <!-- Datos de la tienda -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Datos de la tienda</mat-card-title></mat-card-header>
        <mat-card-content>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Nombre de la tienda</mat-label>
              <input matInput [(ngModel)]="form.name" placeholder="Ej. Mi Tienda" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Teléfono</mat-label>
              <span matTextPrefix>+52&nbsp;</span>
              <input matInput [(ngModel)]="form.phone" placeholder="55 1234 5678" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Correo de contacto</mat-label>
              <mat-icon matPrefix>email</mat-icon>
              <input matInput [(ngModel)]="form.email" type="email" placeholder="contacto@mitienda.com" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>WhatsApp de contacto</mat-label>
              <span matTextPrefix>+52&nbsp;</span>
              <input matInput [(ngModel)]="form.whatsappNumber" placeholder="55 1234 5678" />
              <mat-hint>Sin espacios ni "+". Se muestra como botón flotante en la tienda.</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Descripción (Sobre nosotros)</mat-label>
              <textarea matInput [(ngModel)]="form.aboutText" rows="4"
                        placeholder="Cuéntanos sobre tu tienda..."></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Misión</mat-label>
              <textarea matInput [(ngModel)]="form.mission" rows="3"
                        placeholder="¿Cuál es la misión de tu tienda?"></textarea>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Visión</mat-label>
              <textarea matInput [(ngModel)]="form.vision" rows="3"
                        placeholder="¿Cuál es la visión de tu tienda?"></textarea>
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Redes sociales -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Redes sociales</mat-card-title></mat-card-header>
        <mat-card-content>
          <p class="social-hint">Solo se mostrarán las redes que tengan URL configurada.</p>
          <div class="form-grid">
            <mat-form-field appearance="outline">
              <mat-label>Instagram</mat-label>
              <mat-icon matPrefix class="social-prefix instagram-icon">photo_camera</mat-icon>
              <input matInput [(ngModel)]="form.instagramUrl" placeholder="https://instagram.com/tutienda" />
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Facebook</mat-label>
              <mat-icon matPrefix class="social-prefix facebook-icon">facebook</mat-icon>
              <input matInput [(ngModel)]="form.facebookUrl" placeholder="https://facebook.com/tutienda" />
            </mat-form-field>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Color de la tienda -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Color de la tienda</mat-card-title></mat-card-header>
        <mat-card-content>
          <p class="theme-hint">Elige la paleta de colores principal del sitio.</p>
          <div class="theme-swatches">
            @for (entry of themeEntries; track entry.key) {
              <button class="swatch-btn"
                      [style.background]="entry.primary"
                      [class.selected]="selectedTheme === entry.key"
                      [matTooltip]="entry.label"
                      (click)="selectTheme(entry.key)">
                @if (selectedTheme === entry.key) {
                  <mat-icon style="color:white;font-size:18px;line-height:18px;">check</mat-icon>
                }
              </button>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Tipografía -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Tipografía</mat-card-title></mat-card-header>
        <mat-card-content>
          <p class="theme-hint">Elige la fuente principal del sitio. La vista previa muestra cómo se verá el texto.</p>
          <div class="font-options">
            @for (entry of fontEntries; track entry.key) {
              <button class="font-btn" [class.font-selected]="selectedFont === entry.key"
                      [style.font-family]="entry.fontFamily"
                      (click)="selectFont(entry.key)">
                <span class="font-label">{{ entry.label }}</span>
                <span class="font-preview">Aa — Texto de ejemplo</span>
              </button>
            }
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Logo -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Logo de la tienda</mat-card-title></mat-card-header>
        <mat-card-content>
          <div class="logo-section">
            @if (logoPreview) {
              <div class="logo-preview">
                <img [src]="logoPreview" alt="Logo" />
                <button mat-icon-button color="warn" (click)="removeLogo()" title="Eliminar logo">
                  <mat-icon>close</mat-icon>
                </button>
              </div>
            } @else {
              <p class="empty-msg">Sin logo. Se mostrará en la barra de navegación.</p>
            }
            <button mat-raised-button color="accent" (click)="logoInput.click()" [disabled]="uploadingLogo">
              @if (uploadingLogo) { <mat-spinner diameter="20"></mat-spinner> } @else { <mat-icon>upload</mat-icon> }
              {{ logoPreview ? 'Cambiar logo' : 'Subir logo' }}
            </button>
            <input #logoInput type="file" accept="image/*" hidden (change)="onLogoChange($event)" />
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Imágenes del carrusel -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Imágenes del carrusel</mat-card-title></mat-card-header>
        <mat-card-content>
          <div class="upload-row">
            <button mat-raised-button color="accent" (click)="fileInput.click()" [disabled]="uploading">
              @if (uploading) { <mat-spinner diameter="20"></mat-spinner> } @else { <mat-icon>upload</mat-icon> }
              Subir imagen
            </button>
            <input #fileInput type="file" accept="image/*" hidden (change)="onFileChange($event)" />
          </div>

          @if (images.length === 0) {
            <p class="empty-msg">No hay imágenes. Sube la primera para el carrusel.</p>
          } @else {
            <div class="image-grid">
              @for (img of images; track img.id; let i = $index) {
                <div class="image-item">
                  <img [src]="img.url" [alt]="'Imagen ' + (i + 1)" />
                  <div class="image-actions">
                    <button mat-icon-button (click)="moveUp(i)" [disabled]="i === 0" title="Subir">
                      <mat-icon>arrow_upward</mat-icon>
                    </button>
                    <button mat-icon-button (click)="moveDown(i)" [disabled]="i === images.length - 1" title="Bajar">
                      <mat-icon>arrow_downward</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="removeImage(img.id)" title="Eliminar">
                      <mat-icon>close</mat-icon>
                    </button>
                  </div>
                </div>
              }
            </div>
          }
        </mat-card-content>
      </mat-card>

      <!-- Aviso de privacidad -->
      <mat-card class="section-card">
        <mat-card-header><mat-card-title>Aviso de privacidad</mat-card-title></mat-card-header>
        <mat-card-content>
          <p class="privacy-hint">Este texto se mostrará en la página de Aviso de Privacidad de tu tienda. Puedes usar saltos de línea para organizar las secciones.</p>
          <mat-form-field appearance="outline" style="width:100%;margin-top:12px;">
            <mat-label>Texto del aviso de privacidad</mat-label>
            <textarea matInput [(ngModel)]="form.privacyPolicy" rows="14"
                      placeholder="Escribe aquí tu aviso de privacidad..."></textarea>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

      <!-- Single save button -->
      <div class="save-row">
        <button mat-raised-button color="primary" (click)="saveAll()" [disabled]="saving">
          @if (saving) { <mat-spinner diameter="20"></mat-spinner> } @else { <mat-icon>save</mat-icon> }
          Guardar cambios
        </button>
        @if (saveSuccess) {
          <span class="success-msg"><mat-icon>check_circle</mat-icon> Guardado correctamente</span>
        }
      </div>
    </div>
  `,
  styles: [`
    .container { margin: 0 auto; padding: 24px 16px; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
    .header h1 { margin: 0; }
    .section-card { margin-bottom: 24px; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 16px; }
    .full-width { grid-column: 1 / -1; }
    .save-row { display: flex; align-items: center; gap: 16px; padding: 8px 0 32px; }
    .success-msg { display: flex; align-items: center; gap: 4px; color: #4caf50; font-weight: 500; }
    .success-msg mat-icon { font-size: 18px; width: 18px; height: 18px; }
    .logo-section { display: flex; align-items: center; gap: 16px; padding-top: 8px; flex-wrap: wrap; }
    .logo-preview { position: relative; display: inline-flex; align-items: center; gap: 8px; }
    .logo-preview img { height: 64px; max-width: 200px; object-fit: contain; border: 1px solid #e0e0e0; border-radius: 6px; padding: 4px; }
    .upload-row { margin-bottom: 16px; padding-top: 8px; }
    .empty-msg { color: #999; font-style: italic; }
    .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 16px; }
    .image-item { position: relative; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
    .image-item img { width: 100%; height: 130px; object-fit: cover; display: block; }
    .image-actions {
      display: flex; justify-content: center; gap: 4px; padding: 4px;
      background: rgba(255,255,255,0.95);
    }
    .theme-hint { color: #666; margin: 8px 0 16px; }
    .theme-swatches { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 4px; }
    .font-options { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; padding-top: 8px; }
    .font-btn {
      display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
      padding: 14px 16px; border: 2px solid #e0e0e0; border-radius: 10px;
      background: #fff; cursor: pointer; text-align: left; transition: border-color 0.15s, box-shadow 0.15s;
    }
    .font-btn:hover { border-color: var(--theme-primary); }
    .font-btn.font-selected { border-color: var(--theme-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-primary) 15%, transparent); }
    .font-label { font-size: 0.78rem; font-weight: 700; color: #555; text-transform: uppercase; letter-spacing: 0.05em; font-family: inherit !important; }
    .font-preview { font-size: 1.05rem; color: #1a1a2e; line-height: 1.2; }
    .swatch-btn {
      width: 44px; height: 44px; border-radius: 50%; border: 3px solid transparent;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: transform 0.15s, border-color 0.15s;
    }
    .swatch-btn:hover { transform: scale(1.12); }
    .swatch-btn.selected { border-color: rgba(0,0,0,0.35); transform: scale(1.12); }
    .social-hint { color: #666; font-size: 0.9rem; margin: 8px 0 16px; }
    .privacy-hint { color: #666; font-size: 0.88rem; margin: 8px 0 0; }
    .social-prefix { margin-right: 4px; font-size: 20px; }
    .instagram-icon { color: #E1306C; }
    .facebook-icon { color: #1877F2; }
    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
    }
  `],
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
        this.form = { name: d.name, aboutText: d.aboutText, mission: d.mission, vision: d.vision, phone: d.phone, email: d.email, privacyPolicy: d.privacyPolicy, instagramUrl: d.instagramUrl, facebookUrl: d.facebookUrl, whatsappNumber: d.whatsappNumber };
        this.images = d.images ?? [];
        this.logoPreview = d.logoUrl ?? null;
        if (d.themeKey) this.selectedTheme = d.themeKey;
        if (d.fontKey) this.selectedFont = d.fontKey;
      },
    });
  }

  selectTheme(key: string): void {
    this.selectedTheme = key;
    this.themeService.apply(key, this.selectedFont);
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
