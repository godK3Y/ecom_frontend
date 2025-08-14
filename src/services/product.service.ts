// src/services/product.service.ts
import { api } from "./api.service";
import type {
  Product,
  ProductFilters,
  Category,
  Brand,
  Image,
  Variant,
} from "@/interfaces/product";

// ----- Backend response types -----
type ProductListResponseBE = {
  products: any[]; // raw backend docs
  total: number;
  page: number;
  totalPages: number;
};

// ----- adapters: backend -> frontend -----
function adaptImages(images: unknown, name: string): Image[] {
  if (!Array.isArray(images)) return [];
  return images.map((url: string, i: number) => ({
    id: String(i + 1),
    url,
    alt: `${name} ${i + 1}`,
    order: i,
  }));
}

function adaptVariants(doc: any): Variant[] {
  // If you model variantCombinations like:
  // [{ combination: { Size: "M", Color: "Black" }, price, stock, sku }]
  if (!Array.isArray(doc?.variantCombinations)) return [];
  return doc.variantCombinations.map((vc: any, i: number) => ({
    id: String(i + 1),
    productId: String(doc._id ?? doc.id ?? ""),
    name: vc?.name ?? Object.values(vc?.combination || {}).join(" / "),
    sku: vc?.sku,
    stock: vc?.stock ?? 0,
    attributes: Object.entries(vc?.combination || {}).map(([n, v]) => ({
      name: n,
      value: String(v),
    })),
  }));
}

function adaptProduct(doc: any): Product {
  return {
    id: String(doc._id ?? doc.id),
    name: doc.name,
    description: doc.description ?? "",
    shortDescription: doc.shortDescription ?? "",
    price: Number(doc.price ?? 0),
    originalPrice:
      doc.originalPrice !== undefined ? Number(doc.originalPrice) : undefined,
    sku: doc.sku ?? undefined,

    // If your backend populates category, map it. If not, keep minimal shape.
    category: doc.category
      ? {
          id: String(doc.category._id ?? doc.category.id ?? ""),
          name: doc.category.name,
          slug: doc.category.slug,
        }
      : doc.categoryId
      ? {
          id: String(doc.categoryId),
          name: "",
          slug: "",
        }
      : undefined,

    // Optional: only if you have brand populated on backend
    brand: doc.brand
      ? {
          id: String(doc.brand._id ?? doc.brand.id ?? ""),
          name: doc.brand.name,
          slug: doc.brand.slug,
        }
      : undefined,

    images: adaptImages(doc.images, doc.name),
    variants: adaptVariants(doc),

    tags: Array.isArray(doc.tags) ? doc.tags : [],
    isActive: doc.isActive ?? true,
    isFeatured: doc.isFeatured ?? false,
    stock: Number(doc.stock ?? 0),
    weight: doc.weight !== undefined ? Number(doc.weight) : undefined,
    dimensions: doc.dimensions ?? undefined,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

function toQuery(filters?: ProductFilters): string {
  if (!filters) return "";
  const p = new URLSearchParams();

  // Backend accepts ObjectId for categoryId. If you only have slug, resolve slug->id before calling.
  if (filters.categoryId) p.set("categoryId", String(filters.categoryId));
  if (filters.minPrice !== undefined)
    p.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    p.set("maxPrice", String(filters.maxPrice));
  if (filters.inStock) p.set("inStock", "true");
  if (filters.sortBy) p.set("sortBy", filters.sortBy);
  if (filters.sortOrder) p.set("sortOrder", filters.sortOrder);
  if (filters.page) p.set("page", String(filters.page));
  if (filters.limit) p.set("limit", String(filters.limit));
  if (filters.search) p.set("search", filters.search);

  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

// ----- service -----
class ProductService {
  // LIST with filters/pagination
  async getProducts(filters?: ProductFilters): Promise<{
    products: Product[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const { data } = await api.get<ProductListResponseBE>(
      `/products${toQuery(filters)}`
    );
    return {
      products: data.products.map(adaptProduct),
      total: data.total,
      page: data.page,
      totalPages: data.totalPages,
    };
  }

  // ONE
  async getProduct(id: string): Promise<Product> {
    const { data } = await api.get<any>(`/products/${id}`);
    return adaptProduct(data);
  }

  // FEATURED
  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await api.get<any[]>(`/products/featured`);
    return data.map(adaptProduct);
  }

  // SEARCH (server-side)
  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await api.get<ProductListResponseBE>(
      `/products?search=${encodeURIComponent(query)}`
    );
    return data.products.map(adaptProduct);
  }

  // CREATE (admin)
  async createProduct(payload: Partial<any>): Promise<Product> {
    const { data } = await api.post<any>(`/products`, payload);
    return adaptProduct(data);
  }

  // UPDATE (admin)
  async updateProduct(id: string, payload: Partial<any>): Promise<Product> {
    const { data } = await api.put<any>(`/products/${id}`, payload);
    return adaptProduct(data);
  }

  // DELETE (admin)
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  // ---- Optional helpers if you have these endpoints set up ----

  async getCategories(): Promise<Category[]> {
    const { data } = await api.get<any[]>(`/categories`);
    return data.map((c) => ({
      id: String(c._id ?? c.id),
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      image: c.image ?? "",
      parentId: c.parentId ? String(c.parentId) : undefined,
    }));
  }

  async getBrands(): Promise<Brand[]> {
    // If/when you implement a backend Brands module:
    // const { data } = await api.get<any[]>(`/brands`);
    // return data.map((b) => ({ id: String(b._id ?? b.id), name: b.name, slug: b.slug, description: b.description ?? "" }));
    // Temporary: return empty list to keep types happy
    return [];
  }
}

export const productService = new ProductService();
