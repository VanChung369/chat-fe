export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    verify: "/auth/verify",
    resendCode: "/auth/resend-code",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  users: {
    me: "/users/me",
    profiles: "/users/profiles",
  },
  imageStorage: {
    upload: "/image-storage/upload",
  },
} as const;
