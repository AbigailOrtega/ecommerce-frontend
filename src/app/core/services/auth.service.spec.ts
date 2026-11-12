import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: jasmine.SpyObj<Router>;
  const API = 'http://localhost:8080/api/auth';

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const authResp = {
    success: true,
    data: {
      accessToken: 'h.' + btoa(JSON.stringify({ role: 'ADMIN', exp: Date.now() / 1000 + 600 })) + '.s',
      user: { id: 1, firstName: 'Ana', lastName: 'L', email: 'a@a.com', role: 'ADMIN' },
    },
  };

  // ── isLoggedIn ────────────────────────────────────────────────────────────

  describe('isLoggedIn', () => {
    it('returns false when no user is stored', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('returns true when the user profile is stored', () => {
      localStorage.setItem('user', JSON.stringify({ id: 1, email: 'a@a.com', role: 'CUSTOMER' }));
      service['loadUser']();
      expect(service.isLoggedIn()).toBeTrue();
    });
  });

  // ── login ─────────────────────────────────────────────────────────────────

  describe('login', () => {
    it('keeps the access token in memory only and sends credentials so the cookie is set', () => {
      service.login({ email: 'a@a.com', password: 'pass' }).subscribe();

      const req = httpMock.expectOne(`${API}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBeTrue();
      expect(req.request.body).toEqual({ email: 'a@a.com', password: 'pass' });
      req.flush(authResp);

      expect(service.getToken()).toBe(authResp.data.accessToken);
      expect(service.isLoggedIn()).toBeTrue();
      expect(service.isAdmin()).toBeTrue();
      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(JSON.parse(localStorage.getItem('user')!).email).toBe('a@a.com');
    });
  });

  // ── restoreSession ────────────────────────────────────────────────────────

  describe('restoreSession', () => {
    it('does not call the server for visitors without a session', async () => {
      await service.restoreSession();
      httpMock.expectNone(`${API}/refresh`);
    });

    it('renews the access token with the cookie when a user is stored', async () => {
      localStorage.setItem('user', JSON.stringify(authResp.data.user));
      service['loadUser']();

      const done = service.restoreSession();
      const req = httpMock.expectOne(`${API}/refresh`);
      expect(req.request.withCredentials).toBeTrue();
      expect(req.request.body).toEqual({});
      req.flush(authResp);
      await done;

      expect(service.getToken()).toBe(authResp.data.accessToken);
    });

    it('moves a session from before the cookie: sends the stored refresh token once, then forgets it', async () => {
      localStorage.setItem('accessToken', 'old-access');
      localStorage.setItem('refreshToken', 'old-refresh');

      const done = service.restoreSession();
      const req = httpMock.expectOne(`${API}/refresh`);
      expect(req.request.body).toEqual({ refreshToken: 'old-refresh' });
      req.flush(authResp);
      await done;

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
      expect(service.isLoggedIn()).toBeTrue();
    });

    it('ends the session when the cookie is no longer valid', async () => {
      localStorage.setItem('user', JSON.stringify(authResp.data.user));
      service['loadUser']();

      const done = service.restoreSession();
      httpMock.expectOne(`${API}/refresh`).flush({}, { status: 400, statusText: 'Bad Request' });
      await done;

      expect(service.isLoggedIn()).toBeFalse();
      expect(localStorage.getItem('user')).toBeNull();
    });
  });

  // ── logout ────────────────────────────────────────────────────────────────

  describe('logout', () => {
    it('asks the server to drop the cookie, clears the session and navigates to /login', () => {
      service.login({ email: 'a@a.com', password: 'pass' }).subscribe();
      httpMock.expectOne(`${API}/login`).flush(authResp);

      service.logout();

      const req = httpMock.expectOne(`${API}/logout`);
      expect(req.request.withCredentials).toBeTrue();
      req.flush({ success: true });
      expect(service.getToken()).toBeNull();
      expect(service.isLoggedIn()).toBeFalse();
      expect(localStorage.getItem('user')).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  // ── forgotPassword ────────────────────────────────────────────────────────

  describe('forgotPassword', () => {
    it('sends POST to /forgot-password with email in body', () => {
      service.forgotPassword('a@a.com').subscribe();

      const req = httpMock.expectOne(`${API}/forgot-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'a@a.com' });
      req.flush({ success: true });
    });
  });

  // ── resetPassword ─────────────────────────────────────────────────────────

  describe('resetPassword', () => {
    it('sends POST to /reset-password with token and newPassword in body', () => {
      service.resetPassword('my-token', 'newPass123').subscribe();

      const req = httpMock.expectOne(`${API}/reset-password`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ token: 'my-token', newPassword: 'newPass123' });
      req.flush({ success: true });
    });
  });

  // ── getToken ──────────────────────────────────────────────────────────────

  describe('getToken', () => {
    it('returns null before logging in', () => {
      expect(service.getToken()).toBeNull();
    });

    it('never reads a token from localStorage', () => {
      localStorage.setItem('accessToken', 'my-token');
      expect(service.getToken()).toBeNull();
    });
  });
});
