import {
  HttpClient,
  Router,
  environment
} from "./chunk-7NMHCVKZ.js";
import {
  computed,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RP6JOKCW.js";

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
//# sourceMappingURL=chunk-KYTBZJSG.js.map
