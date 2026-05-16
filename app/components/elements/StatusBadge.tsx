export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    subscribed: 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark',
    unsubscribed: 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark',
    cleaned: 'border-red-400 text-red-400',
    pending: 'border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark'
  }
  return (
    <span
      className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border shrink-0 ${styles[status] ?? styles.unsubscribed}`}
    >
      {status}
    </span>
  )
}
