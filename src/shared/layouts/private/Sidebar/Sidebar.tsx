"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Avatar } from "@/shared/components/avatar";
import { Inbox, Activity, LayoutGrid, Users, Settings, HelpCircle, LogOut } from "lucide-react";
import { cn } from "@/shared/utils";
import { authApi } from "@/features/auth/api/auth-api";
import { toast } from "sonner";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import { useAuthCtx } from "@/providers/AuthProvider";

/**
 * Sidebar component with navigation and user profile.
 * Updated to match the slate-themed design.
 */
export const Sidebar = () => {
  const { user, updateAuthUser } = useAuthCtx();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Inbox", href: "/chat", icon: Inbox },
    { name: "Monitoring", href: "/monitoring", icon: Activity },
    { name: "Hub", href: "/hub", icon: LayoutGrid },
    { name: "Users", href: "/contacts", icon: Users },
  ];

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
      {/* Logo */}
      <div className="mb-10 flex items-center justify-center">
        <span className="text-lg font-bold tracking-tighter text-indigo-500">IS</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.98]",
                isActive
                  ? "border-l-2 border-indigo-500 bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
              )}
              title={item.name}
            >
              <Icon size={24} />
            </Link>
          );
        })}

        {/* Settings at the bottom of nav list */}
        <Link
          href="/settings"
          className={cn(
            "mt-auto flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 active:scale-[0.98]",
            pathname === "/settings"
              ? "border-l-2 border-indigo-500 bg-indigo-500/10 text-indigo-400"
              : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
          )}
          title="Settings"
        >
          <Settings size={24} />
        </Link>
      </nav>

      {/* Bottom Actions */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <button className="text-slate-400 transition-colors hover:text-slate-200" title="Help">
          <HelpCircle size={24} />
        </button>

        <button
          onClick={handleLogout}
          className="text-slate-400 transition-colors hover:text-rose-400"
          title="Logout"
        >
          <LogOut size={20} />
        </button>

        <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-indigo-500 shadow-sm transition-transform hover:scale-105">
          <Avatar
            name={
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "User"
            }
            size="md"
            className="h-full w-full border-none ring-0"
            showStatus
            status="online"
          />
        </div>
      </div>
    </aside>
  );
};
