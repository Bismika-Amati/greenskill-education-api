/*
  Warnings:

  - You are about to drop the column `evidencetext` on the `InterviewRecap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "InterviewRecap" DROP COLUMN "evidencetext",
ADD COLUMN     "evidenceText" TEXT;
