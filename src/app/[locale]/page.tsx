import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("HomePage");

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-start justify-center gap-4 px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="text-base text-zinc-600">{t("description")}</p>
      <div className="mt-2 flex items-center gap-3 text-sm">
        <span className="font-medium text-zinc-700">{t("languageLabel")}:</span>
        <Link
          className="rounded-full border border-zinc-300 px-3 py-1 hover:bg-zinc-100"
          href="/"
          locale="en"
        >
          {t("english")}
        </Link>
        <Link
          className="rounded-full border border-zinc-300 px-3 py-1 hover:bg-zinc-100"
          href="/"
          locale="vi"
        >
          {t("vietnamese")}
        </Link>
      </div>
    </main>
  );
}
