import Link from "next/link"

const categories = [
  {
    name: "Men's Collection",
    href: "/products?category=men",
    image: "/placeholder.svg?height=500&width=400",
    description: "Timeless pieces for the modern gentleman",
  },
  {
    name: "Women's Collection",
    href: "/products?category=women",
    image: "/placeholder.svg?height=500&width=400",
    description: "Elegant designs for every occasion",
  },
  {
    name: "Kids & Family",
    href: "/products?category=kids",
    image: "/placeholder.svg?height=500&width=400",
    description: "Comfortable and playful styles",
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections designed for every lifestyle and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-white/90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
