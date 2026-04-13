import { useTranslations } from "next-intl";
import { FormInput, FormTextarea } from "@/shared/components/form";
import { ABOUT_MAX_LENGTH, INPUT_CLASSNAME } from "../constants/constants";
import { cn } from "@/shared/utils";
import type { ProfileFormValues, ProfileSectionProps } from "../types/types";
import AboutCounter from "./AboutCounter";

export function GeneralInfoSection({ onUpdateField }: Omit<ProfileSectionProps, "form">) {
  const t = useTranslations("SettingsProfile");

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("sections.general.title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput<ProfileFormValues>
          name="firstName"
          label={t("sections.general.fields.firstName")}
          placeholder={t("placeholders.firstName")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={INPUT_CLASSNAME}
        />

        <FormInput<ProfileFormValues>
          name="lastName"
          label={t("sections.general.fields.lastName")}
          placeholder={t("placeholders.lastName")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={INPUT_CLASSNAME}
        />

        <FormInput<ProfileFormValues>
          name="username"
          label={t("sections.general.fields.username")}
          placeholder={t("placeholders.username")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={cn(INPUT_CLASSNAME, "pl-8")}
          containerClassName="md:col-span-2"
          startIcon={
            <span className="text-text-secondary-light dark:text-text-secondary-dark">@</span>
          }
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
          inputBottomAction={<AboutCounter />}
        />
      </div>
    </section>
  );
}
