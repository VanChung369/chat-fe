"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { User } from "@/shared/types/user";

interface AuthContextType {
  user?: User | null | undefined;
  updateAuthUser: (data: User | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  updateAuthUser: () => {},
  isAuthenticated: false,
  isLoading: false,
  setIsLoading: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const updateAuthUser = (data: User | null) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        updateAuthUser,
        isAuthenticated: !!user,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
