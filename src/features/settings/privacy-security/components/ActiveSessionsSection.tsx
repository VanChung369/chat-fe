import { cn } from "@/shared/utils";
import { type LucideIcon, X } from "lucide-react";
import { PrivacySecurityPanel } from "./PrivacySecurityPanel";
import { PrivacySecuritySectionHeader } from "./PrivacySecuritySectionHeader";

type SessionItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  isCurrent: boolean;
};

type ActiveSessionsSectionProps = {
  className?: string;
  title: string;
  description: string;
  actionLabel: string;
  currentBadgeLabel: string;
  sessions: SessionItem[];
};

export function ActiveSessionsSection({
  className,
  title,
  description,
  actionLabel,
  currentBadgeLabel,
  sessions,
}: ActiveSessionsSectionProps) {
  return (
    <PrivacySecurityPanel className={className}>
      <PrivacySecuritySectionHeader
        icon={sessions[0]?.icon ?? X}
        title={title}
        description={description}
        trailing={
          <button
            type="button"
            className="text-primary text-xs font-semibold tracking-[0.2em] uppercase transition-colors hover:opacity-80"
          >
            {actionLabel}
          </button>
        }
        className="mb-6"
      />

      <div className="space-y-4">
        {sessions.map((session) => {
          const Icon = session.icon;

          return (
            <div
              key={session.id}
              className="group rounded-xl border border-slate-200/70 bg-slate-50/85 p-4 transition-colors hover:border-indigo-200 dark:border-slate-800/80 dark:bg-slate-950/45 dark:hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="bg-surface-light text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 dark:border-slate-800 dark:bg-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {session.title}
                      </p>
                      {session.isCurrent ? (
                        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.18em] text-emerald-600 uppercase dark:text-emerald-300">
                          {currentBadgeLabel}
                        </span>
                      ) : null}
                    </div>

                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-6">
                      {session.description}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={cn(
                    "text-text-secondary-light dark:text-text-secondary-dark rounded-full p-1.5 transition-all hover:bg-slate-200/70 hover:text-slate-700",
                    "dark:hover:bg-slate-800 dark:hover:text-white"
                  )}
                  aria-label={session.title}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </PrivacySecurityPanel>
  );
}
