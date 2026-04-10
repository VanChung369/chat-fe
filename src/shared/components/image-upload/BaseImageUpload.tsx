"use client";

import { useRef } from "react";
import type { ReactNode, ChangeEvent } from "react";
import { useTranslations } from "next-intl";

import { IMAGE_UPLOAD_ALLOWED_TYPES, IMAGE_UPLOAD_MAX_SIZE_BYTES } from "@/shared/constants";

type BaseImageUploadRenderProps = {
  disabled: boolean;
  openPicker: () => void;
};

type BaseImageUploadProps = {
  accept?: string;
  disabled?: boolean;
  allowedTypes?: string[];
  maxSizeBytes?: number;
  onValidationError?: (message: string) => void;
  onSelect: (file: File) => void | Promise<void>;
  children: (props: BaseImageUploadRenderProps) => ReactNode;
};

export function BaseImageUpload({
  accept = "image/*",
  disabled = false,
  allowedTypes = IMAGE_UPLOAD_ALLOWED_TYPES,
  maxSizeBytes = IMAGE_UPLOAD_MAX_SIZE_BYTES,
  onValidationError,
  onSelect,
  children,
}: BaseImageUploadProps) {
  const t = useTranslations("ImageUpload");
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (disabled) {
      return;
    }

    inputRef.current?.click();
  };

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      const types = allowedTypes.map((type) => type.split("/")[1].toUpperCase()).join(", ");
      onValidationError?.(t("errors.invalidType", { types }));
      event.target.value = "";
      return;
    }

    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      onValidationError?.(t("errors.tooLarge", { maxMb }));
      event.target.value = "";
      return;
    }

    await onSelect(file);
    event.target.value = "";
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {children({
        disabled,
        openPicker,
      })}
    </>
  );
}
