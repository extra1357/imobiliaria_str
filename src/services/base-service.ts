import { PrismaClient } from '@prisma/client'
import prisma from '@/database/prisma-client'

export class BaseService {
  protected db: PrismaClient

  constructor() {
    this.db = prisma
  }

  protected handleError(error: unknown, context: string): never {
    console.error(`[${context}] Error:`, error)
    if (error instanceof Error) {
      throw new Error(`${context}: ${error.message}`)
    }
    throw new Error(`${context}: Erro desconhecido`)
  }

  protected validate<T>(data: unknown, schema: any): T {
    const result = schema.safeParse(data)
    if (!result.success) {
      throw new Error(`Validação falhou: ${result.error.message}`)
    }
    return result.data
  }
}