import { API_ROUTES } from "@/shared/constants";
import { fetchClient } from "@/shared/utils/fetch-api";
import type { User } from "@/shared/types/user";

import type { ProfileUpdatePayload } from "../profile/types/types";

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
  updateMe: async ({ about, avatarUrl, bannerUrl }: ProfileUpdatePayload): Promise<User> => {
    return fetchClient.patch<User>(API_ROUTES.users.profiles, {
      about: typeof about === "string" ? about.trim() : undefined,
      avatarUrl,
      bannerUrl,
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
