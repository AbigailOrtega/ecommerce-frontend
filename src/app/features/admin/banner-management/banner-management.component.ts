import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '@core/services/admin.service';
import { PromoBanner, PromoBannerRequest } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-banner-management',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, RouterLink,
    MatTableModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatCardModule,
    MatSnackBarModule, MatProgressSpinnerModule, DatePipe, LoadingComponent,
  ],
  template: `
    <div class="container">
      <div class="header">
        <h1>Banners Promocionales</h1>
        <a mat-button routerLink="/admin">&larr; Panel</a>
      </div>

      <button mat-raised-button color="primary" (click)="toggleForm()">
        <mat-icon>add</mat-icon> {{ showForm ? 'Cancelar' : 'Agregar Banner' }}
      </button>

      @if (showForm) {
        <mat-card class="form-card">
          <h2>{{ editingId ? 'Editar Banner' : 'Nuevo Banner' }}</h2>
          <form [formGroup]="form" (ngSubmit)="save()">

            <!-- Image upload area -->
            <div class="upload-area" (click)="fileInput.click()" [class.has-image]="previewUrl">
              @if (uploading) {
                <mat-spinner diameter="40" />
                <p>Uploading…</p>
              } @else if (previewUrl) {
                <img [src]="previewUrl" class="preview-img" alt="Banner preview">
                <div class="overlay"><mat-icon>edit</mat-icon> Cambiar imagen</div>
              } @else {
                <mat-icon class="upload-icon">add_photo_alternate</mat-icon>
                <p>Haz clic para subir imagen del banner</p>
                <span class="hint">Recomendado: 1200×300 px o más ancho</span>
              }
            </div>
            <input #fileInput type="file" accept="image/*" class="hidden-input" (change)="onFileSelected($event)">

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>URL del enlace (opcional)</mat-label>
              <input matInput formControlName="linkUrl" placeholder="https://...">
              <mat-hint>A dónde ir al hacer clic en el banner</mat-hint>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="toggleForm()">Cancelar</button>
              <button mat-raised-button color="primary" type="submit"
                      [disabled]="!previewUrl || uploading || saving">
                {{ saving ? 'Guardando...' : 'Guardar Banner' }}
              </button>
            </div>
          </form>
        </mat-card>
      }

      @if (loading) {
        <app-loading />
      } @else {
        <div class="banner-list">
          @for (banner of banners; track banner.id) {
            <mat-card class="banner-card" [class.inactive]="!banner.active">
              <div class="banner-img-wrap">
                <img [src]="banner.imageUrl" [alt]="'Banner ' + banner.id" class="banner-thumb">
              </div>
              <div class="banner-info">
                <span [class]="banner.active ? 'badge-active' : 'badge-inactive'">
                  {{ banner.active ? 'Activo' : 'Inactivo' }}
                </span>
                @if (banner.linkUrl) {
                  <p class="link-url"><mat-icon class="small-icon">link</mat-icon> {{ banner.linkUrl }}</p>
                }
                <p class="created">Añadido {{ banner.createdAt | date:'mediumDate' }}</p>
              </div>
              <div class="banner-actions">
                <button mat-icon-button (click)="edit(banner)" title="Editar"><mat-icon>edit</mat-icon></button>
                <button mat-icon-button (click)="toggle(banner)"
                        [title]="banner.active ? 'Desactivar' : 'Activar'">
                  <mat-icon>{{ banner.active ? 'toggle_on' : 'toggle_off' }}</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="delete(banner)" title="Eliminar">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </mat-card>
          }
          @if (banners.length === 0) {
            <p class="no-data">Sin banners aún. Agrega uno arriba.</p>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .form-card { padding: 24px; margin: 16px 0; }
    .full-width { width: 100%; margin-top: 16px; }
    .form-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
    .hidden-input { display: none; }

    /* Upload area */
    .upload-area {
      border: 2px dashed #ccc; border-radius: 8px; padding: 32px;
      text-align: center; cursor: pointer; transition: border-color 0.2s;
      position: relative; min-height: 160px;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
    }
    .upload-area:hover { border-color: var(--theme-primary); }
    .upload-area.has-image { padding: 0; border-style: solid; overflow: hidden; }
    .upload-icon { font-size: 48px; width: 48px; height: 48px; color: #aaa; margin-bottom: 8px; }
    .upload-area p { margin: 4px 0; color: #555; }
    .upload-area .hint { font-size: 0.8rem; color: #999; }
    .preview-img { width: 100%; max-height: 220px; object-fit: cover; display: block; }
    .overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.4);
      color: white; display: flex; align-items: center; justify-content: center;
      gap: 8px; opacity: 0; transition: opacity 0.2s;
    }
    .upload-area:hover .overlay { opacity: 1; }

    /* Banner list */
    .banner-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
    .banner-card { display: flex; align-items: center; gap: 16px; padding: 12px; }
    .banner-card.inactive { opacity: 0.6; }
    .banner-img-wrap { flex: 0 0 200px; }
    .banner-thumb { width: 200px; height: 80px; object-fit: cover; border-radius: 4px; display: block; }
    .banner-info { flex: 1; display: flex; flex-direction: column; gap: 4px; }
    .link-url { margin: 0; font-size: 0.85rem; color: #555; display: flex; align-items: center; gap: 4px; }
    .small-icon { font-size: 16px; width: 16px; height: 16px; }
    .created { margin: 0; font-size: 0.8rem; color: #999; }
    .banner-actions { display: flex; gap: 4px; }
    .badge-active { background: #e8f5e9; color: #2e7d32; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
    .badge-inactive { background: #ffebee; color: #c62828; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem; }
    .no-data { text-align: center; color: #666; padding: 32px; }
  `],
})
export class BannerManagementComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  banners: PromoBanner[] = [];
  loading = true;
  showForm = false;
  editingId: number | null = null;
  uploading = false;
  saving = false;
  previewUrl: string | null = null;

  form: FormGroup;

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group({
      linkUrl: [''],
    });
  }

  ngOnInit(): void {
    this.loadBanners();
  }

  loadBanners(): void {
    this.loading = true;
    this.adminService.getBanners().subscribe({
      next: (res) => { this.banners = res.data; this.loading = false; },
      error: () => { this.loading = false; this.snackBar.open('Error al cargar los banners', 'Cerrar', { duration: 3000 }); },
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) this.resetForm();
  }

  resetForm(): void {
    this.editingId = null;
    this.previewUrl = null;
    this.form.reset();
  }

  edit(banner: PromoBanner): void {
    this.editingId = banner.id;
    this.previewUrl = banner.imageUrl;
    this.form.patchValue({ linkUrl: banner.linkUrl || '' });
    this.showForm = true;
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading = true;
    this.adminService.uploadImage(file).subscribe({
      next: (res) => {
        this.previewUrl = res.data['url'];
        this.uploading = false;
      },
      error: () => {
        this.uploading = false;
        this.snackBar.open('Error al subir la imagen', 'Cerrar', { duration: 3000 });
      },
    });
    // Reset input so same file can be re-selected
    this.fileInput.nativeElement.value = '';
  }

  save(): void {
    if (!this.previewUrl) return;
    this.saving = true;
    const req: PromoBannerRequest = {
      imageUrl: this.previewUrl,
      linkUrl: this.form.value.linkUrl || undefined,
    };
    const obs = this.editingId
      ? this.adminService.updateBanner(this.editingId, req)
      : this.adminService.createBanner(req);

    obs.subscribe({
      next: () => {
        this.saving = false;
        this.showForm = false;
        this.resetForm();
        this.loadBanners();
        this.snackBar.open('Banner guardado', 'Cerrar', { duration: 2000 });
      },
      error: () => {
        this.saving = false;
        this.snackBar.open('Error al guardar el banner', 'Cerrar', { duration: 3000 });
      },
    });
  }

  toggle(banner: PromoBanner): void {
    this.adminService.toggleBanner(banner.id).subscribe({
      next: (res) => {
        const idx = this.banners.findIndex(b => b.id === banner.id);
        if (idx !== -1) this.banners[idx] = res.data;
        this.snackBar.open(`Banner ${res.data.active ? 'activado' : 'desactivado'}`, 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al cambiar estado del banner', 'Cerrar', { duration: 3000 }),
    });
  }

  delete(banner: PromoBanner): void {
    if (!confirm('¿Eliminar este banner?')) return;
    this.adminService.deleteBanner(banner.id).subscribe({
      next: () => {
        this.banners = this.banners.filter(b => b.id !== banner.id);
        this.snackBar.open('Banner eliminado', 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al eliminar el banner', 'Cerrar', { duration: 3000 }),
    });
  }
}
