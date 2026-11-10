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
    title: 'Iniciar sesión',
    data: { noindex: true },
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    title: 'Crear cuenta',
    data: { noindex: true },
    loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'products/:slug',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
  },
  {
    path: 'cart',
    title: 'Carrito',
    data: { noindex: true },
    loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent),
  },
  {
    path: 'checkout',
    title: 'Pagar',
    data: { noindex: true },
    loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
  },
  {
    path: 'confirmacion',
    title: 'Pedido confirmado',
    data: { noindex: true },
    loadComponent: () => import('./features/checkout/order-confirmation/order-confirmation.component').then(m => m.OrderConfirmationComponent),
  },
  {
    // the link in the pickup emails: reschedule or cancel without an account
    path: 'recoleccion/:orderNumber',
    title: 'Tu recolección',
    data: { noindex: true },
    loadComponent: () => import('./features/orders/pickup-link/pickup-link.component').then(m => m.PickupLinkComponent),
  },
  {
    path: 'rastrear-pedido',
    title: 'Rastrear pedido',
    loadComponent: () => import('./features/orders/track-order/track-order.component').then(m => m.TrackOrderComponent),
  },
  {
    path: 'orders',
    title: 'Mis pedidos',
    data: { noindex: true },
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    canActivate: [authGuard],
  },
  {
    path: 'orders/:orderNumber',
    title: 'Pedido',
    data: { noindex: true },
    loadComponent: () => import('./features/orders/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    title: 'Mi perfil',
    data: { noindex: true },
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    title: 'Administración',
    loadComponent: () => import('./features/admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    data: { noindex: true },
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
      {
        path: 'promotions',
        loadComponent: () => import('./features/admin/promotion-management/promotion-management.component').then(m => m.PromotionManagementComponent),
      },
      {
        path: 'banners',
        loadComponent: () => import('./features/admin/banner-management/banner-management.component').then(m => m.BannerManagementComponent),
      },
      {
        path: 'coupons',
        loadComponent: () => import('./features/admin/coupon-management/coupon-management.component').then(m => m.CouponManagementComponent),
      },
      {
        path: 'reviews',
        loadComponent: () => import('./features/admin/review-management/review-management.component').then(m => m.ReviewManagementComponent),
      },
      {
        path: 'tickets',
        loadComponent: () => import('./features/admin/ticket-management/ticket-management.component').then(m => m.TicketManagementComponent),
      },
      {
        path: 'shipping',
        loadComponent: () => import('./features/admin/shipping-management/shipping-management.component').then(m => m.ShippingManagementComponent),
      },
      {
        path: 'store-info',
        loadComponent: () => import('./features/admin/store-info/store-info.component').then(m => m.StoreInfoComponent),
      },
      {
        path: 'shipments',
        loadComponent: () => import('./features/admin/shipment-schedule/shipment-schedule.component').then(m => m.ShipmentScheduleComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/admin/reports/reports.component').then(m => m.ReportsComponent),
      },
      {
        path: 'marketing',
        loadComponent: () => import('./features/admin/marketing/marketing.component').then(m => m.MarketingComponent),
      },
      {
        path: 'analytics',
        loadComponent: () => import('./features/admin/analytics/analytics.component').then(m => m.AnalyticsComponent),
      },
    ],
  },
  {
    path: 'unsubscribe',
    title: 'Darse de baja',
    data: { noindex: true },
    loadComponent: () => import('./features/unsubscribe/unsubscribe.component').then(m => m.UnsubscribeComponent),
  },
  {
    path: 'sobre-nosotros',
    title: 'Sobre nosotros',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'contacto',
    title: 'Contacto',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'aviso-privacidad',
    title: 'Aviso de privacidad',
    loadComponent: () => import('./features/privacy/privacy.component').then(m => m.PrivacyComponent),
  },
  {
    path: 'forgot-password',
    title: 'Recuperar contraseña',
    data: { noindex: true },
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent),
  },
  {
    path: 'reset-password',
    title: 'Nueva contraseña',
    data: { noindex: true },
    loadComponent: () => import('./features/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent),
  },
  {
    path: '**',
    title: 'Página no encontrada',
    data: { noindex: true },
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
