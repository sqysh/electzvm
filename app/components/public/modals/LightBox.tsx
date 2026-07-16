import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import Picture from '../../elements/Picture'

export function Lightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext
}: {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  // Trap focus inside lightbox
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo ${index + 1} of ${images.length}: ${images[index].alt}`}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4 py-8"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onPrev()
          }}
          aria-label="Previous photo"
          className="absolute left-2 sm:left-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onNext()
          }}
          aria-label="Next photo"
          className="absolute right-2 sm:right-4 z-10 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-4xl w-full max-h-[80vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Picture
            src={images[index].src}
            alt={images[index].alt}
            width={1200}
            height={900}
            className="object-contain max-h-[80vh] w-auto mx-auto"
            priority
          />
        </motion.div>

        {/* Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/40">
            {index + 1} / {images.length}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
