import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { REQUEST } from '@angular/core';
import { STORE_HOST_HEADER, storeHostInterceptor } from './store-host.interceptor';

describe('storeHostInterceptor', () => {
  function setup(request?: Request) {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([storeHostInterceptor])),
        provideHttpClientTesting(),
        ...(request ? [{ provide: REQUEST, useValue: request }] : []),
      ],
    });
    return { http: TestBed.inject(HttpClient), ctrl: TestBed.inject(HttpTestingController) };
  }

  it('sends the page host with API calls in the browser', () => {
    const { http, ctrl } = setup();
    http.get('/api/products').subscribe();
    expect(ctrl.expectOne('/api/products').request.headers.get(STORE_HOST_HEADER)).toBe(location.host);
    ctrl.verify();
  });

  it('sends the visitor host while rendering on the server', () => {
    const { http, ctrl } = setup(new Request('https://www.papeleria.mx/products/lapiz'));
    http.get('https://www.papeleria.mx/api/store-info').subscribe();
    expect(ctrl.expectOne('https://www.papeleria.mx/api/store-info').request.headers.get(STORE_HOST_HEADER))
      .toBe('www.papeleria.mx');
    ctrl.verify();
  });

  it('leaves calls to other services alone', () => {
    const { http, ctrl } = setup();
    http.get('https://api.stripe.com/v1/x').subscribe();
    expect(ctrl.expectOne('https://api.stripe.com/v1/x').request.headers.has(STORE_HOST_HEADER)).toBeFalse();
    ctrl.verify();
  });
});
