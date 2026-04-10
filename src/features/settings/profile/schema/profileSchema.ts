import { z } from "zod";

export const createProfileSchema = (t: (key: string) => string) =>
  z.object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: t("errors.firstNameRequired") })
      .min(2, { message: t("errors.firstNameMin") })
      .max(32, { message: t("errors.firstNameMax") }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: t("errors.lastNameRequired") })
      .min(2, { message: t("errors.lastNameMin") })
      .max(32, { message: t("errors.lastNameMax") }),
    username: z
      .string()
      .trim()
      .min(1, { message: t("errors.usernameRequired") })
      .min(3, { message: t("errors.usernameMin") })
      .max(16, { message: t("errors.usernameMax") }),
    jobTitle: z.string(),
    about: z.string().max(240, { message: t("errors.aboutMax") }),
    email: z.string(),
    phone: z.string(),
    status: z.enum(["online", "away", "busy"]),
    statusMessage: z.string(),
    showOnlineStatus: z.boolean(),
    allowDirectMessages: z.boolean(),
    avatarUrl: z.string(),
    bannerUrl: z.string(),
  });

export type ProfileSchema = z.infer<ReturnType<typeof createProfileSchema>>;
