import { NextRequest } from 'next/server'
import { successResponse, errorResponse } from '@/utils/api-response'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    return successResponse({ token: 'fake-token' }, 'Auth em desenvolvimento')
  } catch (e: any) {
    return errorResponse(e.message)
  }
}