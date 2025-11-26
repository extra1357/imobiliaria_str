'use client'
import { useState } from 'react'

export default function BuscaInteligente() {
  const [query, setQuery] = useState('')
  const [resultados, setResultados] = useState([])
  const [loading, setLoading] = useState(false)

  const buscar = async () => {
    setLoading(true)
    const res = await fetch('/api/busca', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    const data = await res.json()
    setResultados(data.data)
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Busca Inteligente</h2>
      <div className="flex gap-2">
        <input 
          className="flex-1 p-3 border rounded"
          placeholder="Ex: apartamento 2 quartos em osasco até 400 mil"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button 
          className="px-6 bg-blue-600 text-white rounded"
          onClick={buscar}
          disabled={loading}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      
      <div className="mt-6 grid gap-4">
        {resultados.map((im: any) => (
          <div key={im.id} className="p-4 border rounded">
            <h3 className="font-bold">{im.tipo} - {im.cidade}</h3>
            <p>{im.endereco}</p>
            <p className="text-lg font-semibold mt-2">
              R$ {im.preco.toLocaleString('pt-BR')}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}