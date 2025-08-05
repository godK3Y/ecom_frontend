import { HeroSection } from "@/components/shared/hero-section";
import { FeaturedProducts } from "@/components/product/featured-products";
import { CategoryShowcase } from "@/components/shared/category-showcase";
import { BrandStory } from "@/components/shared/brand-story";
import { NewsletterSignup } from "@/components/shared/newsletter-signup";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedProducts />
      <CategoryShowcase />
      <BrandStory />
      <NewsletterSignup />
    </div>
  );
}
