import type { Product, ProductFilters, Category, Brand } from "@/interfaces/product"

interface ProductListResponse {
  products: Product[]
  total: number
  page: number
  totalPages: number
}

class ProductService {
  // Mock data for demo purposes
  private mockProducts: Product[] = [
    {
      id: "1",
      name: "Premium Cotton T-Shirt",
      description:
        "Experience ultimate comfort with our premium cotton t-shirt. Crafted from 100% organic cotton, this versatile piece features a classic fit that's perfect for everyday wear. The soft, breathable fabric ensures all-day comfort while maintaining its shape wash after wash.",
      shortDescription: "Classic fit organic cotton t-shirt with superior comfort and durability",
      price: 89,
      originalPrice: 120,
      sku: "PCT-001",
      category: { id: "1", name: "T-Shirts", slug: "t-shirts" },
      brand: { id: "1", name: "KeyCommerce", slug: "keycommerce" },
      images: [
        {
          id: "1",
          url: "/placeholder.svg?height=600&width=600&text=T-Shirt+Front",
          alt: "T-Shirt Front View",
          order: 0,
        },
        { id: "2", url: "/placeholder.svg?height=600&width=600&text=T-Shirt+Back", alt: "T-Shirt Back View", order: 1 },
        { id: "3", url: "/placeholder.svg?height=600&width=600&text=T-Shirt+Side", alt: "T-Shirt Side View", order: 2 },
      ],
      variants: [
        {
          id: "1",
          productId: "1",
          name: "Small",
          sku: "PCT-001-S",
          stock: 15,
          attributes: [{ name: "Size", value: "S" }],
        },
        {
          id: "2",
          productId: "1",
          name: "Medium",
          sku: "PCT-001-M",
          stock: 20,
          attributes: [{ name: "Size", value: "M" }],
        },
        {
          id: "3",
          productId: "1",
          name: "Large",
          sku: "PCT-001-L",
          stock: 10,
          attributes: [{ name: "Size", value: "L" }],
        },
      ],
      tags: ["organic", "cotton", "casual", "everyday"],
      isActive: true,
      isFeatured: true,
      stock: 45,
      weight: 200,
      dimensions: { length: 70, width: 50, height: 2, unit: "cm" },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "2",
      name: "Minimalist Sneakers",
      description:
        "Step into style with our minimalist sneakers. These versatile shoes combine modern design with exceptional comfort, featuring a clean silhouette that pairs perfectly with any outfit. The premium materials and attention to detail make these sneakers a wardrobe essential.",
      shortDescription: "Modern minimalist sneakers with premium materials and all-day comfort",
      price: 159,
      sku: "MS-002",
      category: { id: "2", name: "Footwear", slug: "footwear" },
      brand: { id: "1", name: "KeyCommerce", slug: "keycommerce" },
      images: [
        {
          id: "4",
          url: "/placeholder.svg?height=600&width=600&text=Sneakers+Side",
          alt: "Sneakers Side View",
          order: 0,
        },
        { id: "5", url: "/placeholder.svg?height=600&width=600&text=Sneakers+Top", alt: "Sneakers Top View", order: 1 },
      ],
      variants: [
        {
          id: "4",
          productId: "2",
          name: "US 8",
          sku: "MS-002-8",
          stock: 5,
          attributes: [{ name: "Size", value: "US 8" }],
        },
        {
          id: "5",
          productId: "2",
          name: "US 9",
          sku: "MS-002-9",
          stock: 8,
          attributes: [{ name: "Size", value: "US 9" }],
        },
        {
          id: "6",
          productId: "2",
          name: "US 10",
          sku: "MS-002-10",
          stock: 12,
          attributes: [{ name: "Size", value: "US 10" }],
        },
      ],
      tags: ["sneakers", "minimalist", "comfortable", "versatile"],
      isActive: true,
      isFeatured: true,
      stock: 25,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "3",
      name: "Tailored Blazer",
      description:
        "Elevate your professional wardrobe with our tailored blazer. This sophisticated piece features a modern cut that flatters all body types while maintaining the classic elegance of traditional tailoring. Perfect for business meetings, special occasions, or elevating your everyday look.",
      shortDescription: "Modern tailored blazer with classic elegance and contemporary fit",
      price: 299,
      originalPrice: 399,
      sku: "TB-003",
      category: { id: "3", name: "Outerwear", slug: "outerwear" },
      brand: { id: "1", name: "KeyCommerce", slug: "keycommerce" },
      images: [
        { id: "6", url: "/placeholder.svg?height=600&width=600&text=Blazer+Front", alt: "Blazer Front View", order: 0 },
        { id: "7", url: "/placeholder.svg?height=600&width=600&text=Blazer+Back", alt: "Blazer Back View", order: 1 },
      ],
      variants: [
        {
          id: "7",
          productId: "3",
          name: "Small",
          sku: "TB-003-S",
          stock: 3,
          attributes: [{ name: "Size", value: "S" }],
        },
        {
          id: "8",
          productId: "3",
          name: "Medium",
          sku: "TB-003-M",
          stock: 7,
          attributes: [{ name: "Size", value: "M" }],
        },
        {
          id: "9",
          productId: "3",
          name: "Large",
          sku: "TB-003-L",
          stock: 5,
          attributes: [{ name: "Size", value: "L" }],
        },
      ],
      tags: ["blazer", "formal", "professional", "tailored"],
      isActive: true,
      isFeatured: true,
      stock: 15,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    {
      id: "4",
      name: "Organic Denim Jeans",
      description:
        "Discover the perfect blend of style and sustainability with our organic denim jeans. Made from 100% organic cotton denim, these jeans offer exceptional comfort and durability while being environmentally conscious. The classic cut and premium finish make them a versatile addition to any wardrobe.",
      shortDescription: "Sustainable organic cotton denim with classic fit and premium quality",
      price: 129,
      sku: "ODJ-004",
      category: { id: "4", name: "Denim", slug: "denim" },
      brand: { id: "1", name: "KeyCommerce", slug: "keycommerce" },
      images: [
        { id: "8", url: "/placeholder.svg?height=600&width=600&text=Jeans+Front", alt: "Jeans Front View", order: 0 },
        { id: "9", url: "/placeholder.svg?height=600&width=600&text=Jeans+Back", alt: "Jeans Back View", order: 1 },
      ],
      variants: [
        {
          id: "10",
          productId: "4",
          name: "30x32",
          sku: "ODJ-004-30x32",
          stock: 8,
          attributes: [
            { name: "Waist", value: "30" },
            { name: "Length", value: "32" },
          ],
        },
        {
          id: "11",
          productId: "4",
          name: "32x32",
          sku: "ODJ-004-32x32",
          stock: 12,
          attributes: [
            { name: "Waist", value: "32" },
            { name: "Length", value: "32" },
          ],
        },
        {
          id: "12",
          productId: "4",
          name: "34x32",
          sku: "ODJ-004-34x32",
          stock: 6,
          attributes: [
            { name: "Waist", value: "34" },
            { name: "Length", value: "32" },
          ],
        },
      ],
      tags: ["denim", "organic", "sustainable", "classic"],
      isActive: true,
      isFeatured: true,
      stock: 26,
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  ]

  private mockCategories: Category[] = [
    {
      id: "1",
      name: "T-Shirts",
      slug: "t-shirts",
      description: "Comfortable and stylish t-shirts for everyday wear",
      image: "/placeholder.svg?height=300&width=300&text=T-Shirts",
    },
    {
      id: "2",
      name: "Footwear",
      slug: "footwear",
      description: "Premium shoes and sneakers for every occasion",
      image: "/placeholder.svg?height=300&width=300&text=Footwear",
    },
    {
      id: "3",
      name: "Outerwear",
      slug: "outerwear",
      description: "Jackets, blazers, and coats for all seasons",
      image: "/placeholder.svg?height=300&width=300&text=Outerwear",
    },
    {
      id: "4",
      name: "Denim",
      slug: "denim",
      description: "High-quality jeans and denim wear",
      image: "/placeholder.svg?height=300&width=300&text=Denim",
    },
  ]

  private mockBrands: Brand[] = [
    { id: "1", name: "KeyCommerce", slug: "keycommerce", description: "Premium fashion and lifestyle brand" },
    { id: "2", name: "Urban Style", slug: "urban-style", description: "Contemporary urban fashion" },
    { id: "3", name: "Classic Wear", slug: "classic-wear", description: "Timeless and elegant clothing" },
  ]

  async getProducts(filters?: ProductFilters): Promise<ProductListResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    let filteredProducts = [...this.mockProducts]

    // Apply filters
    if (filters?.category) {
      filteredProducts = filteredProducts.filter((p) => p.category.slug === filters.category)
    }

    if (filters?.minPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price >= filters.minPrice!)
    }

    if (filters?.maxPrice) {
      filteredProducts = filteredProducts.filter((p) => p.price <= filters.maxPrice!)
    }

    if (filters?.inStock) {
      filteredProducts = filteredProducts.filter((p) => p.stock > 0)
    }

    // Apply sorting
    if (filters?.sortBy) {
      filteredProducts.sort((a, b) => {
        const order = filters.sortOrder === "desc" ? -1 : 1
        switch (filters.sortBy) {
          case "price":
            return (a.price - b.price) * order
          case "name":
            return a.name.localeCompare(b.name) * order
          case "createdAt":
            return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order
          default:
            return 0
        }
      })
    }

    // Apply pagination
    const page = filters?.page || 1
    const limit = filters?.limit || 12
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex)

    return {
      products: paginatedProducts,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
    }
  }

  async getProduct(id: string): Promise<Product> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const product = this.mockProducts.find((p) => p.id === id)
    if (!product) {
      throw new Error(`Product with id ${id} not found`)
    }
    return product
  }

  async getFeaturedProducts(): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.mockProducts.filter((p) => p.isFeatured)
  }

  async getCategories(): Promise<Category[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.mockCategories
  }

  async getBrands(): Promise<Brand[]> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return this.mockBrands
  }

  async searchProducts(query: string): Promise<Product[]> {
    await new Promise((resolve) => setTimeout(resolve, 300))
    return this.mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
    )
  }
}

export const productService = new ProductService()
