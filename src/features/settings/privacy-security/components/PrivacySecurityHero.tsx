import { ShieldCheck } from "lucide-react";

type PrivacySecurityHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
};

export function PrivacySecurityHero({
  eyebrow,
  title,
  description,
  badge,
}: PrivacySecurityHeroProps) {
  return (
    <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="bg-primary/12 text-primary flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl shadow-[0_16px_40px_rgba(79,70,229,0.18)] dark:shadow-[0_16px_40px_rgba(19,91,236,0.18)]">
          <ShieldCheck className="h-7 w-7" />
        </div>

        <div className="space-y-2">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-semibold tracking-[0.24em] uppercase">
            {eyebrow}
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
            {title}
          </h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-3xl text-sm leading-6 md:text-base">
            {description}
          </p>
        </div>
      </div>

      <div className="rounded-full border border-indigo-500/15 bg-indigo-500/8 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-indigo-600 uppercase dark:text-indigo-300">
        {badge}
      </div>
    </div>
  );
}
