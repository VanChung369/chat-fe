"use client";

import {
  type ButtonHTMLAttributes,
  type FormHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
  type FieldValues,
  type Path,
  type RegisterOptions,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@/shared/utils/cn";

// --- Types ---

type FormProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> & {
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
};

interface FormInputProps<T extends FieldValues> extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "name"
> {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
}

// --- Helpers ---

function isRenderProp<T extends FieldValues>(
  children: FormProps<T>["children"]
): children is (methods: UseFormReturn<T>) => ReactNode {
  return typeof children === "function";
}

/**
 * A wrapper component that ensures render prop children correctly subscribe
 * to formState changes for re-renders.
 */
function FormContent<T extends FieldValues>({
  children,
  methods,
}: {
  children: (methods: UseFormReturn<T>) => ReactNode;
  methods: UseFormReturn<T>;
}) {
  const { formState } = useFormContext<T>();

  // Touch the proxy to subscribe to errors and submission count for reactivity
  void formState.errors;
  void formState.submitCount;

  return <>{children(methods)}</>;
}

// --- Components ---

/**
 * Enhanced Form Component with built-in accessibility and reactive render props.
 */
export function Form<T extends FieldValues>({
  onSubmit,
  options,
  children,
  className,
  ...props
}: FormProps<T>) {
  const methods = useForm<T>(options);

  return (
    <FormProvider {...methods}>
      <form
        className={cn("w-full", className)}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
        {...props}
      >
        {isRenderProp<T>(children) ? (
          <FormContent children={children} methods={methods} />
        ) : (
          children
        )}
      </form>
    </FormProvider>
  );
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
  ...props
}: FormInputProps<T>) {
  const { control, register } = useFormContext<T>();

  // useFormState(control, name) ensures only this input re-renders
  // when its specific error state changes.
  const { errors } = useFormState({
    control,
    name,
  });

  // Support for nested error paths (e.g. "profile.email")
  const error = name.split(".").reduce((acc: any, key) => acc?.[key], errors);

  const inputId = id || (name as string);
  const errorId = `${inputId}-error`;

  return (
    <div className={cn("flex flex-col gap-1.5", containerClassName)}>
      {label && (
        <label
          className={cn(
            "text-sm leading-none font-medium text-zinc-300 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            labelClassName
          )}
          htmlFor={inputId}
        >
          {label}
        </label>
      )}
      <input
        {...register(name, rules)}
        id={inputId}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "border-outline-variant bg-surface-input flex h-10 w-full rounded-md border px-3 py-2 text-sm text-zinc-100 ring-offset-zinc-950 transition-all placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
          error ? "border-red-500 focus-visible:ring-red-400" : ""
        )}
        {...props}
      />

      {error && typeof error.message === "string" ? (
        <p
          id={errorId}
          role="alert"
          className={cn(
            "animate-in fade-in slide-in-from-top-0.5 text-xs font-medium text-red-500 duration-200",
            errorClassName
          )}
        >
          {error.message}
        </p>
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
        "inline-flex h-10 items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
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
