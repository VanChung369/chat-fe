import { AuthenticatedRoute } from "@/shared/components/auth";
import { PrivateLayout } from "@/shared/layouts";

export default async function AuthenticatedLayout({
  children,
  sidebar,
}: Readonly<{
  children: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <AuthenticatedRoute>
      <PrivateLayout sidebar={sidebar}>{children}</PrivateLayout>
    </AuthenticatedRoute>
  );
}
