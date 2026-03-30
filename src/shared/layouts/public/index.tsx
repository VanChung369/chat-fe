import { type ReactNode } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChatIcon } from "@/shared/components/icons";

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const t = useTranslations("AuthLayout");

  return (
    <main className="bg-background flex min-h-screen w-full overflow-hidden">
      <div className="bg-surface-low relative hidden items-center justify-center overflow-hidden lg:flex lg:w-1/2">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/bg-image-auth.webp"
            alt="Background"
            fill
            priority
            quality={95}
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-cover"
          />

          <div className="bg-auth-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-2xl p-12 text-center">
          <div className="animate-fade-in-up mb-10 flex justify-center">
            <div className="relative">
              <div className="bg-primary/20 absolute -inset-10 blur-3xl" />
              <div className="animate-float relative rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl">
                <ChatIcon className="size-12 text-white drop-shadow-lg" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="animate-fade-in-up text-2xl leading-tight font-extrabold tracking-tight text-slate-200 delay-100">
              {t("title")}
            </h2>
            <p className="animate-fade-in-up mx-auto max-w-lg text-lg leading-relaxed font-medium text-slate-300 delay-200">
              {t("description")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-background relative flex w-full flex-col items-center justify-center overflow-y-auto px-6 lg:w-1/2 lg:px-12">
        <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
          <div className="text-primary size-8">
            <ChatIcon className="h-full w-full" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">{t("chatApp")}</span>
        </div>

        <div className="w-full max-w-lg">{children}</div>

        <footer className="animate-fade-in-up absolute bottom-8 w-full text-center text-xs font-medium text-zinc-500 delay-1000">
          {t("copyright", { year: new Date().getFullYear() })}
        </footer>
      </div>
    </main>
  );
};

export default PublicLayout;
