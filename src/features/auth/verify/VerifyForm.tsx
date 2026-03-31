"use client";

import { useState, useEffect, useEffectEvent, useRef } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormOtpInput, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes, pathWithQuery, RESEND_COOLDOWN } from "@/shared/constants";
import { createVerifySchema, type VerifyFormValues } from "../schema/verifySchema";
import { authApi } from "../api/auth-api";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/types/errors";
import { AuthHeader } from "../components/AuthHeader";

interface VerifyFormProps {
  email: string;
  autoResend?: boolean;
}

const VerifyForm = ({ email, autoResend }: VerifyFormProps) => {
  const t = useTranslations("AuthVerify");
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

  const hasResent = useRef(false);

  // Handle automatic resend logic from login redirect
  useEffect(() => {
    if (autoResend && !hasResent.current) {
      hasResent.current = true;
      handleResend();

      // Clean up the URL to prevent repeated resends
      const cleanPath = pathWithQuery(AppRoutes.verify, { email });
      router.replace(cleanPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoResend, email]);

  const options: UseFormProps<VerifyFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createVerifySchema(t)),
    defaultValues: {
      code: "",
    },
  };

  const onSubmit: SubmitHandler<VerifyFormValues> = async (values) => {
    try {
      await authApi.verifyEmail(email, values.code);
      toast.success(t("feedback.success"));
      // Successful verification -> Login
      router.push(pathWithQuery(AppRoutes.login, { verified: true }));
    } catch (error) {
      const err = error as ErrorResponse;
      console.error("Verification Error:", err);
      toast.error(err.message || t("feedback.error"));
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    try {
      await authApi.resendCode(email);
      !(autoResend && !hasResent.current) && toast.success(t("feedback.resendSuccess"));
      setCountdown(RESEND_COOLDOWN);
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || t("feedback.resendError"));
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <AuthHeader title={t("title")} description={t("description", { email })} />

      <Form<VerifyFormValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {({ control }) => (
          <div className="space-y-4 text-left">
            <div className="animate-fade-in-up">
              <FormOtpInput<VerifyFormValues>
                control={control}
                label={t("fields.code")}
                name="code"
              />
            </div>

            <div className="animate-fade-in-up pt-2">
              <FormSubmitButton className="w-full" pendingText={t("actions.submitting")}>
                {t("actions.submit")}
              </FormSubmitButton>
            </div>
          </div>
        )}
      </Form>

      <div className="animate-fade-in-up mt-4 flex items-center gap-2">
        <p className="text-sm text-zinc-400">{t("didntReceiveCode")}</p>
        <button
          onClick={handleResend}
          disabled={countdown > 0}
          className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("actions.resend")} {countdown > 0 && `(${countdown}s)`}
        </button>
      </div>
    </section>
  );
};

export default VerifyForm;
