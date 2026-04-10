import { useTranslations } from "next-intl";
import type { ProfileSectionProps } from "../types/types";
import { PreferenceToggle } from "./PreferenceToggle";

export function PreferencesSection({ form, onUpdateField }: ProfileSectionProps) {
  const t = useTranslations("SettingsProfile");

  return (
    <section>
      <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        {t("sections.preferences.title")}
      </h3>
      <div className="flex flex-col gap-6">
        <PreferenceToggle
          title={t("sections.preferences.showOnlineStatus.title")}
          description={t("sections.preferences.showOnlineStatus.description")}
          checked={form.showOnlineStatus}
          onChange={(nextValue) => onUpdateField("showOnlineStatus", nextValue)}
        />

        <PreferenceToggle
          title={t("sections.preferences.directMessages.title")}
          description={t("sections.preferences.directMessages.description")}
          checked={form.allowDirectMessages}
          disabled
          onChange={() => {}}
        />
      </div>
    </section>
  );
}
