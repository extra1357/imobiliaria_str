import { z } from 'zod'
import { PrismaClient } from '@prisma/client'

export class BaseService {
  protected db: PrismaClient

  constructor() {
    this.db = new PrismaClient()
  }

  protected validate<T>(data: T, schema: z.ZodSchema<T>): T {
    const parsed = schema.safeParse(data)
    if (!parsed.success) {
      throw new Error(parsed.error.errors.map(e => e.message).join(', '))
    }
    return parsed.data
  }
}
