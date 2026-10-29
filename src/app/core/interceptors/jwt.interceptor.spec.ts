import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { jwtInterceptor } from './jwt.interceptor';

describe('jwtInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getToken', 'getRefreshToken', 'refreshToken', 'logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([jwtInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => httpMock.verify());

  it('adds Authorization header when token exists', () => {
    authService.getToken.and.returnValue('my-jwt-token');

    http.get('/api/products').subscribe();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.headers.get('Authorization')).toBe('Bearer my-jwt-token');
    req.flush({});
  });

  it('does not add Authorization header when no token', () => {
    authService.getToken.and.returnValue(null);

    http.get('/api/products').subscribe();

    const req = httpMock.expectOne('/api/products');
    expect(req.request.headers.has('Authorization')).toBeFalse();
    req.flush({});
  });

  it('calls logout when response is 401 for non-auth endpoints', () => {
    authService.getToken.and.returnValue('my-jwt-token');

    http.get('/api/orders').subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/orders');
    req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(authService.logout).toHaveBeenCalled();
  });

  it('does not call logout on 401 for auth endpoints', () => {
    authService.getToken.and.returnValue(null);

    http.post('/api/auth/login', {}).subscribe({ error: () => {} });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush({ message: 'Bad credentials' }, { status: 401, statusText: 'Unauthorized' });

    expect(authService.logout).not.toHaveBeenCalled();
  });

  it('propagates non-401 errors without logging out', () => {
    authService.getToken.and.returnValue('tok');
    let errorStatus = 0;

    http.get('/api/orders').subscribe({ error: (e) => (errorStatus = e.status) });

    const req = httpMock.expectOne('/api/orders');
    req.flush({}, { status: 500, statusText: 'Server Error' });

    expect(errorStatus).toBe(500);
    expect(authService.logout).not.toHaveBeenCalled();
  });

  describe('when the access token expired (401) and there is a refresh token', () => {
    let refresh$: Subject<any>;

    beforeEach(() => {
      let current = 'expired-token';
      authService.getToken.and.callFake(() => current);
      authService.getRefreshToken.and.returnValue('refresh-token');
      refresh$ = new Subject<any>();
      authService.refreshToken.and.callFake(() => refresh$.asObservable());
      // emulate AuthService.handleAuth storing the new token
      refresh$.subscribe(res => (current = res.data.accessToken));
    });

    const answerRefresh = () => {
      refresh$.next({ data: { accessToken: 'new-token' } });
      refresh$.complete();
    };

    it('renews the token once and retries the request with it', () => {
      let body: any;
      http.get('/api/orders').subscribe(b => (body = b));

      httpMock.expectOne('/api/orders').flush({}, { status: 401, statusText: 'Unauthorized' });
      expect(authService.refreshToken).toHaveBeenCalledTimes(1);
      answerRefresh();

      const retry = httpMock.expectOne('/api/orders');
      expect(retry.request.headers.get('Authorization')).toBe('Bearer new-token');
      retry.flush({ ok: true });

      expect(body).toEqual({ ok: true });
      expect(authService.logout).not.toHaveBeenCalled();
    });

    it('uses a single refresh for several requests that fail at the same time', () => {
      http.get('/api/cart').subscribe();
      http.get('/api/orders').subscribe();
      httpMock.expectOne('/api/cart').flush({}, { status: 401, statusText: 'Unauthorized' });
      httpMock.expectOne('/api/orders').flush({}, { status: 401, statusText: 'Unauthorized' });

      answerRefresh();

      expect(authService.refreshToken).toHaveBeenCalledTimes(1);
      httpMock.expectOne('/api/cart').flush({});
      httpMock.expectOne('/api/orders').flush({});
      expect(authService.logout).not.toHaveBeenCalled();
    });

    it('logs out when the refresh itself fails', () => {
      authService.refreshToken.and.returnValue(throwError(() => ({ status: 400 })));
      let errorStatus = 0;

      http.get('/api/orders').subscribe({ error: e => (errorStatus = e.status) });
      httpMock.expectOne('/api/orders').flush({}, { status: 401, statusText: 'Unauthorized' });

      expect(authService.logout).toHaveBeenCalled();
      expect(errorStatus).toBe(401);
    });

    it('logs out when the retried request is still unauthorized', () => {
      http.get('/api/orders').subscribe({ error: () => {} });
      httpMock.expectOne('/api/orders').flush({}, { status: 401, statusText: 'Unauthorized' });
      answerRefresh();
      httpMock.expectOne('/api/orders').flush({}, { status: 401, statusText: 'Unauthorized' });

      expect(authService.refreshToken).toHaveBeenCalledTimes(1);
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
