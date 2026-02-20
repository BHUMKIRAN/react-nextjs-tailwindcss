export const isValidFile = (file: File): boolean => {
  const maxSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = ['image/', 'application/pdf', 'text/', 'application/msword', 'video/'];
  
  if (file.size > maxSize) return false;
  return allowedTypes.some(type => file.type.startsWith(type));
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

export const generateFileId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};