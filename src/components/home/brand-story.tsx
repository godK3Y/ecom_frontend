import { Truck, Shield, Recycle, Award } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every product is crafted with meticulous attention to detail and the finest materials.",
  },
  {
    icon: Truck,
    title: "Fast & Free Shipping",
    description:
      "Complimentary shipping on all orders with express delivery options available.",
  },
  {
    icon: Shield,
    title: "Secure Shopping",
    description:
      "Your privacy and security are our top priorities with encrypted transactions.",
  },
  {
    icon: Recycle,
    title: "Sustainable Practices",
    description:
      "Committed to environmental responsibility through sustainable sourcing and packaging.",
  },
];

export function BrandStory() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Crafted for the
                <span className="block text-primary">Modern Lifestyle</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                At KeyCommerce, we believe that exceptional style shouldn&apos;t
                compromise on comfort or sustainability. Our collections are
                thoughtfully designed to elevate your everyday moments while
                respecting our planet.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src="/placeholder.svg?height=600&width=600"
                alt="Our sustainable approach to fashion"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-primary/5 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
