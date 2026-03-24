import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StoreInfoService } from '@core/services/store-info.service';
import { StoreInfo } from '@shared/models';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, LoadingComponent],
  template: `
    <div class="container contact-page">
      <h1>Contacto</h1>

      @if (loading) {
        <app-loading />
      } @else {
        <div class="contact-grid">

          <!-- Tarjetas de contacto -->
          <div class="contact-cards">

            @if (info?.email) {
              <a [href]="'mailto:' + info!.email" class="contact-card">
                <div class="card-icon email-icon">
                  <mat-icon>email</mat-icon>
                </div>
                <div class="card-body">
                  <span class="card-label">Correo electrónico</span>
                  <span class="card-value">{{ info!.email }}</span>
                </div>
                <mat-icon class="arrow-icon">arrow_forward</mat-icon>
              </a>
            }

            @if (info?.phone) {
              <a [href]="'tel:+52' + info!.phone" class="contact-card">
                <div class="card-icon phone-icon">
                  <mat-icon>phone</mat-icon>
                </div>
                <div class="card-body">
                  <span class="card-label">Teléfono</span>
                  <span class="card-value">+52 {{ info!.phone }}</span>
                </div>
                <mat-icon class="arrow-icon">arrow_forward</mat-icon>
              </a>
            }

            @if (info?.whatsappNumber) {
              <a [href]="'https://wa.me/' + info!.whatsappNumber" target="_blank" rel="noopener" class="contact-card">
                <div class="card-icon whatsapp-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
                    <path fill="currentColor" d="M16 2C8.268 2 2 8.268 2 16c0 2.478.675 4.797 1.849 6.784L2 30l7.47-1.82A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2zm6.29 19.382c-.344-.172-2.037-1.005-2.352-1.119-.315-.115-.545-.172-.775.172-.23.344-.888 1.119-1.089 1.35-.2.23-.4.258-.745.086-.344-.172-1.455-.536-2.771-1.71-1.024-.914-1.715-2.042-1.916-2.386-.2-.344-.021-.53.151-.701.155-.154.344-.402.516-.603.172-.2.23-.344.344-.573.115-.23.057-.431-.029-.603-.086-.172-.775-1.868-1.062-2.558-.28-.672-.564-.58-.775-.59l-.66-.012c-.23 0-.603.086-.918.431-.315.344-1.204 1.177-1.204 2.872 0 1.695 1.232 3.333 1.404 3.563.172.23 2.425 3.703 5.876 5.193.822.355 1.463.567 1.963.726.824.263 1.574.226 2.167.137.66-.099 2.037-.832 2.323-1.636.287-.804.287-1.493.2-1.636-.086-.143-.315-.23-.66-.402z"/>
                  </svg>
                </div>
                <div class="card-body">
                  <span class="card-label">WhatsApp</span>
                  <span class="card-value">+{{ info!.whatsappNumber }}</span>
                </div>
                <mat-icon class="arrow-icon">arrow_forward</mat-icon>
              </a>
            }

          </div>

          <!-- Redes sociales -->
          @if (info?.instagramUrl || info?.facebookUrl) {
            <div class="social-section">
              <h2>Síguenos</h2>
              <div class="social-links">
                @if (info?.instagramUrl) {
                  <a [href]="info!.instagramUrl" target="_blank" rel="noopener" class="social-btn instagram-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                }
                @if (info?.facebookUrl) {
                  <a [href]="info!.facebookUrl" target="_blank" rel="noopener" class="social-btn facebook-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </a>
                }
              </div>
            </div>
          }

        </div>

        @if (!info?.email && !info?.phone && !info?.whatsappNumber && !info?.instagramUrl && !info?.facebookUrl) {
          <p class="empty-msg">La información de contacto aún no está configurada.</p>
        }
      }
    </div>
  `,
  styles: [`
    .contact-page { padding-top: 32px; padding-bottom: 48px; }
    h1 { font-size: 2rem; color: #1a1a2e; margin-bottom: 32px; }
    .contact-grid { display: flex; flex-direction: column; gap: 40px; max-width: 560px; }

    /* Tarjetas */
    .contact-cards { display: flex; flex-direction: column; gap: 12px; }
    .contact-card {
      display: flex; align-items: center; gap: 16px;
      background: #fff; border: 1px solid #e8e8e8; border-radius: 14px;
      padding: 18px 20px; text-decoration: none; color: inherit;
      transition: box-shadow 0.18s, border-color 0.18s;
    }
    .contact-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-color: var(--theme-primary); }
    .card-icon {
      width: 48px; height: 48px; border-radius: 12px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .card-icon mat-icon { font-size: 22px; width: 22px; height: 22px; }
    .card-icon svg { display: block; }
    .email-icon    { background: #e8f0fe; color: #1a73e8; }
    .phone-icon    { background: #e6f4ea; color: #1e8e3e; }
    .whatsapp-icon { background: #e7f8ee; color: #25D366; }
    .card-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
    .card-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.06em; color: #999; font-weight: 600; }
    .card-value { font-size: 1rem; color: #1a1a2e; font-weight: 500; }
    .arrow-icon { color: #ccc; font-size: 20px; width: 20px; height: 20px; }

    /* Redes */
    .social-section h2 { font-size: 1.1rem; color: #1a1a2e; margin-bottom: 14px; }
    .social-links { display: flex; gap: 12px; flex-wrap: wrap; }
    .social-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 10px 20px; border-radius: 24px; font-size: 0.92rem; font-weight: 600;
      text-decoration: none; transition: opacity 0.18s, transform 0.18s;
    }
    .social-btn:hover { opacity: 0.85; transform: translateY(-1px); }
    .instagram-btn { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #fff; }
    .facebook-btn  { background: #1877F2; color: #fff; }

    .empty-msg { color: #888; margin-top: 24px; }
  `],
})
export class ContactComponent implements OnInit {
  info: StoreInfo | null = null;
  loading = true;

  constructor(private storeInfoService: StoreInfoService) {}

  ngOnInit(): void {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => { this.info = res.data; this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
