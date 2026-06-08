export interface UploadedNote {
  id: number;

  title: string;

  originalName: string;

  filePath: string;

  extractedText: string;

  status:
    | "PENDING"
    | "PROCESSING"
    | "READY"
    | "FAILED";

  createdAt: string;
}