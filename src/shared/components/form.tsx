"use client";

import type {
  ButtonHTMLAttributes,
  FormHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import type {
  FieldValues,
  Path,
  RegisterOptions,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { cn } from "@/shared/utils/cn";

type FormProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> & {
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
};

function isRenderProp<T extends FieldValues>(
  children: FormProps<T>["children"]
): children is (methods: UseFormReturn<T>) => ReactNode {
  return typeof children === "function";
}

export function Form<T extends FieldValues>({
  onSubmit,
  options,
  children,
  className,
  ...props
}: FormProps<T>) {
  const methods = useForm<T>(options);
  const content = isRenderProp<T>(children) ? children(methods) : children;

  return (
    <FormProvider {...methods}>
      <form className={className} onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {content}
      </form>
    </FormProvider>
  );
}

type FormInputProps<T extends FieldValues> = Omit<InputHTMLAttributes<HTMLInputElement>, "name"> & {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  rules,
  containerClassName,
  labelClassName,
  className,
  errorClassName,
  ...props
}: FormInputProps<T>) {
  const { formState, getFieldState, register } = useFormContext<T>();
  const fieldState = getFieldState(name, formState);

  return (
    <div className={cn("flex flex-col gap-2", containerClassName)}>
      {label ? (
        <label className={cn("text-sm font-medium text-zinc-800", labelClassName)} htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input
        className={cn(
          "w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 transition outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-100",
          fieldState.error ? "border-red-500 focus:border-red-500 focus:ring-red-100" : "",
          className
        )}
        id={name}
        {...register(name, rules)}
        {...props}
      />
      {fieldState.error ? (
        <p className={cn("text-xs text-red-600", errorClassName)}>{fieldState.error.message}</p>
      ) : null}
    </div>
  );
}

type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingText?: string;
};

export function FormSubmitButton({
  pendingText = "Submitting...",
  className,
  children,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  const { formState } = useFormContext();
  const isPending = formState.isSubmitting;

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      disabled={disabled || isPending}
      type="submit"
      {...props}
    >
      {isPending ? pendingText : children}
    </button>
  );
}
