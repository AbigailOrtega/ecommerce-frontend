import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartService } from './cart.service';
import { CartItem, Coupon } from '@shared/models';

const API_CART   = 'http://localhost:8080/api/cart';
const API_COUPON = 'http://localhost:8080/api/coupons';

function makeItem(id: number, quantity: number, subtotal: number): CartItem {
  return {
    id,
    quantity,
    subtotal,
    product: { id, name: `Product ${id}`, price: subtotal / quantity, stockQuantity: 10,
               slug: `product-${id}`, featured: false, active: true, createdAt: '' },
  } as CartItem;
}

function makeCoupon(discountPercent: number): Coupon {
  return {
    id: 1, code: 'TEST10', discountPercent, expiresAt: '2030-01-01',
    active: true, usageCount: 0, createdAt: '',
  };
}

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── Computed: itemCount ────────────────────────────────────────────────────

  describe('itemCount()', () => {
    it('returns 0 when cart is empty', () => {
      expect(service.itemCount()).toBe(0);
    });

    it('sums quantities of all items', fakeAsync(() => {
      service.loadCart();
      const req = httpMock.expectOne(API_CART);
      req.flush({ success: true, data: [makeItem(1, 2, 200), makeItem(2, 3, 300)] });
      tick();
      expect(service.itemCount()).toBe(5);
    }));
  });

  // ── Computed: subtotal ─────────────────────────────────────────────────────

  describe('subtotal()', () => {
    it('returns 0 for empty cart', () => {
      expect(service.subtotal()).toBe(0);
    });

    it('sums subtotals of all items', fakeAsync(() => {
      service.loadCart();
      const req = httpMock.expectOne(API_CART);
      req.flush({ success: true, data: [makeItem(1, 1, 150), makeItem(2, 2, 250)] });
      tick();
      expect(service.subtotal()).toBe(400);
    }));
  });

  // ── Computed: discount ─────────────────────────────────────────────────────

  describe('discount()', () => {
    it('returns 0 when no coupon applied', () => {
      expect(service.discount()).toBe(0);
    });

    it('calculates percentage discount on subtotal', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 1, 100)] });
      tick();

      service.validateCoupon('TEST10').subscribe();
      const couponReq = httpMock.expectOne(r => r.url.includes('/coupons/validate'));
      couponReq.flush({ success: true, data: makeCoupon(10) });
      tick();

      // 10% of 100 = 10
      expect(service.discount()).toBe(10);
    }));
  });

  // ── Computed: total ────────────────────────────────────────────────────────

  describe('total()', () => {
    it('equals subtotal when no coupon', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 1, 200)] });
      tick();
      expect(service.total()).toBe(200);
    }));

    it('equals subtotal minus discount when coupon applied', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 1, 200)] });
      tick();

      service.validateCoupon('SAVE20').subscribe();
      httpMock.expectOne(r => r.url.includes('/coupons/validate'))
        .flush({ success: true, data: makeCoupon(20) });
      tick();

      // 20% of 200 = 40; total = 200 - 40 = 160
      expect(service.total()).toBe(160);
    }));

    it('never goes negative', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 1, 50)] });
      tick();

      service.validateCoupon('ALL').subscribe();
      httpMock.expectOne(r => r.url.includes('/coupons/validate'))
        .flush({ success: true, data: makeCoupon(100) });
      tick();

      expect(service.total()).toBeGreaterThanOrEqual(0);
    }));
  });

  // ── loadCart() ─────────────────────────────────────────────────────────────

  describe('loadCart()', () => {
    it('sets cartItems from API response', fakeAsync(() => {
      const items = [makeItem(1, 1, 100)];
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: items });
      tick();
      expect(service.items()).toEqual(items);
    }));

    it('clears cart on HTTP error', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush('Error', { status: 500, statusText: 'Server Error' });
      tick();
      expect(service.items()).toEqual([]);
    }));
  });

  // ── validateCoupon() ───────────────────────────────────────────────────────

  describe('validateCoupon()', () => {
    it('POSTs to /coupons/validate?code=X', () => {
      service.validateCoupon('HELLO').subscribe();
      const req = httpMock.expectOne(r =>
        r.url === `${API_COUPON}/validate` && r.params.get('code') === 'HELLO'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toBeNull();
      req.flush({ success: true, data: makeCoupon(5) });
    });

    it('sets appliedCoupon signal on success', fakeAsync(() => {
      const coupon = makeCoupon(15);
      service.validateCoupon('SAVE15').subscribe();
      httpMock.expectOne(r => r.url.includes('/coupons/validate'))
        .flush({ success: true, data: coupon });
      tick();
      expect(service.coupon()).toEqual(coupon);
    }));
  });

  // ── removeCoupon() ─────────────────────────────────────────────────────────

  describe('removeCoupon()', () => {
    it('resets appliedCoupon to null', fakeAsync(() => {
      service.validateCoupon('X').subscribe();
      httpMock.expectOne(r => r.url.includes('/coupons/validate'))
        .flush({ success: true, data: makeCoupon(10) });
      tick();
      expect(service.coupon()).not.toBeNull();

      service.removeCoupon();
      expect(service.coupon()).toBeNull();
    }));
  });

  // ── addToCart() ────────────────────────────────────────────────────────────

  describe('addToCart()', () => {
    it('POSTs to /cart with productId and quantity', fakeAsync(() => {
      service.addToCart(42, 2).subscribe();
      const postReq = httpMock.expectOne(API_CART);
      expect(postReq.request.method).toBe('POST');
      expect(postReq.request.body).toEqual({ productId: 42, quantity: 2 });
      postReq.flush({ success: true, data: makeItem(42, 2, 200) });
      tick();

      // loadCart() triggered after add
      const loadReq = httpMock.expectOne(API_CART);
      loadReq.flush({ success: true, data: [] });
    }));

    it('includes sizeId when provided', fakeAsync(() => {
      service.addToCart(5, 1, 99).subscribe();
      const req = httpMock.expectOne(API_CART);
      expect(req.request.body).toEqual({ productId: 5, quantity: 1, sizeId: 99 });
      req.flush({ success: true, data: makeItem(5, 1, 50) });
      tick();
      httpMock.expectOne(API_CART).flush({ success: true, data: [] });
    }));

    it('triggers loadCart() after add', fakeAsync(() => {
      spyOn(service, 'loadCart').and.callThrough();
      service.addToCart(1, 1).subscribe();
      httpMock.expectOne(r => r.method === 'POST').flush({ success: true, data: makeItem(1, 1, 10) });
      tick();
      expect(service.loadCart).toHaveBeenCalled();
      httpMock.expectOne(r => r.method === 'GET').flush({ success: true, data: [] });
    }));
  });

  // ── updateQuantity() ───────────────────────────────────────────────────────

  describe('updateQuantity()', () => {
    it('PUTs to /cart/{id} with quantity', fakeAsync(() => {
      service.updateQuantity(7, 3).subscribe();
      const req = httpMock.expectOne(`${API_CART}/7`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ quantity: 3 });
      req.flush({ success: true, data: makeItem(7, 3, 300) });
      tick();
      httpMock.expectOne(API_CART).flush({ success: true, data: [] });
    }));

    it('triggers loadCart() after update', fakeAsync(() => {
      spyOn(service, 'loadCart').and.callThrough();
      service.updateQuantity(1, 1).subscribe();
      httpMock.expectOne(r => r.method === 'PUT').flush({ success: true, data: makeItem(1, 1, 10) });
      tick();
      expect(service.loadCart).toHaveBeenCalled();
      httpMock.expectOne(r => r.method === 'GET').flush({ success: true, data: [] });
    }));
  });

  // ── removeItem() ───────────────────────────────────────────────────────────

  describe('removeItem()', () => {
    it('DELETEs to /cart/{id}', fakeAsync(() => {
      service.removeItem(3).subscribe();
      const req = httpMock.expectOne(`${API_CART}/3`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
      tick();
      httpMock.expectOne(API_CART).flush({ success: true, data: [] });
    }));

    it('triggers loadCart() after remove', fakeAsync(() => {
      spyOn(service, 'loadCart').and.callThrough();
      service.removeItem(2).subscribe();
      httpMock.expectOne(r => r.method === 'DELETE').flush({ success: true, data: null });
      tick();
      expect(service.loadCart).toHaveBeenCalled();
      httpMock.expectOne(r => r.method === 'GET').flush({ success: true, data: [] });
    }));
  });

  // ── clearCart() ────────────────────────────────────────────────────────────

  describe('clearCart()', () => {
    it('DELETEs to /cart (root)', fakeAsync(() => {
      service.clearCart().subscribe();
      const req = httpMock.expectOne(API_CART);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
      tick();
    }));

    it('resets both signals locally after clear', fakeAsync(() => {
      // Prime with data first
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 1, 100)] });
      tick();
      service.validateCoupon('X').subscribe();
      httpMock.expectOne(r => r.url.includes('/coupons/validate'))
        .flush({ success: true, data: makeCoupon(10) });
      tick();

      service.clearCart().subscribe();
      httpMock.expectOne(r => r.method === 'DELETE').flush({ success: true, data: null });
      tick();

      expect(service.items()).toEqual([]);
      expect(service.coupon()).toBeNull();
    }));
  });

  // ── resetLocalCart() ───────────────────────────────────────────────────────

  describe('resetLocalCart()', () => {
    it('resets signals without making an HTTP call', fakeAsync(() => {
      service.loadCart();
      httpMock.expectOne(API_CART).flush({ success: true, data: [makeItem(1, 2, 200)] });
      tick();
      expect(service.items().length).toBe(1);

      service.resetLocalCart();

      expect(service.items()).toEqual([]);
      expect(service.coupon()).toBeNull();
      // No additional HTTP requests should have been made
      httpMock.verify();
    }));
  });
});
