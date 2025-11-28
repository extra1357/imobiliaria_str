'use client'
import { useEffect, useState } from 'react'

interface Imovel {
  id: string | number
  tipo?: string
  cidade?: string
  preco?: number
  descricao?: string
  disponivel: boolean
}

export default function ImoveisDisponiveis() {
  const [imoveis, setImoveis] = useState<Imovel[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWithRetry = async (url: string, attempts: number = 5): Promise<any> => {
      let delay = 1000;
      for (let i = 0; i < attempts; i++) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        } catch (e) {
          if (i === attempts - 1) throw e;
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2;
        }
      }
    };

    const loadImoveis = async () => {
      setLoading(true)
      setError(null)
      try {
        const d = await fetchWithRetry('/api/imoveis?disponivel=true')
        const dataArray = Array.isArray(d) ? d : (d.data || []);
        const disponiveis = dataArray.filter((i: Imovel) => i.disponivel)
        setImoveis(disponiveis)
      } catch (e) {
        console.error("Erro ao carregar imóveis:", e)
        setError("Não foi possível carregar os dados dos imóveis.")
      } finally {
        setLoading(false)
      }
    }

    loadImoveis()
  }, [])

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full"></div>
        <p className="mt-2">Carregando imóveis...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center bg-red-100 border border-red-400 text-red-700 rounded">
        <p>{error}</p>
        <p className="text-sm mt-2">Verifique se o endpoint /api/imoveis está funcionando corretamente.</p>
      </div>
    )
  }

  if (imoveis.length === 0) {
    return (
      <div className="p-8 text-center bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
        <h1 className="text-2xl font-bold mb-2">Nenhum Imóvel Disponível</h1>
        <p>Não encontramos imóveis disponíveis no momento.</p>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b pb-2">Imóveis Disponíveis</h1>

      <div className="grid sm:grid-cols-2 gap-6">
        {imoveis.map((i) => (
          <div key={i.id} className="p-4 border rounded-lg shadow bg-white">
            <h2 className="text-xl font-semibold">{i.tipo || "Imóvel"}</h2>
            <p className="text-gray-600">{i.cidade}</p>
            {i.preco && (
              <p className="text-lg font-bold mt-2">
                R$ {i.preco.toLocaleString('pt-BR')}
              </p>
            )}
            <p className="text-sm text-gray-700 mt-2">{i.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
