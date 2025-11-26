'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCcw, X, CheckCircle, AlertTriangle } from 'lucide-react'; // Ícones lucide

// Mock do useRouter para ambientes de arquivo único (simula a navegação)
const useRouter = () => ({
  push: (path) => {
    // Em um ambiente real, isto faria o roteamento. Aqui, mostramos uma notificação.
    console.log(`Simulação de navegação para: ${path}`);
  }
});

// Mock do componente Container para torná-lo autossuficiente
const Container = ({ title, subtitle, children }) => (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-inter">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2 mt-4 flex items-center gap-3">
        {title}
      </h1>
      <p className="text-xl text-gray-500 mb-8">{subtitle}</p>
      {children}
    </div>
  </div>
);

// Componente de Notificação Customizado
const Notification = ({ message, type, onClose }) => {
  const baseClasses = "fixed bottom-4 right-4 p-4 rounded-xl shadow-2xl flex items-center space-x-3 transition-opacity duration-300 z-50 max-w-sm";
  let classes = "";
  let Icon = AlertTriangle;

  switch (type) {
    case 'success':
      classes = "bg-green-500 text-white";
      Icon = CheckCircle;
      break;
    case 'error':
      classes = "bg-red-600 text-white";
      Icon = X;
      break;
    case 'info':
    default:
      classes = "bg-blue-500 text-white";
      Icon = AlertTriangle;
      break;
  }

  return (
    <div className={`${baseClasses} ${classes}`}>
      <Icon className="w-6 h-6" />
      <span className="font-semibold flex-grow">{message}</span>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Componente principal do formulário (adaptado do NovoImovel)
const NovoImovelForm = () => {
  const router = useRouter();
  const [proprietarios, setProprietarios] = useState([]);
  const [imagens, setImagens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null); // Estado para notificação
  const [form, setForm] = useState({
    tipo: 'Apartamento',
    endereco: '',
    cidade: '',
    estado: 'SP',
    preco: '',
    metragem: '',
    descricao: '',
    proprietarioId: ''
  });

  const showNotification = (message, type = 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  useEffect(() => {
    const mockFetchProprietarios = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const mockData = [
          { id: '1', nome: 'João Silva', email: 'joao.silva@email.com' },
          { id: '2', nome: 'Maria Souza', email: 'maria.souza@email.com' },
        ];
        setProprietarios(mockData || []);
      } catch (e) {
        showNotification('Erro ao carregar proprietários (Dados mockados)', 'error');
        setProprietarios([]);
      }
    };
    mockFetchProprietarios();
  }, []);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        showNotification('Imagem muito grande! Máximo 5MB por imagem.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagens(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removerImagem = (index) => {
    setImagens(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.proprietarioId) {
      showNotification('Selecione um proprietário!', 'error');
      return;
    }

    if (imagens.length === 0) {
      showNotification('Adicione pelo menos uma imagem!', 'error');
      return;
    }

    setLoading(true);

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
      };

      await new Promise(resolve => setTimeout(resolve, 1500));
      const success = Math.random() > 0.1;

      if (success) {
        showNotification('✅ Imóvel cadastrado com sucesso!', 'success');
        router.push('/imoveis');
      } else {
        const mockError = { error: 'Falha na conexão com o servidor de imóveis simulado.' };
        showNotification('❌ Erro: ' + mockError.error, 'error');
      }
    } catch (error) {
      showNotification('❌ Erro ao cadastrar imóvel', 'error');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
  };
  
  const formatMetragem = (value) => {
    const num = parseFloat(value);
    if (isNaN(num)) return '';
    return `${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} m²`;
  };

  return (
    <>
      <Container
        title="🏠 Novo Imóvel"
        subtitle="Cadastre um imóvel com fotos e informações detalhadas"
      >
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">

          {/* Form Header / Stats */}
          <div className="mb-8 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">Detalhes do Cadastro</h2>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>Fotos anexadas: <span className="font-semibold text-blue-600">{imagens.length}</span></span>
                  <span>Proprietários carregados: <span className="font-semibold text-blue-600">{proprietarios.length}</span></span>
                  {form.preco && <span>Preço de preview: <span className="font-semibold text-green-600">{formatCurrency(form.preco)}</span></span>}
              </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Upload de Imagens */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-500 transition duration-300">
              <label className="block text-center cursor-pointer">
                <div className="text-6xl mb-3">📸</div>
                <div className="text-lg font-semibold text-gray-700 mb-2">
                  Adicionar Fotos do Imóvel
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Clique para selecionar (máx. 5MB cada). Total: {imagens.length}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-md">
                  Selecionar Imagens
                </div>
              </label>

              {imagens.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imagens.map((img, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                      <button
                        type="button"
                        onClick={() => removerImagem(index)}
                        title="Remover imagem"
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold opacity-0 group-hover:opacity-100 transition hover:bg-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="tipo" className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Imóvel
                  </label>
                  <select
                    id="tipo"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
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

                <div>
                  <label htmlFor="proprietario" className="block text-sm font-semibold text-gray-700 mb-2">
                    Proprietário
                  </label>
                  <div className="relative">
                    <select
                      id="proprietario"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                      value={form.proprietarioId}
                      onChange={e => setForm({...form, proprietarioId: e.target.value})}
                      required
                      disabled={proprietarios.length === 0}
                    >
                      <option value="">
                        {proprietarios.length === 0 ? 'Carregando proprietários...' : 'Selecione um proprietário...'}
                      </option>
                      {proprietarios.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nome} - {p.email}
                        </option>
                      ))}
                    </select>
                    {proprietarios.length === 0 && (
                      <RefreshCcw className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 animate-spin" />
                    )}
                  </div>
                </div>
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-semibold text-gray-700 mb-2">
                Endereço Completo
              </label>
              <input
                id="endereco"
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={form.endereco}
                onChange={e => setForm({...form, endereco: e.target.value})}
                placeholder="Rua, Número, Complemento"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="cidade" className="block text-sm font-semibold text-gray-700 mb-2">
                  Cidade
                </label>
                <input
                  id="cidade"
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.cidade}
                  onChange={e => setForm({...form, cidade: e.target.value})}
                  placeholder="Ex: São Paulo"
                  required
                />
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-semibold text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  id="estado"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  value={form.estado}
                  onChange={e => setForm({...form, estado: e.target.value})}
                  required
                >
                  <option value="SP">São Paulo (SP)</option>
                  <option value="RJ">Rio de Janeiro (RJ)</option>
                  <option value="MG">Minas Gerais (MG)</option>
                  <option value="RS">Rio Grande do Sul (RS)</option>
                  <option value="PR">Paraná (PR)</option>
                  <option value="SC">Santa Catarina (SC)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="preco" className="block text-sm font-semibold text-gray-700 mb-2">
                  Preço (R$)
                </label>
                <input
                  id="preco"
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.preco}
                  onChange={e => setForm({...form, preco: e.target.value})}
                  placeholder="450000.00"
                  required
                />
                {form.preco && <p className="mt-1 text-xs text-gray-500">Preview: {formatCurrency(form.preco)}</p>}
              </div>

              <div>
                <label htmlFor="metragem" className="block text-sm font-semibold text-gray-700 mb-2">
                  Metragem (m²)
                </label>
                <input
                  id="metragem"
                  type="number"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={form.metragem}
                  onChange={e => setForm({...form, metragem: e.target.value})}
                  placeholder="80.50"
                  required
                />
                {form.metragem && <p className="mt-1 text-xs text-gray-500">Preview: {formatMetragem(form.metragem)}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-semibold text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                id="descricao"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                rows={4}
                value={form.descricao}
                onChange={e => setForm({...form, descricao: e.target.value})}
                placeholder="Descreva as características do imóvel, número de quartos, comodidades, etc."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center bg-green-600 text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 shadow-lg transform hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="w-5 h-5 mr-2 animate-spin" />
                    Cadastrando...
                  </>
                ) : (
                  '✅ Cadastrar Imóvel'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/imoveis')}
                className="px-6 py-4 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Container>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

const App = () => <NovoImovelForm />;

export default App;
