"use client";

import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";
import { Form, FormInput, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import {
  AppRoutes,
  mapHttpStatusToResponse,
  pathWithQuery,
  STATUS_RESPONSE,
} from "@/shared/constants";
import { createLoginSchema, type LoginFormValues } from "../schema/loginSchema";
import { Mail, Lock } from "lucide-react";
import { authApi } from "../api/auth-api";
import { toast } from "sonner";
import { parseError } from "@/shared/utils";
import { AuthHeader } from "../components/AuthHeader";
import { useAuthCtx } from "@/providers/AuthProvider";
import { ErrorResponse } from "@/shared/types";

/**
 * LoginForm component with automatic redirect for unverified accounts.
 */
const LoginForm = () => {
  const t = useTranslations("AuthLogin");
  const router = useRouter();
  const { refreshAuthUser } = useAuthCtx();

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
      await refreshAuthUser();
      toast.success(t("feedback.loginSuccess"));
      router.push(AppRoutes.home);
    } catch (error) {
      const err = error as ErrorResponse;

      // Handle unverified account redirect
      if (mapHttpStatusToResponse(err.cause.statusCode) === STATUS_RESPONSE.FORBIDDEN) {
        toast.info(t("feedback.unverified"));
        router.push(pathWithQuery(AppRoutes.verify, { email: values.email, resend: true }));
        return;
      }

      const message = parseError(err, t("feedback.invalidCredentials"), true);

      toast.error(message);
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
