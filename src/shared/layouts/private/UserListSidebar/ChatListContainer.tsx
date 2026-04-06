import { Pin } from "lucide-react";
import { cn } from "@/shared/utils";

interface Chat {
  id: string;
  name: string;
  status: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup?: boolean;
}

interface ChatListContainerProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  pinnedChats: Chat[];
  allChats: Chat[];
  selectedChatId: string | null;
  renderChatItem: (chat: Chat, isSelected: boolean) => React.ReactNode;
}

export const ChatListContainer: React.FC<ChatListContainerProps> = ({
  filters,
  activeFilter,
  onFilterChange,
  pinnedChats,
  allChats,
  selectedChatId,
  renderChatItem,
}) => {
  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto">
      {/* Filters */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap shadow-sm transition-all",
              activeFilter === filter
                ? cn("bg-indigo-500 text-white shadow-indigo-500/30")
                : cn(
                    "bg-gray-100 text-gray-600 hover:bg-gray-200",
                    "dark:bg-surface-hover dark:text-gray-300 dark:hover:bg-surface-hover-deep"
                  )
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Pinned Section */}
      <div className="px-4 pt-2 pb-2">
        <div
          className={cn(
            "mb-2 flex items-center gap-2 px-2 text-xs font-bold uppercase tracking-wider",
            "text-gray-400"
          )}
        >
          <Pin size={14} className="fill-current" />
          Pinned
        </div>
        {pinnedChats.map((chat) => renderChatItem(chat, selectedChatId === chat.id))}
      </div>

      {/* All Chats Section */}
      <div className="px-4 pt-4 pb-2">
        <div className={cn("mb-2 px-2 text-xs font-bold uppercase tracking-wider", "text-gray-400")}>
          All Chats
        </div>
        {allChats.map((chat) => renderChatItem(chat, selectedChatId === chat.id))}
      </div>
    </div>
  );
};
