import { useCart as useCartContext } from "@/stores/cart-context";

export const useCart = () => {
  return useCartContext();
};
