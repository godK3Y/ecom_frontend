// Main configuration file
export * from "./env.development";
export * from "./env.production";

// App configuration
export const APP_CONFIG = {
  name: "KeyCommerce",
  description: "Premium Fashion & Lifestyle E-commerce",
  version: "1.0.0",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
    timeout: 10000,
  },
  features: {
    auth: true,
    cart: true,
    wishlist: true,
    reviews: true,
    search: true,
  },
} as const;

// Theme configuration
export const THEME_CONFIG = {
  defaultTheme: "system" as const,
  themes: ["light", "dark", "system"] as const,
  storageKey: "keycommerce-theme",
} as const;

// Cart configuration
export const CART_CONFIG = {
  storageKey: "keycommerce-cart",
  maxItems: 99,
  maxQuantity: 10,
} as const;

// Pagination configuration
export const PAGINATION_CONFIG = {
  defaultPageSize: 12,
  pageSizeOptions: [12, 24, 48, 96],
} as const;
