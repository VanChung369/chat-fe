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

export interface FormInputProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
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
}

/**
 * Accessible Input component with built-in error handling and field-level reactivity.
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
  ...props
}: FormInputProps<T>) {
  "use no memo";
  const { control, register } = useFormContext<T>();

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
              "text-sm leading-none font-semibold text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              labelClassName
            )}
            htmlFor={inputId}
          >
            {label}
          </label>
          {labelAction}
        </div>
      )}
      <div className="relative">
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            {startIcon}
          </div>
        )}
        <input
          {...register(name, rules)}
          id={inputId}
          type={type}
          aria-invalid={!!error}
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
