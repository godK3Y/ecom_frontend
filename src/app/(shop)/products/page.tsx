import { ProductsGrid } from "@/components/product/products-grid"
import { ProductFilters } from "@/components/product/product-filters"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ProductsPageProps {
  searchParams: {
    category?: string
    brand?: string
    minPrice?: string
    maxPrice?: string
    sortBy?: string
    page?: string
  }
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <div className="container px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          {searchParams.category ? `${searchParams.category} Collection` : "All Products"}
        </h1>
        <p className="text-muted-foreground">
          Discover our complete collection of premium fashion and lifestyle products.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          <ProductsGrid searchParams={searchParams} />
        </main>
      </div>
    </div>
  )
}
