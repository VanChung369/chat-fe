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
        shouldRetryOnError: false,
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
