"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuthCtx } from "@/providers/AuthProvider";
import { cn } from "@/shared/utils";
import { toast } from "sonner";

type PresenceStatus = "online" | "away" | "busy";

type ProfileFormState = {
  displayName: string;
  username: string;
  jobTitle: string;
  about: string;
  email: string;
  phone: string;
  status: PresenceStatus;
  statusMessage: string;
  showOnlineStatus: boolean;
  allowDirectMessages: boolean;
};

type UpdateProfileField = <K extends keyof ProfileFormState>(
  key: K,
  value: ProfileFormState[K]
) => void;

type ProfileHeaderProps = {
  fullName: string;
  username: string;
  jobTitle: string;
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
};

type GeneralInfoSectionProps = {
  form: ProfileFormState;
  onUpdateField: UpdateProfileField;
};

type ContactInfoSectionProps = {
  form: ProfileFormState;
  onUpdateField: UpdateProfileField;
};

type StatusSectionProps = {
  form: ProfileFormState;
  onUpdateField: UpdateProfileField;
};

type PreferencesSectionProps = {
  form: ProfileFormState;
  onUpdateField: UpdateProfileField;
};

const ABOUT_MAX_LENGTH = 500;

const STATUS_OPTIONS: Array<{
  value: PresenceStatus;
  label: string;
  description: string;
  indicatorClassName: string;
}> = [
  {
    value: "online",
    label: "Online",
    description: "Focusing on deep work 🧠",
    indicatorClassName: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]",
  },
  {
    value: "away",
    label: "Away",
    description: "Back in 30 mins",
    indicatorClassName: "bg-yellow-500",
  },
  {
    value: "busy",
    label: "Do Not Disturb",
    description: "In a meeting",
    indicatorClassName: "bg-red-500",
  },
];

const INPUT_CLASSNAME =
  "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border px-4 py-3 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white";

const ICON_INPUT_CLASSNAME =
  "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border py-3 pr-4 pl-10 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white";

const TOGGLE_TRACK_CLASSNAME =
  "bg-border-light dark:bg-border-dark peer peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full";

const BANNER_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDrZTPLahdzFklrrBpQVijW2okt4bTGICQPLgFd6KmaELw2OzYz-5dQFxnblfsKSBmYCQFIjw1VwuqObC-3g-U-r3eWjERtBsBJuAF8JU-zkEjtAT_QR36L3HJsHN119Q-FU9yi7m262awYUEThm1Y8ZoaEySCjbrHSFhabqzv9BXHiOl-ZvDbMYLLc62TlYmwIkMN9JKJs2q193Uvih07qVpQ8moq_LrtOEcms8Tk8LfNYpg9meZW9kZT5qkbMhJJijAnO2U63bnA";

const AVATAR_IMAGE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBM0vPtw00ECzHEk47VVTP22kYm9Uf7lt1qslL3nWttggPmv5ul6GbNmJ5F8lNw8eWQyl44cxN8lWEfl_t1xq09ZmWbPmKuQItpg1vmw6MZ7NmrHqJS0F8t0V6cf8P2Pu98gWp3bgVStvqOX7NKXoIjfTgrWK28j40Su0VYngalEqiT-Xu15zqJc7WrsoO5365i0y4D-UcBcuMAVH9llsbA7pSzRHNg2fG3K7NnLa5OZCo6A4Vz3w2Q1-q0Xn5xnjaKz96A5DgNgmo";

function buildInitialState(
  user?: {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    profile?: {
      about?: string;
    };
  } | null
): ProfileFormState {
  const displayName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "Guest User";

  return {
    displayName: displayName !== "Guest User" ? displayName : "Sarah Jenkings",
    username: user?.username || "sarah_j",
    jobTitle: "Product Designer",
    about: user?.profile?.about || "Product Designer based in NYC. Love coffee and pixels. ☕️ ✨",
    email: user?.email || "sarah.jenkings@example.com",
    phone: "+1 (555) 000-0000",
    status: "online",
    statusMessage: "Focusing on deep work 🧠",
    showOnlineStatus: true,
    allowDirectMessages: false,
  };
}

function MobileBreadcrumb() {
  return (
    <div className="text-text-secondary-light dark:text-text-secondary-dark mb-6 flex items-center gap-2 text-sm font-medium lg:hidden">
      <span className="material-symbols-outlined text-lg">arrow_back</span>
      <span>Settings</span>
      <span>/</span>
      <span className="text-gray-900 dark:text-white">Profile</span>
    </div>
  );
}

function ProfileHeader({
  fullName,
  username,
  jobTitle,
  hasChanges,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <>
      <div
        className="relative h-32 w-full bg-cover bg-center md:h-48"
        style={{
          backgroundImage: `url('${BANNER_IMAGE_URL}')`,
        }}
      >
        <button
          type="button"
          onClick={() => toast.info("Banner edit unimplemented")}
          className="absolute top-4 right-4 rounded-lg bg-black/50 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <span className="material-symbols-outlined text-xl">edit</span>
        </button>
      </div>

      <div className="relative px-6 pb-8 md:px-10">
        <div className="flex flex-col items-start gap-6 md:flex-row">
          <div className="group relative -mt-16">
            <div
              className="border-surface-light dark:border-surface-dark size-32 rounded-full border-4 bg-cover bg-center"
              style={{
                backgroundImage: `url('${AVATAR_IMAGE_URL}')`,
              }}
            />
            <button
              type="button"
              onClick={() => toast.info("Avatar edit unimplemented")}
              className="bg-primary border-surface-light dark:border-surface-dark absolute right-0 bottom-0 rounded-full border-4 p-2 text-white shadow-sm transition-colors hover:bg-blue-600"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
            </button>
          </div>

          <div className="flex-1 pt-2 md:pt-4">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {fullName}
                  <span className="material-symbols-outlined text-primary text-xl" title="Verified">
                    verified
                  </span>
                </h2>
                <p className="text-text-secondary-light dark:text-text-secondary-dark font-medium">
                  @{username} • {jobTitle}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onSave}
                  disabled={!hasChanges}
                  className="bg-primary rounded-lg px-4 py-2 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={!hasChanges}
                  className="border-border-light dark:border-border-dark dark:hover:bg-background-dark rounded-lg border px-4 py-2 text-sm font-bold text-gray-900 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60 dark:text-white"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-border-light dark:bg-border-dark my-8 h-px w-full" />
      </div>
    </>
  );
}

function GeneralInfoSection({ form, onUpdateField }: GeneralInfoSectionProps) {
  const aboutLength = form.about.length;

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">General Information</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-white">Display Name</span>
          <input
            type="text"
            value={form.displayName}
            onChange={(e) => onUpdateField("displayName", e.target.value)}
            className={INPUT_CLASSNAME}
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-white">Username</span>
          <div className="relative">
            <span className="text-text-secondary-light dark:text-text-secondary-dark absolute top-3 left-4">
              @
            </span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => onUpdateField("username", e.target.value.replace(/\s+/g, "_"))}
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border py-3 pr-4 pl-8 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white"
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5 md:col-span-2">
          <span className="text-sm font-medium text-gray-700 dark:text-white">About Me</span>
          <textarea
            rows={3}
            value={form.about}
            onChange={(e) => onUpdateField("about", e.target.value.slice(0, ABOUT_MAX_LENGTH))}
            className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full resize-none rounded-lg border px-4 py-3 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white"
          />
          <span className="text-text-secondary-light dark:text-text-secondary-dark text-right text-xs">
            {aboutLength}/{ABOUT_MAX_LENGTH}
          </span>
        </label>
      </div>
    </div>
  );
}

function ContactInfoSection({ form, onUpdateField }: ContactInfoSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Contact Information</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-white">Email Address</span>
          <div className="relative">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark absolute top-3 left-3 text-[20px]">
              mail
            </span>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onUpdateField("email", e.target.value)}
              className={ICON_INPUT_CLASSNAME}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-medium text-gray-700 dark:text-white">Phone Number</span>
          <div className="relative">
            <span className="material-symbols-outlined text-text-secondary-light dark:text-text-secondary-dark absolute top-3 left-3 text-[20px]">
              call
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => onUpdateField("phone", e.target.value)}
              className={ICON_INPUT_CLASSNAME}
            />
          </div>
        </label>
      </div>
    </div>
  );
}

function StatusSection({ form, onUpdateField }: StatusSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Current Status</h3>
      <div className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark flex flex-col gap-3 rounded-xl border p-4">
        {STATUS_OPTIONS.map((option) => {
          const checked = form.status === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "group flex cursor-pointer items-center gap-3 transition-opacity",
                checked ? "" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="status"
                  checked={checked}
                  onChange={() => {
                    onUpdateField("status", option.value);
                    onUpdateField("statusMessage", option.description);
                  }}
                  className="peer border-text-secondary-light dark:border-text-secondary-dark checked:border-primary h-5 w-5 appearance-none rounded-full border-2 bg-transparent transition-all checked:border-[6px]"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {option.label}
                </p>
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
                  {option.description}
                </p>
              </div>
              <div className={cn("size-2.5 rounded-full", option.indicatorClassName)} />
            </label>
          );
        })}

        <button
          type="button"
          onClick={() => toast.info(`Current status: ${form.statusMessage}`)}
          className="text-primary mt-2 text-left text-sm font-semibold hover:underline"
        >
          Set custom status...
        </button>
      </div>
    </div>
  );
}

function PreferenceToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (nextValue: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-900 dark:text-white">{title}</span>
        <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
          {description}
        </span>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <div className={TOGGLE_TRACK_CLASSNAME} />
      </label>
    </div>
  );
}

function PreferencesSection({ form, onUpdateField }: PreferencesSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Preferences</h3>
      <div className="flex flex-col gap-4">
        <PreferenceToggle
          title="Show Online Status"
          description="Allow others to see when you're active"
          checked={form.showOnlineStatus}
          onChange={(nextValue) => onUpdateField("showOnlineStatus", nextValue)}
        />

        <PreferenceToggle
          title="Direct Messages"
          description="Receive messages from non-contacts"
          checked={form.allowDirectMessages}
          onChange={(nextValue) => onUpdateField("allowDirectMessages", nextValue)}
        />
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user } = useAuthCtx();
  const initialState = useMemo(() => buildInitialState(user), [user]);
  const [form, setForm] = useState<ProfileFormState>(initialState);
  const [savedState, setSavedState] = useState<ProfileFormState>(initialState);

  useEffect(() => {
    setForm(initialState);
    setSavedState(initialState);
  }, [initialState]);

  const hasChanges = JSON.stringify(form) !== JSON.stringify(savedState);
  const fullName = form.displayName.trim() || "Guest User";

  const updateField: UpdateProfileField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCancel = () => {
    setForm(savedState);
    toast.info("Profile changes discarded");
  };

  const handleSave = () => {
    setSavedState(form);
    toast.success("Profile changes saved locally");
  };

  return (
    <div className="w-full flex-1 overflow-y-auto">
      <div className="mx-auto max-w-240 px-4 py-8 pb-20 md:px-8">
        <MobileBreadcrumb />

        <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark overflow-hidden rounded-xl border shadow-sm">
          <ProfileHeader
            fullName={fullName}
            username={form.username}
            jobTitle={form.jobTitle}
            hasChanges={hasChanges}
            onSave={handleSave}
            onCancel={handleCancel}
          />

          <div className="relative px-6 pb-8 md:px-10">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
              <div className="flex flex-col gap-8 lg:col-span-2">
                <GeneralInfoSection form={form} onUpdateField={updateField} />
                <ContactInfoSection form={form} onUpdateField={updateField} />
              </div>

              <div className="flex flex-col gap-8">
                <StatusSection form={form} onUpdateField={updateField} />
                <PreferencesSection form={form} onUpdateField={updateField} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
