'use client'

import { ArrowRight } from 'lucide-react'

export function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-10">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-7 sm:p-9">
        <div className="mb-7">
          <div className="mb-6 inline-flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-green-500 text-green-950 text-sm font-extrabold">
              P
            </span>
            <span className="text-sm font-semibold text-muted-foreground">
              Influencers deck
            </span>
          </div>
          <h1 className="text-balance text-2xl font-extrabold leading-tight sm:text-[28px]">
            Inicia sesión con tu cuenta de Prestamype
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Usamos tu cuenta corporativa para identificar al solicitante.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onLogin('nombre.apellido@prestamype.com')}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-base font-semibold text-green-950 transition-all hover:bg-green-600 active:scale-[0.97]"
        >
          Continuar con tu cuenta Prestamype
          <ArrowRight className="size-4" />
        </button>
      </div>
    </main>
  )
}
