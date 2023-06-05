/*
  Warnings:

  - You are about to drop the column `photo` on the `SubModule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubModule" DROP COLUMN "photo",
ADD COLUMN     "picture" TEXT;
