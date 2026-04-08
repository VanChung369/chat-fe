import { useTranslations } from "next-intl";
import { FormInput, FormTextarea } from "@/shared/components/form";
import { ABOUT_MAX_LENGTH, INPUT_CLASSNAME } from "../constants/constants";
import { cn } from "@/shared/utils";
import type { ProfileFormValues, ProfileSectionProps } from "../types/types";

export function GeneralInfoSection({ form, onUpdateField }: ProfileSectionProps) {
  const t = useTranslations("SettingsProfile");
  const aboutLength = form.about.length;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("sections.general.title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput<ProfileFormValues>
          name="displayName"
          label={t("sections.general.fields.displayName")}
          placeholder={t("placeholders.displayName")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={INPUT_CLASSNAME}
          readOnly
        />

        <FormInput<ProfileFormValues>
          name="username"
          label={t("sections.general.fields.username")}
          placeholder={t("placeholders.username")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={cn(INPUT_CLASSNAME, "pl-8")}
          startIcon={
            <span className="text-text-secondary-light dark:text-text-secondary-dark">@</span>
          }
          readOnly
        />

        <FormTextarea<ProfileFormValues>
          name="about"
          rows={4}
          containerClassName="md:col-span-2"
          label={t("sections.general.fields.about")}
          placeholder={t("placeholders.about")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={cn(INPUT_CLASSNAME, "resize-none")}
          onChange={(e) => onUpdateField("about", e.target.value.slice(0, ABOUT_MAX_LENGTH))}
          inputBottomAction={
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
              {aboutLength}/{ABOUT_MAX_LENGTH}
            </span>
          }
        />
      </div>
    </section>
  );
}
