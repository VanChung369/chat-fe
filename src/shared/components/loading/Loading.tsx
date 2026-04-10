"use client";

import React, { useEffect, useState } from "react";
import LogoIcon from "../icons/LogoIcon";

interface LoadingProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
  delay?: number;
}

/**
 * Loading component with a premium, animated logo and spinner.
 */
const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  size = "md",
  className = "",
  label,
  delay = 0,
}) => {
  const frameSizeMap = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-20 w-20",
  };
  const iconSizeMap = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-14 w-14",
  };
  const [isVisible, setIsVisible] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) {
      setIsVisible(true);
      return;
    }

    setIsVisible(false);

    const timeoutId = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay]);

  if (!isVisible) {
    return null;
  }

  const containerClasses = fullscreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-darkest"
    : `flex flex-col items-center justify-center ${className}`;

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer pulse effect */}
        <div
          className={`absolute inset-0 animate-ping rounded-full bg-indigo-500/20 ${frameSizeMap[size]}`}
        ></div>

        {/* Main logo with rotation/pulse */}
        <div
          className={`relative flex items-center justify-center text-indigo-400 sm:text-indigo-500 ${frameSizeMap[size]}`}
        >
          <LogoIcon className={`${iconSizeMap[size]} animate-pulse`} />

          {/* Subtle spinning ring */}
          <div
            className={`absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400/40 ${frameSizeMap[size]}`}
          ></div>
        </div>
      </div>

      {label && (
        <p className="mt-4 animate-pulse text-sm font-medium tracking-wider text-zinc-400 uppercase">
          {label}
        </p>
      )}
    </div>
  );
};

export default Loading;
