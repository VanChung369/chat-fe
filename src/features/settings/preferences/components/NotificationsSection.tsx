import { BellRing } from "lucide-react";

import { Switch } from "@/shared/components/input/Switch";

import type { NotificationPreferencesState } from "../types/preferences";
import { PreferencePanel } from "./PreferencePanel";
import { PreferenceSectionHeading } from "./PreferenceSectionHeading";

type NotificationsSectionProps = {
  state: NotificationPreferencesState;
  title: string;
  description: string;
  desktopTitle: string;
  desktopDescription: string;
  soundTitle: string;
  soundDescription: string;
  emailTitle: string;
  emailDescription: string;
  quietHoursLabel: string;
  onToggleDesktop: (value: boolean) => void;
  onToggleSound: (value: boolean) => void;
  onToggleEmail: (value: boolean) => void;
};

export function NotificationsSection({
  state,
  title,
  description,
  desktopTitle,
  desktopDescription,
  soundTitle,
  soundDescription,
  emailTitle,
  emailDescription,
  quietHoursLabel,
  onToggleDesktop,
  onToggleSound,
  onToggleEmail,
}: NotificationsSectionProps) {
  return (
    <PreferencePanel className="md:col-span-3">
      <PreferenceSectionHeading
        icon={BellRing}
        title={title}
        description={description}
        className="mb-6"
      />

      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/45">
          <Switch
            checked={state.desktop}
            onChange={(event) => onToggleDesktop(event.target.checked)}
            label={desktopTitle}
            description={desktopDescription}
          />
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/45">
          <Switch
            checked={state.sound}
            onChange={(event) => onToggleSound(event.target.checked)}
            label={soundTitle}
            description={soundDescription}
          />
        </div>

        <div className="rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/45">
          <Switch
            checked={state.email}
            onChange={(event) => onToggleEmail(event.target.checked)}
            label={emailTitle}
            description={emailDescription}
          />
        </div>

        <button
          type="button"
          className="border-primary/30 text-primary mt-2 w-full rounded-2xl border px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] transition-colors hover:bg-indigo-500/8"
        >
          {quietHoursLabel}
        </button>
      </div>
    </PreferencePanel>
  );
}
