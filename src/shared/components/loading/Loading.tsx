"use client";

import React from "react";
import LogoIcon from "../icons/LogoIcon";

interface LoadingProps {
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

/**
 * Loading component with a premium, animated logo and spinner.
 */
const Loading: React.FC<LoadingProps> = ({
  fullscreen = false,
  size = "md",
  className = "",
  label,
}) => {
  const sizeMap = {
    sm: "h-6 w-6",
    md: "h-12 w-12",
    lg: "h-20 w-20",
  };

  const containerClasses = fullscreen
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-surface-darkest"
    : `flex flex-col items-center justify-center ${className}`;

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer pulse effect */}
        <div
          className={`absolute inset-0 animate-ping rounded-full bg-indigo-500/20 ${sizeMap[size]}`}
        ></div>

        {/* Main logo with rotation/pulse */}
        <div
          className={`relative flex items-center justify-center text-indigo-400 sm:text-indigo-500`}
        >
          <LogoIcon className={`${sizeMap[size]} animate-pulse`} />

          {/* Subtle spinning ring */}
          <div
            className={`absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400/40 ${sizeMap[size]}`}
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
