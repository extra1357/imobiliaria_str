
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextRequest, NextResponse } from 'next/server'
import leadService from '@/services/lead-service'
import { successResponse, errorResponse } from '@/utils/api-response'

// Adicionar headers CORS
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

// Handler para OPTIONS (preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders()
  })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const lead = await leadService.create(body)
    
    const response = successResponse(lead, 'Lead criado', 201)
    
    // Adicionar CORS ao response
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (e: any) {
    const response = errorResponse(e.message)
    
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  }
}

export async function GET(req: NextRequest) {
  try {
    const leads = await leadService.list()
    
    const response = successResponse(leads)
    
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  } catch (e: any) {
    const response = errorResponse(e.message)
    
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    
    return response
  }
}