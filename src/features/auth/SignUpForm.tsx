"use client";

import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Form, FormInput, FormSubmitButton } from "@/shared/components";

type SignUpFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const t = useTranslations("AuthSignup");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");

  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 350));
    setSubmittedEmail(values.email);
  };

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-700/70 bg-zinc-900/70 p-6 shadow-xl shadow-zinc-950/30 backdrop-blur">
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{t("title")}</h1>
        <p className="text-sm text-zinc-400">{t("description")}</p>
      </header>

      <Form<SignUpFormValues>
        className="space-y-4"
        onSubmit={onSubmit}
        options={{
          mode: "onBlur",
          reValidateMode: "onBlur",
          defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
          },
        }}
      >
        {(methods) => (
          <>
            <FormInput<SignUpFormValues>
              autoComplete="name"
              label={t("fields.fullName")}
              labelClassName="text-zinc-200"
              name="fullName"
              placeholder={t("placeholders.fullName")}
              rules={{
                required: t("errors.fullNameRequired"),
                minLength: { value: 2, message: t("errors.fullNameMin") },
              }}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
            />

            <FormInput<SignUpFormValues>
              autoComplete="email"
              label={t("fields.email")}
              labelClassName="text-zinc-200"
              name="email"
              placeholder={t("placeholders.email")}
              rules={{
                required: t("errors.emailRequired"),
                pattern: { value: /^\S+@\S+\.\S+$/, message: t("errors.emailInvalid") },
              }}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
              type="email"
            />

            <FormInput<SignUpFormValues>
              autoComplete="new-password"
              label={t("fields.password")}
              labelClassName="text-zinc-200"
              name="password"
              placeholder={t("placeholders.password")}
              rules={{
                required: t("errors.passwordRequired"),
                minLength: { value: 8, message: t("errors.passwordMin") },
              }}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
              type="password"
            />

            <FormInput<SignUpFormValues>
              autoComplete="new-password"
              label={t("fields.confirmPassword")}
              labelClassName="text-zinc-200"
              name="confirmPassword"
              placeholder={t("placeholders.confirmPassword")}
              rules={{
                required: t("errors.confirmPasswordRequired"),
                validate: (value) =>
                  value === methods.getValues("password") || t("errors.passwordMismatch"),
              }}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
              type="password"
            />

            <FormSubmitButton
              className="mt-2 w-full bg-indigo-500 hover:bg-indigo-400"
              pendingText={t("actions.submitting")}
            >
              {t("actions.submit")}
            </FormSubmitButton>
          </>
        )}
      </Form>

      {submittedEmail ? (
        <p className="mt-4 rounded-md border border-emerald-600/60 bg-emerald-600/15 px-3 py-2 text-sm text-emerald-300">
          {t("feedback.success", { email: submittedEmail })}
        </p>
      ) : null}

      <p className="mt-5 text-sm text-zinc-400">
        {t("loginPrompt")}{" "}
        <Link className="font-medium text-indigo-300 hover:text-indigo-200" href="/login">
          {t("loginLink")}
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
