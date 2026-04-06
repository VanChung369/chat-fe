"use client";

import { cn } from "@/shared/utils/cn";
import { type ReactNode, type TextareaHTMLAttributes, forwardRef } from "react";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  errorId?: string;
}

/**
 * Base Textarea component without form logic - can be used independently.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      startIcon,
      endIcon,
      error = false,
      errorMessage,
      errorId,
      rows = 4,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute top-3 left-3 text-zinc-400">{startIcon}</div>
        )}
        <textarea
          ref={ref}
          rows={rows}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "border-outline-variant bg-surface-input focus-visible:ring-primary/50 w-full rounded-lg border py-3 text-base text-zinc-100 ring-offset-zinc-950 transition-all placeholder:text-zinc-500 hover:border-zinc-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-10" : "pl-4",
            endIcon ? "pr-10" : "pr-4",
            className,
            error ? "border-red-500/50 hover:border-red-500/50 focus-visible:ring-red-400/50" : ""
          )}
          {...props}
        />
        {endIcon && <div className="absolute top-3 right-3 text-zinc-400">{endIcon}</div>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
