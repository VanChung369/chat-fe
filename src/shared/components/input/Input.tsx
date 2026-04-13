"use client";

import { cn } from "@/shared/utils/cn";
import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
  errorMessage?: string;
  errorId?: string;
}

/**
 * Base Input component without form logic - can be used independently
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      startIcon,
      endIcon,
      error = false,
      errorMessage,
      errorId,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "border-outline-variant bg-surface-input focus-visible:ring-primary/50 flex h-12 w-full rounded-lg border py-2.5 text-base text-zinc-100 ring-offset-zinc-950 transition-all placeholder:text-zinc-500 hover:border-zinc-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-10" : "pl-4",
            endIcon ? "pr-10" : "pr-4",
            className,
            error ? "border-red-500/50 hover:border-red-500/50 focus-visible:ring-red-400/50" : ""
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
