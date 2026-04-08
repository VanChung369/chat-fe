"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { profileApi } from "@/features/settings/api";
import { Form } from "@/shared/components/form";
import { useAuthCtx } from "@/providers/AuthProvider";
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
import { buildInitialProfileState } from "./profile-state";
import { createProfileSchema } from "./schema";
import type { ProfileFormValues, UpdateProfileField } from "./types";

type TranslationFn = ReturnType<typeof useTranslations>;

type ProfileFormContentProps = {
  methods: UseFormReturn<ProfileFormValues>;
  savedState: ProfileFormValues;
  setSavedState: (state: ProfileFormValues) => void;
  updateAuthUser: ReturnType<typeof useAuthCtx>["updateAuthUser"];
  t: TranslationFn;
  tCommon: TranslationFn;
};

function ProfileFormContent({
  methods,
  savedState,
  setSavedState,
  updateAuthUser,
  t,
  tCommon,
}: ProfileFormContentProps) {
  const form = methods.watch();
  const hasChanges = methods.formState.isDirty;
  const fullName = form.displayName.trim() || t("placeholders.displayName");

  const updateField: UpdateProfileField = (key, value) => {
    methods.setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleCancel = () => {
    methods.reset(savedState);
    toast.info(t("toasts.discarded"));
  };

  const onSubmit: SubmitHandler<ProfileFormValues> = async (values) => {
    try {
      const updatedUser = await profileApi.updateMe(values);
      updateAuthUser(updatedUser);

      const nextState = buildInitialProfileState(updatedUser);
      setSavedState(nextState);
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
          onSave={methods.handleSubmit(onSubmit)}
          onCancel={handleCancel}
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

export default function Profile() {
  const t = useTranslations("SettingsProfile");
  const tCommon = useTranslations("Common");
  const { user, updateAuthUser } = useAuthCtx();

  const initialState = useMemo(() => buildInitialProfileState(user), [user]);
  const [savedState, setSavedState] = useState<ProfileFormValues>(initialState);

  useEffect(() => {
    setSavedState(initialState);
  }, [initialState]);

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
