import { SignUpForm } from "@/features/auth";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("AuthSignup");
  return {
    title: t("title"),
  };
}

export default function SignUpPage() {
  return <SignUpForm />;
}
