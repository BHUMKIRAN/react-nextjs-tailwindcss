'use client';

import React from 'react';
import { DroppedFile } from '../type/page';
import { Download, X, FileText } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: DroppedFile[];
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose, files }) => {
  const handleDownload = (file: DroppedFile) => {
    // Create a blob URL from the file
    const url = URL.createObjectURL(file.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log(`📥 Downloaded: ${file.name}`);
  };

  const handleDownloadAll = () => {
    files.forEach(file => handleDownload(file));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Files
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {files.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No files available</p>
          ) : (
            <>
              {/* Download All Button */}
              <button
                onClick={handleDownloadAll}
                className="w-full mb-4 flex items-center justify-center gap-2 p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" /> Download All
              </button>

              {/* Individual File List */}
              <div className="space-y-3">
                {files.map(file => (
                  <button
                    key={file.id}
                    onClick={() => handleDownload(file)}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 transition-all group"
                  >
                    <div className="flex items-center gap-3 flex-1 text-left">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <Download className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};