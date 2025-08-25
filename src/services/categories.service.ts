// src/services/categories.service.ts
import type { Category } from "../interfaces/categories";
import { api } from "./api.service";

export type Audience = "men" | "women" | "kids" | "baby" | "unisex";

// If /categories/tree returns nested nodes:
export interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[];
}

export interface CreateCategoryPayload {
  name: string;
  slug: string;
  parentId?: string | null;
  order?: number;
  audiences?: Audience[];
  path?: string;
  ancestors?: string[]; // include only if your backend accepts it
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

class CategoriesService {
  /** GET /categories?audience=men */
  async getAllCategories(audience?: Audience): Promise<Category[]> {
    const { data } = await api.get<Category[]>("/categories", {
      params: { audience },
    });
    return data;
  }

  /** GET /categories/:id */
  async getCategoryById(id: string): Promise<Category> {
    const { data } = await api.get<Category>(`/categories/${id}`);
    return data;
  }

  /** GET /categories/tree?audience=men */
  async getCategoryTree(audience?: Audience): Promise<CategoryTreeNode[]> {
    const { data } = await api.get<CategoryTreeNode[]>("/categories/tree", {
      params: { audience },
    });
    return data;
  }

  /** POST /categories */
  async createCategory(payload: CreateCategoryPayload): Promise<Category> {
    const { data } = await api.post<Category>("/categories", payload);
    return data;
  }

  /** POST /categories/bulk */
  async createManyCategories(
    payloads: CreateCategoryPayload[]
  ): Promise<Category[]> {
    const { data } = await api.post<Category[]>("/categories/bulk", payloads);
    return data;
  }

  /** PUT /categories/:id */
  async updateCategory(
    id: string,
    payload: UpdateCategoryPayload
  ): Promise<Category> {
    const { data } = await api.put<Category>(`/categories/${id}`, payload);
    return data;
  }

  /** DELETE /categories/:id */
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  }
}

export const categoriesService = new CategoriesService();
