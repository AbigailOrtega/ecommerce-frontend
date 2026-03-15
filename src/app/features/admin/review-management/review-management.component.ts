import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { DatePipe } from '@angular/common';
import { AdminService } from '@core/services/admin.service';
import { Review } from '@shared/models';

@Component({
  selector: 'app-review-management',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatCardModule,
    MatSnackBarModule, MatTooltipModule, MatChipsModule, DatePipe],
  template: `
    <div class="container">
      <h1>Review Moderation</h1>
      <p class="subtitle">Reviews awaiting approval before being shown to customers.</p>

      <mat-card class="table-card">
        @if (loading) {
          <p class="empty">Loading...</p>
        } @else if (reviews.length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">check_circle</mat-icon>
            <p>No pending reviews. All caught up!</p>
          </div>
        } @else {
          <table mat-table [dataSource]="reviews" class="full-width">

            <ng-container matColumnDef="product">
              <th mat-header-cell *matHeaderCellDef>Product</th>
              <td mat-cell *matCellDef="let r">{{ r.productName }}</td>
            </ng-container>

            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef>Customer</th>
              <td mat-cell *matCellDef="let r">{{ r.userName }}</td>
            </ng-container>

            <ng-container matColumnDef="rating">
              <th mat-header-cell *matHeaderCellDef>Rating</th>
              <td mat-cell *matCellDef="let r">
                <span class="stars">{{ starsFor(r.rating) }}</span>
                <span class="rating-num">({{ r.rating }}/5)</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="title">
              <th mat-header-cell *matHeaderCellDef>Title</th>
              <td mat-cell *matCellDef="let r"><strong>{{ r.title }}</strong></td>
            </ng-container>

            <ng-container matColumnDef="comment">
              <th mat-header-cell *matHeaderCellDef>Comment</th>
              <td mat-cell *matCellDef="let r" class="comment-cell">{{ r.comment }}</td>
            </ng-container>

            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let r">{{ r.createdAt | date:'mediumDate' }}</td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let r">
                <button mat-icon-button color="primary" (click)="approve(r)" matTooltip="Approve & publish">
                  <mat-icon>check_circle</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="reject(r)" matTooltip="Reject & delete">
                  <mat-icon>cancel</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        }
      </mat-card>
    </div>
  `,
  styles: [`
    .subtitle { color: #666; margin: -8px 0 24px; }
    .table-card { padding: 16px; }
    .full-width { width: 100%; }
    .comment-cell { max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .stars { color: #f59e0b; letter-spacing: 2px; }
    .rating-num { color: #888; font-size: 0.8rem; margin-left: 4px; }
    .empty-state { text-align: center; padding: 48px; color: #888; }
    .empty-icon { font-size: 48px; width: 48px; height: 48px; color: #4caf50; display: block; margin: 0 auto 12px; }
  `],
})
export class ReviewManagementComponent implements OnInit {
  reviews: Review[] = [];
  loading = true;
  displayedColumns = ['product', 'user', 'rating', 'title', 'comment', 'date', 'actions'];

  constructor(private admin: AdminService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    this.admin.getPendingReviews().subscribe({
      next: (res) => { this.reviews = res.data; this.loading = false; },
      error: () => this.loading = false,
    });
  }

  approve(r: Review): void {
    this.admin.approveReview(r.id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(x => x.id !== r.id);
        this.snackBar.open('Review approved and published', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error approving review', 'Close', { duration: 2000 }),
    });
  }

  reject(r: Review): void {
    if (!confirm(`Delete review from "${r.userName}"?`)) return;
    this.admin.deleteReview(r.id).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(x => x.id !== r.id);
        this.snackBar.open('Review rejected and deleted', 'Close', { duration: 2000 });
      },
      error: () => this.snackBar.open('Error deleting review', 'Close', { duration: 2000 }),
    });
  }

  starsFor(rating: number): string {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
}
