import { toast } from "sonner";
import { useFormState, type UseFormReturn } from "react-hook-form";

import { cn } from "@/shared/utils";

import type { ProfileFormValues, UpdateProfileField } from "../types/types";
import { ContactInfoSection } from "./ContactInfoSection";
import { GeneralInfoSection } from "./GeneralInfoSection";
import { MobileBreadcrumb } from "./MobileBreadcrumb";
import { PreferencesSection } from "./PreferencesSection";
import { ProfileHeader } from "./ProfileHeader";
import { StatusSection } from "./StatusSection";

type TranslationFn = (key: string) => string;

type ProfileFormContentProps = {
  methods: UseFormReturn<ProfileFormValues>;
  savedState: ProfileFormValues;
  isAvatarUploading: boolean;
  isBannerUploading: boolean;
  onAvatarSelect: (file: File) => void | Promise<void>;
  onBannerSelect: (file: File) => void | Promise<void>;
  t: TranslationFn;
  tCommon: TranslationFn;
};

export function ProfileFormContent({
  methods,
  savedState,
  isAvatarUploading,
  isBannerUploading,
  onAvatarSelect,
  onBannerSelect,
  t,
}: ProfileFormContentProps) {
  const { isDirty, isSubmitting } = useFormState({
    control: methods.control,
  });

  const updateField: UpdateProfileField = (key, value) => {
    methods.setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleCancel = () => {
    methods.reset(savedState);
    toast.info(t("toasts.discarded"));
  };

  return (
    <>
      <MobileBreadcrumb />

      <div
        className={cn(
          "bg-surface-light",
          "dark:bg-surface-dark",
          "border-border-light",
          "dark:border-border-dark",
          "w-full overflow-hidden rounded-2xl border shadow-sm"
        )}
      >
        <ProfileHeader
          hasChanges={isDirty}
          isAvatarUploading={isAvatarUploading}
          isBannerUploading={isBannerUploading}
          isSaving={isSubmitting}
          onCancel={handleCancel}
          onAvatarSelect={onAvatarSelect}
          onBannerSelect={onBannerSelect}
        />

        <div className={cn("px-4 pb-8 md:px-8 md:pb-10 lg:px-12")}>
          <div className={cn("grid grid-cols-1 gap-10 md:gap-12 xl:grid-cols-12")}>
            <div className={cn("flex flex-col gap-8 md:gap-10 xl:col-span-8")}>
              <GeneralInfoSection onUpdateField={updateField} />
              <ContactInfoSection />
            </div>

            <div className={cn("flex flex-col gap-8 md:gap-10 xl:col-span-4")}>
              <StatusSection />
              <PreferencesSection />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
