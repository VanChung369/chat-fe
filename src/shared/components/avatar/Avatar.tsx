import React from "react";
import Image from "next/image";
import { cn } from "@/shared/utils";

/**
 * Avatar component props
 */
export interface AvatarProps {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  status?: "online" | "offline" | "away" | "busy";
  showStatus?: boolean;
  showTooltip?: boolean;
  unreadCount?: number;
  showUnread?: boolean;
  showInitials?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Premium Avatar component with support for:
 * - Image with fallback to initials
 * - Multiple sizes
 * - Status indicators (Online/Offline)
 * - Modern hover & ring effects
 */
export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = "md",
  status = "offline",
  showStatus = false,
  showTooltip = false,
  unreadCount = 0,
  showUnread = false,
  showInitials = false,
  className,
  onClick,
}) => {
  // Generate Initials (e.g., "John Doe" -> "JD")
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Size configurations
  const sizes = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-xl",
  };

  // Status indicator colors
  const statusColors = {
    online: "bg-emerald-500",
    offline: "bg-slate-500",
    away: "bg-amber-500",
    busy: "bg-rose-500",
  };

  return (
    <div
      className={cn(
        "relative shrink-0 select-none",
        sizes[size],
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      role="img"
      aria-label={`Avatar của ${name}`}
      title={showTooltip ? name : undefined}
    >
      <div
        className={cn(
          "border-outline-variant bg-surface-low flex h-full w-full items-center justify-center overflow-hidden rounded-full border transition-all duration-200",
          onClick &&
            "hover:ring-primary hover:ring-offset-background hover:ring-2 hover:ring-offset-2",
          showInitials && "bg-indigo-500 text-white"
        )}
      >
        {src && !showInitials ? (
          <Image
            src={src}
            alt={name}
            fill
            className="aspect-square h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <span
            className={cn(
              "flex h-full w-full items-center justify-center font-semibold",
              showInitials ? "text-white" : "text-text-strong"
            )}
          >
            {initials}
          </span>
        )}
      </div>

      {/* Online Status Indicator */}
      {showStatus && (
        <span
          className={cn(
            "absolute right-[2%] bottom-[2%] h-[28%] w-[28%] rounded-full border-2",
            "border-white dark:border-slate-900",
            statusColors[status]
          )}
          aria-hidden="true"
        />
      )}

      {/* Unread Count Badge */}
      {showUnread && unreadCount > 0 && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex min-h-5 min-w-5 items-center justify-center rounded-full border-2 text-[10px] font-black text-white",
            "bg-primary border-white dark:border-slate-950",
            unreadCount > 99 ? "px-1.5" : "h-5 w-5"
          )}
          aria-label={`${unreadCount} unread messages`}
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </div>
  );
};
