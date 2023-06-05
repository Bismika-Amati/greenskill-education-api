/*
  Warnings:

  - You are about to drop the column `article` on the `SubModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubModule" DROP COLUMN "article",
ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "ArticleSubModule" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "picture" TEXT,
    "video" TEXT,
    "subModuleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ArticleSubModule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArticleSubModule" ADD CONSTRAINT "ArticleSubModule_subModuleId_fkey" FOREIGN KEY ("subModuleId") REFERENCES "SubModule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
