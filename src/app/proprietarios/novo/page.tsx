'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
// Este componente não utiliza o router do Next.js para ser compatível com qualquer ambiente React.

// Usamos esta interface para garantir que os dados do formulário estejam tipados corretamente
interface FormData {
  nome: string
  email: string
  telefone: string
  cpf: string
}

export default function NovoProprietario() {
  // Estados de controle da UI
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [proprietarioId, setProprietarioId] = useState<string | null>(null)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  })

  // Manipulador de mudança de input
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    // Adicione aqui lógica de formatação/máscara se necessário (e.g., para telefone/CPF)
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Função para simular a chamada à sua API de backend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)
    setCopySuccess(false)

    try {
      // 1. Chamada à sua API de backend (onde a conexão com PostgreSQL acontece)
      const response = await fetch('/api/proprietarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      // 2. Tratamento de erro da API
      if (!response.ok) {
        // Assume que a API retorna um objeto { error: "mensagem" } em caso de falha
        throw new Error(data.error || 'Erro desconhecido ao cadastrar proprietário na API.')
      }

      // 3. Sucesso
      setSuccess(true)
      // Assume que a API retorna um objeto { data: { id: "novo_id" } }
      setProprietarioId(data.data?.id || 'ID-Não-Disponível')
      
      // Limpar formulário
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        cpf: ''
      })

    } catch (err) {
      // Captura erros de rede ou erros lançados acima
      setError(err instanceof Error ? err.message : 'Erro desconhecido ao comunicar com o servidor.')
      console.error('Erro no processo de cadastro:', err)
    } finally {
      setLoading(false)
    }
  }

  // Função para copiar o ID gerado (compatível com a maioria dos navegadores)
  const copyToClipboard = async () => {
    if (proprietarioId) {
      try {
        await navigator.clipboard.writeText(proprietarioId)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 3000)
      } catch (err) {
        console.error('Falha ao copiar:', err);
        // Fallback simples caso a permissão seja negada (raro em apps modernos)
      }
    }
  }

  // Funções de navegação simuladas (substituem o router.push/back)
  const handleGoBack = () => {
    // Numa app Next.js, esta função chamaria router.back()
    console.log('Ação de Navegação: Voltar à página anterior.');
    // Limpamos o estado para fins de demonstração
    setSuccess(false);
    setProprietarioId(null);
  }
  
  const handleNavigateToImovel = () => {
    // Numa app Next.js, esta função chamaria router.push('/imoveis/novo?proprietarioId=...')
    console.log(`Ação de Navegação: Ir para a página de Cadastro de Imóvel com ID: ${proprietarioId}.`);
    setSuccess(false);
    setProprietarioId(null);
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8"> {/* Sombra e arredondamento aprimorados */}
          <h1 className="text-3xl font-extrabold text-blue-800 mb-8 border-b-4 border-blue-100 pb-3">
            Cadastrar Novo Proprietário
          </h1>

          {/* Área de Notificação de ERRO */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-300 rounded-lg shadow-sm">
              <p className="text-red-700 text-sm font-semibold">❌ Erro no Cadastro:</p>
              <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
          )}

          {/* Área de Sucesso e ID Gerado */}
          {success && proprietarioId && (
            <div className="mb-6 p-5 bg-green-50 border border-green-400 rounded-xl shadow-lg">
              <p className="text-green-800 font-bold text-lg mb-2 flex items-center gap-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Proprietário cadastrado com sucesso!
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 bg-white p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-700 font-semibold min-w-[120px]">ID do Proprietário:</p>
                <code className="flex-1 px-3 py-2 bg-gray-100 rounded text-sm font-mono break-all text-blue-700">
                  {proprietarioId}
                </code>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors relative shadow-md active:shadow-none"
                >
                  Copiar ID
                  {/* Notificação de sucesso de cópia */}
                  {copySuccess && (
                    <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-xl whitespace-nowrap animate-fadeInOut">
                      Copiado!
                    </span>
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-3 text-center sm:text-left">
                Use este ID para associar imóveis a este proprietário.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos do Formulário */}
            {['nome', 'email', 'telefone', 'cpf'].map((fieldKey: any) => {
              const labelMap = {
                nome: 'Nome Completo',
                email: 'Email',
                telefone: 'Telefone',
                cpf: 'CPF'
              };
              const placeholderMap = {
                nome: 'João da Silva',
                email: 'joao@email.com',
                telefone: '(11) 99999-9999',
                cpf: '123.456.789-00'
              };
              const inputType = fieldKey === 'email' ? 'email' : (fieldKey === 'telefone' ? 'tel' : 'text');
              const required = fieldKey !== 'cpf';

              return (
                <div key={fieldKey}>
                  <label htmlFor={fieldKey} className="block text-sm font-semibold text-gray-700 mb-2">
                    {labelMap[fieldKey as keyof typeof labelMap]} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={inputType}
                    id={fieldKey}
                    name={fieldKey}
                    value={formData[fieldKey as keyof FormData]}
                    onChange={handleChange}
                    required={required}
                    placeholder={placeholderMap[fieldKey as keyof typeof placeholderMap]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-gray-800"
                  />
                </div>
              );
            })}

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    A processar...
                  </span>
                ) : (
                  'Cadastrar Proprietário'
                )}
              </button>
              
              <button
                type="button"
                onClick={handleGoBack}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition-colors shadow-md active:shadow-sm"
              >
                Voltar
              </button>
            </div>
          </form>

          {/* Chamada para Ação Pós-Sucesso */}
          {success && (
            <div className="mt-8 p-5 bg-indigo-50 border border-indigo-200 rounded-xl text-center shadow-inner">
              <p className="text-base text-indigo-800 font-semibold mb-3">
                Proprietário criado. Continuar o fluxo de trabalho:
              </p>
              <button
                onClick={handleNavigateToImovel}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
              >
                Cadastrar Imóvel (Usando ID Gerado)
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Estilo para animação de cópia */}
      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }
        .animate-fadeInOut {
          animation: fadeInOut 3s ease-in-out;
        }
      `}</style>
    </div>
  )
}