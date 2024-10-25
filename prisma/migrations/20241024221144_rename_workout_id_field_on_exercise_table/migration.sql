/*
  Warnings:

  - You are about to drop the column `workoutId` on the `exercises` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workoutId_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "workoutId",
ADD COLUMN     "workout_id" TEXT;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
