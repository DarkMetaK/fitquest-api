/*
  Warnings:

  - Added the required column `description` to the `raffles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "BodyRegion" ADD VALUE 'FULL_BODY';

-- AlterTable
ALTER TABLE "raffles" ADD COLUMN     "description" TEXT NOT NULL;