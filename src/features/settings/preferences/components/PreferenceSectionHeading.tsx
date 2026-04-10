import { cn } from "@/shared/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type PreferenceSectionHeadingProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  trailing?: ReactNode;
};

export function PreferenceSectionHeading({
  icon: Icon,
  title,
  description,
  className,
  trailing,
}: PreferenceSectionHeadingProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="flex items-start gap-3">
        <div className="bg-primary/12 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-6">
            {description}
          </p>
        </div>
      </div>
      {trailing}
    </div>
  );
}
