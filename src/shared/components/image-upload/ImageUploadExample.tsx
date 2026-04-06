import { useState } from "react";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { FormSubmitButton } from "@/shared/components/form";
import { Input } from "@/shared/components/input";

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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
        />
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
