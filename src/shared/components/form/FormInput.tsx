"use client";

import { cn } from "@/shared/utils/cn";
import { type InputHTMLAttributes, type ReactNode } from "react";
import {
  get,
  useFormContext,
  useFormState,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { Input } from "@/shared/components/input";

export interface FormInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  labelAction?: ReactNode;
  inputBottomAction?: ReactNode;
  requiredMark?: boolean;
}

/**
 * Accessible Input component with built-in error handling and field-level reactivity.
 * Uses the base Input component internally for consistency.
 */
export function FormInput<T extends FieldValues>({
  name,
  label,
  rules,
  containerClassName,
  labelClassName,
  className,
  errorClassName,
  id,
  type = "text",
  startIcon,
  endIcon,
  labelAction,
  inputBottomAction,
  requiredMark,
  ...props
}: FormInputProps<T>) {
  "use no memo";
  const { control, register } = useFormContext<T>();
  const isRequired = requiredMark ?? Boolean(props.required || rules?.required);

  // useFormState(control, name) ensures only this input re-renders
  // when its specific error state changes.
  const { errors } = useFormState({
    control,
    name,
  });

  const error = get(errors, name);

  const inputId = id || (name as string);
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            className={cn(
              "mb-2 text-sm font-bold tracking-tight text-slate-700 dark:text-slate-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
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
      )}
      <Input
        {...register(name, rules)}
        id={inputId}
        type={type}
        startIcon={startIcon}
        endIcon={endIcon}
        error={!!error}
        errorMessage={error?.message}
        errorId={errorId}
        className={className}
        {...props}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
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
        {inputBottomAction}
      </div>
    </div>
  );
}
