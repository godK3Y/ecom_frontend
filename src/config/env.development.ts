export const env = {
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID || "",
  NODE_ENV: process.env.NODE_ENV || "development",
}
