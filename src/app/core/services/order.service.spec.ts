import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { Order, OrderRequest } from '@shared/models';

const API = 'http://localhost:8080/api/orders';

function makeOrder(orderNumber: string): Order {
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

const baseRequest: OrderRequest = {
  shippingAddress: 'Calle 1',
  shippingCity: 'CDMX',
  shippingState: 'CDMX',
  shippingZipCode: '06600',
  shippingCountry: 'MX',
  paymentMethod: 'COD',
  shippingType: 'NATIONAL',
};

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrderService],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── createOrder() ──────────────────────────────────────────────────────────

  describe('createOrder()', () => {
    it('sends POST to /orders', () => {
      service.createOrder(baseRequest).subscribe();

      const req = httpMock.expectOne(API);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: makeOrder('ORD-001') });
    });

    it('sends the full OrderRequest body', () => {
      const fullRequest: OrderRequest = {
        ...baseRequest,
        paymentId: 'pi_abc123',
        notes: 'Leave at door',
        couponCode: 'SAVE10',
        skydropxRateId: 'rate-42',
      };

      service.createOrder(fullRequest).subscribe();

      const req = httpMock.expectOne(API);
      expect(req.request.body).toEqual(fullRequest);
      req.flush({ success: true, data: makeOrder('ORD-002') });
    });

    it('returns the created Order', () => {
      const expected = makeOrder('ORD-003');

      service.createOrder(baseRequest).subscribe(res => {
        expect(res.data).toEqual(expected);
        expect(res.data.orderNumber).toBe('ORD-003');
      });

      httpMock.expectOne(API).flush({ success: true, data: expected });
    });

    it('supports PICKUP shipping type with pickupLocationId and pickupDate', () => {
      const pickupRequest: OrderRequest = {
        paymentMethod: 'COD',
        shippingType: 'PICKUP',
        pickupLocationId: 5,
        pickupDate: '2026-04-07',
      };

      service.createOrder(pickupRequest).subscribe();

      const req = httpMock.expectOne(API);
      expect(req.request.body).toEqual(pickupRequest);
      req.flush({ success: true, data: makeOrder('ORD-004') });
    });
  });

  // ── getUserOrders() ────────────────────────────────────────────────────────

  describe('getUserOrders()', () => {
    it('sends GET to /orders', () => {
      service.getUserOrders().subscribe();

      const req = httpMock.expectOne(API);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of orders', () => {
      const orders = [makeOrder('ORD-010'), makeOrder('ORD-011')];

      service.getUserOrders().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].orderNumber).toBe('ORD-010');
      });

      httpMock.expectOne(API).flush({ success: true, data: orders });
    });

    it('returns empty list when user has no orders', () => {
      service.getUserOrders().subscribe(res => {
        expect(res.data).toEqual([]);
      });

      httpMock.expectOne(API).flush({ success: true, data: [] });
    });
  });

  // ── getOrderByNumber() ─────────────────────────────────────────────────────

  describe('getOrderByNumber()', () => {
    it('sends GET to /orders/{orderNumber}', () => {
      service.getOrderByNumber('ORD-099').subscribe();

      const req = httpMock.expectOne(`${API}/ORD-099`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeOrder('ORD-099') });
    });

    it('returns the matching order', () => {
      const expected = makeOrder('ORD-099');

      service.getOrderByNumber('ORD-099').subscribe(res => {
        expect(res.data).toEqual(expected);
        expect(res.data.status).toBe('PENDING');
      });

      httpMock.expectOne(`${API}/ORD-099`).flush({ success: true, data: expected });
    });
  });
});
