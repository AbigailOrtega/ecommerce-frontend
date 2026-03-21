import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  Router
} from "./chunk-ZS3NQH2Z.js";
import {
  HttpClient
} from "./chunk-TPU3W7C5.js";
import {
  computed,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N3527UH3.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http, router) {
    this.http = http;
    this.router = router;
    this.apiUrl = `${environment.apiUrl}/auth`;
    this.currentUser = signal(null);
    this.user = this.currentUser.asReadonly();
    this.isLoggedIn = computed(() => !!this.currentUser());
    this.isAdmin = computed(() => this.currentUser()?.role === "ADMIN");
    this.loadUser();
  }
  loadUser() {
    const token = this.getToken();
    const userData = localStorage.getItem("user");
    if (token && userData) {
      this.currentUser.set(JSON.parse(userData));
    }
  }
  register(request) {
    return this.http.post(`${this.apiUrl}/register`, request).pipe(tap((res) => this.handleAuth(res.data)));
  }
  login(request) {
    console.log("STARTING LOGIN");
    return this.http.post(`${this.apiUrl}/login`, request).pipe(tap((response) => {
      console.log("Respuesta completa:", response);
    }), tap((res) => this.handleAuth(res.data)));
  }
  forgotPassword(email) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }
  resetPassword(token, newPassword) {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }
  refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken }).pipe(tap((res) => this.handleAuth(res.data)));
  }
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    this.currentUser.set(null);
    this.router.navigate(["/login"]);
  }
  getToken() {
    return localStorage.getItem("accessToken");
  }
  handleAuth(auth) {
    console.log("handdiling");
    localStorage.setItem("accessToken", auth.accessToken);
    localStorage.setItem("refreshToken", auth.refreshToken);
    localStorage.setItem("user", JSON.stringify(auth.user));
    this.currentUser.set(auth.user);
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)(\u0275\u0275inject(HttpClient), \u0275\u0275inject(Router));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-UCCDLCX6.js.map
