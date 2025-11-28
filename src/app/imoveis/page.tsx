'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function ImoveisPage() {
  const [imoveis, setImoveis] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    console.log('🔄 Iniciando busca de imóveis...')
    
    fetch('/api/imoveis')
      .then(r => {
        console.log('📡 Status da resposta:', r.status)
        return r.json()
      })
      .then(d => {
        console.log('📦 Dados recebidos:', d)
        
        // ✅ CORREÇÃO: API retorna array direto, não objeto com .data
        const dados = Array.isArray(d) ? d : (d.data || [])
        console.log('📊 Quantidade de imóveis:', dados.length)
        
        setImoveis(dados)
        setLoading(false)
      })
      .catch(err => {
        console.error('❌ Erro ao buscar imóveis:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <Container
      title="🏠 Imóveis"
      subtitle="Gerencie seu portfólio de imóveis"
      action={
        <Link href="/imoveis/novo" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md">
          + Novo Imóvel
        </Link>
      }
    >
      {/* Mostra erro se houver */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800 font-semibold">❌ Erro: {error}</p>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      ) : imoveis.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum imóvel cadastrado</h3>
          <p className="text-gray-600 mb-6">Adicione seu primeiro imóvel ao sistema!</p>
          <Link href="/imoveis/novo" className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
            Cadastrar Primeiro Imóvel
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {imoveis.map((i: any) => (
            <div 
              key={i.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-green-300 transition group cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row gap-4 p-4">
                {/* Ícone/Imagem - compacto */}
                <div className="flex-shrink-0 w-full sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">🏠</span>
                </div>
                
                {/* Informações principais */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition">
                        {i.tipo}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span>📍 {i.cidade}/{i.estado}</span>
                        <span className="hidden sm:inline">•</span>
                        <span className="hidden sm:inline">📐 {i.metragem}m²</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                      i.disponivel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {i.disponivel ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 truncate mb-2">
                    🏘️ {i.endereco}
                  </p>
                  
                  <div className="flex sm:hidden text-xs text-gray-500 mb-2">
                    📐 {i.metragem}m²
                  </div>
                  
                  {/* Informações do Proprietário */}
                  {i.proprietario && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500 mt-2 pt-2 border-t border-gray-100">
                      <span className="flex items-center gap-1">
                        👤 <span className="font-medium text-gray-700">{i.proprietario.nome}</span>
                      </span>
                      {i.proprietario.telefone && (
                        <span className="flex items-center gap-1">
                          📞 <a href={`tel:${i.proprietario.telefone}`} className="hover:text-green-600 transition">{i.proprietario.telefone}</a>
                        </span>
                      )}
                      {i.proprietario.email && (
                        <span className="flex items-center gap-1 hidden sm:inline-flex">
                          📧 <a href={`mailto:${i.proprietario.email}`} className="hover:text-green-600 transition truncate max-w-[200px]">{i.proprietario.email}</a>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                {/* Preço - destaque */}
                <div className="flex-shrink-0 text-right sm:text-left sm:min-w-[140px] pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:pl-4">
                  <p className="text-2xl font-bold text-green-600">
                    R$ {i.preco?.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    R$ {(i.preco / i.metragem).toFixed(2)}/m²
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Debug info (remova depois) */}
      <div className="mt-8 p-4 bg-gray-100 rounded text-xs">
        <p><strong>Debug:</strong></p>
        <p>Loading: {loading ? 'Sim' : 'Não'}</p>
        <p>Total de imóveis: {imoveis.length}</p>
        <p>Erro: {error || 'Nenhum'}</p>
      </div>
    </Container>
  )
}