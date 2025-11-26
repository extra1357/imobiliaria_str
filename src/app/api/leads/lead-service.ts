import { BaseService } from './base-service'
import { z } from 'zod'

const leadSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string(),
  origem: z.string(),
})

export class LeadService extends BaseService {
  async create(data: z.infer<typeof leadSchema>) {
    const valid = this.validate(data, leadSchema)
    const status = this.classifyLead(valid)
    return await this.db.lead.create({ data: { ...valid, status } })
  }

  async list() {
    return await this.db.lead.findMany({ orderBy: { dataCaptcha: 'desc' } })
  }

  async updateStatus(id: string, status: string) {
    return await this.db.lead.update({ where: { id }, data: { status } })
  }

  private classifyLead(data: any): string {
    if (data.email.includes('@gmail')) return 'morno'
    if (data.origem === 'site') return 'quente'
    return 'frio'
  }
}

export default new LeadService()