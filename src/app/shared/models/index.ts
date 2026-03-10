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
  colors?: ProductColor[];
}

export interface ProductColor {
  id?: number;
  name: string;
  images: string[];
  sizes: ProductSize[];
}

export interface ProductSize {
  id?: number;
  name: string;
  stock: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  subtotal: number;
  selectedColorName?: string;
  selectedSizeName?: string;
}

export interface OrderItem {
  id: number;
  productId?: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  selectedColorName?: string;
  selectedSizeName?: string;
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

export interface Review {
  id: number;
  productId: number;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface ReviewRequest {
  rating: number;
  title: string;
  comment: string;
}

export interface ReviewSummary {
  averageRating: number | null;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
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
