import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ReviewService } from '@core/services/review.service';
import { AuthService } from '@core/services/auth.service';
import { Review, ReviewSummary } from '@shared/models';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  imports: [
    ReactiveFormsModule, DatePipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatDividerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="reviews-section">
      <h2 class="section-title">Reseñas de clientes</h2>

      <!-- Summary -->
      @if (summary) {
        <div class="summary-card">
          <div class="avg-block">
            <span class="avg-number">{{ summary.averageRating ? summary.averageRating.toFixed(1) : '—' }}</span>
            <div class="stars-row">
              @for (star of [1,2,3,4,5]; track star) {
                <mat-icon class="star-icon" [class.filled]="summary.averageRating != null && star <= roundRating(summary.averageRating)">
                  {{ summary.averageRating != null && star <= roundRating(summary.averageRating) ? 'star' : 'star_border' }}
                </mat-icon>
              }
            </div>
            <span class="total-label">{{ summary.totalReviews }} {{ summary.totalReviews === 1 ? 'reseña' : 'reseñas' }}</span>
          </div>
          <div class="distribution">
            @for (star of [5,4,3,2,1]; track star) {
              <div class="dist-row">
                <span class="dist-label">{{ star }}</span>
                <mat-icon class="dist-star">star</mat-icon>
                <div class="dist-bar-bg">
                  <div class="dist-bar-fill" [style.width.%]="getBarPercent(star)"></div>
                </div>
                <span class="dist-count">{{ summary.ratingDistribution[star] || 0 }}</span>
              </div>
            }
          </div>
        </div>
      }

      <!-- Review Form -->
      @if (isLoggedIn && !alreadyReviewed && canReview) {
        <mat-card class="review-form-card">
          <mat-card-header>
            <mat-card-title>Escribir una reseña</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="reviewForm" (ngSubmit)="submitReview()">
              <div class="star-selector">
                <span class="form-label">Calificación *</span>
                <div class="star-row">
                  @for (star of [1,2,3,4,5]; track star) {
                    <mat-icon class="star-select" [class.selected]="star <= selectedRating"
                      (mouseenter)="hoveredRating = star" (mouseleave)="hoveredRating = 0"
                      [class.hovered]="star <= hoveredRating"
                      (click)="selectRating(star)">
                      star
                    </mat-icon>
                  }
                </div>
              </div>
              <mat-form-field class="full-width">
                <mat-label>Título</mat-label>
                <input matInput formControlName="title" placeholder="Resume tu experiencia">
              </mat-form-field>
              <mat-form-field class="full-width">
                <mat-label>Comentario</mat-label>
                <textarea matInput formControlName="comment" rows="4" placeholder="Comparte tu opinión..."></textarea>
              </mat-form-field>
              <button mat-raised-button color="primary" type="submit" [disabled]="reviewForm.invalid || selectedRating === 0 || submitting">
                {{ submitting ? 'Enviando...' : 'Publicar reseña' }}
              </button>
            </form>
          </mat-card-content>
        </mat-card>
      } @else if (isLoggedIn && alreadyReviewed) {
        <p class="already-reviewed">Ya has publicado una reseña para este producto.</p>
      }

      <mat-divider class="section-divider"></mat-divider>

      <!-- Reviews List -->
      @if (reviews.length === 0 && !loading) {
        <p class="no-reviews">Sin reseñas aún. ¡Sé el primero en opinar!</p>
      }
      @for (review of reviews; track review.id) {
        <div class="review-item">
          <div class="review-header">
            <div class="reviewer-info">
              <span class="reviewer-name">{{ review.userName }}</span>
              @if (review.verified) {
                <span class="verified-badge"><mat-icon class="verified-icon">verified</mat-icon> Compra verificada</span>
              }
            </div>
            <span class="review-date">{{ review.createdAt | date:'mediumDate' }}</span>
          </div>
          <div class="review-stars">
            @for (star of [1,2,3,4,5]; track star) {
              <mat-icon class="review-star" [class.filled]="star <= review.rating">
                {{ star <= review.rating ? 'star' : 'star_border' }}
              </mat-icon>
            }
          </div>
          <p class="review-title">{{ review.title }}</p>
          <p class="review-comment">{{ review.comment }}</p>
          @if (canDeleteReview(review)) {
            <button mat-button color="warn" (click)="deleteReview(review.id)">Eliminar</button>
          }
          <mat-divider></mat-divider>
        </div>
      }

      @if (!isLastPage && reviews.length > 0) {
        <div class="load-more">
          <button mat-stroked-button (click)="loadMore()" [disabled]="loading">
            {{ loading ? 'Cargando...' : 'Ver más' }}
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .reviews-section { padding: 32px 0; }
    .section-title { font-size: 1.5rem; font-weight: 600; margin-bottom: 24px; }
    .summary-card { display: flex; gap: 40px; align-items: flex-start; margin-bottom: 32px; background: #f9f9f9; padding: 24px; border-radius: 8px; flex-wrap: wrap; }
    .avg-block { display: flex; flex-direction: column; align-items: center; gap: 4px; min-width: 100px; }
    .avg-number { font-size: 3rem; font-weight: 700; color: var(--theme-primary); line-height: 1; }
    .stars-row { display: flex; }
    .star-icon { color: #ccc; font-size: 20px; width: 20px; height: 20px; }
    .star-icon.filled { color: #f5a623; }
    .total-label { font-size: 0.85rem; color: #888; }
    .distribution { flex: 1; min-width: 200px; }
    .dist-row { display: flex; align-items: center; gap: 6px; margin-bottom: 4px; }
    .dist-label { font-size: 0.85rem; min-width: 12px; text-align: right; }
    .dist-star { font-size: 14px; width: 14px; height: 14px; color: #f5a623; }
    .dist-bar-bg { flex: 1; height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
    .dist-bar-fill { height: 100%; background: #f5a623; border-radius: 4px; transition: width 0.3s; }
    .dist-count { font-size: 0.8rem; color: #888; min-width: 20px; }
    .review-form-card { margin-bottom: 32px; }
    .form-label { font-size: 0.875rem; color: rgba(0,0,0,0.6); margin-bottom: 8px; display: block; }
    .star-selector { margin-bottom: 16px; }
    .star-row { display: flex; gap: 4px; }
    .star-select { cursor: pointer; color: #ccc; font-size: 32px; width: 32px; height: 32px; transition: color 0.15s; }
    .star-select.selected, .star-select.hovered { color: #f5a623; }
    .full-width { width: 100%; }
    .already-reviewed { color: #666; font-style: italic; margin-bottom: 16px; }
    .section-divider { margin: 24px 0; }
    .no-reviews { color: #888; }
    .review-item { padding: 16px 0; }
    .review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; flex-wrap: wrap; gap: 8px; }
    .reviewer-info { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .reviewer-name { font-weight: 600; }
    .verified-badge { display: flex; align-items: center; gap: 2px; font-size: 0.75rem; color: #2e7d32; background: #e8f5e9; padding: 2px 8px; border-radius: 12px; }
    .verified-icon { font-size: 14px; width: 14px; height: 14px; }
    .review-date { font-size: 0.85rem; color: #888; }
    .review-stars { display: flex; margin-bottom: 8px; }
    .review-star { font-size: 18px; width: 18px; height: 18px; color: #ccc; }
    .review-star.filled { color: #f5a623; }
    .review-title { font-weight: 600; margin: 0 0 4px; }
    .review-comment { color: #555; margin: 0 0 8px; line-height: 1.5; }
    .load-more { text-align: center; margin-top: 24px; }
  `],
})
export class ProductReviewsComponent implements OnInit {
  @Input() productId!: number;

  reviews: Review[] = [];
  summary: ReviewSummary | null = null;
  reviewForm!: FormGroup;
  selectedRating = 0;
  hoveredRating = 0;
  loading = false;
  submitting = false;
  alreadyReviewed = false;
  canReview = false;
  currentPage = 0;
  isLastPage = true;

  get isLoggedIn(): boolean { return this.authService.isLoggedIn(); }
  get currentUserId(): number | undefined { return this.authService.user()?.id; }
  get isAdmin(): boolean { return this.authService.isAdmin(); }

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
    });
    this.loadSummary();
    this.loadReviews();
  }

  loadSummary(): void {
    this.reviewService.getProductSummary(this.productId).subscribe({
      next: (res) => { this.summary = res.data; },
    });
  }

  loadReviews(): void {
    this.loading = true;
    this.reviewService.getProductReviews(this.productId, this.currentPage, 10).subscribe({
      next: (res) => {
        this.reviews = [...this.reviews, ...res.data.content];
        this.isLastPage = res.data.last;
        this.checkAlreadyReviewed();
        this.loading = false;
      },
      error: () => { this.loading = false; },
    });
  }

  loadMore(): void {
    this.currentPage++;
    this.loadReviews();
  }

  private checkAlreadyReviewed(): void {
    if (this.isLoggedIn && this.currentUserId) {
      this.alreadyReviewed = this.reviews.some(r => r.userId === this.currentUserId);
      this.canReview = this.reviews.some(r => r.verified && r.userId === this.currentUserId) || !this.alreadyReviewed;
    }
  }

  selectRating(star: number): void {
    this.selectedRating = star;
    this.reviewForm.patchValue({ rating: star });
  }

  roundRating(avg: number): number {
    return Math.round(avg);
  }

  getBarPercent(star: number): number {
    if (!this.summary || this.summary.totalReviews === 0) return 0;
    const count = this.summary.ratingDistribution[star] || 0;
    return (count / this.summary.totalReviews) * 100;
  }

  canDeleteReview(review: Review): boolean {
    return this.isLoggedIn && (review.userId === this.currentUserId || this.isAdmin);
  }

  submitReview(): void {
    if (this.reviewForm.invalid || this.selectedRating === 0) return;
    this.submitting = true;
    const request = { ...this.reviewForm.value, rating: this.selectedRating };
    this.reviewService.createReview(this.productId, request).subscribe({
      next: (res) => {
        this.reviews.unshift(res.data);
        this.alreadyReviewed = true;
        this.reviewForm.reset();
        this.selectedRating = 0;
        this.submitting = false;
        this.loadSummary();
        this.snackBar.open('¡Reseña publicada!', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        this.submitting = false;
        const msg = err?.error?.message || 'Error al publicar la reseña';
        this.snackBar.open(msg, 'Cerrar', { duration: 4000 });
      },
    });
  }

  deleteReview(reviewId: number): void {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.id !== reviewId);
        if (this.currentUserId) {
          this.alreadyReviewed = this.reviews.some(r => r.userId === this.currentUserId);
        }
        this.loadSummary();
        this.snackBar.open('Reseña eliminada', 'Cerrar', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error al eliminar la reseña', 'Cerrar', { duration: 3000 }),
    });
  }
}
