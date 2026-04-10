import { useTranslations } from "next-intl";
import { Mail, Phone } from "lucide-react";
import { FormInput } from "@/shared/components/form";
import { ICON_INPUT_CLASSNAME } from "../constants/constants";
import type { ProfileFormValues, ProfileSectionProps } from "../types/types";

export function ContactInfoSection(_: ProfileSectionProps) {
  const t = useTranslations("SettingsProfile");

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {t("sections.contact.title")}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormInput<ProfileFormValues>
          name="email"
          type="email"
          label={t("sections.contact.fields.email")}
          placeholder={t("placeholders.email")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={ICON_INPUT_CLASSNAME}
          startIcon={
            <Mail size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
          }
          readOnly
        />

        <FormInput<ProfileFormValues>
          name="phone"
          type="tel"
          label={t("sections.contact.fields.phone")}
          placeholder={t("placeholders.phone")}
          labelClassName="dark:text-text-secondary-dark text-sm font-semibold text-gray-700"
          className={ICON_INPUT_CLASSNAME}
          startIcon={
            <Phone size={20} className="text-text-secondary-light dark:text-text-secondary-dark" />
          }
        />
      </div>
    </section>
  );
}
