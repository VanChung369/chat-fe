"use client";

import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormInput, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import {
  createForgotPasswordSchema,
  type ForgotPasswordValues,
} from "../schema/resetPasswordSchema";
import { Mail, ArrowLeft } from "lucide-react";
import { authApi } from "../api/auth-api";
import { toast } from "sonner";
import { parseError } from "@/shared/utils";
import { AuthHeader } from "../components/AuthHeader";

/**
 * ForgotPasswordForm allows users to request a password reset code via email.
 */
const ForgotPasswordForm = () => {
  const t = useTranslations("AuthForgotPassword");
  const router = useRouter();

  const options: UseFormProps<ForgotPasswordValues> = {
    mode: "onChange",
    resolver: zodResolver(createForgotPasswordSchema(t)),
    defaultValues: {
      email: "",
    },
  };

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async (values) => {
    try {
      await authApi.forgotPassword(values.email);
      toast.success(t("feedback.success"));
      // Redirect to reset password with email pre-filled
      router.push(pathWithQuery(AppRoutes.resetPassword, { email: values.email }));
    } catch (error) {
      toast.error(parseError(error, t("feedback.error")));
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <AuthHeader title={t("title")} description={t("description")} />

      <Form<ForgotPasswordValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {() => (
          <div className="space-y-6 text-left">
            <div className="animate-fade-in-up delay-300">
              <FormInput<ForgotPasswordValues>
                autoComplete="email"
                label={t("fields.email")}
                name="email"
                placeholder={t("placeholders.email")}
                className="bg-surface-input/50"
                type="email"
                startIcon={<Mail size={20} />}
              />
            </div>

            <div className="animate-fade-in-up pt-2 delay-400">
              <FormSubmitButton className="w-full" pendingText={t("actions.submitting")}>
                {t("actions.submit")}
              </FormSubmitButton>
            </div>
          </div>
        )}
      </Form>

      <div className="animate-fade-in-up relative flex items-center py-5 delay-500">
        <div className="grow border-t border-zinc-800"></div>
      </div>

      <p className="animate-fade-in-up text-center text-sm text-zinc-400 delay-600">
        <Link
          className="inline-flex items-center gap-2 font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          href={AppRoutes.login}
        >
          <ArrowLeft size={16} />
          {t("backToLogin")}
        </Link>
      </p>
    </section>
  );
};

export default ForgotPasswordForm;
