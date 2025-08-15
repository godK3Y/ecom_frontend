// app/(shop)/products/[id]/page.tsx
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductTabs } from "@/components/product/product-tabs";
import { RelatedProducts } from "@/components/product/related-products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { productService } from "@/services/product.service";
import { notFound } from "next/navigation";

type ProductPageProps = {
  // <-- params is a Promise in your runtime
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const { id } = await params; // <-- await params
    const product = await productService.getProduct(id);

    const hasCategory = !!product.category?.id;

    return (
      <div className="px-24 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            {hasCategory && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/products?category=${product.category!.slug}`}
                  >
                    {product.category!.name || "Category"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </>
            )}
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          <ProductGallery product={product} />
          <ProductInfo product={product} />
        </div>

        {/* Product Information Tabs */}
        <ProductTabs product={product} />

        {/* Related Products */}
        {hasCategory && (
          <RelatedProducts
            categoryId={product.category!.id}
            currentProductId={product.id}
          />
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
