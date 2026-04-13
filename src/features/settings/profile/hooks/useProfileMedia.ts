"use client";

import { useState } from "react";
import { toast } from "sonner";

import { profileApi } from "@/features/settings/api";
import type { ErrorResponse } from "@/shared/types/errors";
import { PROFILE_UPLOAD_FOLDERS } from "../constants/constants";

type ProfileMediaKind = "avatar" | "banner";

type UseProfileMediaParams = {
  fallbackErrorMessage: string;
};

export function useProfileMedia({ fallbackErrorMessage }: UseProfileMediaParams) {
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  async function uploadMedia(kind: ProfileMediaKind, file: File): Promise<string | null> {
    const setUploading = kind === "avatar" ? setIsAvatarUploading : setIsBannerUploading;

    setUploading(true);

    try {
      const uploadedFile = await profileApi.uploadDirect({
        file,
        fileName: file.name,
        folder: kind === "avatar" ? PROFILE_UPLOAD_FOLDERS.avatar : PROFILE_UPLOAD_FOLDERS.banner,
      });

      return uploadedFile.url;
    } catch (error) {
      const err = error as ErrorResponse;
      toast.error(err.message || fallbackErrorMessage);

      return null;
    } finally {
      setUploading(false);
    }
  }

  return {
    isAvatarUploading,
    isBannerUploading,
    uploadAvatar: (file: File) => uploadMedia("avatar", file),
    uploadBanner: (file: File) => uploadMedia("banner", file),
  };
}
