/*
  Warnings:

  - You are about to drop the column `last_obtained_at` on the `streaks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "streaks" DROP COLUMN "last_obtained_at",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
