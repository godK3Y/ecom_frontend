import type React from "react";
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md">
        <AuthGuard requireAuth={false}>{children}</AuthGuard>
      </div>
    </div>
  );
}
