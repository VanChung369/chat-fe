import { type ReactNode } from "react";
import I18nProvider from "@/providers/I18nProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthProvider";
import { SWRConfig } from "swr";

type AppWithProvidersProps = {
  children: ReactNode;
};

const AppWithProviders = ({ children }: AppWithProvidersProps) => {
  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        shouldRetryOnError: (error: unknown) => {
          // Don't retry on 4xx client errors — only retry on network/server issues
          const status =
            error !== null && typeof error === "object" && "status" in error
              ? (error as { status: number }).status
              : null;
          return status === null || status >= 500;
        },
      }}
    >
      <I18nProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </I18nProvider>
    </SWRConfig>
  );
};

export default AppWithProviders;
