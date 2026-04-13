import { GuestRoute } from "@/shared/components/auth";
import { PublicLayout } from "@/shared/layouts";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GuestRoute>
      <PublicLayout>{children}</PublicLayout>
    </GuestRoute>
  );
}
