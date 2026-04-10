"use client";

import type { ReactNode } from "react";
import { useController, useFormContext, type FieldValues, type Path } from "react-hook-form";

import { cn } from "@/shared/utils";

import { ImageUpload } from "@/shared/components/image-upload";

type FormImageUploadProps<T extends FieldValues> = {
  name: Path<T>;
  imageUrl: string;
  containerClassName: string;
  overlayClassName?: string;
  buttonClassName: string;
  buttonContent: ReactNode;
  ariaLabel?: string;
  isUploading?: boolean;
  disabled?: boolean;
  allowedTypes?: string[];
  maxSizeBytes?: number;
  onSelect: (file: File) => void | Promise<void>;
};

export function FormImageUpload<T extends FieldValues>({
  name,
  imageUrl,
  containerClassName,
  overlayClassName,
  buttonClassName,
  buttonContent,
  ariaLabel,
  isUploading = false,
  disabled = false,
  allowedTypes,
  maxSizeBytes,
  onSelect,
}: FormImageUploadProps<T>) {
  const { control, clearErrors, setError } = useFormContext<T>();
  const {
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="flex flex-col gap-1">
      <ImageUpload
        imageUrl={imageUrl}
        containerClassName={containerClassName}
        overlayClassName={overlayClassName}
        buttonClassName={buttonClassName}
        buttonContent={buttonContent}
        ariaLabel={ariaLabel}
        isUploading={isUploading}
        disabled={disabled}
        allowedTypes={allowedTypes}
        maxSizeBytes={maxSizeBytes}
        onValidationError={(message) => {
          setError(name, { type: "manual", message });
        }}
        onSelect={async (file) => {
          clearErrors(name);
          await onSelect(file);
        }}
      />

      {error?.message && (
        <p className={cn("text-sm font-medium", "text-red-500 dark:text-red-400")}>
          {error.message}
        </p>
      )}
    </div>
  );
}
