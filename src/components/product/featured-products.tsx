"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product/product-card"
import { Skeleton } from "@/components/ui/skeleton"
import { productService } from "@/services/product.service"
import type { Product } from "@/interfaces/product"

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const featuredProducts = await productService.getFeaturedProducts()
        setProducts(featuredProducts)
      } catch (error) {
        console.error("Failed to fetch featured products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 sm:py-24">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
              <p className="text-muted-foreground">Handpicked essentials for the modern lifestyle</p>
            </div>
            <Button variant="outline" asChild className="mt-4 sm:mt-0 bg-transparent">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked essentials for the modern lifestyle</p>
          </div>
          <Button variant="outline" asChild className="mt-4 sm:mt-0 bg-transparent">
            <Link href="/products">View All Products</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
