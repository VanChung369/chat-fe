"use client";

import { cn } from "@/shared/utils/cn";
import { type ReactNode } from "react";
import {
  get,
  useController,
  useFormContext,
  useFormState,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { Select, type SelectOption } from "@/shared/components/input";

export interface FormSelectProps<T extends FieldValues, TValue extends string = string> {
  name: Path<T>;
  options: SelectOption<TValue>[];
  label?: string;
  placeholder?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  labelAction?: ReactNode;
  requiredMark?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  className?: string;
}

export function FormSelect<T extends FieldValues, TValue extends string = string>({
  name,
  options,
  label,
  placeholder,
  rules,
  containerClassName,
  labelClassName,
  errorClassName,
  labelAction,
  requiredMark,
  disabled,
  startIcon,
  className,
}: FormSelectProps<T, TValue>) {
  "use no memo";
  const { control } = useFormContext<T>();
  const { field } = useController<T, Path<T>>({
    name,
    control,
    rules,
  });
  const { errors } = useFormState({
    control,
    name,
  });
  const error = get(errors, name);
  const isRequired = requiredMark ?? Boolean(rules?.required);
  const inputId = name as string;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label ? (
        <div className="flex items-center justify-between">
          <label
            className={cn(
              "mb-1 text-sm leading-none font-semibold text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
            htmlFor={inputId}
          >
            <span className="inline-flex items-center gap-1">
              <span>{label}</span>
              {isRequired ? (
                <span className={cn("text-red-500", "dark:text-red-400")} aria-hidden="true">
                  *
                </span>
              ) : null}
            </span>
          </label>
          {labelAction}
        </div>
      ) : null}

      <Select
        id={inputId}
        value={(field.value as string | undefined) ?? ""}
        onChange={(value) => field.onChange(value)}
        disabled={disabled}
        options={options}
        placeholder={placeholder}
        startIcon={startIcon}
        error={!!error}
        errorId={errorId}
        className={className}
      />

      {error && typeof error.message === "string" ? (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "animate-in fade-in slide-in-from-top-1 text-sm font-medium text-red-400 duration-200",
            errorClassName
          )}
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
