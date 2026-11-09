import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { PageviewService } from './pageview.service';

describe('PageviewService', () => {
  let service: PageviewService;
  let http: HttpTestingController;
  const API = 'http://localhost:8080/api/analytics/pageview';

  beforeEach(() => {
    sessionStorage.clear();
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(PageviewService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
    sessionStorage.clear();
  });

  it('sends the page without its query string, with the visit\'s session', () => {
    service.track('/products/cojin?color=azul#fotos');
    const body = http.expectOne(API).request.body;
    expect(body.path).toBe('/products/cojin');
    expect(body.sessionId).toMatch(/^[a-z0-9]+$/);
  });

  it('sends the utm_source with the first page of the visit only', () => {
    service.track('/?utm_source=instagram&utm_medium=bio');
    expect(http.expectOne(API).request.body.source).toBe('instagram');

    service.track('/products/cojin?utm_source=instagram');
    expect(http.expectOne(API).request.body.source).toBeUndefined();
  });

  it('keeps the same session for every page of the visit', () => {
    service.track('/');
    service.track('/contacto');
    const [a, b] = http.match(API).map(r => r.request.body.sessionId);
    expect(a).toBe(b);
  });
});
