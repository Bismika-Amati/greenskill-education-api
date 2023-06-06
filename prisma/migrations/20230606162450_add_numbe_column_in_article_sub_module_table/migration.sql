/*
  Warnings:

  - Added the required column `number` to the `ArticleSubModule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ArticleSubModule" ADD COLUMN     "number" INTEGER NOT NULL;
