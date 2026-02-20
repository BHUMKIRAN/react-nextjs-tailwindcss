'use client';

import { useState, useCallback } from 'react';
import { UploadProgress, DroppedFile } from '../type/page';

export const useFileUpload = () => {
  const [uploadProgress, setUploadProgress] = useState<Map<string, UploadProgress>>(new Map());
  const [uploadedFiles, setUploadedFiles] = useState<DroppedFile[]>([]);

  const saveToLocalStorage = useCallback((files: DroppedFile[]) => {
    try {
      const fileData = files.map(f => ({
        id: f.id,
        name: f.name,
        size: f.size,
        type: f.type,
        uploadedAt: f.uploadedAt,
      }));
      localStorage.setItem('dragDropFiles', JSON.stringify(fileData));
      console.log('✅ Files saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving to localStorage:', error);
    }
  }, []);

  const loadFromLocalStorage = useCallback((): DroppedFile[] => {
    try {
      const data = localStorage.getItem('dragDropFiles');
      if (data) {
        const files = JSON.parse(data);
        console.log('✅ Files loaded from localStorage');
        return files;
      }
    } catch (error) {
      console.error('❌ Error loading from localStorage:', error);
    }
    return [];
  }, []);

  const simulateUpload = useCallback((fileId: string, fileName: string) => {
    return new Promise<void>((resolve) => {
      setUploadProgress(prev => new Map(prev).set(fileId, { fileId, progress: 0, status: 'uploading' }));
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress(prev => new Map(prev).set(fileId, { fileId, progress: 100, status: 'completed' }));
          console.log(`✅ Upload complete: ${fileName}`);
          resolve();
        } else {
          setUploadProgress(prev => new Map(prev).set(fileId, { fileId, progress, status: 'uploading' }));
        }
      }, 300);
    });
  }, []);

  const clearUploadProgress = useCallback((fileId: string) => {
    setUploadProgress(prev => {
      const newMap = new Map(prev);
      newMap.delete(fileId);
      return newMap;
    });
  }, []);

  return {
    uploadProgress,
    uploadedFiles,
    setUploadedFiles,
    saveToLocalStorage,
    loadFromLocalStorage,
    simulateUpload,
    clearUploadProgress,
  };
};