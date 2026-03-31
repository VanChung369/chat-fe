import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { AppRoutes } from "@/shared/constants";
import VerifyForm from "@/features/auth/verify/VerifyForm";

interface VerifyPageProps {
  searchParams: Promise<{ email?: string }>;
}

export async function generateMetadata() {
  const t = await getTranslations("AuthVerify");
  return {
    title: t("title"),
  };
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect(AppRoutes.signup);
  }

  return <VerifyForm email={email} />;
}
