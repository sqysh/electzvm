export function InterestBadge({ label, color }: { label: string; color: string }) {
  return (
    <span className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${color}`}>{label}</span>
  )
}
