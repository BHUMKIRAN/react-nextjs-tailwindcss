'use client';

import { useState, useCallback } from 'react';
import { DroppedFile, DragDropEvent } from '../type/page';
import { handleDragOver, handleDragLeave, handleDrop, logDragEvent } from '../lib/dragDropHandlers';
import { isValidFile, generateFileId } from '../lib/fileValidator';

export const useDragDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<DroppedFile[]>([]);
  const [dragEvents, setDragEvents] = useState<DragDropEvent[]>([]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const event = handleDragOver(e);
    logDragEvent(event);
    setIsDragging(true);
    setDragEvents(prev => [...prev, event]);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const event = handleDragLeave(e);
    setIsDragging(false);
    logDragEvent(event);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    const { files, event } = handleDrop(e);
    logDragEvent(event);
    setIsDragging(false);

    files.forEach(file => {
      if (isValidFile(file)) {
        const droppedFile: DroppedFile = {
          id: generateFileId(),
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        };
        setDroppedFiles(prev => [...prev, droppedFile]);
        console.log(`✅ File added: ${file.name}`);
      } else {
        console.warn(`❌ Invalid file: ${file.name}`);
      }
    });
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setDroppedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const clearAll = useCallback(() => {
    setDroppedFiles([]);
    setDragEvents([]);
  }, []);

  return {
    isDragging,
    droppedFiles,
    dragEvents,
    onDragOver,
    onDragLeave,
    onDrop,
    removeFile,
    clearAll,
    setDroppedFiles,
  };
};