import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import { FormInput } from "@/shared/components/form";
import { PresenceStatus } from "@/shared/types/user";
import { cn } from "@/shared/utils";
import { INPUT_CLASSNAME } from "../constants/constants";
import type { ProfileFormValues, ProfileSectionProps } from "../types/types";

export function StatusSection({ onUpdateField }: Omit<ProfileSectionProps, "form">) {
  const t = useTranslations("SettingsProfile");
  const { control } = useFormContext<ProfileFormValues>();
  const selectedStatus = useWatch({
    control,
    name: "status",
    defaultValue: PresenceStatus.Online,
  });
  const options: Array<{
    value: PresenceStatus;
    label: string;
    description: string;
    indicatorClassName: string;
  }> = [
    {
      value: PresenceStatus.Online,
      label: t("status.onlineLabel"),
      description: t("status.onlineDescription"),
      indicatorClassName: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
    },
    {
      value: PresenceStatus.Away,
      label: t("status.awayLabel"),
      description: t("status.awayDescription"),
      indicatorClassName: "bg-yellow-500",
    },
    {
      value: PresenceStatus.Busy,
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
          const checked = selectedStatus === option.value;
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
                  onChange={() => onUpdateField("status", option.value)}
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

        <FormInput
          name="statusMessage"
          label={t("status.customLabel")}
          placeholder={t("status.customPlaceholder")}
          className={INPUT_CLASSNAME}
        />
      </div>
    </section>
  );
}
