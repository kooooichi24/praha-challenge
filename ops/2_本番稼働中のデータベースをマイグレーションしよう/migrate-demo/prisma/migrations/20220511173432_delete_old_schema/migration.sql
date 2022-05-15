/*
  Warnings:

  - You are about to drop the `Pairs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_pairId_fkey";

-- DropTable
DROP TABLE "Pairs";

-- DropTable
DROP TABLE "Users";
