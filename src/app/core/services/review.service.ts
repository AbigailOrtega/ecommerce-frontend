import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, Page, Review, ReviewRequest, ReviewSummary } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProductReviews(productId: number, page = 0, size = 10): Observable<ApiResponse<Page<Review>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Review>>>(`${this.apiUrl}/${productId}/reviews`, { params });
  }

  getProductSummary(productId: number): Observable<ApiResponse<ReviewSummary>> {
    return this.http.get<ApiResponse<ReviewSummary>>(`${this.apiUrl}/${productId}/reviews/summary`);
  }

  createReview(productId: number, request: ReviewRequest): Observable<ApiResponse<Review>> {
    return this.http.post<ApiResponse<Review>>(`${this.apiUrl}/${productId}/reviews`, request);
  }

  deleteReview(reviewId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiUrl}/reviews/${reviewId}`);
  }
}
