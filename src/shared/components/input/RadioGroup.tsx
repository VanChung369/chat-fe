"use client";

import { cn } from "@/shared/utils/cn";
import { type InputHTMLAttributes, type ReactNode } from "react";

export type RadioOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
  disabled?: boolean;
  endAdornment?: ReactNode;
};

export interface RadioGroupProps<T extends string = string> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "value" | "defaultValue" | "checked" | "onChange"
> {
  name: string;
  value?: T;
  options: RadioOption<T>[];
  onValueChange?: (value: T) => void;
  optionClassName?: string;
  inputClassName?: string;
  descriptionClassName?: string;
  error?: boolean;
  inputRef?: (instance: HTMLInputElement | null) => void;
}

export function RadioGroup<T extends string = string>({
  name,
  value,
  options,
  onValueChange,
  className,
  optionClassName,
  inputClassName,
  descriptionClassName,
  error = false,
  disabled = false,
  id,
  inputRef,
  onBlur,
  required,
  ...props
}: RadioGroupProps<T>) {
  return (
    <div role="radiogroup" aria-invalid={error} className={cn("flex flex-col gap-5", className)}>
      {options.map((option, index) => {
        const checked = value === option.value;
        const isDisabled = disabled || option.disabled;
        const optionId = `${id || name}-${String(option.value)}`;

        return (
          <label
            key={option.value}
            htmlFor={optionId}
            className={cn(
              "group flex cursor-pointer items-center gap-4 transition-opacity",
              checked ? "" : "opacity-60 hover:opacity-100",
              isDisabled ? "cursor-not-allowed opacity-50" : "",
              optionClassName
            )}
          >
            <div className="relative flex items-center justify-center">
              <input
                {...props}
                ref={index === 0 ? inputRef : undefined}
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={checked}
                disabled={isDisabled}
                onBlur={onBlur}
                required={required}
                onChange={() => onValueChange?.(option.value)}
                className={cn(
                  "border-text-secondary-light dark:border-text-secondary-dark checked:border-primary h-6 w-6 appearance-none rounded-full border-2 bg-transparent transition-all checked:border-[7px]",
                  error ? "border-red-500/50" : "",
                  inputClassName
                )}
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{option.label}</p>
              {option.description ? (
                <p
                  className={cn(
                    "text-text-secondary-light dark:text-text-secondary-dark text-xs",
                    descriptionClassName
                  )}
                >
                  {option.description}
                </p>
              ) : null}
            </div>

            {option.endAdornment}
          </label>
        );
      })}
    </div>
  );
}
