import type { User } from "@/shared/types/user";
import type { ProfileFormValues } from "../types/types";

export function buildInitialProfileState(user: User | null | undefined): ProfileFormValues {
  const displayName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  return {
    displayName,
    username: user?.username || "",
    jobTitle: "",
    about: user?.profile?.about || "",
    email: user?.email || "",
    phone: "",
    status: "online",
    statusMessage: "",
    showOnlineStatus: false,
    allowDirectMessages: false,
  };
}
