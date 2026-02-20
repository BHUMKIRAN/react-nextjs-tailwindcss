import React from 'react'
import { DownloadModal } from './DownloadModal'
import { FileUploadModal } from './FileUploadModal'
import { DragDropZone } from './DragDropZone'

const dnd = () => {
  return (
    <div>
        <DownloadModal/>
        <FileUploadModal/>
        <DragDropZone/>
    </div>
  )
}

export default dnd