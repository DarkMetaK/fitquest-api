/*
  Warnings:

  - You are about to drop the column `workout_id` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the `bingos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `raffles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_bingos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_metadata` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_raffles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "user_bingos" DROP CONSTRAINT "user_bingos_bingo_id_fkey";

-- DropForeignKey
ALTER TABLE "user_bingos" DROP CONSTRAINT "user_bingos_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_metadata" DROP CONSTRAINT "user_metadata_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_raffles" DROP CONSTRAINT "user_raffles_raffle_id_fkey";

-- DropForeignKey
ALTER TABLE "user_raffles" DROP CONSTRAINT "user_raffles_user_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "workout_id";

-- DropTable
DROP TABLE "bingos";

-- DropTable
DROP TABLE "raffles";

-- DropTable
DROP TABLE "user_bingos";

-- DropTable
DROP TABLE "user_metadata";

-- DropTable
DROP TABLE "user_raffles";

-- CreateTable
CREATE TABLE "customers_metadata" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "goal" "Goal" NOT NULL,
    "experience_amount" INTEGER NOT NULL DEFAULT 0,
    "currency_amount" INTEGER NOT NULL DEFAULT 0,
    "premium_expires_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,

    CONSTRAINT "customers_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutStep" (
    "id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "workout_id" TEXT NOT NULL,

    CONSTRAINT "WorkoutStep_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_metadata_phone_key" ON "customers_metadata"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "customers_metadata_user_id_key" ON "customers_metadata"("user_id");

-- AddForeignKey
ALTER TABLE "customers_metadata" ADD CONSTRAINT "customers_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutStep" ADD CONSTRAINT "WorkoutStep_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
