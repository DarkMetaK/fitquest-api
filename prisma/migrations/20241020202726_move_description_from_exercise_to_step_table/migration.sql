/*
  Warnings:

  - Added the required column `description` to the `steps` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "steps_exercise_id_workout_id_key";

-- AlterTable
ALTER TABLE "exercises" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "steps" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_bundles" ADD COLUMN     "completed_workouts" INTEGER DEFAULT 0;
