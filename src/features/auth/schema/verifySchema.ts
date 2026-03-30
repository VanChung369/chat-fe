import { z } from "zod";

export const createVerifySchema = (t: (key: string, ...args: any) => string) =>
  z.object({
    code: z
      .string()
      .min(1, { message: t("errors.codeRequired") })
      .length(6, { message: t("errors.codeLength") })
      .regex(/^\d+$/, { message: t("errors.codeLength") }),
  });

export type VerifyFormValues = z.infer<ReturnType<typeof createVerifySchema>>;
