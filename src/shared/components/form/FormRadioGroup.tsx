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
import { RadioGroup, type RadioOption } from "@/shared/components/input";

export interface FormRadioGroupProps<T extends FieldValues, TValue extends string = string> {
  name: Path<T>;
  options: RadioOption<TValue>[];
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
  labelAction?: ReactNode;
  requiredMark?: boolean;
  onValueChange?: (value: TValue) => void;
  disabled?: boolean;
  optionClassName?: string;
  inputClassName?: string;
  descriptionClassName?: string;
  id?: string;
}

export function FormRadioGroup<T extends FieldValues, TValue extends string = string>({
  name,
  options,
  label,
  rules,
  containerClassName,
  labelClassName,
  errorClassName,
  labelAction,
  requiredMark,
  onValueChange,
  disabled,
  optionClassName,
  inputClassName,
  descriptionClassName,
  id,
}: FormRadioGroupProps<T, TValue>) {
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
  const inputId = id || (name as string);
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

      <RadioGroup<TValue>
        id={inputId}
        name={field.name}
        value={field.value as TValue | undefined}
        options={options}
        onBlur={field.onBlur}
        inputRef={field.ref}
        required={isRequired}
        disabled={disabled}
        error={!!error}
        aria-describedby={error ? errorId : undefined}
        optionClassName={optionClassName}
        inputClassName={inputClassName}
        descriptionClassName={descriptionClassName}
        onValueChange={(value) => {
          field.onChange(value);
          onValueChange?.(value);
        }}
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
