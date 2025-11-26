import { NextRequest } from 'next/server'
import prisma from '@/database/prisma-client'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  try {
    const tipo = req.nextUrl.searchParams.get('tipo')
    const relatorios = await prisma.relatorio.findMany({
      where: tipo ? { tipo } : {},
      orderBy: { dataGeracao: 'desc' }
    })
    return successResponse(relatorios)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const relatorio = await prisma.relatorio.create({ data: body })
    return successResponse(relatorio, 'Relatório criado', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}