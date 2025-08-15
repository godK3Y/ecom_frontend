// src/services/product.service.ts
import { api } from "./api.service";
import type {
  Product,
  ProductFilters,
  Category,
  Image,
  Variant,
} from "@/interfaces/product";

/** ===== Backend response/DTO types ===== */

type ObjectIdString = string;

type VariantCombinationBE = {
  combination?: Record<string, string | number | boolean>;
  price?: number;
  stock?: number;
  sku?: string;
  name?: string;
};

type CategoryBE = {
  _id: ObjectIdString;
  name: string;
  slug: string;
  parentId?: ObjectIdString | null;
  description?: string;
  image?: string;
};

type ProductBE = {
  _id: ObjectIdString;
  name: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  originalPrice?: number;
  sku?: string;
  category?: CategoryBE; // if populated
  categoryId?: ObjectIdString; // if only reference
  images?: string[];
  variantCombinations?: VariantCombinationBE[];
  tags?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  stock?: number;
  weight?: number;
  dimensions?: Product["dimensions"];
  createdAt?: string;
  updatedAt?: string;
};

type ProductListResponseBE = {
  products: ProductBE[];
  total: number;
  page: number;
  totalPages: number;
};

/** ===== adapters: backend -> frontend ===== */

function adaptImages(images: string[] | undefined, name: string): Image[] {
  if (!Array.isArray(images)) return [];
  return images.map((url, i) => ({
    id: String(i + 1),
    url,
    alt: `${name} ${i + 1}`,
    order: i,
  }));
}

function adaptVariants(doc: ProductBE): Variant[] {
  const list = doc.variantCombinations;
  if (!Array.isArray(list)) return [];
  return list.map((vc, i) => ({
    id: String(i + 1),
    productId: String(doc._id),
    name: vc?.name ?? Object.values(vc?.combination ?? {}).join(" / "),
    sku: vc?.sku,
    stock: vc?.stock ?? 0,
    attributes: Object.entries(vc?.combination ?? {}).map(([n, v]) => ({
      name: n,
      value: String(v),
    })),
  }));
}

function adaptProduct(doc: ProductBE): Product {
  const populatedCategory = doc.category?.slug ? doc.category : undefined;

  return {
    id: String(doc._id),
    name: doc.name,
    description: doc.description ?? "",
    shortDescription: doc.shortDescription ?? "",
    price: Number(doc.price ?? 0),
    originalPrice:
      doc.originalPrice !== undefined ? Number(doc.originalPrice) : undefined,
    sku: doc.sku ?? undefined,

    category: populatedCategory
      ? {
          id: String(populatedCategory._id),
          name: populatedCategory.name,
          slug: populatedCategory.slug,
          description: populatedCategory.description ?? "",
          image: populatedCategory.image ?? "",
          parentId:
            populatedCategory.parentId !== undefined &&
            populatedCategory.parentId !== null
              ? String(populatedCategory.parentId)
              : undefined,
        }
      : doc.categoryId
      ? {
          id: String(doc.categoryId),
          name: "",
          slug: "",
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
    createdAt: doc.createdAt ?? new Date(0).toISOString(),
    updatedAt: doc.updatedAt ?? new Date(0).toISOString(),
  };
}

function toQuery(filters?: ProductFilters): string {
  if (!filters) return "";
  const p = new URLSearchParams();

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

/** ===== service ===== */

class ProductService {
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

  async getProduct(id: string): Promise<Product> {
    const { data } = await api.get<ProductBE>(`/products/${id}`);
    return adaptProduct(data);
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const { data } = await api.get<ProductBE[]>(`/products/featured`);
    return data.map(adaptProduct);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await api.get<ProductListResponseBE>(
      `/products?search=${encodeURIComponent(query)}`
    );
    return data.products.map(adaptProduct);
  }

  async createProduct(payload: Partial<ProductBE>): Promise<Product> {
    const { data } = await api.post<ProductBE>(`/products`, payload);
    return adaptProduct(data);
  }

  async updateProduct(
    id: string,
    payload: Partial<ProductBE>
  ): Promise<Product> {
    const { data } = await api.put<ProductBE>(`/products/${id}`, payload);
    return adaptProduct(data);
  }

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  }

  async getCategories(): Promise<Category[]> {
    const { data } = await api.get<CategoryBE[]>(`/categories`);
    return data.map((c) => ({
      id: String(c._id),
      name: c.name,
      slug: c.slug,
      description: c.description ?? "",
      image: c.image ?? "",
      parentId: c.parentId ? String(c.parentId) : undefined,
    }));
  }
}

export const productService = new ProductService();
