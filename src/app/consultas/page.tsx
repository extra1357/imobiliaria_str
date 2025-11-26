'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/consultas')
      .then(r => r.json())
      .then(d => {
        setConsultas(d.data || [])
        setLoading(false)
      })
  }, [])

  return (
    <Container
      title="📅 Consultas"
      subtitle="Gerencie agendamentos e visitas"
      action={
        <Link href="/consultas/nova" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md">
          + Nova Consulta
        </Link>
      }
    >
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : consultas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma consulta agendada</h3>
          <p className="text-gray-600 mb-6">Crie sua primeira consulta!</p>
          <Link href="/consultas/nova" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
            Agendar Primeira Consulta
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {consultas.map((c: any) => (
              <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-gray-900">{c.lead?.nome || 'Lead não encontrado'}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    c.status === 'realizada' ? 'bg-green-100 text-green-800' :
                    c.status === 'cancelada' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🏠</span>
                    <span>{c.imovel?.tipo} - {c.imovel?.cidade}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📋</span>
                    <span>{c.tipo}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📅</span>
                    <span>{new Date(c.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>

                {c.observacoes && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{c.observacoes}</p>
                )}
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/consultas/historico" className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
              Ver Histórico Completo →
            </Link>
          </div>
        </>
      )}
    </Container>
  )
}