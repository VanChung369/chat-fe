"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Avatar } from "@/shared/components/avatar";
import { Settings, LogOut } from "lucide-react";
import { cn } from "@/shared/utils";
import { authApi } from "@/features/auth/api/auth-api";
import { toast } from "sonner";
import { AppRoutes, pathWithQuery, sidebarNavigationItems } from "@/shared/constants";
import { useAuthCtx } from "@/providers/AuthProvider";

/**
 * Sidebar component with navigation and user profile.
 * Updated to match the slate-themed design.
 */
export const Sidebar = () => {
  const { user, updateAuthUser } = useAuthCtx();
  const pathname = usePathname();
  const router = useRouter();

  // Navigation items are now defined in constants/navigation.ts

  const handleLogout = async () => {
    try {
      await authApi.logout();
      updateAuthUser(null);
      toast.success("Logged out successfully");
      router.push(pathWithQuery(AppRoutes.login, { reauth: "true" }));
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <aside className="dark:bg-surface-sidebar z-50 flex h-full w-20 flex-col items-center border-r border-slate-800/50 bg-slate-900 py-6 font-['Inter'] tracking-tight antialiased shadow-2xl shadow-indigo-500/10">
      {/* Logo + Avatar */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <div className="h-10 w-10 shadow-sm transition-transform hover:scale-105">
          <Avatar
            name={
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "User"
            }
            size="md"
            className="h-full w-full"
            showStatus
            status="online"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-6">
        {sidebarNavigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.98]",
                isActive
                  ? "border-indigo-400 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
              title={item.name}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button
          onClick={handleLogout}
          className="text-slate-400 transition-colors hover:text-rose-400"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
        <Link
          href={AppRoutes.settings}
          className={cn(
            "mt-auto flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.98]",
            pathname === AppRoutes.settings
              ? "border-indigo-400 bg-indigo-500/10 text-indigo-400"
              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
          )}
          title="Settings"
        >
          <Settings size={24} />
        </Link>
      </div>
    </aside>
  );
};
