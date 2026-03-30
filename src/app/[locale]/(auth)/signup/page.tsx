import { SignUpForm } from "@/features/auth";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("AuthSignup");
  return {
    title: t("title"),
  };
}

const SignUpPage = () => {
  return <SignUpForm />;
};

export default SignUpPage;
