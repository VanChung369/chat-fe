import type { ReactNode } from "react";
import { isValidLocale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

const I18nProvider = async ({ children }: { children: ReactNode }) => {
  const locale = await getLocale();

  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};

export default I18nProvider;
