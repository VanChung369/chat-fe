import { API_ROUTES } from "@/shared/constants";
import { fetchClient } from "@/shared/utils/fetch-api";
import type { User } from "@/shared/types/user";
import type { ProfileFormValues } from "../profile/types";

export const profileApi = {
  updateMe: async (form: ProfileFormValues): Promise<User> => {
    return fetchClient.patch<User>(API_ROUTES.users.profiles, {
      about: form.about.trim(),
    });
  },
};
