"use client";

import type { SubmitHandler, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Form, FormInput, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import { AppRoutes } from "@/shared/constants";
import { createSignUpSchema, type SignUpFormValues } from "../schema";
import { Lock, Mail, ShieldCheck, User } from "lucide-react";
import { authApi } from "../api/auth-api";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

/**
 * SignUpForm handles user registration with automatic validation
 * and real-time accessibility updates.
 */
const SignUpForm = () => {
  const t = useTranslations("AuthSignup");
  const tCommon = useTranslations("Common");
  const router = useRouter();

  const options: UseFormProps<SignUpFormValues> = {
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    try {
      const { confirmPassword, ...registerData } = values;
      await authApi.signUp(registerData);

      toast.success(t("feedback.success", { email: values.email }));
      // Redirect to verification page with email in query
      router.push(`${AppRoutes.verify}?email=${encodeURIComponent(values.email)}`);
    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.error(error.message || tCommon("unexpectedError"));
    }
  };

  return (
    <section className="w-full max-w-lg p-6">
      <header className="animate-fade-in-up mb-6 space-y-2 delay-200">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{t("title")}</h1>
        <p className="text-sm text-zinc-400">{t("description")}</p>
      </header>

      <Form<SignUpFormValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {() => (
          <div className="grid grid-cols-12 gap-6">
            <div className="animate-fade-in-up col-span-12 delay-300">
              <FormInput<SignUpFormValues>
                autoComplete="username"
                label={t("fields.username")}
                name="username"
                placeholder={t("placeholders.username")}
                className="bg-surface-input/50"
                startIcon={<User size={20} />}
              />
            </div>
            <div className="animate-fade-in-up col-span-6 delay-400">
              <FormInput<SignUpFormValues>
                autoComplete="given-name"
                label={t("fields.firstName")}
                name="firstName"
                placeholder={t("placeholders.firstName")}
                className="bg-surface-input/50"
                startIcon={<User size={20} />}
              />
            </div>
            <div className="animate-fade-in-up col-span-6 delay-400">
              <FormInput<SignUpFormValues>
                autoComplete="family-name"
                label={t("fields.lastName")}
                name="lastName"
                placeholder={t("placeholders.lastName")}
                className="bg-surface-input/50"
                startIcon={<User size={20} />}
              />
            </div>
            <div className="animate-fade-in-up col-span-12 delay-500">
              <FormInput<SignUpFormValues>
                autoComplete="email"
                label={t("fields.email")}
                name="email"
                placeholder={t("placeholders.email")}
                className="bg-surface-input/50"
                type="email"
                startIcon={<Mail size={20} />}
              />
            </div>

            <div className="animate-fade-in-up col-span-6 delay-600">
              <FormInputPassword<SignUpFormValues>
                autoComplete="new-password"
                label={t("fields.password")}
                name="password"
                placeholder={t("placeholders.password")}
                className="bg-surface-input/50"
                startIcon={<Lock size={20} />}
              />
            </div>
            <div className="animate-fade-in-up col-span-6 delay-600">
              <FormInputPassword<SignUpFormValues>
                autoComplete="new-password"
                label={t("fields.confirmPassword")}
                name="confirmPassword"
                placeholder={t("placeholders.confirmPassword")}
                className="bg-surface-input/50"
                startIcon={<ShieldCheck size={20} />}
              />
            </div>

            <div className="animate-fade-in-up col-span-12 delay-700">
              <FormSubmitButton className="mt-2 w-full" pendingText={t("actions.submitting")}>
                {t("actions.submit")}
              </FormSubmitButton>
            </div>
          </div>
        )}
      </Form>
      <div className="relative flex items-center py-5">
        <div className="grow border-t border-slate-200 dark:border-[#324467]"></div>
      </div>
      <p className="animate-fade-in-up text-center text-sm text-zinc-400 delay-800">
        {t("loginPrompt")}{" "}
        <Link
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          href={AppRoutes.login}
        >
          {t("loginLink")}
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
