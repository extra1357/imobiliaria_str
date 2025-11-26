import { BaseService } from './base-service'
import { z } from 'zod'

const imovelSchema = z.object({
  tipo: z.string(),
  endereco: z.string(),
  cidade: z.string(),
  estado: z.string(),
  preco: z.number(),
  metragem: z.number(),
  proprietarioId: z.string(),
})

export class ImovelService extends BaseService {
  async create(data: z.infer<typeof imovelSchema>) {
    return await this.db.imovel.create({ data })
  }

  async list(filtros?: { cidade?: string; disponivel?: boolean }) {
    return await this.db.imovel.findMany({ 
      where: filtros,
      include: { proprietario: true }
    })
  }

  async update(id: string, data: Partial<z.infer<typeof imovelSchema>>) {
    return await this.db.imovel.update({ where: { id }, data })
  }

  async delete(id: string) {
    return await this.db.imovel.delete({ where: { id } })
  }
}

export default new ImovelService()