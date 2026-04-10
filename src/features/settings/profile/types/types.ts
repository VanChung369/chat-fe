import type { Path, PathValue } from "react-hook-form";

export type PresenceStatus = "online" | "away" | "busy";

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  jobTitle: string;
  about: string;
  email: string;
  phone: string;
  status: PresenceStatus;
  statusMessage: string;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
  avatarUrl: string;
  bannerUrl: string;
};

export type ProfileUpdatePayload = {
  username?: string;
  firstName?: string;
  lastName?: string;
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
