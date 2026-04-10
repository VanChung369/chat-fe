export const ABOUT_MAX_LENGTH = 240;

export const INPUT_CLASSNAME =
  "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border px-4 py-3 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white";

export const ICON_INPUT_CLASSNAME =
  "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary placeholder:text-text-secondary-dark w-full rounded-lg border py-3 pr-4 pl-12 text-gray-900 transition-all outline-none focus:border-transparent focus:ring-2 dark:text-white";

export const TOGGLE_TRACK_CLASSNAME =
  "bg-border-light dark:bg-border-dark peer peer-checked:bg-primary h-6 w-11 rounded-full peer-focus:outline-none after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white rtl:peer-checked:after:-translate-x-full";

export const BANNER_IMAGE_URL = "/svgs/default-banner.svg";

export const AVATAR_IMAGE_URL = "/svgs/default-avatar.svg";

export const PROFILE_UPLOAD_FOLDERS = {
  avatar: "/chat-app/avatars",
  banner: "/chat-app/banners",
} as const;
