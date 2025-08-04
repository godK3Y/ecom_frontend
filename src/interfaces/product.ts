export interface Product {
  id: string
  name: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  sku: string
  category: Category
  brand: Brand
  images: ProductImage[]
  variants: ProductVariant[]
  tags: string[]
  isActive: boolean
  isFeatured: boolean
  stock: number
  weight?: number
  dimensions?: ProductDimensions
  seoTitle?: string
  seoDescription?: string
  createdAt: string
  updatedAt: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  sku: string
  price?: number
  stock: number
  attributes: VariantAttribute[]
  image?: string
}

export interface VariantAttribute {
  name: string
  value: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  order: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
}

export interface Brand {
  id: string
  name: string
  slug: string
  description?: string
  logo?: string
}

export interface ProductDimensions {
  length: number
  width: number
  height: number
  unit: "cm" | "in"
}

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  tags?: string[]
  sortBy?: "name" | "price" | "createdAt" | "popularity"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}
