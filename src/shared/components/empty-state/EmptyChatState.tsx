import { MessageCircle, Contact, Users, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

interface EmptyChatStateProps {
  onNewChat?: () => void;
  onContacts?: () => void;
  onNewGroup?: () => void;
}

export const EmptyChatState: React.FC<EmptyChatStateProps> = ({
  onNewChat,
  onContacts,
  onNewGroup,
}) => {
  const t = useTranslations("EmptyChatState");

  return (
    <main className="bg-background-light dark:bg-background-dark relative flex h-full flex-1 flex-col">
      <div className="animate-fade-in flex h-full flex-col items-center justify-center p-8 text-center">
        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/5 absolute -top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full blur-[100px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-purple-500/5 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="bg-surface-light mx-auto mb-8 flex size-32 items-center justify-center rounded-full shadow-xl ring-1 ring-gray-200 dark:bg-[#1c2533] dark:ring-gray-700">
            <MessageCircle className="text-primary/80 h-16 w-16" />
          </div>

          <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            {t("welcomeTitle")}
          </h2>

          <p className="mb-8 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
            {t("welcomeDescription")}
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={onContacts}
              className="bg-surface-light flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700/50 dark:bg-[#232f48] dark:text-white dark:hover:bg-[#2d3b55]"
            >
              <Contact className="text-primary h-5 w-5" />
              <span className="text-sm font-medium">{t("contacts")}</span>
            </button>

            <button
              onClick={onNewGroup}
              className="bg-surface-light flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 text-gray-900 shadow-sm transition-all hover:bg-gray-50 dark:border-gray-700/50 dark:bg-[#232f48] dark:text-white dark:hover:bg-[#2d3b55]"
            >
              <Users className="text-primary h-5 w-5" />
              <span className="text-sm font-medium">{t("newGroup")}</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 flex items-center gap-2 text-xs text-gray-400 dark:text-gray-600">
          <Shield className="h-3 w-3" />
          {t("encryption")}
        </div>
      </div>
    </main>
  );
};
