import { useTranslations } from "next-intl";
import { cn } from "@/shared/utils";
import type { PresenceStatus } from "../types/types";
import type { ProfileSectionProps } from "../types/types";

export function StatusSection({ form }: ProfileSectionProps) {
  const t = useTranslations("SettingsProfile");
  const options: Array<{
    value: PresenceStatus;
    label: string;
    description: string;
    indicatorClassName: string;
  }> = [
    {
      value: "online",
      label: t("status.onlineLabel"),
      description: t("status.onlineDescription"),
      indicatorClassName: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    },
    {
      value: "away",
      label: t("status.awayLabel"),
      description: t("status.awayDescription"),
      indicatorClassName: "bg-yellow-500",
    },
    {
      value: "busy",
      label: t("status.busyLabel"),
      description: t("status.busyDescription"),
      indicatorClassName: "bg-red-500",
    },
  ];

  return (
    <section>
      <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">{t("status.title")}</h3>
      <div className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark flex flex-col gap-5 rounded-xl border p-6">
        {options.map((option) => {
          const checked = form.status === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "group flex cursor-pointer items-center gap-4 transition-opacity",
                checked ? "" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="status"
                  checked={checked}
                  onChange={() => {}}
                  disabled
                  className="border-text-secondary-light dark:border-text-secondary-dark checked:border-primary h-6 w-6 appearance-none rounded-full border-2 bg-transparent transition-all checked:border-[7px]"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900 dark:text-white">{option.label}</p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                  {option.description}
                </p>
              </div>
              <div className={cn("size-2.5 rounded-full", option.indicatorClassName)} />
            </label>
          );
        })}

        <button
          type="button"
          disabled
          className="text-primary mt-2 text-left text-sm font-bold hover:underline"
        >
          {t("status.setCustom")}
        </button>
      </div>
    </section>
  );
}
