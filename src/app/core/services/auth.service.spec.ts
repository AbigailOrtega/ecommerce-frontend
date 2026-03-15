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

  // ── isLoggedIn ────────────────────────────────────────────────────────────

  describe('isLoggedIn', () => {
    it('returns false when no token in localStorage', () => {
      expect(service.isLoggedIn()).toBeFalse();
    });

    it('returns true when token and user are in localStorage', () => {
      localStorage.setItem('accessToken', 'tok');
      localStorage.setItem('user', JSON.stringify({ id: 1, email: 'a@a.com', role: 'CUSTOMER' }));
      // Reload service to trigger loadUser()
      service['loadUser']();
      expect(service.isLoggedIn()).toBeTrue();
    });
  });

  // ── login ─────────────────────────────────────────────────────────────────

  describe('login', () => {
    it('stores tokens and user in localStorage on success', () => {
      const mockResp = {
        success: true,
        data: {
          accessToken: 'access',
          refreshToken: 'refresh',
          user: { id: 1, firstName: 'Ana', lastName: 'L', email: 'a@a.com', role: 'CUSTOMER' },
        },
      };

      service.login({ email: 'a@a.com', password: 'pass' }).subscribe(() => {
        expect(localStorage.getItem('accessToken')).toBe('access');
        expect(localStorage.getItem('refreshToken')).toBe('refresh');
        expect(service.isLoggedIn()).toBeTrue();
      });

      const req = httpMock.expectOne(`${API}/login`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: 'a@a.com', password: 'pass' });
      req.flush(mockResp);
    });
  });

  // ── logout ────────────────────────────────────────────────────────────────

  describe('logout', () => {
    it('clears localStorage and navigates to /login', () => {
      localStorage.setItem('accessToken', 'tok');
      localStorage.setItem('refreshToken', 'ref');
      localStorage.setItem('user', '{}');

      service.logout();

      expect(localStorage.getItem('accessToken')).toBeNull();
      expect(localStorage.getItem('refreshToken')).toBeNull();
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
    it('returns null when no token stored', () => {
      expect(service.getToken()).toBeNull();
    });

    it('returns token from localStorage', () => {
      localStorage.setItem('accessToken', 'my-token');
      expect(service.getToken()).toBe('my-token');
    });
  });
});
