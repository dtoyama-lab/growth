'use client'

export function TopBar({
  email,
  onChangeAccount,
  progress,
}: {
  email: string
  onChangeAccount: () => void
  progress: number | null
}) {
  return (
    <div className="fixed inset-x-0 top-0 z-20 bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-5 py-3">
        <p className="truncate text-sm text-muted-foreground">
          Solicitando como <span className="font-medium text-foreground">{email}</span>
        </p>
        <button
          type="button"
          onClick={onChangeAccount}
          className="shrink-0 text-sm font-medium text-green-700 underline-offset-4 hover:underline"
        >
          cambiar cuenta
        </button>
      </div>
      <div className="h-1 w-full bg-neutral-50">
        <div
          className="h-full bg-green-500 transition-[width] duration-300 ease-out"
          style={{ width: `${progress ?? 0}%` }}
        />
      </div>
    </div>
  )
}
