import { API_ROUTES } from "@/shared/constants";
import type { User } from "@/shared/types/user";
import { fetchClient } from "@/shared/utils/fetch-api";

import type { ProfileUpdatePayload } from "../profile/types/types";

export const profileApi = {
  updateMe: async ({ about, avatar, banner }: ProfileUpdatePayload): Promise<User> => {
    const formData = new FormData();

    formData.append("about", about.trim());

    if (avatar) {
      formData.append("avatar", avatar);
    }

    if (banner) {
      formData.append("banner", banner);
    }

    return fetchClient.patch<User>(API_ROUTES.users.profiles, formData);
  },
};
