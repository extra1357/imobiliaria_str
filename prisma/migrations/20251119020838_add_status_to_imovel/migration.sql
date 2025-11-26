-- AlterTable
ALTER TABLE "Imovel" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ATIVO';

-- CreateIndex
CREATE INDEX "Imovel_status_idx" ON "Imovel"("status");
