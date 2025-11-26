'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function LeadsPage() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/leads')
      .then(r => r.json())
      .then(d => {
        setLeads(d.data || [])
        setLoading(false)
      })
  }, [])

  const stats = {
    total: leads.length,
    quente: leads.filter((l: any) => l.status === 'quente').length,
    morno: leads.filter((l: any) => l.status === 'morno').length,
    frio: leads.filter((l: any) => l.status === 'frio').length,
  }

  return (
    <Container
      title="📋 Leads"
      subtitle="Gerencie seus contatos e oportunidades"
      action={
        <Link href="/leads/novo" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
          + Novo Lead
        </Link>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Total</span>
            <span className="text-3xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Quentes</span>
            <span className="text-3xl">🔥</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.quente}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Mornos</span>
            <span className="text-3xl">☀️</span>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.morno}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Frios</span>
            <span className="text-3xl">❄️</span>
          </div>
          <p className="text-3xl font-bold text-gray-600">{stats.frio}</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : leads.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum lead cadastrado</h3>
          <p className="text-gray-600 mb-6">Comece adicionando seu primeiro lead!</p>
          <Link href="/leads/novo" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Cadastrar Primeiro Lead
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((l: any) => (
            <div key={l.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition">
                  {l.nome}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  l.status === 'quente' ? 'bg-green-100 text-green-800' :
                  l.status === 'morno' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {l.status}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">✉️</span>
                  <span className="truncate">{l.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">📱</span>
                  <span>{l.telefone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-3 text-lg">🌐</span>
                  <span>{l.origem}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                Capturado em {new Date(l.dataCaptcha).toLocaleDateString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}