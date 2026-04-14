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
    <main className="relative flex h-full flex-1 flex-col overflow-hidden bg-transparent">
      <div className="animate-fade-in flex h-full flex-col items-center justify-center p-8 text-center">
        {/* Decorative Background Element */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/5 dark:bg-primary/10 absolute -top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full blur-[100px]" />
          <div className="bg-purple-500/5 dark:bg-purple-500/10 absolute -bottom-[20%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-md">
          <div className="bg-white/40 dark:bg-white/5 mx-auto mb-10 flex size-40 items-center justify-center rounded-[3rem] shadow-[0_24px_50px_rgba(0,0,0,0.04)] ring-1 ring-slate-100 backdrop-blur-md dark:shadow-none dark:ring-white/10">
            <div className="relative">
              <div className="bg-primary/20 absolute -inset-8 blur-3xl opacity-50" />
              <MessageCircle className="text-primary relative h-20 w-20 transform-gpu transition-transform duration-500 hover:scale-110" strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="mb-4 text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("welcomeTitle")}
          </h2>

          <p className="mb-10 text-lg leading-relaxed font-medium text-slate-500 dark:text-slate-400">
            {t("welcomeDescription")}
          </p>

          <div className="flex justify-center gap-5">
            <button
              onClick={onContacts}
              className="group flex items-center gap-3 rounded-[1.25rem] border border-slate-100 bg-white px-8 py-4 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:border-white/5 dark:bg-white/5 dark:text-white dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10"
            >
              <Contact className="text-primary h-5.5 w-5.5 transition-transform group-hover:rotate-12" />
              <span className="text-sm font-bold tracking-tight">{t("contacts")}</span>
            </button>

            <button
              onClick={onNewGroup}
              className="group flex items-center gap-3 rounded-[1.25rem] border border-slate-100 bg-white px-8 py-4 text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:border-white/5 dark:bg-white/5 dark:text-white dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10"
            >
              <Users className="text-primary h-5.5 w-5.5 transition-transform group-hover:-rotate-12" />
              <span className="text-sm font-bold tracking-tight">{t("newGroup")}</span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
          <Shield className="h-4 w-4 text-primary/60" />
          {t("encryption")}
        </div>
      </div>
    </main>
  );
};
