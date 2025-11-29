import { BaseService } from './base-service'

export class BuscaService extends BaseService {
  async buscaInteligente(texto: string) {
    const criterios = this.extrairCriterios(texto)
    
    return await this.db.imovel.findMany({
      where: {
        tipo: { contains: criterios.tipo, mode: 'insensitive' },
        cidade: { contains: criterios.cidade, mode: 'insensitive' },
        preco: { lte: criterios.precoMax || 999999999 },
        disponivel: true
      },
      include: { proprietario: true },
      take: 20
    })
  }

  private extrairCriterios(texto: string) {
    const lower = texto.toLowerCase()
    return {
      tipo: lower.includes('apartamento') ? 'apartamento' : 
            lower.includes('casa') ? 'casa' : '',
      cidade: this.extrairCidade(lower),
      precoMax: this.extrairPreco(lower)
    }
  }

  private extrairCidade(txt: string): string {
    const cidades = ['são paulo', 'osasco', 'guarulhos', 'campinas']
    return cidades.find(c => txt.includes(c)) || ''
  }

  private extrairPreco(txt: string): number | null {
    const match = txt.match(/(\d+)\s*(mil|k)/i)
    return match ? parseInt(match[1]) * 1000 : null
  }
}

export default new BuscaService()