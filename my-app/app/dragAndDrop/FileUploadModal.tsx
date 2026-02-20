'use client';

import React, { useState } from 'react';
import { useFileUpload } from '../hooks/useFileUpload';
import { DroppedFile, UploadProgress } from '../type/page';
import { Upload, X, Check } from 'lucide-react';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: DroppedFile[];
  onSuccess?: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ isOpen, onClose, files, onSuccess }) => {
  const { uploadProgress, saveToLocalStorage, simulateUpload } = useFileUpload();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);
    saveToLocalStorage(files);

    for (const file of files) {
      await simulateUpload(file.id, file.name);
    }

    setIsUploading(false);
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Files
          </h2>
          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {files.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No files selected</p>
          ) : (
            <div className="space-y-3">
              {files.map(file => {
                const progress = uploadProgress.get(file.id);
                return (
                  <div key={file.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-800 truncate text-sm">{file.name}</p>
                      {progress?.status === 'completed' && (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                    </div>
                    {progress && (
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-500 h-full transition-all duration-300"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {progress ? `${Math.round(progress.progress)}%` : 'Pending'}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex gap-3 p-6 border-t bg-white">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading || files.length === 0}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Upload
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};