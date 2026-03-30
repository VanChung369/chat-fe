import type { ReactNode } from "react";
import I18nProvider from "@/providers/I18nProvider";
import { Toaster } from "sonner";

type AppWithProvidersProps = {
  children: ReactNode;
};

const AppWithProviders = ({ children }: AppWithProvidersProps) => {
  return (
    <I18nProvider>
      {children}
      <Toaster position="top-center" richColors />
    </I18nProvider>
  );
};

export default AppWithProviders;
