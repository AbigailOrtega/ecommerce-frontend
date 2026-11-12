import { Component, OnInit, inject, signal } from '@angular/core';
import { SeoService } from '@core/services/seo.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { StoreInfoService } from '@core/services/store-info.service';
import { CloudinaryPipe } from '@shared/pipes/cloudinary.pipe';
import { NavbarMenusComponent } from './navbar-menus.component';

@Component({
    selector: 'app-navbar',
    imports: [CloudinaryPipe, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, NavbarMenusComponent],
    template: `
    <mat-toolbar color="primary" [class.toolbar-logo-only]="!showName()"  >
      <a routerLink="/" class="brand">
        @if (logoUrl()) {
          <img [src]="logoUrl() | cloudinary: 400"
               [style.height]="showName() ? '48px' : '100px'"
               [style.width]="'auto'"
               [style.max-width]="'none'"
               [style.max-height]="'none'"
               [style.object-fit]="'contain'"
               [style.border-radius]="'4px'"
               [style.flex-shrink]="'0'"
               alt="Logo" />
        }
        @if (showName()) {
          <span class="brand-name">{{ storeName() }}</span>
        }
      </a>
      <span class="spacer"></span>

      <!-- Desktop nav links -->
      <nav class="desktop-nav">
        <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <mat-icon>store</mat-icon> Tienda
        </a>
        <a mat-button routerLink="/sobre-nosotros" routerLinkActive="active">Nosotros</a>
        <a mat-button routerLink="/contacto" routerLinkActive="active">Contacto</a>
        <a mat-button routerLink="/rastrear-pedido" routerLinkActive="active">
          <mat-icon>search</mat-icon> Rastrear pedido
        </a>
      </nav>

      <!-- Cart (always visible) -->
      <a mat-icon-button routerLink="/cart">
        <mat-icon aria-hidden="false" [matBadge]="cart.itemCount()" matBadgeColor="accent"
                  [matBadgeHidden]="cart.itemCount() === 0">shopping_cart</mat-icon>
      </a>

      <!-- Desktop: sign-in links for visitors -->
      @if (!auth.isLoggedIn()) {
        <div class="desktop-nav">
          <a mat-button routerLink="/login">Iniciar sesión</a>
          <a mat-raised-button color="accent" routerLink="/register">Registrarse</a>
        </div>
      }

      <!-- Account and mobile menus load once the page is idle (or on first touch); until then the
           same buttons are shown, so nothing moves -->
      @defer (on idle; on interaction) {
        <app-navbar-menus />
      } @placeholder {
        <span class="menus-placeholder">
          @if (auth.isLoggedIn()) {
            <button mat-icon-button class="desktop-nav" aria-label="Mi cuenta"><mat-icon>account_circle</mat-icon></button>
          }
          <button mat-icon-button class="mobile-menu-btn" aria-label="Menú"><mat-icon>menu</mat-icon></button>
        </span>
      }
    </mat-toolbar>
  `,
    styles: [`
    :host ::ng-deep mat-toolbar { min-height: 80px; }
    :host ::ng-deep mat-toolbar.toolbar-logo-only { min-height: 116px !important; height: 116px !important; }
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-decoration: none;
      color: var(--theme-on-primary, white);
      white-space: nowrap;
    }
    .brand-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 240px; }
    .brand-logo { height: 52px; width: auto; object-fit: contain; border-radius: 4px; flex-shrink: 0; }
    .brand-logo-wide { height: 72px; width: auto; max-height: none; max-width: none; object-fit: contain; border-radius: 4px; }
    .spacer { flex: 1 1 auto; }
    .desktop-nav { display: flex; align-items: center; }
    .mobile-menu-btn { display: none !important; }
    .menus-placeholder { display: contents; }
    .active { opacity: 1; }
    /* white on the palettes; dark on a light custom color (see ThemeService) */
    mat-toolbar a, mat-toolbar button { color: var(--theme-on-primary, white); }

    @media (max-width: 767px) {
      .desktop-nav { display: none !important; }
      .mobile-menu-btn { display: inline-flex !important; }
      .brand { font-size: 1.1rem; max-width: 60vw; }
      .brand-logo { height: 40px; }
      .brand-logo-wide { height: 52px !important; }
    }
  `]
})
export class NavbarComponent implements OnInit {
  // shared with the footer and page titles; empty until the store info loads
  private readonly seo = inject(SeoService);
  readonly storeName = this.seo.storeName;
  readonly logoUrl = signal<string | null>(null);
  readonly showName = signal(true);

  constructor(
    public auth: AuthService,
    public cart: CartService,
    private storeInfoService: StoreInfoService,
  ) {
    if (auth.isLoggedIn()) {
      cart.loadCart();
    }
  }

  ngOnInit(): void {
    this.storeInfoService.getPublic().subscribe({
      next: (res) => {
        this.seo.setStoreName(res.data?.name);
        this.seo.setStoreDescription(res.data?.aboutText);
        if (res.data?.logoUrl) this.logoUrl.set(res.data.logoUrl);
        this.showName.set(res.data?.showNameInNavbar ?? true);
      },
    });
  }
}
