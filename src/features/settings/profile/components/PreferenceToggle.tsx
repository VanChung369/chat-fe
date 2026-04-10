import { Switch } from "@/shared/components/input";

type PreferenceToggleProps = {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (nextValue: boolean) => void;
};

export function PreferenceToggle({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: PreferenceToggleProps) {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={(event) => onChange(event.target.checked)}
      label={title}
      description={description}
    />
  );
}
