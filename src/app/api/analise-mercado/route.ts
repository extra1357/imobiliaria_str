import { NextRequest } from 'next/server'
import prisma from '@/database/prisma-client'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  try {
    const cidade = req.nextUrl.searchParams.get('cidade')
    const analises = await prisma.analiseMercado.findMany({
      where: cidade ? { cidade } : {},
      orderBy: { dataAnalise: 'desc' }
    })
    return successResponse(analises)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const analise = await prisma.analiseMercado.create({ data: body })
    return successResponse(analise, 'Análise criada', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}