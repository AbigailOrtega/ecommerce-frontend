import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { StoreInfoService } from '@core/services/store-info.service';
import { StoreInfo, StoreImage } from '@shared/models';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, NgIf, NgFor],
  template: `
    <div class="about-container">

      <!-- Carousel -->
      @if (images.length > 0) {
        <div class="carousel">
          <div class="carousel-track" [style.transform]="'translateX(-' + (currentIndex * 100) + '%)'">
            @for (img of images; track img.id) {
              <div class="carousel-slide">
                <img [src]="img.url" [alt]="info?.name || 'Store image'" />
              </div>
            }
          </div>

          @if (images.length > 1) {
            <button class="carousel-btn prev" (click)="prev()">&#9664;</button>
            <button class="carousel-btn next" (click)="next()">&#9654;</button>

            <div class="carousel-dots">
              @for (img of images; track img.id; let i = $index) {
                <span class="dot" [class.active]="i === currentIndex" (click)="goTo(i)"></span>
              }
            </div>
          }
        </div>
      }

      @if (!info && !loading) {
        <div class="placeholder">
          <mat-icon>store</mat-icon>
          <h2>Próximamente</h2>
          <p>Estamos preparando información sobre nuestra tienda.</p>
        </div>
      }

      @if (info) {
        <div class="content">
          @if (info.name) {
            <h1 class="store-name">{{ info.name }}</h1>
          }

          @if (info.aboutText) {
            <p class="about-text">{{ info.aboutText }}</p>
          }

          @if (info.mission || info.vision) {
            <div class="cards-row">
              @if (info.mission) {
                <mat-card class="info-card">
                  <mat-card-content>
                    <div class="card-header">
                      <mat-icon class="card-icon mission">emoji_objects</mat-icon>
                      <h3>Misión</h3>
                    </div>
                    <p>{{ info.mission }}</p>
                  </mat-card-content>
                </mat-card>
              }
              @if (info.vision) {
                <mat-card class="info-card">
                  <mat-card-content>
                    <div class="card-header">
                      <mat-icon class="card-icon vision">visibility</mat-icon>
                      <h3>Visión</h3>
                    </div>
                    <p>{{ info.vision }}</p>
                  </mat-card-content>
                </mat-card>
              }
            </div>
          }

          @if (info.phone || info.instagramUrl || info.facebookUrl) {
            <div class="contact-section">
              @if (info.phone) {
                <div class="contact-row">
                  <mat-icon>phone</mat-icon>
                  <span>{{ info.phone }}</span>
                </div>
              }
              @if (info.instagramUrl || info.facebookUrl) {
                <div class="social-row">
                  @if (info.instagramUrl) {
                    <a [href]="info.instagramUrl" target="_blank" rel="noopener" class="social-link instagram">
                      <mat-icon>photo_camera</mat-icon>
                      Instagram
                    </a>
                  }
                  @if (info.facebookUrl) {
                    <a [href]="info.facebookUrl" target="_blank" rel="noopener" class="social-link facebook">
                      <mat-icon>facebook</mat-icon>
                      Facebook
                    </a>
                  }
                </div>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .about-container { max-width: 960px; margin: 0 auto; padding: 24px 16px; }

    /* Carousel */
    .carousel { position: relative; overflow: hidden; border-radius: 12px; margin-bottom: 40px; max-height: 480px; }
    .carousel-track { display: flex; transition: transform 0.5s ease; height: 100%; }
    .carousel-slide { min-width: 100%; }
    .carousel-slide img { width: 100%; height: 480px; object-fit: cover; display: block; }
    .carousel-btn {
      position: absolute; top: 50%; transform: translateY(-50%);
      background: rgba(0,0,0,0.45); color: white; border: none;
      padding: 12px 16px; cursor: pointer; font-size: 1.2rem; border-radius: 4px;
      transition: background 0.2s;
    }
    .carousel-btn:hover { background: rgba(0,0,0,0.7); }
    .carousel-btn.prev { left: 12px; }
    .carousel-btn.next { right: 12px; }
    .carousel-dots { position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%); display: flex; gap: 8px; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.55); cursor: pointer; transition: background 0.2s; }
    .dot.active { background: white; }

    /* Placeholder */
    .placeholder { text-align: center; padding: 80px 16px; color: #aaa; }
    .placeholder mat-icon { font-size: 64px; width: 64px; height: 64px; margin-bottom: 16px; }
    .placeholder h2 { margin: 0 0 8px; font-size: 1.6rem; }

    /* Content */
    .content { }
    .store-name { font-size: 2rem; font-weight: 700; margin-bottom: 16px; color: #212121; }
    .about-text { font-size: 1.05rem; line-height: 1.7; color: #555; margin-bottom: 32px; }

    .cards-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 32px; }
    .info-card { padding: 8px; }
    .card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .card-header h3 { margin: 0; font-size: 1.1rem; }
    .card-icon { font-size: 28px; width: 28px; height: 28px; }
    .card-icon.mission { color: #f9a825; }
    .card-icon.vision { color: #1565c0; }
    .info-card p { margin: 0; color: #555; line-height: 1.6; }

    .contact-section { display: flex; flex-direction: column; gap: 16px; margin-top: 8px; }
    .contact-row { display: flex; align-items: center; gap: 10px; font-size: 1.05rem; color: #333; }
    .contact-row mat-icon { color: #4caf50; }
    .social-row { display: flex; gap: 12px; flex-wrap: wrap; }
    .social-link {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 18px; border-radius: 24px;
      font-size: 0.95rem; font-weight: 500; text-decoration: none;
      transition: opacity 0.2s;
    }
    .social-link:hover { opacity: 0.82; }
    .social-link mat-icon { font-size: 20px; width: 20px; height: 20px; }
    .social-link.instagram { background: #E1306C; color: white; }
    .social-link.facebook { background: #1877F2; color: white; }

    @media (max-width: 600px) {
      .cards-row { grid-template-columns: 1fr; }
      .carousel-slide img { height: 240px; }
      .carousel { max-height: 240px; }
    }
  `],
})
export class AboutComponent implements OnInit, OnDestroy {
  info: StoreInfo | null = null;
  images: StoreImage[] = [];
  loading = true;
  currentIndex = 0;
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;

  constructor(private storeInfoService: StoreInfoService) {}

  ngOnInit(): void {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => {
        this.info = res.data;
        this.images = res.data?.images ?? [];
        this.loading = false;
        if (this.images.length > 1) {
          this.startAutoplay();
        }
      },
      error: () => { this.loading = false; },
    });
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  prev(): void {
    this.goTo(this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1);
  }

  next(): void {
    this.goTo((this.currentIndex + 1) % this.images.length);
  }

  goTo(index: number): void {
    this.currentIndex = index;
    this.resetAutoplay();
  }

  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => this.next(), 5000);
  }

  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private resetAutoplay(): void {
    this.stopAutoplay();
    if (this.images.length > 1) {
      this.startAutoplay();
    }
  }
}
