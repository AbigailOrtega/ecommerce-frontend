import {
  environment
} from "./chunk-FQ2SHJAF.js";
import {
  HttpClient,
  HttpParams
} from "./chunk-TPU3W7C5.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-N3527UH3.js";

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
  getUpcomingSchedule() {
    return this.http.get(`${this.apiUrl}/orders/upcoming-schedule`);
  }
  getSalesReport(period) {
    return this.http.get(`${this.apiUrl}/reports/sales?period=${period}`);
  }
  getTopSellingProducts(limit = 20) {
    return this.http.get(`${this.apiUrl}/reports/products/top-selling?limit=${limit}`);
  }
  getLeastSellingProducts(limit = 20) {
    return this.http.get(`${this.apiUrl}/reports/products/least-selling?limit=${limit}`);
  }
  getInventoryReport() {
    return this.http.get(`${this.apiUrl}/reports/inventory`);
  }
  getOutOfStockProducts() {
    return this.http.get(`${this.apiUrl}/reports/out-of-stock`);
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
  getPromotions() {
    return this.http.get(`${this.apiUrl}/promotions`);
  }
  createPromotion(req) {
    return this.http.post(`${this.apiUrl}/promotions`, req);
  }
  updatePromotion(id, req) {
    return this.http.put(`${this.apiUrl}/promotions/${id}`, req);
  }
  deletePromotion(id) {
    return this.http.delete(`${this.apiUrl}/promotions/${id}`);
  }
  togglePromotion(id) {
    return this.http.patch(`${this.apiUrl}/promotions/${id}/toggle`, {});
  }
  getBanners() {
    return this.http.get(`${this.apiUrl}/banners`);
  }
  createBanner(req) {
    return this.http.post(`${this.apiUrl}/banners`, req);
  }
  updateBanner(id, req) {
    return this.http.put(`${this.apiUrl}/banners/${id}`, req);
  }
  deleteBanner(id) {
    return this.http.delete(`${this.apiUrl}/banners/${id}`);
  }
  toggleBanner(id) {
    return this.http.patch(`${this.apiUrl}/banners/${id}/toggle`, {});
  }
  getCoupons() {
    return this.http.get(`${this.apiUrl}/coupons`);
  }
  createCoupon(req) {
    return this.http.post(`${this.apiUrl}/coupons`, req);
  }
  updateCoupon(id, req) {
    return this.http.put(`${this.apiUrl}/coupons/${id}`, req);
  }
  deleteCoupon(id) {
    return this.http.delete(`${this.apiUrl}/coupons/${id}`);
  }
  toggleCoupon(id) {
    return this.http.patch(`${this.apiUrl}/coupons/${id}/toggle`, {});
  }
  getPendingReviews() {
    return this.http.get(`${this.apiUrl}/reviews/pending`);
  }
  approveReview(id) {
    return this.http.patch(`${this.apiUrl}/reviews/${id}/approve`, {});
  }
  deleteReview(id) {
    return this.http.delete(`${this.apiUrl}/reviews/${id}`);
  }
  getAllTickets() {
    return this.http.get(`${this.apiUrl}/tickets`);
  }
  updateTicket(id, req) {
    return this.http.put(`${this.apiUrl}/tickets/${id}`, req);
  }
  getShippingConfig() {
    return this.http.get(`${this.apiUrl}/shipping/config`);
  }
  updateShippingConfig(req) {
    return this.http.put(`${this.apiUrl}/shipping/config`, req);
  }
  getPickupLocations() {
    return this.http.get(`${this.apiUrl}/pickup-locations`);
  }
  createPickupLocation(req) {
    return this.http.post(`${this.apiUrl}/pickup-locations`, req);
  }
  updatePickupLocation(id, req) {
    return this.http.put(`${this.apiUrl}/pickup-locations/${id}`, req);
  }
  deletePickupLocation(id) {
    return this.http.delete(`${this.apiUrl}/pickup-locations/${id}`);
  }
  togglePickupLocation(id) {
    return this.http.patch(`${this.apiUrl}/pickup-locations/${id}/toggle`, {});
  }
  addTimeSlot(locationId, req) {
    return this.http.post(`${this.apiUrl}/pickup-locations/${locationId}/time-slots`, req);
  }
  updateTimeSlot(lid, sid, req) {
    return this.http.put(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}`, req);
  }
  deleteTimeSlot(lid, sid) {
    return this.http.delete(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}`);
  }
  toggleTimeSlot(lid, sid) {
    return this.http.patch(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}/toggle`, {});
  }
  // ── Pickup Availability ────────────────────────────────────────────────────
  getPickupAvailability(lid) {
    return this.http.get(`${this.apiUrl}/pickup-locations/${lid}/availability`);
  }
  createPickupAvailability(lid, req) {
    return this.http.post(`${this.apiUrl}/pickup-locations/${lid}/availability`, req);
  }
  updatePickupAvailability(lid, aid, req) {
    return this.http.put(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}`, req);
  }
  deletePickupAvailability(lid, aid) {
    return this.http.delete(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}`);
  }
  togglePickupAvailability(lid, aid) {
    return this.http.patch(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}/toggle`, {});
  }
  // ── Skydropx ──────────────────────────────────────────────────────────────
  getSkydropxQuotation(orderId) {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/skydropx/quotation`, {});
  }
  createSkydropxShipment(orderId, rateId) {
    return this.http.post(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`, { rateId });
  }
  refreshSkydropxShipment(orderId) {
    return this.http.get(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`);
  }
  downloadSkydropxLabel(orderId) {
    return this.http.get(`${this.apiUrl}/orders/${orderId}/skydropx/label`, { responseType: "blob" });
  }
  cancelSkydropxShipment(orderId) {
    return this.http.delete(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`);
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
//# sourceMappingURL=chunk-DPPNASQT.js.map
