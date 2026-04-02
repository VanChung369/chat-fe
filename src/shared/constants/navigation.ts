import {
  Inbox,
  Activity,
  LayoutGrid,
  Users,
  Settings,
  Upload,
  UserRound,
  Lock,
  Bell,
  Settings2,
} from "lucide-react";
import { AppRoutes } from "./router";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
}

export interface SettingsNavigationItem {
  labelKey: "profile" | "privacySecurity" | "notifications" | "preferences";
  icon: React.ComponentType<any>;
  href?: string;
}

export const sidebarNavigationItems: NavigationItem[] = [
  { name: "Inbox", href: AppRoutes.chat, icon: Inbox },
  { name: "Monitoring", href: AppRoutes.monitoring, icon: Activity },
  { name: "Hub", href: AppRoutes.hub, icon: LayoutGrid },
  { name: "Users", href: AppRoutes.contacts, icon: Users },
  { name: "Demo Upload", href: AppRoutes.demoUpload, icon: Upload },
];

export const sidebarBottomItems: NavigationItem[] = [
  { name: "Settings", href: AppRoutes.settings, icon: Settings },
];

export const settingsNavigationItems: SettingsNavigationItem[] = [
  {
    labelKey: "profile",
    href: AppRoutes.settings,
    icon: UserRound,
  },
  {
    labelKey: "privacySecurity",
    icon: Lock,
  },
  {
    labelKey: "notifications",
    icon: Bell,
  },
  {
    labelKey: "preferences",
    icon: Settings2,
  },
];
