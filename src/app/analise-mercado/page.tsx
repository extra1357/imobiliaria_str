'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AnaliseMercado() {
  const [analises, setAnalises] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analise-mercado')
      .then(r => r.json())
      .then(d => {
        setAnalises(d.data || [])
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="p-8">Carregando...</div>

  const ultimaAnalise = analises[0]

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">📊 Análise de Mercado com IA</h1>
        <Link href="/analise-mercado/nova" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Nova Análise
        </Link>
      </div>

      {ultimaAnalise && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold mb-4">🤖 Análise Mais Recente</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Cidade</p>
              <p className="text-2xl font-bold">{ultimaAnalise.cidade}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor Médio/m²</p>
              <p className="text-2xl font-bold text-green-600">
                R$ {ultimaAnalise.valorM2?.toLocaleString('pt-BR')}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tendência IA</p>
              <span className={`text-2xl font-bold ${
                ultimaAnalise.tendencia === 'alta' ? 'text-green-600' :
                ultimaAnalise.tendencia === 'baixa' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {ultimaAnalise.tendencia === 'alta' ? '📈 Alta' :
                 ultimaAnalise.tendencia === 'baixa' ? '📉 Baixa' :
                 '➡️ Estável'}
              </span>
            </div>
          </div>
          {ultimaAnalise.valorMinimo && ultimaAnalise.valorMaximo && (
            <div className="mt-4 p-3 bg-white rounded">
              <p className="text-sm font-semibold">Faixa de Preço:</p>
              <p className="text-lg">
                R$ {ultimaAnalise.valorMinimo.toLocaleString('pt-BR')} - 
                R$ {ultimaAnalise.valorMaximo.toLocaleString('pt-BR')} /m²
              </p>
            </div>
          )}
          {ultimaAnalise.observacoes && (
            <div className="mt-3 p-3 bg-blue-100 rounded">
              <p className="text-sm font-semibold">💡 Recomendação IA:</p>
              <p>{ultimaAnalise.observacoes}</p>
            </div>
          )}
        </div>
      )}

      <div className="grid gap-4">
        <h2 className="text-xl font-bold">Histórico de Análises</h2>
        {analises.length === 0 ? (
          <div className="text-center p-8 bg-gray-50 rounded">
            <p className="text-gray-600">Nenhuma análise realizada ainda.</p>
            <Link href="/analise-mercado/nova" className="mt-4 inline-block text-blue-600 hover:underline">
              Gerar primeira análise com IA →
            </Link>
          </div>
        ) : (
          analises.map((a: any) => (
            <div key={a.id} className="p-4 border rounded hover:shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold text-lg">{a.cidade}/{a.estado}</h3>
                  <p className="text-gray-600">Valor m²: R$ {a.valorM2?.toLocaleString('pt-BR')}</p>
                  <p className="text-sm text-gray-500">Fonte: {a.fonte}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded text-sm font-semibold ${
                    a.tendencia === 'alta' ? 'bg-green-200' :
                    a.tendencia === 'baixa' ? 'bg-red-200' :
                    'bg-yellow-200'
                  }`}>
                    {a.tendencia}
                  </span>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(a.dataAnalise).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-center">
        <Link href="/analise-mercado/relatorios" className="text-blue-600 hover:underline">
          Ver relatórios completos →
        </Link>
      </div>
    </div>
  )
}