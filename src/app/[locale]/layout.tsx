import I18nProvider from "@/providers/I18nProvider";
import { Suspense } from "react";

export default function LocaleLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <I18nProvider>{children}</I18nProvider>
    </Suspense>
  );
}
