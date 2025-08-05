// Product categories
export const PRODUCT_CATEGORIES = [
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "shoes", name: "Shoes", icon: "👟" },
  { id: "accessories", name: "Accessories", icon: "👜" },
  { id: "jewelry", name: "Jewelry", icon: "💍" },
  { id: "watches", name: "Watches", icon: "⌚" },
  { id: "bags", name: "Bags", icon: "🛍️" },
  { id: "beauty", name: "Beauty", icon: "💄" },
  { id: "home", name: "Home & Living", icon: "🏠" },
] as const;

// Product brands
export const PRODUCT_BRANDS = [
  { id: "nike", name: "Nike", logo: "/brands/nike.svg" },
  { id: "adidas", name: "Adidas", logo: "/brands/adidas.svg" },
  { id: "apple", name: "Apple", logo: "/brands/apple.svg" },
  { id: "samsung", name: "Samsung", logo: "/brands/samsung.svg" },
  { id: "sony", name: "Sony", logo: "/brands/sony.svg" },
  { id: "lg", name: "LG", logo: "/brands/lg.svg" },
] as const;

// Product sort options
export const PRODUCT_SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
] as const;

// Product filters
export const PRODUCT_FILTERS = {
  priceRanges: [
    { min: 0, max: 50, label: "Under $50" },
    { min: 50, max: 100, label: "$50 - $100" },
    { min: 100, max: 200, label: "$100 - $200" },
    { min: 200, max: 500, label: "$200 - $500" },
    { min: 500, max: null, label: "Over $500" },
  ],
  ratings: [
    { value: 4, label: "4★ & above" },
    { value: 3, label: "3★ & above" },
    { value: 2, label: "2★ & above" },
    { value: 1, label: "1★ & above" },
  ],
  availability: [
    { value: "in-stock", label: "In Stock" },
    { value: "out-of-stock", label: "Out of Stock" },
    { value: "pre-order", label: "Pre-order" },
  ],
} as const;

// Order status
export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
  REFUNDED: "refunded",
} as const;

// Order status labels
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: "Pending",
  [ORDER_STATUS.CONFIRMED]: "Confirmed",
  [ORDER_STATUS.PROCESSING]: "Processing",
  [ORDER_STATUS.SHIPPED]: "Shipped",
  [ORDER_STATUS.DELIVERED]: "Delivered",
  [ORDER_STATUS.CANCELLED]: "Cancelled",
  [ORDER_STATUS.REFUNDED]: "Refunded",
} as const;

// Payment methods
export const PAYMENT_METHODS = [
  { id: "credit-card", name: "Credit Card", icon: "💳" },
  { id: "paypal", name: "PayPal", icon: "🔵" },
  { id: "apple-pay", name: "Apple Pay", icon: "🍎" },
  { id: "google-pay", name: "Google Pay", icon: "🤖" },
  { id: "bank-transfer", name: "Bank Transfer", icon: "🏦" },
] as const;

// Shipping methods
export const SHIPPING_METHODS = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    days: "3-5 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 12.99,
    days: "1-2 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 24.99,
    days: "Next business day",
  },
  {
    id: "free",
    name: "Free Shipping",
    price: 0,
    days: "5-7 business days",
    minOrder: 50,
  },
] as const;

// User roles
export const USER_ROLES = {
  CUSTOMER: "customer",
  SELLER: "seller",
  ADMIN: "admin",
} as const;

// Navigation items
export const NAVIGATION_ITEMS = [
  { href: "/shop", label: "Shop", icon: "🛍️" },
  { href: "/shop/categories", label: "Categories", icon: "📂" },
  { href: "/shop/deals", label: "Deals", icon: "🔥" },
  { href: "/about", label: "About", icon: "ℹ️" },
  { href: "/contact", label: "Contact", icon: "📞" },
] as const;

// Footer links
export const FOOTER_LINKS = {
  company: [
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/press", label: "Press" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/contact", label: "Contact Us" },
    { href: "/returns", label: "Returns" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/cookies", label: "Cookie Policy" },
  ],
  social: [
    { href: "https://facebook.com", label: "Facebook", icon: "📘" },
    { href: "https://twitter.com", label: "Twitter", icon: "🐦" },
    { href: "https://instagram.com", label: "Instagram", icon: "📷" },
    { href: "https://youtube.com", label: "YouTube", icon: "📺" },
  ],
} as const;

// API endpoints
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  products: {
    list: "/products",
    detail: "/products/:id",
    search: "/products/search",
    categories: "/products/categories",
    brands: "/products/brands",
  },
  cart: {
    get: "/cart",
    add: "/cart/add",
    update: "/cart/update",
    remove: "/cart/remove",
    clear: "/cart/clear",
  },
  orders: {
    list: "/orders",
    detail: "/orders/:id",
    create: "/orders",
    cancel: "/orders/:id/cancel",
  },
  user: {
    profile: "/user/profile",
    addresses: "/user/addresses",
    wishlist: "/user/wishlist",
  },
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  theme: "keycommerce-theme",
  cart: "keycommerce-cart",
  auth: "keycommerce-auth",
  user: "keycommerce-user",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  network: "Network error. Please check your connection.",
  unauthorized: "You are not authorized to perform this action.",
  notFound: "The requested resource was not found.",
  serverError: "Server error. Please try again later.",
  validation: "Please check your input and try again.",
  unknown: "An unexpected error occurred.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  itemAdded: "Item added to cart successfully.",
  itemRemoved: "Item removed from cart.",
  orderPlaced: "Order placed successfully!",
  profileUpdated: "Profile updated successfully.",
  passwordChanged: "Password changed successfully.",
} as const;
