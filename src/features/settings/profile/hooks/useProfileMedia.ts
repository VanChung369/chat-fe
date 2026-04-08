"use client";

import { useEffect, useReducer, useRef } from "react";
import { toast } from "sonner";

import { profileApi } from "@/features/settings/api";
import type { ErrorResponse } from "@/shared/types/errors";

import { AVATAR_IMAGE_URL, BANNER_IMAGE_URL, PROFILE_UPLOAD_FOLDERS } from "../constants/constants";

type ProfileMediaKind = "avatar" | "banner";

type ProfileMediaState = {
  avatarPreviewUrl: string | null;
  bannerPreviewUrl: string | null;
  stagedAvatarUrl: string | null;
  stagedBannerUrl: string | null;
  isAvatarUploading: boolean;
  isBannerUploading: boolean;
};

type ProfileMediaAction =
  | { type: "start-upload"; kind: ProfileMediaKind; previewUrl: string }
  | { type: "finish-upload"; kind: ProfileMediaKind; url: string }
  | { type: "fail-upload"; kind: ProfileMediaKind }
  | { type: "clear-staged" };

const initialProfileMediaState: ProfileMediaState = {
  avatarPreviewUrl: null,
  bannerPreviewUrl: null,
  stagedAvatarUrl: null,
  stagedBannerUrl: null,
  isAvatarUploading: false,
  isBannerUploading: false,
};

function profileMediaReducer(
  state: ProfileMediaState,
  action: ProfileMediaAction
): ProfileMediaState {
  switch (action.type) {
    case "start-upload":
      return {
        ...state,
        avatarPreviewUrl: action.kind === "avatar" ? action.previewUrl : state.avatarPreviewUrl,
        bannerPreviewUrl: action.kind === "banner" ? action.previewUrl : state.bannerPreviewUrl,
        isAvatarUploading: action.kind === "avatar" ? true : state.isAvatarUploading,
        isBannerUploading: action.kind === "banner" ? true : state.isBannerUploading,
      };
    case "finish-upload":
      return {
        ...state,
        avatarPreviewUrl: action.kind === "avatar" ? null : state.avatarPreviewUrl,
        bannerPreviewUrl: action.kind === "banner" ? null : state.bannerPreviewUrl,
        stagedAvatarUrl: action.kind === "avatar" ? action.url : state.stagedAvatarUrl,
        stagedBannerUrl: action.kind === "banner" ? action.url : state.stagedBannerUrl,
        isAvatarUploading: action.kind === "avatar" ? false : state.isAvatarUploading,
        isBannerUploading: action.kind === "banner" ? false : state.isBannerUploading,
      };
    case "fail-upload":
      return {
        ...state,
        avatarPreviewUrl: action.kind === "avatar" ? null : state.avatarPreviewUrl,
        bannerPreviewUrl: action.kind === "banner" ? null : state.bannerPreviewUrl,
        isAvatarUploading: action.kind === "avatar" ? false : state.isAvatarUploading,
        isBannerUploading: action.kind === "banner" ? false : state.isBannerUploading,
      };
    case "clear-staged":
      return {
        ...state,
        avatarPreviewUrl: null,
        bannerPreviewUrl: null,
        stagedAvatarUrl: null,
        stagedBannerUrl: null,
      };
    default:
      return state;
  }
}

type UseProfileMediaParams = {
  currentAvatarUrl?: string | null;
  currentBannerUrl?: string | null;
  fallbackErrorMessage: string;
};

export function useProfileMedia({
  currentAvatarUrl,
  currentBannerUrl,
  fallbackErrorMessage,
}: UseProfileMediaParams) {
  const [state, dispatch] = useReducer(profileMediaReducer, initialProfileMediaState);
  const avatarPreviewUrlRef = useRef<string | null>(null);
  const bannerPreviewUrlRef = useRef<string | null>(null);

  const avatarImageUrl =
    state.avatarPreviewUrl || state.stagedAvatarUrl || currentAvatarUrl || AVATAR_IMAGE_URL;
  const bannerImageUrl =
    state.bannerPreviewUrl || state.stagedBannerUrl || currentBannerUrl || BANNER_IMAGE_URL;

  const hasPendingChanges = !!state.stagedAvatarUrl || !!state.stagedBannerUrl;

  function revokePreviewUrl(kind: ProfileMediaKind) {
    const currentUrl = kind === "avatar" ? avatarPreviewUrlRef.current : bannerPreviewUrlRef.current;

    if (!currentUrl) {
      return;
    }

    URL.revokeObjectURL(currentUrl);

    if (kind === "avatar") {
      avatarPreviewUrlRef.current = null;
      return;
    }

    bannerPreviewUrlRef.current = null;
  }

  async function uploadMedia(kind: ProfileMediaKind, file: File) {
    const previewUrl = URL.createObjectURL(file);

    revokePreviewUrl(kind);

    if (kind === "avatar") {
      avatarPreviewUrlRef.current = previewUrl;
    } else {
      bannerPreviewUrlRef.current = previewUrl;
    }

    dispatch({
      type: "start-upload",
      kind,
      previewUrl,
    });

    try {
      const uploadedFile = await profileApi.uploadDirect({
        file,
        fileName: file.name,
        folder: kind === "avatar" ? PROFILE_UPLOAD_FOLDERS.avatar : PROFILE_UPLOAD_FOLDERS.banner,
      });

      revokePreviewUrl(kind);
      dispatch({
        type: "finish-upload",
        kind,
        url: uploadedFile.url,
      });
    } catch (error) {
      revokePreviewUrl(kind);
      dispatch({
        type: "fail-upload",
        kind,
      });

      const err = error as ErrorResponse;
      toast.error(err.message || fallbackErrorMessage);
    }
  }

  function clearStagedImages() {
    revokePreviewUrl("avatar");
    revokePreviewUrl("banner");
    dispatch({ type: "clear-staged" });
  }

  useEffect(() => {
    return () => {
      revokePreviewUrl("avatar");
      revokePreviewUrl("banner");
    };
  }, []);

  return {
    avatarImageUrl,
    bannerImageUrl,
    isAvatarUploading: state.isAvatarUploading,
    isBannerUploading: state.isBannerUploading,
    stagedAvatarUrl: state.stagedAvatarUrl,
    stagedBannerUrl: state.stagedBannerUrl,
    hasPendingChanges,
    selectAvatar(file: File) {
      return uploadMedia("avatar", file);
    },
    selectBanner(file: File) {
      return uploadMedia("banner", file);
    },
    clearStagedImages,
  };
}
