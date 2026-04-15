import { Form, FormInputPassword, FormSubmitButton } from "@/shared/components/form";
import { KeyRound } from "lucide-react";
import { type SubmitHandler, type UseFormProps } from "react-hook-form";

import { type ChangePasswordFormValues } from "../schema/changePasswordSchema";
import { PrivacySecurityPanel } from "./PrivacySecurityPanel";
import { PrivacySecuritySectionHeader } from "./PrivacySecuritySectionHeader";

const PASSWORD_INPUT_CLASSNAME =
  "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border px-4 py-3 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white";

type PasswordManagementSectionProps = {
  className?: string;
  formOptions: UseFormProps<ChangePasswordFormValues>;
  onSubmit: SubmitHandler<ChangePasswordFormValues>;
  title: string;
  description: string;
  labels: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  placeholders: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  submitLabel: string;
  submittingLabel: string;
};

export function PasswordManagementSection({
  className,
  formOptions,
  onSubmit,
  title,
  description,
  labels,
  placeholders,
  submitLabel,
  submittingLabel,
}: PasswordManagementSectionProps) {
  return (
    <PrivacySecurityPanel className={className}>
      <PrivacySecuritySectionHeader
        icon={KeyRound}
        title={title}
        description={description}
        className="mb-6"
      />

      <Form<ChangePasswordFormValues>
        onSubmit={onSubmit}
        options={formOptions}
        className="space-y-5"
      >
        <FormInputPassword<ChangePasswordFormValues>
          autoComplete="current-password"
          className={PASSWORD_INPUT_CLASSNAME}
          label={labels.currentPassword}
          labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
          name="currentPassword"
          placeholder={placeholders.currentPassword}
          required
        />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <FormInputPassword<ChangePasswordFormValues>
            autoComplete="new-password"
            className={PASSWORD_INPUT_CLASSNAME}
            label={labels.newPassword}
            labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
            name="newPassword"
            placeholder={placeholders.newPassword}
            required
          />

          <FormInputPassword<ChangePasswordFormValues>
            autoComplete="new-password"
            className={PASSWORD_INPUT_CLASSNAME}
            label={labels.confirmPassword}
            labelClassName="text-sm font-semibold text-gray-700 dark:text-text-secondary-dark"
            name="confirmPassword"
            placeholder={placeholders.confirmPassword}
            required
          />
        </div>

        <div className="pt-2">
          <FormSubmitButton pendingText={submittingLabel} className="w-full sm:w-auto">
            {submitLabel}
          </FormSubmitButton>
        </div>
      </Form>
    </PrivacySecurityPanel>
  );
}
