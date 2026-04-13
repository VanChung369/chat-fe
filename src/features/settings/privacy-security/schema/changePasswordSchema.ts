import { z } from "zod";

export const createChangePasswordSchema = (t: (key: string, ...args: any) => string) =>
  z
    .object({
      currentPassword: z.string().min(1, { message: t("errors.currentPasswordRequired") }),
      newPassword: z
        .string()
        .min(1, { message: t("errors.newPasswordRequired") })
        .min(8, { message: t("errors.newPasswordMin") })
        .max(128, { message: t("errors.newPasswordMax") })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
          message: t("errors.newPasswordComplexity"),
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
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
      message: t("errors.passwordSameAsCurrent"),
      path: ["newPassword"],
    });

export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordSchema>>;
