import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';
import { StoreInfoService } from '@core/services/store-info.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" class="brand">
        @if (logoUrl()) {
          <img [src]="logoUrl()" class="brand-logo" alt="Logo" />
        }
        {{ storeName() }}
      </a>
      <span class="spacer"></span>

      <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <mat-icon>store</mat-icon> Tienda
      </a>
      <a mat-button routerLink="/sobre-nosotros" routerLinkActive="active">Nosotros</a>

      <a mat-icon-button routerLink="/cart">
        <mat-icon [matBadge]="cart.itemCount()" matBadgeColor="accent"
                  [matBadgeHidden]="cart.itemCount() === 0">shopping_cart</mat-icon>
      </a>

      @if (auth.isLoggedIn()) {
        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <div class="menu-header">{{ auth.user()?.firstName }} {{ auth.user()?.lastName }}</div>
          <a mat-menu-item routerLink="/orders"><mat-icon>receipt_long</mat-icon> Mis Pedidos</a>
          <a mat-menu-item routerLink="/profile"><mat-icon>person</mat-icon> Mi Perfil</a>
          @if (auth.isAdmin()) {
            <a mat-menu-item routerLink="/admin"><mat-icon>dashboard</mat-icon> Panel Admin</a>
          }
          <button mat-menu-item (click)="auth.logout()"><mat-icon>logout</mat-icon> Cerrar sesión</button>
        </mat-menu>
      } @else {
        <a mat-button routerLink="/login">Iniciar sesión</a>
        <a mat-raised-button color="accent" routerLink="/register">Registrarse</a>
      }
    </mat-toolbar>
  `,
  styles: [`
    .brand {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-decoration: none;
      color: white;
    }
    .brand-logo {
      height: 36px;
      width: auto;
      object-fit: contain;
      border-radius: 4px;
    }
    .spacer { flex: 1 1 auto; }
    .menu-header {
      padding: 8px 16px;
      font-weight: 500;
      border-bottom: 1px solid #eee;
      margin-bottom: 4px;
    }
    .active { opacity: 1; }
    mat-toolbar a, mat-toolbar button { color: white; }
  `],
})
export class NavbarComponent implements OnInit {
  readonly storeName = signal('ShopHub');
  readonly logoUrl = signal<string | null>(null);

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
        if (res.data?.name) this.storeName.set(res.data.name);
        if (res.data?.logoUrl) this.logoUrl.set(res.data.logoUrl);
      },
    });
  }
}
