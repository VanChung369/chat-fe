import { z } from "zod";

export const createSignUpSchema = (t: (key: string, ...args: any) => string) =>
  z
    .object({
      username: z
        .string()
        .trim()
        .min(1, { message: t("errors.usernameRequired") })
        .min(3, { message: t("errors.usernameMin") })
        .max(16, { message: t("errors.usernameMax") }),
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
      email: z
        .string()
        .trim()
        .min(1, { message: t("errors.emailRequired") })
        .email({ message: t("errors.emailInvalid") }),
      password: z
        .string()
        .min(1, { message: t("errors.passwordRequired") })
        .min(6, { message: t("errors.passwordMin") })
        .max(128, { message: t("errors.passwordMax") })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/, {
          message: t("errors.passwordComplexity"),
        }),
      confirmPassword: z
        .string()
        .min(1, { message: t("errors.confirmPasswordRequired") })
        .min(6, { message: t("errors.confirmPasswordMin") })
        .max(128, { message: t("errors.confirmPasswordMax") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.confirmPasswordMismatch"),
      path: ["confirmPassword"],
    });

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;
