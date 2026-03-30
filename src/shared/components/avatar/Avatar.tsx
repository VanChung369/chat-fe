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
        "relative flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full border border-outline-variant bg-surface-low transition-all duration-200",
        sizes[size],
        onClick && "cursor-pointer hover:ring-2 hover:ring-primary hover:ring-offset-2 hover:ring-offset-background",
        className
      )}
      onClick={onClick}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="aspect-square h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      ) : (
        <span className="flex h-full w-full items-center justify-center font-semibold text-text-strong">
          {initials}
        </span>
      )}

      {/* Online Status Indicator */}
      {showStatus && (
        <span
          className={cn(
            "absolute bottom-0 right-0 h-[25%] w-[25%] rounded-full border-2 border-background",
            statusColors[status]
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
};
