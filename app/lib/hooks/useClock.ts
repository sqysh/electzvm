import { useEffect, useRef, useState } from 'react'

export function useClock() {
  const [time, setTime] = useState<Date | null>(null)
  const mounted = useRef(false)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      setTime(new Date())
    }
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
