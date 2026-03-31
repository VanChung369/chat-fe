import { fetchClient } from "@/shared/utils/fetch-api";
import type { SignUpFormValues } from "../schema/signUpSchema";

export const authApi = {
  /**
   * Registers a new user.
   */
  signUp: async (data: Omit<SignUpFormValues, "confirmPassword">) => {
    return fetchClient.post("/auth/register", data);
  },

  /**
   * Verifies a user's email with a 6-digit code.
   */
  verifyEmail: async (email: string, code: string) => {
    return fetchClient.post("/auth/verify", { email, code });
  },

  /**
   * Resends the verification code.
   */
  resendCode: async (email: string) => {
    return fetchClient.post("/auth/resend-code", { email });
  },
};
