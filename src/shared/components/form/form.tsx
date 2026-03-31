"use client";

import { cn } from "@/shared/utils/cn";
import { type ButtonHTMLAttributes, type FormHTMLAttributes, type ReactNode } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useFormState,
  type FieldValues,
  type SubmitHandler,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";

// --- Types ---

type FormProps<T extends FieldValues> = Omit<
  FormHTMLAttributes<HTMLFormElement>,
  "onSubmit" | "children"
> & {
  onSubmit: SubmitHandler<T>;
  options?: UseFormProps<T>;
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
};

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

  // Touch the proxy to subscribe to errors, submission status, and other fields for reactivity
  void formState.errors;
  void formState.submitCount;
  void formState.isSubmitting;
  void formState.isValid;
  void formState.isDirty;

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
          <FormContent methods={methods}>{children}</FormContent>
        ) : (
          children
        )}
      </form>
    </FormProvider>
  );
}

export type FormSubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  pendingText?: string;
};

/**
 * Accessible Submit Button component with built-in loading state.
 */
export function FormSubmitButton({
  pendingText = "Submitting...",
  className,
  children,
  disabled,
  ...props
}: FormSubmitButtonProps) {
  const formContext = useFormContext();
  const { isSubmitting: isPending } = useFormState({ control: formContext.control });

  return (
    <button
      className={cn(
        "bg-primary shadow-primary/20 hover:bg-primary-hover inline-flex h-12 items-center justify-center rounded-lg px-8 py-2.5 text-base font-bold text-white shadow-lg transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100",
        className
      )}
      disabled={disabled || isPending}
      type="submit"
      {...props}
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {pendingText}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
