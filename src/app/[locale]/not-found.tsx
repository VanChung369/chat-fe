import { getTranslations } from "next-intl/server";
import { connection } from "next/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  await connection();
  const t = await getTranslations("NotFound");
  const year = new Date().getFullYear();

  return (
    <div className="bg-background relative flex min-h-screen flex-col overflow-hidden font-sans text-slate-200">
      {/* Background glow blobs */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="bg-primary/20 absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-pink-500/10 blur-[120px]" />
      </div>

      {/* Main content */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl text-center">
          {/* Giant 404 */}
          <div className="relative mb-8 flex justify-center">
            <h1 className="from-primary/80 to-background bg-linear-to-b bg-clip-text text-[10rem] leading-none font-black tracking-tighter text-transparent select-none md:text-[16rem]">
              {t("errorCode")}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/5 h-64 w-64 rounded-full blur-3xl" />
            </div>
          </div>

          {/* Text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 md:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-400 md:text-xl">
                {t("description")}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
              <Link
                href="/"
                className="group bg-primary shadow-primary/20 hover:shadow-primary/40 relative flex items-center gap-2 overflow-hidden rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-all active:scale-[0.98]"
              >
                <span>{t("backHome")}</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
              <Link
                href="/login"
                className="bg-surface-input hover:bg-surface-secondary flex items-center gap-2 rounded-xl border border-slate-700/50 px-8 py-4 font-semibold text-slate-200 transition-all active:scale-[0.98]"
              >
                <span>{t("login")}</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-footer relative z-10 flex w-full flex-col items-center justify-center gap-4 border-t border-slate-800/50 py-8">
        <p className="text-xs tracking-widest text-slate-500 uppercase">
          {t("copyright", { year })}
        </p>
      </footer>
    </div>
  );
}
