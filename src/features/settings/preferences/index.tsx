"use client";

import { type AppLocale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type ThemePreference } from "@/shared/types";
import { cn } from "@/shared/utils";
import { Check, Globe2, Laptop, MoonStar, Sparkles, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState, useTransition, type ReactNode } from "react";
import { toast } from "sonner";

type OptionCardProps = {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
  icon: ReactNode;
  disabled?: boolean;
};

function OptionCard({ active, title, description, onClick, icon, disabled }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all",
        active
          ? "border-primary bg-primary/5 shadow-primary/10 shadow-lg"
          : "hover:border-primary/40 hover:bg-white dark:hover:bg-slate-950/40",
        disabled ? "cursor-not-allowed opacity-60" : ""
      )}
    >
      <span className="bg-primary/10 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">{title}</span>
          {active ? <Check className="text-primary h-4 w-4 shrink-0" /> : null}
        </span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark mt-1 block text-sm leading-6">
          {description}
        </span>
      </span>
    </button>
  );
}

export function SettingsPreferencesFeature() {
  const t = useTranslations("SettingsPreferences");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isLocalePending, startLocaleTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const themePreference = (theme ?? "dark") as ThemePreference;
  const activeResolvedTheme = resolvedTheme === "light" ? "light" : "dark";

  const languageOptions = useMemo(
    () => [
      {
        value: "en" as const,
        title: t("language.options.en"),
        description: t("language.options.enDescription"),
      },
      {
        value: "vi" as const,
        title: t("language.options.vi"),
        description: t("language.options.viDescription"),
      },
    ],
    [t]
  );

  const appearanceOptions = useMemo(
    () => [
      {
        value: "system" as const satisfies ThemePreference,
        title: t("appearance.options.system"),
        description: t("appearance.options.systemDescription"),
        icon: <Laptop className="h-5 w-5" />,
      },
      {
        value: "light" as const satisfies ThemePreference,
        title: t("appearance.options.light"),
        description: t("appearance.options.lightDescription"),
        icon: <SunMedium className="h-5 w-5" />,
      },
      {
        value: "dark" as const satisfies ThemePreference,
        title: t("appearance.options.dark"),
        description: t("appearance.options.darkDescription"),
        icon: <MoonStar className="h-5 w-5" />,
      },
    ],
    [t]
  );

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale || isLocalePending) {
      return;
    }

    const nextLocaleLabel =
      nextLocale === "vi" ? t("language.options.vi") : t("language.options.en");

    startLocaleTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });

    toast.success(t("toasts.languageUpdated", { language: nextLocaleLabel }));
  };

  const handleThemeChange = (nextTheme: ThemePreference) => {
    if (nextTheme === themePreference) {
      return;
    }

    const nextThemeLabel = t(`appearance.options.${nextTheme}`);
    setTheme(nextTheme);
    toast.success(t("toasts.appearanceUpdated", { appearance: nextThemeLabel }));
  };

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <div
          className={cn(
            "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark w-full overflow-hidden rounded-2xl border shadow-sm"
          )}
        >
          <div className="border-border-light dark:border-border-dark border-b px-5 py-6 md:px-8">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-semibold uppercase tracking-[0.22em]">
              {t("eyebrow")}
            </p>
            <div className="mt-3 flex items-start gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("title")}</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-sm leading-6">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-5 py-6 md:px-8 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  <Globe2 className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">{t("language.title")}</h2>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-6">
                  {t("language.description")}
                </p>
              </div>

              <div className="space-y-3">
                {languageOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    active={locale === option.value}
                    title={option.title}
                    description={option.description}
                    disabled={isLocalePending}
                    onClick={() => handleLocaleChange(option.value)}
                    icon={<Globe2 className="h-5 w-5" />}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                  {activeResolvedTheme === "dark" ? (
                    <MoonStar className="h-5 w-5 text-primary" />
                  ) : (
                    <SunMedium className="h-5 w-5 text-primary" />
                  )}
                  <h2 className="text-lg font-bold">{t("appearance.title")}</h2>
                </div>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-6">
                  {t("appearance.description")}
                </p>
              </div>

              <div className="space-y-3">
                {appearanceOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    active={isMounted ? themePreference === option.value : option.value === "dark"}
                    title={option.title}
                    description={option.description}
                    onClick={() => handleThemeChange(option.value)}
                    icon={option.icon}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPreferencesFeature;
