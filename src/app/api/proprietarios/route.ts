// ============================================================================
// src/app/api/proprietarios/route.ts
// ============================================================================

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// CRÍTICO: Inicialização Global do PrismaClient para evitar múltiplas instâncias
// durante o "hot-reloading" em ambiente de desenvolvimento (Next.js).
// Em produção, ele será inicializado apenas uma vez.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

/**
 * Endpoint POST: Cria um novo proprietário e regista a auditoria.
 * O nome da função DEVE ser 'POST' para o Next.js App Router funcionar (erro 405 resolvido).
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('📝 Tentativa de criação de novo proprietário:', body.email);

    // Validações de Obrigatoriedade
    if (!body.nome || !body.email || !body.telefone) {
      return NextResponse.json(
        { error: 'Nome, email e telefone são obrigatórios para o cadastro.' },
        { status: 400 } // Bad Request
      );
    }

    // 1. Verifica Duplicação de Email
    const emailExiste = await prisma.proprietario.findUnique({
      where: { email: body.email },
    });

    if (emailExiste) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado. Por favor, use outro.' },
        { status: 409 } // Conflict
      );
    }

    // 2. Verifica Duplicação de CPF (se fornecido)
    if (body.cpf) {
      const cpfExiste = await prisma.proprietario.findUnique({
        where: { cpf: body.cpf },
      });

      if (cpfExiste) {
        return NextResponse.json(
          { error: 'Este CPF já está cadastrado.' },
          { status: 409 } // Conflict
        );
      }
    }

    // 3. Cria o proprietário
    const novoProprietario = await prisma.proprietario.create({
      data: {
        nome: body.nome,
        email: body.email,
        telefone: body.telefone,
        cpf: body.cpf || null, // Garante que o campo é tratado como opcional
      },
      // Seleciona apenas os campos necessários para a resposta
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        cpf: true,
      },
    });

    console.log(`✅ Proprietário criado com ID: ${novoProprietario.id}`);

    // 4. Registo de Auditoria (Bloco não-crítico)
    try {
      await prisma.auditoria.create({
        data: {
          acao: 'CREATE',
          tabela: 'Proprietario',
          registroId: novoProprietario.id,
          // NOTA: O 'sistema' deve ser substituído pelo ID real do usuário autenticado se houver
          usuario: 'Sistema API',
          dados: JSON.stringify({
            nome: novoProprietario.nome,
            email: novoProprietario.email,
          }),
        },
      });
    } catch (auditError) {
      // Advertência: Se a auditoria falhar, a criação do proprietário deve continuar
      console.warn('⚠️ Erro ao registrar auditoria (não crítico):', auditError);
    }

    // 5. Resposta de Sucesso
    // Retorna o novo objeto Proprietário (incluindo o ID) com status 201 Created.
    return NextResponse.json(
      {
        message: 'Proprietário cadastrado com sucesso!',
        data: { id: novoProprietario.id } // Formato adaptado para o frontend que espera `data.id`
      },
      {
        status: 201,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
      }
    );

  } catch (error) {
    console.error('❌ Erro inesperado ao criar proprietário:', error);

    // 6. Resposta de Erro Genérica
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido no servidor.';
    return NextResponse.json(
      {
        error: 'Erro interno do servidor ao criar proprietário.',
        details: errorMessage,
      },
      { status: 500 }
    );
  } finally {
    // 7. Desconectar o Prisma (Opcional, mas boa prática em requests independentes)
    // O Prisma recomenda não usar $disconnect em cada requisição se for usar o global.prisma
    // Mas se o seu padrão de projeto for desconectar, pode manter (como na sua lógica original)
    // await prisma.$disconnect(); 
  }
}

/**
 * Endpoint GET: Retorna todos os proprietários.
 * O nome da função DEVE ser 'GET' para o Next.js App Router funcionar.
 */
export async function GET(request: NextRequest) {
  try {
    const proprietarios = await prisma.proprietario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        nome: 'asc',
      },
    });

    console.log(`✅ Retornando ${proprietarios.length} proprietários`);

    return NextResponse.json(proprietarios, {
      status: 200,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('❌ Erro ao buscar proprietários:', error);
    return NextResponse.json(
      {
        error: 'Erro ao buscar proprietários',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      },
      { status: 500 }
    );
  } finally {
    // await prisma.$disconnect();
  }
}