import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppWithProviders from "@/providers/AppWithProviders";
import { isValidLocale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import "../../styles/globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body className="min-h-full">
        <Suspense>
          <AppWithProviders>{children}</AppWithProviders>
        </Suspense>
      </body>
    </html>
  );
}
