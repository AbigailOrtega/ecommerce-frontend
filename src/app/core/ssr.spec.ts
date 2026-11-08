import { REQUEST } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FetchBackend, HttpRequest, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { SERVER_API_ORIGIN, ServerApiBackend } from './ssr';

describe('ServerApiBackend', () => {
  let sent: HttpRequest<unknown>[];
  let backend: ServerApiBackend;

  beforeEach(() => {
    sent = [];
    TestBed.configureTestingModule({
      providers: [
        ServerApiBackend,
        { provide: SERVER_API_ORIGIN, useValue: 'https://backend.example.com/' },
        { provide: REQUEST, useValue: new Request('https://mareatextiles.com/products/cojin') },
        { provide: FetchBackend, useValue: { handle: (r: HttpRequest<unknown>) => { sent.push(r); return of(new HttpResponse()); } } },
      ],
    });
    backend = TestBed.inject(ServerApiBackend);
  });

  it('sends relative API calls to the backend while rendering on the server', () => {
    backend.handle(new HttpRequest('GET', '/api/products')).subscribe();
    expect(sent[0].url).toBe('https://backend.example.com/api/products');
  });

  it('sends the site\'s own /api/… (already made absolute by Angular) to the backend', () => {
    backend.handle(new HttpRequest('GET', 'https://mareatextiles.com/api/products?page=1')).subscribe();
    expect(sent[0].url).toBe('https://backend.example.com/api/products?page=1');
  });

  it('keeps other absolute URLs', () => {
    backend.handle(new HttpRequest('GET', 'http://localhost:8080/api/products')).subscribe();
    expect(sent[0].url).toBe('http://localhost:8080/api/products');
  });
});
