"use client";

import { useState } from "react";
import { API_ROUTES } from "@/shared/constants";
import { fetchClient } from "@/shared/utils/fetch-api";

interface UseImageUploadOptions {
  onSuccess?: (data: ImageUploadResponse) => void;
  onError?: (error: Error) => void;
}

export interface ImageUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl?: string;
  filePath?: string;
  size?: number;
  width?: number;
  height?: number;
}

export const useImageUpload = (options?: UseImageUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const uploadImage = async (
    file: File,
    fileName: string,
    folder?: string
  ): Promise<ImageUploadResponse | null> => {
    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      if (folder) {
        formData.append("folder", folder);
      }

      const response = await fetchClient.post<ImageUploadResponse>(
        API_ROUTES.imageStorage.upload,
        formData
      );

      options?.onSuccess?.(response);
      return response;
    } catch (err) {
      const uploadError = err instanceof Error ? err : new Error("Upload failed");
      setError(uploadError);
      options?.onError?.(uploadError);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    error,
  };
};
