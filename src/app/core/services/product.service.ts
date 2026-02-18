import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { ApiResponse, Page, Product, Category } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private readonly categoryUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getProducts(page = 0, size = 12): Observable<ApiResponse<Page<Product>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Product>>>(this.apiUrl, { params });
  }

  getProductBySlug(slug: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/slug/${slug}`);
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/${id}`);
  }

  getProductsByCategory(categoryId: number, page = 0, size = 12): Observable<ApiResponse<Page<Product>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Product>>>(`${this.apiUrl}/category/${categoryId}`, { params });
  }

  searchProducts(query: string, page = 0, size = 12): Observable<ApiResponse<Page<Product>>> {
    const params = new HttpParams().set('q', query).set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Product>>>(`${this.apiUrl}/search`, { params });
  }

  getFeaturedProducts(): Observable<ApiResponse<Page<Product>>> {
    return this.http.get<ApiResponse<Page<Product>>>(`${this.apiUrl}/featured`);
  }

  getNewArrivals(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/new-arrivals`);
  }

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(this.categoryUrl);
  }

  createCategory(category: { name: string; description?: string; imageUrl?: string }): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(this.categoryUrl, category);
  }

  updateCategory(id: number, category: { name: string; description?: string; imageUrl?: string }): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.categoryUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.categoryUrl}/${id}`);
  }

  createProduct(product: Partial<Product> & { categoryIds?: number[] }): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Partial<Product> & { categoryIds?: number[] }): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }
}
