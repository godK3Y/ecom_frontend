import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingBag } from "lucide-react"

export function EmptyCart() {
  return (
    <Card className="text-center py-12">
      <CardContent className="space-y-6">
        <div className="flex justify-center">
          <div className="h-24 w-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/categories">Browse Categories</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
