'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function RelatorioLeads() {
  const [stats, setStats] = useState({ total: 0, quente: 0, morno: 0, frio: 0 })
  const [leads, setLeads] = useState([])

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(d => {
      const data = d.data || []
      setLeads(data)
      setStats({
        total: data.length,
        quente: data.filter((l: any) => l.status === 'quente').length,
        morno: data.filter((l: any) => l.status === 'morno').length,
        frio: data.filter((l: any) => l.status === 'frio').length,
      })
    })
  }, [])

  return (
    <Container
      title="📊 Relatório de Leads"
      subtitle="Análise detalhada da captação"
      action={
        <Link href="/leads" className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
          ← Voltar
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Total de Leads</h3>
          <p className="text-5xl font-bold">{stats.total}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">🔥 Quentes</h3>
          <p className="text-5xl font-bold">{stats.quente}</p>
          <p className="text-sm mt-2">{((stats.quente/stats.total)*100 || 0).toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">☀️ Mornos</h3>
          <p className="text-5xl font-bold">{stats.morno}</p>
          <p className="text-sm mt-2">{((stats.morno/stats.total)*100 || 0).toFixed(1)}%</p>
        </div>

        <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-2">❄️ Frios</h3>
          <p className="text-5xl font-bold">{stats.frio}</p>
          <p className="text-sm mt-2">{((stats.frio/stats.total)*100 || 0).toFixed(1)}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold mb-4">Análise por Origem</h2>
        <div className="space-y-4">
          {['site', 'redes-sociais', 'indicacao'].map(origem => {
            const count = leads.filter((l: any) => l.origem === origem).length
            const percent = ((count/stats.total)*100 || 0).toFixed(1)
            return (
              <div key={origem} className="flex items-center">
                <div className="w-32 font-semibold text-gray-700">{origem}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-8 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full flex items-center justify-end pr-3 text-white text-sm font-semibold"
                    style={{width: `${percent}%`}}
                  >
                    {count > 0 && `${count} (${percent}%)`}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}