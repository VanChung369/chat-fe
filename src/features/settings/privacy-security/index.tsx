"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/features/auth/api/auth-api";
import { useRouter } from "@/i18n/navigation";
import { useAuthCtx } from "@/providers/AuthProvider";
import type { ErrorResponse } from "@/shared/types/errors";
import { pathWithQuery } from "@/shared/constants";
import { AppRoutes } from "@/shared/constants";
import { parseError } from "@/shared/utils";
import { Mail, Monitor, Shield, Smartphone, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";

import {
  ActiveSessionsSection,
  DataManagementSection,
  PasswordManagementSection,
  PrivacySecurityHero,
  TwoFactorSection,
} from "./components";
import {
  createChangePasswordSchema,
  type ChangePasswordFormValues,
} from "./schema/changePasswordSchema";

type TwoFactorMethodId = "email" | "authenticator";

export function SettingsPrivacySecurityFeature() {
  const t = useTranslations("SettingsPrivacySecurity");
  const tCommon = useTranslations("Common");
  const { updateAuthUser } = useAuthCtx();
  const router = useRouter();

  const [twoFactorState, setTwoFactorState] = useState<Record<TwoFactorMethodId, boolean>>({
    email: true,
    authenticator: false,
  });

  const formOptions: UseFormProps<ChangePasswordFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createChangePasswordSchema(t)),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  };

  const handleSubmit: SubmitHandler<ChangePasswordFormValues> = async (values) => {
    try {
      await authApi.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      toast.success(t("toasts.passwordChanged"));
      updateAuthUser(null);
      router.push(pathWithQuery(AppRoutes.login, { reauth: "true" }));
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(parseError(err, tCommon("unexpectedError")));
    }
  };

  const twoFactorMethods = [
    {
      id: "email" as const,
      icon: Mail,
      title: t("twoFactor.methods.email.title"),
      enabled: twoFactorState.email,
    },
    {
      id: "authenticator" as const,
      icon: Shield,
      title: t("twoFactor.methods.authenticator.title"),
      enabled: twoFactorState.authenticator,
    },
  ];

  const sessions = [
    {
      id: "desktop",
      icon: Monitor,
      title: t("sessions.items.desktop.title"),
      description: t("sessions.items.desktop.description"),
      isCurrent: true,
    },
    {
      id: "mobile",
      icon: Smartphone,
      title: t("sessions.items.mobile.title"),
      description: t("sessions.items.mobile.description"),
      isCurrent: false,
    },
  ];

  const dataActions = [
    {
      id: "delete",
      icon: Trash2,
      title: t("dataManagement.delete.title"),
      description: t("dataManagement.delete.description"),
      actionLabel: t("actions.delete"),
      tone: "danger" as const,
    },
  ];

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="w-full px-4 py-6 md:px-6 lg:px-8">
        <div className="border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark relative overflow-hidden rounded-xl border shadow-sm">
          <div className="border-border-light dark:border-border-dark relative border-b px-5 py-6 md:px-8 lg:px-10">
            <PrivacySecurityHero
              eyebrow={t("eyebrow")}
              title={t("title")}
              description={t("description")}
              badge={t("badge")}
            />
          </div>

          <div className="relative px-5 py-6 md:px-8 lg:px-10">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              <PasswordManagementSection
                className="md:col-span-7"
                formOptions={formOptions}
                onSubmit={handleSubmit}
                title={t("password.title")}
                description={t("password.description")}
                labels={{
                  currentPassword: t("fields.currentPassword"),
                  newPassword: t("fields.newPassword"),
                  confirmPassword: t("fields.confirmPassword"),
                }}
                placeholders={{
                  currentPassword: t("placeholders.currentPassword"),
                  newPassword: t("placeholders.newPassword"),
                  confirmPassword: t("placeholders.confirmPassword"),
                }}
                submitLabel={t("actions.submit")}
                submittingLabel={t("actions.submitting")}
              />

              <TwoFactorSection
                className="md:col-span-5"
                title={t("twoFactor.title")}
                description={t("twoFactor.description")}
                enabledLabel={t("twoFactor.status.enabled")}
                disabledLabel={t("twoFactor.status.disabled")}
                methods={twoFactorMethods}
                onToggleMethod={(methodId, nextValue) =>
                  setTwoFactorState((prev) => ({
                    ...prev,
                    [methodId]: nextValue,
                  }))
                }
              />

              <ActiveSessionsSection
                className="md:col-span-12"
                title={t("sessions.title")}
                description={t("sessions.description")}
                actionLabel={t("actions.revokeAll")}
                currentBadgeLabel={t("sessions.currentBadge")}
                sessions={sessions}
              />
              <DataManagementSection className="md:col-span-12" actions={dataActions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPrivacySecurityFeature;
