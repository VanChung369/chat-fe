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
    <aside
      className={cn(
        "z-50 flex h-full w-20 flex-col items-center border-r py-6 tracking-tight antialiased backdrop-blur-md",
        "border-border-light/60 bg-white/40 text-slate-900 shadow-[0_0_40px_rgba(0,0,0,0.02)]",
        "dark:border-border-dark/30 dark:bg-surface-sidebar dark:text-white dark:shadow-2xl dark:shadow-indigo-500/10"
      )}
    >
      {/* Logo + Avatar */}
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="relative h-11 w-11 transition-all duration-300 hover:scale-110">
          <div className="bg-primary/10 absolute -inset-2 rounded-full blur-lg" />
          <Avatar
            name={
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.userName || "User"
            }
            size="md"
            className="relative h-full w-full ring-2 ring-white/50 dark:ring-slate-800/50"
            showStatus
            status="online"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-8">
        {sidebarNavigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                isActive
                  ? "bg-primary text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)]"
                  : "hover:bg-primary/10 hover:text-primary text-slate-400 dark:text-slate-500 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
              )}
              title={item.name}
            >
              <Icon
                size={24}
                className={cn("transition-transform duration-300 group-hover:scale-110")}
              />
              {isActive && (
                <div className="bg-primary absolute -left-5 h-6 w-1 rounded-r-full shadow-[0_0_12px_rgba(79,70,229,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col items-center gap-6">
        <Link
          href={AppRoutes.settings}
          className={cn(
            "group relative flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
            pathname === AppRoutes.settings
              ? "bg-primary text-white shadow-[0_8px_20px_rgba(79,70,229,0.35)]"
              : "hover:bg-primary/10 hover:text-primary text-slate-400 dark:text-slate-500 dark:hover:bg-slate-800/50 dark:hover:text-slate-200"
          )}
          title="Settings"
        >
          <Settings
            size={24}
            className={cn("transition-transform duration-300 group-hover:scale-110")}
          />
        </Link>

        <button
          onClick={handleLogout}
          className="text-slate-400 transition-all duration-200 hover:scale-110 hover:text-rose-500 dark:text-slate-600 dark:hover:text-rose-400"
          title="Logout"
        >
          <LogOut size={22} strokeWidth={2.5} />
        </button>
      </div>
    </aside>
  );
};
