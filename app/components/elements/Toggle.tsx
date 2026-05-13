'use client'

interface ToggleProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <label htmlFor={id} className="flex items-center justify-between gap-4 cursor-pointer group min-h-11 py-1">
      <span className="font-inter text-sm text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200">
        {label}
      </span>

      <div className="relative shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={checked}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />

        {/* Track */}
        <div className="w-11 h-6 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark peer-checked:bg-primary-light dark:peer-checked:bg-primary-dark peer-checked:border-primary-light dark:peer-checked:border-primary-dark peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-light dark:peer-focus-visible:outline-primary-dark transition-colors duration-200" />

        {/* Thumb */}
        <div className="absolute top-1 left-1 w-4 h-4 bg-muted-light dark:bg-muted-dark peer-checked:bg-white peer-checked:translate-x-5 transition-all duration-200 pointer-events-none" />
      </div>
    </label>
  )
}
