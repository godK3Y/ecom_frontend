// src/interfaces/product.ts

export interface Image {
  id: string;
  url: string;
  alt?: string;
  order?: number;
}

export interface VariantAttribute {
  name: string;
  value: string;
}

export interface Variant {
  id: string;
  productId: string;
  name: string;
  sku?: string;
  stock: number;
  attributes: VariantAttribute[];
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  unit: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  sku?: string;
  category?: Category;
  brand?: Brand;
  images: Image[];
  variants: Variant[];
  tags?: string[];
  isActive: boolean;
  isFeatured?: boolean;
  stock: number;
  weight?: number;
  dimensions?: Dimensions;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilters {
  categoryId?: string; // Backend expects ObjectId string
  category?: string; // Slug (if filtering on frontend before mapping to ID)
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sortBy?: "price" | "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
}
