import { useEffect } from 'react'

export function useKeyDown(key: string, callback: () => void) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === key) callback()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [key, callback])
}
