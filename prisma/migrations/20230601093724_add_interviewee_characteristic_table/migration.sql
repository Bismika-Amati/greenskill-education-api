/*
  Warnings:

  - You are about to drop the column `characteristic` on the `InterviewRecap` table. All the data in the column will be lost.
  - You are about to drop the column `characteristic` on the `Interviewee` table. All the data in the column will be lost.
  - Added the required column `intervieweeCharacteristicId` to the `Interviewee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InterviewRecap" DROP COLUMN "characteristic";

-- AlterTable
ALTER TABLE "Interviewee" DROP COLUMN "characteristic",
ADD COLUMN     "intervieweeCharacteristicId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Interviewee" ADD CONSTRAINT "Interviewee_intervieweeCharacteristicId_fkey" FOREIGN KEY ("intervieweeCharacteristicId") REFERENCES "IntervieweeCharacteristic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
