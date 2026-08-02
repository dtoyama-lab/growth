'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Chip({
  label,
  selected,
  onToggle,
}: {
  label: string
  selected: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={selected}
      onClick={onToggle}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-base transition-all active:scale-[0.97]',
        selected
          ? 'border-green-500 bg-green-25 text-green-900 font-medium'
          : 'border-border bg-background text-foreground hover:border-green-300 hover:bg-neutral-25',
      )}
    >
      <span
        className={cn(
          'flex size-4 items-center justify-center rounded-full border transition-colors',
          selected ? 'border-green-600 bg-green-500' : 'border-neutral-100',
        )}
        aria-hidden="true"
      >
        {selected && <Check className="size-3 text-green-950" strokeWidth={3} />}
      </span>
      {label}
    </button>
  )
}
