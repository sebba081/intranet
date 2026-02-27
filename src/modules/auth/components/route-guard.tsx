"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/modules/auth";

const publicRoutes = ["/login"];

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.includes(pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
      return;
    }

    if (isAuthenticated && pathname === "/login") {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-sm">Cargando...</div>;
  }

  return <>{children}</>;
}
