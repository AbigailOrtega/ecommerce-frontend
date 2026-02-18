export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  user: User;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  sku?: string;
  stockQuantity: number;
  imageUrl?: string;
  images?: string[];
  slug: string;
  featured: boolean;
  active: boolean;
  categories?: Category[];
  createdAt: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
}

export interface OrderItem {
  id: number;
  productId?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  user?: User;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod?: string;
  paymentId?: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: Order[];
  ordersByStatus: Record<string, number>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface OrderRequest {
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  paymentMethod: string;
  paymentId?: string;
  notes?: string;
}
