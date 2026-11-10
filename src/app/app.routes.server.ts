import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Public pages are rendered on the server so search engines and link previews (WhatsApp, Facebook)
 * see the real title, description, image and products. Everything behind a login, the cart and
 * checkout stay client-only: they depend on the session and gain nothing from SSR.
 */
const clientOnly = [
  'login', 'register', 'forgot-password', 'reset-password', 'unsubscribe',
  'cart', 'checkout', 'confirmacion',
  // a form: text typed before hydration would be lost, and it has nothing to index
  'rastrear-pedido',
  'orders', 'orders/:orderNumber', 'profile',
  // the pickup emails' link: personal, token-protected, never rendered or cached on the server
  'recoleccion/:orderNumber',
  'admin', 'admin/**',
];

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Server },
  { path: 'products/:slug', renderMode: RenderMode.Server },
  { path: 'sobre-nosotros', renderMode: RenderMode.Server },
  { path: 'contacto', renderMode: RenderMode.Server },
  { path: 'aviso-privacidad', renderMode: RenderMode.Server },
  ...clientOnly.map(path => ({ path, renderMode: RenderMode.Client }) as ServerRoute),
  // anything else is the "page not found" component: answer 404 so it is never indexed
  { path: '**', renderMode: RenderMode.Server, status: 404 },
];
