import { uploadFileToFirebase } from '@/app/lib/utils/firebase.utils'
import Picture from './Picture'
import { useRef, useState } from 'react'
import { ImageIcon, Loader2, X } from 'lucide-react'

export function UploadZone({ value, onChange }: { value: string; onChange: (url: string, filename: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files are allowed.')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image must be under 10MB.')
      return
    }
    setUploadError(null)
    setUploading(true)
    setProgress(0)
    try {
      const url = await uploadFileToFirebase(file, setProgress, 'image')
      onChange(url, file.name)
    } catch (err) {
      setUploadError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function clearImage() {
    onChange('', '')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="sr-only"
        id="image-upload"
        aria-label="Upload image"
      />

      {value ? (
        /* Preview */
        <div className="relative border border-border-light dark:border-border-dark overflow-hidden">
          <Picture priority={false} src={value} alt="Uploaded preview" className="w-full h-40 object-cover" />
          <button
            type="button"
            onClick={clearImage}
            aria-label="Remove image"
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center bg-black/60 text-white hover:bg-black/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        /* Drop zone */
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          disabled={uploading}
          aria-label="Upload image — click or drag and drop"
          className={`w-full h-32 flex flex-col items-center justify-center gap-2 border border-dashed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light disabled:cursor-not-allowed
            ${
              dragOver
                ? 'border-primary-light dark:border-primary-dark bg-primary-light/5 dark:bg-primary-dark/5'
                : 'border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark bg-surface-light dark:bg-surface-dark'
            }`}
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 text-primary-light dark:text-primary-dark animate-spin" aria-hidden="true" />
              <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
                Uploading {Math.round(progress)}%
              </span>
              <div className="w-24 h-px bg-border-light dark:bg-border-dark relative overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-primary-light dark:bg-primary-dark transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <ImageIcon className="w-5 h-5 text-muted-light dark:text-muted-dark" aria-hidden="true" />
              <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
                Click or drag to upload
              </span>
              <span className="font-inter text-[10px] text-muted-light/50 dark:text-muted-dark/50">
                JPG, PNG, WebP · max 10MB
              </span>
            </>
          )}
        </button>
      )}

      {uploadError && (
        <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
          {uploadError}
        </p>
      )}
    </div>
  )
}
