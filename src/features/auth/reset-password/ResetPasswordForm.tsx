"use client";

import { useState, useEffect, useEffectEvent } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormOtpInput, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes, pathWithQuery, RESEND_COOLDOWN } from "@/shared/constants";
import { createResetPasswordSchema, type ResetPasswordValues } from "../schema/resetPasswordSchema";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import { authApi } from "../api/auth-api";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/types/errors";
import { AuthHeader } from "../components/AuthHeader";

interface ResetPasswordFormProps {
  email: string;
}

/**
 * ResetPasswordForm allows users to set a new password using a 6-digit reset code.
 */
const ResetPasswordForm = ({ email }: ResetPasswordFormProps) => {
  const t = useTranslations("AuthResetPassword");
  const tVerify = useTranslations("AuthVerify");
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);

  const onTick = useEffectEvent(() => {
    setCountdown((c) => c - 1);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const options: UseFormProps<ResetPasswordValues> = {
    mode: "onChange",
    resolver: zodResolver(createResetPasswordSchema(t)),
    defaultValues: {
      email,
      code: "",
      newPassword: "",
      confirmPassword: "",
    },
  };

  const onSubmit: SubmitHandler<ResetPasswordValues> = async (values) => {
    try {
      await authApi.resetPassword(values);
      toast.success(t("feedback.success"));
      // Redirect to login after successful reset
      router.push(AppRoutes.login);
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || t("feedback.error"));
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await authApi.forgotPassword(email);
      toast.success(tVerify("feedback.resendSuccess"));
      setCountdown(RESEND_COOLDOWN);
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || tVerify("feedback.resendError"));
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <AuthHeader title={t("title")} description={t("description", { email })} />

      <Form<ResetPasswordValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {({ control }) => (
          <div className="space-y-6 text-left">
            <div className="animate-fade-in-up delay-300">
              <FormOtpInput<ResetPasswordValues>
                control={control}
                label={t("fields.code")}
                name="code"
              />
            </div>

            <div className="animate-fade-in-up delay-400">
              <FormInputPassword<ResetPasswordValues>
                autoComplete="new-password"
                label={t("fields.password")}
                name="newPassword"
                placeholder={t("placeholders.password")}
                className="bg-surface-input/50"
                startIcon={<Lock size={20} />}
              />
            </div>

            <div className="animate-fade-in-up delay-500">
              <FormInputPassword<ResetPasswordValues>
                autoComplete="new-password"
                label={t("fields.confirmPassword")}
                name="confirmPassword"
                placeholder={t("placeholders.confirmPassword")}
                className="bg-surface-input/50"
                startIcon={<ShieldCheck size={20} />}
              />
            </div>

            <div className="animate-fade-in-up pt-2 delay-600">
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
      <div className="animate-fade-in-up mt-4 flex flex-col items-center justify-between gap-2 delay-700">
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">{tVerify("didntReceiveCode")}</p>
          <button
            onClick={handleResend}
            disabled={countdown > 0}
            className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {tVerify("actions.resend")} {countdown > 0 && `(${countdown}s)`}
          </button>
        </div>

        <Link
          className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          href={pathWithQuery(AppRoutes.forgotPassword, { email })}
        >
          <ArrowLeft size={16} />
          {tVerify("actions.backToForgotPassword")}
        </Link>
      </div>
    </section>
  );
};

export default ResetPasswordForm;
