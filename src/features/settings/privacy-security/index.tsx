"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { authApi } from "@/features/auth/api/auth-api";
import { useRouter } from "@/i18n/navigation";
import { useAuthCtx } from "@/providers/AuthProvider";
import { Form, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import type { ErrorResponse } from "@/shared/types/errors";
import { cn, parseError } from "@/shared/utils";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";

import { INPUT_CLASSNAME } from "../profile/constants/constants";
import {
  createChangePasswordSchema,
  type ChangePasswordFormValues,
} from "./schema/changePasswordSchema";

export function SettingsPrivacySecurityFeature() {
  const t = useTranslations("SettingsPrivacySecurity");
  const tCommon = useTranslations("Common");
  const { updateAuthUser } = useAuthCtx();
  const router = useRouter();

  const options: UseFormProps<ChangePasswordFormValues> = {
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

  return (
    <div className={cn("w-full flex-1 overflow-y-auto")}>
      <div className={cn("w-full px-4 py-6 md:px-6 lg:px-8")}>
        <div
          className={cn(
            "bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark w-full overflow-hidden rounded-2xl border shadow-sm"
          )}
        >
          <div className="border-border-light dark:border-border-dark border-b px-5 py-6 md:px-8">
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-semibold uppercase tracking-[0.22em]">
              {t("eyebrow")}
            </p>
            <div className="mt-3 flex items-start gap-4">
              <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t("title")}</h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark max-w-2xl text-sm leading-6">
                  {t("description")}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-5 py-6 md:px-8 lg:grid-cols-[minmax(0,1.1fr)_320px]">
            <Form<ChangePasswordFormValues> onSubmit={handleSubmit} options={options} className="space-y-5">
              <FormInputPassword<ChangePasswordFormValues>
                autoComplete="current-password"
                className={INPUT_CLASSNAME}
                label={t("fields.currentPassword")}
                labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
                name="currentPassword"
                placeholder={t("placeholders.currentPassword")}
                required
              />

              <FormInputPassword<ChangePasswordFormValues>
                autoComplete="new-password"
                className={INPUT_CLASSNAME}
                label={t("fields.newPassword")}
                labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
                name="newPassword"
                placeholder={t("placeholders.newPassword")}
                required
              />

              <FormInputPassword<ChangePasswordFormValues>
                autoComplete="new-password"
                className={INPUT_CLASSNAME}
                label={t("fields.confirmPassword")}
                labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
                name="confirmPassword"
                placeholder={t("placeholders.confirmPassword")}
                required
              />

              <div className="pt-2">
                <FormSubmitButton pendingText={t("actions.submitting")}>
                  {t("actions.submit")}
                </FormSubmitButton>
              </div>
            </Form>

            <aside className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark space-y-4 rounded-2xl border p-5">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t("securityCard.title")}</h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm leading-6">
                {t("securityCard.description")}
              </p>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                <li>{t("securityCard.items.signOut")}</li>
                <li>{t("securityCard.items.length")}</li>
                <li>{t("securityCard.items.reuse")}</li>
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPrivacySecurityFeature;
