import { useTranslations } from "next-intl";
import { useFormContext, useWatch } from "react-hook-form";
import type { ProfileFormValues, ProfileSectionProps } from "../types/types";
import { PreferenceToggle } from "./PreferenceToggle";

export function PreferencesSection({ onUpdateField }: ProfileSectionProps) {
  const t = useTranslations("SettingsProfile");
  const { control } = useFormContext<ProfileFormValues>();
  const showOnlineStatus = useWatch({
    control,
    name: "showOnlineStatus",
    defaultValue: false,
  });
  const allowDirectMessages = useWatch({
    control,
    name: "allowDirectMessages",
    defaultValue: false,
  });

  return (
    <section>
      <h3 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
        {t("sections.preferences.title")}
      </h3>
      <div className="flex flex-col gap-6">
        <PreferenceToggle
          title={t("sections.preferences.showOnlineStatus.title")}
          description={t("sections.preferences.showOnlineStatus.description")}
          checked={showOnlineStatus}
          onChange={(nextValue) => onUpdateField("showOnlineStatus", nextValue)}
        />

        <PreferenceToggle
          title={t("sections.preferences.directMessages.title")}
          description={t("sections.preferences.directMessages.description")}
          checked={allowDirectMessages}
          disabled
          onChange={() => {}}
        />
      </div>
    </section>
  );
}
