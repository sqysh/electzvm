import { useEffect } from 'react'

export function useBodyScrollLock(open: boolean) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])
}
