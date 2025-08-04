import type React from "react"
import { SellerSidebar } from "@/components/seller/seller-sidebar"
import { SellerHeader } from "@/components/seller/seller-header"
import { AuthGuard } from "@/components/auth/auth-guard"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard requireAuth={true} requiredRole="seller">
      <SidebarProvider>
        <div className="flex min-h-screen">
          <SellerSidebar />
          <div className="flex-1 flex flex-col">
            <SellerHeader />
            <main className="flex-1 p-6 bg-slate-50 dark:bg-slate-900/50">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthGuard>
  )
}
