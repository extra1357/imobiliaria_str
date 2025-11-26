'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/ui/Container'

export default function NovoImovel() {
  const router = useRouter()
  const [proprietarios, setProprietarios] = useState([])
  const [imagens, setImagens] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    tipo: 'Apartamento',
    endereco: '',
    cidade: '',
    estado: 'SP',
    preco: '',
    metragem: '',
    descricao: '',
    proprietarioId: ''
  })

  useEffect(() => {
    fetch('/api/proprietarios')
      .then(r => r.json())
      .then(d => setProprietarios(d.data || []))
  }, [])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        alert('Imagem muito grande! Máximo 5MB por imagem.')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagens(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removerImagem = (index: number) => {
    setImagens(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.proprietarioId) {
      alert('Selecione um proprietário!')
      return
    }

    if (imagens.length === 0) {
      alert('Adicione pelo menos uma imagem!')
      return
    }

    setLoading(true)

    try {
      const dados = {
        tipo: form.tipo,
        endereco: form.endereco,
        cidade: form.cidade,
        estado: form.estado,
        preco: parseFloat(form.preco),
        metragem: parseFloat(form.metragem),
        descricao: form.descricao || null,
        proprietarioId: form.proprietarioId,
        imagens: imagens
      }

      const res = await fetch('/api/imoveis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
      })

      if (res.ok) {
        alert('✅ Imóvel cadastrado com sucesso!')
        router.push('/imoveis')
      } else {
        const err = await res.json()
        alert('❌ Erro: ' + err.error)
      }
    } catch (error) {
      alert('❌ Erro ao cadastrar imóvel')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container
      title="🏠 Novo Imóvel"
      subtitle="Cadastre um imóvel com fotos"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Upload de Imagens */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition">
            <label className="block text-center cursor-pointer">
              <div className="text-6xl mb-3">📸</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                Adicionar Fotos do Imóvel
              </div>
              <p className="text-sm text-gray-500 mb-4">
                Clique para selecionar ou arraste imagens (máx. 5MB cada)
              </p>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Selecionar Imagens
              </div>
            </label>

            {/* Preview das Imagens */}
            {imagens.length > 0 && (
              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                {imagens.map((img, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={img} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow"
                    />
                    <button
                      type="button"
                      onClick={() => removerImagem(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tipo de Imóvel
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.tipo}
              onChange={e => setForm({...form, tipo: e.target.value})}
              required
            >
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Sobrado">Sobrado</option>
              <option value="Terreno">Terreno</option>
              <option value="Comercial">Comercial</option>
              <option value="Chácara">Chácara</option>
            </select>
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Endereço Completo
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.endereco}
              onChange={e => setForm({...form, endereco: e.target.value})}
              placeholder="Rua, Número, Complemento"
              required
            />
          </div>

          {/* Cidade e Estado */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cidade
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.cidade}
                onChange={e => setForm({...form, cidade: e.target.value})}
                placeholder="Ex: São Paulo"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Estado
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.estado}
                onChange={e => setForm({...form, estado: e.target.value})}
                required
              >
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="MG">Minas Gerais</option>
                <option value="RS">Rio Grande do Sul</option>
                <option value="PR">Paraná</option>
                <option value="SC">Santa Catarina</option>
              </select>
            </div>
          </div>

          {/* Preço e Metragem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.preco}
                onChange={e => setForm({...form, preco: e.target.value})}
                placeholder="450000"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Metragem (m²)
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.metragem}
                onChange={e => setForm({...form, metragem: e.target.value})}
                placeholder="80"
                required
              />
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              rows={4}
              value={form.descricao}
              onChange={e => setForm({...form, descricao: e.target.value})}
              placeholder="Descreva as características do imóvel..."
            />
          </div>

          {/* Proprietário */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Proprietário
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={form.proprietarioId}
              onChange={e => setForm({...form, proprietarioId: e.target.value})}
              required
            >
              <option value="">Selecione um proprietário...</option>
              {proprietarios.map((p: any) => (
                <option key={p.id} value={p.id}>
                  {p.nome} - {p.email}
                </option>
              ))}
            </select>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? '⏳ Cadastrando...' : '✅ Cadastrar Imóvel'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/imoveis')}
              className="px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Container>
  )
}