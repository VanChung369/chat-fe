import type { User } from "@/shared/types/user";
import type { ProfileFormValues } from "../types/types";

export function buildInitialProfileState(user: User | null | undefined): ProfileFormValues {
  return {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    username: user?.username || user?.name || "",
    jobTitle: "",
    about: user?.profile?.about || "",
    email: user?.email || "",
    phone: "",
    status: "online",
    statusMessage: "",
    showOnlineStatus: false,
    allowDirectMessages: false,
    avatarUrl: user?.profile?.avatar || "",
    bannerUrl: user?.profile?.banner || "",
  };
}
