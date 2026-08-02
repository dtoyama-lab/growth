'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export function LoginScreen({ onLogin }: { onLogin: (email: string) => void }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function validEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  }

  function submitEmail() {
    if (!validEmail(email)) {
      setError('Ingresa un correo corporativo válido.')
      return
    }
    setError('')
    onLogin(email.trim())
  }

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

        <div className="my-6 flex items-center gap-4">
          <span className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">o usa tu correo</span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <div>
          <label
            htmlFor="corporate-email"
            className="mb-2 block text-sm font-medium text-foreground"
          >
            Correo corporativo
          </label>
          <input
            id="corporate-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nombre.apellido@prestamype.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError('')
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) submitEmail()
            }}
            aria-invalid={!!error}
            className="w-full border-0 border-b-2 border-input bg-transparent pb-2 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-green-500 aria-[invalid=true]:border-destructive"
          />
          {error && (
            <p role="alert" className="mt-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={submitEmail}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-base font-medium text-foreground transition-all hover:border-green-300 hover:bg-neutral-25 active:scale-[0.97]"
          >
            Continuar
          </button>
        </div>
      </div>
    </main>
  )
}
