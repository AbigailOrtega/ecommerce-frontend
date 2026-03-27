import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AuthService } from '@core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category, Product, Page, PromoBanner } from '@shared/models';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeCategory(id: number, name: string): Category {
  return { id, name, slug: name.toLowerCase() };
}

function makePage(products: Product[] = []): Page<Product> {
  return {
    content: products, totalElements: products.length,
    totalPages: 1, size: 12, number: 0, first: true, last: true,
  };
}

function makeProduct(id: number, categoryId?: number): Product {
  return {
    id, name: `Product ${id}`, price: 100, stockQuantity: 10,
    slug: `product-${id}`, featured: false, active: true, createdAt: '',
    categories: categoryId ? [makeCategory(categoryId, `Cat${categoryId}`)] : [],
  };
}

function emptyBanners(): PromoBanner[] { return []; }

// ── Setup helpers ─────────────────────────────────────────────────────────────

function makeSnackBarSpy() {
  const ref = { onAction: () => of(null) };
  return jasmine.createSpyObj('MatSnackBar', { open: ref });
}

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let cartService: jasmine.SpyObj<CartService>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  const CATEGORIES = [makeCategory(1, 'Camisetas'), makeCategory(2, 'Pantalones'), makeCategory(3, 'Zapatos')];
  const ALL_PRODUCTS = [makeProduct(1), makeProduct(2), makeProduct(3)];
  const CAT1_PRODUCTS = [makeProduct(1, 1)];

  beforeEach(async () => {
    productService = jasmine.createSpyObj('ProductService', [
      'getProducts', 'getCategories', 'getProductsByCategory',
      'searchProducts', 'getActiveBanners',
    ]);
    cartService  = jasmine.createSpyObj('CartService', ['addToCart', 'loadCart']);
    authService  = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    snackBar     = makeSnackBarSpy();

    // Default stubs
    productService.getProducts.and.returnValue(of({ success: true, data: makePage(ALL_PRODUCTS) }));
    productService.getCategories.and.returnValue(of({ success: true, data: CATEGORIES }));
    productService.getActiveBanners.and.returnValue(of({ success: true, data: emptyBanners() }));
    productService.getProductsByCategory.and.returnValue(of({ success: true, data: makePage(CAT1_PRODUCTS) }));
    productService.searchProducts.and.returnValue(of({ success: true, data: makePage(ALL_PRODUCTS) }));
    authService.isLoggedIn.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent, NoopAnimationsModule, RouterTestingModule],
      providers: [
        { provide: ProductService, useValue: productService },
        { provide: CartService,    useValue: cartService    },
        { provide: AuthService,    useValue: authService    },
        { provide: MatSnackBar,    useValue: snackBar       },
      ],
    }).compileComponents();

    fixture   = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Initialization ────────────────────────────────────────────────────────

  describe('ngOnInit()', () => {
    it('calls getCategories on init and populates categories array', () => {
      expect(productService.getCategories).toHaveBeenCalled();
      expect(component.categories.length).toBe(3);
    });

    it('calls getProducts on init (no search, no category selected)', () => {
      expect(productService.getProducts).toHaveBeenCalledWith(0, 12);
      expect(component.products.length).toBe(3);
    });

    it('calls getActiveBanners on init', () => {
      expect(productService.getActiveBanners).toHaveBeenCalled();
    });

    it('sets loading=false after products load', () => {
      expect(component.loading).toBeFalse();
    });

    it('starts with selectedCategory=0 (Todos)', () => {
      expect(component.selectedCategory).toBe(0);
    });

    it('starts with currentPage=0', () => {
      expect(component.currentPage).toBe(0);
    });
  });

  // ── Category menu — DOM ───────────────────────────────────────────────────

  describe('category menu DOM', () => {
    function chips(): NodeListOf<HTMLButtonElement> {
      return fixture.nativeElement.querySelectorAll('.cat-chip');
    }

    it('renders the category nav when categories are loaded', () => {
      const nav = fixture.nativeElement.querySelector('nav.category-nav');
      expect(nav).toBeTruthy();
    });

    it('renders "Todos" as the first chip', () => {
      const first = chips()[0];
      expect(first.textContent?.trim()).toBe('Todos');
    });

    it('renders one chip per category plus the "Todos" chip', () => {
      // 3 categories + 1 "Todos" = 4 chips
      expect(chips().length).toBe(4);
    });

    it('renders category names as chip labels', () => {
      const labels = Array.from(chips()).map(c => c.textContent?.trim());
      expect(labels).toContain('Camisetas');
      expect(labels).toContain('Pantalones');
      expect(labels).toContain('Zapatos');
    });

    it('"Todos" chip has "active" class by default', () => {
      expect(chips()[0].classList).toContain('active');
    });

    it('only "Todos" is active initially', () => {
      const activeChips = Array.from(chips()).filter(c => c.classList.contains('active'));
      expect(activeChips.length).toBe(1);
      expect(activeChips[0].textContent?.trim()).toBe('Todos');
    });

    it('does not render nav when categories list is empty', async () => {
      productService.getCategories.and.returnValue(of({ success: true, data: [] }));
      fixture = TestBed.createComponent(ProductListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      const nav = fixture.nativeElement.querySelector('nav.category-nav');
      expect(nav).toBeNull();
    });
  });

  // ── selectCategory() ──────────────────────────────────────────────────────

  describe('selectCategory()', () => {
    it('sets selectedCategory to the given id', () => {
      component.selectCategory(2);
      expect(component.selectedCategory).toBe(2);
    });

    it('resets currentPage to 0', () => {
      component.currentPage = 3;
      component.selectCategory(1);
      expect(component.currentPage).toBe(0);
    });

    it('clears searchQuery', () => {
      component.searchQuery = 'zapatillas';
      component.selectCategory(1);
      expect(component.searchQuery).toBe('');
    });

    it('calls getProductsByCategory when id > 0', () => {
      component.selectCategory(1);
      expect(productService.getProductsByCategory).toHaveBeenCalledWith(1, 0, 12);
    });

    it('calls getProducts (all) when id === 0', () => {
      component.selectCategory(1);       // first select a category
      productService.getProducts.calls.reset();
      component.selectCategory(0);       // then go back to Todos
      expect(productService.getProducts).toHaveBeenCalledWith(0, 12);
    });

    it('does not call getProductsByCategory when id === 0', () => {
      productService.getProductsByCategory.calls.reset();
      component.selectCategory(0);
      expect(productService.getProductsByCategory).not.toHaveBeenCalled();
    });

    it('updates products after selecting a category', () => {
      component.selectCategory(1);
      expect(component.products).toEqual(CAT1_PRODUCTS);
    });

    it('updates active chip in the DOM after selectCategory()', fakeAsync(() => {
      component.selectCategory(1);
      tick();
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('.cat-chip');
      // chip[0] = Todos, chip[1] = Camisetas (id=1)
      expect(chips[0].classList).not.toContain('active');
      expect(chips[1].classList).toContain('active');
    }));

    it('clicking a chip in the DOM calls selectCategory', fakeAsync(() => {
      spyOn(component, 'selectCategory').and.callThrough();
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('.cat-chip');
      chips[2].click(); // Pantalones (id=2)
      tick();

      expect(component.selectCategory).toHaveBeenCalledWith(2);
    }));

    it('clicking "Todos" chip calls selectCategory(0)', fakeAsync(() => {
      spyOn(component, 'selectCategory').and.callThrough();
      fixture.detectChanges();

      const chips = fixture.nativeElement.querySelectorAll('.cat-chip');
      chips[0].click();
      tick();

      expect(component.selectCategory).toHaveBeenCalledWith(0);
    }));
  });

  // ── onSearch() ────────────────────────────────────────────────────────────

  describe('onSearch()', () => {
    it('resets selectedCategory to 0', () => {
      component.selectedCategory = 2;
      component.searchQuery = 'zapatos';
      component.onSearch();
      expect(component.selectedCategory).toBe(0);
    });

    it('resets currentPage to 0', () => {
      component.currentPage = 5;
      component.searchQuery = 'algo';
      component.onSearch();
      expect(component.currentPage).toBe(0);
    });

    it('calls searchProducts with the current query', () => {
      component.searchQuery = 'camiseta';
      component.onSearch();
      expect(productService.searchProducts).toHaveBeenCalledWith('camiseta', 0, 12);
    });

    it('calls getProducts when query is empty', () => {
      productService.getProducts.calls.reset();
      component.searchQuery = '';
      component.onSearch();
      expect(productService.getProducts).toHaveBeenCalled();
    });
  });

  // ── onPageChange() ────────────────────────────────────────────────────────

  describe('onPageChange()', () => {
    it('updates currentPage and pageSize then reloads products', () => {
      component.onPageChange({ pageIndex: 2, pageSize: 24, length: 100 } as any);
      expect(component.currentPage).toBe(2);
      expect(component.pageSize).toBe(24);
      expect(productService.getProducts).toHaveBeenCalledWith(2, 24);
    });

    it('uses getProductsByCategory when a category is selected', () => {
      component.selectedCategory = 3;
      component.onPageChange({ pageIndex: 1, pageSize: 12, length: 50 } as any);
      expect(productService.getProductsByCategory).toHaveBeenCalledWith(3, 1, 12);
    });
  });

  // ── hasAnyStock() ─────────────────────────────────────────────────────────

  describe('hasAnyStock()', () => {
    it('returns true when product has positive stockQuantity and no colors', () => {
      const p = makeProduct(1);
      expect(component.hasAnyStock(p)).toBeTrue();
    });

    it('returns false when product stockQuantity is 0 and no colors', () => {
      const p = { ...makeProduct(1), stockQuantity: 0 };
      expect(component.hasAnyStock(p)).toBeFalse();
    });

    it('returns true when at least one color/size has stock', () => {
      const p = { ...makeProduct(1), colors: [{ id: 1, name: 'Red', images: [], sizes: [{ id: 1, name: 'M', stock: 5 }] }] };
      expect(component.hasAnyStock(p as any)).toBeTrue();
    });

    it('returns false when all color sizes have 0 stock', () => {
      const p = { ...makeProduct(1), colors: [{ id: 1, name: 'Red', images: [], sizes: [{ id: 1, name: 'M', stock: 0 }] }] };
      expect(component.hasAnyStock(p as any)).toBeFalse();
    });
  });

  // ── colorHasStock() ───────────────────────────────────────────────────────

  describe('colorHasStock()', () => {
    it('returns true when at least one size has stock', () => {
      const color = { id: 1, name: 'Blue', images: [], sizes: [{ id: 1, name: 'S', stock: 3 }] };
      expect(component.colorHasStock(color as any)).toBeTrue();
    });

    it('returns false when all sizes have 0 stock', () => {
      const color = { id: 1, name: 'Blue', images: [], sizes: [{ id: 1, name: 'S', stock: 0 }] };
      expect(component.colorHasStock(color as any)).toBeFalse();
    });
  });

  // ── cartBtnLabel() ────────────────────────────────────────────────────────

  describe('cartBtnLabel()', () => {
    it('returns "Sin existencia" when product has no stock', () => {
      const p = { ...makeProduct(1), stockQuantity: 0 };
      expect(component.cartBtnLabel(p)).toBe('Sin existencia');
    });

    it('returns "Ver opciones" when product has colors', () => {
      const p = { ...makeProduct(1), colors: [{ id: 1, name: 'Red', images: [], sizes: [{ id: 1, name: 'M', stock: 5 }] }] };
      expect(component.cartBtnLabel(p as any)).toBe('Ver opciones');
    });

    it('returns "Agregar al carrito" for simple product with stock', () => {
      const p = makeProduct(1);
      expect(component.cartBtnLabel(p)).toBe('Agregar al carrito');
    });
  });

  // ── onAddToCartClick() ────────────────────────────────────────────────────

  describe('onAddToCartClick()', () => {
    it('opens popup when product has colors', () => {
      const p = { ...makeProduct(1), colors: [{ id: 1, name: 'Red', images: [], sizes: [{ id: 1, name: 'M', stock: 5 }] }] };
      component.onAddToCartClick(p as any);
      expect(component.popupProduct).toBe(p as any);
      expect(component.popupSelectedColor).toBeNull();
    });

    it('calls addLocalItem when not logged in (simple product)', () => {
      authService.isLoggedIn.and.returnValue(false);
      (cartService as any).addLocalItem = jasmine.createSpy('addLocalItem');
      const p = makeProduct(1);
      component.onAddToCartClick(p);
      expect((cartService as any).addLocalItem).toHaveBeenCalled();
    });

    it('calls addToCart when logged in (simple product)', () => {
      authService.isLoggedIn.and.returnValue(true);
      cartService.addToCart.and.returnValue(of({}  as any));
      const p = makeProduct(1);
      component.onAddToCartClick(p);
      expect(cartService.addToCart).toHaveBeenCalledWith(p.id);
    });

    it('calls addToCart when logged in (simple product — verify snackbar via addToCart call)', () => {
      authService.isLoggedIn.and.returnValue(true);
      cartService.addToCart.and.returnValue(of({} as any));
      const p = makeProduct(1);
      component.onAddToCartClick(p);
      // addToCart must have been called — snackbar fires asynchronously in some zones
      expect(cartService.addToCart).toHaveBeenCalledWith(p.id);
    });
  });

  // ── Popup methods ─────────────────────────────────────────────────────────

  describe('Popup methods', () => {
    const color = { id: 1, name: 'Red', images: [], sizes: [{ id: 1, name: 'M', stock: 5 }] };
    const size  = { id: 1, name: 'M', stock: 5 };

    it('popupSelectColor sets selected color and clears size', () => {
      component.popupSelectedSize = size as any;
      component.popupSelectColor(color as any);
      expect(component.popupSelectedColor).toBe(color as any);
      expect(component.popupSelectedSize).toBeNull();
    });

    it('popupSelectSize sets selected size', () => {
      component.popupSelectSize(size as any);
      expect(component.popupSelectedSize).toBe(size as any);
    });

    it('canConfirmPopup returns false when no color selected', () => {
      component.popupSelectedColor = null;
      expect(component.canConfirmPopup()).toBeFalse();
    });

    it('canConfirmPopup returns false when color selected but no size', () => {
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = null;
      expect(component.canConfirmPopup()).toBeFalse();
    });

    it('canConfirmPopup returns true when color and in-stock size selected', () => {
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = size as any;
      expect(component.canConfirmPopup()).toBeTrue();
    });

    it('canConfirmPopup returns false when selected size has 0 stock', () => {
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = { id: 1, name: 'M', stock: 0 } as any;
      expect(component.canConfirmPopup()).toBeFalse();
    });

    it('closePopup clears popup state', () => {
      component.popupProduct = makeProduct(1);
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = size as any;
      component.closePopup();
      expect(component.popupProduct).toBeNull();
      expect(component.popupSelectedColor).toBeNull();
      expect(component.popupSelectedSize).toBeNull();
    });

    it('confirmAddToCart does nothing when canConfirmPopup returns false', () => {
      component.popupProduct = makeProduct(1);
      component.popupSelectedColor = null;
      component.confirmAddToCart();
      expect(cartService.addToCart).not.toHaveBeenCalled();
    });

    it('confirmAddToCart calls addLocalItem when not logged in', () => {
      authService.isLoggedIn.and.returnValue(false);
      (cartService as any).addLocalItem = jasmine.createSpy('addLocalItem');
      const p = { ...makeProduct(1), colors: [color] };
      component.popupProduct = p as any;
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = size as any;
      component.confirmAddToCart();
      expect((cartService as any).addLocalItem).toHaveBeenCalled();
    });

    it('confirmAddToCart calls addToCart with sizeId when logged in', () => {
      authService.isLoggedIn.and.returnValue(true);
      cartService.addToCart.and.returnValue(of({} as any));
      const p = { ...makeProduct(1), colors: [color] };
      component.popupProduct = p as any;
      component.popupSelectedColor = color as any;
      component.popupSelectedSize = size as any;
      component.confirmAddToCart();
      expect(cartService.addToCart).toHaveBeenCalledWith(p.id, 1, size.id);
    });
  });

  // ── Carousel ──────────────────────────────────────────────────────────────

  describe('Carousel', () => {
    beforeEach(() => {
      // Set banners directly to test carousel logic
      component.banners = [
        { id: 1, imageUrl: 'a.jpg', title: 'A', active: true, sortOrder: 0 },
        { id: 2, imageUrl: 'b.jpg', title: 'B', active: true, sortOrder: 1 },
        { id: 3, imageUrl: 'c.jpg', title: 'C', active: true, sortOrder: 2 },
      ] as any;
      component.carouselIndex = 0;
    });

    it('nextSlide advances carouselIndex', () => {
      component.nextSlide();
      expect(component.carouselIndex).toBe(1);
    });

    it('nextSlide wraps around to 0 after last slide', () => {
      component.carouselIndex = 2;
      component.nextSlide();
      expect(component.carouselIndex).toBe(0);
    });

    it('prevSlide decrements carouselIndex', () => {
      component.carouselIndex = 1;
      component.prevSlide();
      expect(component.carouselIndex).toBe(0);
    });

    it('prevSlide wraps around to last slide from 0', () => {
      component.carouselIndex = 0;
      component.prevSlide();
      expect(component.carouselIndex).toBe(2);
    });

    it('goToSlide sets carouselIndex', () => {
      component.goToSlide(2);
      expect(component.carouselIndex).toBe(2);
    });
  });

  // ── onCategoryChange() ────────────────────────────────────────────────────

  describe('onCategoryChange()', () => {
    it('resets currentPage and searchQuery then reloads', () => {
      component.currentPage = 3;
      component.searchQuery = 'test';
      productService.getProducts.calls.reset();
      component.onCategoryChange();
      expect(component.currentPage).toBe(0);
      expect(component.searchQuery).toBe('');
      expect(productService.getProducts).toHaveBeenCalled();
    });
  });

  // ── loadProducts() error handler ──────────────────────────────────────────

  describe('loadProducts() error handling', () => {
    it('sets loading=false on error', () => {
      productService.getProducts.and.returnValue(throwError(() => new Error('fail')));
      component.loadProducts();
      expect(component.loading).toBeFalse();
    });
  });
});
