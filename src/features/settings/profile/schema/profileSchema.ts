import { z } from "zod";
import { PresenceStatus } from "@/shared/types/user";

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
    about: z.string().max(240, { message: t("errors.aboutMax") }),
    email: z.string(),
    phone: z
      .string()
      .trim()
      .min(7, { message: t("errors.phoneMin") })
      .max(15, { message: t("errors.phoneMax") }),
    status: z.enum([PresenceStatus.Online, PresenceStatus.Away, PresenceStatus.Busy]),
    statusMessage: z.string().max(120, { message: t("errors.statusMessageMax") }),
    showOnlineStatus: z.boolean(),
    allowDirectMessages: z.boolean(),
    avatarUrl: z.string(),
    bannerUrl: z.string(),
  });

export type ProfileSchema = z.infer<ReturnType<typeof createProfileSchema>>;
