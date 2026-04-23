import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, Coupon, CouponRequest, DashboardStats, InventoryItem, Order, Page, PickupAvailability, PickupAvailabilityRequest, PickupException, PickupExceptionRequest, PickupLocation, PickupLocationRequest, Product, ProductSalesItem, PromoBanner, PromoBannerRequest, Promotion, PromotionRequest, Review, SalesReport, ShippingConfig, SkydropxQuotation, Ticket, TicketUpdateRequest, UpcomingSchedule, User } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private readonly apiUrl = `${environment.apiUrl}/admin`;
  private readonly uploadUrl = `${environment.apiUrl}/upload`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiUrl}/dashboard`);
  }

  getMarketingSubscriberCount(): Observable<ApiResponse<Record<string, number>>> {
    return this.http.get<ApiResponse<Record<string, number>>>(`${this.apiUrl}/marketing/subscribers/count`);
  }

  sendMarketingCampaign(formData: FormData): Observable<ApiResponse<Record<string, any>>> {
    return this.http.post<ApiResponse<Record<string, any>>>(`${this.apiUrl}/marketing/send`, formData);
  }

  getUpcomingSchedule(): Observable<ApiResponse<UpcomingSchedule>> {
    return this.http.get<ApiResponse<UpcomingSchedule>>(`${this.apiUrl}/orders/upcoming-schedule`);
  }

  getSalesReport(period: 'week' | 'month' | 'year'): Observable<ApiResponse<SalesReport>> {
    return this.http.get<ApiResponse<SalesReport>>(`${this.apiUrl}/reports/sales?period=${period}`);
  }

  getTopSellingProducts(limit = 20): Observable<ApiResponse<ProductSalesItem[]>> {
    return this.http.get<ApiResponse<ProductSalesItem[]>>(`${this.apiUrl}/reports/products/top-selling?limit=${limit}`);
  }

  getLeastSellingProducts(limit = 20): Observable<ApiResponse<ProductSalesItem[]>> {
    return this.http.get<ApiResponse<ProductSalesItem[]>>(`${this.apiUrl}/reports/products/least-selling?limit=${limit}`);
  }

  getInventoryReport(): Observable<ApiResponse<InventoryItem[]>> {
    return this.http.get<ApiResponse<InventoryItem[]>>(`${this.apiUrl}/reports/inventory`);
  }

  getOutOfStockProducts(): Observable<ApiResponse<InventoryItem[]>> {
    return this.http.get<ApiResponse<InventoryItem[]>>(`${this.apiUrl}/reports/out-of-stock`);
  }

  getAllOrders(page = 0, size = 20, status = '', shippingType = '',
               paymentMethod = '', dateFrom = '', dateTo = '', search = ''): Observable<ApiResponse<Page<Order>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    if (shippingType) params = params.set('shippingType', shippingType);
    if (paymentMethod) params = params.set('paymentMethod', paymentMethod);
    if (dateFrom) params = params.set('dateFrom', dateFrom);
    if (dateTo) params = params.set('dateTo', dateTo);
    if (search) params = params.set('search', search);
    return this.http.get<ApiResponse<Page<Order>>>(`${this.apiUrl}/orders`, { params });
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<ApiResponse<Order>> {
    return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}/status`, { status });
  }

  cancelPickup(id: number, reason?: string): Observable<ApiResponse<Order>> {
    const params = reason ? new HttpParams().set('reason', reason) : undefined;
    return this.http.patch<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}/cancel-pickup`, null, { params });
  }

  getAllProducts(page = 0, size = 20): Observable<ApiResponse<Page<Product>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Product>>>(`${this.apiUrl}/products`, { params });
  }

  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`);
  }

  uploadImage(file: File, type: 'product' | 'banner' | 'default' = 'default'): Observable<ApiResponse<{ url: string }>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<{ url: string }>>(`${this.uploadUrl}/image?type=${type}`, formData);
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

  // ── Pickup Availability ────────────────────────────────────────────────────

  getPickupAvailability(lid: number): Observable<ApiResponse<PickupAvailability[]>> {
    return this.http.get<ApiResponse<PickupAvailability[]>>(`${this.apiUrl}/pickup-locations/${lid}/availability`);
  }

  createPickupAvailability(lid: number, req: PickupAvailabilityRequest): Observable<ApiResponse<PickupAvailability>> {
    return this.http.post<ApiResponse<PickupAvailability>>(`${this.apiUrl}/pickup-locations/${lid}/availability`, req);
  }

  updatePickupAvailability(lid: number, aid: number, req: PickupAvailabilityRequest): Observable<ApiResponse<PickupAvailability>> {
    return this.http.put<ApiResponse<PickupAvailability>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}`, req);
  }

  deletePickupAvailability(lid: number, aid: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}`);
  }

  togglePickupAvailability(lid: number, aid: number): Observable<ApiResponse<PickupAvailability>> {
    return this.http.patch<ApiResponse<PickupAvailability>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}/toggle`, {});
  }

  // ── Pickup Exceptions ─────────────────────────────────────────────────────

  getPickupExceptions(lid: number, aid: number): Observable<ApiResponse<PickupException[]>> {
    return this.http.get<ApiResponse<PickupException[]>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}/exceptions`);
  }

  createPickupException(lid: number, aid: number, req: PickupExceptionRequest): Observable<ApiResponse<PickupException>> {
    return this.http.post<ApiResponse<PickupException>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}/exceptions`, req);
  }

  deletePickupException(lid: number, aid: number, eid: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/pickup-locations/${lid}/availability/${aid}/exceptions/${eid}`);
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

  // ── Analytics ───────────────────────────────────────────────────────────────

  getPageViewSummary(): Observable<ApiResponse<Record<string, number>>> {
    return this.http.get<ApiResponse<Record<string, number>>>(`${this.apiUrl}/analytics/pageviews/summary`);
  }

  getPageViewsByPeriod(period: string, from: string, to: string): Observable<ApiResponse<{ label: string; count: number }[]>> {
    const params = new HttpParams().set('period', period).set('from', from).set('to', to);
    return this.http.get<ApiResponse<{ label: string; count: number }[]>>(`${this.apiUrl}/analytics/pageviews/by-period`, { params });
  }

  getPageViewsByPage(from: string, to: string): Observable<ApiResponse<{ label: string; count: number }[]>> {
    const params = new HttpParams().set('from', from).set('to', to);
    return this.http.get<ApiResponse<{ label: string; count: number }[]>>(`${this.apiUrl}/analytics/pageviews/by-page`, { params });
  }
}
