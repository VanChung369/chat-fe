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
    <div className="flex h-full flex-col p-4">
      {/* Header */}
      <div className="mb-6 px-1">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">{t("title")}</h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-gray-400">{t("description")}</p>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-1 flex-col gap-1">
        {settingsNavigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname.includes(item.href) : false;
          const itemLabel = itemLabels[item.labelKey];

          const baseClasses =
            "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200";
          const activeClasses =
            "bg-indigo-500/10 text-indigo-500 shadow-sm border border-indigo-500/20";
          const inactiveClasses =
            "text-slate-700 hover:bg-slate-100 dark:text-gray-300 dark:hover:bg-surface-hover";

          if (item.href == null) {
            return (
              <button
                key={item.labelKey}
                type="button"
                onClick={handleUnavailableSection}
                className={cn(baseClasses, inactiveClasses, "w-full text-left")}
              >
                <Icon className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-slate-700 dark:text-gray-500 dark:group-hover:text-gray-300" />
                {itemLabel}
              </button>
            );
          }

          return (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(baseClasses, isActive ? activeClasses : inactiveClasses)}
            >
              <Icon
                className={cn(
                  "h-5 w-5 shrink-0 transition-colors",
                  isActive
                    ? "text-indigo-500"
                    : "text-slate-400 group-hover:text-slate-700 dark:text-gray-500 dark:group-hover:text-gray-300"
                )}
              />
              {itemLabel}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
