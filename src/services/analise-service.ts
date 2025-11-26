import { BaseService } from './base-service'

export class AnaliseService extends BaseService {
  async analisarMercado(cidade: string) {
    const imoveis = await this.db.imovel.findMany({ where: { cidade } })
    const valorM2 = imoveis.reduce((acc, i) => acc + i.preco / i.metragem, 0) / imoveis.length
    
    return await this.db.analiseMercado.create({
      data: { cidade, valorM2, fonte: 'sistema' }
    })
  }

  async historico(cidade: string) {
    return await this.db.analiseMercado.findMany({
      where: { cidade },
      orderBy: { dataAnalise: 'desc' },
      take: 10
    })
  }
}

export default new AnaliseService()