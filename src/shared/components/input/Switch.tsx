"use client";

import { cn } from "@/shared/utils/cn";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
  labelClassName?: string;
  descriptionClassName?: string;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      label,
      description,
      labelClassName,
      descriptionClassName,
      checked,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <label
        className={cn(
          "flex items-center justify-between gap-4",
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
        )}
      >
        {label || description ? (
          <span className="flex flex-col">
            {label ? (
              <span
                className={cn(
                  "text-sm font-semibold text-gray-900 dark:text-white",
                  labelClassName
                )}
              >
                {label}
              </span>
            ) : null}
            {description ? (
              <span
                className={cn(
                  "text-text-secondary-light dark:text-text-secondary-dark mt-0.5 text-sm",
                  descriptionClassName
                )}
              >
                {description}
              </span>
            ) : null}
          </span>
        ) : null}

        <span className="relative inline-flex shrink-0 items-center">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <span
            className={cn(
              "bg-border-light dark:bg-border-dark peer-checked:bg-primary h-6 w-11 rounded-full transition-colors",
              "peer-focus-visible:ring-primary/50 peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:outline-none",
              "after:absolute after:inset-s-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
              "peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full",
              className
            )}
          />
        </span>
      </label>
    );
  }
);

Switch.displayName = "Switch";
