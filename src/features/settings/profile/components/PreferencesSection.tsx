import { useTranslations } from "next-intl";
import { FormSwitch } from "@/shared/components/form";
import type { ProfileFormValues } from "../types/types";

export function PreferencesSection() {
  const t = useTranslations("SettingsProfile");

  return (
    <section>
      <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        {t("sections.preferences.title")}
      </h3>
      <div className="flex flex-col gap-6">
        <FormSwitch<ProfileFormValues>
          name="showOnlineStatus"
          label={t("sections.preferences.showOnlineStatus.title")}
          description={t("sections.preferences.showOnlineStatus.description")}
        />

        <FormSwitch<ProfileFormValues>
          name="allowDirectMessages"
          label={t("sections.preferences.directMessages.title")}
          description={t("sections.preferences.directMessages.description")}
          disabled
        />
      </div>
    </section>
  );
}
