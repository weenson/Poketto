-- CreateEnum
CREATE TYPE "SavingStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'ON_HOLD');

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "savingsId" TEXT;

-- CreateTable
CREATE TABLE "savings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "goalAmount" INTEGER NOT NULL,
    "status" "SavingStatus" NOT NULL DEFAULT 'ACTIVE',
    "endDate" TIMESTAMPTZ(3),
    "imageUrl" TEXT,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "savings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "savings_userId_idx" ON "savings"("userId");

-- CreateIndex
CREATE INDEX "transaction_savingsId_idx" ON "transaction"("savingsId");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_savingsId_fkey" FOREIGN KEY ("savingsId") REFERENCES "savings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savings" ADD CONSTRAINT "savings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
