import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export default function Container({ children, title, subtitle, action }: ContainerProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {(title || action) && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              {title && <h1 className="text-4xl font-bold text-gray-900 mb-2">{title}</h1>}
              {subtitle && <p className="text-gray-600">{subtitle}</p>}
            </div>
            {action && <div>{action}</div>}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}