import { useTranslations } from "next-intl";
import { FormInput, FormRadioGroup } from "@/shared/components/form";
import type { RadioOption } from "@/shared/components/input";
import { PresenceStatus } from "@/shared/types/user";
import { INPUT_CLASSNAME } from "../constants/constants";
import type { ProfileFormValues } from "../types/types";

export function StatusSection() {
  const t = useTranslations("SettingsProfile");
  const options: RadioOption<PresenceStatus>[] = [
    {
      value: PresenceStatus.Online,
      label: t("status.onlineLabel"),
      description: t("status.onlineDescription"),
      endAdornment: (
        <div className="size-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
      ),
    },
    {
      value: PresenceStatus.Away,
      label: t("status.awayLabel"),
      description: t("status.awayDescription"),
      endAdornment: <div className="size-2.5 rounded-full bg-yellow-500" />,
    },
    {
      value: PresenceStatus.Busy,
      label: t("status.busyLabel"),
      description: t("status.busyDescription"),
      endAdornment: <div className="size-2.5 rounded-full bg-red-500" />,
    },
  ];

  return (
    <section>
      <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">{t("status.title")}</h3>
      <div className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark flex flex-col gap-5 rounded-xl border p-6">
        <FormRadioGroup<ProfileFormValues, PresenceStatus>
          name="status"
          options={options}
          containerClassName="gap-0"
        />

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
