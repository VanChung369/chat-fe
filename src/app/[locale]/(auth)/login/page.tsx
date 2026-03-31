import { LoginForm } from "@/features/auth";
import { getTranslations } from "next-intl/server";

/**
 * Login Page Route.
 */

export async function generateMetadata() {
  const t = await getTranslations("AuthLogin");
  return {
    title: t("title"),
  };
}

export default function LoginPage() {
  return <LoginForm />;
}
