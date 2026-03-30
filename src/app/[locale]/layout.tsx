import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import AppWithProviders from "@/providers/AppWithProviders";
import { isValidLocale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../../styles/globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chat App",
  description: "Focused, professional chat experience",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${beVietnamPro.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="font-display min-h-full antialiased">
        <Suspense>
          <AppWithProviders>{children}</AppWithProviders>
        </Suspense>
      </body>
    </html>
  );
}
