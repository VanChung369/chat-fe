export type UploadDirectPayload = {
  file: File;
  fileName: string;
  folder: string;
};

export type UploadDirectResponse = {
  fileId: string;
  url: string;
};
