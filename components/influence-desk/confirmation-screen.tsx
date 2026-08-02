'use client'

import { useState } from 'react'
import { Check, Users } from 'lucide-react'
import {
  influencerSuggestions,
  type InfluencerTier,
} from '@/lib/influence-desk-data'

function InfluencerCard({ item }: { item: InfluencerTier }) {
  const [candidate, setCandidate] = useState(false)
  return (
    <div className="flex flex-col rounded-lg border border-border bg-card p-5">
      <span className="inline-flex w-fit items-center rounded-full bg-green-25 px-3 py-1 text-xs font-semibold text-green-900">
        {item.tier}
      </span>
      <dl className="mt-4 flex-1 space-y-3">
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Nicho sugerido</dt>
          <dd className="text-sm text-foreground">{item.niche}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Rango de alcance</dt>
          <dd className="text-sm text-foreground">{item.reach} seguidores</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-muted-foreground">Tarifa referencial</dt>
          <dd className="text-sm text-foreground">{item.fee}</dd>
        </div>
      </dl>
      <button
        type="button"
        onClick={() => setCandidate((v) => !v)}
        aria-pressed={candidate}
        className={
          candidate
            ? 'mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-green-500 bg-green-25 px-4 py-2.5 text-sm font-medium text-green-900 transition-all active:scale-[0.97]'
            : 'mt-5 inline-flex items-center justify-center gap-1.5 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-green-300 hover:bg-neutral-25 active:scale-[0.97]'
        }
      >
        {candidate && <Check className="size-4" strokeWidth={3} />}
        {candidate ? 'Marcado como candidato' : 'Marcar como candidato'}
      </button>
    </div>
  )
}

export function ConfirmationScreen({
  folio,
  producto,
  onRestart,
}: {
  folio: string
  producto: string
  onRestart: () => void
}) {
  const suggestions = influencerSuggestions[producto] ?? []

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col justify-center px-5 pb-16 pt-24">
      <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-green-500 text-green-950">
          <Check className="size-6" strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
          Solicitud enviada
        </h2>
        <p className="mt-3 text-base text-muted-foreground">
          Folio de seguimiento
        </p>
        <p className="mt-1 text-xl font-semibold tracking-wide text-green-800">{folio}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground">
          El Influencers deck validará capacidad y presupuesto en 1 día hábil, y avanzará a
          selección de influencer en 3–5 días.
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-center gap-2">
          <Users className="size-5 text-green-700" />
          <h3 className="text-lg font-extrabold">Influencers sugeridos para tu campaña</h3>
        </div>
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Perfiles de referencia para {producto}. Son datos de ejemplo; el equipo de Influencers
          deck se encarga del contacto y la selección final.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((item) => (
            <InfluencerCard key={item.tier} item={item} />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={onRestart}
        className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-base font-semibold text-green-950 transition-all hover:bg-green-600 active:scale-[0.97] sm:w-auto sm:self-start"
      >
        Enviar otra solicitud
      </button>
    </div>
  )
}
