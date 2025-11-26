'use client'
import React from 'react';

export default function HomePage() {
  const sections = [
    {
      title: 'Dashboard',
      emoji: '📊',
      color: 'from-blue-600 to-blue-700',
      items: [
        { name: 'Painel Principal', path: '/dashboard', emoji: '📈', desc: 'Visão geral do sistema' }
      ]
    },
    {
      title: 'Leads',
      emoji: '👥',
      color: 'from-green-600 to-green-700',
      items: [
        { name: 'Lista de Leads', path: '/leads', emoji: '📋', desc: 'Todos os leads cadastrados' },
        { name: 'Novo Lead', path: '/leads/novo', emoji: '➕', desc: 'Cadastrar novo lead' },
        { name: 'Relatório de Leads', path: '/leads/relatorio', emoji: '📄', desc: 'Análises e métricas' },
        { name: 'Leads por Status', path: '/leads/status', emoji: '🎯', desc: 'Filtrar por status' },
        { name: 'Leads por Origem', path: '/leads/origem', emoji: '🔍', desc: 'Filtrar por origem' }
      ]
    },
    {
      title: 'Imóveis',
      emoji: '🏠',
      color: 'from-purple-600 to-purple-700',
      items: [
        { name: 'Lista de Imóveis', path: '/imoveis', emoji: '📋', desc: 'Todos os imóveis' },
        { name: 'Novo Imóvel', path: '/imoveis/novo', emoji: '➕', desc: 'Cadastrar imóvel' },
        { name: 'Imóveis Disponíveis', path: '/imoveis/disponiveis', emoji: '🏘️', desc: 'Apenas disponíveis' },
        { name: 'Imóveis por Tipo', path: '/imoveis/tipos', emoji: '🏢', desc: 'Filtrar por tipo' },
        { name: 'Imóveis por Cidade', path: '/imoveis/cidades', emoji: '🌆', desc: 'Buscar por cidade' },
        { name: 'Galeria de Fotos', path: '/imoveis/galeria', emoji: '📸', desc: 'Visualizar imagens' }
      ]
    },
    {
      title: 'Proprietários',
      emoji: '👤',
      color: 'from-orange-600 to-orange-700',
      items: [
        { name: 'Lista de Proprietários', path: '/proprietarios', emoji: '📋', desc: 'Todos os proprietários' },
        { name: 'Novo Proprietário', path: '/proprietarios/novo', emoji: '➕', desc: 'Cadastrar proprietário' },
        { name: 'Proprietários por Email', path: '/proprietarios/email', emoji: '📧', desc: 'Buscar por email' },
        { name: 'Proprietários por CPF', path: '/proprietarios/cpf', emoji: '🆔', desc: 'Buscar por CPF' }
      ]
    },
    {
      title: 'Consultas & Visitas',
      emoji: '📅',
      color: 'from-cyan-600 to-cyan-700',
      items: [
        { name: 'Agenda de Consultas', path: '/consultas', emoji: '🗓️', desc: 'Todas as consultas' },
        { name: 'Nova Consulta', path: '/consultas/nova', emoji: '➕', desc: 'Agendar consulta' },
        { name: 'Histórico', path: '/consultas/historico', emoji: '📋', desc: 'Consultas anteriores' },
        { name: 'Consultas Agendadas', path: '/consultas/agendadas', emoji: '⏰', desc: 'Próximas visitas' },
        { name: 'Consultas Realizadas', path: '/consultas/realizadas', emoji: '✅', desc: 'Concluídas' },
        { name: 'Consultas Canceladas', path: '/consultas/canceladas', emoji: '❌', desc: 'Cancelamentos' },
        { name: 'Propostas', path: '/consultas/propostas', emoji: '💰', desc: 'Gerenciar propostas' },
        { name: 'Comissões', path: '/consultas/comissoes', emoji: '💵', desc: 'Calcular comissões' }
      ]
    },
    {
      title: 'Análise de Mercado',
      emoji: '📈',
      color: 'from-indigo-600 to-indigo-700',
      items: [
        { name: 'Análises', path: '/analise-mercado', emoji: '💹', desc: 'Todas as análises' },
        { name: 'Nova Análise', path: '/analise-mercado/nova', emoji: '➕', desc: 'Criar análise' },
        { name: 'Análise por Cidade', path: '/analise-mercado/cidade', emoji: '🌆', desc: 'Filtrar por cidade' },
        { name: 'Análise por Estado', path: '/analise-mercado/estado', emoji: '🗺️', desc: 'Filtrar por estado' },
        { name: 'Tendências', path: '/analise-mercado/tendencias', emoji: '📊', desc: 'Ver tendências' },
        { name: 'Valor por M²', path: '/analise-mercado/valor-m2', emoji: '📐', desc: 'Preços por m²' }
      ]
    },
    {
      title: 'Relatórios',
      emoji: '📄',
      color: 'from-pink-600 to-pink-700',
      items: [
        { name: 'Todos os Relatórios', path: '/relatorios', emoji: '📋', desc: 'Lista completa' },
        { name: 'Novo Relatório', path: '/relatorios/novo', emoji: '➕', desc: 'Gerar relatório' },
        { name: 'Relatórios por Tipo', path: '/relatorios/tipos', emoji: '📊', desc: 'Filtrar por tipo' },
        { name: 'Relatórios por Período', path: '/relatorios/periodo', emoji: '📆', desc: 'Filtrar por data' },
        { name: 'Exportar Relatórios', path: '/relatorios/exportar', emoji: '💾', desc: 'Download PDF/Excel' }
      ]
    },
    {
      title: 'Auditoria',
      emoji: '🔍',
      color: 'from-red-600 to-red-700',
      items: [
        { name: 'Log de Auditoria', path: '/auditoria', emoji: '📝', desc: 'Todas as ações' },
        { name: 'Auditoria por Ação', path: '/auditoria/acoes', emoji: '⚡', desc: 'Filtrar por ação' },
        { name: 'Auditoria por Tabela', path: '/auditoria/tabelas', emoji: '🗂️', desc: 'Filtrar por tabela' },
        { name: 'Auditoria por Usuário', path: '/auditoria/usuarios', emoji: '👤', desc: 'Ações por usuário' },
        { name: 'Auditoria por Data', path: '/auditoria/data', emoji: '📅', desc: 'Filtrar por período' },
        { name: 'Auditoria de IP', path: '/auditoria/ip', emoji: '🌐', desc: 'Rastrear por IP' }
      ]
    },
    {
      title: 'Usuários',
      emoji: '👥',
      color: 'from-teal-600 to-teal-700',
      items: [
        { name: 'Lista de Usuários', path: '/usuarios', emoji: '📋', desc: 'Todos os usuários' },
        { name: 'Novo Usuário', path: '/usuarios/novo', emoji: '➕', desc: 'Cadastrar usuário' },
        { name: 'Usuários por Role', path: '/usuarios/roles', emoji: '🎭', desc: 'Filtrar por função' },
        { name: 'Usuários Ativos', path: '/usuarios/ativos', emoji: '✅', desc: 'Apenas ativos' },
        { name: 'Usuários Inativos', path: '/usuarios/inativos', emoji: '⛔', desc: 'Desativados' },
        { name: 'Gerenciar Permissões', path: '/usuarios/permissoes', emoji: '🔐', desc: 'Controle de acesso' }
      ]
    }
  ];

  const apiRoutes = [
    { method: 'GET', path: '/api/leads', desc: 'Listar leads' },
    { method: 'POST', path: '/api/leads', desc: 'Criar lead' },
    { method: 'PUT', path: '/api/leads/[id]', desc: 'Atualizar lead' },
    { method: 'DELETE', path: '/api/leads/[id]', desc: 'Deletar lead' },
    { method: 'GET', path: '/api/imoveis', desc: 'Listar imóveis' },
    { method: 'POST', path: '/api/imoveis', desc: 'Criar imóvel' },
    { method: 'PUT', path: '/api/imoveis/[id]', desc: 'Atualizar imóvel' },
    { method: 'DELETE', path: '/api/imoveis/[id]', desc: 'Deletar imóvel' },
    { method: 'GET', path: '/api/proprietarios', desc: 'Listar proprietários' },
    { method: 'POST', path: '/api/proprietarios', desc: 'Criar proprietário' },
    { method: 'GET', path: '/api/consultas', desc: 'Listar consultas' },
    { method: 'POST', path: '/api/consultas', desc: 'Criar consulta' },
    { method: 'GET', path: '/api/analise-mercado', desc: 'Análises de mercado' },
    { method: 'POST', path: '/api/analise-mercado', desc: 'Nova análise' },
    { method: 'GET', path: '/api/relatorios', desc: 'Listar relatórios' },
    { method: 'POST', path: '/api/relatorios', desc: 'Gerar relatório' },
    { method: 'GET', path: '/api/auditoria', desc: 'Log de auditoria' },
    { method: 'GET', path: '/api/usuarios', desc: 'Listar usuários' },
    { method: 'POST', path: '/api/usuarios', desc: 'Criar usuário' }
  ];

  const quickStats = [
    { label: 'Leads Ativos', value: '156', icon: '👥', color: 'bg-green-500' },
    { label: 'Imóveis Disponíveis', value: '89', icon: '🏠', color: 'bg-purple-500' },
    { label: 'Consultas Hoje', value: '12', icon: '📅', color: 'bg-cyan-500' },
    { label: 'Propostas Abertas', value: '7', icon: '💰', color: 'bg-orange-500' }
  ];

  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1877F2] to-[#0d5dbf] shadow-lg px-4 sm:px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-lg transform hover:scale-105 transition">
                🏢
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">IMOBILIÁRIA STR</h1>
                <p className="text-sm text-blue-100">Sistema de Gestão Imobiliária</p>
              </div>
            </div>
            <a 
              href="/dashboard"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-white text-[#1877F2] text-sm font-semibold rounded-lg hover:bg-blue-50 transition shadow-md hover:shadow-lg"
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
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">👋</span>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold">Bem-vindo ao Sistema</h2>
              <p className="text-blue-100">Acesse todas as funcionalidades do seu painel administrativo</p>
            </div>
          </div>
          
          {/* Stats rápidos */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            {quickStats.map((stat, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid de Módulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {sections.map((section, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100"
            >
              {/* Header do módulo */}
              <div className={`bg-gradient-to-r ${section.color} px-5 py-4 flex items-center gap-3`}>
                <span className="text-3xl">{section.emoji}</span>
                <h2 className="text-lg font-bold text-white">{section.title}</h2>
              </div>
              
              {/* Items do módulo */}
              <div className="p-3 max-h-96 overflow-y-auto">
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    onClick={() => handleNavigate(item.path)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition text-left group mb-1 last:mb-0 border border-transparent hover:border-blue-200"
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition">{item.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-[#1877F2]">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-gray-400 group-hover:text-[#1877F2] transition transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Seção de APIs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4 flex items-center gap-3">
            <span className="text-3xl">🔌</span>
            <div>
              <h3 className="text-lg font-bold text-white">Rotas da API REST</h3>
              <p className="text-sm text-gray-300">Endpoints disponíveis do sistema</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {apiRoutes.map((api, idx) => (
                <div 
                  key={idx}
                  className="border-l-4 border-[#1877F2] pl-4 py-3 bg-gray-50 rounded-r-lg hover:bg-blue-50 transition group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      api.method === 'GET' 
                        ? 'bg-blue-100 text-blue-700' 
                        : api.method === 'POST'
                        ? 'bg-green-100 text-green-700'
                        : api.method === 'PUT'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {api.method}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-900 mb-1 font-semibold break-all">
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
        <div className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🏢</span>
            <p className="text-sm font-semibold text-gray-900">
              Sistema Completo de Gestão Imobiliária
            </p>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 Imobiliária STR - Todos os direitos reservados
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
            <span>✅ 9 Módulos</span>
            <span>•</span>
            <span>📊 Dashboard Completo</span>
            <span>•</span>
            <span>🔌 19 APIs</span>
          </div>
        </div>

      </main>
    </div>
  );
}