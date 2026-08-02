export type Product =
  | 'Préstamos Empresarios'
  | 'Préstamos Inversionistas'
  | 'Factoring Proveedores'
  | 'Factoring Inversionistas'
  | 'Gestora de Fondos'
  | 'Cambio Seguro'

export type FormData = {
  producto: string
  urgencia: string
  objetivos: string[]
  objetivoOtro: string
  resultados: string[]
  resultadoOtro: string
  colaboracion: string[]
  colaboracionOtro: string
  presupuesto: string
  fechaLimite: string
  mensajeClave: string
  influencers: string
}

export const initialFormData: FormData = {
  producto: '',
  urgencia: '',
  objetivos: [],
  objetivoOtro: '',
  resultados: [],
  resultadoOtro: '',
  colaboracion: [],
  colaboracionOtro: '',
  presupuesto: '',
  fechaLimite: '',
  mensajeClave: '',
  influencers: '',
}

export const productoOptions: string[] = [
  'Préstamos Empresarios',
  'Préstamos Inversionistas',
  'Factoring Proveedores',
  'Factoring Inversionistas',
  'Gestora de Fondos',
  'Cambio Seguro',
]

export const urgenciaOptions: { value: string; label: string; detail: string }[] = [
  {
    value: 'Urgente',
    label: 'Urgente',
    detail: '5 a 10 días calendario (usa reserva de contingencia)',
  },
  {
    value: 'Estándar',
    label: 'Estándar',
    detail: '10 a 20 días',
  },
  {
    value: 'No urgente',
    label: 'No urgente',
    detail: '20 a 40 días',
  },
]

export const objetivoOptions: string[] = [
  'Generar solicitudes / leads',
  'Awareness de marca',
  'Educación financiera',
  'Posicionamiento de tasa o producto',
]

export const resultadoOptions: string[] = [
  'Incrementar leads',
  'Mejorar posicionamiento de marca',
  'Aumentar tráfico web',
  'Generar engagement / interacción',
]

export const colaboracionOptions: string[] = [
  'Post único',
  'Serie de contenido',
  'Embajador de marca',
  'UGC only',
]

export const questionLabels: string[] = [
  'Producto de la campaña',
  'Urgencia de la solicitud',
  'Objetivo de la campaña',
  'Resultado esperado',
  'Tipo de colaboración',
  'Presupuesto disponible',
  'Fecha límite de publicación',
  'Mensaje clave o restricciones legales',
  'Influencers identificados',
]

export type InfluencerTier = {
  tier: 'Nano' | 'Micro' | 'Macro'
  niche: string
  reach: string
  fee: string
}

// Placeholder suggestions filtered by product (no real integration yet).
export const influencerSuggestions: Record<string, InfluencerTier[]> = {
  'Préstamos Empresarios': [
    { tier: 'Nano', niche: 'Emprendimiento y pymes', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Finanzas para negocios', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Negocios y economía', reach: '200K – 500K', fee: 'S/ ___' },
  ],
  'Préstamos Inversionistas': [
    { tier: 'Nano', niche: 'Ahorro e inversión inicial', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Finanzas personales', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Educación financiera', reach: '200K – 500K', fee: 'S/ ___' },
  ],
  'Factoring Proveedores': [
    { tier: 'Nano', niche: 'Emprendimiento y pymes', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Finanzas para negocios', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Negocios y economía', reach: '200K – 500K', fee: 'S/ ___' },
  ],
  'Factoring Inversionistas': [
    { tier: 'Nano', niche: 'Ahorro e inversión inicial', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Inversión y patrimonio', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Educación financiera', reach: '200K – 500K', fee: 'S/ ___' },
  ],
  'Gestora de Fondos': [
    { tier: 'Nano', niche: 'Ahorro e inversión inicial', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Inversión y patrimonio', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Educación financiera', reach: '200K – 500K', fee: 'S/ ___' },
  ],
  'Cambio Seguro': [
    { tier: 'Nano', niche: 'Viajes y remesas', reach: '3K – 10K', fee: 'S/ ___' },
    { tier: 'Micro', niche: 'Comercio exterior', reach: '25K – 80K', fee: 'S/ ___' },
    { tier: 'Macro', niche: 'Lifestyle y tecnología', reach: '200K – 500K', fee: 'S/ ___' },
  ],
}

export function buildFolio(): string {
  const year = new Date().getFullYear()
  const digits = Math.floor(1000 + Math.random() * 9000)
  return `INF-${year}-${digits}`
}

// Returns the multi-select answers as a comma-separated string, including "Otro" text.
export function joinMulti(values: string[], otro: string): string {
  const list = values.map((v) => (v === 'Otro' && otro.trim() ? `Otro: ${otro.trim()}` : v))
  return list.join(', ')
}
