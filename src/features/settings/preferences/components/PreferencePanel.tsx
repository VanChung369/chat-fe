import { cn } from "@/shared/utils";
import type { ReactNode } from "react";

type PreferencePanelProps = {
  children: ReactNode;
  className?: string;
};

export function PreferencePanel({ children, className }: PreferencePanelProps) {
  return (
    <section
      className={cn(
        "border-border-light/60 dark:border-border-dark/80 rounded-3xl border bg-white/70 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-md",
        "dark:bg-slate-900/55 dark:shadow-[0_24px_70px_rgba(2,6,23,0.42)]",
        className
      )}
    >
      {children}
    </section>
  );
}
