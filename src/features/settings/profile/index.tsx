"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { type SubmitHandler, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { profileApi } from "@/features/settings/api";
import { useAuthCtx } from "@/providers/AuthProvider";
import { Form } from "@/shared/components/form";
import type { ErrorResponse } from "@/shared/types/errors";
import { cn } from "@/shared/utils";

import { ProfileFormContent } from "./components";
import { useProfileMedia } from "./hooks/useProfileMedia";
import { createProfileSchema } from "./schema";
import { buildInitialProfileState } from "./state/profile-state";
import type { ProfileFormValues } from "./types/types";

export function SettingsProfileFeature() {
  const t = useTranslations("SettingsProfile");
  const tCommon = useTranslations("Common");
  const { user, updateAuthUser } = useAuthCtx();

  const initialState = buildInitialProfileState(user);
  const [savedState, setSavedState] = useState<ProfileFormValues>(initialState);
  const profileMedia = useProfileMedia({
    fallbackErrorMessage: tCommon("unexpectedError"),
  });

  const resetRef = useRef<UseFormReturn<ProfileFormValues>["reset"] | null>(null);

  const options: UseFormProps<ProfileFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: initialState,
  };

  useEffect(() => {
    const next = buildInitialProfileState(user);
    setSavedState(next);
  }, [user]);

  const handleSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    try {
      const updatedUser = await profileApi.updateProfile({
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        about: values.about,
        phone: values.phone,
        avatarUrl: values.avatarUrl || undefined,
        bannerUrl: values.bannerUrl || undefined,
        status: values.status,
        statusMessage: values.statusMessage,
        showOnlineStatus: values.showOnlineStatus,
      });
      const nextState = buildInitialProfileState(updatedUser);

      updateAuthUser(updatedUser);
      setSavedState(nextState);
      resetRef.current?.(nextState);

      toast.success(t("toasts.saved"));
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || tCommon("unexpectedError"));
    }
  };

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <Form<ProfileFormValues>
          key={user?.id}
          onSubmit={handleSubmit}
          options={options}
          className="w-full"
        >
          {(methods) => {
            resetRef.current = methods.reset;

            return (
              <ProfileFormContent
                methods={methods}
                savedState={savedState}
                isAvatarUploading={profileMedia.isAvatarUploading}
                isBannerUploading={profileMedia.isBannerUploading}
                onAvatarSelect={async (file) => {
                  const url = await profileMedia.uploadAvatar(file);
                  if (url) methods.setValue("avatarUrl", url, { shouldDirty: true });
                }}
                onBannerSelect={async (file) => {
                  const url = await profileMedia.uploadBanner(file);
                  if (url) methods.setValue("bannerUrl", url, { shouldDirty: true });
                }}
                t={t}
                tCommon={tCommon}
              />
            );
          }}
        </Form>
      </div>
    </div>
  );
}

export default SettingsProfileFeature;
