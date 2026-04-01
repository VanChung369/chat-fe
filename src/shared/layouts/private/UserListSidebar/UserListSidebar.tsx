"use client";

import React, { useState } from "react";
import { Search, Settings, Pin, MessageSquarePlus } from "lucide-react";
import { Avatar } from "@/shared/components/avatar";
import { cn } from "@/shared/utils";
import { useAuthCtx } from "@/providers/AuthProvider";

// Mock Data for Users/Conversations
const PINNED_CHATS = [
  {
    id: "p1",
    name: "Alice Smith",
    status: "online",
    lastMessage: "Hey, are we still on for the meeting?",
    time: "10:42 AM",
    unread: 0,
  },
  {
    id: "p2",
    name: "Design Team",
    status: "online",
    lastMessage: "files have been uploaded by Mark",
    time: "09:15 AM",
    unread: 2,
    isGroup: true,
  },
];

const ALL_CHATS = [
  {
    id: "1",
    name: "John Doe",
    status: "offline",
    lastMessage: "Let me know when you see this.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "2",
    name: "Sarah Connor",
    status: "online",
    lastMessage: "I'll check the schedule and get back to you.",
    time: "Mon",
    unread: 0,
  },
  {
    id: "3",
    name: "Michael Chen",
    status: "offline",
    lastMessage: "Can you send over the updated slides?",
    time: "Sun",
    unread: 0,
  },
  {
    id: "4",
    name: "Project X Updates",
    status: "online",
    lastMessage: "Lisa: Good job everyone!",
    time: "Last week",
    unread: 0,
    isGroup: true,
  },
];

export const UserListSidebar = () => {
  const { user } = useAuthCtx();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");
  const [activeFilter, setActiveFilter] = useState("All Chats");

  const filters = ["All Chats", "Unread", "Groups"];

  const renderChatItem = (chat: any, isSelected: boolean) => (
    <button
      key={chat.id}
      onClick={() => setSelectedChatId(chat.id)}
      className={cn(
        "group mb-1 flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200",
        isSelected
          ? "border-l-4 border-indigo-500 bg-indigo-500/10 shadow-sm"
          : "dark:hover:bg-surface-hover hover:bg-slate-100"
      )}
    >
      <div className="relative shrink-0">
        {chat.isGroup ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 font-bold text-white shadow-sm">
            {chat.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
        ) : (
          <Avatar
            name={chat.name}
            size="lg"
            status={chat.status}
            showStatus
            className="h-12 w-12"
          />
        )}
        {chat.unread > 0 && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-500 text-[10px] font-bold text-white dark:border-slate-900">
            {chat.unread}
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between">
          <h3
            className={cn(
              "truncate text-sm font-semibold transition-colors",
              isSelected ? "text-indigo-500" : "text-slate-900 dark:text-white"
            )}
          >
            {chat.name}
          </h3>
          <span
            className={cn(
              "text-[10px]",
              chat.unread > 0 ? "font-medium text-indigo-500" : "text-slate-500 dark:text-gray-400"
            )}
          >
            {chat.time}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-gray-400">
          {chat.lastMessage}
        </p>
      </div>
    </button>
  );

  return (
    <aside className="dark:bg-surface-sidebar z-20 flex h-full w-full max-w-[360px] shrink-0 flex-col border-r border-gray-200 bg-white md:max-w-[400px] dark:border-gray-800">
      {/* Sidebar Header */}
      <div className="border-b border-gray-200 p-4 dark:border-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar
                name={user?.username || "Me"}
                size="md"
                status="online"
                showStatus
                className="ring-2 ring-gray-100 dark:ring-gray-800"
              />
            </div>
            <div>
              <h1 className="text-base leading-none font-semibold text-slate-900 dark:text-white">
                My Account
              </h1>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <button className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-indigo-500 dark:text-gray-400 dark:hover:bg-gray-800">
            <Settings size={22} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative flex w-full items-center">
          <span className="absolute left-3 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search conversations..."
            className="dark:bg-surface-hover w-full rounded-lg border-none bg-gray-100 py-2.5 pr-4 pl-10 text-sm text-gray-900 placeholder-gray-500 transition-shadow focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:text-white dark:placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Chat List Container */}
      <div className="custom-scrollbar flex-1 overflow-y-auto">
        {/* Filters */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-sm transition-all",
                activeFilter === filter
                  ? "bg-indigo-500 text-white shadow-indigo-500/30"
                  : "dark:bg-surface-hover dark:hover:bg-surface-hover-deep bg-gray-100 text-gray-600 hover:bg-gray-200 dark:text-gray-300"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Pinned Section */}
        <div className="px-4 pt-2 pb-2">
          <div className="mb-2 flex items-center gap-2 px-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
            <Pin size={14} className="fill-current" />
            Pinned
          </div>
          {PINNED_CHATS.map((chat) => renderChatItem(chat, selectedChatId === chat.id))}
        </div>

        {/* All Chats Section */}
        <div className="px-4 pt-4 pb-2">
          <div className="mb-2 px-2 text-xs font-bold tracking-wider text-gray-400 uppercase">
            All Chats
          </div>
          {ALL_CHATS.map((chat) => renderChatItem(chat, selectedChatId === chat.id))}
        </div>
      </div>

      {/* Floating Action Button for New Chat */}
      <div className="dark:bg-surface-sidebar border-t border-gray-200 bg-white p-4 dark:border-gray-800">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition-colors hover:bg-indigo-600">
          <MessageSquarePlus size={20} />
          New Chat
        </button>
      </div>
    </aside>
  );
};
