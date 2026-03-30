"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormInput, FormSubmitButton } from "@/shared/components/form";
import { createVerifySchema, type VerifyFormValues } from "../schema/verifySchema";
import { ShieldCheck } from "lucide-react";
import { authApi } from "../api/auth-api";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface VerifyFormProps {
  email: string;
}

const VerifyForm = ({ email }: VerifyFormProps) => {
  const t = useTranslations("AuthVerify");
  const router = useRouter();

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
      toast.success("Account verified successfully!");
      // Successful verification -> Login
      router.push("/login?verified=true");
    } catch (error: any) {
      console.error("Verification Error:", error);
      toast.error(error.message || "Invalid or expired code.");
    }
  };

  const handleResend = async () => {
    try {
      await authApi.resendCode(email);
      toast.success("Code resent successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to resend code.");
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <header className="animate-fade-in-up mb-8 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{t("title")}</h1>
        <p className="text-sm text-zinc-400">{t("description", { email })}</p>
      </header>

      <Form<VerifyFormValues> className="space-y-6" onSubmit={onSubmit} options={options}>
        {() => (
          <div className="space-y-4 text-left">
            <div className="animate-fade-in-up">
              <FormInput<VerifyFormValues>
                label={t("fields.code")}
                name="code"
                placeholder={t("placeholders.code")}
                className="bg-surface-input/50 text-center text-lg font-bold tracking-[0.5em]"
                startIcon={<ShieldCheck size={20} />}
                maxLength={6}
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

      <div className="animate-fade-in-up mt-8">
        <button
          onClick={handleResend}
          className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          {t("actions.resend")}
        </button>
      </div>
    </section>
  );
};

export default VerifyForm;
