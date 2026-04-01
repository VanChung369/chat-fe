import { type ReactNode } from "react";
import { Sidebar } from "@/shared/layouts/private/Sidebar/Sidebar";
import { UserListSidebar } from "@/shared/layouts/private/UserListSidebar/UserListSidebar";

const PrivateLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-surface-darkest flex h-screen overflow-hidden text-zinc-100">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Dynamic Inner Layout */}
      <div className="flex flex-1">
        {/* Conversation/User Selection Sidebar */}
        <UserListSidebar />

        {/* Core Content Area */}
        <main className="bg-surface-content/30 min-w-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth selection:bg-indigo-500/30">
          <div className="h-full w-full px-4">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
