"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { productService } from "@/services/product.service"
import { PRODUCT_SORT_OPTIONS } from "@/lib/constants"
import type { Product, ProductFilters } from "@/interfaces/product"

interface ProductsGridProps {
  searchParams: {
    category?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
    page?: string
  }
}

export function ProductsGrid({ searchParams }: ProductsGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState(searchParams.sortBy || "name-asc")

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        const filters: ProductFilters = {
          category: searchParams.category,
          brand: searchParams.brand,
          minPrice: searchParams.minPrice ? Number.parseFloat(searchParams.minPrice) : undefined,
          maxPrice: searchParams.maxPrice ? Number.parseFloat(searchParams.maxPrice) : undefined,
          page: currentPage,
          limit: 12,
        }

        // Parse sort parameters
        if (sortBy) {
          const [sortField, sortOrder] = sortBy.split("-")
          filters.sortBy = sortField as any
          filters.sortOrder = sortOrder as "asc" | "desc"
        }

        const response = await productService.getProducts(filters)
        setProducts(response.products)
        setTotalPages(response.totalPages)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams, currentPage, sortBy])

  const handleSortChange = (value: string) => {
    setSortBy(value)
    setCurrentPage(1) // Reset to first page when sorting changes
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Sort and Results Header Skeleton */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-48" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Sort and Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-muted-foreground">Showing {products.length} products</p>

        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {PRODUCT_SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
          <Button variant="outline">Clear Filters</Button>
        </div>
      )}
    </div>
  )
}
