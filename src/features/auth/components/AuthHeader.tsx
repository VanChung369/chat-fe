import { cn } from "@/shared/utils/cn";
import { ReactNode } from "react";

interface AuthHeaderProps {
  title: string;
  description: ReactNode;
  className?: string;
}

/**
 * Shared header component for authentication forms.
 * Consistently applies animations and premium typography.
 */
export const AuthHeader = ({ title, description, className }: AuthHeaderProps) => {
  return (
    <header className={cn("animate-fade-in-up mb-6 space-y-2 delay-200", className)}>
      <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{title}</h1>
      {typeof description === "string" ? (
        <p className="text-sm text-zinc-400">{description}</p>
      ) : (
        <div className="text-sm text-zinc-400">{description}</div>
      )}
    </header>
  );
};
