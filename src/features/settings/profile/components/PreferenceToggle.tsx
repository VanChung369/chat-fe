import { TOGGLE_TRACK_CLASSNAME } from "../constants/constants";

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
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{title}</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark mt-0.5 text-xs">
          {description}
        </span>
      </div>
      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className={TOGGLE_TRACK_CLASSNAME} />
      </label>
    </div>
  );
}
