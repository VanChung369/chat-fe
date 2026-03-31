import { type ReactNode } from "react";
import { AuthenticatedRoute } from "@/shared/components/auth";
import { Sidebar } from "@/shared/layouts/private/Sidebar/Sidebar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthenticatedRoute>
      <div className="flex min-h-screen bg-[#010101] text-zinc-100">
        <Sidebar />
        <main className="flex-1 pl-20 sm:pl-24">
          <div className="mx-auto h-full w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </AuthenticatedRoute>
  );
};

export default PrivateLayout;
