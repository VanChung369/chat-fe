import { Sparkles } from "lucide-react";

type PreferencesHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PreferencesHero({ eyebrow, title, description }: PreferencesHeroProps) {
  return (
    <header className="mb-10">
      <div className="mb-4 inline-flex items-center gap-3 rounded-full border border-indigo-500/20 bg-indigo-500/8 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-indigo-300">
        <Sparkles className="h-4 w-4" />
        <span>{eyebrow}</span>
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
        {title}
      </h1>
      <p className="text-text-secondary-light dark:text-text-secondary-dark mt-3 max-w-2xl text-sm leading-7 md:text-base">
        {description}
      </p>
    </header>
  );
}
