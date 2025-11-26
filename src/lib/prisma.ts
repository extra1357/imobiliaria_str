import { PrismaClient } from '@prisma/client'

// Cria um objeto global para armazenar a instância do Prisma Client
// Isso previne que instâncias do Prisma sejam criadas múltiplas vezes no hot-reloading do Next.js
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Exporta a instância existente ou cria uma nova se não existir
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error', 'warn'], // Configuração de log para produção/staging
  })

// Em desenvolvimento, armazena a instância no objeto global para reuso
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}