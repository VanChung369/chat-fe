import type { Path, PathValue } from "react-hook-form";
import { PresenceStatus } from "@/shared/types/user";

export type ProfileFormValues = {
  firstName: string;
  lastName: string;
  username: string;
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

export type UpdateProfileField = <K extends Path<ProfileFormValues>>(
  key: K,
  value: PathValue<ProfileFormValues, K>
) => void;

export type ProfileSectionProps = {
  form: ProfileFormValues;
  onUpdateField: UpdateProfileField;
};
