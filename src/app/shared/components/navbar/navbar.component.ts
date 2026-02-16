import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '@core/services/auth.service';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, MatBadgeModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/" class="brand">ShopHub</a>
      <span class="spacer"></span>

      <a mat-button routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
        <mat-icon>store</mat-icon> Shop
      </a>

      @if (auth.isLoggedIn()) {
        <a mat-icon-button routerLink="/cart">
          <mat-icon [matBadge]="cart.itemCount()" matBadgeColor="accent"
                    [matBadgeHidden]="cart.itemCount() === 0">shopping_cart</mat-icon>
        </a>

        <button mat-icon-button [matMenuTriggerFor]="userMenu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #userMenu="matMenu">
          <div class="menu-header">{{ auth.user()?.firstName }} {{ auth.user()?.lastName }}</div>
          <a mat-menu-item routerLink="/orders"><mat-icon>receipt_long</mat-icon> My Orders</a>
          <a mat-menu-item routerLink="/profile"><mat-icon>person</mat-icon> Profile</a>
          @if (auth.isAdmin()) {
            <a mat-menu-item routerLink="/admin"><mat-icon>dashboard</mat-icon> Admin Panel</a>
          }
          <button mat-menu-item (click)="auth.logout()"><mat-icon>logout</mat-icon> Logout</button>
        </mat-menu>
      } @else {
        <a mat-button routerLink="/login">Login</a>
        <a mat-raised-button color="accent" routerLink="/register">Sign Up</a>
      }
    </mat-toolbar>
  `,
  styles: [`
    .brand {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-decoration: none;
      color: white;
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
export class NavbarComponent {
  constructor(public auth: AuthService, public cart: CartService) {
    if (auth.isLoggedIn()) {
      cart.loadCart();
    }
  }
}
