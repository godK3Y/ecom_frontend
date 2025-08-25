import type { VariantAttribute } from "./variantAttribute"; // Assuming VariantAttribute is defined in another file

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  attributes?: VariantAttribute[];
  maxQuantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  total: number;
}
