"use client";

import type { SubmitHandler, UseFormProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Form, FormInput, FormSubmitButton } from "@/shared/components";
import { createSignUpSchema, type SignUpFormValues } from "./schema";

/**
 * SignUpForm handles user registration with automatic validation
 * and real-time accessibility updates.
 */
const SignUpForm = () => {
  const t = useTranslations("AuthSignup");

  const options: UseFormProps<SignUpFormValues> = {
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(createSignUpSchema(t)),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  };

  const onSubmit: SubmitHandler<SignUpFormValues> = async (values) => {
    // Artificial delay to simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 350));
    console.log("Registration Success:", values);
  };

  return (
    <section className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-md">
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">{t("title")}</h1>
        <p className="text-sm text-zinc-400">{t("description")}</p>
      </header>

      <Form<SignUpFormValues> className="space-y-4" onSubmit={onSubmit} options={options}>
        {() => (
          <>
            <FormInput<SignUpFormValues>
              autoComplete="username"
              label={t("fields.username")}
              name="username"
              placeholder={t("placeholders.username")}
              className="bg-zinc-950/50"
            />

            <FormInput<SignUpFormValues>
              autoComplete="given-name"
              label={t("fields.firstName")}
              name="firstName"
              placeholder={t("placeholders.firstName")}
              className="bg-zinc-950/50"
            />

            <FormInput<SignUpFormValues>
              autoComplete="family-name"
              label={t("fields.lastName")}
              name="lastName"
              placeholder={t("placeholders.lastName")}
              className="bg-zinc-950/50"
            />

            <FormInput<SignUpFormValues>
              autoComplete="email"
              label={t("fields.email")}
              name="email"
              placeholder={t("placeholders.email")}
              className="bg-zinc-950/50"
              type="email"
            />

            <FormInput<SignUpFormValues>
              autoComplete="new-password"
              label={t("fields.password")}
              name="password"
              placeholder={t("placeholders.password")}
              className="bg-zinc-950/50"
              type="password"
            />

            <FormSubmitButton className="mt-2 w-full" pendingText={t("actions.submitting")}>
              {t("actions.submit")}
            </FormSubmitButton>
          </>
        )}
      </Form>

      <p className="mt-5 text-sm text-zinc-400">
        {t("loginPrompt")}{" "}
        <Link
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          href="/login"
        >
          {t("loginLink")}
        </Link>
      </p>
    </section>
  );
};

export default SignUpForm;
