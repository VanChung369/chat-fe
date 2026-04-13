import { z } from "zod";

/**
 * Zod schema for login validation.
 * Includes localized error messages.
 */
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, t("errors.emailRequired"))
      .email(t("errors.emailInvalid")),
    password: z
      .string()
      .min(1, t("errors.passwordRequired")),
  });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
