"use client";

import { useRouter } from "@/i18n/navigation";
import { useEffect } from "react";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import { Loading } from "@/shared/components/loading";
import { useAuthCtx } from "@/providers/AuthProvider";

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

/**
 * AuthenticatedRoute wraps protected pages and redirects unauthenticated users to the login page.
 */
export const AuthenticatedRoute = ({ children }: AuthenticatedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthCtx();
  const router = useRouter();

  useEffect(() => {
    if (user === null && !isLoading && !isAuthenticated) {
      router.push(pathWithQuery(AppRoutes.login, { reauth: "true" }));
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (user === undefined || isLoading) {
    return <Loading fullscreen size="md" />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
