import { useCart as useCartContext } from "@/context/cart-context"

export const useCart = () => {
  return useCartContext()
}
