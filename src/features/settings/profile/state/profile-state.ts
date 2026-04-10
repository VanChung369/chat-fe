import { PresenceStatus, type User } from "@/shared/types/user";
import type { ProfileFormValues } from "../types/types";

export function buildInitialProfileState(user: User | null | undefined): ProfileFormValues {
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || user?.name || "",
    about: user?.profile?.about || "",
    email: user?.email || "",
    phone: user?.profile?.phone || "",
    status: user?.presence?.status || PresenceStatus.Online,
    statusMessage: user?.presence?.statusMessage || "",
    showOnlineStatus: user?.presence ? !user.presence.showOffline : false,
    allowDirectMessages: false,
    avatarUrl: user?.profile?.avatar || "",
    bannerUrl: user?.profile?.banner || "",
  };
}
