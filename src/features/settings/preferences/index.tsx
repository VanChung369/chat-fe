"use client";

import { type AppLocale } from "@/i18n/routing";
import { type ThemePreference } from "@/shared/types";
import { cn } from "@/shared/utils";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  ACCENT_OPTIONS,
  DEFAULT_ACCESSIBILITY_PREFERENCES,
  DEFAULT_NOTIFICATION_PREFERENCES,
} from "./constants/preferences";
import {
  AccessibilitySection,
  AppearanceSection,
  LanguageRegionSection,
  NotificationsSection,
  PreferencesHero,
} from "./components";
import type {
  AccessibilityPreferencesState,
  AccentTone,
  AppearanceOption,
  NotificationPreferencesState,
  PreferenceOption,
} from "./types/preferences";
import { usePathname, useRouter } from "@/i18n/navigation";

export function SettingsPreferencesFeature() {
  const t = useTranslations("SettingsPreferences");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isLocalePending, startLocaleTransition] = useTransition();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState<AccentTone>("indigo");
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityPreferencesState>(
    DEFAULT_ACCESSIBILITY_PREFERENCES
  );
  const [notificationState, setNotificationState] = useState<NotificationPreferencesState>(
    DEFAULT_NOTIFICATION_PREFERENCES
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const themePreference = (theme ?? "dark") as ThemePreference;

  const languageOptions: PreferenceOption<AppLocale>[] = [
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
  ];

  const appearanceOptions: AppearanceOption[] = [
    {
      value: "system" as const satisfies ThemePreference,
      title: t("appearance.options.system"),
      description: t("appearance.options.systemDescription"),
      previewClassName:
        "bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(71,85,105,0.82),rgba(248,250,252,0.85))]",
      swatchClassName: "bg-white/80",
    },
    {
      value: "light" as const satisfies ThemePreference,
      title: t("appearance.options.light"),
      description: t("appearance.options.lightDescription"),
      previewClassName:
        "bg-[linear-gradient(145deg,rgba(248,250,252,1),rgba(226,232,240,0.98),rgba(255,255,255,0.95))]",
      swatchClassName: "bg-slate-100",
    },
    {
      value: "dark" as const satisfies ThemePreference,
      title: t("appearance.options.dark"),
      description: t("appearance.options.darkDescription"),
      previewClassName:
        "bg-[linear-gradient(145deg,rgba(2,6,23,1),rgba(15,23,42,0.98),rgba(30,41,59,0.96))]",
      swatchClassName: "bg-indigo-500",
    },
  ];

  const handleLocaleChange = (nextLocale: AppLocale) => {
    if (nextLocale === locale || isLocalePending) {
      return;
    }

    startLocaleTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  };

  const handleThemeChange = (nextTheme: ThemePreference) => {
    if (nextTheme === themePreference) {
      return;
    }

    const nextThemeLabel = t(`appearance.options.${nextTheme}`);
    setTheme(nextTheme);
    toast.success(t("toasts.appearanceUpdated", { appearance: nextThemeLabel }));
  };

  const handleAccentChange = (nextAccent: AccentTone) => {
    if (nextAccent === selectedAccent) {
      return;
    }

    setSelectedAccent(nextAccent);
    toast.success(t(`toasts.accentUpdated.${nextAccent}`));
  };

  const selectedAccentOption =
    ACCENT_OPTIONS.find((option) => option.value === selectedAccent) ?? ACCENT_OPTIONS[0];

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <div className="mx-auto w-full">
          <div
            className={cn(
              "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark w-full overflow-hidden rounded-2xl border shadow-sm"
            )}
          >
            <div className="border-border-light dark:border-border-dark border-b px-5 py-6 md:px-8 lg:px-10">
              <PreferencesHero
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={t("description")}
              />
            </div>

            <div className="px-5 py-6 md:px-8 lg:px-10">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
                <AppearanceSection
                  title={t("appearance.title")}
                  description={t("appearance.description")}
                  badge={t("appearance.badge")}
                  accentTitle={t("appearance.accentTitle")}
                  accentDescription={t("appearance.accentDescription")}
                  selectedTheme={isMounted ? themePreference : "dark"}
                  options={appearanceOptions}
                  accentOptions={ACCENT_OPTIONS}
                  selectedAccent={selectedAccentOption}
                  onThemeChange={handleThemeChange}
                  onAccentChange={handleAccentChange}
                />

                <LanguageRegionSection
                  title={t("language.title")}
                  description={t("language.description")}
                  displayLanguageLabel={t("language.displayLanguageLabel")}
                  selectedLanguage={locale}
                  options={languageOptions}
                  onLanguageChange={handleLocaleChange}
                  disabled={isLocalePending}
                />

                <AccessibilitySection
                  state={accessibilityState}
                  title={t("accessibility.title")}
                  description={t("accessibility.description")}
                  fontSizeLabel={t("accessibility.fontSizeLabel")}
                  fontSizeValue={t("accessibility.fontSizeValue", {
                    size: accessibilityState.fontSize,
                  })}
                  fontSizeMinLabel={t("accessibility.fontSizeMinLabel")}
                  fontSizeMaxLabel={t("accessibility.fontSizeMaxLabel")}
                  highContrastTitle={t("accessibility.highContrast.title")}
                  highContrastDescription={t("accessibility.highContrast.description")}
                  reduceMotionTitle={t("accessibility.reduceMotion.title")}
                  reduceMotionDescription={t("accessibility.reduceMotion.description")}
                  onFontSizeChange={(value) =>
                    setAccessibilityState((prev) => ({ ...prev, fontSize: value }))
                  }
                  onToggleHighContrast={(value) =>
                    setAccessibilityState((prev) => ({ ...prev, highContrast: value }))
                  }
                  onToggleReduceMotion={(value) =>
                    setAccessibilityState((prev) => ({ ...prev, reduceMotion: value }))
                  }
                />

                <NotificationsSection
                  state={notificationState}
                  title={t("notifications.title")}
                  description={t("notifications.description")}
                  desktopTitle={t("notifications.desktop.title")}
                  desktopDescription={t("notifications.desktop.description")}
                  soundTitle={t("notifications.sound.title")}
                  soundDescription={t("notifications.sound.description")}
                  emailTitle={t("notifications.email.title")}
                  emailDescription={t("notifications.email.description")}
                  quietHoursLabel={t("notifications.quietHours")}
                  onToggleDesktop={(value) =>
                    setNotificationState((prev) => ({ ...prev, desktop: value }))
                  }
                  onToggleSound={(value) =>
                    setNotificationState((prev) => ({ ...prev, sound: value }))
                  }
                  onToggleEmail={(value) =>
                    setNotificationState((prev) => ({ ...prev, email: value }))
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPreferencesFeature;
