/*
  Warnings:

  - Added the required column `updatedAt` to the `Consulta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consulta" ADD COLUMN     "comissao" DOUBLE PRECISION,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dataFechamento" TIMESTAMP(3),
ADD COLUMN     "motivoCancelamento" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valorProposta" DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'agendada';
