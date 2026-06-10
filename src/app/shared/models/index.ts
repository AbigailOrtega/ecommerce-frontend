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
  discountedPrice?: number;
  activePromotionDiscount?: number;
  activePromotionName?: string;
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
  discountAmount?: number;
  couponCode?: string;
  shippingCost?: number;
  shippingMethodName?: string;
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
  shippingType?: string;
  pickupLocationName?: string;
  pickupTimeSlotLabel?: string;
  pickupDate?: string;
  pickupLocationId?: number;
  pickupCancelled?: boolean;
  skydropxRateId?: string;
  skydropxShipmentId?: string;
  trackingNumber?: string;
  carrierName?: string;
  labelUrl?: string;
  shipmentStatus?: string;
  guestEmail?: string;
  guestFirstName?: string;
  guestLastName?: string;
  guestPhone?: string;
}

export interface SalesDataPoint {
  date: string;
  orderCount: number;
  revenue: number;
}

export interface SalesReport {
  period: string;
  data: SalesDataPoint[];
  totalRevenue: number;
  totalOrders: number;
}

export interface ProductSalesItem {
  productId: number;
  productName: string;
  unitsSold: number;
  revenue: number;
  currentStock: number;
}

export interface InventoryItem {
  productId: number;
  name: string;
  sku?: string;
  stock: number;
  price: number;
  active: boolean;
  outOfStockVariants?: string[];
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
  productName?: string;
  userId: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  approved: boolean;
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
  marketingOptIn?: boolean;
}

export interface Coupon {
  id: number;
  code: string;
  discountPercent: number;
  expiresAt: string;
  active: boolean;
  usageCount: number;
  usageLimit?: number;
  createdAt: string;
}

export interface CouponRequest {
  code: string;
  discountPercent: number;
  expiresAt: string;
  usageLimit?: number;
}

export interface PromoBanner {
  id: number;
  imageUrl: string;
  linkUrl?: string;
  active: boolean;
  createdAt: string;
}

export interface PromoBannerRequest {
  imageUrl: string;
  linkUrl?: string;
}

export interface PromotionProductSummary {
  id: number;
  name: string;
  price: number;
}

export interface Promotion {
  id: number;
  name: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  active: boolean;
  products: PromotionProductSummary[];
}

export interface PromotionRequest {
  name: string;
  discountPercent: number;
  startDate: string;
  endDate: string;
  productIds: number[];
}

export interface ShippingConfig {
  nationalEnabled: boolean;
  pickupEnabled: boolean;
  nationalBasePrice: number;
  nationalPricePerKm: number;
  originAddress?: string;
  hasApiKey?: boolean;
  pickupCost: number;
  // Skydropx
  hasSkydropxCredentials?: boolean;
  skydropxOriginStreet?: string;
  skydropxOriginPostalCode?: string;
  skydropxOriginCity?: string;
  skydropxOriginState?: string;
  skydropxOriginCountry?: string;
  skydropxSenderName?: string;
  skydropxSenderEmail?: string;
  skydropxSenderPhone?: string;
  skydropxDefaultWeight?: number;
  skydropxDefaultLength?: number;
  skydropxDefaultWidth?: number;
  skydropxDefaultHeight?: number;
  skydropxSandbox?: boolean;
  freeShippingEnabled?: boolean;
  freeShippingMinAmount?: number;
}

export interface SkydropxRate {
  id: string;
  carrier: string;
  service: string;
  price: number;
  estimatedDays?: number;
}

export interface SkydropxQuotation {
  quotationId: string;
  rates: SkydropxRate[];
}

export interface ShippingCalculateResponse {
  distanceKm: number;
  price: number;
}

export interface ShippingRatesResponse {
  skydropxAvailable: boolean;
  distanceKm: number;
  flatPrice: number;
  quotationId?: string;
  rates: SkydropxRate[];
}

export type AvailabilityType = 'RECURRING' | 'SPECIFIC_DATE';
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

export interface PickupException {
  id: number;
  date: string;
  reason?: string;
  createdAt: string;
}

export interface PickupExceptionRequest {
  date: string;
  reason?: string;
}

export interface PickupAvailability {
  id: number;
  type: AvailabilityType;
  dayOfWeek?: DayOfWeek;
  specificDate?: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
  active: boolean;
  exceptions?: PickupException[];
}

export interface PickupAvailabilityRequest {
  type: AvailabilityType;
  dayOfWeek?: DayOfWeek;
  specificDate?: string;
  startTime: string;
  endTime: string;
  maxCapacity: number;
}

export interface PickupLocation {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  active: boolean;
  availabilities?: PickupAvailability[];
}

export interface PickupLocationRequest {
  name: string;
  address: string;
  city: string;
  state: string;
}


export interface Ticket {
  id: number;
  orderId: number;
  orderNumber: string;
  userId: number;
  userName: string;
  subject: string;
  description: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TicketRequest {
  subject: string;
  description: string;
}

export interface TicketUpdateRequest {
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  adminNotes?: string;
}

export interface StoreImage {
  id: number;
  url: string;
  displayOrder: number;
  active: boolean;
}

export interface StoreInfo {
  name?: string;
  showNameInNavbar?: boolean;
  aboutText?: string;
  mission?: string;
  vision?: string;
  phone?: string;
  email?: string;
  privacyPolicy?: string;
  logoUrl?: string;
  themeKey?: string;
  fontKey?: string;
  images: StoreImage[];
  instagramUrl?: string;
  facebookUrl?: string;
  whatsappNumber?: string;
}

export interface LocalCartItem {
  tempId: string;
  productId: number;
  productName: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  selectedSizeId?: number;
  selectedSizeName?: string;
  selectedColorName?: string;
  subtotal: number;
}

export interface GuestOrderItemRequest {
  productId: number;
  quantity: number;
  sizeId?: number;
  colorName?: string;
}

export interface GuestOrderRequest {
  guestFirstName: string;
  guestLastName: string;
  guestEmail: string;
  guestPhone?: string;
  items: GuestOrderItemRequest[];
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZipCode?: string;
  shippingCountry?: string;
  paymentMethod: string;
  paymentId?: string;
  notes?: string;
  couponCode?: string;
  shippingType: string;
  pickupLocationId?: number;
  skydropxRateId?: string;
  pickupDate?: string;
  pickupAvailabilityId?: number;
}

export interface PickupGroup {
  locationName: string;
  orders: Order[];
}

export interface UpcomingSchedule {
  shipments: Order[];
  pickups: PickupGroup[];
}

export interface OrderRequest {
  shippingAddress?: string;
  shippingCity?: string;
  shippingState?: string;
  shippingZipCode?: string;
  shippingCountry?: string;
  paymentMethod: string;
  paymentId?: string;
  notes?: string;
  couponCode?: string;
  shippingType: string;
  pickupLocationId?: number;
  skydropxRateId?: string;
  pickupDate?: string;
  pickupAvailabilityId?: number;
}
