import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import VerifyForm from "@/features/auth/verify/VerifyForm";

interface VerifyPageProps {
  searchParams: Promise<{ email?: string }>;
}

export async function generateMetadata({ searchParams }: VerifyPageProps) {
  const t = await getTranslations("AuthVerify");
  return {
    title: t("title"),
  };
}

export default async function VerifyPage({ searchParams }: VerifyPageProps) {
  const { email } = await searchParams;

  if (!email) {
    redirect("/signup");
  }

  return <VerifyForm email={email} />;
}
