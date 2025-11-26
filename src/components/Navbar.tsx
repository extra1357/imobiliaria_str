'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  
  const isActive = (path: string) => pathname.startsWith(path)

  return (
    <nav className="glass-effect border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="text-4xl group-hover:scale-110 transition-transform">🏢</div>
            <div>
              <div className="text-2xl font-black gradient-text">STR</div>
              <div className="text-xs text-gray-600 font-medium">Imobiliária</div>
            </div>
          </Link>
          <Link href="/consultas/funil" className={`...`}>
             <span className="mr-2">🎯</span>Funil
          </Link>
          
          {/* Menu Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavLink href="/dashboard" isActive={isActive('/dashboard')}>
              <span className="mr-2">📊</span>Dashboard
            </NavLink>
            <NavLink href="/leads" isActive={isActive('/leads')}>
              <span className="mr-2">👥</span>Leads
            </NavLink>
            <NavLink href="/imoveis" isActive={isActive('/imoveis')}>
              <span className="mr-2">🏠</span>Imóveis
            </NavLink>
            <NavLink href="/proprietarios" isActive={isActive('/proprietarios')}>
              <span className="mr-2">👤</span>Proprietários
            </NavLink>
            <NavLink href="/consultas" isActive={isActive('/consultas')}>
              <span className="mr-2">📅</span>Consultas
            </NavLink>
            <NavLink href="/analise-mercado" isActive={isActive('/analise-mercado')}>
              <span className="mr-2">🤖</span>IA
            </NavLink>
          </div>

          {/* Botão Ver Site */}
          <Link 
            href="/imoveis-publicos"
            className="hidden md:flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <span className="mr-2">🌐</span>
            Ver Site
          </Link>
        </div>
      </div>
    </nav>
  )
}

function NavLink({ href, isActive, children }: { href: string, isActive: boolean, children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
        isActive 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  )
}