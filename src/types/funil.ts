export const STATUS_FUNIL = {
  AGENDADA: 'agendada',
  CONFIRMADA: 'confirmada',
  REALIZADA: 'realizada',
  INTERESSADO: 'interessado',
  NEGOCIANDO: 'negociando',
  PROPOSTA_ENVIADA: 'proposta-enviada',
  PROPOSTA_ACEITA: 'proposta-aceita',
  DOCUMENTACAO: 'documentacao',
  ANALISE_CREDITO: 'analise-credito',
  APROVADA: 'aprovada',
  CONTRATO: 'contrato',
  FECHADA: 'fechada',
  PERDIDA: 'perdida'
} as const

export const STATUS_LABELS = {
  'agendada': '📅 Agendada',
  'confirmada': '✅ Confirmada',
  'realizada': '👁️ Realizada',
  'interessado': '❤️ Interessado',
  'negociando': '💬 Negociando',
  'proposta-enviada': '📄 Proposta Enviada',
  'proposta-aceita': '🤝 Proposta Aceita',
  'documentacao': '📋 Documentação',
  'analise-credito': '🔍 Análise de Crédito',
  'aprovada': '✔️ Aprovada',
  'contrato': '📝 Contrato',
  'fechada': '🎉 Fechada (Ganhou)',
  'perdida': '❌ Perdida'
}

export const STATUS_CORES = {
  'agendada': 'bg-blue-100 text-blue-800',
  'confirmada': 'bg-cyan-100 text-cyan-800',
  'realizada': 'bg-purple-100 text-purple-800',
  'interessado': 'bg-pink-100 text-pink-800',
  'negociando': 'bg-yellow-100 text-yellow-800',
  'proposta-enviada': 'bg-orange-100 text-orange-800',
  'proposta-aceita': 'bg-lime-100 text-lime-800',
  'documentacao': 'bg-indigo-100 text-indigo-800',
  'analise-credito': 'bg-violet-100 text-violet-800',
  'aprovada': 'bg-emerald-100 text-emerald-800',
  'contrato': 'bg-teal-100 text-teal-800',
  'fechada': 'bg-green-200 text-green-900 font-bold',
  'perdida': 'bg-red-200 text-red-900'
}

export type StatusFunil = keyof typeof STATUS_LABELS