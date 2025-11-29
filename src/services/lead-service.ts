import { BaseService } from './base-service'
import { z } from 'zod'

const leadSchema = z.object({
  nome: z.string().min(2),
  email: z.string().email(),
  telefone: z.string(),
  origem: z.string(),
})

type LeadData = z.infer<typeof leadSchema>

export class LeadService extends BaseService {
  async create(data: LeadData) {
    const valid = this.validate(data, leadSchema) as LeadData
    const status = this.classifyLead(valid)
    return await this.db.lead.create({ 
      data: { 
        ...valid, 
        status 
      } 
    })
  }

  async list() {
    return await this.db.lead.findMany({ orderBy: { dataCaptcha: 'desc' } })
  }

  private classifyLead(data: LeadData): string {
    if (data.email.includes('@gmail')) return 'morno'
    if (data.origem === 'site') return 'quente'
    return 'frio'
  }
}

export default new LeadService()