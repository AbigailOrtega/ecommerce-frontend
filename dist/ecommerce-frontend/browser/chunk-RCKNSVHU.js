import {
  HttpClient,
  environment
} from "./chunk-7NMHCVKZ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RP6JOKCW.js";

// src/app/core/services/order.service.ts
var OrderService = class _OrderService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/orders`;
  }
  createOrder(request) {
    return this.http.post(this.apiUrl, request);
  }
  getUserOrders() {
    return this.http.get(this.apiUrl);
  }
  getOrderByNumber(orderNumber) {
    return this.http.get(`${this.apiUrl}/${orderNumber}`);
  }
  static {
    this.\u0275fac = function OrderService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _OrderService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrderService, factory: _OrderService.\u0275fac, providedIn: "root" });
  }
};

export {
  OrderService
};
//# sourceMappingURL=chunk-RCKNSVHU.js.map
