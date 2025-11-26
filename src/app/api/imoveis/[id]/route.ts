// src/app/api/imoveis/[id]/route.ts
// ============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    console.log(`📝 Atualizando imóvel ${id}:`, body);

    if (!body.status) {
      return NextResponse.json(
        { error: 'Status é obrigatório' },
        { status: 400 }
      );
    }

    // Lógica de exclusão: ATIVO = disponivel true, outros = disponivel false
    const disponivel = body.status === 'ATIVO';

    const imovelAtualizado = await prisma.imovel.update({
      where: { id },
      data: {
        status: body.status,
        disponivel: disponivel
      },
      include: {
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true
          }
        }
      }
    });

    console.log(`✅ Imóvel atualizado: ${id} -> status: ${body.status}, disponivel: ${disponivel}`);

    // Registra auditoria
    try {
      await prisma.auditoria.create({
        data: {
          acao: 'UPDATE_STATUS',
          tabela: 'Imovel',
          registroId: id,
          usuario: 'sistema',
          dados: JSON.stringify({
            statusNovo: body.status,
            disponivel: disponivel,
            endereco: imovelAtualizado.endereco
          })
        }
      });
    } catch (auditError) {
      console.warn('⚠️ Erro ao registrar auditoria (não crítico):', auditError);
    }

    return NextResponse.json(imovelAtualizado, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar imóvel:', error);
    
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json(
        { error: 'Imóvel não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Erro ao atualizar imóvel', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const imovel = await prisma.imovel.findUnique({
      where: { id },
      include: {
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        }
      }
    });

    if (!imovel) {
      return NextResponse.json(
        { error: 'Imóvel não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(imovel, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar imóvel:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imóvel', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}