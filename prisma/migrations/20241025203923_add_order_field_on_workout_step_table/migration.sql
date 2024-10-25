/*
  Warnings:

  - Added the required column `order` to the `WorkoutStep` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkoutStep" ADD COLUMN     "order" INTEGER NOT NULL;
