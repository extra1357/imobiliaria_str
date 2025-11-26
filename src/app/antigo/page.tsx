'use client'
import React from 'react';

export default function HomePage() {
  const sections = [
    {
      title: 'Dashboard',
      emoji: '📊',
      items: [
        { name: 'Painel Principal', path: '/dashboard', emoji: '📈' }
      ]
    },
    {
      title: 'Leads',
      emoji: '👥',
      items: [
        { name: 'Lista de Leads', path: '/leads', emoji: '📋' },
        { name: 'Novo Lead', path: '/leads/novo', emoji: '➕' },
        { name: 'Relatório de Leads', path: '/leads/relatorio', emoji: '📄' }
      ]
    },
    {
      title: 'Imóveis',
      emoji: '🏠',
      items: [
        { name: 'Lista de Imóveis', path: '/imoveis', emoji: '📋' },
        { name: 'Novo Imóvel', path: '/imoveis/novo', emoji: '➕' },
        { name: 'Imóveis Disponíveis', path: '/imoveis/disponiveis', emoji: '🏘️' }
      ]
    },
    {
      title: 'Proprietários',
      emoji: '👤',
      items: [
        { name: 'Lista de Proprietários', path: '/proprietarios', emoji: '📋' },
        { name: 'Novo Proprietário', path: '/proprietarios/novo', emoji: '➕' }
      ]
    },
    {
      title: 'Consultas',
      emoji: '📅',
      items: [
        { name: 'Agenda de Consultas', path: '/consultas', emoji: '🗓️' },
        { name: 'Nova Consulta', path: '/consultas/nova', emoji: '➕' },
        { name: 'Histórico', path: '/consultas/historico', emoji: '📋' }
      ]
    },
    {
      title: 'Análise de Mercado',
      emoji: '📈',
      items: [
        { name: 'Análises', path: '/analise-mercado', emoji: '💹' },
        { name: 'Nova Análise', path: '/analise-mercado/nova', emoji: '➕' },
        { name: 'Relatórios', path: '/analise-mercado/relatorios', emoji: '📄' }
      ]
    }
  ];

  const apiRoutes = [
    { method: 'GET', path: '/api/leads', desc: 'Listar leads' },
    { method: 'POST', path: '/api/leads', desc: 'Criar lead' },
    { method: 'GET', path: '/api/imoveis', desc: 'Listar imóveis' },
    { method: 'GET', path: '/api/proprietarios', desc: 'Listar proprietários' },
    { method: 'GET', path: '/api/consultas', desc: 'Listar consultas' },
    { method: 'GET', path: '/api/analise-mercado', desc: 'Análises' }
  ];

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

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
                <h1 className="text-2xl font-bold text-white">IMOBILIÁRIA STR</h1>
                <p className="text-sm text-blue-100">Sistema de Gestão Imobiliária</p>
              </div>
            </div>
            <a 
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white text-[#1877F2] text-sm font-semibold rounded-lg hover:bg-blue-50 transition shadow-md"
            >
              <span>📊</span>
              <span>Dashboard</span>
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Banner de boas-vindas */}
        <div className="bg-gradient-to-r from-blue-600 via-[#1877F2] to-purple-600 rounded-2xl p-6 sm:p-8 mb-8 text-white shadow-xl">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-5xl">👋</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Bem-vindo ao Sistema</h2>
              <p className="text-blue-100">Acesse todas as funcionalidades do seu painel</p>
            </div>
          </div>
        </div>

        {/* Grid de Módulos - estilo OLX */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              {/* Header do módulo */}
              <div className="bg-[#1877F2] px-5 py-4 flex items-center gap-3">
                <span className="text-3xl">{section.emoji}</span>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              
              {/* Items do módulo */}
              <div className="p-3">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-blue-50 transition text-left group mb-1 last:mb-0"
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#1877F2]">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.path}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-[#1877F2] transition">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seção de APIs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-[#1877F2] px-5 py-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span>
            <h3 className="text-lg font-bold text-white">Rotas da API</h3>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {apiRoutes.map((api, idx) => (
                <div 
                  key={idx}
                  className="border-l-4 border-[#1877F2] pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-blue-50 transition"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      api.method === 'GET' 
                        ? 'bg-blue-100 text-[#1877F2]' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {api.method}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-900 mb-1 font-semibold">
                    {api.path}
                  </p>
                  <p className="text-xs text-gray-600">
                    {api.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Imobiliária STR - Sistema de Gestão Imobiliária
          </p>
        </div>

      </main>
    </div>
  );
}