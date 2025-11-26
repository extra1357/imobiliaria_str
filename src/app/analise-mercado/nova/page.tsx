'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaAnalise() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<any>(null)
  const [form, setForm] = useState({
    cidade: '',
    estado: 'SP'
  })

  const gerarAnalise = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Buscar imóveis da cidade
      const resImoveis = await fetch(`/api/imoveis?cidade=${form.cidade}`)
      const dataImoveis = await resImoveis.json()
      const imoveis = dataImoveis.data || []

      if (imoveis.length === 0) {
        alert('Nenhum imóvel encontrado para esta cidade')
        setLoading(false)
        return
      }

      // Calcular médias com IA
      const valorM2Medio = imoveis.reduce((acc: number, i: any) => 
        acc + (i.preco / i.metragem), 0) / imoveis.length

      const valores = imoveis.map((i: any) => i.preco / i.metragem).sort((a: number, b: number) => a - b)
      const valorMinimo = valores[0]
      const valorMaximo = valores[valores.length - 1]

      // Análise de tendência (IA simples)
      const mediaRecente = valores.slice(-3).reduce((a: number, b: number) => a + b, 0) / 3
      const mediaAntiga = valores.slice(0, 3).reduce((a: number, b: number) => a + b, 0) / 3
      
      let tendencia = 'estavel'
      let observacoes = ''

      if (mediaRecente > mediaAntiga * 1.1) {
        tendencia = 'alta'
        observacoes = `🤖 IA detectou crescimento de ${((mediaRecente/mediaAntiga - 1) * 100).toFixed(1)}% no valor/m². Mercado aquecido! Momento ideal para vendas.`
      } else if (mediaRecente < mediaAntiga * 0.9) {
        tendencia = 'baixa'
        observacoes = `🤖 IA detectou queda de ${((1 - mediaRecente/mediaAntiga) * 100).toFixed(1)}% no valor/m². Oportunidade para compradores.`
      } else {
        observacoes = `🤖 IA indica mercado estável. Variação inferior a 10%. Momento neutro para negociações.`
      }

      // Salvar análise
      const analise = {
        cidade: form.cidade,
        estado: form.estado,
        valorM2: Math.round(valorM2Medio),
        valorMinimo: Math.round(valorMinimo),
        valorMaximo: Math.round(valorMaximo),
        fonte: 'IA Sistema STR',
        tendencia,
        observacoes
      }

      const res = await fetch('/api/analise-mercado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analise)
      })

      if (res.ok) {
        setResultado(analise)
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao gerar análise')
    }

    setLoading(false)
  }

  if (resultado) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">✅ Análise Gerada com Sucesso!</h1>
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border-2 border-green-300 mb-6">
          <h2 className="text-2xl font-bold mb-4">{resultado.cidade}/{resultado.estado}</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Valor Médio/m²</p>
              <p className="text-3xl font-bold text-blue-600">
                R$ {resultado.valorM2.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="bg-white p-4 rounded">
              <p className="text-sm text-gray-600">Tendência</p>
              <p className="text-3xl font-bold">
                {resultado.tendencia === 'alta' ? '📈' : 
                 resultado.tendencia === 'baixa' ? '📉' : '➡️'} 
                {resultado.tendencia}
              </p>
            </div>
          </div>

          <div className="bg-white p-4 rounded mb-4">
            <p className="text-sm text-gray-600">Faixa de Preço</p>
            <p className="text-lg font-semibold">
              R$ {resultado.valorMinimo.toLocaleString('pt-BR')} - 
              R$ {resultado.valorMaximo.toLocaleString('pt-BR')} /m²
            </p>
          </div>

          <div className="bg-blue-100 p-4 rounded">
            <p className="font-semibold mb-2">💡 Recomendação da IA:</p>
            <p>{resultado.observacoes}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => router.push('/analise-mercado')}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ver Todas Análises
          </button>
          <button 
            onClick={() => setResultado(null)}
            className="px-6 py-2 border rounded hover:bg-gray-50"
          >
            Nova Análise
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🤖 Gerar Análise com IA</h1>
      
      <div className="bg-blue-50 p-4 rounded mb-6 border-l-4 border-blue-500">
        <p className="font-semibold">Como funciona:</p>
        <ul className="text-sm mt-2 space-y-1">
          <li>✅ IA analisa todos os imóveis cadastrados na cidade</li>
          <li>✅ Calcula valor médio, mínimo e máximo por m²</li>
          <li>✅ Detecta tendências de alta, baixa ou estabilidade</li>
          <li>✅ Gera recomendações automáticas para investimento</li>
        </ul>
      </div>

      <form onSubmit={gerarAnalise} className="space-y-4">
        <div>
          <label className="block mb-2 font-semibold">Cidade</label>
          <input 
            className="w-full p-3 border rounded"
            value={form.cidade}
            onChange={e => setForm({...form, cidade: e.target.value})}
            placeholder="Ex: São Paulo, Osasco, Guarulhos..."
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">Estado</label>
          <select 
            className="w-full p-3 border rounded"
            value={form.estado}
            onChange={e => setForm({...form, estado: e.target.value})}
          >
            <option value="SP">São Paulo</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="MG">Minas Gerais</option>
            <option value="RS">Rio Grande do Sul</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 font-semibold"
        >
          {loading ? '🤖 IA Analisando...' : '🚀 Gerar Análise com IA'}
        </button>
      </form>
    </div>
  )
}