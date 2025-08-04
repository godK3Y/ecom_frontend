"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import type { Product } from "@/interfaces/product"

interface ProductTabsProps {
  product: Product
}

export function ProductTabs({ product }: ProductTabsProps) {
  // Mock reviews data - in real app this would come from API
  const reviews = [
    {
      id: "1",
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      title: "Excellent quality!",
      content: "This product exceeded my expectations. The quality is outstanding and it fits perfectly.",
      verified: true,
    },
    {
      id: "2",
      author: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      title: "Great value",
      content: "Good quality for the price. Would recommend to others.",
      verified: true,
    },
  ]

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">{product.description}</p>

              {/* Additional product details */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Premium materials and construction</li>
                    <li>• Comfortable fit for all-day wear</li>
                    <li>• Easy care and maintenance</li>
                    <li>• Sustainable and eco-friendly</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Care Instructions</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Machine wash cold</li>
                    <li>• Tumble dry low</li>
                    <li>• Do not bleach</li>
                    <li>• Iron on low heat if needed</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">SKU</span>
                  <span className="text-muted-foreground">{product.sku}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Brand</span>
                  <span className="text-muted-foreground">{product.brand.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="font-medium">Category</span>
                  <span className="text-muted-foreground">{product.category.name}</span>
                </div>
                {product.weight && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Weight</span>
                    <span className="text-muted-foreground">{product.weight}g</span>
                  </div>
                )}
              </div>

              {product.dimensions && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Dimensions</h4>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Length</span>
                    <span className="text-muted-foreground">
                      {product.dimensions.length} {product.dimensions.unit}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Width</span>
                    <span className="text-muted-foreground">
                      {product.dimensions.width} {product.dimensions.unit}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Height</span>
                    <span className="text-muted-foreground">
                      {product.dimensions.height} {product.dimensions.unit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          {/* Reviews Summary */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl font-bold">{averageRating.toFixed(1)}</div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {reviews.length} reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
