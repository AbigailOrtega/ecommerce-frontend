import {
  HttpClient,
  environment
} from "./chunk-7NMHCVKZ.js";
import {
  computed,
  signal,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RP6JOKCW.js";

// src/app/core/services/cart.service.ts
var CartService = class _CartService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/cart`;
    this.cartItems = signal([]);
    this.items = this.cartItems.asReadonly();
    this.itemCount = computed(() => this.cartItems().reduce((sum, item) => sum + item.quantity, 0));
    this.total = computed(() => this.cartItems().reduce((sum, item) => sum + item.subtotal, 0));
  }
  loadCart() {
    this.http.get(this.apiUrl).subscribe({
      next: (res) => this.cartItems.set(res.data),
      error: () => this.cartItems.set([])
    });
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
    return this.http.delete(this.apiUrl).pipe(tap(() => this.cartItems.set([])));
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
//# sourceMappingURL=chunk-L245GHPG.js.map
