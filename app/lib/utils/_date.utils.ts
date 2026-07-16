export function useDaysUntil(target: Date) {
  const now = new Date()
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
}

export function toInputDate(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toISOString().slice(0, 16)
}

export function formatDay(date: Date) {
  return new Date(date).toLocaleDateString('en-US', { day: '2-digit' })
}

export function formatMonth(date: Date) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
}

export function formatTime(date: Date) {
  return new Date(date).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function formatFullDate(date: Date) {
  return new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
}
