import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShippingService } from './shipping.service';
import { ShippingConfig, PickupLocation, ShippingRatesResponse } from '@shared/models';

const API = 'http://localhost:8080/api/shipping';

describe('ShippingService', () => {
  let service: ShippingService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShippingService],
    });
    service = TestBed.inject(ShippingService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getConfig() ────────────────────────────────────────────────────────────

  describe('getConfig()', () => {
    it('sends GET to /shipping/config', () => {
      const mockConfig: ShippingConfig = {
        nationalEnabled: true,
        pickupEnabled: true,
        nationalBasePrice: 100,
        nationalPricePerKm: 2,
        pickupCost: 0,
      };

      service.getConfig().subscribe(res => {
        expect(res.data).toEqual(mockConfig);
      });

      const req = httpMock.expectOne(`${API}/config`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: mockConfig });
    });

    it('includes whatsappNumber in the response when configured', () => {
      const mockConfig: ShippingConfig = {
        nationalEnabled: true,
        pickupEnabled: true,
        nationalBasePrice: 0,
        nationalPricePerKm: 0,
        pickupCost: 0,
        whatsappNumber: '5215512345678',
      };

      service.getConfig().subscribe(res => {
        expect(res.data.whatsappNumber).toBe('5215512345678');
      });

      httpMock.expectOne(`${API}/config`).flush({ success: true, data: mockConfig });
    });

    it('whatsappNumber is undefined when not configured', () => {
      const mockConfig: ShippingConfig = {
        nationalEnabled: true,
        pickupEnabled: true,
        nationalBasePrice: 0,
        nationalPricePerKm: 0,
        pickupCost: 0,
      };

      service.getConfig().subscribe(res => {
        expect(res.data.whatsappNumber).toBeUndefined();
      });

      httpMock.expectOne(`${API}/config`).flush({ success: true, data: mockConfig });
    });
  });

  // ── getPickupLocations() ───────────────────────────────────────────────────

  describe('getPickupLocations()', () => {
    it('sends GET to /shipping/pickup-locations', () => {
      const mockLocations: PickupLocation[] = [
        {
          id: 1,
          name: 'Sucursal Norte',
          address: 'Av. Norte 123',
          city: 'CDMX',
          state: 'CDMX',
          active: true,
        },
      ];

      service.getPickupLocations().subscribe(res => {
        expect(res.data).toEqual(mockLocations);
      });

      const req = httpMock.expectOne(`${API}/pickup-locations`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: mockLocations });
    });

    it('returns empty list when no locations exist', () => {
      service.getPickupLocations().subscribe(res => {
        expect(res.data).toEqual([]);
      });

      httpMock.expectOne(`${API}/pickup-locations`).flush({ success: true, data: [] });
    });
  });

  // ── calculateNational() ────────────────────────────────────────────────────

  describe('calculateNational()', () => {
    const address  = 'Calle Falsa 123';
    const city     = 'Guadalajara';
    const state    = 'Jalisco';
    const zipCode  = '44100';
    const country  = 'MX';

    it('sends POST to /shipping/calculate-national', () => {
      service.calculateNational(address, city, state, zipCode, country).subscribe();

      const req = httpMock.expectOne(`${API}/calculate-national`);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: { skydropxAvailable: false, distanceKm: 10, flatPrice: 120, rates: [] } });
    });

    it('sends the correct body { address, city, state, zipCode, country }', () => {
      service.calculateNational(address, city, state, zipCode, country).subscribe();

      const req = httpMock.expectOne(`${API}/calculate-national`);
      expect(req.request.body).toEqual({ address, city, state, zipCode, country });
      req.flush({ success: true, data: { skydropxAvailable: false, distanceKm: 5, flatPrice: 80, rates: [] } });
    });

    it('returns ShippingRatesResponse with flatPrice and rates', () => {
      const mockResponse: ShippingRatesResponse = {
        skydropxAvailable: true,
        distanceKm: 20,
        flatPrice: 150,
        quotationId: 'q-123',
        rates: [
          { id: 'r-1', carrier: 'Estafeta', service: 'Express', price: 180, estimatedDays: 2 },
        ],
      };

      service.calculateNational(address, city, state, zipCode, country).subscribe(res => {
        expect(res.data).toEqual(mockResponse);
        expect(res.data.rates.length).toBe(1);
        expect(res.data.flatPrice).toBe(150);
      });

      httpMock.expectOne(`${API}/calculate-national`).flush({ success: true, data: mockResponse });
    });
  });
});
