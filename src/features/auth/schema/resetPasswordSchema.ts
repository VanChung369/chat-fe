import { z } from "zod";

export const createResetPasswordSchema = (t: (key: string, ...args: any) => string) =>
  z
    .object({
      email: z
        .string()
        .trim()
        .min(1, { message: t("errors.emailRequired") })
        .email({ message: t("errors.emailInvalid") }),
      code: z
        .string()
        .min(1, { message: t("errors.codeRequired") })
        .length(6, { message: t("errors.codeLength") }),
      newPassword: z
        .string()
        .min(1, { message: t("errors.passwordRequired") })
        .min(8, { message: t("errors.passwordMin") })
        .max(128, { message: t("errors.passwordMax") })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
          message: t("errors.passwordComplexity"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: t("errors.confirmPasswordRequired") })
        .min(8, { message: t("errors.confirmPasswordMin") })
        .max(128, { message: t("errors.confirmPasswordMax") }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t("errors.confirmPasswordMismatch"),
      path: ["confirmPassword"],
    });

export type ResetPasswordValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;

export const createForgotPasswordSchema = (t: (key: string, ...args: any) => string) =>
  z.object({
    email: z
      .string()
      .trim()
      .min(1, { message: t("errors.emailRequired") })
      .email({ message: t("errors.emailInvalid") }),
  });

export type ForgotPasswordValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
