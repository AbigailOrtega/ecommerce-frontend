import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'orders',
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'orders/:orderNumber',
    loadComponent: () => import('./features/orders/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./features/admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
      },
      {
        path: 'categories',
        loadComponent: () => import('./features/admin/category-management/category-management.component').then(m => m.CategoryManagementComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./features/admin/product-management/product-management.component').then(m => m.ProductManagementComponent),
      },
      {
        path: 'orders',
        loadComponent: () => import('./features/admin/order-management/order-management.component').then(m => m.OrderManagementComponent),
      },
      {
        path: 'users',
        loadComponent: () => import('./features/admin/user-management/user-management.component').then(m => m.UserManagementComponent),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
