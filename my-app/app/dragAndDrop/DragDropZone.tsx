'use client';

import React from 'react';
import { useDragDrop } from '../hooks/useDragDrop';
import { formatFileSize } from '../lib/fileValidator';
import { Cloud, File, Trash2 } from 'lucide-react';

interface DragDropZoneProps {
  onFilesReady: (files: any[]) => void;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({ onFilesReady }) => {
  const { isDragging, droppedFiles, onDragOver, onDragLeave, onDrop, removeFile } = useDragDrop();

  React.useEffect(() => {
    onFilesReady(droppedFiles);
  }, [droppedFiles, onFilesReady]);

  return (
    <div className="w-full">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative w-full p-8 rounded-lg border-2 border-dashed transition-all duration-300 ${
          isDragging
            ? 'border-blue-500 bg-blue-50 scale-105'
            : 'border-gray-300 bg-gray-50 hover:border-blue-400'
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <Cloud className={`w-16 h-16 ${isDragging ? 'text-blue-500 animate-bounce' : 'text-gray-400'}`} />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700">Drop your files here</p>
            <p className="text-sm text-gray-500">or drag and drop files to upload</p>
          </div>
        </div>
      </div>

      {droppedFiles.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Dropped Files ({droppedFiles.length})</h3>
          <div className="space-y-3">
            {droppedFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 flex-1">
                  <File className="w-5 h-5 text-gray-400" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};