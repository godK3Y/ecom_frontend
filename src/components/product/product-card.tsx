"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Product } from "@/interfaces/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const mainImage = product.images.length > 0 ? product.images[0].url : "/placeholder.svg?height=400&width=400"

  return (
    <Card
      className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-slate-50">
          <Link href={`/products/${product.id}`}>
            <img
              src={mainImage || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && <Badge className="bg-primary text-primary-foreground">New</Badge>}
            {discountPercentage > 0 && <Badge variant="destructive">{discountPercentage}% Off</Badge>}
          </div>

          {/* Action buttons */}
          <div
            className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-200 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-white/90 hover:bg-white"
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Quick add to cart */}
          <div
            className={`absolute bottom-3 left-3 right-3 transition-all duration-200 ${
              isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <Button size="sm" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <div className="text-sm text-muted-foreground">{product.category.name}</div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium hover:text-primary transition-colors">{product.name}</h3>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
