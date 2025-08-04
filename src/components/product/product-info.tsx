"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingBag, Share2, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/format"
import type { Product, ProductVariant } from "@/interfaces/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length > 0 ? product.variants[0] : null,
  )
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { addItem } = useCart()

  const currentPrice = selectedVariant?.price || product.price
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: selectedVariant?.id,
      name: product.name,
      price: currentPrice,
      quantity,
      image: product.images[0]?.url,
      attributes: selectedVariant?.attributes,
      maxQuantity: selectedVariant?.stock || product.stock,
    })
  }

  const isInStock = selectedVariant ? selectedVariant.stock > 0 : product.stock > 0
  const maxQuantity = selectedVariant ? selectedVariant.stock : product.stock

  return (
    <div className="space-y-6">
      {/* Product Title and Brand */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{product.brand.name}</Badge>
          {product.isFeatured && <Badge>Featured</Badge>}
          {discountPercentage > 0 && <Badge variant="destructive">{discountPercentage}% Off</Badge>}
        </div>
        <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
        <p className="text-muted-foreground mt-2">{product.shortDescription}</p>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">{formatPrice(currentPrice)}</span>
        {product.originalPrice && product.originalPrice > currentPrice && (
          <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
        )}
      </div>

      {/* Variants */}
      {product.variants.length > 0 && (
        <div className="space-y-4">
          {/* Size/Variant Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Select {product.variants[0]?.attributes[0]?.name || "Variant"}
            </label>
            <Select
              value={selectedVariant?.id || ""}
              onValueChange={(value) => {
                const variant = product.variants.find((v) => v.id === value)
                setSelectedVariant(variant || null)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose an option" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.id} value={variant.id} disabled={variant.stock === 0}>
                    <div className="flex items-center justify-between w-full">
                      <span>{variant.attributes.map((attr) => attr.value).join(" / ")}</span>
                      {variant.stock === 0 && <span className="text-muted-foreground ml-2">(Out of stock)</span>}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Quantity */}
      <div>
        <label className="text-sm font-medium mb-2 block">Quantity</label>
        <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value))}>
          <SelectTrigger className="w-24">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: Math.min(maxQuantity, 10) }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">{maxQuantity} items available</p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${isInStock ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-sm font-medium">{isInStock ? "In Stock" : "Out of Stock"}</span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button size="lg" className="w-full" onClick={handleAddToCart} disabled={!isInStock}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 bg-transparent"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
            {isWishlisted ? "Saved" : "Save"}
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <span>Free shipping on orders over $100</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <RotateCcw className="h-4 w-4 text-muted-foreground" />
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span>2-year warranty included</span>
        </div>
      </div>

      {/* Product Tags */}
      {product.tags.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
