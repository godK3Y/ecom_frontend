import { CategoriesGrid } from "@/components/product/categories-grid";
import { CategoryFilters } from "@/components/product/category-filters";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CategoriesPage() {
  return (
    <div className="  px-24 py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Categories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Shop by Category
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Discover our carefully curated collections designed for every
          lifestyle and occasion. From timeless classics to contemporary trends.
        </p>
      </div>

      {/* Filters */}
      <CategoryFilters />

      {/* Categories Grid */}
      <CategoriesGrid />
    </div>
  );
}
