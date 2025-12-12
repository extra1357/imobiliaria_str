/*
  Warnings:

  - You are about to drop the `AnaliseMercado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Auditoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Consulta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Imovel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Proprietario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relatorio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_imovelId_fkey";

-- DropForeignKey
ALTER TABLE "Consulta" DROP CONSTRAINT "Consulta_leadId_fkey";

-- DropForeignKey
ALTER TABLE "Imovel" DROP CONSTRAINT "Imovel_proprietarioId_fkey";

-- DropForeignKey
ALTER TABLE "Relatorio" DROP CONSTRAINT "Relatorio_analiseId_fkey";

-- DropTable
DROP TABLE "AnaliseMercado";

-- DropTable
DROP TABLE "Auditoria";

-- DropTable
DROP TABLE "Consulta";

-- DropTable
DROP TABLE "Imovel";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "Proprietario";

-- DropTable
DROP TABLE "Relatorio";

-- DropTable
DROP TABLE "Usuario";

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'frio',
    "dataCaptcha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imoveis" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "preco" DECIMAL(12,2) NOT NULL,
    "metragem" DECIMAL(10,2) NOT NULL,
    "descricao" TEXT,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "proprietarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagens" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "imoveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proprietarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "proprietarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resultado" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'visita',
    "status" TEXT NOT NULL DEFAULT 'agendada',
    "observacoes" TEXT,
    "comissao" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFechamento" TIMESTAMP(3),
    "motivoCancelamento" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "valorProposta" DECIMAL(12,2),

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analises_mercado" (
    "id" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'SP',
    "valorM2" DECIMAL(10,2) NOT NULL,
    "valorMinimo" DECIMAL(12,2),
    "valorMaximo" DECIMAL(12,2),
    "dataAnalise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fonte" TEXT NOT NULL,
    "tendencia" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "analises_mercado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relatorios" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataGeracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodo" TEXT,
    "geradoPor" TEXT,
    "analiseId" TEXT,

    CONSTRAINT "relatorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditorias" (
    "id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "tabela" TEXT NOT NULL,
    "registroId" TEXT,
    "usuario" TEXT NOT NULL DEFAULT 'sistema',
    "dados" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'usuario',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_email_key" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_email_idx" ON "leads"("email");

-- CreateIndex
CREATE INDEX "leads_status_idx" ON "leads"("status");

-- CreateIndex
CREATE INDEX "leads_origem_idx" ON "leads"("origem");

-- CreateIndex
CREATE INDEX "imoveis_cidade_idx" ON "imoveis"("cidade");

-- CreateIndex
CREATE INDEX "imoveis_estado_idx" ON "imoveis"("estado");

-- CreateIndex
CREATE INDEX "imoveis_disponivel_idx" ON "imoveis"("disponivel");

-- CreateIndex
CREATE INDEX "imoveis_tipo_idx" ON "imoveis"("tipo");

-- CreateIndex
CREATE INDEX "imoveis_status_idx" ON "imoveis"("status");

-- CreateIndex
CREATE INDEX "imoveis_proprietarioId_idx" ON "imoveis"("proprietarioId");

-- CreateIndex
CREATE UNIQUE INDEX "proprietarios_email_key" ON "proprietarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "proprietarios_cpf_key" ON "proprietarios"("cpf");

-- CreateIndex
CREATE INDEX "proprietarios_email_idx" ON "proprietarios"("email");

-- CreateIndex
CREATE INDEX "proprietarios_cpf_idx" ON "proprietarios"("cpf");

-- CreateIndex
CREATE INDEX "consultas_data_idx" ON "consultas"("data");

-- CreateIndex
CREATE INDEX "consultas_status_idx" ON "consultas"("status");

-- CreateIndex
CREATE INDEX "consultas_leadId_idx" ON "consultas"("leadId");

-- CreateIndex
CREATE INDEX "consultas_imovelId_idx" ON "consultas"("imovelId");

-- CreateIndex
CREATE INDEX "analises_mercado_cidade_idx" ON "analises_mercado"("cidade");

-- CreateIndex
CREATE INDEX "analises_mercado_estado_idx" ON "analises_mercado"("estado");

-- CreateIndex
CREATE INDEX "analises_mercado_dataAnalise_idx" ON "analises_mercado"("dataAnalise");

-- CreateIndex
CREATE INDEX "relatorios_tipo_idx" ON "relatorios"("tipo");

-- CreateIndex
CREATE INDEX "relatorios_dataGeracao_idx" ON "relatorios"("dataGeracao");

-- CreateIndex
CREATE INDEX "relatorios_analiseId_idx" ON "relatorios"("analiseId");

-- CreateIndex
CREATE INDEX "auditorias_acao_idx" ON "auditorias"("acao");

-- CreateIndex
CREATE INDEX "auditorias_tabela_idx" ON "auditorias"("tabela");

-- CreateIndex
CREATE INDEX "auditorias_usuario_idx" ON "auditorias"("usuario");

-- CreateIndex
CREATE INDEX "auditorias_createdAt_idx" ON "auditorias"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_email_idx" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "usuarios_role_idx" ON "usuarios"("role");

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "imoveis_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "proprietarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "imoveis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consultas" ADD CONSTRAINT "consultas_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relatorios" ADD CONSTRAINT "relatorios_analiseId_fkey" FOREIGN KEY ("analiseId") REFERENCES "analises_mercado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
