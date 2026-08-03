'use client'

import { Pencil } from 'lucide-react'
import {
  type FormData,
  questionLabels,
  joinMulti,
} from '@/lib/influence-desk-data'

export function ReviewScreen({
  data,
  onEdit,
  onSubmit,
}: {
  data: FormData
  onEdit: (index: number) => void
  onSubmit: () => void
}) {
  const rows: string[] = [
    data.producto,
    data.urgencia,
    joinMulti(data.objetivos, data.objetivoOtro),
    joinMulti(data.resultados, data.resultadoOtro),
    joinMulti(data.colaboracion, data.colaboracionOtro),
    joinMulti(data.plataformas, data.plataformaOtro),
    data.tiers.join(', '),
    data.presupuesto,
    data.fechaLimite
      ? new Date(data.fechaLimite + 'T00:00:00').toLocaleDateString('es-PE', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        })
      : '',
    data.mensajeClave,
    data.influencers,
  ]

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col justify-center px-5 pb-10 pt-24">
      <h2 className="text-balance text-2xl font-extrabold leading-tight sm:text-3xl">
        Revisa tu solicitud
      </h2>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Confirma que todo esté correcto antes de enviar. Puedes editar cualquier respuesta.
      </p>

      <ul className="mt-7 divide-y divide-border rounded-lg border border-border">
        {questionLabels.map((label, i) => (
          <li key={label} className="flex items-start justify-between gap-4 p-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="mt-1 text-base text-foreground">
                {rows[i]?.trim() ? rows[i] : <span className="text-muted-foreground">Sin respuesta</span>}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(i)}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-green-700 underline-offset-4 hover:underline"
            >
              <Pencil className="size-3.5" />
              editar
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSubmit}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-base font-semibold text-green-950 transition-all hover:bg-green-600 active:scale-[0.97] sm:w-auto sm:self-start"
      >
        Enviar solicitud
      </button>
    </div>
  )
}
