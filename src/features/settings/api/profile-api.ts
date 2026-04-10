import { API_ROUTES } from "@/shared/constants";
import { PresenceStatus, type User } from "@/shared/types/user";
import { optionalTrimmedString } from "@/shared/utils";
import { fetchClient } from "@/shared/utils/fetch-api";

type UpdateProfilePayload = {
  username?: string;
  firstName?: string;
  lastName?: string;
  about?: string;
  phone?: string;
  avatarUrl?: string | null;
  bannerUrl?: string | null;
  status?: PresenceStatus;
  statusMessage?: string;
  showOnlineStatus?: boolean;
};

type UploadDirectPayload = {
  file: File;
  fileName: string;
  folder: string;
};

type UploadDirectResponse = {
  fileId: string;
  url: string;
};

export const profileApi = {
  updateProfile: async ({
    username,
    firstName,
    lastName,
    about,
    phone,
    avatarUrl,
    bannerUrl,
    status,
    statusMessage,
    showOnlineStatus,
  }: UpdateProfilePayload): Promise<User> => {
    return fetchClient.patch<User>(API_ROUTES.users.profiles, {
      username: optionalTrimmedString(username),
      firstName: optionalTrimmedString(firstName),
      lastName: optionalTrimmedString(lastName),
      about: optionalTrimmedString(about),
      phone: optionalTrimmedString(phone),
      avatarUrl,
      bannerUrl,
      status,
      statusMessage: optionalTrimmedString(statusMessage),
      showOnlineStatus,
    });
  },

  uploadDirect: async ({
    file,
    fileName,
    folder,
  }: UploadDirectPayload): Promise<UploadDirectResponse> => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("folder", folder);

    return fetchClient.post<UploadDirectResponse>(API_ROUTES.imageStorage.uploadDirect, formData);
  },

  deleteImage: async (fileId: string): Promise<void> => {
    return fetchClient.delete<void>(`${API_ROUTES.imageStorage.delete}/${fileId}`);
  },
};
