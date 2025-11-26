import { NextRequest } from 'next/server'
import prisma from '@/database/prisma-client'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function GET() {
  try {
    const props = await prisma.proprietario.findMany()
    return successResponse(props)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const prop = await prisma.proprietario.create({ data: body })
    return successResponse(prop, 'Proprietário criado', 201)
  } catch (e: any) {
    return errorResponse(e.message)
  }
}