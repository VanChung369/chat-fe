import { fetchClient } from "@/shared/utils/fetch-api";
import type { User } from "@/shared/types/user";
import type { ProfileFormValues } from "../profile/types";

export const profileApi = {
  updateMe: async (form: ProfileFormValues): Promise<User> => {
    return fetchClient.patch<User>("/users/profiles", {
      about: form.about.trim(),
    });
  },
};
