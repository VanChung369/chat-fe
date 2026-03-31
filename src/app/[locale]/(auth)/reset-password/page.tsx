import { getTranslations } from "next-intl/server";
import { ResetPasswordForm } from "@/features/auth";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/shared/constants";

interface ResetPasswordPageProps {
  searchParams: Promise<{ email?: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations("AuthResetPassword");
  return {
    title: t("title"),
  };
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect(AppRoutes.forgotPassword);
  }

  return <ResetPasswordForm email={email} />;
}
