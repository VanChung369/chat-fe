import { MessageSquarePlus } from "lucide-react";

interface FloatingActionButtonProps {
  onClick?: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <div className="dark:bg-surface-sidebar border-t border-gray-200 bg-white p-4 dark:border-gray-800">
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-900/20 transition-colors hover:bg-indigo-600"
        onClick={onClick}
      >
        <MessageSquarePlus size={20} />
        New Chat
      </button>
    </div>
  );
};
