import { FormSubmitButton } from "@/shared/components/form";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { useState } from "react";

import { BaseImageUpload } from "./BaseImageUpload";

export function ImageUploadExample() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string>("");

  const { uploadImage, isUploading, error } = useImageUpload({
    onSuccess: (data) => {
      console.log("Upload success:", data);
      setUploadedImage(data.url);
    },
    onError: (error) => {
      console.error("Upload error:", error);
    },
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadImage(selectedFile, selectedFile.name, "avatars");
  };

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">Upload ảnh ví dụ</h3>

      <div className="space-y-2">
        <label htmlFor="image-upload" className="block text-sm font-medium">
          Chọn ảnh:
        </label>
        <BaseImageUpload onSelect={(file) => setSelectedFile(file)}>
          {({ disabled, openPicker }) => (
            <button
              id="image-upload"
              type="button"
              onClick={openPicker}
              disabled={disabled}
              className="w-full rounded-lg border border-dashed border-slate-300 px-4 py-3 text-left text-sm text-slate-600 transition-colors hover:border-slate-400 hover:text-slate-900"
            >
              {selectedFile ? selectedFile.name : "Chọn file ảnh"}
            </button>
          )}
        </BaseImageUpload>
      </div>

      <FormSubmitButton
        onClick={handleUpload}
        disabled={!selectedFile || isUploading}
        className="w-full"
      >
        {isUploading ? "Đang upload..." : "Upload ảnh"}
      </FormSubmitButton>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">Lỗi: {error.message}</div>
      )}

      {uploadedImage && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Ảnh đã upload:</p>
          <div className="relative overflow-hidden rounded-lg border">
            <img src={uploadedImage} alt="Uploaded" className="h-48 w-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
