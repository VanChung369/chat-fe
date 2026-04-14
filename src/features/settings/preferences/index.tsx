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

  const themePreference = theme as ThemePreference | undefined;

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
        "bg-[linear-gradient(135deg,#f8faff_0%,#e2e8f0_40%,#0f172a_100%)]",
      swatchClassName: "bg-white/80",
    },
    {
      value: "light" as const satisfies ThemePreference,
      title: t("appearance.options.light"),
      description: t("appearance.options.lightDescription"),
      previewClassName:
        "bg-[linear-gradient(135deg,#ffffff_0%,#f1f5f9_50%,#e2e8f0_100%)]",
      swatchClassName: "bg-indigo-50",
    },
    {
      value: "dark" as const satisfies ThemePreference,
      title: t("appearance.options.dark"),
      description: t("appearance.options.darkDescription"),
      previewClassName:
        "bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_50%,#334155_100%)]",
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
    if (nextTheme === theme) {
      return;
    }

    setTheme(nextTheme);
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
              "bg-white/90 dark:bg-surface-dark border-border-light/60 dark:border-border-dark w-full overflow-hidden rounded-[2.5rem] border shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl",
              "md:rounded-3xl"
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
                  selectedTheme={isMounted ? themePreference : undefined}
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
