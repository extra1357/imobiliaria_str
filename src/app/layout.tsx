import { ReactNode } from 'react'
import './globals.css'

export const metadata = {
  title: 'Imobiliária STR',
  description: 'Sistema de gerenciamento imobiliário',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}