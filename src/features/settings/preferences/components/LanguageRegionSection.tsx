import { Globe2 } from "lucide-react";
import { Select } from "@/shared/components/input";
import type { AppLocale } from "@/i18n/routing";

import type { PreferenceOption } from "../types/preferences";
import { PreferencePanel } from "./PreferencePanel";
import { PreferenceSectionHeading } from "./PreferenceSectionHeading";

type LanguageRegionSectionProps = {
  title: string;
  description: string;
  displayLanguageLabel: string;
  selectedLanguage: string;
  options: PreferenceOption<AppLocale>[];
  onLanguageChange: (value: AppLocale) => void;
  disabled?: boolean;
};

export function LanguageRegionSection({
  title,
  description,
  displayLanguageLabel,
  selectedLanguage,
  options,
  onLanguageChange,
  disabled,
}: LanguageRegionSectionProps) {
  return (
    <PreferencePanel className="md:col-span-2">
      <PreferenceSectionHeading
        icon={Globe2}
        title={title}
        description={description}
        className="mb-6"
      />

      <div className="space-y-3">
        <div className="space-y-2">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-[11px] font-bold tracking-[0.2em] uppercase">
            {displayLanguageLabel}
          </p>

          <Select
            value={selectedLanguage}
            disabled={disabled}
            restoreFocusOnSelect={false}
            options={options.map((option) => ({
              value: option.value,
              label: option.title,
            }))}
            onChange={(value) => onLanguageChange(value as AppLocale)}
            className="border-border-light dark:border-border-dark bg-white text-slate-900 hover:border-slate-300 focus-visible:ring-indigo-500/20 dark:bg-slate-950/45 dark:text-white dark:hover:border-slate-600"
          />
        </div>
      </div>
    </PreferencePanel>
  );
}
