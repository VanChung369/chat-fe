"use client";

import { useState } from "react";
import { Avatar } from "@/shared/components/avatar";
import { cn } from "@/shared/utils";
import { SearchBar } from "./SearchBar";
import { ChatListContainer } from "./ChatListContainer";
import { FloatingActionButton } from "./FloatingActionButton";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>("1");
  const [activeFilter, setActiveFilter] = useState("All Chats");

  const filters = ["All Chats", "Unread", "Groups"];

  const renderChatItem = (chat: any, isSelected: boolean) => (
    <button
      key={chat.id}
      onClick={() => setSelectedChatId(chat.id)}
      className={cn(
        "group mb-2 flex w-full items-center gap-3 rounded-lg p-2 text-left transition-all duration-200",
        isSelected
          ? "border-indigo-500 bg-indigo-500/10 shadow-sm"
          : "dark:hover:bg-surface-hover hover:bg-slate-100"
      )}
    >
      <div className="relative shrink-0">
        {chat.isGroup ? (
          <Avatar
            name={chat.name}
            size="lg"
            showUnread
            unreadCount={chat.unread}
            showInitials
            className="h-12 w-12"
          />
        ) : (
          <Avatar
            name={chat.name}
            size="lg"
            status={chat.status}
            showStatus
            showUnread
            unreadCount={chat.unread}
            className="h-12 w-12"
          />
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
    <aside className="dark:bg-surface-sidebar z-20 flex h-full w-full max-w-90 shrink-0 flex-col border-r border-gray-200 bg-white md:max-w-100 dark:border-gray-800">
      {/* Search Bar */}
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Chat List Container */}
      <ChatListContainer
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        pinnedChats={PINNED_CHATS}
        allChats={ALL_CHATS}
        selectedChatId={selectedChatId}
        renderChatItem={renderChatItem}
      />

      {/* Floating Action Button for New Chat */}
      <FloatingActionButton />
    </aside>
  );
};
