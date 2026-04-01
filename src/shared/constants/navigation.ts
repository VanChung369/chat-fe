import { Inbox, Activity, LayoutGrid, Users, Settings } from "lucide-react";
import { AppRoutes } from "./router";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export const sidebarNavigationItems: NavigationItem[] = [
  { name: "Inbox", href: AppRoutes.chat, icon: Inbox },
  { name: "Monitoring", href: AppRoutes.monitoring, icon: Activity },
  { name: "Hub", href: AppRoutes.hub, icon: LayoutGrid },
  { name: "Users", href: AppRoutes.contacts, icon: Users },
];

export const sidebarBottomItems: NavigationItem[] = [
  { name: "Settings", href: AppRoutes.settings, icon: Settings },
];
