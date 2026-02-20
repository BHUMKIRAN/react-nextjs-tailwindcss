import { DragDropEvent } from '../type/page';

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  e.dataTransfer.dropEffect = 'copy';
  return { type: 'dragover', timestamp: Date.now() } as DragDropEvent;
};

export const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  return { type: 'dragleave', timestamp: Date.now() } as DragDropEvent;
};

export const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
  
  const files = Array.from(e.dataTransfer.files);
  return { files, event: { type: 'drop', timestamp: Date.now() } as DragDropEvent };
};

export const logDragEvent = (event: DragDropEvent) => {
  console.log(`[${new Date(event.timestamp).toLocaleTimeString()}] Event: ${event.type}`);
};