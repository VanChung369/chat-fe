"use client";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { Avatar } from "@/shared/components/avatar";
import LogoIcon from "@/shared/components/icons/LogoIcon";
import { MessageSquare, Users, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/shared/utils";
import { authApi } from "@/features/auth/api/auth-api";
import { toast } from "sonner";
import { AppRoutes, pathWithQuery } from "@/shared/constants";
import { useAuthCtx } from "@/providers/AuthProvider";

/**
 * Sidebar component with navigation and user profile.
 */
export const Sidebar = () => {
  const { user, updateAuthUser } = useAuthCtx();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Dashboard", href: AppRoutes.home, icon: LayoutDashboard },
    { name: "Chat", href: "/chat", icon: MessageSquare },
    { name: "Contacts", href: "/contacts", icon: Users },
    { name: "Settings", href: "/settings", icon: Settings },
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
    <aside className="fixed top-0 left-0 z-40 flex h-screen w-20 flex-col items-center border-r border-zinc-800 bg-[#0A0A0A] py-6 sm:w-24">
      {/* Logo */}
      <div className="mb-10 flex items-center justify-center">
        <LogoIcon className="h-10 w-10 text-indigo-500" />
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
                "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                isActive
                  ? "bg-indigo-500/10 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300"
              )}
              title={item.name}
            >
              <Icon
                size={24}
                className={cn(
                  "transition-transform duration-200 group-hover:scale-110",
                  isActive && "scale-110"
                )}
              />

              {/* Active Indicator */}
              {isActive && (
                <div className="absolute -left-1 h-8 w-1 rounded-r-full bg-indigo-500" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Actions */}
      <div className="flex flex-col items-center gap-6 pb-2">
        <button
          onClick={handleLogout}
          className="group flex h-12 w-12 items-center justify-center rounded-xl text-zinc-500 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400"
          title="Logout"
        >
          <LogOut size={24} className="transition-transform duration-200 group-hover:scale-110" />
        </button>

        <div className="flex w-12 justify-center border-t border-zinc-800 pt-2">
          <Avatar
            name={
              `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || user?.username || "User"
            }
            size="md"
            className="ring-2 ring-transparent transition-all hover:ring-indigo-500/50"
            showStatus
            status="online"
          />
        </div>
      </div>
    </aside>
  );
};
