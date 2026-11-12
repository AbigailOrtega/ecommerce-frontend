import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';

interface NavItem { path: string; label: string; icon: string; }
interface NavGroup { title: string; items: NavItem[]; }

/** The admin pages share this frame: a side menu grouped by topic, the page beside it. */
@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatSidenavModule, MatIconModule, MatButtonModule],
  template: `
    <mat-sidenav-container class="admin-shell">
      <mat-sidenav #nav [mode]="narrow() ? 'over' : 'side'" [opened]="!narrow()" class="admin-nav" data-testid="admin-nav">
        <a class="nav-item home" routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
           (click)="narrow() && nav.close()">
          <mat-icon>dashboard</mat-icon> Inicio
        </a>
        @for (group of groups; track group.title) {
          <div class="nav-group" role="group" [attr.aria-label]="group.title">
            <div class="nav-title">{{ group.title }}</div>
            @for (item of group.items; track item.path) {
              <a class="nav-item" [routerLink]="'/admin/' + item.path" routerLinkActive="active" (click)="narrow() && nav.close()">
                <mat-icon>{{ item.icon }}</mat-icon> {{ item.label }}
              </a>
            }
          </div>
        }
      </mat-sidenav>
      <mat-sidenav-content class="admin-content">
        @if (narrow()) {
          <button mat-stroked-button class="menu-toggle" (click)="nav.toggle()" data-testid="admin-menu-toggle">
            <mat-icon>menu</mat-icon> Menú del panel
          </button>
        }
        <router-outlet />
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .admin-shell { min-height: calc(100vh - 64px); background: transparent; }
    .admin-nav { width: 232px; padding: 12px 8px 24px; border-right: 1px solid rgba(0,0,0,0.08); background: #fafafa; }
    .nav-group { margin-top: 14px; }
    .nav-title { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(0,0,0,0.5); padding: 0 12px 4px; }
    .nav-item {
      display: flex; align-items: center; gap: 12px; padding: 8px 12px; border-radius: 8px;
      color: rgba(0,0,0,0.8); text-decoration: none; font-size: 0.92rem;
    }
    .nav-item mat-icon { font-size: 20px; width: 20px; height: 20px; color: rgba(0,0,0,0.55); }
    .nav-item:hover { background: rgba(0,0,0,0.05); }
    .nav-item.active { background: rgba(0,0,0,0.07); color: var(--theme-primary-text, var(--theme-primary)); font-weight: 600; }
    .nav-item.active mat-icon { color: var(--theme-primary-text, var(--theme-primary)); }
    .admin-content { padding: 0 8px; }
    .menu-toggle { margin: 12px 8px 0; }
  `],
})
export class AdminLayoutComponent {
  readonly groups: NavGroup[] = [
    { title: 'Ventas', items: [
      { path: 'orders', label: 'Pedidos', icon: 'receipt_long' },
      { path: 'shipments', label: 'Agenda de envíos', icon: 'calendar_month' },
      { path: 'coupons', label: 'Cupones', icon: 'confirmation_number' },
      { path: 'promotions', label: 'Promociones', icon: 'local_offer' },
      { path: 'reports', label: 'Reportes', icon: 'bar_chart' },
      { path: 'analytics', label: 'Analítica', icon: 'insights' },
    ] },
    { title: 'Catálogo', items: [
      { path: 'products', label: 'Productos', icon: 'inventory_2' },
      { path: 'categories', label: 'Categorías', icon: 'category' },
      { path: 'banners', label: 'Banners', icon: 'image' },
      { path: 'reviews', label: 'Reseñas', icon: 'rate_review' },
    ] },
    { title: 'Clientes', items: [
      { path: 'users', label: 'Usuarios', icon: 'people' },
      { path: 'tickets', label: 'Tickets', icon: 'support_agent' },
      { path: 'marketing', label: 'Email marketing', icon: 'campaign' },
    ] },
    { title: 'Configuración', items: [
      { path: 'store-info', label: 'Info general', icon: 'storefront' },
      { path: 'shipping', label: 'Config. entregas', icon: 'local_shipping' },
      { path: 'payments', label: 'Pagos y envíos', icon: 'payments' },
    ] },
  ];

  /** Below 960px the menu slides over the page instead of standing beside it. */
  readonly narrow = signal(false);

  constructor() {
    inject(BreakpointObserver).observe('(max-width: 959px)')
      .pipe(takeUntilDestroyed(inject(DestroyRef)))
      .subscribe(state => this.narrow.set(state.matches));
    // the window scrolls, not the sidenav content: start each admin page at the top
    inject(Router).events.pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => { if (typeof window !== 'undefined') window.scrollTo(0, 0); });
  }
}
