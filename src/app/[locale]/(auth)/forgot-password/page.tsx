import { getTranslations } from "next-intl/server";
import { ForgotPasswordForm } from "@/features/auth";

export async function generateMetadata() {
  const t = await getTranslations("AuthForgotPassword");
  return {
    title: t("title"),
  };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
