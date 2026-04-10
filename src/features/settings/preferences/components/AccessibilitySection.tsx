import { Accessibility } from "lucide-react";

import { Switch } from "@/shared/components/input/Switch";

import type { AccessibilityPreferencesState } from "../types/preferences";
import { PreferencePanel } from "./PreferencePanel";
import { PreferenceSectionHeading } from "./PreferenceSectionHeading";

type AccessibilitySectionProps = {
  state: AccessibilityPreferencesState;
  title: string;
  description: string;
  fontSizeLabel: string;
  fontSizeValue: string;
  fontSizeMinLabel: string;
  fontSizeMaxLabel: string;
  highContrastTitle: string;
  highContrastDescription: string;
  reduceMotionTitle: string;
  reduceMotionDescription: string;
  onFontSizeChange: (value: number) => void;
  onToggleHighContrast: (value: boolean) => void;
  onToggleReduceMotion: (value: boolean) => void;
};

export function AccessibilitySection({
  state,
  title,
  description,
  fontSizeLabel,
  fontSizeValue,
  fontSizeMinLabel,
  fontSizeMaxLabel,
  highContrastTitle,
  highContrastDescription,
  reduceMotionTitle,
  reduceMotionDescription,
  onFontSizeChange,
  onToggleHighContrast,
  onToggleReduceMotion,
}: AccessibilitySectionProps) {
  return (
    <PreferencePanel className="md:col-span-3">
      <PreferenceSectionHeading
        icon={Accessibility}
        title={title}
        description={description}
        className="mb-6"
      />

      <div className="space-y-6">
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/45">
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              {fontSizeLabel}
            </label>
            <span className="text-primary text-xs font-bold uppercase tracking-[0.18em]">
              {fontSizeValue}
            </span>
          </div>

          <input
            type="range"
            min={12}
            max={24}
            value={state.fontSize}
            onChange={(event) => onFontSizeChange(Number(event.target.value))}
            className="accent-primary mt-4 h-1.5 w-full cursor-pointer"
          />

          <div className="text-text-secondary-light dark:text-text-secondary-dark mt-3 flex justify-between text-[10px] font-bold uppercase tracking-[0.18em]">
            <span>{fontSizeMinLabel}</span>
            <span>{fontSizeMaxLabel}</span>
          </div>
        </div>

        <div className="space-y-4">
          <Switch
            checked={state.highContrast}
            onChange={(event) => onToggleHighContrast(event.target.checked)}
            label={highContrastTitle}
            description={highContrastDescription}
          />

          <Switch
            checked={state.reduceMotion}
            onChange={(event) => onToggleReduceMotion(event.target.checked)}
            label={reduceMotionTitle}
            description={reduceMotionDescription}
          />
        </div>
      </div>
    </PreferencePanel>
  );
}
