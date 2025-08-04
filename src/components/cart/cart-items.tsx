"use client"

import { useCart } from "@/hooks/useCart"
import { CartItemCard } from "@/components/cart/cart-item-card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export function CartItems() {
  const { items, clearCart } = useCart()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shopping Cart ({items.length} items)</h1>
        {items.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearCart}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
