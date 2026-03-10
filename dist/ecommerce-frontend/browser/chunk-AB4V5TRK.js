import {
  HttpClient,
  HttpParams,
  environment
} from "./chunk-7NMHCVKZ.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RP6JOKCW.js";

// src/app/core/services/product.service.ts
var ProductService = class _ProductService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/products`;
    this.categoryUrl = `${environment.apiUrl}/categories`;
  }
  getProducts(page = 0, size = 12) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(this.apiUrl, { params });
  }
  getProductBySlug(slug) {
    return this.http.get(`${this.apiUrl}/slug/${slug}`);
  }
  getProductById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getProductsByCategory(categoryId, page = 0, size = 12) {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get(`${this.apiUrl}/category/${categoryId}`, { params });
  }
  searchProducts(query, page = 0, size = 12) {
    const params = new HttpParams().set("q", query).set("page", page).set("size", size);
    return this.http.get(`${this.apiUrl}/search`, { params });
  }
  getFeaturedProducts() {
    return this.http.get(`${this.apiUrl}/featured`);
  }
  getNewArrivals() {
    return this.http.get(`${this.apiUrl}/new-arrivals`);
  }
  getCategories() {
    return this.http.get(this.categoryUrl);
  }
  createCategory(category) {
    return this.http.post(this.categoryUrl, category);
  }
  updateCategory(id, category) {
    return this.http.put(`${this.categoryUrl}/${id}`, category);
  }
  deleteCategory(id) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }
  createProduct(product) {
    return this.http.post(this.apiUrl, product);
  }
  updateProduct(id, product) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
  deleteProduct(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  static {
    this.\u0275fac = function ProductService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ProductService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ProductService, factory: _ProductService.\u0275fac, providedIn: "root" });
  }
};

export {
  ProductService
};
//# sourceMappingURL=chunk-AB4V5TRK.js.map
