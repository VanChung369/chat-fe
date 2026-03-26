import { type ReactNode, Suspense } from "react";
import I18nProvider from "@/providers/I18nProvider";

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children }: Props) {
  return (
    <Suspense>
      <I18nProvider>{children}</I18nProvider>
    </Suspense>
  );
}
