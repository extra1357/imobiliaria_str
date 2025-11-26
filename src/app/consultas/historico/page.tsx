'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function HistoricoConsultas() {
  const [consultas, setConsultas] = useState([])
  const [filtro, setFiltro] = useState('todas')

  useEffect(() => {
    fetch('/api/consultas')
      .then(r => r.json())
      .then(d => setConsultas(d.data || []))
  }, [])

  const consultasFiltradas = consultas.filter((c: any) => 
    filtro === 'todas' || c.status === filtro
  )

  const stats = {
    total: consultas.length,
    pendentes: consultas.filter((c: any) => c.status === 'pendente').length,
    realizadas: consultas.filter((c: any) => c.status === 'realizada').length,
    canceladas: consultas.filter((c: any) => c.status === 'cancelada').length,
  }

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Histórico de Consultas</h1>
        <Link href="/consultas" className="text-blue-600 hover:underline">
          ← Voltar
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-100 rounded">
          <h3 className="font-semibold">Total</h3>
          <p className="text-2xl">{stats.total}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded">
          <h3 className="font-semibold">Pendentes</h3>
          <p className="text-2xl">{stats.pendentes}</p>
        </div>
        <div className="p-4 bg-green-100 rounded">
          <h3 className="font-semibold">Realizadas</h3>
          <p className="text-2xl">{stats.realizadas}</p>
        </div>
        <div className="p-4 bg-red-100 rounded">
          <h3 className="font-semibold">Canceladas</h3>
          <p className="text-2xl">{stats.canceladas}</p>
        </div>
      </div>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Filtrar:</label>
        <select 
          className="p-2 border rounded"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="pendente">Pendentes</option>
          <option value="realizada">Realizadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
      </div>

      <div className="space-y-3">
        {consultasFiltradas.map((c: any) => (
          <div key={c.id} className="p-4 border rounded">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{c.lead?.nome}</p>
                <p className="text-sm text-gray-600">{c.imovel?.tipo} - {c.imovel?.endereco}</p>
                <p className="text-xs text-gray-500 mt-1">Tipo: {c.tipo}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded text-xs ${
                  c.status === 'realizada' ? 'bg-green-200' :
                  c.status === 'cancelada' ? 'bg-red-200' : 'bg-yellow-200'
                }`}>{c.status}</span>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(c.data).toLocaleString('pt-BR')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}