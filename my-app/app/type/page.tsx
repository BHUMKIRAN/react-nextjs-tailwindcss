export interface DragItem {
  id: string;
  name: string;
  type: string;
}

export interface DroppedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: string;
}

export interface DragDropEvent {
  type: 'dragover' | 'drop' | 'dragleave';
  timestamp: number;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
}