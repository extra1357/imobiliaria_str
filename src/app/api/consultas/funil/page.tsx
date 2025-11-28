'use client'
import { useEffect, useState } from 'react'
import { STATUS_LABELS, STATUS_CORES } from '@/types/funil'
import Container from '@/components/ui/Container'
import Link from 'next/link'

export default function FunilVendas() {
  const [consultas, setConsultas] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    fetch('/api/consultas')
      .then(r => r.json())
      .then(d => {
        setConsultas(d.data || [])
        setLoading(false)
      })
  }, [])

  const agruparPorStatus = () => {
    const grupos: any = {}
    Object.keys(STATUS_LABELS).forEach(status => {
      grupos[status] = consultas.filter(c => c.status === status)
    })
    return grupos
  }

  const grupos = agruparPorStatus()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Carregando funil...</p>
        </div>
      </div>
    )
  }

  return (
    <Container
      title="🎯 Funil de Vendas"
      subtitle="Acompanhe o status de cada consulta/venda"
      action={
        <Link href="/consultas" className="px-4 py-2 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50">
          ← Voltar
        </Link>
      }
    >
      {/* Stats Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="text-3xl mb-2">📊</div>
          <div className="text-sm text-gray-600">Total</div>
          <div className="text-3xl font-bold">{consultas.length}</div>
        </div>
        <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-200">
          <div className="text-3xl mb-2">🎉</div>
          <div className="text-sm text-gray-600">Fechadas</div>
          <div className="text-3xl font-bold text-green-600">
            {grupos['fechada']?.length || 0}
          </div>
        </div>
        <div className="bg-yellow-50 rounded-xl p-6 shadow-sm border border-yellow-200">
          <div className="text-3xl mb-2">💬</div>
          <div className="text-sm text-gray-600">Em Negociação</div>
          <div className="text-3xl font-bold text-yellow-600">
            {grupos['negociando']?.length || 0}
          </div>
        </div>
        <div className="bg-red-50 rounded-xl p-6 shadow-sm border border-red-200">
          <div className="text-3xl mb-2">❌</div>
          <div className="text-sm text-gray-600">Perdidas</div>
          <div className="text-3xl font-bold text-red-600">
            {grupos['perdida']?.length || 0}
          </div>
        </div>
      </div>

      {/* Funil Kanban */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {Object.entries(STATUS_LABELS).map(([status, label]) => (
            <div key={status} className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {/* Header */}
                <div className={`p-4 ${STATUS_CORES[status as keyof typeof STATUS_CORES]} font-semibold`}>
                  <div className="flex items-center justify-between">
                    <span>{label}</span>
                    <span className="px-2 py-1 bg-white/50 rounded-full text-sm">
                      {grupos[status]?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Cards */}
                <div className="p-2 space-y-2 max-h-[600px] overflow-y-auto">
                  {grupos[status]?.map((consulta: any) => (
                    <ConsultaCard key={consulta.id} consulta={consulta} onUpdate={() => window.location.reload()} />
                  ))}
                  
                  {(!grupos[status] || grupos[status].length === 0) && (
                    <div className="text-center text-gray-400 py-8 text-sm">
                      Nenhuma consulta
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

function ConsultaCard({ consulta, onUpdate }: any) {
  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-white border rounded-lg p-3 hover:shadow-md transition cursor-pointer"
      >
        <div className="font-semibold text-sm mb-2">{consulta.lead?.nome}</div>
        <div className="text-xs text-gray-600 mb-2">
          {consulta.imovel?.tipo} - {consulta.imovel?.cidade}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(consulta.data).toLocaleDateString('pt-BR')}
        </div>
        {consulta.valorProposta && (
          <div className="text-sm font-bold text-green-600 mt-2">
            R$ {consulta.valorProposta.toLocaleString('pt-BR')}
          </div>
        )}
      </div>

      {showModal && (
        <ModalAtualizarStatus 
          consulta={consulta} 
          onClose={() => setShowModal(false)}
          onUpdate={onUpdate}
        />
      )}
    </>
  )
}

function ModalAtualizarStatus({ consulta, onClose, onUpdate }: any) {
  const [novoStatus, setNovoStatus] = useState(consulta.status)
  const [observacoes, setObservacoes] = useState(consulta.observacoes || '')
  const [valorProposta, setValorProposta] = useState(consulta.valorProposta || '')
  const [motivoCancelamento, setMotivoCancelamento] = useState(consulta.motivoCancelamento || '')
  const [salvando, setSalvando] = useState<boolean>(false)

  const handleSalvar = async () => {
    setSalvando(true)
    try {
      const response = await fetch(`/api/consultas/${consulta.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: novoStatus,
          observacoes,
          valorProposta: valorProposta ? parseFloat(valorProposta) : null,
          motivoCancelamento: novoStatus === 'perdida' ? motivoCancelamento : null
        })
      })

      if (response.ok) {
        onUpdate()
        onClose()
      } else {
        alert('Erro ao atualizar')
      }
    } catch (error) {
      alert('Erro de conexão')
    } finally {
      setSalvando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold">Atualizar Status</h2>
            <p className="text-gray-600">{consulta.lead?.nome} - {consulta.imovel?.tipo}</p>
          </div>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4">
          {/* Status Atual */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-600 mb-1">Status Atual:</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${STATUS_CORES[consulta.status as keyof typeof STATUS_CORES]}`}>
              {STATUS_LABELS[consulta.status as keyof typeof STATUS_LABELS]}
            </div>
          </div>

          {/* Novo Status */}
          <div>
            <label className="block text-sm font-semibold mb-2">Novo Status</label>
            <select 
              className="w-full px-4 py-3 border rounded-lg"
              value={novoStatus}
              onChange={e => setNovoStatus(e.target.value)}
            >
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Valor Proposta */}
          {['proposta-enviada', 'proposta-aceita', 'fechada'].includes(novoStatus) && (
            <div>
              <label className="block text-sm font-semibold mb-2">Valor da Proposta (R$)</label>
              <input 
                type="number"
                className="w-full px-4 py-3 border rounded-lg"
                value={valorProposta}
                onChange={e => setValorProposta(e.target.value)}
                placeholder="450000"
              />
            </div>
          )}

          {/* Motivo Cancelamento */}
          {novoStatus === 'perdida' && (
            <div>
              <label className="block text-sm font-semibold mb-2">Motivo do Cancelamento</label>
              <textarea 
                className="w-full px-4 py-3 border rounded-lg"
                rows={3}
                value={motivoCancelamento}
                onChange={e => setMotivoCancelamento(e.target.value)}
                placeholder="Ex: Preço muito alto, comprou outro imóvel..."
              />
            </div>
          )}

          {/* Observações */}
          <div>
            <label className="block text-sm font-semibold mb-2">Observações</label>
            <textarea 
              className="w-full px-4 py-3 border rounded-lg"
              rows={4}
              value={observacoes}
              onChange={e => setObservacoes(e.target.value)}
              placeholder="Adicione observações sobre esta atualização..."
            />
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={handleSalvar}
              disabled={salvando}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
            >
              {salvando ? 'Salvando...' : 'Salvar Alterações'}
            </button>
            <button 
              onClick={onClose}
              className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}