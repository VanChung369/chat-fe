"use client";

import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormInput, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import { createLoginSchema, type LoginFormValues } from "../schema/loginSchema";
import { Mail, Lock } from "lucide-react";
import { authApi } from "../api/auth-api";
import { toast } from "sonner";
import { ErrorResponse } from "@/shared/types/errors";
import { AuthHeader } from "../components/AuthHeader";

/**
 * LoginForm component with automatic redirect for unverified accounts.
 */
const LoginForm = () => {
  const t = useTranslations("AuthLogin");
  const router = useRouter();

  const options: UseFormProps<LoginFormValues> = {
    mode: "onChange",
    resolver: zodResolver(createLoginSchema(t)),
    defaultValues: {
      email: "",
      password: "",
    },
  };

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      await authApi.login(values);
      toast.success(t("feedback.loginSuccess"));
      router.push(AppRoutes.home);
    } catch (error) {
      const err = error as ErrorResponse;
      console.error("Login Error:", err);

      // Handle unverified account redirect
      // Assuming backend return message "User not verified" or similar
      if (
        err.message?.toLowerCase().includes("verify") ||
        err.message?.toLowerCase().includes("verified")
      ) {
        toast.info(t("feedback.unverified"));
        router.push(pathWithQuery(AppRoutes.verify, { email: values.email, resend: true }));
        return;
      }

      toast.error(err.message || t("feedback.invalidCredentials"));
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <AuthHeader title={t("title")} description={t("description")} />

      <Form<LoginFormValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {() => (
          <div className="space-y-6 text-left">
            <div className="animate-fade-in-up delay-300">
              <FormInput<LoginFormValues>
                autoComplete="email"
                label={t("fields.email")}
                name="email"
                placeholder={t("placeholders.email")}
                className="bg-surface-input/50"
                type="email"
                startIcon={<Mail size={20} />}
              />
            </div>

            <div className="animate-fade-in-up delay-400">
              <FormInputPassword<LoginFormValues>
                autoComplete="current-password"
                label={t("fields.password")}
                inputBottomAction={
                  <div className="mt-1 flex justify-end">
                    <Link
                      href={AppRoutes.forgotPassword}
                      className="text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300"
                    >
                      {t("actions.forgotPassword")}
                    </Link>
                  </div>
                }
                name="password"
                placeholder={t("placeholders.password")}
                className="bg-surface-input/50"
                startIcon={<Lock size={20} />}
              />
            </div>

            <div className="animate-fade-in-up delay-500">
              <FormSubmitButton className="w-full" pendingText={t("actions.submitting")}>
                {t("actions.submit")}
              </FormSubmitButton>
            </div>
          </div>
        )}
      </Form>

      <div className="animate-fade-in-up relative flex items-center py-5 delay-600">
        <div className="grow border-t border-zinc-800"></div>
      </div>

      <p className="animate-fade-in-up text-center text-sm text-zinc-400 delay-700">
        {t("actions.signupPrompt")}{" "}
        <Link
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          href={AppRoutes.signup}
        >
          {t("actions.signupLink")}
        </Link>
      </p>
    </section>
  );
};

export default LoginForm;
