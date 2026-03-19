import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { Page, Review, ReviewRequest, ReviewSummary } from '@shared/models';

const PRODUCTS_API = 'http://localhost:8080/api/products';
const REVIEWS_API = 'http://localhost:8080/api/reviews';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeReview(id = 1, productId = 10): Review {
  return {
    id,
    productId,
    userId: 2,
    userName: 'Maria Lopez',
    rating: 5,
    title: 'Excellent',
    comment: 'Very happy with the product.',
    verified: true,
    approved: true,
    createdAt: '2024-03-01T00:00:00Z',
  };
}

function makePage<T>(content: T[]): Page<T> {
  return {
    content,
    totalElements: content.length,
    totalPages: 1,
    size: 10,
    number: 0,
    first: true,
    last: true,
  };
}

// ── Suite ──────────────────────────────────────────────────────────────────

describe('ReviewService', () => {
  let service: ReviewService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReviewService],
    });
    service = TestBed.inject(ReviewService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getProductReviews() ────────────────────────────────────────────────

  describe('getProductReviews()', () => {
    it('sends GET to /products/{productId}/reviews with default page/size params', () => {
      service.getProductReviews(10).subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/10/reviews`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('10');
      req.flush({ success: true, data: makePage([]) });
    });

    it('sends GET with custom page and size', () => {
      service.getProductReviews(10, 1, 5).subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/10/reviews`);
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toBe('5');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged reviews for the product', () => {
      const page = makePage([makeReview(1, 10), makeReview(2, 10)]);

      service.getProductReviews(10).subscribe(res => {
        expect(res.data.content.length).toBe(2);
        expect(res.data.content[0].productId).toBe(10);
      });

      httpMock
        .expectOne(r => r.url === `${PRODUCTS_API}/10/reviews`)
        .flush({ success: true, data: page });
    });

    it('returns empty page when product has no reviews', () => {
      service.getProductReviews(10).subscribe(res => {
        expect(res.data.content).toEqual([]);
        expect(res.data.totalElements).toBe(0);
      });

      httpMock
        .expectOne(r => r.url === `${PRODUCTS_API}/10/reviews`)
        .flush({ success: true, data: makePage([]) });
    });
  });

  // ── getProductSummary() ────────────────────────────────────────────────

  describe('getProductSummary()', () => {
    it('sends GET to /products/{productId}/reviews/summary', () => {
      service.getProductSummary(10).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/10/reviews/summary`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: {} });
    });

    it('returns a ReviewSummary with averageRating and totalReviews', () => {
      const mockSummary: ReviewSummary = {
        averageRating: 4.5,
        totalReviews: 20,
        ratingDistribution: { 5: 12, 4: 5, 3: 2, 2: 1, 1: 0 },
      };

      service.getProductSummary(10).subscribe(res => {
        expect(res.data.averageRating).toBe(4.5);
        expect(res.data.totalReviews).toBe(20);
        expect(res.data.ratingDistribution[5]).toBe(12);
      });

      httpMock
        .expectOne(`${PRODUCTS_API}/10/reviews/summary`)
        .flush({ success: true, data: mockSummary });
    });

    it('returns averageRating as null when there are no reviews', () => {
      const emptySummary: ReviewSummary = {
        averageRating: null,
        totalReviews: 0,
        ratingDistribution: {},
      };

      service.getProductSummary(10).subscribe(res => {
        expect(res.data.averageRating).toBeNull();
        expect(res.data.totalReviews).toBe(0);
      });

      httpMock
        .expectOne(`${PRODUCTS_API}/10/reviews/summary`)
        .flush({ success: true, data: emptySummary });
    });
  });

  // ── createReview() ─────────────────────────────────────────────────────

  describe('createReview()', () => {
    const reviewRequest: ReviewRequest = {
      rating: 5,
      title: 'Amazing!',
      comment: 'Would buy again.',
    };

    it('sends POST to /products/{productId}/reviews', () => {
      service.createReview(10, reviewRequest).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/10/reviews`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createReview(10, reviewRequest).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/10/reviews`);
      expect(req.request.body).toEqual(reviewRequest);
      req.flush({ success: true, data: {} });
    });

    it('returns the created review', () => {
      const created = makeReview(99, 10);

      service.createReview(10, reviewRequest).subscribe(res => {
        expect(res.data.id).toBe(99);
        expect(res.data.rating).toBe(5);
        expect(res.data.approved).toBeTrue();
      });

      httpMock
        .expectOne(`${PRODUCTS_API}/10/reviews`)
        .flush({ success: true, data: created });
    });

    it('sends to the correct product-scoped URL', () => {
      service.createReview(42, reviewRequest).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/42/reviews`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });
  });

  // ── deleteReview() ─────────────────────────────────────────────────────

  describe('deleteReview()', () => {
    it('sends DELETE to /reviews/{reviewId}', () => {
      service.deleteReview(5).subscribe();

      const req = httpMock.expectOne(`${REVIEWS_API}/5`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });

    it('uses the top-level /reviews path (not /products/{id}/reviews)', () => {
      service.deleteReview(7).subscribe();

      // Verify it does NOT go to the products sub-path
      httpMock.expectNone(`${PRODUCTS_API}/7/reviews`);

      const req = httpMock.expectOne(`${REVIEWS_API}/7`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });
});
