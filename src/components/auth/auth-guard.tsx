"use client";

import type React from "react";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Spinner } from "@/components/shared/spinner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRole?: "customer" | "admin" | "seller";
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  requiredRole,
  redirectTo = "/login",
}: AuthGuardProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (!requireAuth && isAuthenticated) {
      router.push("/");
      return;
    }

    if (requiredRole && user?.role !== requiredRole) {
      router.push("/");
      return;
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    requireAuth,
    requiredRole,
    router,
    redirectTo,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
