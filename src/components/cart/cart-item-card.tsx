"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/format"
import type { CartItem } from "@/interfaces/cart"

interface CartItemCardProps {
  item: CartItem
}

export function CartItemCard({ item }: CartItemCardProps) {
  const { updateItem, removeItem } = useCart()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.maxQuantity) return

    setIsUpdating(true)
    try {
      await updateItem(item.id, newQuantity)
    } catch (error) {
      console.error("Failed to update item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const handleRemove = async () => {
    setIsUpdating(true)
    try {
      await removeItem(item.id)
    } catch (error) {
      console.error("Failed to remove item:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <Link href={`/products/${item.productId}`}>
              <img
                src={item.image || "/placeholder.svg?height=100&width=100"}
                alt={item.name}
                className="h-20 w-20 rounded-md object-cover hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-2">
              <div>
                <Link href={`/products/${item.productId}`}>
                  <h3 className="font-medium hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                </Link>
                {item.attributes && item.attributes.length > 0 && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(", ")}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                disabled={isUpdating}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Price and Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1 || isUpdating}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="px-3 py-1 text-sm font-medium min-w-[3rem] text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= item.maxQuantity || isUpdating}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                {/* Alternative: Quantity Select */}
                <div className="hidden sm:block">
                  <Select
                    value={item.quantity.toString()}
                    onValueChange={(value) => handleQuantityChange(Number.parseInt(value))}
                    disabled={isUpdating}
                  >
                    <SelectTrigger className="w-20 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: Math.min(item.maxQuantity, 10) }, (_, i) => i + 1).map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="font-semibold">{formatPrice(item.price * item.quantity)}</div>
                <div className="text-sm text-muted-foreground">{formatPrice(item.price)} each</div>
              </div>
            </div>

            {/* Stock Warning */}
            {item.quantity >= item.maxQuantity && (
              <p className="text-sm text-amber-600 mt-2">Maximum quantity available: {item.maxQuantity}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
