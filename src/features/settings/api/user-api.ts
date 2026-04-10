import { API_ROUTES } from "@/shared/constants";
import { optionalTrimmedString } from "@/shared/utils";
import { fetchClient } from "@/shared/utils/fetch-api";
import type { User } from "@/shared/types/user";

type UpdateCurrentUserPayload = {
  username?: string;
  firstName?: string;
  lastName?: string;
};

export const userApi = {
  updateMe: async ({
    username,
    firstName,
    lastName,
  }: UpdateCurrentUserPayload): Promise<User> => {
    return fetchClient.patch<User>(API_ROUTES.users.me, {
      username: optionalTrimmedString(username),
      firstName: optionalTrimmedString(firstName),
      lastName: optionalTrimmedString(lastName),
    });
  },
};
