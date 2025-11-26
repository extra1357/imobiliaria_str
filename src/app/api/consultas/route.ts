import { NextRequest } from 'next/server'
import prisma from '@/database/prisma-client'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET() {
  try {
    const consultas = await prisma.consulta.findMany({
      include: { lead: true, imovel: true },
      orderBy: { data: 'desc' }
    })
    return successResponse(consultas)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const consulta = await prisma.consulta.create({ data: body })
    return successResponse(consulta, 'Consulta criada', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}