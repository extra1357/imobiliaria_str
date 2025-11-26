import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET(req: NextRequest) {
  try {
    const cidade = req.nextUrl.searchParams.get('cidade') || 'São Paulo'
    return successResponse({ cidade, mensagem: 'Análise em desenvolvimento' })
  } catch (e: any) {
    return errorResponse(e.message)
  }
}