import { useTranslations } from "next-intl";
import { BadgeCheck, Camera, Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/shared/utils";
import { FormImageUpload } from "@/shared/components/form";
import { AVATAR_IMAGE_URL, BANNER_IMAGE_URL } from "../constants/constants";
import type { ProfileFormValues } from "../types/types";

type ProfileHeaderProps = {
  fullName: string;
  username: string;
  jobTitle: string;
  hasChanges: boolean;
  isAvatarUploading: boolean;
  isBannerUploading: boolean;
  isSaving: boolean;
  onCancel: () => void;
  onAvatarSelect: (file: File) => void | Promise<void>;
  onBannerSelect: (file: File) => void | Promise<void>;
};

export function ProfileHeader({
  fullName,
  username,
  jobTitle,
  hasChanges,
  isAvatarUploading,
  isBannerUploading,
  isSaving,
  onCancel,
  onAvatarSelect,
  onBannerSelect,
}: ProfileHeaderProps) {
  "use no memo";
  const t = useTranslations("SettingsProfile");
  const { watch } = useFormContext<ProfileFormValues>();
  const avatarUrl = watch("avatarUrl");
  const bannerUrl = watch("bannerUrl");
  const displayUsername = username || t("placeholders.username");
  const metaLine = [`@${displayUsername}`, jobTitle].filter(Boolean).join(" | ");

  return (
    <>
      <FormImageUpload<ProfileFormValues>
        name="bannerUrl"
        imageUrl={bannerUrl || BANNER_IMAGE_URL}
        containerClassName="h-44 w-full md:h-64 lg:h-68"
        buttonClassName={cn(
          "top-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium md:top-6 md:right-6 md:px-4",
          "border border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
        )}
        buttonContent={
          <>
            {isBannerUploading && <Loader2 className="size-4 animate-spin" />}
            {isBannerUploading ? t("actions.uploading") : t("actions.changeCover")}
          </>
        }
        isUploading={isBannerUploading}
        onSelect={onBannerSelect}
      />

      <div className={cn("relative px-4 pb-8 md:px-8 md:pb-10 lg:px-12")}>
        <div className={cn("flex flex-col items-start gap-6 md:flex-row md:gap-8")}>
          <FormImageUpload<ProfileFormValues>
            name="avatarUrl"
            imageUrl={avatarUrl || AVATAR_IMAGE_URL}
            containerClassName={cn(
              "-mt-20 size-32 rounded-full border-4 shadow-xl md:size-36 lg:size-40",
              "border-surface-light dark:border-surface-dark"
            )}
            overlayClassName="rounded-full"
            buttonClassName={cn(
              "right-1 bottom-1 rounded-full border-4 p-2.5 text-white shadow-lg md:p-3",
              "bg-primary hover:bg-blue-600",
              "border-surface-light dark:border-surface-dark"
            )}
            buttonContent={<Camera />}
            ariaLabel={`Avatar của ${fullName}`}
            isUploading={isAvatarUploading}
            onSelect={onAvatarSelect}
          />

          <div className={cn("flex-1 pt-2 md:pt-4 lg:pt-6")}>
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-6"
              )}
            >
              <div>
                <h2
                  className={cn(
                    "flex items-center gap-2.5 text-2xl font-bold md:gap-3 md:text-3xl",
                    "text-gray-900 dark:text-white"
                  )}
                >
                  {fullName}
                  <BadgeCheck color="blue" />
                </h2>
                {metaLine ? (
                  <p
                    className={cn(
                      "mt-1 text-base font-medium md:text-lg",
                      "text-text-secondary-light dark:text-text-secondary-dark"
                    )}
                  >
                    {metaLine}
                  </p>
                ) : null}
              </div>

              <div className={cn("flex w-full gap-3 md:w-auto md:gap-4")}>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={!hasChanges || isSaving || isAvatarUploading || isBannerUploading}
                  className={cn(
                    "flex-1 rounded-lg border px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:px-6",
                    "border-border-light text-gray-900 hover:bg-gray-100",
                    "dark:border-border-dark dark:hover:bg-background-dark dark:text-white"
                  )}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={!hasChanges || isSaving || isAvatarUploading || isBannerUploading}
                  className={cn(
                    "flex-1 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:px-8",
                    "bg-primary shadow-lg shadow-blue-500/20 hover:bg-blue-600"
                  )}
                >
                  {isSaving ? t("actions.savingChanges") : t("actions.saveChanges")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={cn("my-8 h-px w-full md:my-10", "bg-border-light dark:bg-border-dark")} />
      </div>
    </>
  );
}
