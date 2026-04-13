"use client";

import { cn } from "@/shared/utils/cn";
import {
  get,
  useController,
  useFormContext,
  useFormState,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";
import { Checkbox } from "@/shared/components/input";

export interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  errorClassName?: string;
  disabled?: boolean;
}

export function FormCheckbox<T extends FieldValues>({
  name,
  label,
  description,
  rules,
  containerClassName,
  labelClassName,
  descriptionClassName,
  errorClassName,
  disabled,
}: FormCheckboxProps<T>) {
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
  const inputId = name as string;
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      <Checkbox
        id={inputId}
        ref={field.ref}
        checked={Boolean(field.value)}
        onBlur={field.onBlur}
        onChange={(event) => field.onChange(event.target.checked)}
        disabled={disabled}
        error={!!error}
        aria-describedby={error ? errorId : undefined}
        label={label}
        description={description}
        labelClassName={labelClassName}
        descriptionClassName={descriptionClassName}
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
