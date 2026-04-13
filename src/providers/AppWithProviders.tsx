import { type ReactNode } from "react";
import I18nProvider from "@/providers/I18nProvider";
import { Toaster } from "sonner";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
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
      <ThemeProvider>
        <I18nProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" richColors />
          </AuthProvider>
        </I18nProvider>{" "}
      </ThemeProvider>
    </SWRConfig>
  );
};

export default AppWithProviders;
