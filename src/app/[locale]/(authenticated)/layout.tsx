import { AuthenticatedRoute } from "@/shared/components/auth";
import { PrivateLayout } from "@/shared/layouts";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthenticatedRoute>
      <PrivateLayout>{children}</PrivateLayout>
    </AuthenticatedRoute>
  );
}
