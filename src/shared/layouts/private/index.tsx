import { type ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { UserListSidebar } from "./UserListSidebar";

const PrivateLayout = ({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) => {
  return (
    <div className="bg-surface-darkest flex h-screen overflow-hidden text-zinc-100">
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Dynamic Inner Layout */}
      <div className="flex flex-1">
        {/* Conversation/User Selection Sidebar */}
        <aside className="dark:bg-surface-sidebar z-20 flex h-full w-full max-w-90 shrink-0 flex-col border-r border-gray-200 bg-white md:max-w-100 dark:border-gray-800">
          {sidebar}
        </aside>

        {/* Core Content Area */}
        <main className="bg-surface-content/30 min-w-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth selection:bg-indigo-500/30">
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
