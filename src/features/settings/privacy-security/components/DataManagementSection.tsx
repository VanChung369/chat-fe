import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";

type DataAction = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  tone: "primary" | "danger";
};

type DataManagementSectionProps = {
  className?: string;
  actions: DataAction[];
};

export function DataManagementSection({ className, actions }: DataManagementSectionProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6">
        {actions.map((action) => {
          const Icon = action.icon;
          const isDanger = action.tone === "danger";

          return (
            <button
              key={action.id}
              type="button"
              className={[
                "group flex w-full items-center justify-between gap-4 rounded-xl border p-6 text-left shadow-[0_24px_70px_rgba(15,23,42,0.06)] transition-all",
                isDanger
                  ? "border-red-200/70 bg-red-50/85 hover:border-red-300 dark:border-red-900/50 dark:bg-red-950/20 dark:hover:border-red-800"
                  : "border-border-light/70 dark:border-border-dark/80 bg-white/90 hover:border-indigo-200 dark:bg-slate-950/45 dark:hover:border-slate-700",
              ].join(" ")}
            >
              <div className="flex items-center gap-4">
                <div
                  className={[
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                    isDanger
                      ? "bg-red-500/12 text-red-600 dark:text-red-300"
                      : "bg-primary/12 text-primary",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {action.title}
                  </h4>
                  <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm leading-6">
                    {action.description}
                  </p>
                </div>
              </div>

              <span
                className={[
                  "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase transition-colors",
                  isDanger ? "text-red-600 dark:text-red-300" : "text-primary",
                ].join(" ")}
              >
                {action.actionLabel}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
