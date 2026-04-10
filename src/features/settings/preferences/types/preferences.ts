import type { ThemePreference } from "@/shared/types";

export type AccentTone = "indigo" | "emerald" | "rose" | "amber";

export type PreferenceOption<TValue extends string> = {
  value: TValue;
  title: string;
  description: string;
};

export type AppearanceOption = PreferenceOption<ThemePreference> & {
  previewClassName: string;
  swatchClassName: string;
};

export type AccentOption = {
  value: AccentTone;
  className: string;
};

export type AccessibilityPreferencesState = {
  fontSize: number;
  highContrast: boolean;
  reduceMotion: boolean;
};

export type NotificationPreferencesState = {
  desktop: boolean;
  sound: boolean;
  email: boolean;
};
