import { fetchClient, FetchOptions } from "@/shared/utils/fetch-api";
import { API_ROUTES } from "@/shared/constants";
import type { SignUpFormValues } from "../schema/signUpSchema";
import type { LoginFormValues } from "../schema/loginSchema";
import type { ResetPasswordValues } from "../schema/resetPasswordSchema";
import type { User } from "@/shared/types/user";
import type { LoginResponse } from "@/shared/types";

export const authApi = {
  /**
   * Registers a new user.
   */
  signUp: async (data: Omit<SignUpFormValues, "confirmPassword">) => {
    return fetchClient.post(API_ROUTES.auth.register, data);
  },

  /**
   * Logs in a user.
   */
  login: async (data: LoginFormValues): Promise<LoginResponse> => {
    return fetchClient.post<LoginResponse>(API_ROUTES.auth.login, data);
  },

  /**
   * Logs out the current user.
   */
  logout: async () => {
    return fetchClient.post(API_ROUTES.auth.logout, {});
  },

  /**
   * Gets the current authenticated user.
   */
  getMe: async (options?: FetchOptions): Promise<User> => {
    return fetchClient.get<User>(API_ROUTES.users.me, options);
  },

  /**
   * Verifies a user's email with a 6-digit code.
   */
  verifyEmail: async (email: string, code: string) => {
    return fetchClient.post(API_ROUTES.auth.verify, { email, code });
  },

  /**
   * Resends the verification code.
   */
  resendCode: async (email: string) => {
    return fetchClient.post(API_ROUTES.auth.resendCode, { email });
  },

  /**
   * Initiates the password reset process.
   */
  forgotPassword: async (email: string) => {
    return fetchClient.post(API_ROUTES.auth.forgotPassword, { email });
  },

  /**
   * Resets the user's password with a code.
   */
  resetPassword: async (data: ResetPasswordValues) => {
    return fetchClient.post(API_ROUTES.auth.resetPassword, data);
  },
};
