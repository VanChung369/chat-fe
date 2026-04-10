import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/shared/utils";

import { BaseImageUpload } from "./BaseImageUpload";

type ImageUploadProps = {
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
  onValidationError?: (message: string) => void;
  onSelect: (file: File) => void | Promise<void>;
};

export function ImageUpload({
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
  onValidationError,
  onSelect,
}: ImageUploadProps) {
  return (
    <BaseImageUpload
      disabled={disabled || isUploading}
      allowedTypes={allowedTypes}
      maxSizeBytes={maxSizeBytes}
      onValidationError={onValidationError}
      onSelect={onSelect}
    >
      {({ disabled: isDisabled, openPicker }) => (
        <div
          className={cn("relative bg-cover bg-center", containerClassName)}
          style={{ backgroundImage: `url('${imageUrl}')` }}
          role={ariaLabel ? "img" : undefined}
          aria-label={ariaLabel}
        >
          {isUploading && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]",
                overlayClassName
              )}
            >
              <Loader2 className="animate-spin text-white" />
            </div>
          )}

          <button
            type="button"
            onClick={openPicker}
            disabled={isDisabled}
            aria-label={ariaLabel}
            className={cn(
              "absolute transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              buttonClassName
            )}
          >
            {buttonContent}
          </button>
        </div>
      )}
    </BaseImageUpload>
  );
}
