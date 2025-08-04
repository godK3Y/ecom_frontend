"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatPrice, formatDate } from "@/lib/format"
import { Eye, Package, Truck } from "lucide-react"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    orderNumber: "KC-2024-001",
    status: "delivered" as const,
    total: 299,
    currency: "USD",
    createdAt: "2024-01-15T10:30:00Z",
    items: [
      {
        id: "1",
        name: "Premium Cotton T-Shirt",
        quantity: 2,
        price: 89,
        image: "/placeholder.svg?height=60&width=60&text=T-Shirt",
      },
      {
        id: "2",
        name: "Tailored Blazer",
        quantity: 1,
        price: 299,
        image: "/placeholder.svg?height=60&width=60&text=Blazer",
      },
    ],
  },
  {
    id: "ORD-002",
    orderNumber: "KC-2024-002",
    status: "shipped" as const,
    total: 159,
    currency: "USD",
    createdAt: "2024-01-20T14:15:00Z",
    items: [
      {
        id: "3",
        name: "Minimalist Sneakers",
        quantity: 1,
        price: 159,
        image: "/placeholder.svg?height=60&width=60&text=Sneakers",
      },
    ],
  },
  {
    id: "ORD-003",
    orderNumber: "KC-2024-003",
    status: "processing" as const,
    total: 129,
    currency: "USD",
    createdAt: "2024-01-25T09:45:00Z",
    items: [
      {
        id: "4",
        name: "Organic Denim Jeans",
        quantity: 1,
        price: 129,
        image: "/placeholder.svg?height=60&width=60&text=Jeans",
      },
    ],
  },
]

const statusConfig = {
  pending: { label: "Pending", variant: "secondary" as const, icon: Package },
  confirmed: { label: "Confirmed", variant: "default" as const, icon: Package },
  processing: { label: "Processing", variant: "default" as const, icon: Package },
  shipped: { label: "Shipped", variant: "default" as const, icon: Truck },
  delivered: { label: "Delivered", variant: "default" as const, icon: Package },
  cancelled: { label: "Cancelled", variant: "destructive" as const, icon: Package },
}

export function ProfileOrders() {
  const [orders, setOrders] = useState(mockOrders)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="flex gap-3">
                    <Skeleton className="h-12 w-12 rounded" />
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Package className="h-12 w-12 text-muted-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">No orders yet</h3>
            <p className="text-muted-foreground">When you place your first order, it will appear here.</p>
          </div>
          <Button asChild>
            <Link href="/products">Start Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Order History</h2>
        <p className="text-sm text-muted-foreground">{orders.length} orders</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusInfo = statusConfig[order.status]
          const StatusIcon = statusInfo.icon

          return (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-base">Order {order.orderNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">Placed on {formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {statusInfo.label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="h-12 w-12 rounded-md object-cover bg-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Total and Actions */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Total: </span>
                    <span className="font-semibold">{formatPrice(order.total, order.currency)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Link>
                    </Button>
                    {order.status === "delivered" && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
