'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function RelatoriosAnalise() {
  const [analises, setAnalises] = useState([])
  const [cidades, setCidades] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/analise-mercado')
      .then(r => r.json())
      .then(d => {
        const data = d.data || []
        setAnalises(data)
        const uniqueCidades = [...new Set(data.map((a: any) => a.cidade))]
        setCidades(uniqueCidades as string[])
      })
  }, [])

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">📈 Relatórios de Mercado</h1>
        <Link href="/analise-mercado" className="text-blue-600 hover:underline">← Voltar</Link>
      </div>

      <div className="grid gap-6">
        {cidades.map(cidade => {
          const analiseCidade = analises.filter((a: any) => a.cidade === cidade)
          const ultima = analiseCidade[0]
          
          return (
            <div key={cidade} className="border rounded-lg p-6 bg-white shadow">
              <h2 className="text-2xl font-bold mb-4">{cidade}</h2>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Valor Atual/m²</p>
                  <p className="text-2xl font-bold">R$ {ultima?.valorM2.toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Análises Realizadas</p>
                  <p className="text-2xl font-bold">{analiseCidade.length}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded">
                  <p className="text-sm text-gray-600">Tendência</p>
                  <p className="text-2xl font-bold">{ultima?.tendencia}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                Última análise: {new Date(ultima?.dataAnalise).toLocaleString('pt-BR')}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}