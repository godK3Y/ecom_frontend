"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

import {
  categoriesService,
  type Audience,
} from "@/services/categories.service";

// UI-friendly type: tree nodes plus optional fields your UI references
type UICategory = Awaited<
  ReturnType<typeof categoriesService.getCategoryTree>
>[number] & {
  image?: string;
  description?: string;
};

export function CategoriesGrid({ audience }: { audience?: Audience } = {}) {
  const [categories, setCategories] = useState<UICategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await categoriesService.getCategoryTree(audience);
        // If your API doesn't return image/description, leave them undefined
        setCategories(data as UICategory[]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [audience]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="aspect-square w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => {
        const fallback = `/placeholder.svg?height=300&width=300&text=${encodeURIComponent(
          category.name
        )}`;
        const imgSrc = category.image ?? fallback;

        return (
          <Link key={category._id} href={`/products?category=${category.slug}`}>
            <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                  src={imgSrc}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={false}
                />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  {category.children && category.children.length > 0 && (
                    <Badge variant="secondary">
                      {category.children.length} subcategories
                    </Badge>
                  )}
                </div>

                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {category.description}
                  </p>
                )}

                {category.children && category.children.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {category.children.slice(0, 3).map((child) => (
                      <Badge
                        key={child._id}
                        variant="outline"
                        className="text-xs"
                      >
                        {child.name}
                      </Badge>
                    ))}
                    {category.children.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.children.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
