import type { ReactNode } from "react";
import I18nProvider from "@/providers/I18nProvider";

type AppWithProvidersProps = {
  children: ReactNode;
};

const AppWithProviders = ({ children }: AppWithProvidersProps) => {
  return <I18nProvider>{children}</I18nProvider>;
};

export default AppWithProviders;
