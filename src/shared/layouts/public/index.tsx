import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChatIcon } from "@/shared/components/icons";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("AuthLayout");

  return (
    <main className="bg-gradient-main dark:bg-surface-darkest flex min-h-screen w-full overflow-hidden dark:bg-none">
      <div className="relative hidden items-center justify-center overflow-hidden bg-slate-900 lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/bg-image-auth.webp"
            alt="Background"
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-cover"
          />
        </div>
        <div className="bg-auth-overlay absolute inset-0 z-1" />

        <div className="relative z-10 max-w-2xl p-12 text-center">
          <div className="animate-fade-in-up mb-10 flex justify-center">
            <div className="relative">
              <div className="bg-primary/30 absolute -inset-10 blur-3xl" />
              <div className="animate-float relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-[0_32px_64px_rgba(0,0,0,0.5)] backdrop-blur-md">
                <ChatIcon className="size-14 text-white drop-shadow-2xl" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="animate-fade-in-up text-3xl leading-tight font-extrabold tracking-tight text-white delay-100">
              {t("title")}
            </h2>
            <p className="animate-fade-in-up mx-auto max-w-lg text-lg leading-relaxed font-medium text-slate-300 delay-200">
              {t("description")}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-y-auto px-6 lg:w-1/2 lg:px-12">
        <div className="absolute top-10 left-10 flex items-center gap-3 lg:hidden">
          <div className="text-primary size-9">
            <ChatIcon className="h-full w-full" />
          </div>
          <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
            {t("chatApp")}
          </span>
        </div>

        <div className="w-full max-w-lg">{children}</div>

        <footer className="animate-fade-in-up absolute bottom-8 w-full text-center text-[11px] font-bold tracking-widest text-slate-500/80 uppercase delay-1000 dark:text-slate-400/50">
          {t("copyright", { year: new Date().getFullYear() })}
        </footer>
      </div>
    </main>
  );
};

export default PublicLayout;
