import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, StoreInfo } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class StoreInfoService {
  private readonly publicUrl = `${environment.apiUrl}/store-info`;
  private readonly adminUrl = `${environment.apiUrl}/admin/store-info`;

  constructor(private http: HttpClient) {}

  getPublic(): Observable<ApiResponse<StoreInfo>> {
    return this.http.get<ApiResponse<StoreInfo>>(this.publicUrl);
  }

  update(req: Partial<StoreInfo>): Observable<ApiResponse<StoreInfo>> {
    return this.http.put<ApiResponse<StoreInfo>>(this.adminUrl, req);
  }

  addImage(url: string): Observable<ApiResponse<{ id: number; url: string; displayOrder: number; active: boolean }>> {
    return this.http.post<ApiResponse<{ id: number; url: string; displayOrder: number; active: boolean }>>(
      `${this.adminUrl}/images`,
      { url }
    );
  }

  deleteImage(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.adminUrl}/images/${id}`);
  }

  reorder(ids: number[]): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.adminUrl}/images/reorder`, ids);
  }
}
