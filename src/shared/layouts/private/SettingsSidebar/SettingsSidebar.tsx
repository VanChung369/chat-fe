"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { settingsNavigationItems } from "@/shared/constants";
import { cn } from "@/shared/utils";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const SettingsSidebar = () => {
  const t = useTranslations("SettingsSidebar");
  const pathname = usePathname();

  const itemLabels: Record<(typeof settingsNavigationItems)[number]["labelKey"], string> = {
    profile: t("items.profile"),
    privacySecurity: t("items.privacySecurity"),
    notifications: t("items.notifications"),
    preferences: t("items.preferences"),
  };

  const handleUnavailableSection = () => {
    toast.info(t("toasts.unavailableSection"));
  };

  return (
    <div className={cn("flex h-full flex-col p-5")}>
      {/* Header */}
      <div className="mb-8 rounded-2xl">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h2
              className={cn(
                "text-2xl font-semibold tracking-tight",
                "text-slate-950",
                "dark:text-white"
              )}
            >
              {t("title")}
            </h2>
          </div>
        </div>
        <p className={cn("max-w-90 text-sm leading-6", "text-slate-600", "dark:text-slate-400")}>
          {t("description")}
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-1 flex-col gap-2">
        {settingsNavigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname.includes(item.href) : false;
          const itemLabel = itemLabels[item.labelKey];

          if (item.href == null) {
            return (
              <button
                key={item.labelKey}
                type="button"
                onClick={handleUnavailableSection}
                className={cn(
                  "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200",
                  "text-slate-800 hover:bg-slate-100/90 hover:text-white",
                  "dark:hover:bg-surface-hover dark:text-slate-300",
                  "w-full text-left opacity-90 hover:opacity-100"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
                    "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-200",
                    "dark:bg-indigo-500/15 dark:text-slate-400 dark:group-hover:bg-slate-900 dark:group-hover:text-slate-200"
                  )}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                </span>
                <span className="min-w-0 flex-1 truncate">{itemLabel}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-semibold transition-all duration-200",
                isActive
                  ? cn("bg-indigo-100 text-slate-950", "dark:bg-indigo-500/10 dark:text-white")
                  : cn(
                      "text-slate-500 group-hover:bg-white group-hover:text-slate-200",
                      "dark:hover:bg-surface-hover dark:text-slate-300 dark:group-hover:bg-slate-900"
                    )
              )}
            >
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-200",
                  isActive
                    ? cn(
                        "bg-indigo-500/15 text-indigo-600",
                        "dark:bg-indigo-500/10 dark:text-indigo-300"
                      )
                    : cn(
                        "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-slate-800",
                        "dark:bg-indigo-500/15 dark:text-slate-400 dark:group-hover:bg-slate-900 dark:group-hover:text-slate-200"
                      )
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
              </span>
              <span className="min-w-0 flex-1 truncate">{itemLabel}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
