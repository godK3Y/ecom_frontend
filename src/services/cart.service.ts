import type { Cart, CartItem } from "@/interfaces/cart";

class CartService {
  async getCart(): Promise<Cart> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Return empty cart for demo
    return {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      currency: "USD",
    };
  }

  async addItem(item: Omit<CartItem, "id">): Promise<Cart> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock successful add to cart
    return {
      items: [{ ...item, id: Date.now().toString() }],
      subtotal: item.price * item.quantity,
      tax: item.price * item.quantity * 0.1,
      shipping: 0,
      discount: 0,
      total: item.price * item.quantity * 1.1,
      currency: "USD",
    };
  }

  async updateItem(itemId: string, quantity: number): Promise<Cart> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Mock cart update
    return {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      currency: "USD",
    };
  }

  async removeItem(itemId: string): Promise<Cart> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 0,
      total: 0,
      currency: "USD",
    };
  }

  async clearCart(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  async applyCoupon(code: string): Promise<Cart> {
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0,
      discount: 10,
      total: 0,
      currency: "USD",
    };
  }
}

export const cartService = new CartService();
