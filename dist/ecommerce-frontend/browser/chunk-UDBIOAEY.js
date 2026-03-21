import {
  AuthService
} from "./chunk-UCCDLCX6.js";
import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-TPU3W7C5.js";
import {
  __spreadProps,
  __spreadValues,
  computed,
  inject,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N3527UH3.js";

// src/app/core/services/cart.service.ts
var LOCAL_CART_KEY = "guest_cart";
var CartService = class _CartService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/cart`;
    this.couponApiUrl = `${environment.apiUrl}/coupons`;
    this.cartItems = signal([]);
    this.localCartItems = signal(this.loadLocalCart());
    this.appliedCoupon = signal(null);
    this.items = this.cartItems.asReadonly();
    this.localItems = this.localCartItems.asReadonly();
    this.coupon = this.appliedCoupon.asReadonly();
    this.itemCount = computed(() => {
      const auth = this.authService.isLoggedIn();
      return auth ? this.cartItems().reduce((sum, item) => sum + item.quantity, 0) : this.localCartItems().reduce((sum, item) => sum + item.quantity, 0);
    });
    this.subtotal = computed(() => {
      const auth = this.authService.isLoggedIn();
      return auth ? this.cartItems().reduce((sum, item) => sum + item.subtotal, 0) : this.localCartItems().reduce((sum, item) => sum + item.subtotal, 0);
    });
    this.discount = computed(() => {
      const c = this.appliedCoupon();
      if (!c)
        return 0;
      return Math.round(this.subtotal() * c.discountPercent) / 100;
    });
    this.total = computed(() => Math.max(0, this.subtotal() - this.discount()));
    this.authService = inject(AuthService);
  }
  loadLocalCart() {
    try {
      const raw = localStorage.getItem(LOCAL_CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  saveLocalCart(items) {
    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(items));
  }
  addLocalItem(item) {
    const current = this.localCartItems();
    const existing = current.find((i) => i.productId === item.productId && i.selectedSizeId === item.selectedSizeId && i.selectedColorName === item.selectedColorName);
    let updated;
    if (existing) {
      updated = current.map((i) => i === existing ? __spreadProps(__spreadValues({}, i), { quantity: i.quantity + item.quantity, subtotal: i.price * (i.quantity + item.quantity) }) : i);
    } else {
      const newItem = __spreadProps(__spreadValues({}, item), { tempId: crypto.randomUUID() });
      updated = [...current, newItem];
    }
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }
  removeLocalItem(tempId) {
    const updated = this.localCartItems().filter((i) => i.tempId !== tempId);
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }
  updateLocalQuantity(tempId, qty) {
    if (qty <= 0) {
      this.removeLocalItem(tempId);
      return;
    }
    const updated = this.localCartItems().map((i) => i.tempId === tempId ? __spreadProps(__spreadValues({}, i), { quantity: qty, subtotal: i.price * qty }) : i);
    this.localCartItems.set(updated);
    this.saveLocalCart(updated);
  }
  clearLocalCart() {
    this.localCartItems.set([]);
    localStorage.removeItem(LOCAL_CART_KEY);
  }
  loadCart() {
    if (!this.authService.isLoggedIn())
      return;
    this.http.get(this.apiUrl).subscribe({
      next: (res) => this.cartItems.set(res.data),
      error: () => this.cartItems.set([])
    });
  }
  validateCoupon(code) {
    const params = new HttpParams().set("code", code);
    return this.http.post(`${this.couponApiUrl}/validate`, null, { params }).pipe(tap((res) => this.appliedCoupon.set(res.data)));
  }
  removeCoupon() {
    this.appliedCoupon.set(null);
  }
  addToCart(productId, quantity = 1, sizeId) {
    const body = { productId, quantity };
    if (sizeId != null)
      body["sizeId"] = sizeId;
    return this.http.post(this.apiUrl, body).pipe(tap(() => this.loadCart()));
  }
  updateQuantity(itemId, quantity) {
    return this.http.put(`${this.apiUrl}/${itemId}`, { quantity }).pipe(tap(() => this.loadCart()));
  }
  removeItem(itemId) {
    return this.http.delete(`${this.apiUrl}/${itemId}`).pipe(tap(() => this.loadCart()));
  }
  clearCart() {
    return this.http.delete(this.apiUrl).pipe(tap(() => {
      this.cartItems.set([]);
      this.appliedCoupon.set(null);
    }));
  }
  resetLocalCart() {
    this.cartItems.set([]);
    this.appliedCoupon.set(null);
  }
  static {
    this.\u0275fac = function CartService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CartService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _CartService, factory: _CartService.\u0275fac, providedIn: "root" });
  }
};

export {
  CartService
};
//# sourceMappingURL=chunk-UDBIOAEY.js.map
