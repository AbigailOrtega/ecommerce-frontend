import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, Coupon, CouponRequest, DashboardStats, Order, Page, PickupLocation, PickupLocationRequest, PickupTimeSlot, PickupTimeSlotRequest, Product, PromoBanner, PromoBannerRequest, Promotion, PromotionRequest, Review, ShippingConfig, SkydropxQuotation, Ticket, TicketUpdateRequest, User } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiUrl}/dashboard`);
  }

  getAllOrders(page = 0, size = 20): Observable<ApiResponse<Page<Order>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Order>>>(`${this.apiUrl}/orders`, { params });
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<ApiResponse<Order>> {
    return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}/status`, { status });
  }

  getAllProducts(page = 0, size = 20): Observable<ApiResponse<Page<Product>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Product>>>(`${this.apiUrl}/products`, { params });
  }

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`);
  }

  uploadImage(file: File): Observable<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<{ url: string }>>(`${this.uploadUrl}/image`, formData);
  }

  getPromotions(): Observable<ApiResponse<Promotion[]>> {
    return this.http.get<ApiResponse<Promotion[]>>(`${this.apiUrl}/promotions`);
  }

  createPromotion(req: PromotionRequest): Observable<ApiResponse<Promotion>> {
    return this.http.post<ApiResponse<Promotion>>(`${this.apiUrl}/promotions`, req);
  }

  updatePromotion(id: number, req: PromotionRequest): Observable<ApiResponse<Promotion>> {
    return this.http.put<ApiResponse<Promotion>>(`${this.apiUrl}/promotions/${id}`, req);
  }

  deletePromotion(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/promotions/${id}`);
  }

  togglePromotion(id: number): Observable<ApiResponse<Promotion>> {
    return this.http.patch<ApiResponse<Promotion>>(`${this.apiUrl}/promotions/${id}/toggle`, {});
  }

  getBanners(): Observable<ApiResponse<PromoBanner[]>> {
    return this.http.get<ApiResponse<PromoBanner[]>>(`${this.apiUrl}/banners`);
  }

  createBanner(req: PromoBannerRequest): Observable<ApiResponse<PromoBanner>> {
    return this.http.post<ApiResponse<PromoBanner>>(`${this.apiUrl}/banners`, req);
  }

  updateBanner(id: number, req: PromoBannerRequest): Observable<ApiResponse<PromoBanner>> {
    return this.http.put<ApiResponse<PromoBanner>>(`${this.apiUrl}/banners/${id}`, req);
  }

  deleteBanner(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/banners/${id}`);
  }

  toggleBanner(id: number): Observable<ApiResponse<PromoBanner>> {
    return this.http.patch<ApiResponse<PromoBanner>>(`${this.apiUrl}/banners/${id}/toggle`, {});
  }

  getCoupons(): Observable<ApiResponse<Coupon[]>> {
    return this.http.get<ApiResponse<Coupon[]>>(`${this.apiUrl}/coupons`);
  }

  createCoupon(req: CouponRequest): Observable<ApiResponse<Coupon>> {
    return this.http.post<ApiResponse<Coupon>>(`${this.apiUrl}/coupons`, req);
  }

  updateCoupon(id: number, req: CouponRequest): Observable<ApiResponse<Coupon>> {
    return this.http.put<ApiResponse<Coupon>>(`${this.apiUrl}/coupons/${id}`, req);
  }

  deleteCoupon(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/coupons/${id}`);
  }

  toggleCoupon(id: number): Observable<ApiResponse<Coupon>> {
    return this.http.patch<ApiResponse<Coupon>>(`${this.apiUrl}/coupons/${id}/toggle`, {});
  }

  getPendingReviews(): Observable<ApiResponse<Review[]>> {
    return this.http.get<ApiResponse<Review[]>>(`${this.apiUrl}/reviews/pending`);
  }

  approveReview(id: number): Observable<ApiResponse<Review>> {
    return this.http.patch<ApiResponse<Review>>(`${this.apiUrl}/reviews/${id}/approve`, {});
  }

  deleteReview(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/reviews/${id}`);
  }

  getAllTickets(): Observable<ApiResponse<Ticket[]>> {
    return this.http.get<ApiResponse<Ticket[]>>(`${this.apiUrl}/tickets`);
  }

  updateTicket(id: number, req: TicketUpdateRequest): Observable<ApiResponse<Ticket>> {
    return this.http.put<ApiResponse<Ticket>>(`${this.apiUrl}/tickets/${id}`, req);
  }

  getShippingConfig(): Observable<ApiResponse<ShippingConfig>> {
    return this.http.get<ApiResponse<ShippingConfig>>(`${this.apiUrl}/shipping/config`);
  }

  updateShippingConfig(req: Partial<ShippingConfig>): Observable<ApiResponse<ShippingConfig>> {
    return this.http.put<ApiResponse<ShippingConfig>>(`${this.apiUrl}/shipping/config`, req);
  }

  getPickupLocations(): Observable<ApiResponse<PickupLocation[]>> {
    return this.http.get<ApiResponse<PickupLocation[]>>(`${this.apiUrl}/pickup-locations`);
  }

  createPickupLocation(req: PickupLocationRequest): Observable<ApiResponse<PickupLocation>> {
    return this.http.post<ApiResponse<PickupLocation>>(`${this.apiUrl}/pickup-locations`, req);
  }

  updatePickupLocation(id: number, req: PickupLocationRequest): Observable<ApiResponse<PickupLocation>> {
    return this.http.put<ApiResponse<PickupLocation>>(`${this.apiUrl}/pickup-locations/${id}`, req);
  }

  deletePickupLocation(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/pickup-locations/${id}`);
  }

  togglePickupLocation(id: number): Observable<ApiResponse<PickupLocation>> {
    return this.http.patch<ApiResponse<PickupLocation>>(`${this.apiUrl}/pickup-locations/${id}/toggle`, {});
  }

  addTimeSlot(locationId: number, req: PickupTimeSlotRequest): Observable<ApiResponse<PickupTimeSlot>> {
    return this.http.post<ApiResponse<PickupTimeSlot>>(`${this.apiUrl}/pickup-locations/${locationId}/time-slots`, req);
  }

  updateTimeSlot(lid: number, sid: number, req: PickupTimeSlotRequest): Observable<ApiResponse<PickupTimeSlot>> {
    return this.http.put<ApiResponse<PickupTimeSlot>>(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}`, req);
  }

  deleteTimeSlot(lid: number, sid: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}`);
  }

  toggleTimeSlot(lid: number, sid: number): Observable<ApiResponse<PickupTimeSlot>> {
    return this.http.patch<ApiResponse<PickupTimeSlot>>(`${this.apiUrl}/pickup-locations/${lid}/time-slots/${sid}/toggle`, {});
  }

  // ── Skydropx ──────────────────────────────────────────────────────────────

  getSkydropxQuotation(orderId: number): Observable<ApiResponse<SkydropxQuotation>> {
    return this.http.post<ApiResponse<SkydropxQuotation>>(`${this.apiUrl}/orders/${orderId}/skydropx/quotation`, {});
  }

  createSkydropxShipment(orderId: number, rateId: string): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`, { rateId });
  }

  refreshSkydropxShipment(orderId: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`);
  }

  downloadSkydropxLabel(orderId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/orders/${orderId}/skydropx/label`, { responseType: 'blob' });
  }

  cancelSkydropxShipment(orderId: number): Observable<ApiResponse<Order>> {
    return this.http.delete<ApiResponse<Order>>(`${this.apiUrl}/orders/${orderId}/skydropx/shipment`);
  }
}
