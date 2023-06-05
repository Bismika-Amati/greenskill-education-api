/*
  Warnings:

  - You are about to drop the `CustomerSegment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EarlyAdopter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InterviewRecap` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IntervieweeCharacteristic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CustomerSegment" DROP CONSTRAINT "CustomerSegment_problemStatementId_fkey";

-- DropForeignKey
ALTER TABLE "EarlyAdopter" DROP CONSTRAINT "EarlyAdopter_problemStatementId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewRecap" DROP CONSTRAINT "InterviewRecap_problemStatementId_fkey";

-- DropForeignKey
ALTER TABLE "IntervieweeCharacteristic" DROP CONSTRAINT "IntervieweeCharacteristic_interviewRecapId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_interviewRecapId_fkey";

-- DropTable
DROP TABLE "CustomerSegment";

-- DropTable
DROP TABLE "EarlyAdopter";

-- DropTable
DROP TABLE "InterviewRecap";

-- DropTable
DROP TABLE "IntervieweeCharacteristic";

-- DropTable
DROP TABLE "Problem";
