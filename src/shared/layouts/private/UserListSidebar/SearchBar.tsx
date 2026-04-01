import { Search } from "lucide-react";
import { Input } from "@/shared/components/input";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
      {/* Search Bar */}
      <Input
        placeholder="Search conversations..."
        startIcon={<Search size={18} />}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="dark:bg-surface-hover border-none bg-gray-100 text-sm text-gray-900 placeholder-gray-500 dark:text-white dark:placeholder-gray-400"
      />
    </div>
  );
};
