# ShopHub Frontend

Angular 18 single-page application for the ShopHub e-commerce platform.

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Angular | 21.x | Framework (SSR + hydration) |
| TypeScript | 5.4 | Language |
| Angular Material | 21.x | UI Component Library |
| Angular CDK | 21.x | Component Dev Kit |
| RxJS | 7.8 | Reactive Programming |
| SCSS | - | Styling |
| Karma + Jasmine | - | Unit Testing |

## Project Structure

```
src/app/
├── app.routes.ts                        # Route definitions with lazy loading
├── core/
│   ├── guards/
│   │   ├── auth.guard.ts                # Redirects unauthenticated users to /login
│   │   └── admin.guard.ts               # Restricts admin routes to ADMIN role
│   ├── interceptors/                    # HTTP interceptors (auth token, API base URL)
│   └── services/                        # API communication services
├── features/
│   ├── auth/
│   │   ├── login/                       # Login form component
│   │   └── register/                    # Registration form component
│   ├── products/
│   │   ├── product-list/                # Product catalog with search & filtering
│   │   └── product-detail/              # Single product view
│   ├── cart/                            # Shopping cart (view, update quantity, remove)
│   ├── checkout/                        # Stripe-powered checkout flow
│   ├── orders/
│   │   ├── order-list/                  # User's order history
│   │   └── order-detail/                # Order tracking & details
│   ├── profile/                         # User profile management
│   └── admin/
│       ├── dashboard/                   # Analytics overview (revenue, orders, users)
│       ├── product-management/          # CRUD products
│       ├── order-management/            # View & update order statuses
│       └── user-management/             # View & manage user accounts
└── shared/
    ├── components/                      # Reusable UI components
    └── models/                          # TypeScript interfaces & types
```

## Prerequisites

- Node.js 18+
- npm 9+ (or yarn)
- Angular CLI (`npm install -g @angular/cli`)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
ng serve
```

The app runs at `http://localhost:4200` and proxies API requests to `http://localhost:8080`.

### Build for Production

```bash
ng build --configuration production
```

Output is written to `dist/ecommerce-frontend/browser/`.

### Run Tests

```bash
ng test
```

Runs unit tests with Karma and Jasmine in a Chrome browser.

## Routes

### Public Routes

| Path | Component | Description |
|---|---|---|
| `/` | ProductListComponent | Product catalog homepage |
| `/login` | LoginComponent | User login form |
| `/register` | RegisterComponent | New account registration |
| `/products/:slug` | ProductDetailComponent | Product detail page |

### Protected Routes (requires login)

| Path | Component | Description |
|---|---|---|
| `/cart` | CartComponent | Shopping cart |
| `/checkout` | CheckoutComponent | Payment & order placement |
| `/orders` | OrderListComponent | Order history |
| `/orders/:orderNumber` | OrderDetailComponent | Order tracking |
| `/profile` | ProfileComponent | User profile settings |

### Admin Routes (requires ADMIN role)

| Path | Component | Description |
|---|---|---|
| `/admin` | DashboardComponent | Analytics dashboard |
| `/admin/products` | ProductManagementComponent | Manage products |
| `/admin/orders` | OrderManagementComponent | Manage orders |
| `/admin/users` | UserManagementComponent | Manage users |

All routes use **lazy loading** via `loadComponent` for optimized bundle splitting.

## Architecture

### Standalone Components

All components are standalone (Angular 18 default). No NgModules are used for feature organization.

### Guards

- **authGuard** - Checks for a valid JWT in storage. Redirects to `/login` if not authenticated.
- **adminGuard** - Checks the user's role. Restricts access to users with the `ADMIN` role.

### Interceptors

HTTP interceptors handle:
- Attaching the `Authorization: Bearer <token>` header to outgoing requests
- Routing API calls to the backend base URL

### Services

Services in `core/services/` communicate with the backend REST API using Angular's `HttpClient`. Each service maps to a backend domain (auth, products, cart, orders, payments, admin).

### Styling

- **Angular Material** with the `indigo-pink` prebuilt theme
- **SCSS** for component-level styles
- Budgets configured: 500KB warning / 1MB error for initial bundle

## Environment Configuration

Environment files control the API base URL and feature flags:

| File | Purpose |
|---|---|
| `src/environments/environment.ts` | Development (default) |
| `src/environments/environment.prod.ts` | Production (swapped at build time) |

Update `environment.prod.ts` with your production API URL before deploying.

## Deployment

The app is server-side rendered (Angular SSR) for the public pages: home/catalog, product pages,
"Sobre nosotros", "Contacto", "Aviso de privacidad" and the 404 page. Login, cart, checkout,
account and admin pages render in the browser only (see `src/app/app.routes.server.ts`).

### Vercel

`vercel.json` holds the whole setup:

- build: `npm run build` → `dist/ecommerce-frontend/{browser,server}`
- static files are served from `dist/ecommerce-frontend/browser`
- `/api/*` is proxied to the backend on Render
- every other path is rendered by the `api/ssr.mjs` function (it wraps `src/server.ts`)

Environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `STRIPE_PUBLIC_KEY` | - | Stripe publishable key (written into `environment.prod.ts` at build) |
| `API_ORIGIN` | `https://ecommerce-backend-sv5n.onrender.com` | Backend the server-side renderer calls directly |

If the backend is asleep, a server render waits at most 4 s for its data
(`SSR_HTTP_TIMEOUT_MS` in `src/app/core/ssr.ts`) and then the browser loads it after hydration.

### Run the SSR build locally

```bash
npm run build
API_ORIGIN=http://localhost:8080 npm run serve:ssr:ecommerce-frontend   # http://localhost:4000
```

## Development Notes

- The dev server auto-reloads on file changes
- Source maps are enabled in development mode
- Production builds use output hashing for cache busting
- Component styles use SCSS with standalone component encapsulation
