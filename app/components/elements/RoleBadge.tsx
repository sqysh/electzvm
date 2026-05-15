export function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    SUPER_USER: 'border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark',
    ADMIN: 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'
  }
  return (
    <span
      className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${styles[role] ?? 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark'}`}
    >
      {role.replace('_', ' ')}
    </span>
  )
}
