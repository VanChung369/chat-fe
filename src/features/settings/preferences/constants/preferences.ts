import type {
  AccentOption,
  AccessibilityPreferencesState,
  NotificationPreferencesState,
} from "../types/preferences";

export const ACCENT_OPTIONS: AccentOption[] = [
  {
    value: "indigo",
    className: "bg-indigo-500 ring-indigo-400/70",
  },
  {
    value: "emerald",
    className: "bg-emerald-500 ring-emerald-400/70",
  },
  {
    value: "rose",
    className: "bg-rose-500 ring-rose-400/70",
  },
  {
    value: "amber",
    className: "bg-amber-500 ring-amber-400/70",
  },
];

export const DEFAULT_ACCESSIBILITY_PREFERENCES: AccessibilityPreferencesState = {
  fontSize: 14,
  highContrast: false,
  reduceMotion: true,
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferencesState = {
  desktop: true,
  sound: true,
  email: false,
};
