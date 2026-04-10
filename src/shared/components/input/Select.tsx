"use client";

import { cn } from "@/shared/utils/cn";
import { ChevronDown } from "lucide-react";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

export interface SelectProps<T extends string = string>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption<T>[];
  error?: boolean;
  errorId?: string;
  placeholder?: string;
  startIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error = false, errorId, placeholder, startIcon, ...props }, ref) => {
    return (
      <div className="relative">
        {startIcon ? (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            {startIcon}
          </div>
        ) : null}

        <select
          ref={ref}
          aria-invalid={error}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "border-outline-variant bg-surface-input focus-visible:ring-primary/50 h-12 w-full appearance-none rounded-lg border py-2.5 text-base text-zinc-100 ring-offset-zinc-950 transition-all hover:border-zinc-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-10" : "pl-4",
            "pr-10",
            className,
            error ? "border-red-500/50 hover:border-red-500/50 focus-visible:ring-red-400/50" : ""
          )}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400">
          <ChevronDown className="size-4" />
        </div>
      </div>
    );
  }
);

Select.displayName = "Select";
