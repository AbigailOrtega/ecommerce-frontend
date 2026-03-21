import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, GuestOrderRequest, Order, OrderRequest, PickupAvailability } from '@shared/models';


@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  createOrder(request: OrderRequest): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(this.apiUrl, request);
  }

  createGuestOrder(request: GuestOrderRequest): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${this.apiUrl}/guest`, request);
  }

  getUserOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(this.apiUrl);
  }

  getOrderByNumber(orderNumber: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${orderNumber}`);
  }

  getPickupAvailableDates(locationId: number, from: string, to: string): Observable<ApiResponse<string[]>> {
    return this.http.get<ApiResponse<string[]>>(
      `${environment.apiUrl}/shipping/pickup/${locationId}/available-dates?from=${from}&to=${to}`
    );
  }

  getPickupSlotsForDate(locationId: number, date: string): Observable<ApiResponse<PickupAvailability[]>> {
    return this.http.get<ApiResponse<PickupAvailability[]>>(
      `${environment.apiUrl}/shipping/pickup/${locationId}/slots?date=${date}`
    );
  }

  reschedulePickup(orderNumber: string, pickupDate: string, pickupAvailabilityId?: number): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(
      `${this.apiUrl}/${orderNumber}/reschedule-pickup`,
      { pickupDate, pickupAvailabilityId: pickupAvailabilityId ?? null }
    );
  }

  cancelOwnPickup(orderNumber: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${this.apiUrl}/${orderNumber}/cancel-pickup`, null);
  }
}
