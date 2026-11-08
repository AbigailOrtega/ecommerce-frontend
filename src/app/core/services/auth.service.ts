import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, firstValueFrom, of, tap } from 'rxjs';
import { isBrowser } from '../ssr';
import { environment } from '@env/environment';
import { ApiResponse, AuthResponse, LoginRequest, RegisterRequest, User } from '@shared/models';

// Sessions opened before the refresh token moved to an HttpOnly cookie kept both tokens here
const LEGACY_ACCESS_TOKEN = 'accessToken';
const LEGACY_REFRESH_TOKEN = 'refreshToken';
// Only the profile is kept in the browser: it says a session probably exists, it grants nothing
const USER_KEY = 'user';

/**
 * The access token lives only in memory (30 minutes); the refresh token lives in an HttpOnly cookie
 * the page cannot read. On startup {@link restoreSession} trades the cookie for a fresh access token.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private currentUser = signal<User | null>(null);
  private accessToken = signal<string | null>(null);
  // the server renders every page as a visitor: sessions live in the browser (cookie + storage)
  private readonly browser = isBrowser();

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly isAdmin = computed(() => !!this.currentUser() && this.roleFromToken(this.accessToken()) === 'ADMIN');

  constructor(private http: HttpClient, private router: Router) {
    this.loadUser();
  }

  private loadUser(): void {
    if (!this.browser) return;
    const userData = localStorage.getItem(USER_KEY);
    if (userData) {
      try {
        this.currentUser.set(JSON.parse(userData));
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
  }

  /**
   * Runs before the first navigation (APP_INITIALIZER): renews the access token with the cookie so
   * guards and the first requests already see the session. Visitors who never logged in skip the call.
   */
  restoreSession(): Promise<void> {
    if (!this.browser) return Promise.resolve();
    localStorage.removeItem(LEGACY_ACCESS_TOKEN);
    if (!this.currentUser() && !localStorage.getItem(LEGACY_REFRESH_TOKEN)) {
      return Promise.resolve();
    }
    return firstValueFrom(this.refreshToken().pipe(
      catchError(() => {
        this.clearSession();
        return of(null);
      }),
    )).then(() => undefined);
  }

  register(request: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/register`, request, { withCredentials: true })
      .pipe(tap(res => this.handleAuth(res.data)));
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/login`, request, { withCredentials: true })
      .pipe(tap(res => this.handleAuth(res.data)));
  }

  forgotPassword(email: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    // The cookie carries the token; the body only matters once, for a session from before the cookie
    const legacy = localStorage.getItem(LEGACY_REFRESH_TOKEN);
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/refresh`,
      legacy ? { refreshToken: legacy } : {}, { withCredentials: true })
      .pipe(tap(res => {
        localStorage.removeItem(LEGACY_REFRESH_TOKEN);
        this.handleAuth(res.data);
      }));
  }

  logout(): void {
    // Expire the cookie on the server; the local session ends right away either way
    this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).subscribe({ error: () => {} });
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.accessToken();
  }

  isTokenValid(): boolean {
    const payload = this.payload(this.accessToken());
    return !!payload && payload.exp * 1000 > Date.now();
  }

  private clearSession(): void {
    localStorage.removeItem(LEGACY_ACCESS_TOKEN);
    localStorage.removeItem(LEGACY_REFRESH_TOKEN);
    localStorage.removeItem(USER_KEY);
    this.accessToken.set(null);
    this.currentUser.set(null);
  }

  private roleFromToken(token: string | null): string | null {
    return this.payload(token)?.role ?? null;
  }

  private payload(token: string | null): { exp: number; role?: string } | null {
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return null;
    }
  }

  private handleAuth(auth: AuthResponse): void {
    this.accessToken.set(auth.accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(auth.user));
    this.currentUser.set(auth.user);
  }
}
