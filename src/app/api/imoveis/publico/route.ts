// app/api/imoveis/publico/route.ts
// Esta rota retorna APENAS imóveis ATIVOS (visíveis ao público)

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Filtros opcionais
    const cidade = searchParams.get('cidade')
    const estado = searchParams.get('estado')
    const tipo = searchParams.get('tipo')
    const precoMin = searchParams.get('precoMin')
    const precoMax = searchParams.get('precoMax')

    // Monta o filtro dinâmico
    const where: any = {
      status: 'ATIVO', // 🔥 EXCLUSÃO LÓGICA: Só retorna ATIVOS
      disponivel: true  // Redundância para garantir
    }

    if (cidade) where.cidade = { contains: cidade, mode: 'insensitive' }
    if (estado) where.estado = estado
    if (tipo) where.tipo = tipo
    if (precoMin) where.preco = { ...where.preco, gte: parseFloat(precoMin) }
    if (precoMax) where.preco = { ...where.preco, lte: parseFloat(precoMax) }

    const imoveis = await prisma.imovel.findMany({
      where,
      include: {
        proprietario: {
          select: {
            id: true,
            nome: true,
            telefone: true, // Para contato
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      total: imoveis.length,
      imoveis
    })

  } catch (error) {
    console.error('Erro ao buscar imóveis públicos:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar imóveis' },
      { status: 500 }
    )
  }
}