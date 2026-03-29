"use client";

import { useMemo, useState } from "react";
import type { Resolver, SubmitHandler } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Form, FormInput, FormSubmitButton } from "@/shared/components";
import { createSignUpSchema, type SignUpFormValues } from "./schema";

const SignUpForm = () => {
  const t = useTranslations("AuthSignup");
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const signUpSchema = useMemo(
    () =>
      createSignUpSchema({
        usernameRequired: t("errors.usernameRequired"),
        usernameMin: t("errors.usernameMin"),
        usernameMax: t("errors.usernameMax"),
        firstNameRequired: t("errors.firstNameRequired"),
        firstNameMin: t("errors.firstNameMin"),
        firstNameMax: t("errors.firstNameMax"),
        lastNameRequired: t("errors.lastNameRequired"),
        lastNameMin: t("errors.lastNameMin"),
        lastNameMax: t("errors.lastNameMax"),
        emailRequired: t("errors.emailRequired"),
        emailInvalid: t("errors.emailInvalid"),
        passwordRequired: t("errors.passwordRequired"),
        passwordMin: t("errors.passwordMin"),
        passwordMax: t("errors.passwordMax"),
      }),
    [t]
  );
  const resolver = useMemo<Resolver<SignUpFormValues>>(
    () => async (values) => {
      const result = signUpSchema.safeParse(values);

      if (result.success) {
        return { values: result.data, errors: {} };
      }

      const errors = result.error.issues.reduce<Record<string, { type: string; message: string }>>(
        (acc, issue) => {
          const fieldName = issue.path[0];

          if (typeof fieldName !== "string" || acc[fieldName]) {
            return acc;
          }

          acc[fieldName] = {
            type: issue.code,
            message: issue.message,
          };

          return acc;
        },
        {}
      );

      return { values: {}, errors };
    },
    [signUpSchema]
  );

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
          resolver,
          defaultValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          },
        }}
      >
        {() => (
          <>
            <FormInput<SignUpFormValues>
              autoComplete="username"
              label={t("fields.username")}
              labelClassName="text-zinc-200"
              name="username"
              placeholder={t("placeholders.username")}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
            />

            <FormInput<SignUpFormValues>
              autoComplete="given-name"
              label={t("fields.firstName")}
              labelClassName="text-zinc-200"
              name="firstName"
              placeholder={t("placeholders.firstName")}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
            />

            <FormInput<SignUpFormValues>
              autoComplete="family-name"
              label={t("fields.lastName")}
              labelClassName="text-zinc-200"
              name="lastName"
              placeholder={t("placeholders.lastName")}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
            />

            <FormInput<SignUpFormValues>
              autoComplete="email"
              label={t("fields.email")}
              labelClassName="text-zinc-200"
              name="email"
              placeholder={t("placeholders.email")}
              className="border-zinc-600 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-400 focus:ring-indigo-500/30"
              type="email"
            />

            <FormInput<SignUpFormValues>
              autoComplete="new-password"
              label={t("fields.password")}
              labelClassName="text-zinc-200"
              name="password"
              placeholder={t("placeholders.password")}
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
