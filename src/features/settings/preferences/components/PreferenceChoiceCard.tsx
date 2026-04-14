import { cn } from "@/shared/utils";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

type PreferenceChoiceCardProps = {
  active: boolean;
  title: string;
  description: string;
  preview?: ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export function PreferenceChoiceCard({
  active,
  title,
  description,
  preview,
  onClick,
  className,
  disabled,
}: PreferenceChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "border-border-light/80 dark:border-border-dark/80 overflow-hidden rounded-2xl border text-left transition-all duration-200",
        active
          ? "border-primary bg-primary/[0.04] ring-primary/20 dark:border-primary dark:bg-primary/10 ring-1"
          : "border-border-light/60 hover:border-primary/30 dark:border-border-dark/80 bg-slate-50/40 hover:bg-white dark:bg-slate-950/45 dark:hover:bg-slate-950/65",
        disabled ? "cursor-not-allowed opacity-60" : "active:scale-[0.99]",
        className
      )}
    >
      {preview}
      <div className="flex items-start gap-3 px-4 py-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
            {active ? <Check className="text-primary h-4 w-4 shrink-0" /> : null}
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mt-1 text-sm leading-6">
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
