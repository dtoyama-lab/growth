'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  type FormData,
  initialFormData,
  productoOptions,
  urgenciaOptions,
  objetivoOptions,
  resultadoOptions,
  colaboracionOptions,
  plataformaOptions,
  tierOptions,
  questionLabels,
  buildFolio,
} from '@/lib/influence-desk-data'
import { LoginScreen } from './login-screen'
import { TopBar } from './top-bar'
import { QuestionShell } from './question-shell'
import { Chip } from './chip'
import { ReviewScreen } from './review-screen'
import { ConfirmationScreen } from './confirmation-screen'

type Step = 'login' | number | 'review' | 'confirm'
const TOTAL = 11
const OTRO = 'Otro'

export function FormFlow() {
  const [step, setStep] = useState<Step>('login')
  const [email, setEmail] = useState('')
  const [data, setData] = useState<FormData>(initialFormData)
  const [error, setError] = useState('')
  const [folio, setFolio] = useState('')

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }))
    if (error) setError('')
  }

  function toggle(
    key: 'objetivos' | 'resultados' | 'colaboracion' | 'plataformas' | 'tiers',
    value: string,
  ) {
    setData((d) => {
      const current = d[key]
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      return { ...d, [key]: next }
    })
    if (error) setError('')
  }

  function validate(index: number): string {
    switch (index) {
      case 0:
        return data.producto ? '' : 'Selecciona un producto para continuar.'
      case 1:
        return data.urgencia ? '' : 'Selecciona un nivel de urgencia.'
      case 2:
        if (data.objetivos.length === 0) return 'Selecciona al menos un objetivo.'
        if (data.objetivos.includes(OTRO) && !data.objetivoOtro.trim())
          return 'Describe el objetivo en el campo "Otro".'
        return ''
      case 4:
        if (data.colaboracion.length === 0) return 'Selecciona al menos un tipo de colaboración.'
        if (data.colaboracion.includes(OTRO) && !data.colaboracionOtro.trim())
          return 'Describe la colaboración en el campo "Otro".'
        return ''
      case 5:
        if (data.plataformas.length === 0) return 'Selecciona al menos una plataforma.'
        if (data.plataformas.includes(OTRO) && !data.plataformaOtro.trim())
          return 'Describe la plataforma en el campo "Otro".'
        return ''
      case 7:
        return data.presupuesto.trim() ? '' : 'Ingresa un presupuesto disponible.'
      case 8:
        return data.fechaLimite ? '' : 'Selecciona una fecha límite.'
      case 3:
        if (data.resultados.includes(OTRO) && !data.resultadoOtro.trim())
          return 'Describe el resultado en el campo "Otro".'
        return ''
      default:
        return ''
    }
  }

  function next() {
    if (typeof step !== 'number') return
    const err = validate(step)
    if (err) {
      setError(err)
      return
    }
    setError('')
    if (step === TOTAL - 1) setStep('review')
    else setStep(step + 1)
  }

  function back() {
    if (typeof step !== 'number') return
    setError('')
    if (step === 0) return
    setStep(step - 1)
  }

  function handleSubmit() {
    setFolio(buildFolio())
    setStep('confirm')
  }

  function restart() {
    setData(initialFormData)
    setError('')
    setFolio('')
    setStep(0)
  }

  if (step === 'login') {
    return (
      <LoginScreen
        onLogin={(e) => {
          setEmail(e)
          setStep(0)
        }}
      />
    )
  }

  const progress =
    step === 'review' || step === 'confirm'
      ? 100
      : typeof step === 'number'
        ? ((step + 1) / TOTAL) * 100
        : 0

  return (
    <main>
      <TopBar
        email={email}
        progress={progress}
        onChangeAccount={() => {
          setStep('login')
        }}
      />

      {step === 'review' && (
        <ReviewScreen data={data} onEdit={(i) => setStep(i)} onSubmit={handleSubmit} />
      )}

      {step === 'confirm' && (
        <ConfirmationScreen folio={folio} producto={data.producto} onRestart={restart} />
      )}

      {typeof step === 'number' && (
        <QuestionShell
          index={step}
          total={TOTAL}
          title={questionTitle(step)}
          help={questionHelp(step)}
          error={error}
          canGoBack={step > 0}
          onBack={back}
          onNext={next}
          nextLabel={step === TOTAL - 1 ? 'Revisar' : 'Siguiente'}
        >
          {step === 0 && (
            <SingleSelect
              options={productoOptions.map((o) => ({ value: o, label: o }))}
              value={data.producto}
              onSelect={(v) => update('producto', v)}
            />
          )}

          {step === 1 && (
            <SingleSelect
              options={urgenciaOptions.map((o) => ({
                value: o.value,
                label: o.label,
                detail: o.detail,
              }))}
              value={data.urgencia}
              onSelect={(v) => update('urgencia', v)}
            />
          )}

          {step === 2 && (
            <ChipGroup
              options={[...objetivoOptions, OTRO]}
              selected={data.objetivos}
              onToggle={(v) => toggle('objetivos', v)}
              showOtro={data.objetivos.includes(OTRO)}
              otroValue={data.objetivoOtro}
              onOtroChange={(v) => update('objetivoOtro', v)}
            />
          )}

          {step === 3 && (
            <ChipGroup
              options={[...resultadoOptions, OTRO]}
              selected={data.resultados}
              onToggle={(v) => toggle('resultados', v)}
              showOtro={data.resultados.includes(OTRO)}
              otroValue={data.resultadoOtro}
              onOtroChange={(v) => update('resultadoOtro', v)}
            />
          )}

          {step === 4 && (
            <ChipGroup
              options={[...colaboracionOptions, OTRO]}
              selected={data.colaboracion}
              onToggle={(v) => toggle('colaboracion', v)}
              showOtro={data.colaboracion.includes(OTRO)}
              otroValue={data.colaboracionOtro}
              onOtroChange={(v) => update('colaboracionOtro', v)}
            />
          )}

          {step === 5 && (
            <ChipGroup
              options={[...plataformaOptions, OTRO]}
              selected={data.plataformas}
              onToggle={(v) => toggle('plataformas', v)}
              showOtro={data.plataformas.includes(OTRO)}
              otroValue={data.plataformaOtro}
              onOtroChange={(v) => update('plataformaOtro', v)}
            />
          )}

          {step === 6 && (
            <ChipGroup
              options={tierOptions}
              selected={data.tiers}
              onToggle={(v) => toggle('tiers', v)}
              showOtro={false}
              otroValue=""
              onOtroChange={() => {}}
            />
          )}

          {step === 7 && (
            <TextField
              value={data.presupuesto}
              onChange={(v) => update('presupuesto', v)}
              placeholder="S/ ____, dentro del Q vigente"
              invalid={!!error}
            />
          )}

          {step === 8 && (
            <input
              type="date"
              value={data.fechaLimite}
              onChange={(e) => update('fechaLimite', e.target.value)}
              aria-invalid={!!error}
              className="w-full border-0 border-b-2 border-input bg-transparent pb-2 text-base outline-none transition-colors focus:border-green-500 aria-[invalid=true]:border-destructive"
            />
          )}

          {step === 9 && (
            <TextArea
              value={data.mensajeClave}
              onChange={(v) => update('mensajeClave', v)}
              placeholder="Mensaje clave, claims obligatorios, disclaimers o restricciones legales."
            />
          )}

          {step === 10 && (
            <TextArea
              value={data.influencers}
              onChange={(v) => update('influencers', v)}
              placeholder="Nombres, cuentas o enlaces de influencers que ya tienes en mente (opcional)."
            />
          )}
        </QuestionShell>
      )}
    </main>
  )
}

function questionTitle(index: number): string {
  return [
    '¿Para qué producto es esta campaña?',
    '¿Qué tan urgente es tu solicitud?',
    '¿Cuál es el objetivo de la campaña?',
    '¿Qué resultado esperas?',
    '¿Qué tipo de colaboración necesitas?',
    '¿En qué plataforma se publicará?',
    '¿Qué nivel de influencer prefieres?',
    '¿Cuál es tu presupuesto disponible?',
    '¿Cuál es tu fecha límite de publicación?',
    '¿Hay mensaje clave o restricciones legales?',
    '¿Ya tienes influencers identificados?',
  ][index]
}

function questionHelp(index: number): string | undefined {
  return [
    undefined,
    'Esto nos ayuda a estimar los tiempos de ejecución.',
    'Puedes elegir más de una opción.',
    'Opcional. Puedes elegir más de una opción.',
    'Puedes elegir más de una opción.',
    'Puedes elegir más de una opción.',
    'Opcional. Puedes elegir más de una opción.',
    undefined,
    undefined,
    'Opcional.',
    'Opcional.',
  ][index]
}

function SingleSelect({
  options,
  value,
  onSelect,
}: {
  options: { value: string; label: string; detail?: string }[]
  value: string
  onSelect: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onSelect(opt.value)}
            aria-pressed={active}
            className={cn(
              'flex items-start gap-3 rounded-lg border p-4 text-left transition-all active:scale-[0.99]',
              active
                ? 'border-green-500 bg-green-25'
                : 'border-border bg-background hover:border-green-300 hover:bg-neutral-25',
            )}
          >
            <span
              className={cn(
                'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                active ? 'border-green-500' : 'border-neutral-100',
              )}
              aria-hidden="true"
            >
              {active && <span className="size-2.5 rounded-full bg-green-500" />}
            </span>
            <span>
              <span
                className={cn(
                  'block text-base font-medium',
                  active ? 'text-green-900' : 'text-foreground',
                )}
              >
                {opt.label}
              </span>
              {opt.detail && (
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {opt.detail}
                </span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

function ChipGroup({
  options,
  selected,
  onToggle,
  showOtro,
  otroValue,
  onOtroChange,
}: {
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
  showOtro: boolean
  otroValue: string
  onOtroChange: (v: string) => void
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <Chip
            key={opt}
            label={opt}
            selected={selected.includes(opt)}
            onToggle={() => onToggle(opt)}
          />
        ))}
      </div>
      {showOtro && (
        <input
          type="text"
          value={otroValue}
          onChange={(e) => onOtroChange(e.target.value)}
          placeholder="Cuéntanos más..."
          autoFocus
          className="mt-4 w-full border-0 border-b-2 border-input bg-transparent pb-2 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-green-500"
        />
      )}
    </div>
  )
}

function TextField({
  value,
  onChange,
  placeholder,
  invalid,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  invalid?: boolean
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus
      aria-invalid={invalid}
      className="w-full border-0 border-b-2 border-input bg-transparent pb-2 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-green-500 aria-[invalid=true]:border-destructive"
    />
  )
}

function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-lg border border-input bg-transparent p-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-green-500"
      />
      <p className="mt-2 text-xs text-muted-foreground">
        Pulsa Ctrl + Enter para continuar
      </p>
    </div>
  )
}
