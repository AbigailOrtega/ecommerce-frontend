import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-7NMHCVKZ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RP6JOKCW.js";

// src/app/core/services/admin.service.ts
var AdminService = class _AdminService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/admin`;
    this.uploadUrl = `${environment.apiUrl}/upload`;
  }
  getDashboardStats() {
    return this.http.get(`${this.apiUrl}/dashboard`);
  }
  getAllOrders(page = 0, size = 20) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(`${this.apiUrl}/orders`, { params });
  }
  getOrderById(id) {
    return this.http.get(`${this.apiUrl}/orders/${id}`);
  }
  updateOrderStatus(id, status) {
    return this.http.put(`${this.apiUrl}/orders/${id}/status`, { status });
  }
  getAllProducts(page = 0, size = 20) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(`${this.apiUrl}/products`, { params });
  }
  getAllUsers() {
    return this.http.get(`${this.apiUrl}/users`);
  }
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.uploadUrl}/image`, formData);
  }
  static {
    this.\u0275fac = function AdminService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AdminService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AdminService, factory: _AdminService.\u0275fac, providedIn: "root" });
  }
};

export {
  AdminService
};
//# sourceMappingURL=chunk-CZXKLA4A.js.map
