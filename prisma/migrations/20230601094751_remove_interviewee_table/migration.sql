/*
  Warnings:

  - You are about to drop the column `intervieweeId` on the `InterviewRecap` table. All the data in the column will be lost.
  - You are about to drop the `Interviewee` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `intervieweeName` to the `InterviewRecap` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interviewRecapId` to the `IntervieweeCharacteristic` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "InterviewRecap" DROP CONSTRAINT "InterviewRecap_intervieweeId_fkey";

-- DropForeignKey
ALTER TABLE "Interviewee" DROP CONSTRAINT "Interviewee_intervieweeCharacteristicId_fkey";

-- AlterTable
ALTER TABLE "InterviewRecap" DROP COLUMN "intervieweeId",
ADD COLUMN     "intervieweeName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IntervieweeCharacteristic" ADD COLUMN     "interviewRecapId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Interviewee";

-- AddForeignKey
ALTER TABLE "IntervieweeCharacteristic" ADD CONSTRAINT "IntervieweeCharacteristic_interviewRecapId_fkey" FOREIGN KEY ("interviewRecapId") REFERENCES "InterviewRecap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
