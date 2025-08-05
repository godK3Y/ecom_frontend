import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "@/services/api-client";
import type { Cart, CartItem } from "@/interfaces/cart";

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isLoading: boolean;
  error: string | null;
}

interface CartActions {
  addItem: (productId: string, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  clearError: () => void;
  setItems: (items: CartItem[]) => void;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      totalItems: 0,
      subtotal: 0,
      isLoading: false,
      error: null,

      // Actions
      addItem: async (productId: string, quantity = 1) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.cart.add({ productId, quantity });

          if (response.success) {
            const { items } = response.data as Cart;
            const totalItems = items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const subtotal = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            set({
              items,
              totalItems,
              subtotal,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Failed to add item to cart",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to add item to cart";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          await get().removeItem(itemId);
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await api.cart.update(itemId, quantity);

          if (response.success) {
            const { items } = response.data as Cart;
            const totalItems = items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const subtotal = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            set({
              items,
              totalItems,
              subtotal,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Failed to update cart",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to update cart";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      removeItem: async (itemId: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.cart.remove(itemId);

          if (response.success) {
            const { items } = response.data as Cart;
            const totalItems = items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const subtotal = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            set({
              items,
              totalItems,
              subtotal,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Failed to remove item from cart",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to remove item from cart";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      clearCart: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.cart.clear();

          if (response.success) {
            set({
              items: [],
              totalItems: 0,
              subtotal: 0,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Failed to clear cart",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to clear cart";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      loadCart: async () => {
        set({ isLoading: true, error: null });

        try {
          const response = await api.cart.get();

          if (response.success) {
            const { items } = response.data as Cart;
            const totalItems = items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
            const subtotal = items.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            );

            set({
              items,
              totalItems,
              subtotal,
              isLoading: false,
              error: null,
            });
          } else {
            set({
              isLoading: false,
              error: response.message || "Failed to load cart",
            });
          }
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Failed to load cart";
          set({
            isLoading: false,
            error: errorMessage,
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },

      setItems: (items: CartItem[]) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const subtotal = items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );

        set({
          items,
          totalItems,
          subtotal,
        });
      },
    }),
    {
      name: "keycommerce-cart",
      partialize: (state) => ({
        items: state.items,
        totalItems: state.totalItems,
        subtotal: state.subtotal,
      }),
    }
  )
);

// Selectors for better performance
export const useCartItems = () => useCartStore((state) => state.items);
export const useCartTotalItems = () =>
  useCartStore((state) => state.totalItems);
export const useCartSubtotal = () => useCartStore((state) => state.subtotal);
export const useCartLoading = () => useCartStore((state) => state.isLoading);
export const useCartError = () => useCartStore((state) => state.error);

// Helper functions
export const useCartItem = (productId: string) =>
  useCartStore((state) =>
    state.items.find((item) => item.productId === productId)
  );

export const useCartItemQuantity = (productId: string) => {
  const item = useCartItem(productId);
  return item?.quantity || 0;
};
