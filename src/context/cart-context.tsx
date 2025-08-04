"use client"

import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import type { Cart, CartItem } from "@/interfaces/cart"
import { cartService } from "@/services/cart.service"

interface CartState extends Cart {
  isLoading: boolean
  error: string | null
}

type CartAction =
  | { type: "CART_LOADING" }
  | { type: "CART_LOADED"; payload: Cart }
  | { type: "CART_ERROR"; payload: string }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "UPDATE_ITEM"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

interface CartContextType extends CartState {
  addItem: (item: Omit<CartItem, "id">) => void
  updateItem: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "CART_LOADING":
      return { ...state, isLoading: true, error: null }
    case "CART_LOADED":
      return { ...state, ...action.payload, isLoading: false, error: null }
    case "CART_ERROR":
      return { ...state, isLoading: false, error: action.payload }
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId && item.variantId === action.payload.variantId,
      )

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: Math.min(item.quantity + action.payload.quantity, item.maxQuantity) }
            : item,
        )
      } else {
        newItems = [...state.items, { ...action.payload, id: Date.now().toString() }]
      }

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.1 // 10% tax
      const total = subtotal + tax + state.shipping - state.discount

      return { ...state, items: newItems, subtotal, tax, total }
    }
    case "UPDATE_ITEM": {
      const newItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.min(action.payload.quantity, item.maxQuantity) }
            : item,
        )
        .filter((item) => item.quantity > 0)

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.1
      const total = subtotal + tax + state.shipping - state.discount

      return { ...state, items: newItems, subtotal, tax, total }
    }
    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.1
      const total = subtotal + tax + state.shipping - state.discount

      return { ...state, items: newItems, subtotal, tax, total }
    }
    case "CLEAR_CART":
      return { ...state, items: [], subtotal: 0, tax: 0, total: 0 }
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  currency: "USD",
  isLoading: false,
  error: null,
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    const loadCart = async () => {
      try {
        dispatch({ type: "CART_LOADING" })
        const cart = await cartService.getCart()
        dispatch({ type: "CART_LOADED", payload: cart })
      } catch (error) {
        dispatch({ type: "CART_ERROR", payload: "Failed to load cart" })
      }
    }

    loadCart()
  }, [])

  const addItem = (item: Omit<CartItem, "id">) => {
    dispatch({ type: "ADD_ITEM", payload: { ...item, id: Date.now().toString() } })
  }

  const updateItem = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_ITEM", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        updateItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
