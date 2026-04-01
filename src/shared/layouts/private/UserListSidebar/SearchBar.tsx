import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="border-b border-gray-200 p-4 dark:border-gray-800">
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
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
