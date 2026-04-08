import type { Path, PathValue } from "react-hook-form";

export type PresenceStatus = "online" | "away" | "busy";

export type ProfileFormValues = {
  displayName: string;
  username: string;
  jobTitle: string;
  about: string;
  email: string;
  phone: string;
  status: PresenceStatus;
  statusMessage: string;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
};

export type ProfileUpdatePayload = {
  about?: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
};

export type UpdateProfileField = <K extends Path<ProfileFormValues>>(
  key: K,
  value: PathValue<ProfileFormValues, K>
) => void;

export type ProfileSectionProps = {
  form: ProfileFormValues;
  onUpdateField: UpdateProfileField;
};
