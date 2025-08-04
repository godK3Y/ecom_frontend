"use client"

import type React from "react"

import { CartProvider as CartContextProvider } from "@/context/cart-context"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>
}
