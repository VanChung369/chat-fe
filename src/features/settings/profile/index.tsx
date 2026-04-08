"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type UseFormProps } from "react-hook-form";

import { useAuthCtx } from "@/providers/AuthProvider";
import { Form } from "@/shared/components/form";
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
    currentAvatarUrl: user?.profile?.avatar,
    currentBannerUrl: user?.profile?.banner,
    fallbackErrorMessage: tCommon("unexpectedError"),
  });

  useEffect(() => {
    setSavedState(buildInitialProfileState(user));
  }, [user]);

  const options: UseFormProps<ProfileFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: initialState,
  };

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <Form<ProfileFormValues>
          key={user?.id ?? "guest"}
          onSubmit={() => {}}
          options={options}
          className="w-full"
        >
          {(methods) => (
            <ProfileFormContent
              methods={methods}
              savedState={savedState}
              stagedAvatarUrl={profileMedia.stagedAvatarUrl}
              stagedBannerUrl={profileMedia.stagedBannerUrl}
              avatarImageUrl={profileMedia.avatarImageUrl}
              bannerImageUrl={profileMedia.bannerImageUrl}
              isAvatarUploading={profileMedia.isAvatarUploading}
              isBannerUploading={profileMedia.isBannerUploading}
              onAvatarSelect={profileMedia.selectAvatar}
              onBannerSelect={profileMedia.selectBanner}
              clearStagedImages={profileMedia.clearStagedImages}
              onProfileSaved={(updatedUser, nextState) => {
                updateAuthUser(updatedUser);
                setSavedState(nextState);
                profileMedia.clearStagedImages();
              }}
              t={t}
              tCommon={tCommon}
            />
          )}
        </Form>
      </div>
    </div>
  );
}

export default SettingsProfileFeature;
