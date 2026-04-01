import { useEffect } from "react";
import { authApi } from "@/features/auth/api/auth-api";
import { useAuthCtx } from "@/providers/AuthProvider";

/**
 * useAuth hook that provides user data and handles the initial authentication check.
 * This hook is meant to be used within an AuthProvider.
 */
export function useAuth() {
  const { user, updateAuthUser, isLoading, setIsLoading, isAuthenticated } = useAuthCtx();

  useEffect(() => {
    if (user !== undefined || isLoading) return;

    const controller = new AbortController();

    async function fetchMe() {
      setIsLoading(true);
      try {
        const data = await authApi.getMe({
          signal: controller.signal,
        });
        updateAuthUser(data);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Auth check failed:", err);
          updateAuthUser(null);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMe();

    return () => controller.abort();
  }, []);

  return {
    user,
    isAuthenticated,
    updateAuthUser,
    isLoading,
    setIsLoading,
  };
}
