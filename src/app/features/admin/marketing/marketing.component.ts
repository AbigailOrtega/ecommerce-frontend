import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminService } from '@core/services/admin.service';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [RouterLink, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatProgressSpinnerModule, MatSnackBarModule],
  template: `
    <div class="container">
      <div class="header">
        <h1>Email Marketing</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <div class="subscribers-badge">
        <mat-icon>people</mat-icon>
        <span><strong>{{ subscriberCount }}</strong> suscriptor(es) activo(s)</span>
      </div>

      <div class="campaign-card">
        <h2>Nueva campaña</h2>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Asunto del correo</mat-label>
          <input matInput [(ngModel)]="subject" placeholder="ej. ¡Ofertas de temporada!">
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Contenido del mensaje</mat-label>
          <textarea matInput [(ngModel)]="bodyText" rows="8"
                    placeholder="Escribe aquí el mensaje promocional..."></textarea>
        </mat-form-field>

        <div class="image-section">
          <p class="image-label">Imagen promocional (opcional)</p>
          @if (imagePreview) {
            <div class="image-preview-wrap">
              <img [src]="imagePreview" alt="Vista previa" class="image-preview">
              <button mat-icon-button class="remove-img-btn" (click)="removeImage()" title="Quitar imagen">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          } @else {
            <label class="upload-zone">
              <mat-icon>add_photo_alternate</mat-icon>
              <span>Haz clic para subir una imagen</span>
              <input type="file" accept="image/*" (change)="onImageSelected($event)" hidden>
            </label>
          }
        </div>

        <div class="actions">
          <button mat-raised-button color="primary" (click)="send()"
                  [disabled]="sending || !subject.trim() || !bodyText.trim()">
            @if (sending) {
              <mat-spinner diameter="18" style="display:inline-block;margin-right:8px;"></mat-spinner>
              Enviando...
            } @else {
              <ng-container>
                <mat-icon>send</mat-icon>
                Enviar campaña
              </ng-container>
            }
          </button>
        </div>

        @if (lastResult) {
          <div class="result-banner" [class.result-error]="lastResult.error">
            <mat-icon>{{ lastResult.error ? 'error' : 'check_circle' }}</mat-icon>
            {{ lastResult.message }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .header { display: flex; justify-content: space-between; align-items: center; }
    .subscribers-badge { display: inline-flex; align-items: center; gap: 8px; background: #e3f2fd;
      color: #1565c0; border-radius: 20px; padding: 8px 16px; margin: 12px 0 24px; font-size: 0.95rem; }
    .subscribers-badge mat-icon { font-size: 20px; width: 20px; height: 20px; }
    .campaign-card { background: #fff; border: 1px solid #e0e0e0; border-radius: 12px; padding: 28px; max-width: 680px; }
    .campaign-card h2 { margin: 0 0 20px; font-size: 1.1rem; color: #1a1a2e; }
    .full-width { width: 100%; margin-bottom: 4px; }
    .image-label { font-size: 0.85rem; color: #666; margin-bottom: 10px; font-weight: 500; }
    .image-section { margin-bottom: 20px; }
    .upload-zone { display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 8px; border: 2px dashed #ccc; border-radius: 10px; padding: 32px; cursor: pointer;
      color: #888; font-size: 0.9rem; transition: border-color 0.2s; }
    .upload-zone:hover { border-color: var(--theme-primary); color: var(--theme-primary); }
    .upload-zone mat-icon { font-size: 36px; width: 36px; height: 36px; }
    .image-preview-wrap { position: relative; display: inline-block; }
    .image-preview { max-width: 100%; max-height: 260px; border-radius: 8px; object-fit: cover; display: block; }
    .remove-img-btn { position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.5); color: #fff; }
    .actions { margin-top: 8px; }
    .result-banner { display: flex; align-items: center; gap: 8px; margin-top: 16px; padding: 12px 16px;
      border-radius: 8px; background: #e8f5e9; color: #2e7d32; font-size: 0.9rem; }
    .result-banner mat-icon { font-size: 20px; width: 20px; height: 20px; }
    .result-banner.result-error { background: #fce4ec; color: #c62828; }
  `],
})
export class MarketingComponent implements OnInit {
  subscriberCount = 0;
  subject = '';
  bodyText = '';
  imageFile: File | null = null;
  imagePreview: string | null = null;
  sending = false;
  lastResult: { message: string; error: boolean } | null = null;

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.adminService.getMarketingSubscriberCount().subscribe({
      next: (res) => this.subscriberCount = res.data['count'] ?? 0,
      error: () => {},
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.imageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview = e.target?.result as string;
    reader.readAsDataURL(file);
  }

  removeImage(): void {
    this.imageFile = null;
    this.imagePreview = null;
  }

  send(): void {
    if (!this.subject.trim() || !this.bodyText.trim()) return;
    this.sending = true;
    this.lastResult = null;

    const formData = new FormData();
    formData.append('subject', this.subject.trim());
    formData.append('bodyText', this.bodyText.trim());
    if (this.imageFile) formData.append('image', this.imageFile);

    this.adminService.sendMarketingCampaign(formData).subscribe({
      next: (res) => {
        this.sending = false;
        this.lastResult = { message: res.data['message'], error: false };
        if ((res.data['sent'] as number) > 0) {
          this.subject = '';
          this.bodyText = '';
          this.removeImage();
        }
      },
      error: (err) => {
        this.sending = false;
        this.lastResult = { message: err.error?.message || 'Error al enviar la campaña', error: true };
      },
    });
  }
}
