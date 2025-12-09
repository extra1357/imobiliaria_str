// ============================================================================
// src/app/api/imoveis/route.ts
// ============================================================================
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const publico = searchParams.get('publico');
    
    let whereClause: any = {};
    
    if (publico === 'true') {
      whereClause = {
        status: 'ATIVO',
        disponivel: true
      };
    }

    const imoveis = await prisma.imovel.findMany({
      where: whereClause,
      include: {
        proprietario: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    console.log(`✅ Retornando ${imoveis.length} imóveis (publico: ${publico})`);

    // ✅ ALTERAÇÃO FEITA AQUI: Agora retorna { data, total }
    return NextResponse.json({
      data: imoveis,
      total: imoveis.length
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar imóveis:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar imóveis', details: error instanceof Error ? error.message : 'Erro desconhecido' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📝 Criando novo imóvel:', body);

    // Validações obrigatórias (conforme Prisma schema)
    if (!body.tipo || !body.endereco || !body.cidade || !body.estado || body.preco === undefined || body.metragem === undefined || !body.proprietarioId) {
      return NextResponse.json(
        { error: 'Campos obrigatórios: tipo, endereco, cidade, estado, preco, metragem, proprietarioId' },
        { status: 400 }
      );
    }

    // Verifica se proprietário existe
    const proprietarioExiste = await prisma.proprietario.findUnique({
      where: { id: body.proprietarioId }
    });

    if (!proprietarioExiste) {
      return NextResponse.json(
        { error: 'Proprietário não encontrado' },
        { status: 404 }
      );
    }

    // Cria o imóvel (conforme model Imovel do Prisma)
    const novoImovel = await prisma.imovel.create({
      data: {
        tipo: body.tipo,
        endereco: body.endereco,
        cidade: body.cidade,
        estado: body.estado,
        preco: parseFloat(body.preco),
        metragem: parseFloat(body.metragem),
        descricao: body.descricao || null,
        proprietarioId: body.proprietarioId,
        status: 'ATIVO', // default do schema
        disponivel: true, // default do schema
        imagens: body.imagens || [] // default do schema
      },
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

    console.log(`✅ Imóvel criado: ${novoImovel.id}`);

    // Registra auditoria
    try {
      await prisma.auditoria.create({
        data: {
          acao: 'CREATE',
          tabela: 'Imovel',
          registroId: novoImovel.id,
          usuario: 'sistema',
          dados: JSON.stringify({
            tipo: novoImovel.tipo,
            endereco: novoImovel.endereco,
            cidade: novoImovel.cidade,
            preco: novoImovel.preco
          })
        }
      });
    } catch (auditError) {
      console.warn('⚠️ Erro ao registrar auditoria (não crítico):', auditError);
    }

    return NextResponse.json(novoImovel, {
      status: 201,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });

  } catch (error) {
    console.error('❌ Erro ao criar imóvel:', error);
    
    return NextResponse.json(
      { 
        error: 'Erro ao criar imóvel', 
        details: error instanceof Error ? error.message : 'Erro desconhecido' 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}