import { useTranslations } from "next-intl";
import { BadgeCheck, Camera } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/shared/utils";
import { AVATAR_IMAGE_URL, BANNER_IMAGE_URL } from "../constants/constants";

type ProfileHeaderProps = {
  fullName: string;
  username: string;
  jobTitle: string;
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export function ProfileHeader({
  fullName,
  username,
  jobTitle,
  hasChanges,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  const t = useTranslations("SettingsProfile");
  const displayUsername = username || t("placeholders.username");
  const metaLine = [`@${displayUsername}`, jobTitle].filter(Boolean).join(" | ");

  return (
    <>
      <div
        className={cn("relative h-44 w-full bg-cover bg-center md:h-64 lg:h-68")}
        style={{
          backgroundImage: `url('${BANNER_IMAGE_URL}')`,
        }}
      >
        <button
          type="button"
          onClick={() => toast.info(t("toasts.bannerEditUnimplemented"))}
          className={cn(
            "absolute top-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors md:top-6 md:right-6 md:px-4",
            "border border-white/10 bg-black/50 text-white backdrop-blur-md hover:bg-black/70"
          )}
        >
          {t("actions.changeCover")}
        </button>
      </div>

      <div className={cn("relative px-4 pb-8 md:px-8 md:pb-10 lg:px-12")}>
        <div className={cn("flex flex-col items-start gap-6 md:flex-row md:gap-8")}>
          <div className="group relative -mt-20">
            <div
              className={cn(
                "size-32 rounded-full border-4 bg-cover bg-center shadow-xl md:size-36 lg:size-40",
                "border-surface-light dark:border-surface-dark"
              )}
              style={{
                backgroundImage: `url('${AVATAR_IMAGE_URL}')`,
              }}
            />
            <button
              type="button"
              onClick={() => toast.info(t("toasts.avatarEditUnimplemented"))}
              className={cn(
                "absolute right-1 bottom-1 rounded-full border-4 p-2.5 text-white shadow-lg transition-colors md:p-3",
                "bg-primary hover:bg-blue-600",
                "border-surface-light dark:border-surface-dark"
              )}
            >
              <Camera />
            </button>
          </div>

          <div className={cn("flex-1 pt-2 md:pt-4 lg:pt-6")}>
            <div
              className={cn(
                "flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-6"
              )}
            >
              <div>
                <h2
                  className={cn(
                    "flex items-center gap-2.5 text-2xl font-bold md:gap-3 md:text-3xl",
                    "text-gray-900 dark:text-white"
                  )}
                >
                  {fullName}
                  <BadgeCheck color="blue" />
                </h2>
                {metaLine ? (
                  <p
                    className={cn(
                      "mt-1 text-base font-medium md:text-lg",
                      "text-text-secondary-light dark:text-text-secondary-dark"
                    )}
                  >
                    {metaLine}
                  </p>
                ) : null}
              </div>

              <div className={cn("flex w-full gap-3 md:w-auto md:gap-4")}>
                <button
                  type="button"
                  onClick={onCancel}
                  disabled={!hasChanges}
                  className={cn(
                    "flex-1 rounded-lg border px-4 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:px-6",
                    "border-border-light text-gray-900 hover:bg-gray-100",
                    "dark:border-border-dark dark:hover:bg-background-dark dark:text-white"
                  )}
                >
                  {t("actions.cancel")}
                </button>
                <button
                  type="button"
                  onClick={onSave}
                  disabled={!hasChanges}
                  className={cn(
                    "flex-1 rounded-lg px-5 py-2.5 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:px-8",
                    "bg-primary shadow-lg shadow-blue-500/20 hover:bg-blue-600"
                  )}
                >
                  {t("actions.saveChanges")}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={cn("my-8 h-px w-full md:my-10", "bg-border-light dark:bg-border-dark")} />
      </div>
    </>
  );
}