import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";

export function MobileBreadcrumb() {
  const t = useTranslations("SettingsProfile");

  return (
    <div
      className={cn(
        "text-text-secondary-light",
        "dark:text-text-secondary-dark",
        "mb-4 flex items-center gap-2 text-sm font-medium md:mb-6 lg:hidden"
      )}
    >
      <span className="material-symbols-outlined text-lg">arrow_back</span>
      <span>{t("breadcrumb.settings")}</span>
      <span>/</span>
      <span className="text-gray-900 dark:text-white">{t("breadcrumb.profile")}</span>
    </div>
  );
}
