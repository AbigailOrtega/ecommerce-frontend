import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Category, Page, Product, PromoBanner } from '@shared/models';

const PRODUCTS_API = 'http://localhost:8080/api/products';
const CATEGORIES_API = 'http://localhost:8080/api/categories';
const BANNER_API = 'http://localhost:8080/api/banner';

// ── Helpers ────────────────────────────────────────────────────────────────

function makeProduct(id = 1, slug = 'test-product'): Product {
  return {
    id,
    name: 'Test Product',
    price: 150,
    stockQuantity: 20,
    slug,
    featured: false,
    active: true,
    createdAt: '2024-01-01T00:00:00Z',
  };
}

function makeCategory(id = 1): Category {
  return { id, name: 'Electronics', slug: 'electronics' };
}

function makePage<T>(content: T[]): Page<T> {
  return {
    content,
    totalElements: content.length,
    totalPages: 1,
    size: 12,
    number: 0,
    first: true,
    last: true,
  };
}

// ── Suite ──────────────────────────────────────────────────────────────────

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // ── getProducts() ──────────────────────────────────────────────────────

  describe('getProducts()', () => {
    it('sends GET to /products with default page/size params', () => {
      service.getProducts().subscribe();

      const req = httpMock.expectOne(r => r.url === PRODUCTS_API);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('12');
      req.flush({ success: true, data: makePage([]) });
    });

    it('sends GET with custom page and size', () => {
      service.getProducts(2, 6).subscribe();

      const req = httpMock.expectOne(r => r.url === PRODUCTS_API);
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('6');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns a paged list of products', () => {
      const page = makePage([makeProduct(1), makeProduct(2)]);

      service.getProducts().subscribe(res => {
        expect(res.data.content.length).toBe(2);
        expect(res.data.totalElements).toBe(2);
      });

      httpMock.expectOne(r => r.url === PRODUCTS_API).flush({ success: true, data: page });
    });
  });

  // ── getProductBySlug() ─────────────────────────────────────────────────

  describe('getProductBySlug()', () => {
    it('sends GET to /products/slug/{slug}', () => {
      service.getProductBySlug('my-product').subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/slug/my-product`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeProduct(1, 'my-product') });
    });

    it('returns the product matching the slug', () => {
      const expected = makeProduct(5, 'blue-shirt');

      service.getProductBySlug('blue-shirt').subscribe(res => {
        expect(res.data.slug).toBe('blue-shirt');
        expect(res.data.id).toBe(5);
      });

      httpMock
        .expectOne(`${PRODUCTS_API}/slug/blue-shirt`)
        .flush({ success: true, data: expected });
    });
  });

  // ── getProductById() ───────────────────────────────────────────────────

  describe('getProductById()', () => {
    it('sends GET to /products/{id}', () => {
      service.getProductById(42).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/42`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makeProduct(42) });
    });

    it('returns the product with the given id', () => {
      const expected = makeProduct(42);

      service.getProductById(42).subscribe(res => {
        expect(res.data.id).toBe(42);
      });

      httpMock.expectOne(`${PRODUCTS_API}/42`).flush({ success: true, data: expected });
    });
  });

  // ── getProductsByCategory() ────────────────────────────────────────────

  describe('getProductsByCategory()', () => {
    it('sends GET to /products/category/{categoryId} with default page/size', () => {
      service.getProductsByCategory(3).subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/category/3`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('12');
      req.flush({ success: true, data: makePage([]) });
    });

    it('sends GET with custom page and size', () => {
      service.getProductsByCategory(3, 1, 6).subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/category/3`);
      expect(req.request.params.get('page')).toBe('1');
      expect(req.request.params.get('size')).toBe('6');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged products filtered by category', () => {
      const page = makePage([makeProduct(1)]);

      service.getProductsByCategory(3).subscribe(res => {
        expect(res.data.content.length).toBe(1);
      });

      httpMock
        .expectOne(r => r.url === `${PRODUCTS_API}/category/3`)
        .flush({ success: true, data: page });
    });
  });

  // ── searchProducts() ───────────────────────────────────────────────────

  describe('searchProducts()', () => {
    it('sends GET to /products/search with q, page, and size params', () => {
      service.searchProducts('shirt').subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/search`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('q')).toBe('shirt');
      expect(req.request.params.get('page')).toBe('0');
      expect(req.request.params.get('size')).toBe('12');
      req.flush({ success: true, data: makePage([]) });
    });

    it('sends GET with custom page and size', () => {
      service.searchProducts('shoes', 2, 8).subscribe();

      const req = httpMock.expectOne(r => r.url === `${PRODUCTS_API}/search`);
      expect(req.request.params.get('q')).toBe('shoes');
      expect(req.request.params.get('page')).toBe('2');
      expect(req.request.params.get('size')).toBe('8');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged search results', () => {
      const page = makePage([makeProduct(1), makeProduct(2)]);

      service.searchProducts('shirt').subscribe(res => {
        expect(res.data.content.length).toBe(2);
      });

      httpMock
        .expectOne(r => r.url === `${PRODUCTS_API}/search`)
        .flush({ success: true, data: page });
    });
  });

  // ── getFeaturedProducts() ──────────────────────────────────────────────

  describe('getFeaturedProducts()', () => {
    it('sends GET to /products/featured', () => {
      service.getFeaturedProducts().subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/featured`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: makePage([]) });
    });

    it('returns paged featured products', () => {
      const featured = { ...makeProduct(1), featured: true };
      const page = makePage([featured]);

      service.getFeaturedProducts().subscribe(res => {
        expect(res.data.content[0].featured).toBeTrue();
      });

      httpMock.expectOne(`${PRODUCTS_API}/featured`).flush({ success: true, data: page });
    });
  });

  // ── getNewArrivals() ───────────────────────────────────────────────────

  describe('getNewArrivals()', () => {
    it('sends GET to /products/new-arrivals', () => {
      service.getNewArrivals().subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/new-arrivals`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of new arrival products', () => {
      const products = [makeProduct(10), makeProduct(11)];

      service.getNewArrivals().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].id).toBe(10);
      });

      httpMock.expectOne(`${PRODUCTS_API}/new-arrivals`).flush({ success: true, data: products });
    });
  });

  // ── getCategories() ────────────────────────────────────────────────────

  describe('getCategories()', () => {
    it('sends GET to /categories', () => {
      service.getCategories().subscribe();

      const req = httpMock.expectOne(CATEGORIES_API);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of categories', () => {
      const categories = [makeCategory(1), makeCategory(2)];

      service.getCategories().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[0].name).toBe('Electronics');
      });

      httpMock.expectOne(CATEGORIES_API).flush({ success: true, data: categories });
    });
  });

  // ── createCategory() ───────────────────────────────────────────────────

  describe('createCategory()', () => {
    const catPayload = { name: 'Clothing', description: 'Apparel', imageUrl: 'http://img.com/c.png' };

    it('sends POST to /categories', () => {
      service.createCategory(catPayload).subscribe();

      const req = httpMock.expectOne(CATEGORIES_API);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.createCategory(catPayload).subscribe();

      const req = httpMock.expectOne(CATEGORIES_API);
      expect(req.request.body).toEqual(catPayload);
      req.flush({ success: true, data: {} });
    });

    it('returns the created category', () => {
      const created: Category = { id: 5, name: 'Clothing', slug: 'clothing' };

      service.createCategory(catPayload).subscribe(res => {
        expect(res.data.id).toBe(5);
        expect(res.data.name).toBe('Clothing');
      });

      httpMock.expectOne(CATEGORIES_API).flush({ success: true, data: created });
    });
  });

  // ── updateCategory() ───────────────────────────────────────────────────

  describe('updateCategory()', () => {
    const catPayload = { name: 'Updated Clothing' };

    it('sends PUT to /categories/{id}', () => {
      service.updateCategory(5, catPayload).subscribe();

      const req = httpMock.expectOne(`${CATEGORIES_API}/5`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateCategory(5, catPayload).subscribe();

      const req = httpMock.expectOne(`${CATEGORIES_API}/5`);
      expect(req.request.body).toEqual(catPayload);
      req.flush({ success: true, data: {} });
    });
  });

  // ── deleteCategory() ───────────────────────────────────────────────────

  describe('deleteCategory()', () => {
    it('sends DELETE to /categories/{id}', () => {
      service.deleteCategory(5).subscribe();

      const req = httpMock.expectOne(`${CATEGORIES_API}/5`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── createProduct() ────────────────────────────────────────────────────

  describe('createProduct()', () => {
    const productPayload: Partial<Product> & { categoryIds?: number[] } = {
      name: 'New Jacket',
      price: 300,
      stockQuantity: 15,
      slug: 'new-jacket',
      featured: false,
      active: true,
      categoryIds: [1, 2],
    };

    it('sends POST to /products', () => {
      service.createProduct(productPayload).subscribe();

      const req = httpMock.expectOne(PRODUCTS_API);
      expect(req.request.method).toBe('POST');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body including categoryIds', () => {
      service.createProduct(productPayload).subscribe();

      const req = httpMock.expectOne(PRODUCTS_API);
      expect(req.request.body).toEqual(productPayload);
      req.flush({ success: true, data: {} });
    });

    it('returns the created product', () => {
      const created = makeProduct(99, 'new-jacket');

      service.createProduct(productPayload).subscribe(res => {
        expect(res.data.id).toBe(99);
        expect(res.data.slug).toBe('new-jacket');
      });

      httpMock.expectOne(PRODUCTS_API).flush({ success: true, data: created });
    });
  });

  // ── updateProduct() ────────────────────────────────────────────────────

  describe('updateProduct()', () => {
    const productPayload: Partial<Product> & { categoryIds?: number[] } = {
      name: 'Updated Jacket',
      price: 350,
    };

    it('sends PUT to /products/{id}', () => {
      service.updateProduct(99, productPayload).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/99`);
      expect(req.request.method).toBe('PUT');
      req.flush({ success: true, data: {} });
    });

    it('sends the correct request body', () => {
      service.updateProduct(99, productPayload).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/99`);
      expect(req.request.body).toEqual(productPayload);
      req.flush({ success: true, data: {} });
    });

    it('returns the updated product', () => {
      const updated = { ...makeProduct(99), name: 'Updated Jacket', price: 350 };

      service.updateProduct(99, productPayload).subscribe(res => {
        expect(res.data.name).toBe('Updated Jacket');
        expect(res.data.price).toBe(350);
      });

      httpMock.expectOne(`${PRODUCTS_API}/99`).flush({ success: true, data: updated });
    });
  });

  // ── deleteProduct() ────────────────────────────────────────────────────

  describe('deleteProduct()', () => {
    it('sends DELETE to /products/{id}', () => {
      service.deleteProduct(99).subscribe();

      const req = httpMock.expectOne(`${PRODUCTS_API}/99`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ success: true, data: null });
    });
  });

  // ── getActiveBanners() ─────────────────────────────────────────────────

  describe('getActiveBanners()', () => {
    it('sends GET to /banner/active', () => {
      service.getActiveBanners().subscribe();

      const req = httpMock.expectOne(`${BANNER_API}/active`);
      expect(req.request.method).toBe('GET');
      req.flush({ success: true, data: [] });
    });

    it('returns list of active banners', () => {
      const banners: PromoBanner[] = [
        { id: 1, imageUrl: 'http://cdn.com/b1.jpg', active: true, createdAt: '2024-01-01T00:00:00Z' },
        { id: 2, imageUrl: 'http://cdn.com/b2.jpg', linkUrl: '/promo', active: true, createdAt: '2024-01-02T00:00:00Z' },
      ];

      service.getActiveBanners().subscribe(res => {
        expect(res.data.length).toBe(2);
        expect(res.data[1].linkUrl).toBe('/promo');
      });

      httpMock.expectOne(`${BANNER_API}/active`).flush({ success: true, data: banners });
    });

    it('returns empty list when no active banners exist', () => {
      service.getActiveBanners().subscribe(res => {
        expect(res.data).toEqual([]);
      });

      httpMock.expectOne(`${BANNER_API}/active`).flush({ success: true, data: [] });
    });
  });
});
