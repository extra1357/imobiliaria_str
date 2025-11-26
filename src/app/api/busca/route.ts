import { NextRequest } from 'next/server'
import buscaService from '@/services/busca-service'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json()
    const resultados = await buscaService.buscaInteligente(query)
    return successResponse(resultados)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}