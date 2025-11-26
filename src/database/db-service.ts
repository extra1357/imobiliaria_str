import prisma from './prisma-client'

export class DatabaseService {
  async checkConnection() {
    try {
      await prisma.$connect()
      return true
    } catch {
      return false
    }
  }

  async disconnect() {
    await prisma.$disconnect()
  }
}

export default new DatabaseService()