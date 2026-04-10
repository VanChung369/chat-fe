export const LANGUAGES = ["vi", "en"] as const;

const LANGUAGE_LABELS: Record<(typeof LANGUAGES)[number], string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export function getLanguageLabel(locale: (typeof LANGUAGES)[number]): string {
  return LANGUAGE_LABELS[locale] || locale;
}
