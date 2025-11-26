🚀 Visão Geral

Este projeto foi criado para digitalizar processos imobiliários, trazendo automação, inteligência de mercado e experiência profissional.

A plataforma conta com:

Cadastro e gerenciamento completo de imóveis

Busca inteligente usando IA

Geração automática de descrições imobiliárias

Coleta de leads por automação

Pipeline de vendas (funil) integrado

Dashboard de métricas e insights

Análise de preços e tendências do mercado imobiliário

Auditoria de ações do usuário

API robusta em camadas (Services, Controllers, Routes)

🛠️ Tecnologias Utilizadas

Next.js 14 (App Router)

React Server Components

TypeScript

TailwindCSS

Prisma ORM + PostgreSQL

OpenAI / Gemini / LLaMA

JWT Authentication

Zod Validation

Axios

ShadCN/UI Components

Vercel (Deploy)

📂 Arquitetura do Projeto

Estrutura limpa e escalável:

/src
  /app
    /api
      /auth
      /imoveis
      /leads
    /dashboard
  /components
  /services
  /lib
  /hooks
  /utils
  /styles
/prisma
/public

⚙️ Como rodar o projeto
1️⃣ Instalar dependências
npm install

2️⃣ Criar o arquivo .env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="..."
JWT_SECRET="sua_chave_de_assinatura"

3️⃣ Rodar migrations
npx prisma migrate dev

4️⃣ Iniciar o servidor
npm run dev

🤖 Funcionalidades de IA

A plataforma inclui automações inteligentes:

✍️ Geração automática de descrição de imóvel

🔎 Classificação inteligente de imóveis

🧠 Sugestão de preço ideal

📊 Comparação com imóveis similares

🤝 Identificação automática de perfil de cliente

📩 Resposta automática a leads

🧹 Limpeza e organização automática de dados

🔐 Autenticação

Autenticação JWT com:

Registro

Login

Middlewares de segurança

Refresh automático (opcional)

☁️ Deploy recomendado

Aplicação: Vercel

Banco: Supabase / NeonDB

Armazenamento de imagens: AWS S3 / Vercel Storage

🧾 Licença

Este projeto está licenciado sob a MIT License, permitindo uso comercial e profissional sem restrições.

👨‍💻 Autor

Edson Santos
Desenvolvedor | Arquitetura de Sistemas | IA aplicada
Brasil — SP

