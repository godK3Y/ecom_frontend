"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { useAuth } from "@/hooks/useAuth"
import { formatPrice } from "@/lib/format"
import { ShoppingBag, Tag } from "lucide-react"
import { useState } from "react"

export function CartSummary() {
  const { subtotal, tax, shipping, discount, total, currency } = useCart()
  const { isAuthenticated } = useAuth()
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return

    setIsApplyingCoupon(true)
    try {
      // Apply coupon logic here
      console.log("Applying coupon:", couponCode)
    } catch (error) {
      console.error("Failed to apply coupon:", error)
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Order Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Coupon Code */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Promo Code</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isApplyingCoupon}
            >
              <Tag className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal, currency)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping > 0 ? formatPrice(shipping, currency) : "Free"}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(tax, currency)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>Discount</span>
              <span>-{formatPrice(discount, currency)}</span>
            </div>
          )}
        </div>

        <Separator />

        {/* Total */}
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatPrice(total, currency)}</span>
        </div>

        {/* Checkout Button */}
        <div className="space-y-2">
          {isAuthenticated ? (
            <Button size="lg" className="w-full" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          ) : (
            <div className="space-y-2">
              <Button size="lg" className="w-full" asChild>
                <Link href="/login?redirect=/checkout">Sign In to Checkout</Link>
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Or{" "}
                <Link href="/checkout" className="text-primary hover:underline">
                  checkout as guest
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Continue Shopping */}
        <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>

        {/* Security Notice */}
        <div className="text-xs text-center text-muted-foreground">
          <p>🔒 Secure checkout with SSL encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
