import { NextRequest } from 'next/server'
import prisma from '@/database/prisma-client'
import { successResponse, errorResponse } from '@/utils/api-response'

// Atualizar status da consulta
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { id } = params

    const consulta = await prisma.consulta.update({
      where: { id },
      data: {
        status: body.status,
        observacoes: body.observacoes,
        motivoCancelamento: body.motivoCancelamento,
        valorProposta: body.valorProposta,
        dataFechamento: body.status === 'fechada' ? new Date() : undefined,
        updatedAt: new Date()
      },
      include: {
        lead: true,
        imovel: true
      }
    })

    return successResponse(consulta, 'Status atualizado')
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

// Buscar detalhes da consulta
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const consulta = await prisma.consulta.findUnique({
      where: { id },
      include: {
        lead: true,
        imovel: true
      }
    })

    if (!consulta) {
      return errorResponse('Consulta não encontrada', 404)
    }

    return successResponse(consulta)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}