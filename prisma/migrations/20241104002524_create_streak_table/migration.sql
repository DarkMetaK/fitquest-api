-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BodyRegion" ADD VALUE 'CORE';
ALTER TYPE "BodyRegion" ADD VALUE 'LEGS';
ALTER TYPE "BodyRegion" ADD VALUE 'TRICEPS';

-- DropForeignKey
ALTER TABLE "WorkoutStep" DROP CONSTRAINT "WorkoutStep_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "WorkoutStep" DROP CONSTRAINT "WorkoutStep_workout_id_fkey";

-- AlterTable
ALTER TABLE "customers_metadata" ADD COLUMN     "total_calories" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_exercises" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total_workouts" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "streaks" (
    "id" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "maximum" INTEGER NOT NULL DEFAULT 0,
    "last_obtained_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "streaks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "streaks_user_id_key" ON "streaks"("user_id");

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "streaks" ADD CONSTRAINT "streaks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
