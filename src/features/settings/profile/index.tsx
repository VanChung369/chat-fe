"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type SubmitHandler, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

import { useAuthCtx } from "@/providers/AuthProvider";
import { profileApi } from "@/features/settings/api";
import { Form } from "@/shared/components/form";
import type { ErrorResponse } from "@/shared/types/errors";
import { cn } from "@/shared/utils";

import {
  ContactInfoSection,
  GeneralInfoSection,
  MobileBreadcrumb,
  PreferencesSection,
  ProfileHeader,
  StatusSection,
} from "./components";
import { AVATAR_IMAGE_URL, BANNER_IMAGE_URL } from "./constants/constants";
import { createProfileSchema } from "./schema";
import { buildInitialProfileState } from "./state/profile-state";
import type { ProfileFormValues, UpdateProfileField } from "./types/types";

type TranslationFn = ReturnType<typeof useTranslations>;

type ProfileFormContentProps = {
  methods: UseFormReturn<ProfileFormValues>;
  savedState: ProfileFormValues;
  setSavedState: (state: ProfileFormValues) => void;
  avatarFile: File | null;
  bannerFile: File | null;
  avatarImageUrl: string;
  bannerImageUrl: string;
  setAvatarFile: (file: File | null) => void;
  setBannerFile: (file: File | null) => void;
  updateAuthUser: ReturnType<typeof useAuthCtx>["updateAuthUser"];
  t: TranslationFn;
  tCommon: TranslationFn;
};

function ProfileFormContent({
  methods,
  savedState,
  setSavedState,
  avatarFile,
  bannerFile,
  avatarImageUrl,
  bannerImageUrl,
  setAvatarFile,
  setBannerFile,
  updateAuthUser,
  t,
  tCommon,
}: ProfileFormContentProps) {
  const form = methods.watch();
  const hasChanges = methods.formState.isDirty || !!avatarFile || !!bannerFile;
  const fullName = form.displayName.trim() || t("placeholders.displayName");

  const updateField: UpdateProfileField = (key, value) => {
    methods.setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleCancel = () => {
    methods.reset(savedState);
    setAvatarFile(null);
    setBannerFile(null);
    toast.info(t("toasts.discarded"));
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    try {
      const updatedUser = await profileApi.updateMe({
        about: values.about,
        avatar: avatarFile,
        banner: bannerFile,
      });
      updateAuthUser(updatedUser);

      const nextState = buildInitialProfileState(updatedUser);
      setSavedState(nextState);
      setAvatarFile(null);
      setBannerFile(null);
      methods.reset(nextState);

      toast.success(t("toasts.saved"));
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || tCommon("unexpectedError"));
    }
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
          fullName={fullName}
          username={form.username}
          jobTitle={form.jobTitle}
          hasChanges={hasChanges}
          avatarImageUrl={avatarImageUrl}
          bannerImageUrl={bannerImageUrl}
          onSave={methods.handleSubmit(onSubmit)}
          onCancel={handleCancel}
          onAvatarSelect={setAvatarFile}
          onBannerSelect={setBannerFile}
        />

        <div className={cn("px-4 pb-8 md:px-8 md:pb-10 lg:px-12")}>
          <div className={cn("grid grid-cols-1 gap-10 md:gap-12 xl:grid-cols-12")}>
            <div className={cn("flex flex-col gap-8 md:gap-10 xl:col-span-8")}>
              <GeneralInfoSection form={form} onUpdateField={updateField} />
              <ContactInfoSection form={form} onUpdateField={updateField} />
            </div>

            <div className={cn("flex flex-col gap-8 md:gap-10 xl:col-span-4")}>
              <StatusSection form={form} onUpdateField={updateField} />
              <PreferencesSection form={form} onUpdateField={updateField} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function SettingsProfileFeature() {
  const t = useTranslations("SettingsProfile");
  const tCommon = useTranslations("Common");
  const { user, updateAuthUser } = useAuthCtx();

  const initialState = buildInitialProfileState(user);
  const [savedState, setSavedState] = useState<ProfileFormValues>(initialState);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);

  const avatarImageUrl = avatarPreviewUrl || user?.profile?.avatar || AVATAR_IMAGE_URL;
  const bannerImageUrl = bannerPreviewUrl || user?.profile?.banner || BANNER_IMAGE_URL;

  useEffect(() => {
    setSavedState(initialState);
  }, [initialState]);

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(avatarFile);
    setAvatarPreviewUrl(nextUrl);

    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [avatarFile]);

  useEffect(() => {
    if (!bannerFile) {
      setBannerPreviewUrl(null);
      return;
    }

    const nextUrl = URL.createObjectURL(bannerFile);
    setBannerPreviewUrl(nextUrl);

    return () => {
      URL.revokeObjectURL(nextUrl);
    };
  }, [bannerFile]);

  const options: UseFormProps<ProfileFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createProfileSchema(t)),
    defaultValues: initialState,
  };

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <Form<ProfileFormValues>
          key={JSON.stringify(initialState)}
          onSubmit={() => {}}
          options={options}
          className="w-full"
        >
          {(methods) => (
            <ProfileFormContent
              methods={methods}
              savedState={savedState}
              setSavedState={setSavedState}
              avatarFile={avatarFile}
              bannerFile={bannerFile}
              avatarImageUrl={avatarImageUrl}
              bannerImageUrl={bannerImageUrl}
              setAvatarFile={setAvatarFile}
              setBannerFile={setBannerFile}
              updateAuthUser={updateAuthUser}
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
