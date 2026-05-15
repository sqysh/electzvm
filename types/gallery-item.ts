export interface GalleryItem {
  id: string
  url: string
  filename: string
  type: 'image' | 'video'
  createdAt: Date
}

export interface UploadItem {
  id: string
  file: File
  type: 'image' | 'video'
  progress: number
  status: 'pending' | 'uploading' | 'done' | 'error'
  error?: string
  url?: string
}
