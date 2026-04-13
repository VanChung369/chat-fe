import { Search } from "lucide-react";
import { Input } from "@/shared/components/input";
import { cn } from "@/shared/utils";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className={cn("border-b p-4", "border-gray-200", "dark:border-gray-800")}>
      {/* Search Bar */}
      <Input
        placeholder="Search conversations..."
        startIcon={<Search size={18} />}
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className={cn(
          "border-none bg-gray-100 text-sm text-gray-900 placeholder-gray-500",
          "dark:bg-surface-hover dark:text-white dark:placeholder-gray-400"
        )}
      />
    </div>
  );
};
