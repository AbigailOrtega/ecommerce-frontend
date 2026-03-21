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

// src/app/core/services/store-info.service.ts
var StoreInfoService = class _StoreInfoService {
  constructor(http) {
    this.http = http;
    this.publicUrl = `${environment.apiUrl}/store-info`;
    this.adminUrl = `${environment.apiUrl}/admin/store-info`;
  }
  getPublic() {
    return this.http.get(this.publicUrl);
  }
  update(req) {
    return this.http.put(this.adminUrl, req);
  }
  addImage(url) {
    return this.http.post(`${this.adminUrl}/images`, { url });
  }
  deleteImage(id) {
    return this.http.delete(`${this.adminUrl}/images/${id}`);
  }
  reorder(ids) {
    return this.http.put(`${this.adminUrl}/images/reorder`, ids);
  }
  static {
    this.\u0275fac = function StoreInfoService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _StoreInfoService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StoreInfoService, factory: _StoreInfoService.\u0275fac, providedIn: "root" });
  }
};

export {
  StoreInfoService
};
//# sourceMappingURL=chunk-CBRWNEVA.js.map
