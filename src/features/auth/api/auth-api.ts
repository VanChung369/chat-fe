import { fetchClient } from "@/shared/utils/fetch-api";
import type { SignUpFormValues } from "../schema/signUpSchema";
import type { LoginFormValues } from "../schema/loginSchema";
import type { ResetPasswordValues } from "../schema/resetPasswordSchema";

export const authApi = {
  /**
   * Registers a new user.
   */
  signUp: async (data: Omit<SignUpFormValues, "confirmPassword">) => {
    return fetchClient.post("/auth/register", data);
  },

  /**
   * Logs in a user.
   */
  login: async (data: LoginFormValues) => {
    return fetchClient.post("/auth/login", data);
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

  /**
   * Initiates the password reset process.
   */
  forgotPassword: async (email: string) => {
    return fetchClient.post("/auth/forgot-password", { email });
  },

  /**
   * Resets the user's password with a code.
   */
  resetPassword: async (data: ResetPasswordValues) => {
    return fetchClient.post("/auth/reset-password", data);
  },
};
