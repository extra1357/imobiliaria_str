import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Iniciando seed...\n')

  // Limpar ordem correta (tabelas dependentes primeiro)
  await prisma.consulta.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.imovel.deleteMany()
  await prisma.proprietario.deleteMany()
  await prisma.analiseMercado.deleteMany()
  await prisma.relatorio.deleteMany()
  await prisma.usuario.deleteMany()
  await prisma.auditoria.deleteMany()
  
  console.log('➡️  Dados antigos apagados')

  // ========================================
  // USUÁRIOS
  // ========================================
  const usuario = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@str.com',
      senha: await bcrypt.hash('admin123', 10),
      role: 'admin'
    }
  })
  console.log('➡️  Usuário admin criado')

  // ========================================
  // PROPRIETÁRIOS
  // ========================================
  const prop1 = await prisma.proprietario.create({
    data: {
      nome: 'João Silva',
      telefone: '11987654321',
      email: 'joao@email.com',
      cpf: '12345678900'
    }
  })

  const prop2 = await prisma.proprietario.create({
    data: {
      nome: 'Maria Souza',
      telefone: '11976543210',
      email: 'maria.souza@email.com',
      cpf: '98765432100'
    }
  })

  const prop3 = await prisma.proprietario.create({
    data: {
      nome: 'Pedro Alvares',
      telefone: '11965432109',
      email: 'pedro.alvares@email.com',
      cpf: '45678912300'
    }
  })

  console.log('➡️  Proprietários criados (3)')

  // ========================================
  // IMÓVEIS COM DIFERENTES STATUS
  // ========================================
  
  // IMÓVEIS ATIVOS (visíveis ao público)
  const imovel1 = await prisma.imovel.create({
    data: {
      tipo: 'Apartamento',
      endereco: 'Rua das Flores, 123',
      cidade: 'São Paulo',
      estado: 'SP',
      preco: 450000,
      metragem: 80,
      descricao: 'Apartamento moderno com 2 quartos, sala ampla e vaga de garagem',
      status: 'ATIVO',
      disponivel: true,
      proprietarioId: prop1.id,
      imagens: [
        'https://placehold.co/400x300/A0C4FF/ffffff?text=Apartamento+Moderno',
        'https://placehold.co/400x300/BDB2FF/ffffff?text=Sala+Ampla'
      ]
    }
  })

  const imovel2 = await prisma.imovel.create({
    data: {
      tipo: 'Casa',
      endereco: 'Av. Brasil, 500',
      cidade: 'Salto',
      estado: 'SP',
      preco: 250000,
      metragem: 120,
      descricao: 'Casa com quintal amplo, 3 quartos e churrasqueira',
      status: 'ATIVO',
      disponivel: true,
      proprietarioId: prop2.id,
      imagens: [
        'https://placehold.co/400x300/FFC6FF/ffffff?text=Casa+Quintal',
        'https://placehold.co/400x300/FFFFFC/333333?text=Churrasqueira'
      ]
    }
  })

  const imovel3 = await prisma.imovel.create({
    data: {
      tipo: 'Sobrado',
      endereco: 'Rua das Palmeiras, 789',
      cidade: 'Campinas',
      estado: 'SP',
      preco: 680000,
      metragem: 180,
      descricao: 'Sobrado novo com 4 suítes e piscina',
      status: 'ATIVO',
      disponivel: true,
      proprietarioId: prop1.id,
      imagens: [
        'https://placehold.co/400x300/CAFFBF/333333?text=Sobrado+4+Suites'
      ]
    }
  })

  // IMÓVEIS VENDIDOS (exclusão lógica)
  const imovel4 = await prisma.imovel.create({
    data: {
      tipo: 'Apartamento',
      endereco: 'Rua Augusta, 456',
      cidade: 'São Paulo',
      estado: 'SP',
      preco: 520000,
      metragem: 95,
      descricao: 'Apartamento vendido recentemente',
      status: 'VENDIDO',
      disponivel: false,
      proprietarioId: prop2.id,
      imagens: ['https://placehold.co/400x300/FFD6A5/333333?text=VENDIDO']
    }
  })

  // IMÓVEIS ALUGADOS (exclusão lógica)
  const imovel5 = await prisma.imovel.create({
    data: {
      tipo: 'Casa',
      endereco: 'Rua do Comércio, 321',
      cidade: 'Salto',
      estado: 'SP',
      preco: 180000,
      metragem: 100,
      descricao: 'Casa alugada por contrato de 2 anos',
      status: 'ALUGADO',
      disponivel: false,
      proprietarioId: prop3.id,
      imagens: ['https://placehold.co/400x300/FDFFB6/333333?text=ALUGADO']
    }
  })

  // IMÓVEIS ARQUIVADOS (exclusão lógica)
  const imovel6 = await prisma.imovel.create({
    data: {
      tipo: 'Terreno',
      endereco: 'Estrada Rural, km 15',
      cidade: 'Itu',
      estado: 'SP',
      preco: 95000,
      metragem: 500,
      descricao: 'Terreno arquivado temporariamente',
      status: 'ARQUIVADO',
      disponivel: false,
      proprietarioId: prop3.id,
      imagens: ['https://placehold.co/400x300/9BF6FF/333333?text=ARQUIVADO']
    }
  })

  console.log('➡️  Imóveis criados (6 total):')
  console.log('   └─ 3 ATIVOS (visíveis)')
  console.log('   └─ 1 VENDIDO')
  console.log('   └─ 1 ALUGADO')
  console.log('   └─ 1 ARQUIVADO')

  // ========================================
  // LEADS
  // ========================================
  const lead1 = await prisma.lead.create({
    data: {
      nome: 'Maria Santos',
      email: 'maria@gmail.com',
      telefone: '11999999999',
      origem: 'site',
      status: 'quente'
    }
  })

  const lead2 = await prisma.lead.create({
    data: {
      nome: 'Pedro Costa',
      email: 'pedro@hotmail.com',
      telefone: '11988888888',
      origem: 'redes-sociais',
      status: 'morno'
    }
  })

  const lead3 = await prisma.lead.create({
    data: {
      nome: 'Ana Paula',
      email: 'ana.paula@outlook.com',
      telefone: '11977777777',
      origem: 'indicacao',
      status: 'quente'
    }
  })

  console.log('➡️  Leads criados (3)')

  // ========================================
  // CONSULTAS
  // ========================================
  await prisma.consulta.create({
    data: {
      leadId: lead1.id,
      imovelId: imovel1.id,
      tipo: 'visita',
      status: 'agendada',
      observacoes: 'Cliente quer visitar no sábado às 14h'
    }
  })

  await prisma.consulta.create({
    data: {
      leadId: lead2.id,
      imovelId: imovel2.id,
      tipo: 'proposta',
      status: 'negociando',
      valorProposta: 240000,
      observacoes: 'Cliente fez contraproposta de R$ 240.000'
    }
  })

  await prisma.consulta.create({
    data: {
      leadId: lead3.id,
      imovelId: imovel3.id,
      tipo: 'visita',
      status: 'concluida',
      resultado: 'interessado',
      observacoes: 'Cliente gostou muito, vai fazer proposta'
    }
  })

  console.log('➡️  Consultas criadas (3)')

  // ========================================
  // ANÁLISE DE MERCADO
  // ========================================
  await prisma.analiseMercado.create({
    data: {
      cidade: 'São Paulo',
      estado: 'SP',
      valorM2: 8500,
      valorMinimo: 7000,
      valorMaximo: 12000,
      fonte: 'sistema',
      tendencia: 'alta',
      observacoes: 'Mercado aquecido na região central'
    }
  })

  await prisma.analiseMercado.create({
    data: {
      cidade: 'Salto',
      estado: 'SP',
      valorM2: 3200,
      valorMinimo: 2500,
      valorMaximo: 4500,
      fonte: 'sistema',
      tendencia: 'estavel'
    }
  })

  console.log('➡️  Análises de mercado criadas (2)')

  // ========================================
  // RELATÓRIO
  // ========================================
  await prisma.relatorio.create({
    data: {
      titulo: 'Relatório Mensal de Leads',
      tipo: 'leads',
      conteudo: 'Total de 3 leads captados este mês. 2 classificados como "quente" e 1 como "morno".',
      periodo: 'mensal',
      geradoPor: 'sistema'
    }
  })

  await prisma.relatorio.create({
    data: {
      titulo: 'Relatório de Imóveis por Status',
      tipo: 'imoveis',
      conteudo: 'ATIVOS: 3 | VENDIDOS: 1 | ALUGADOS: 1 | ARQUIVADOS: 1',
      periodo: 'mensal',
      geradoPor: 'admin'
    }
  })

  console.log('➡️  Relatórios criados (2)')

  // ========================================
  // AUDITORIA
  // ========================================
  await prisma.auditoria.create({
    data: {
      acao: 'SEED_EXECUTADO',
      tabela: 'TODAS',
      usuario: 'sistema',
      dados: 'População inicial do banco de dados realizada com sucesso'
    }
  })

  console.log('➡️  Auditoria registrada')

  console.log('\n🎉 Seed finalizado com sucesso!')
  console.log('\n📊 Resumo:')
  console.log('   • 1 Usuário Admin')
  console.log('   • 3 Proprietários')
  console.log('   • 6 Imóveis (3 ativos, 3 inativos)')
  console.log('   • 3 Leads')
  console.log('   • 3 Consultas')
  console.log('   • 2 Análises de Mercado')
  console.log('   • 2 Relatórios')
}

main()
  .catch(e => {
    console.error('❌ Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })