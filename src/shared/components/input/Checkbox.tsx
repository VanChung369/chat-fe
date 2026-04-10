"use client";

import { cn } from "@/shared/utils/cn";
import { Check } from "lucide-react";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
  labelClassName?: string;
  descriptionClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error = false,
      labelClassName,
      descriptionClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          "flex items-start gap-3",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
      >
        <span className="relative mt-0.5 flex shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark flex size-5 items-center justify-center rounded border transition-colors",
              "peer-focus-visible:ring-primary/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:outline-none",
              "peer-checked:bg-primary peer-checked:border-primary",
              error ? "border-red-500/50" : "",
              className
            )}
          >
            <Check className="size-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
          </span>
        </span>

        {(label || description) ? (
          <span className="flex flex-col">
            {label ? (
              <span className={cn("text-sm font-semibold text-gray-900 dark:text-white", labelClassName)}>
                {label}
              </span>
            ) : null}
            {description ? (
              <span
                className={cn(
                  "text-text-secondary-light dark:text-text-secondary-dark mt-0.5 text-xs",
                  descriptionClassName
                )}
              >
                {description}
              </span>
            ) : null}
          </span>
        ) : null}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
