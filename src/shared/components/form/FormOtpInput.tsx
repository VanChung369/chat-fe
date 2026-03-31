"use client";

import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";
import {
  useRef,
  type KeyboardEvent,
  type ClipboardEvent,
  type ChangeEvent,
  useState,
  useEffect,
} from "react";
import { cn } from "@/shared/utils/cn";

interface FormOtpInputProps<T extends FieldValues> extends UseControllerProps<T> {
  label?: string;
  className?: string;
  containerClassName?: string;
}

/**
 * A premium 6-digit OTP input component integrated with react-hook-form.
 * Features auto-focus, backspace logic, and numeric-only input.
 */
export function FormOtpInput<T extends FieldValues>({
  name,
  control,
  label,
  className,
  containerClassName,
  ...props
}: FormOtpInputProps<T>) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control, ...props });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isComposing = useRef(false);
  const length = 6;
  const [digits, setDigits] = useState<string[]>(new Array(length).fill(""));

  // Sync internal state with RHF value
  useEffect(() => {
    const valString = (value || "").toString();
    const newDigits = valString.split("").slice(0, length);
    while (newDigits.length < length) newDigits.push("");
    setDigits(newDigits);
  }, [value]);

  const updateValue = (newDigits: string[]) => {
    const newValue = newDigits.join("");
    setDigits(newDigits);
    onChange(newValue);
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
  };

  const handleCompositionEnd = (index: number, e: any) => {
    isComposing.current = false;
    // Trigger the change manually if needed after composition ends
    handleChange(index, e);
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Allow only digits
    if (!/^\d*$/.test(val)) return;

    // Use the last character if multiple are entered
    const char = val.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    updateValue(newDigits);

    // Auto-focus move forward - ONLY if not composing (IME)
    if (char && index < length - 1 && !isComposing.current) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        // If current is empty, focus previous and clear it
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        updateValue(newDigits);
      } else if (digits[index]) {
        // If current has value, clear it
        const newDigits = [...digits];
        newDigits[index] = "";
        updateValue(newDigits);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Only accept numeric codes
    if (!/^\d+$/.test(pastedData)) return;

    const pastedDigits = pastedData.split("").slice(0, length);
    const newDigits = [...digits];

    pastedDigits.forEach((digit, i) => {
      if (i < length) newDigits[i] = digit;
    });

    updateValue(newDigits);

    // Focus the next available empty input or the last one
    const nextIndex = Math.min(pastedDigits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className={cn("flex flex-col gap-3", containerClassName)}>
      {label && (
        <label className="text-sm font-semibold tracking-wide text-zinc-300">{label}</label>
      )}
      <div className="flex items-center justify-between gap-1.5">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            value={digit}
            autoComplete="one-time-code"
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={(e) => handleCompositionEnd(index, e)}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            onBlur={onBlur}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 text-center text-xl font-bold transition-all sm:h-14 sm:w-14",
              "focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 focus:outline-none",
              "hover:border-zinc-700",
              "placeholder:text-zinc-700",
              digit ? "border-indigo-500/30 bg-zinc-900/80 text-white" : "text-zinc-400",
              error
                ? "border-red-500/50 hover:border-red-500/50 focus:border-red-500/50 focus-visible:ring-red-400/50"
                : "",
              className
            )}
            maxLength={1}
          />
        ))}
      </div>
      {error && (
        <p className="animate-in fade-in slide-in-from-top-1 text-xs font-medium text-red-400 sm:text-sm">
          {error.message}
        </p>
      )}
    </div>
  );
}
