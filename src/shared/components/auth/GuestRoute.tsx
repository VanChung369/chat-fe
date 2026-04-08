"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { AppRoutes } from "@/shared/constants";
import { Loading } from "@/shared/components/loading";
import { useAuthCtx } from "@/providers/AuthProvider";

interface GuestRouteProps {
  children: React.ReactNode;
}

/**
 * GuestRoute prevents authenticated users from seeing landing or auth pages (login, register).
 * Redirects to the home page if already authenticated.
 */
export const GuestRoute = ({ children }: GuestRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    // If not loading and already authenticated, redirect to home
    if (!isLoading && isAuthenticated) {
      router.push(AppRoutes.home);
    }
  }, [isAuthenticated, isLoading, router]);

  if (user === undefined || isLoading || isAuthenticated) {
    return <Loading fullscreen size="md" />;
  }

  return <>{children}</>;
};
