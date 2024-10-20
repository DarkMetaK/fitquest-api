/*
  Warnings:

  - Added the required column `obtained_currency` to the `finished_workouts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `obtained_experience` to the `finished_workouts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "finished_workouts_user_id_workout_id_key";

-- AlterTable
ALTER TABLE "finished_workouts" ADD COLUMN     "obtained_currency" INTEGER NOT NULL,
ADD COLUMN     "obtained_experience" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "expires_at" TIMESTAMP(3);
