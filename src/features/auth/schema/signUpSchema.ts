import { z } from "zod";

export type SignUpSchemaMessages = {
  usernameRequired: string;
  usernameMin: string;
  usernameMax: string;
  firstNameRequired: string;
  firstNameMin: string;
  firstNameMax: string;
  lastNameRequired: string;
  lastNameMin: string;
  lastNameMax: string;
  emailRequired: string;
  emailInvalid: string;
  passwordRequired: string;
  passwordMin: string;
  passwordMax: string;
};

export const createSignUpSchema = (messages: SignUpSchemaMessages) =>
  z.object({
    username: z
      .string()
      .trim()
      .min(1, { message: messages.usernameRequired })
      .min(3, { message: messages.usernameMin })
      .max(16, { message: messages.usernameMax }),
    firstName: z
      .string()
      .trim()
      .min(1, { message: messages.firstNameRequired })
      .min(2, { message: messages.firstNameMin })
      .max(32, { message: messages.firstNameMax }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: messages.lastNameRequired })
      .min(2, { message: messages.lastNameMin })
      .max(32, { message: messages.lastNameMax }),
    email: z
      .string()
      .trim()
      .min(1, { message: messages.emailRequired })
      .email({ message: messages.emailInvalid }),
    password: z
      .string()
      .min(1, { message: messages.passwordRequired })
      .min(6, { message: messages.passwordMin })
      .max(128, { message: messages.passwordMax }),
  });

export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;
