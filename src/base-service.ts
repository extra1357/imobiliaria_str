import { PrismaClient } from '@prisma/client'

export class BaseService {
  protected db: PrismaClient

  constructor() {
    this.db = new PrismaClient()
  }
}