"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { ABOUT_MAX_LENGTH } from "../constants/constants";
import type { ProfileFormValues } from "../types/types";

export default function AboutCounter() {
  const { control } = useFormContext<ProfileFormValues>();
  const about = useWatch({
    control,
    name: "about",
  });

  return (
    <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs">
      {about.length}/{ABOUT_MAX_LENGTH}
    </span>
  );
}
