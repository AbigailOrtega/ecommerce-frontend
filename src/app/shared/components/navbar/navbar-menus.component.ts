import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '@core/services/auth.service';

/**
 * The navbar's two drop-down menus (account on desktop, everything on mobile). They live apart from
 * the navbar so Material's menu and the CDK overlay it needs (~85 kB) load after the page, through
 * the @defer block in NavbarComponent, instead of with the first paint.
 */
@Component({
  selector: 'app-navbar-menus',
  imports: [RouterLink, RouterLinkActive, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule],
  template: `
    @if (auth.isLoggedIn()) {
      <button mat-icon-button class="desktop-only" [matMenuTriggerFor]="userMenu" aria-label="Mi cuenta">
        <mat-icon>account_circle</mat-icon>
      </button>
    }

    <button mat-icon-button class="mobile-only" [matMenuTriggerFor]="mobileMenu" aria-label="Menú">
      <mat-icon>menu</mat-icon>
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

    <mat-menu #mobileMenu="matMenu">
      <a mat-menu-item routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="menu-active">
        <mat-icon>store</mat-icon> Tienda
      </a>
      <a mat-menu-item routerLink="/sobre-nosotros" routerLinkActive="menu-active">
        <mat-icon>info</mat-icon> Nosotros
      </a>
      <a mat-menu-item routerLink="/contacto" routerLinkActive="menu-active">
        <mat-icon>contact_phone</mat-icon> Contacto
      </a>
      <a mat-menu-item routerLink="/rastrear-pedido" routerLinkActive="menu-active">
        <mat-icon>search</mat-icon> Rastrear pedido
      </a>
      <mat-divider></mat-divider>
      @if (auth.isLoggedIn()) {
        <div class="menu-header">{{ auth.user()?.firstName }} {{ auth.user()?.lastName }}</div>
        <a mat-menu-item routerLink="/orders"><mat-icon>receipt_long</mat-icon> Mis Pedidos</a>
        <a mat-menu-item routerLink="/profile"><mat-icon>person</mat-icon> Mi Perfil</a>
        @if (auth.isAdmin()) {
          <a mat-menu-item routerLink="/admin"><mat-icon>dashboard</mat-icon> Panel Admin</a>
        }
        <button mat-menu-item (click)="auth.logout()"><mat-icon>logout</mat-icon> Cerrar sesión</button>
      } @else {
        <a mat-menu-item routerLink="/login"><mat-icon>login</mat-icon> Iniciar sesión</a>
        <a mat-menu-item routerLink="/register"><mat-icon>person_add</mat-icon> Registrarse</a>
      }
    </mat-menu>
  `,
  styles: [`
    :host { display: contents; }
    button { color: white; }
    .mobile-only { display: none !important; }
    .menu-header { padding: 8px 16px; font-weight: 500; border-bottom: 1px solid #eee; margin-bottom: 4px; }
    @media (max-width: 767px) {
      .desktop-only { display: none !important; }
      .mobile-only { display: inline-flex !important; }
    }
  `],
})
export class NavbarMenusComponent {
  readonly auth = inject(AuthService);
}
