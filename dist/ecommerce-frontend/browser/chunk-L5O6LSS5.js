import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  HttpClient
} from "./chunk-TPU3W7C5.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N3527UH3.js";

// src/app/core/services/shipping.service.ts
var ShippingService = class _ShippingService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/shipping`;
  }
  getConfig() {
    return this.http.get(`${this.apiUrl}/config`);
  }
  getPickupLocations() {
    return this.http.get(`${this.apiUrl}/pickup-locations`);
  }
  calculateNational(address, city, state, zipCode, country) {
    return this.http.post(`${this.apiUrl}/calculate-national`, { address, city, state, zipCode, country });
  }
  static {
    this.\u0275fac = function ShippingService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ShippingService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ShippingService, factory: _ShippingService.\u0275fac, providedIn: "root" });
  }
};

export {
  ShippingService
};
//# sourceMappingURL=chunk-L5O6LSS5.js.map
