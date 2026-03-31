"use client";

import { useTranslations } from "next-intl";
import PrivateLayout from "@/shared/layouts/private";
import { Rocket, MessageSquare, Search, Plus } from "lucide-react";
import { cn } from "@/shared/utils";
import { useAuthCtx } from "@/providers/AuthProvider";

/**
 * HomePage is the main authenticated dashboard of the application.
 */
export default function HomePage() {
  const { user } = useAuthCtx();
  const t = useTranslations("HomePage");

  const quickActions = [
    { title: "New Chat", icon: MessageSquare, color: "bg-indigo-500", href: "/chat" },
    { title: "Find Friends", icon: Search, color: "bg-emerald-500", href: "/contacts" },
    { title: "Get Started", icon: Rocket, color: "bg-amber-500", href: "/guide" },
  ];

  const firstName = user?.firstName || user?.username || "there";

  return (
    <PrivateLayout>
      <div className="flex flex-col gap-10">
        {/* Welcome Section */}
        <header className="animate-fade-in-up flex flex-col gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Welcome back, <span className="text-indigo-400 capitalize">{firstName}</span>!
          </h1>
          <p className="max-w-2xl text-lg text-zinc-400">
            {t("description")} Everything is ready for you to start connecting with your team.
          </p>
        </header>

        {/* Quick Actions */}
        <section className="animate-fade-in-up grid grid-cols-1 gap-6 delay-100 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                className="group relative flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:bg-zinc-800/80"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg",
                    action.color
                  )}
                >
                  <Icon size={24} />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-zinc-100">{action.title}</h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400">
                    Jump right into the action
                  </p>
                </div>
                <div className="absolute top-6 right-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <Plus size={20} className="text-indigo-400" />
                </div>
              </button>
            );
          })}
        </section>

        {/* Recent Activity Placeholder */}
        <section className="animate-fade-in-up flex flex-col gap-6 delay-200">
          <h2 className="text-xl text-xs font-semibold tracking-wide text-white uppercase opacity-50">
            Recent Conversations
          </h2>
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-800 bg-zinc-900/20 px-8 text-center transition-colors hover:border-zinc-700">
            <div className="mb-4 rounded-2xl bg-zinc-800/50 p-4 text-zinc-500">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-lg font-medium text-zinc-300">No active chats yet</h3>
            <p className="mt-2 text-zinc-500">
              Start a conversation with your teammates to see it here.
            </p>
            <button className="mt-6 rounded-full bg-indigo-500 px-8 py-2.5 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95">
              New Message
            </button>
          </div>
        </section>
      </div>
    </PrivateLayout>
  );
}
