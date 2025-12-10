
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const imoveis = await prisma.imovel.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({
      success: true,
      data: imoveis
    });

  } catch (error) {
    console.error("ERRO API /imoveis:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro interno ao buscar imóveis"
      },
      { status: 500 }
    );
  }
}
