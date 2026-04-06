import { MessageSquarePlus } from "lucide-react";
import { cn } from "@/shared/utils";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <div className={cn("border-t bg-white p-4", "border-gray-200", "dark:border-gray-800 dark:bg-surface-sidebar")}>
      <button
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-bold text-white transition-colors",
          "bg-indigo-500 shadow-lg shadow-indigo-900/20 hover:bg-indigo-600"
        )}
        onClick={onClick}
      >
        <MessageSquarePlus size={20} />
        New Chat
      </button>
    </div>
  );
};
