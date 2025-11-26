# 🏢 Imobiliária STR - Sistema com Inteligência Artificial

Sistema imobiliário completo com IA para captação de leads, análise de mercado e busca inteligente de imóveis.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Testes](#testes)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Roadmap](#roadmap)

## 🎯 Sobre o Projeto

A Imobiliária STR é uma plataforma moderna que utiliza Inteligência Artificial para:

- 📊 **Análise de Mercado**: Avaliação automática de valores e tendências
- 🎯 **Captação de Leads**: Sistema inteligente de qualificação
- 🔍 **Busca Avançada**: Encontre o imóvel perfeito com IA
- 📈 **Relatórios Automatizados**: Insights e recomendações em tempo real
- 🔒 **Segurança e Compliance**: Auditoria completa de operações

## 🚀 Tecnologias

### Core
- **Next.js 14** - Framework React com SSR
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização moderna
- **Prisma ORM** - Gestão de banco de dados
- **PostgreSQL** - Banco de dados relacional

### Testes e Qualidade
- **Jest** - Framework de testes
- **Testing Library** - Testes de componentes React

### Bibliotecas Adicionais
- **Zod** - Validação de schemas
- **Recharts** - Visualização de dados
- **date-fns** - Manipulação de datas

## 🏗️ Arquitetura

O projeto segue os princípios **SOLID** e **Clean Architecture**:

```
┌─────────────────────────────────────┐
│         Presentation Layer          │
│  (Pages, Components, UI)            │
├─────────────────────────────────────┤
│         Application Layer           │
│  (Use Cases, Services)              │
├─────────────────────────────────────┤
│         Domain Layer                │
│  (Entities, Business Rules)         │
├─────────────────────────────────────┤
│         Infrastructure Layer        │
│  (Database, External APIs)          │
└─────────────────────────────────────┘
```

### Princípios SOLID

- **S**ingle Responsibility - Cada módulo tem uma única responsabilidade
- **O**pen/Closed - Aberto para extensão, fechado para modificação
- **L**iskov Substitution - Subclasses substituem classes base
- **I**nterface Segregation - Interfaces específicas e coesas
- **D**ependency Inversion - Depender de abstrações

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/sua-empresa/imobiliaria-str.git
cd imobiliaria-str
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/imobiliaria_str"
JWT_SECRET="seu-secret-super-seguro"
```

4. **Configure o banco de dados**
```bash
npm run prisma:migrate
npm run prisma:generate
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuração

### Banco de Dados

O projeto usa PostgreSQL. Certifique-se de ter uma instância rodando:

```bash
# Docker (opcional)
docker run --name postgres-str \
  -e POSTGRES_PASSWORD=senha \
  -e POSTGRES_DB=imobiliaria_str \
  -p 5432:5432 \
  -d postgres:14
```

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | URL de conexão PostgreSQL | `postgresql://user:pass@localhost:5432/db` |
| `JWT_SECRET` | Secret para tokens JWT | `seu-secret-seguro` |
| `NODE_ENV` | Ambiente de execução | `development` / `production` |

## 🎮 Uso

### Desenvolvimento

```bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Inicia servidor de produção
npm run lint         # Executa linter
```

### Banco de Dados

```bash
npm run prisma:generate  # Gera Prisma Client
npm run prisma:migrate   # Executa migrações
npm run prisma:studio    # Abre Prisma Studio
```

### Testes

```bash
npm test              # Executa todos os testes
npm run test:watch    # Modo watch
npm run test:coverage # Cobertura de testes
```

## 🧪 Testes

O projeto possui cobertura mínima de **70%** para:
- Branches
- Functions
- Lines
- Statements

### Estrutura de Testes

```
src/
├── components/
│   └── __tests__/
├── services/
│   └── __tests__/
├── utils/
│   └── __tests__/
```

### Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura
npm run test:coverage

# Modo watch
npm run test:watch

# Teste específico
npm test validation.test.ts
```

## 📁 Estrutura do Projeto

```
imobiliaria-str/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── src/
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── api/              # Rotas da API
│   │   ├── layout.tsx        # Layout principal
│   │   ├── page.tsx          # Página inicial
│   │   └── globals.css       # Estilos globais
│   ├── components/           # Componentes React
│   ├── database/             # Configuração do banco
│   │   └── prisma-client.ts
│   ├── hooks/                # Custom Hooks
│   ├── services/             # Lógica de negócio
│   │   └── base-service.ts
│   ├── types/                # Definições TypeScript
│   │   └── index.ts
│   └── utils/                # Funções utilitárias
│       ├── validation.ts
│       ├── format.ts
│       └── api-response.ts
├── .env.example              # Exemplo de variáveis
├── .gitignore
├── jest.config.js            # Configuração Jest
├── next.config.js            # Configuração Next.js
├── package.json
├── postcss.config.js         # Configuração PostCSS
├── tailwind.config.ts        # Configuração Tailwind
├── tsconfig.json             # Configuração TypeScript
└── README.md
```

## 🗺️ Roadmap

### ✅ Fase 1 - Estrutura Base (PROMPT 1)
- [x] Configuração inicial do projeto
- [x] Setup Next.js + TypeScript
- [x] Configuração TailwindCSS
- [x] Setup Prisma ORM
- [x] Configuração de testes
- [x] Padrão SOLID e Clean Architecture

### 🔄 Fase 2 - Banco de Dados (PROMPT 2)
- [ ] Schema completo do Prisma
- [ ] Migrações iniciais
- [ ] Relacionamentos entre tabelas
- [ ] Testes de integridade

### 📋 Próximas Fases
- [ ] Módulo de Captação de Leads (PROMPT 3)
- [ ] IA de Análise de Mercado (PROMPT 4)
- [ ] Busca Inteligente de Imóveis (PROMPT 5)
- [ ] Dashboard Administrativo (PROMPT 6)
- [ ] Relatórios e Aconselhamento (PROMPT 7)
- [ ] Segurança e Auditoria (PROMPT 8)
- [ ] Testes Finais e Deploy (PROMPT 9)
- [ ] Documentação Técnica (PROMPT 10)

## 📝 Licença

Este projeto é proprietário e confidencial.

## 👥 Equipe

Desenvolvido por [Sua Empresa]

## 📞 Contato

Para mais informações: contato@imobiliariastr.com.br

---

**Versão:** 1.0.0 (PROMPT 1 - Estrutura Inicial Completa)  
**Última atualização:** Novembro 2025