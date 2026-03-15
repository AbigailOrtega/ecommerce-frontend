import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, PickupLocation, ShippingConfig, ShippingRatesResponse } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ShippingService {
  private readonly apiUrl = `${environment.apiUrl}/shipping`;

  constructor(private http: HttpClient) {}

  getConfig(): Observable<ApiResponse<ShippingConfig>> {
    return this.http.get<ApiResponse<ShippingConfig>>(`${this.apiUrl}/config`);
  }

  getPickupLocations(): Observable<ApiResponse<PickupLocation[]>> {
    return this.http.get<ApiResponse<PickupLocation[]>>(`${this.apiUrl}/pickup-locations`);
  }

  calculateNational(
    address: string, city: string, state: string, zipCode: string, country: string
  ): Observable<ApiResponse<ShippingRatesResponse>> {
    return this.http.post<ApiResponse<ShippingRatesResponse>>(
      `${this.apiUrl}/calculate-national`,
      { address, city, state, zipCode, country }
    );
  }
}
