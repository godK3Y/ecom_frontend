export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.keycommerce.com",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "https://keycommerce.com",
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || "",
  NODE_ENV: process.env.NODE_ENV || "production",
}
