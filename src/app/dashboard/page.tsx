'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [stats, setStats] = useState({ leads: 0, imoveis: 0, consultas: 0, analises: 0 })
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    Promise.all([
      fetch('/api/leads').then(r => r.json()),
      fetch('/api/imoveis').then(r => r.json()),
      fetch('/api/consultas').then(r => r.json()),
    ]).then(([leads, imoveis, consultas]) => {
      setStats({
        leads: leads.data?.length || 0,
        imoveis: imoveis.data?.length || 0,
        consultas: consultas.data?.length || 0,
        analises: 5
      })
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-[#1877F2] mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header estilo OLX */}
      <header className="bg-[#1877F2] shadow-md px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-lg">
                🏢
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-blue-100">Imobiliária STR</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href="/index.html"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/30 transition"
              >
                <span>🏠</span>
                <span>Site</span>
              </a>
              <Link 
                href="/analise-mercado/nova"
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-[#1877F2] text-sm font-medium rounded-lg hover:bg-blue-50 transition"
              >
                <span>🤖</span>
                <span>Análise IA</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Banner de boas-vindas */}
        <div className="bg-gradient-to-r from-blue-600 via-[#1877F2] to-purple-600 rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <span className="text-5xl">📊</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Visão Geral do Sistema</h2>
              <p className="text-blue-100">Acompanhe todas as métricas em tempo real</p>
            </div>
          </div>
        </div>

        {/* Stats Cards estilo OLX */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            href="/leads"
            icon="👥"
            title="Leads"
            value={stats.leads}
            color="blue"
          />
          <StatCard
            href="/imoveis"
            icon="🏠"
            title="Imóveis"
            value={stats.imoveis}
            color="green"
          />
          <StatCard
            href="/consultas"
            icon="📅"
            title="Consultas"
            value={stats.consultas}
            color="purple"
          />
          <StatCard
            href="/analise-mercado"
            icon="🤖"
            title="Análises IA"
            value={stats.analises}
            color="orange"
          />
        </div>

        {/* Seções de Ação */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Ações Rápidas */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#1877F2] px-5 py-4 flex items-center gap-3">
                <span className="text-3xl">⚡</span>
                <h2 className="text-lg font-bold text-white">Ações Rápidas</h2>
              </div>
              
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <ActionButton
                  href="/leads/novo"
                  icon="👥"
                  title="Novo Lead"
                  description="Adicionar contato"
                />
                <ActionButton
                  href="/imoveis/novo"
                  icon="🏠"
                  title="Novo Imóvel"
                  description="Cadastrar propriedade"
                />
                <ActionButton
                  href="/consultas/nova"
                  icon="📅"
                  title="Agendar Consulta"
                  description="Marcar visita"
                />
                <ActionButton
                  href="/proprietarios/novo"
                  icon="👤"
                  title="Novo Proprietário"
                  description="Cadastrar dono"
                />
              </div>
            </div>
          </div>

          {/* Card IA */}
          <div className="bg-gradient-to-br from-blue-600 via-[#1877F2] to-purple-600 rounded-xl shadow-xl p-6 text-white">
            <div className="text-5xl mb-4">🤖</div>
            <h2 className="text-xl font-bold mb-3">Inteligência Artificial</h2>
            <p className="text-blue-100 text-sm mb-6 leading-relaxed">
              Utilize IA para analisar o mercado e gerar insights automáticos.
            </p>
            <Link 
              href="/analise-mercado/nova"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1877F2] rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
            >
              <span>Gerar Análise</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* Links Rápidos */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#1877F2] px-5 py-4 flex items-center gap-3">
            <span className="text-3xl">🔗</span>
            <h3 className="text-lg font-bold text-white">Acesso Rápido</h3>
          </div>
          
          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickLink
              href="/leads/relatorio"
              icon="📊"
              title="Relatório de Leads"
              description="Análise de captação"
            />
            <QuickLink
              href="/imoveis/disponiveis"
              icon="🏘️"
              title="Imóveis Disponíveis"
              description="Ver catálogo"
            />
            <QuickLink
              href="/gerenciador-imoveis"
              icon="🔧"
              title="Gerenciador de Imóveis"
              description="Gerenciar propriedades"
            />
            <QuickLink
              href="/consultas/historico"
              icon="📋"
              title="Histórico"
              description="Consultas realizadas"
            />
          </div>
        </div>

        {/* Banner mobile IA */}
        <Link 
          href="/analise-mercado/nova"
          className="sm:hidden block mt-6 bg-[#1877F2] rounded-xl p-4 text-white shadow-lg"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">🤖</span>
            <div className="flex-1">
              <div className="font-semibold">Análise com IA</div>
              <div className="text-xs text-blue-100">Gerar insights automáticos</div>
            </div>
            <span className="text-xl">→</span>
          </div>
        </Link>

      </main>
    </div>
  )
}

// Card de Estatística estilo OLX
function StatCard({ href, icon, title, value, color }: any) {
  const colors: any = {
    blue: 'border-blue-200 bg-blue-50 hover:border-blue-300',
    green: 'border-green-200 bg-green-50 hover:border-green-300',
    purple: 'border-purple-200 bg-purple-50 hover:border-purple-300',
    orange: 'border-orange-200 bg-orange-50 hover:border-orange-300',
  }

  const textColors: any = {
    blue: 'text-[#1877F2]',
    green: 'text-green-700',
    purple: 'text-purple-700',
    orange: 'text-orange-700',
  }

  return (
    <Link href={href} className="block">
      <div className={`border-2 ${colors[color]} rounded-xl p-4 hover:shadow-lg transition`}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-3xl">{icon}</span>
          <span className={`text-3xl font-bold ${textColors[color]}`}>{value}</span>
        </div>
        <div className={`text-sm font-semibold ${textColors[color]}`}>{title}</div>
      </div>
    </Link>
  )
}

// Botão de Ação estilo OLX
function ActionButton({ href, icon, title, description }: any) {
  return (
    <Link 
      href={href}
      className="group flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition"
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#1877F2]">{title}</div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
      <span className="text-gray-400 group-hover:text-[#1877F2] transition">→</span>
    </Link>
  )
}

// Link Rápido estilo OLX
function QuickLink({ href, icon, title, description }: any) {
  return (
    <Link 
      href={href}
      className="group flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#1877F2] hover:bg-blue-50 transition"
    >
      <span className="text-2xl">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#1877F2]">{title}</div>
        <div className="text-xs text-gray-500 truncate">{description}</div>
      </div>
      <span className="text-gray-400 group-hover:text-[#1877F2] transition">→</span>
    </Link>
  )
}