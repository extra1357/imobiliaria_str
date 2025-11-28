'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ImoveisPublicos() {
  const [imoveis, setImoveis] = useState<any[]>([])
  const [filtro, setFiltro] = useState<any>({ tipo: 'todos', maxPreco: 9999999 })
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    // BUSCAR DO BANCO EM VEZ DE MOCK
    fetch('/api/imoveis')
      .then(r => r.json())
      .then(d => {
        setImoveis(d.data?.filter((i: any) => i.disponivel) || [])
        setLoading(false)
      })
  }, [])

  const imoveisFiltrados = imoveis.filter((i: any) => {
    if (filtro.tipo !== 'todos' && i.tipo !== filtro.tipo) return false
    if (i.preco > filtro.maxPreco) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div>
              <h1 className="text-3xl font-bold">🏢 Imobiliária STR</h1>
              <p className="text-blue-200 text-sm">Encontre seu imóvel ideal</p>
            </div>
            
            <Link 
              href="/dashboard"
              className="group relative px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="text-sm font-medium">⚙️</span>
                <span className="hidden group-hover:inline text-sm">Admin</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Imóveis Disponíveis</h2>
          <p className="text-xl text-gray-600 mb-8">Encontre o imóvel perfeito para você</p>
          
          {/* Filtros */}
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={filtro.tipo}
                onChange={e => setFiltro({...filtro, tipo: e.target.value})}
              >
                <option value="todos">Todos</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Casa">Casa</option>
                <option value="Terreno">Terreno</option>
                <option value="Comercial">Comercial</option>
              </select>

              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={filtro.maxPreco}
                onChange={e => setFiltro({...filtro, maxPreco: parseInt(e.target.value)})}
              >
                <option value={9999999}>Qualquer valor</option>
                <option value={200000}>Até R$ 200.000</option>
                <option value={400000}>Até R$ 400.000</option>
                <option value={600000}>Até R$ 600.000</option>
                <option value={1000000}>Até R$ 1.000.000</option>
              </select>

              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                🔍 Buscar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listagem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          {imoveisFiltrados.length} imóveis encontrados
        </h3>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-gray-600 text-lg">Carregando imóveis...</p>
          </div>
        ) : imoveisFiltrados.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <div className="text-8xl mb-6">🏚️</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros de busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imoveisFiltrados.map((imovel: any) => (
              <div 
                key={imovel.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                {/* FOTO DO IMÓVEL */}
                <div className="h-64 overflow-hidden">
                  {imovel.imagens && imovel.imagens.length > 0 ? (
                    <img 
                      src={imovel.imagens[0]} 
                      alt={imovel.tipo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                        {imovel.tipo === 'Apartamento' ? '🏢' :
                         imovel.tipo === 'Casa' ? '🏠' :
                         imovel.tipo === 'Terreno' ? '🏞️' : '🏪'}
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
                  <span className="text-sm font-bold text-gray-900">{imovel.tipo}</span>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {imovel.tipo}
                  </h3>
                  <p className="text-gray-600 flex items-center mb-4">
                    <span className="mr-2">📍</span>
                    {imovel.cidade}/{imovel.estado}
                  </p>

                  <div className="flex items-center text-gray-700 mb-4">
                    <span className="mr-3 text-xl">📐</span>
                    <span className="font-semibold">{imovel.metragem}m²</span>
                  </div>

                  {imovel.descricao && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {imovel.descricao}
                    </p>
                  )}

                  <div className="border-t pt-4">
                    <p className="text-3xl font-bold text-green-600 mb-1">
                      R$ {imovel.preco?.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                      R$ {(imovel.preco / imovel.metragem).toFixed(2)}/m²
                    </p>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg">
                      📞 Entrar em Contato
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Imobiliária STR. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}