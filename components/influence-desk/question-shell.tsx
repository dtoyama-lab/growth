'use client'

import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export function QuestionShell({
  index,
  total,
  title,
  help,
  error,
  canGoBack,
  onBack,
  onNext,
  nextLabel = 'Siguiente',
  children,
}: {
  index: number
  total: number
  title: string
  help?: string
  error?: string
  canGoBack: boolean
  onBack: () => void
  onNext: () => void
  nextLabel?: string
  children: ReactNode
}) {
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== 'Enter') return
    // Ignore IME composition (CJK) and Safari's unreliable final event.
    if (e.nativeEvent.isComposing || (e as unknown as { keyCode: number }).keyCode === 229) {
      return
    }
    const target = e.target as HTMLElement
    const isTextarea = target.tagName === 'TEXTAREA'
    if (isTextarea && !(e.ctrlKey || e.metaKey)) return
    e.preventDefault()
    onNext()
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-5 pb-10 pt-24"
    >
      <p className="mb-3 text-sm font-medium text-green-700">
        {index + 1} de {total}
      </p>
      <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
        {title}
      </h2>
      {help && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{help}</p>
      )}

      <div className="mt-7">{children}</div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-8 flex items-center gap-3">
        {canGoBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-3 text-base font-medium text-foreground transition-all hover:border-green-300 hover:bg-neutral-25 active:scale-[0.97]"
          >
            <ArrowLeft className="size-4" />
            Atrás
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-base font-semibold text-green-950 transition-all hover:bg-green-600 active:scale-[0.97]"
        >
          {nextLabel}
          <ArrowRight className="size-4" />
        </button>
        <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">
          pulsa Enter ↵
        </span>
      </div>
    </div>
  )
}
