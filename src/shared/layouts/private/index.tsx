import { type ReactNode } from "react";
import { cn } from "@/shared/utils";
import { Sidebar } from "./Sidebar";

const PrivateLayout = ({ children, sidebar }: { children: ReactNode; sidebar: ReactNode }) => {
  return (
    <div className={cn("flex h-screen overflow-hidden", "bg-surface-darkest text-zinc-100")}>
      {/* Navigation Sidebar */}
      <Sidebar />

      {/* Dynamic Inner Layout */}
      <div className="flex flex-1">
        {/* Conversation/User Selection Sidebar */}
        <aside
          className={cn(
            "z-20 flex h-full w-full max-w-85 shrink-0 flex-col border-r md:max-w-100",
            "border-gray-200 bg-white",
            "dark:border-gray-800 dark:bg-surface-sidebar"
          )}
        >
          {sidebar}
        </aside>

        {/* Core Content Area */}
        <main
          className={cn(
            "min-w-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth",
            "bg-surface-content/30 selection:bg-indigo-500/30"
          )}
        >
          <div className="h-full w-full">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
