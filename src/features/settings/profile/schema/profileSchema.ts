import { z } from "zod";

export const createProfileSchema = (t: (key: string) => string) =>
  z.object({
    displayName: z.string(),
    username: z.string(),
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
