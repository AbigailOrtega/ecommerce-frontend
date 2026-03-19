import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
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
});
