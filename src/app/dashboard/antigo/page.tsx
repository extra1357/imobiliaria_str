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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-6xl">🏢</div>
            <div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 text-lg mt-1">
                Visão geral do sistema • Imobiliária STR
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            href="/leads"
            icon="👥"
            title="Leads"
            value={stats.leads}
            gradient="from-blue-500 via-blue-600 to-cyan-600"
            description="Contatos captados"
          />
          <StatCard
            href="/imoveis"
            icon="🏠"
            title="Imóveis"
            value={stats.imoveis}
            gradient="from-green-500 via-green-600 to-emerald-600"
            description="Cadastrados"
          />
          <StatCard
            href="/consultas"
            icon="📅"
            title="Consultas"
            value={stats.consultas}
            gradient="from-purple-500 via-purple-600 to-pink-600"
            description="Agendamentos"
          />
          <StatCard
            href="/analise-mercado"
            icon="🤖"
            title="Análises IA"
            value={stats.analises}
            gradient="from-orange-500 via-red-500 to-pink-600"
            description="Relatórios gerados"
          />
        </div>

        {/* Action Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Ações Rápidas */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">⚡</div>
              <h2 className="text-3xl font-bold text-gray-900">Ações Rápidas</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ActionButton
                href="/leads/novo"
                icon="👥"
                title="Novo Lead"
                description="Adicionar contato"
                color="blue"
              />
              <ActionButton
                href="/imoveis/novo"
                icon="🏠"
                title="Novo Imóvel"
                description="Cadastrar propriedade"
                color="green"
              />
              <ActionButton
                href="/consultas/nova"
                icon="📅"
                title="Agendar Consulta"
                description="Marcar visita"
                color="purple"
              />
              <ActionButton
                href="/proprietarios/novo"
                icon="👤"
                title="Novo Proprietário"
                description="Cadastrar dono"
                color="indigo"
              />
            </div>
          </div>

          {/* IA Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl p-8 text-white hover:shadow-2xl transition-shadow">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-4 animate-bounce-slow">🤖</div>
              <h2 className="text-2xl font-bold mb-3">Inteligência Artificial</h2>
              <p className="text-white/90 mb-6 text-sm leading-relaxed">
                Utilize o poder da IA para analisar o mercado, qualificar leads e gerar insights automáticos.
              </p>
              <Link 
                href="/analise-mercado/nova"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg"
              >
                <span>Gerar Análise</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickLink
            href="/leads/relatorio"
            icon="📊"
            title="Relatório de Leads"
            description="Análise de captação"
            color="blue"
          />
          <QuickLink
            href="/imoveis/disponiveis"
            icon="🏘️"
            title="Imóveis Disponíveis"
            description="Ver catálogo"
            color="green"
          />
          <QuickLink
            href="/consultas/historico"
            icon="📋"
            title="Histórico"
            description="Consultas realizadas"
            color="purple"
          />
        </div>
      </div>
    </div>
  )
}

// Componente de Card de Estatística
function StatCard({ href, icon, title, value, gradient, description }: any) {
  return (
    <Link href={href} className="group block">
      <div className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2`}>
        <div className="absolute top-0 right-0 text-8xl opacity-10 -mr-4 -mt-4 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="relative z-10">
          <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
          <div className="text-sm font-medium opacity-90 mb-1">{title}</div>
          <div className="text-4xl font-black mb-2">{value}</div>
          <div className="text-xs opacity-75">{description}</div>
        </div>
      </div>
    </Link>
  )
}

// Componente de Botão de Ação
function ActionButton({ href, icon, title, description, color }: any) {
  const colors: any = {
    blue: 'hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700',
    green: 'hover:bg-green-50 hover:border-green-300 hover:text-green-700',
    purple: 'hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700',
    indigo: 'hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700',
  }

  return (
    <Link 
      href={href}
      className={`group flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl transition-all ${colors[color]}`}
    >
      <div className="text-4xl group-hover:scale-110 transition-transform">{icon}</div>
      <div className="flex-1">
        <div className="font-bold text-gray-900 group-hover:translate-x-1 transition-transform">
          {title}
        </div>
        <div className="text-sm text-gray-600">{description}</div>
      </div>
      <div className="text-2xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        →
      </div>
    </Link>
  )
}

// Componente de Link Rápido
function QuickLink({ href, icon, title, description, color }: any) {
  const colors: any = {
    blue: 'from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200',
    green: 'from-green-50 to-green-100 hover:from-green-100 hover:to-green-200',
    purple: 'from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200',
  }

  return (
    <Link 
      href={href}
      className={`group block bg-gradient-to-br ${colors[color]} rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1`}
    >
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-600">{description}</p>
      <div className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:text-blue-600 group-hover:gap-3 transition-all">
        <span>Acessar</span>
        <span>→</span>
      </div>
    </Link>
  )
}