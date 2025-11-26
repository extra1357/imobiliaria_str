-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'frio',
    "dataCaptcha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Imovel" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "metragem" DOUBLE PRECISION NOT NULL,
    "descricao" TEXT,
    "disponivel" BOOLEAN NOT NULL DEFAULT true,
    "proprietarioId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Proprietario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proprietario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consulta" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "imovelId" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resultado" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'visita',
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "observacoes" TEXT,

    CONSTRAINT "Consulta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnaliseMercado" (
    "id" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'SP',
    "valorM2" DOUBLE PRECISION NOT NULL,
    "valorMinimo" DOUBLE PRECISION,
    "valorMaximo" DOUBLE PRECISION,
    "dataAnalise" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fonte" TEXT NOT NULL,
    "tendencia" TEXT,
    "observacoes" TEXT,

    CONSTRAINT "AnaliseMercado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Relatorio" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "dataGeracao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "periodo" TEXT,
    "geradoPor" TEXT,
    "analiseId" TEXT,

    CONSTRAINT "Relatorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "tabela" TEXT NOT NULL,
    "registroId" TEXT,
    "usuario" TEXT NOT NULL DEFAULT 'sistema',
    "dados" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'usuario',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_email_idx" ON "Lead"("email");

-- CreateIndex
CREATE INDEX "Lead_status_idx" ON "Lead"("status");

-- CreateIndex
CREATE INDEX "Lead_origem_idx" ON "Lead"("origem");

-- CreateIndex
CREATE INDEX "Imovel_cidade_idx" ON "Imovel"("cidade");

-- CreateIndex
CREATE INDEX "Imovel_estado_idx" ON "Imovel"("estado");

-- CreateIndex
CREATE INDEX "Imovel_disponivel_idx" ON "Imovel"("disponivel");

-- CreateIndex
CREATE INDEX "Imovel_tipo_idx" ON "Imovel"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_email_key" ON "Proprietario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietario_cpf_key" ON "Proprietario"("cpf");

-- CreateIndex
CREATE INDEX "Proprietario_email_idx" ON "Proprietario"("email");

-- CreateIndex
CREATE INDEX "Consulta_data_idx" ON "Consulta"("data");

-- CreateIndex
CREATE INDEX "Consulta_status_idx" ON "Consulta"("status");

-- CreateIndex
CREATE INDEX "Consulta_leadId_idx" ON "Consulta"("leadId");

-- CreateIndex
CREATE INDEX "Consulta_imovelId_idx" ON "Consulta"("imovelId");

-- CreateIndex
CREATE INDEX "AnaliseMercado_cidade_idx" ON "AnaliseMercado"("cidade");

-- CreateIndex
CREATE INDEX "AnaliseMercado_estado_idx" ON "AnaliseMercado"("estado");

-- CreateIndex
CREATE INDEX "AnaliseMercado_dataAnalise_idx" ON "AnaliseMercado"("dataAnalise");

-- CreateIndex
CREATE INDEX "Relatorio_tipo_idx" ON "Relatorio"("tipo");

-- CreateIndex
CREATE INDEX "Relatorio_dataGeracao_idx" ON "Relatorio"("dataGeracao");

-- CreateIndex
CREATE INDEX "Auditoria_acao_idx" ON "Auditoria"("acao");

-- CreateIndex
CREATE INDEX "Auditoria_tabela_idx" ON "Auditoria"("tabela");

-- CreateIndex
CREATE INDEX "Auditoria_usuario_idx" ON "Auditoria"("usuario");

-- CreateIndex
CREATE INDEX "Auditoria_createdAt_idx" ON "Auditoria"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_email_idx" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_role_idx" ON "Usuario"("role");

-- AddForeignKey
ALTER TABLE "Imovel" ADD CONSTRAINT "Imovel_proprietarioId_fkey" FOREIGN KEY ("proprietarioId") REFERENCES "Proprietario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consulta" ADD CONSTRAINT "Consulta_imovelId_fkey" FOREIGN KEY ("imovelId") REFERENCES "Imovel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relatorio" ADD CONSTRAINT "Relatorio_analiseId_fkey" FOREIGN KEY ("analiseId") REFERENCES "AnaliseMercado"("id") ON DELETE SET NULL ON UPDATE CASCADE;
