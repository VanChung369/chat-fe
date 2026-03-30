import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import VerifyForm from "@/features/auth/VerifyForm";

interface VerifyPageProps {
  searchParams: { email?: string };
}

export async function generateMetadata({ searchParams }: VerifyPageProps) {
  const t = await getTranslations("AuthVerify");
  return {
    title: t("title"),
  };
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const email = searchParams.email;

  if (!email) {
    redirect("/signup");
  }

  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center">
      <VerifyForm email={email as string} />
    </div>
  );
}
