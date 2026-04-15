import { Switch } from "@/shared/components/input";
import type { LucideIcon } from "lucide-react";
import { SmartphoneNfc } from "lucide-react";
import { PrivacySecurityPanel } from "./PrivacySecurityPanel";
import { PrivacySecuritySectionHeader } from "./PrivacySecuritySectionHeader";

type TwoFactorMethod = {
  id: "email" | "authenticator";
  icon: LucideIcon;
  title: string;
  enabled: boolean;
};

type TwoFactorSectionProps = {
  className?: string;
  title: string;
  description: string;
  enabledLabel: string;
  disabledLabel: string;
  methods: TwoFactorMethod[];
  onToggleMethod: (methodId: TwoFactorMethod["id"], nextValue: boolean) => void;
};

export function TwoFactorSection({
  className,
  title,
  description,
  enabledLabel,
  disabledLabel,
  methods,
  onToggleMethod,
}: TwoFactorSectionProps) {
  return (
    <PrivacySecurityPanel className={className}>
      <PrivacySecuritySectionHeader
        icon={SmartphoneNfc}
        title={title}
        description={description}
        className="mb-6"
      />

      <div className="space-y-3">
        {methods.map((method) => {
          const Icon = method.icon;

          return (
            <div
              key={method.id}
              className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/45"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex h-11 w-11 items-center justify-center rounded-xl">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-semibold text-slate-900 dark:text-white">
                      {method.title}
                    </h4>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-medium tracking-[0.18em] uppercase">
                      {method.enabled ? enabledLabel : disabledLabel}
                    </p>
                  </div>
                </div>

                <Switch
                  checked={method.enabled}
                  onChange={(event) => onToggleMethod(method.id, event.target.checked)}
                  aria-label={method.title}
                />
              </div>
            </div>
          );
        })}
      </div>
    </PrivacySecurityPanel>
  );
}
