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
    <div className={cn("flex h-full flex-col p-6")}>
      {/* Header */}
      <div className="mb-10 px-2">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-relaxed font-medium text-slate-500 dark:text-slate-400">
          {t("description")}
        </p>
      </div>

      {/* Navigation List */}
      <nav className="flex flex-1 flex-col gap-3">
        {settingsNavigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href ? pathname.includes(item.href) : false;
          const itemLabel = itemLabels[item.labelKey];

          const content = (
            <>
              <span
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-[0_8px_16px_rgba(79,70,229,0.25)]"
                    : "bg-slate-100 text-slate-500 group-hover:bg-white group-hover:text-primary dark:bg-slate-800/50 dark:text-slate-400 dark:group-hover:bg-slate-800 dark:group-hover:text-slate-200"
                )}
              >
                <Icon className="h-5.5 w-5.5 shrink-0" />
              </span>
              <span className={cn(
                "min-w-0 flex-1 truncate text-sm font-bold tracking-tight transition-colors",
                isActive ? "text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-200"
              )}>
                {itemLabel}
              </span>
            </>
          );

          if (item.href == null) {
            return (
              <button
                key={item.labelKey}
                type="button"
                onClick={handleUnavailableSection}
                className="group flex items-center gap-4 rounded-[1.25rem] p-2 transition-all duration-300 hover:bg-white/80 dark:hover:bg-surface-hover/50"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.labelKey}
              href={item.href}
              className={cn(
                "group flex items-center gap-4 rounded-[1.25rem] p-2 transition-all duration-300",
                isActive
                  ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 dark:bg-surface-hover dark:ring-0"
                  : "hover:bg-white/80 dark:hover:bg-surface-hover/30"
              )}
            >
              {content}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
