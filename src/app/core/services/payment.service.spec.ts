import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PaymentService } from './payment.service';

const API = 'http://localhost:8080/api/payments';

describe('PaymentService', () => {
  let service: PaymentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PaymentService],
    });
    service = TestBed.inject(PaymentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getStripeConfig() ──────────────────────────────────────────────────

  describe('getStripeConfig()', () => {
    it('sends GET to /payments/stripe/config', () => {
      service.getStripeConfig().subscribe();

      const req = httpMock.expectOne(`${API}/stripe/config`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: { publishableKey: 'pk_test_123' } });
    });

    it('returns the Stripe publishable key', () => {
      service.getStripeConfig().subscribe(res => {
        expect(res.data.publishableKey).toBe('pk_test_abc');
      });

      httpMock
        .expectOne(`${API}/stripe/config`)
        .flush({ success: true, data: { publishableKey: 'pk_test_abc' } });
    });

    it('returns publishableKey as empty string when not configured', () => {
      service.getStripeConfig().subscribe(res => {
        expect(res.data.publishableKey).toBe('');
      });

      httpMock
        .expectOne(`${API}/stripe/config`)
        .flush({ success: true, data: { publishableKey: '' } });
    });
  });

  // ── createPaymentIntent() ──────────────────────────────────────────────

  describe('createPaymentIntent()', () => {
    it('sends POST to /payments/stripe/create-intent', () => {
      service.createPaymentIntent(500).subscribe();

      const req = httpMock.expectOne(`${API}/stripe/create-intent`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: { clientSecret: 'pi_secret', paymentIntentId: 'pi_abc' } });
    });

    it('sends the amount in the request body', () => {
      service.createPaymentIntent(1200).subscribe();

      const req = httpMock.expectOne(`${API}/stripe/create-intent`);
      expect(req.request.body).toEqual({ amount: 1200 });
      req.flush({ success: true, data: { clientSecret: 'pi_secret', paymentIntentId: 'pi_abc' } });
    });

    it('returns clientSecret and paymentIntentId', () => {
      service.createPaymentIntent(500).subscribe(res => {
        expect(res.data.clientSecret).toBe('pi_cs_xyz');
        expect(res.data.paymentIntentId).toBe('pi_xyz');
      });

      httpMock
        .expectOne(`${API}/stripe/create-intent`)
        .flush({ success: true, data: { clientSecret: 'pi_cs_xyz', paymentIntentId: 'pi_xyz' } });
    });
  });

  // ── getPayPalConfig() ──────────────────────────────────────────────────

  describe('getPayPalConfig()', () => {
    it('sends GET to /payments/paypal/config', () => {
      service.getPayPalConfig().subscribe();

      const req = httpMock.expectOne(`${API}/paypal/config`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: { clientId: 'pp_client_123' } });
    });

    it('returns the PayPal client ID', () => {
      service.getPayPalConfig().subscribe(res => {
        expect(res.data.clientId).toBe('pp_client_abc');
      });

      httpMock
        .expectOne(`${API}/paypal/config`)
        .flush({ success: true, data: { clientId: 'pp_client_abc' } });
    });
  });

  // ── createPayPalOrder() ────────────────────────────────────────────────

  describe('createPayPalOrder()', () => {
    it('sends POST to /payments/paypal/create-order', () => {
      service.createPayPalOrder(300).subscribe();

      const req = httpMock.expectOne(`${API}/paypal/create-order`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: { orderId: 'PP-ORD-001', status: 'CREATED' } });
    });

    it('sends the amount in the request body', () => {
      service.createPayPalOrder(750).subscribe();

      const req = httpMock.expectOne(`${API}/paypal/create-order`);
      expect(req.request.body).toEqual({ amount: 750 });
      req.flush({ success: true, data: { orderId: 'PP-ORD-002', status: 'CREATED' } });
    });

    it('returns orderId and status', () => {
      service.createPayPalOrder(300).subscribe(res => {
        expect(res.data.orderId).toBe('PP-ORD-001');
        expect(res.data.status).toBe('CREATED');
      });

      httpMock
        .expectOne(`${API}/paypal/create-order`)
        .flush({ success: true, data: { orderId: 'PP-ORD-001', status: 'CREATED' } });
    });
  });

  // ── capturePayPalOrder() ───────────────────────────────────────────────

  describe('capturePayPalOrder()', () => {
    it('sends POST to /payments/paypal/capture-order', () => {
      service.capturePayPalOrder('PP-ORD-001').subscribe();

      const req = httpMock.expectOne(`${API}/paypal/capture-order`);
      expect(req.request.method).toBe('POST');
      req.flush({
        success: true,
        data: { orderId: 'PP-ORD-001', status: 'COMPLETED', captureId: 'CAP-001' },
      });
    });

    it('sends the orderId in the request body', () => {
      service.capturePayPalOrder('PP-ORD-001').subscribe();

      const req = httpMock.expectOne(`${API}/paypal/capture-order`);
      expect(req.request.body).toEqual({ orderId: 'PP-ORD-001' });
      req.flush({
        success: true,
        data: { orderId: 'PP-ORD-001', status: 'COMPLETED', captureId: 'CAP-001' },
      });
    });

    it('returns orderId, status, and captureId', () => {
      service.capturePayPalOrder('PP-ORD-001').subscribe(res => {
        expect(res.data.status).toBe('COMPLETED');
        expect(res.data.captureId).toBe('CAP-001');
      });

      httpMock
        .expectOne(`${API}/paypal/capture-order`)
        .flush({
          success: true,
          data: { orderId: 'PP-ORD-001', status: 'COMPLETED', captureId: 'CAP-001' },
        });
    });
  });

  // ── confirmPayPalPayment() ─────────────────────────────────────────────

  describe('confirmPayPalPayment()', () => {
    it('sends POST to /payments/paypal/confirm-payment', () => {
      service.confirmPayPalPayment('ORD-010', 'CAP-001').subscribe();

      const req = httpMock.expectOne(`${API}/paypal/confirm-payment`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: undefined });
    });

    it('sends the correct body with orderNumber and captureId', () => {
      service.confirmPayPalPayment('ORD-010', 'CAP-001').subscribe();

      const req = httpMock.expectOne(`${API}/paypal/confirm-payment`);
      expect(req.request.body).toEqual({ orderNumber: 'ORD-010', captureId: 'CAP-001' });
      req.flush({ success: true, data: undefined });
    });

    it('completes without error on success', () => {
      let completed = false;

      service.confirmPayPalPayment('ORD-010', 'CAP-001').subscribe({
        next: () => { completed = true; },
      });

      httpMock
        .expectOne(`${API}/paypal/confirm-payment`)
        .flush({ success: true, data: null });

      expect(completed).toBeTrue();
    });
  });
});
