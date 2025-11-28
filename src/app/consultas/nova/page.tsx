'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NovaConsulta() {
  const router = useRouter()
  const [leads, setLeads] = useState<any[]>([])
  const [imoveis, setImoveis] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [form, setForm] = useState<any>({
    leadId: '',
    imovelId: '',
    tipo: 'visita',
    observacoes: ''
  })

  useEffect(() => {
    console.log('🔄 Carregando leads e imóveis...')
    
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/imoveis').then(r => r.json())
    ])
    .then(([leadsData, imoveisData]) => {
      console.log('📦 Leads recebidos:', leadsData)
      console.log('📦 Imóveis recebidos:', imoveisData)
      
      // ✅ CORREÇÃO: Funciona com array direto OU objeto { data: [...] }
      const leadsArray = Array.isArray(leadsData) ? leadsData : (leadsData.data || [])
      const imoveisArray = Array.isArray(imoveisData) ? imoveisData : (imoveisData.data || [])
      
      console.log('✅ Total de leads:', leadsArray.length)
      console.log('✅ Total de imóveis:', imoveisArray.length)
      
      setLeads(leadsArray)
      setImoveis(imoveisArray)
      setLoading(false)
    })
    .catch(err => {
      console.error('❌ Erro ao carregar dados:', err)
      setLoading(false)
    })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    console.log('📝 Criando consulta:', form)
    
    const res = await fetch('/api/consultas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    
    if (res.ok) {
      console.log('✅ Consulta criada com sucesso!')
      router.push('/consultas')
    } else {
      const error = await res.json()
      console.error('❌ Erro ao criar consulta:', error)
      alert('Erro ao criar consulta: ' + (error.error || 'Erro desconhecido'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nova Consulta</h1>
        <p className="text-gray-600 mb-8">Agende uma visita ou negociação</p>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando dados...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lead {leads.length === 0 && <span className="text-red-600 text-xs">(Nenhum lead cadastrado)</span>}
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.leadId}
                onChange={e => setForm({...form, leadId: e.target.value})}
                required
                disabled={leads.length === 0}
              >
                <option value="">Selecione um lead...</option>
                {leads.map((l: any) => (
                  <option key={l.id} value={l.id}>{l.nome} - {l.email}</option>
                ))}
              </select>
              {leads.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  <a href="/leads/novo" className="text-blue-600 hover:underline">Cadastre um lead primeiro</a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imóvel {imoveis.length === 0 && <span className="text-red-600 text-xs">(Nenhum imóvel cadastrado)</span>}
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.imovelId}
                onChange={e => setForm({...form, imovelId: e.target.value})}
                required
                disabled={imoveis.length === 0}
              >
                <option value="">Selecione um imóvel...</option>
                {imoveis.map((i: any) => (
                  <option key={i.id} value={i.id}>
                    {i.tipo} - {i.cidade}/{i.estado} - R$ {i.preco?.toLocaleString('pt-BR')}
                  </option>
                ))}
              </select>
              {imoveis.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  <a href="/imoveis/novo" className="text-blue-600 hover:underline">Cadastre um imóvel primeiro</a>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <select 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.tipo}
                onChange={e => setForm({...form, tipo: e.target.value})}
              >
                <option value="visita">🏠 Visita</option>
                <option value="proposta">💰 Proposta</option>
                <option value="negociacao">🤝 Negociação</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Observações
              </label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                rows={4}
                value={form.observacoes}
                onChange={e => setForm({...form, observacoes: e.target.value})}
                placeholder="Detalhes adicionais sobre a consulta..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition transform disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={leads.length === 0 || imoveis.length === 0}
              >
                Agendar Consulta
              </button>
              <button 
                type="button" 
                onClick={() => router.push('/consultas')}
                className="flex-1 border-2 border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 active:scale-95 transition transform"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {/* Debug info */}
        <div className="mt-8 p-4 bg-gray-100 rounded text-xs">
          <p><strong>Debug:</strong></p>
          <p>Leads carregados: {leads.length}</p>
          <p>Imóveis carregados: {imoveis.length}</p>
          <p>Loading: {loading ? 'Sim' : 'Não'}</p>
        </div>
      </div>
    </div>
  )
}