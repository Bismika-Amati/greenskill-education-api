/*
  Warnings:

  - Added the required column `updatedAt` to the `Interviewee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `IntervieweeCharacteristic` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interviewee" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "IntervieweeCharacteristic" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
