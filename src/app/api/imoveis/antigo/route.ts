import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET - Listar imóveis com filtros
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tipo = searchParams.get('tipo')
    const cidade = searchParams.get('cidade')
    const disponivel = searchParams.get('disponivel')
    
    // Montar filtros
    const where: any = {}
    
    if (tipo) where.tipo = tipo
    if (cidade) where.cidade = cidade
    if (disponivel !== null) where.disponivel = disponivel === 'true'
    
    // Buscar imóveis
    const imoveis = await prisma.imovel.findMany({
      where,
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
        createdAt: 'desc' // ✅ Corrigido de criadoEm para createdAt
      }
    })
    
    return NextResponse.json({
      success: true,
      data: imoveis,
      total: imoveis.length
    })
    
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro ao buscar imóveis',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// POST - Criar novo imóvel
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { 
      tipo, 
      endereco, 
      cidade, 
      estado, 
      preco, 
      metragem, 
      descricao, 
      proprietarioId,
      status,
      disponivel,
      imagens 
    } = body

    // Validações
    if (!tipo || !endereco || !cidade || !estado || !preco || !metragem || !proprietarioId) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Campos obrigatórios faltando',
          required: ['tipo', 'endereco', 'cidade', 'estado', 'preco', 'metragem', 'proprietarioId']
        },
        { status: 400 }
      )
    }

    if (!Array.isArray(imagens) || imagens.length === 0) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Pelo menos uma imagem é necessária' 
        },
        { status: 400 }
      )
    }

    // Verificar se o proprietário existe
    const proprietarioExiste = await prisma.proprietario.findUnique({
      where: { id: proprietarioId }
    })

    if (!proprietarioExiste) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Proprietário não encontrado' 
        },
        { status: 404 }
      )
    }

    // Criar imóvel no banco
    const imovel = await prisma.imovel.create({
      data: {
        tipo,
        endereco,
        cidade,
        estado,
        preco: parseFloat(preco),
        metragem: parseFloat(metragem),
        descricao: descricao || null,
        proprietarioId,
        status: status || 'ATIVO',
        disponivel: disponivel !== false,
        imagens
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
    })

    // Registrar auditoria
    await prisma.auditoria.create({
      data: {
        acao: 'CREATE',
        tabela: 'Imovel',
        registroId: imovel.id,
        usuario: 'sistema',
        dados: JSON.stringify({
          tipo: imovel.tipo,
          endereco: imovel.endereco,
          cidade: imovel.cidade,
          preco: imovel.preco
        })
      }
    })

    return NextResponse.json({
      success: true,
      data: imovel,
      message: 'Imóvel cadastrado com sucesso'
    }, { status: 201 })

  } catch (error) {
    console.error('Erro ao criar imóvel:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Erro interno ao cadastrar imóvel',
        message: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}