"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { type FieldValues } from "react-hook-form";
import { FormInput, type FormInputProps } from "./FormInput";

/**
 * Specialized Password Input component with built-in visibility toggle.
 */
export function FormInputPassword<T extends FieldValues>(props: FormInputProps<T>) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <FormInput
      {...props}
      type={isVisible ? "text" : "password"}
      endIcon={
        <button
          type="button"
          onClick={toggleVisibility}
          className="flex h-full items-center justify-center focus:outline-none"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      }
    />
  );
}
