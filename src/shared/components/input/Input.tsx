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
      <div className="group relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 transition-colors group-focus-within:text-primary dark:text-slate-500">
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "flex h-12 w-full rounded-2xl border bg-white/50 px-4 py-2.5 text-base transition-all duration-200 backdrop-blur-sm",
            "border-border-light/60 text-slate-900 placeholder:text-slate-400",
            "hover:border-primary/30 hover:bg-white",
            "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 focus-visible:outline-none",
            "dark:border-border-dark dark:bg-slate-900/50 dark:text-white dark:placeholder:text-slate-500",
            "dark:hover:border-primary/50 dark:hover:bg-slate-900/80",
            "dark:focus-visible:ring-primary/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-border-light/60",
            startIcon ? "pl-11" : "pl-4",
            endIcon ? "pr-11" : "pr-4",
            error && "border-red-500/50 hover:border-red-500/50 focus-visible:border-red-500 focus-visible:ring-red-500/10",
            className
          )}
          {...props}
        />
        {endIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition-colors group-focus-within:text-primary dark:text-slate-500">
            {endIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
