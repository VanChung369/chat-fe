import { cn } from "@/shared/utils";
import { Palette } from "lucide-react";

import type { AccentOption, AppearanceOption } from "../types/preferences";
import { PreferenceChoiceCard } from "./PreferenceChoiceCard";
import { PreferencePanel } from "./PreferencePanel";
import { PreferenceSectionHeading } from "./PreferenceSectionHeading";

type AppearanceSectionProps = {
  title: string;
  description: string;
  badge: string;
  accentTitle: string;
  accentDescription: string;
  selectedTheme: string;
  options: AppearanceOption[];
  accentOptions: AccentOption[];
  selectedAccent: AccentOption;
  onThemeChange: (value: AppearanceOption["value"]) => void;
  onAccentChange: (value: AccentOption["value"]) => void;
};

export function AppearanceSection({
  title,
  description,
  badge,
  accentTitle,
  accentDescription,
  selectedTheme,
  options,
  accentOptions,
  selectedAccent,
  onThemeChange,
  onAccentChange,
}: AppearanceSectionProps) {
  return (
    <PreferencePanel className="md:col-span-4">
      <PreferenceSectionHeading
        icon={Palette}
        title={title}
        description={description}
        trailing={
          <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]">
            {badge}
          </span>
        }
      />

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {options.map((option) => (
          <PreferenceChoiceCard
            key={option.value}
            active={selectedTheme === option.value}
            title={option.title}
            description={option.description}
            onClick={() => onThemeChange(option.value)}
            preview={
              <div className={cn("h-28 p-4", option.previewClassName)}>
                <div className="flex h-full items-end rounded-2xl border border-white/10 bg-black/12 p-3 backdrop-blur-[2px]">
                  <div className="flex w-full items-center justify-between rounded-xl border border-white/12 bg-white/10 px-3 py-2">
                    <div className="space-y-1">
                      <div className="h-2 w-12 rounded-full bg-white/75" />
                      <div className="h-1.5 w-16 rounded-full bg-white/40" />
                    </div>
                    <div className={cn("h-6 w-6 rounded-lg shadow-sm", option.swatchClassName)} />
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>

      <div className="border-border-light/70 dark:border-border-dark/70 mt-7 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white">{accentTitle}</h4>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm">
            {accentDescription}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {accentOptions.map((option) => {
            const isActive = option.value === selectedAccent.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onAccentChange(option.value)}
                className={cn(
                  "h-7 w-7 rounded-full transition-transform hover:scale-110",
                  option.className,
                  isActive ? "ring-4 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" : ""
                )}
                aria-label={option.value}
              />
            );
          })}
        </div>
      </div>
    </PreferencePanel>
  );
}
