"use client";

import { createContext, useContext, type ReactNode } from "react";
import useSWR from "swr";
import { authApi } from "@/features/auth/api/auth-api";
import { AUTH_USER_CACHE_KEY } from "@/shared/constants";
import type { User } from "@/shared/types/user";

interface AuthContextType {
  user?: User | null;
  updateAuthUser: (data: User | null) => void;
  refreshAuthUser: () => Promise<User | null | undefined>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, mutate } = useSWR<User | null>(
    AUTH_USER_CACHE_KEY,
    async () => {
      try {
        return await authApi.getMe();
      } catch {
        return null;
      }
    }
  );

  const updateAuthUser = (data: User | null) => {
    void mutate(data, false);
  };

  const refreshAuthUser = () => mutate();

  return (
    <AuthContext.Provider
      value={{
        user: data,
        updateAuthUser,
        refreshAuthUser,
        isAuthenticated: !!data,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthCtx must be used within an AuthProvider");
  }
  return context;
};
