"use client";

import { useState } from "react";
import { useImageUpload } from "@/shared/hooks/useImageUpload";
import { Input } from "@/shared/components/input";
import { Upload, Image as ImageIcon, AlertCircle, CheckCircle } from "lucide-react";

export default function ImageUploadDemo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<any>(null);

  const { uploadImage, isUploading, error } = useImageUpload({
    onSuccess: (data) => {
      console.log("Upload thành công:", data);
      setUploadedImage(data);
    },
    onError: (error) => {
      console.error("Upload thất bại:", error);
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Tạo preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Reset uploaded image khi chọn file mới
      setUploadedImage(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    await uploadImage(selectedFile, selectedFile.name, "demo-uploads");
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Demo Upload Ảnh</h1>
          <p className="text-gray-600">Tải ảnh lên và xem kết quả</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Section */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <Upload className="h-5 w-5" />
                Upload Ảnh
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Chọn một ảnh từ máy tính của bạn để upload
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700">
                  Chọn file ảnh:
                </label>
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              {selectedFile && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="text-sm text-blue-800">
                    <strong>File đã chọn:</strong> {selectedFile.name}
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    Kích thước: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Đang upload...
                  </>
                ) : (
                  "Upload ảnh"
                )}
              </button>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  Lỗi: {error.message}
                </div>
              )}

              {uploadedImage && (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  Upload thành công!
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="flex items-center gap-2 text-xl font-semibold">
                <ImageIcon className="h-5 w-5" />
                Xem trước & Kết quả
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Xem trước ảnh trước khi upload và kết quả sau khi upload
              </p>
            </div>

            {previewUrl ? (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg border">
                  <img src={previewUrl} alt="Preview" className="h-64 w-full object-cover" />
                </div>

                {uploadedImage && (
                  <div className="space-y-3">
                    <h4 className="font-medium text-gray-900">Kết quả upload:</h4>
                    <div className="space-y-2 rounded-lg bg-gray-50 p-3 text-sm">
                      <div>
                        <span className="font-medium">File ID:</span>
                        <span className="ml-2 text-gray-600">{uploadedImage.fileId}</span>
                      </div>
                      <div>
                        <span className="font-medium">Tên file:</span>
                        <span className="ml-2 text-gray-600">{uploadedImage.name}</span>
                      </div>
                      <div>
                        <span className="font-medium">URL:</span>
                        <a
                          href={uploadedImage.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-2 text-blue-600 underline hover:text-blue-800"
                        >
                          Xem ảnh
                        </a>
                      </div>
                      {uploadedImage.size && (
                        <div>
                          <span className="font-medium">Kích thước:</span>
                          <span className="ml-2 text-gray-600">
                            {(uploadedImage.size / 1024).toFixed(2)} KB
                          </span>
                        </div>
                      )}
                      {uploadedImage.width && uploadedImage.height && (
                        <div>
                          <span className="font-medium">Kích thước ảnh:</span>
                          <span className="ml-2 text-gray-600">
                            {uploadedImage.width} x {uploadedImage.height}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <button
                  onClick={handleReset}
                  className="w-full rounded-lg bg-gray-100 px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-200"
                >
                  Chọn ảnh khác
                </button>
              </div>
            ) : (
              <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                <ImageIcon className="mb-4 h-16 w-16" />
                <p className="text-sm">Chọn một ảnh để xem trước</p>
              </div>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-6 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Hướng dẫn sử dụng</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• Chọn một file ảnh từ máy tính của bạn</p>
            <p>• Xem trước ảnh ở phần bên phải</p>
            <p>• Nhấn "Upload ảnh" để upload lên server</p>
            <p>• Xem kết quả với URL và thông tin file</p>
            <p>• Có thể upload nhiều ảnh khác nhau</p>
          </div>
        </div>
      </div>
    </div>
  );
}
