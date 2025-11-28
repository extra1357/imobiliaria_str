'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'

interface Proprietario {
  id: string
  nome: string
  email: string
  telefone: string
  cpf: string | null
}

interface FormData {
  tipo: string
  endereco: string
  cidade: string
  estado: string
  preco: string
  metragem: string
  descricao: string
  proprietarioId: string
  status: string
  disponivel: boolean
}

export default function NovoImovel() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [imagensPreviews, setImagensPreviews] = useState<string[]>([])
  const [imagensBase64, setImagensBase64] = useState<string[]>([])
  const [proprietarios, setProprietarios] = useState<Proprietario[]>([])
  const [loadingProprietarios, setLoadingProprietarios] = useState<boolean>(true)
  
  const [formData, setFormData] = useState<FormData>({
    tipo: 'CASA',
    endereco: '',
    cidade: '',
    estado: 'SP',
    preco: '',
    metragem: '',
    descricao: '',
    proprietarioId: '',
    status: 'ATIVO',
    disponivel: true
  })

  // Buscar proprietários ao carregar a página
  useEffect(() => {
    fetchProprietarios()
  }, [])

  // ✅ FUNÇÃO CORRIGIDA
  const fetchProprietarios = async () => {
    try {
      setLoadingProprietarios(true)
      const response = await fetch('/api/proprietarios')
      
      if (!response.ok) {
        throw new Error(`Erro ${response.status}`)
      }
      
      const data = await response.json()
      
      console.log('✅ Proprietários recebidos:', data)
      
      // ✅ CORREÇÃO: A API retorna array diretamente, não em data.data
      setProprietarios(Array.isArray(data) ? data : [])
      
    } catch (err) {
      console.error('❌ Erro ao buscar proprietários:', err)
      setError('Erro ao carregar proprietários')
    } finally {
      setLoadingProprietarios(false)
    }
  }

  // Handler para mudanças nos inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }))
  }

  // Handler para upload de imagens
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newPreviews: string[] = []
    const newBase64Images: string[] = []
    let processedFiles = 0

    Array.from(files).forEach((file: any) => {
      const reader = new FileReader()
      
      reader.onloadend = () => {
        const base64String = reader.result as string
        newPreviews.push(base64String)
        newBase64Images.push(base64String)
        
        processedFiles++
        
        // Quando todos os arquivos forem processados
        if (processedFiles === files.length) {
          setImagensPreviews(prev => [...prev, ...newPreviews])
          setImagensBase64(prev => [...prev, ...newBase64Images])
        }
      }
      
      reader.readAsDataURL(file)
    })
  }

  // Remover imagem
  const removeImage = (index: number) => {
    setImagensPreviews(prev => prev.filter((_, i) => i !== index))
    setImagensBase64(prev => prev.filter((_, i) => i !== index))
  }

  // Submit do formulário
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validações
      if (!formData.proprietarioId) {
        throw new Error('Selecione um proprietário')
      }

      if (imagensBase64.length === 0) {
        throw new Error('Adicione pelo menos uma imagem')
      }

      // Preparar dados para envio
      const payload = {
        ...formData,
        preco: parseFloat(formData.preco),
        metragem: parseFloat(formData.metragem),
        imagens: imagensBase64
      }

      console.log('📤 Enviando payload:', payload)

      const response = await fetch('/api/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao cadastrar imóvel')
      }

      const data = await response.json()
      console.log('✅ Imóvel cadastrado:', data)

      // Sucesso - redirecionar
      alert('✅ Imóvel cadastrado com sucesso!')
      router.push('/imoveis')
      router.refresh()

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      console.error('❌ Erro ao cadastrar imóvel:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Cadastrar Novo Imóvel
            </h1>
            <button
              onClick={() => router.push('/proprietarios/novo')}
              className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              + Novo Proprietário
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-semibold">❌ {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seletor de Proprietário */}
            <div>
              <label htmlFor="proprietarioId" className="block text-sm font-medium text-gray-700 mb-2">
                Proprietário *
              </label>
              
              {loadingProprietarios ? (
                <div className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
                  <p className="text-gray-500 text-sm">⏳ Carregando proprietários...</p>
                </div>
              ) : proprietarios.length === 0 ? (
                <div className="w-full px-4 py-3 border border-yellow-300 rounded-lg bg-yellow-50">
                  <p className="text-yellow-800 text-sm mb-2">
                    ⚠️ Nenhum proprietário cadastrado
                  </p>
                  <button
                    type="button"
                    onClick={() => router.push('/proprietarios/novo')}
                    className="text-sm text-blue-600 hover:underline font-semibold"
                  >
                    → Cadastrar primeiro proprietário
                  </button>
                </div>
              ) : (
                <select
                  id="proprietarioId"
                  name="proprietarioId"
                  value={formData.proprietarioId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Selecione um proprietário</option>
                  {proprietarios.map((prop: any) => (
                    <option key={prop.id} value={prop.id}>
                      {prop.nome} - {prop.email} - {prop.telefone}
                    </option>
                  ))}
                </select>
              )}
              
              {formData.proprietarioId && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>✅ Proprietário selecionado:</strong>{' '}
                    {proprietarios.find(p => p.id === formData.proprietarioId)?.nome}
                  </p>
                </div>
              )}
            </div>

            {/* Tipo e Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Imóvel *
                </label>
                <select
                  id="tipo"
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="CASA">🏠 Casa</option>
                  <option value="APARTAMENTO">🏢 Apartamento</option>
                  <option value="TERRENO">🌳 Terreno</option>
                  <option value="COMERCIAL">🏪 Comercial</option>
                  <option value="RURAL">🌾 Rural</option>
                </select>
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="ATIVO">✅ Ativo</option>
                  <option value="VENDIDO">💰 Vendido</option>
                  <option value="ALUGADO">🔑 Alugado</option>
                  <option value="ARQUIVADO">📦 Arquivado</option>
                </select>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-2">
                Endereço Completo *
              </label>
              <input
                type="text"
                id="endereco"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                required
                placeholder="Rua das Flores, 123, Apto 45"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  placeholder="São Paulo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                  Estado *
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
              </div>
            </div>

            {/* Preço e Metragem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-2">
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="350000.00"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="metragem" className="block text-sm font-medium text-gray-700 mb-2">
                  Metragem (m²) *
                </label>
                <input
                  type="number"
                  id="metragem"
                  name="metragem"
                  value={formData.metragem}
                  onChange={handleChange}
                  required
                  min="0"
                  step="0.01"
                  placeholder="75.50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows={4}
                placeholder="Descreva as características do imóvel: quartos, banheiros, garagem, acabamento..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Disponibilidade */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                id="disponivel"
                name="disponivel"
                checked={formData.disponivel}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="disponivel" className="ml-3 block text-sm text-gray-700">
                <strong>Imóvel disponível</strong> para venda/locação
              </label>
            </div>

            {/* Upload de Imagens */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagens do Imóvel * (mínimo 1)
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="mt-1 text-sm text-gray-500">
                📸 Adicione fotos do imóvel (JPG, PNG, até 5MB cada)
              </p>
            </div>

            {/* Preview das Imagens */}
            {imagensPreviews.length > 0 && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  📷 Preview das Imagens ({imagensPreviews.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagensPreviews.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                        title="Remover imagem"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botões */}
            <div className="flex gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading || proprietarios.length === 0}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                {loading ? '⏳ Cadastrando...' : '✅ Cadastrar Imóvel'}
              </button>
              
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}