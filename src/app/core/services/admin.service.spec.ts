import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdminService } from './admin.service';
import {
  Coupon,
  CouponRequest,
  DashboardStats,
  Order,
  Page,
  PickupLocation,
  PickupLocationRequest,
  PickupTimeSlot,
  PickupTimeSlotRequest,
  Product,
  PromoBanner,
  PromoBannerRequest,
  Promotion,
  PromotionRequest,
  Review,
  ShippingConfig,
  SkydropxQuotation,
  Ticket,
  TicketUpdateRequest,
  User,
} from '@shared/models';

const API = 'http://localhost:8080/api/admin';
const UPLOAD_API = 'http://localhost:8080/api/upload';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeOrder(orderNumber = 'ORD-001'): Order {
  return {
    id: 1,
    orderNumber,
    items: [],
    totalAmount: 500,
    status: 'PENDING',
    shippingAddress: 'Calle 1',
    shippingCity: 'CDMX',
    shippingState: 'CDMX',
    shippingZipCode: '06600',
    shippingCountry: 'MX',
    shippingType: 'NATIONAL',
    createdAt: '2024-01-01T00:00:00Z',
  };
}

function makeProduct(id = 1): Product {
  return {
    id,
    name: 'Test Product',
    price: 100,
    stockQuantity: 10,
    slug: 'test-product',
    featured: false,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
  };
}

function makePage<T>(content: T[]): Page<T> {
  return {
    content,
    totalElements: content.length,
    totalPages: 1,
    size: 20,
    number: 0,
    first: true,
    last: true,
  };
}

function makeReview(id = 1): Review {
  return {
    id,
    productId: 10,
    userId: 2,
    userName: 'Jane Doe',
    rating: 4,
    title: 'Great',
    comment: 'Loved it',
    verified: true,
    approved: false,
    createdAt: '2024-01-01T00:00:00Z',
  };
}

function makeTicket(id = 1): Ticket {
  return {
    id,
    orderId: 1,
    orderNumber: 'ORD-001',
    userId: 2,
    userName: 'Jane',
    subject: 'Issue',
    description: 'Something is wrong',
    status: 'OPEN',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  };
}

function makePickupLocation(id = 1): PickupLocation {
  return {
    id,
    name: 'Branch A',
    address: 'Av. 1',
    city: 'CDMX',
    state: 'CDMX',
    active: true,
    timeSlots: [],
  };
}

function makeTimeSlot(id = 1): PickupTimeSlot {
  return { id, label: '10:00 – 12:00', active: true };
}

// ── Suite ──────────────────────────────────────────────────────────────────

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });
    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getDashboardStats() ────────────────────────────────────────────────

  describe('getDashboardStats()', () => {
    it('sends GET to /admin/dashboard', () => {
      service.getDashboardStats().subscribe();

      const req = httpMock.expectOne(`${API}/dashboard`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: {} });
    });

    it('returns DashboardStats', () => {
      const mockStats: DashboardStats = {
        totalOrders: 10,
        totalProducts: 5,
        totalUsers: 3,
        totalRevenue: 1500,
        recentOrders: [],
        ordersByStatus: { PENDING: 2 },
      };

      service.getDashboardStats().subscribe(res => {
        expect(res.data).toEqual(mockStats);
        expect(res.data.totalRevenue).toBe(1500);
      });

      httpMock.expectOne(`${API}/dashboard`).flush({ success: true, data: mockStats });
    });
  });

  // ── getAllOrders() ─────────────────────────────────────────────────────

  describe('getAllOrders()', () => {
    it('sends GET to /admin/orders with default page/size params', () => {
      service.getAllOrders().subscribe();

      const req = httpMock.expectOne(r => r.url === `${API}/orders`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('20');
      req.flush({ success: true, data: makePage([]) });
    });

    it('sends GET with custom page and size', () => {
      service.getAllOrders(2, 10).subscribe();

      const req = httpMock.expectOne(r => r.url === `${API}/orders`);
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('10');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged orders', () => {
      const page = makePage([makeOrder('ORD-001')]);

      service.getAllOrders().subscribe(res => {
        expect(res.data.content.length).toBe(1);
        expect(res.data.content[0].orderNumber).toBe('ORD-001');
      });

      httpMock.expectOne(r => r.url === `${API}/orders`).flush({ success: true, data: page });
    });
  });

  // ── getOrderById() ─────────────────────────────────────────────────────

  describe('getOrderById()', () => {
    it('sends GET to /admin/orders/{id}', () => {
      service.getOrderById(7).subscribe();

      const req = httpMock.expectOne(`${API}/orders/7`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeOrder() });
    });

    it('returns the order', () => {
      const expected = makeOrder('ORD-007');

      service.getOrderById(7).subscribe(res => {
        expect(res.data.orderNumber).toBe('ORD-007');
      });

      httpMock.expectOne(`${API}/orders/7`).flush({ success: true, data: expected });
    });
  });

  // ── updateOrderStatus() ───────────────────────────────────────────────

  describe('updateOrderStatus()', () => {
    it('sends PUT to /admin/orders/{id}/status', () => {
      service.updateOrderStatus(3, 'SHIPPED').subscribe();

      const req = httpMock.expectOne(`${API}/orders/3/status`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: makeOrder() });
    });

    it('sends the correct body { status }', () => {
      service.updateOrderStatus(3, 'DELIVERED').subscribe();

      const req = httpMock.expectOne(`${API}/orders/3/status`);
      expect(req.request.body).toEqual({ status: 'DELIVERED' });
      req.flush({ success: true, data: makeOrder() });
    });

    it('returns the updated order', () => {
      const updated = { ...makeOrder(), status: 'SHIPPED' };

      service.updateOrderStatus(3, 'SHIPPED').subscribe(res => {
        expect(res.data.status).toBe('SHIPPED');
      });

      httpMock.expectOne(`${API}/orders/3/status`).flush({ success: true, data: updated });
    });
  });

  // ── getAllProducts() ───────────────────────────────────────────────────

  describe('getAllProducts()', () => {
    it('sends GET to /admin/products with default page/size params', () => {
      service.getAllProducts().subscribe();

      const req = httpMock.expectOne(r => r.url === `${API}/products`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('20');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged products', () => {
      const page = makePage([makeProduct(1), makeProduct(2)]);

      service.getAllProducts().subscribe(res => {
        expect(res.data.content.length).toBe(2);
      });

      httpMock.expectOne(r => r.url === `${API}/products`).flush({ success: true, data: page });
    });
  });

  // ── getAllUsers() ──────────────────────────────────────────────────────

  describe('getAllUsers()', () => {
    it('sends GET to /admin/users', () => {
      service.getAllUsers().subscribe();

      const req = httpMock.expectOne(`${API}/users`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of users', () => {
      const mockUsers: User[] = [
        { id: 1, firstName: 'Ana', lastName: 'Ruiz', email: 'ana@test.com', role: 'USER' },
      ];

      service.getAllUsers().subscribe(res => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].email).toBe('ana@test.com');
      });

      httpMock.expectOne(`${API}/users`).flush({ success: true, data: mockUsers });
    });
  });

  // ── uploadImage() ──────────────────────────────────────────────────────

  describe('uploadImage()', () => {
    it('sends POST to /upload/image', () => {
      const file = new File(['img'], 'photo.png', { type: 'image/png' });
      service.uploadImage(file).subscribe();

      const req = httpMock.expectOne(`${UPLOAD_API}/image`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: { url: 'http://cdn.example.com/photo.png' } });
    });

    it('sends a FormData body with the file appended as "file"', () => {
      const file = new File(['img'], 'photo.png', { type: 'image/png' });
      service.uploadImage(file).subscribe();

      const req = httpMock.expectOne(`${UPLOAD_API}/image`);
      expect(req.request.body instanceof FormData).toBeTrue();
      expect((req.request.body as FormData).get('file')).toBe(file);
      req.flush({ success: true, data: { url: 'http://cdn.example.com/photo.png' } });
    });

    it('returns the uploaded image URL', () => {
      const file = new File(['img'], 'photo.png', { type: 'image/png' });

      service.uploadImage(file).subscribe(res => {
        expect(res.data.url).toBe('http://cdn.example.com/photo.png');
      });

      httpMock
        .expectOne(`${UPLOAD_API}/image`)
        .flush({ success: true, data: { url: 'http://cdn.example.com/photo.png' } });
    });
  });

  // ── getPromotions() ────────────────────────────────────────────────────

  describe('getPromotions()', () => {
    it('sends GET to /admin/promotions', () => {
      service.getPromotions().subscribe();

      const req = httpMock.expectOne(`${API}/promotions`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of promotions', () => {
      const mockPromo: Promotion = {
        id: 1,
        name: 'Summer Sale',
        discountPercent: 20,
        startDate: '2024-06-01',
        endDate: '2024-06-30',
        active: true,
        products: [],
      };

      service.getPromotions().subscribe(res => {
        expect(res.data[0].name).toBe('Summer Sale');
      });

      httpMock.expectOne(`${API}/promotions`).flush({ success: true, data: [mockPromo] });
    });
  });

  // ── createPromotion() ─────────────────────────────────────────────────

  describe('createPromotion()', () => {
    const promoReq: PromotionRequest = {
      name: 'Flash Sale',
      discountPercent: 15,
      startDate: '2024-07-01',
      endDate: '2024-07-07',
      productIds: [1, 2],
    };

    it('sends POST to /admin/promotions', () => {
      service.createPromotion(promoReq).subscribe();

      const req = httpMock.expectOne(`${API}/promotions`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createPromotion(promoReq).subscribe();

      const req = httpMock.expectOne(`${API}/promotions`);
      expect(req.request.body).toEqual(promoReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── updatePromotion() ─────────────────────────────────────────────────

  describe('updatePromotion()', () => {
    const promoReq: PromotionRequest = {
      name: 'Updated Sale',
      discountPercent: 25,
      startDate: '2024-08-01',
      endDate: '2024-08-15',
      productIds: [3],
    };

    it('sends PUT to /admin/promotions/{id}', () => {
      service.updatePromotion(5, promoReq).subscribe();

      const req = httpMock.expectOne(`${API}/promotions/5`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updatePromotion(5, promoReq).subscribe();

      const req = httpMock.expectOne(`${API}/promotions/5`);
      expect(req.request.body).toEqual(promoReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deletePromotion() ─────────────────────────────────────────────────

  describe('deletePromotion()', () => {
    it('sends DELETE to /admin/promotions/{id}', () => {
      service.deletePromotion(5).subscribe();

      const req = httpMock.expectOne(`${API}/promotions/5`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── togglePromotion() ─────────────────────────────────────────────────

  describe('togglePromotion()', () => {
    it('sends PATCH to /admin/promotions/{id}/toggle', () => {
      service.togglePromotion(5).subscribe();

      const req = httpMock.expectOne(`${API}/promotions/5/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });
  });

  // ── getBanners() ───────────────────────────────────────────────────────

  describe('getBanners()', () => {
    it('sends GET to /admin/banners', () => {
      service.getBanners().subscribe();

      const req = httpMock.expectOne(`${API}/banners`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of banners', () => {
      const mockBanners: PromoBanner[] = [
        { id: 1, imageUrl: 'http://img.com/1.png', active: true, createdAt: '2024-01-01T00:00:00Z' },
      ];

      service.getBanners().subscribe(res => {
        expect(res.data.length).toBe(1);
        expect(res.data[0].imageUrl).toBe('http://img.com/1.png');
      });

      httpMock.expectOne(`${API}/banners`).flush({ success: true, data: mockBanners });
    });
  });

  // ── createBanner() ────────────────────────────────────────────────────

  describe('createBanner()', () => {
    const bannerReq: PromoBannerRequest = { imageUrl: 'http://img.com/new.png', linkUrl: '/sale' };

    it('sends POST to /admin/banners', () => {
      service.createBanner(bannerReq).subscribe();

      const req = httpMock.expectOne(`${API}/banners`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createBanner(bannerReq).subscribe();

      const req = httpMock.expectOne(`${API}/banners`);
      expect(req.request.body).toEqual(bannerReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── updateBanner() ────────────────────────────────────────────────────

  describe('updateBanner()', () => {
    const bannerReq: PromoBannerRequest = { imageUrl: 'http://img.com/updated.png' };

    it('sends PUT to /admin/banners/{id}', () => {
      service.updateBanner(3, bannerReq).subscribe();

      const req = httpMock.expectOne(`${API}/banners/3`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateBanner(3, bannerReq).subscribe();

      const req = httpMock.expectOne(`${API}/banners/3`);
      expect(req.request.body).toEqual(bannerReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deleteBanner() ────────────────────────────────────────────────────

  describe('deleteBanner()', () => {
    it('sends DELETE to /admin/banners/{id}', () => {
      service.deleteBanner(3).subscribe();

      const req = httpMock.expectOne(`${API}/banners/3`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── toggleBanner() ────────────────────────────────────────────────────

  describe('toggleBanner()', () => {
    it('sends PATCH to /admin/banners/{id}/toggle', () => {
      service.toggleBanner(3).subscribe();

      const req = httpMock.expectOne(`${API}/banners/3/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });
  });

  // ── getCoupons() ──────────────────────────────────────────────────────

  describe('getCoupons()', () => {
    it('sends GET to /admin/coupons', () => {
      service.getCoupons().subscribe();

      const req = httpMock.expectOne(`${API}/coupons`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of coupons', () => {
      const mockCoupons: Coupon[] = [
        {
          id: 1,
          code: 'SAVE10',
          discountPercent: 10,
          expiresAt: '2025-12-31',
          active: true,
          usageCount: 0,
          createdAt: '2024-01-01T00:00:00Z',
        },
      ];

      service.getCoupons().subscribe(res => {
        expect(res.data[0].code).toBe('SAVE10');
      });

      httpMock.expectOne(`${API}/coupons`).flush({ success: true, data: mockCoupons });
    });
  });

  // ── createCoupon() ────────────────────────────────────────────────────

  describe('createCoupon()', () => {
    const couponReq: CouponRequest = {
      code: 'NEW20',
      discountPercent: 20,
      expiresAt: '2025-06-30',
      usageLimit: 100,
    };

    it('sends POST to /admin/coupons', () => {
      service.createCoupon(couponReq).subscribe();

      const req = httpMock.expectOne(`${API}/coupons`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createCoupon(couponReq).subscribe();

      const req = httpMock.expectOne(`${API}/coupons`);
      expect(req.request.body).toEqual(couponReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── updateCoupon() ────────────────────────────────────────────────────

  describe('updateCoupon()', () => {
    const couponReq: CouponRequest = { code: 'UPD20', discountPercent: 20, expiresAt: '2025-06-30' };

    it('sends PUT to /admin/coupons/{id}', () => {
      service.updateCoupon(4, couponReq).subscribe();

      const req = httpMock.expectOne(`${API}/coupons/4`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateCoupon(4, couponReq).subscribe();

      const req = httpMock.expectOne(`${API}/coupons/4`);
      expect(req.request.body).toEqual(couponReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deleteCoupon() ────────────────────────────────────────────────────

  describe('deleteCoupon()', () => {
    it('sends DELETE to /admin/coupons/{id}', () => {
      service.deleteCoupon(4).subscribe();

      const req = httpMock.expectOne(`${API}/coupons/4`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── toggleCoupon() ────────────────────────────────────────────────────

  describe('toggleCoupon()', () => {
    it('sends PATCH to /admin/coupons/{id}/toggle', () => {
      service.toggleCoupon(4).subscribe();

      const req = httpMock.expectOne(`${API}/coupons/4/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });
  });

  // ── getPendingReviews() ───────────────────────────────────────────────

  describe('getPendingReviews()', () => {
    it('sends GET to /admin/reviews/pending', () => {
      service.getPendingReviews().subscribe();

      const req = httpMock.expectOne(`${API}/reviews/pending`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of pending reviews', () => {
      const reviews = [makeReview(1), makeReview(2)];

      service.getPendingReviews().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].approved).toBeFalse();
      });

      httpMock.expectOne(`${API}/reviews/pending`).flush({ success: true, data: reviews });
    });
  });

  // ── approveReview() ───────────────────────────────────────────────────

  describe('approveReview()', () => {
    it('sends PATCH to /admin/reviews/{id}/approve', () => {
      service.approveReview(1).subscribe();

      const req = httpMock.expectOne(`${API}/reviews/1/approve`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });

    it('returns the approved review', () => {
      const approved = { ...makeReview(1), approved: true };

      service.approveReview(1).subscribe(res => {
        expect(res.data.approved).toBeTrue();
      });

      httpMock.expectOne(`${API}/reviews/1/approve`).flush({ success: true, data: approved });
    });
  });

  // ── deleteReview() ────────────────────────────────────────────────────

  describe('deleteReview()', () => {
    it('sends DELETE to /admin/reviews/{id}', () => {
      service.deleteReview(1).subscribe();

      const req = httpMock.expectOne(`${API}/reviews/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── getAllTickets() ───────────────────────────────────────────────────

  describe('getAllTickets()', () => {
    it('sends GET to /admin/tickets', () => {
      service.getAllTickets().subscribe();

      const req = httpMock.expectOne(`${API}/tickets`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of tickets', () => {
      const tickets = [makeTicket(1), makeTicket(2)];

      service.getAllTickets().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].status).toBe('OPEN');
      });

      httpMock.expectOne(`${API}/tickets`).flush({ success: true, data: tickets });
    });
  });

  // ── updateTicket() ────────────────────────────────────────────────────

  describe('updateTicket()', () => {
    const ticketUpdate: TicketUpdateRequest = { status: 'RESOLVED', adminNotes: 'Fixed' };

    it('sends PUT to /admin/tickets/{id}', () => {
      service.updateTicket(1, ticketUpdate).subscribe();

      const req = httpMock.expectOne(`${API}/tickets/1`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateTicket(1, ticketUpdate).subscribe();

      const req = httpMock.expectOne(`${API}/tickets/1`);
      expect(req.request.body).toEqual(ticketUpdate);
      req.flush({ success: true, data: {} });
    });

    it('returns the updated ticket', () => {
      const updated = { ...makeTicket(1), status: 'RESOLVED' as const };

      service.updateTicket(1, ticketUpdate).subscribe(res => {
        expect(res.data.status).toBe('RESOLVED');
      });

      httpMock.expectOne(`${API}/tickets/1`).flush({ success: true, data: updated });
    });
  });

  // ── getShippingConfig() ───────────────────────────────────────────────

  describe('getShippingConfig()', () => {
    it('sends GET to /admin/shipping/config', () => {
      service.getShippingConfig().subscribe();

      const req = httpMock.expectOne(`${API}/shipping/config`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: {} });
    });

    it('returns ShippingConfig', () => {
      const mockConfig: ShippingConfig = {
        nationalEnabled: true,
        pickupEnabled: false,
        nationalBasePrice: 80,
        nationalPricePerKm: 1.5,
        pickupCost: 0,
      };

      service.getShippingConfig().subscribe(res => {
        expect(res.data.nationalBasePrice).toBe(80);
      });

      httpMock.expectOne(`${API}/shipping/config`).flush({ success: true, data: mockConfig });
    });
  });

  // ── updateShippingConfig() ────────────────────────────────────────────

  describe('updateShippingConfig()', () => {
    it('sends PUT to /admin/shipping/config', () => {
      service.updateShippingConfig({ nationalBasePrice: 100 }).subscribe();

      const req = httpMock.expectOne(`${API}/shipping/config`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the partial config as body', () => {
      const partial: Partial<ShippingConfig> = { nationalBasePrice: 120, pickupCost: 30 };
      service.updateShippingConfig(partial).subscribe();

      const req = httpMock.expectOne(`${API}/shipping/config`);
      expect(req.request.body).toEqual(partial);
      req.flush({ success: true, data: {} });
    });
  });

  // ── getPickupLocations() ──────────────────────────────────────────────

  describe('getPickupLocations()', () => {
    it('sends GET to /admin/pickup-locations', () => {
      service.getPickupLocations().subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of pickup locations', () => {
      const locations = [makePickupLocation(1), makePickupLocation(2)];

      service.getPickupLocations().subscribe(res => {
        expect(res.data.length).toBe(2);
      });

      httpMock.expectOne(`${API}/pickup-locations`).flush({ success: true, data: locations });
    });
  });

  // ── createPickupLocation() ────────────────────────────────────────────

  describe('createPickupLocation()', () => {
    const locReq: PickupLocationRequest = {
      name: 'New Branch',
      address: 'Av. 5',
      city: 'Monterrey',
      state: 'NL',
    };

    it('sends POST to /admin/pickup-locations', () => {
      service.createPickupLocation(locReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createPickupLocation(locReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations`);
      expect(req.request.body).toEqual(locReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── updatePickupLocation() ────────────────────────────────────────────

  describe('updatePickupLocation()', () => {
    const locReq: PickupLocationRequest = {
      name: 'Updated Branch',
      address: 'Av. 9',
      city: 'Guadalajara',
      state: 'JAL',
    };

    it('sends PUT to /admin/pickup-locations/{id}', () => {
      service.updatePickupLocation(2, locReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updatePickupLocation(2, locReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2`);
      expect(req.request.body).toEqual(locReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deletePickupLocation() ────────────────────────────────────────────

  describe('deletePickupLocation()', () => {
    it('sends DELETE to /admin/pickup-locations/{id}', () => {
      service.deletePickupLocation(2).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── togglePickupLocation() ────────────────────────────────────────────

  describe('togglePickupLocation()', () => {
    it('sends PATCH to /admin/pickup-locations/{id}/toggle', () => {
      service.togglePickupLocation(2).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });
  });

  // ── addTimeSlot() ─────────────────────────────────────────────────────

  describe('addTimeSlot()', () => {
    const slotReq: PickupTimeSlotRequest = { label: '10:00 – 12:00' };

    it('sends POST to /admin/pickup-locations/{locationId}/time-slots', () => {
      service.addTimeSlot(2, slotReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.addTimeSlot(2, slotReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots`);
      expect(req.request.body).toEqual(slotReq);
      req.flush({ success: true, data: {} });
    });

    it('returns the created time slot', () => {
      const created = makeTimeSlot(10);

      service.addTimeSlot(2, slotReq).subscribe(res => {
        expect(res.data.id).toBe(10);
        expect(res.data.label).toBe('10:00 – 12:00');
      });

      httpMock
        .expectOne(`${API}/pickup-locations/2/time-slots`)
        .flush({ success: true, data: created });
    });
  });

  // ── updateTimeSlot() ──────────────────────────────────────────────────

  describe('updateTimeSlot()', () => {
    const slotReq: PickupTimeSlotRequest = { label: '14:00 – 16:00' };

    it('sends PUT to /admin/pickup-locations/{lid}/time-slots/{sid}', () => {
      service.updateTimeSlot(2, 5, slotReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots/5`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateTimeSlot(2, 5, slotReq).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots/5`);
      expect(req.request.body).toEqual(slotReq);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deleteTimeSlot() ──────────────────────────────────────────────────

  describe('deleteTimeSlot()', () => {
    it('sends DELETE to /admin/pickup-locations/{lid}/time-slots/{sid}', () => {
      service.deleteTimeSlot(2, 5).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots/5`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── toggleTimeSlot() ──────────────────────────────────────────────────

  describe('toggleTimeSlot()', () => {
    it('sends PATCH to /admin/pickup-locations/{lid}/time-slots/{sid}/toggle', () => {
      service.toggleTimeSlot(2, 5).subscribe();

      const req = httpMock.expectOne(`${API}/pickup-locations/2/time-slots/5/toggle`);
      expect(req.request.method).toBe('PATCH');
      req.flush({ success: true, data: {} });
    });

    it('returns the updated time slot', () => {
      const updated = { ...makeTimeSlot(5), active: false };

      service.toggleTimeSlot(2, 5).subscribe(res => {
        expect(res.data.active).toBeFalse();
      });

      httpMock
        .expectOne(`${API}/pickup-locations/2/time-slots/5/toggle`)
        .flush({ success: true, data: updated });
    });
  });

  // ── getSkydropxQuotation() ────────────────────────────────────────────

  describe('getSkydropxQuotation()', () => {
    it('sends POST to /admin/orders/{orderId}/skydropx/quotation', () => {
      service.getSkydropxQuotation(10).subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/quotation`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends an empty body', () => {
      service.getSkydropxQuotation(10).subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/quotation`);
      expect(req.request.body).toEqual({});
      req.flush({ success: true, data: {} });
    });

    it('returns a SkydropxQuotation', () => {
      const mockQuotation: SkydropxQuotation = {
        quotationId: 'q-abc',
        rates: [{ id: 'r-1', carrier: 'FedEx', service: 'Ground', price: 200 }],
      };

      service.getSkydropxQuotation(10).subscribe(res => {
        expect(res.data.quotationId).toBe('q-abc');
        expect(res.data.rates.length).toBe(1);
      });

      httpMock
        .expectOne(`${API}/orders/10/skydropx/quotation`)
        .flush({ success: true, data: mockQuotation });
    });
  });

  // ── createSkydropxShipment() ──────────────────────────────────────────

  describe('createSkydropxShipment()', () => {
    it('sends POST to /admin/orders/{orderId}/skydropx/shipment', () => {
      service.createSkydropxShipment(10, 'rate-42').subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/shipment`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: makeOrder() });
    });

    it('sends the rateId in the body', () => {
      service.createSkydropxShipment(10, 'rate-42').subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/shipment`);
      expect(req.request.body).toEqual({ rateId: 'rate-42' });
      req.flush({ success: true, data: makeOrder() });
    });
  });

  // ── refreshSkydropxShipment() ─────────────────────────────────────────

  describe('refreshSkydropxShipment()', () => {
    it('sends GET to /admin/orders/{orderId}/skydropx/shipment', () => {
      service.refreshSkydropxShipment(10).subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/shipment`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeOrder() });
    });

    it('returns the refreshed order', () => {
      const refreshed = { ...makeOrder(), trackingNumber: 'TRK-999' };

      service.refreshSkydropxShipment(10).subscribe(res => {
        expect(res.data.trackingNumber).toBe('TRK-999');
      });

      httpMock
        .expectOne(`${API}/orders/10/skydropx/shipment`)
        .flush({ success: true, data: refreshed });
    });
  });

  // ── downloadSkydropxLabel() ───────────────────────────────────────────

  describe('downloadSkydropxLabel()', () => {
    it('sends GET to /admin/orders/{orderId}/skydropx/label', () => {
      service.downloadSkydropxLabel(10).subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/label`);
      expect(req.request.method).toBe('GET');
      req.flush(new Blob(['%PDF']));
    });

    it('returns a Blob', () => {
      const pdfBlob = new Blob(['%PDF'], { type: 'application/pdf' });

      service.downloadSkydropxLabel(10).subscribe(blob => {
        expect(blob).toBeInstanceOf(Blob);
      });

      httpMock.expectOne(`${API}/orders/10/skydropx/label`).flush(pdfBlob);
    });
  });

  // ── cancelSkydropxShipment() ──────────────────────────────────────────

  describe('cancelSkydropxShipment()', () => {
    it('sends DELETE to /admin/orders/{orderId}/skydropx/shipment', () => {
      service.cancelSkydropxShipment(10).subscribe();

      const req = httpMock.expectOne(`${API}/orders/10/skydropx/shipment`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: makeOrder() });
    });

    it('returns the updated order after cancellation', () => {
      const cancelled = { ...makeOrder(), shipmentStatus: 'CANCELLED' };

      service.cancelSkydropxShipment(10).subscribe(res => {
        expect(res.data.shipmentStatus).toBe('CANCELLED');
      });

      httpMock
        .expectOne(`${API}/orders/10/skydropx/shipment`)
        .flush({ success: true, data: cancelled });
    });
  });
});
