import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { of } from 'rxjs';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { StoreInfoService } from '@core/services/store-info.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authService: any;
  let cartService: any;
  let storeInfoService: jasmine.SpyObj<StoreInfoService>;

  function setup(loggedIn = false, storeData: any = null) {
    authService = {
      isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(loggedIn),
      isAdmin: jasmine.createSpy('isAdmin').and.returnValue(false),
      logout: jasmine.createSpy('logout'),
      user: signal(null),
    };

    cartService = {
      loadCart: jasmine.createSpy('loadCart'),
      itemCount: signal(0),
    };

    storeInfoService = jasmine.createSpyObj('StoreInfoService', ['getPublic']);
    storeInfoService.getPublic.and.returnValue(
      of({ success: true, data: storeData })
    );

    return TestBed.configureTestingModule({
      imports: [NavbarComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService,      useValue: authService      },
        { provide: CartService,      useValue: cartService      },
        { provide: StoreInfoService, useValue: storeInfoService },
        provideRouter([]),
      ],
    }).compileComponents().then(() => {
      fixture   = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  }

  it('should create', async () => {
    await setup();
    expect(component).toBeTruthy();
  });

  // ── Constructor ────────────────────────────────────────────────────────────

  describe('constructor', () => {
    it('does NOT call cart.loadCart when user is not logged in', async () => {
      await setup(false);
      expect(cartService.loadCart).not.toHaveBeenCalled();
    });

    it('calls cart.loadCart when user is logged in', async () => {
      await setup(true);
      expect(cartService.loadCart).toHaveBeenCalled();
    });
  });

  // ── ngOnInit / store info ──────────────────────────────────────────────────

  describe('ngOnInit()', () => {
    it('keeps default storeName "ShopHub" when no store data', async () => {
      await setup(false, null);
      expect(component.storeName()).toBe('ShopHub');
    });

    it('sets storeName signal when store data has a name', async () => {
      await setup(false, { name: 'Mi Tienda', logoUrl: null });
      expect(component.storeName()).toBe('Mi Tienda');
    });

    it('sets logoUrl signal when store data has a logoUrl', async () => {
      await setup(false, { name: 'Mi Tienda', logoUrl: 'https://example.com/logo.png' });
      expect(component.logoUrl()).toBe('https://example.com/logo.png');
    });

    it('leaves logoUrl null when store data has no logoUrl', async () => {
      await setup(false, { name: 'Mi Tienda' });
      expect(component.logoUrl()).toBeNull();
    });
  });

  // ── DOM ────────────────────────────────────────────────────────────────────

  describe('DOM', () => {
    it('renders mat-toolbar', async () => {
      await setup();
      const toolbar = fixture.nativeElement.querySelector('mat-toolbar');
      expect(toolbar).toBeTruthy();
    });

    it('shows brand name in template', async () => {
      await setup(false, { name: 'TestShop', logoUrl: null });
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain('TestShop');
    });

    it('shows "Iniciar sesión" link when not logged in', async () => {
      await setup(false);
      expect(fixture.nativeElement.textContent).toContain('Iniciar sesión');
    });
  });
});
