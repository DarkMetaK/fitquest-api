/*
  Warnings:

  - The values [LEVEL] on the enum `WorkoutType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `demo_url` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `exercises` table. All the data in the column will be lost.
  - You are about to drop the column `avatar_url` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `birth_date` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `workouts` table. All the data in the column will be lost.
  - You are about to drop the `bundle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `steps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_bundles` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `demonstration_url` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_calories` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goal` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('LOSE_WEIGHT', 'GAIN_MUSCLE_MASS', 'ENHANCE_HEALTH', 'INCREASE_FLEXIBILITY');

-- AlterEnum
BEGIN;
CREATE TYPE "WorkoutType_new" AS ENUM ('STANDARD', 'CHALLENGE');
ALTER TABLE "workouts" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "workouts" ALTER COLUMN "type" TYPE "WorkoutType_new" USING ("type"::text::"WorkoutType_new");
ALTER TYPE "WorkoutType" RENAME TO "WorkoutType_old";
ALTER TYPE "WorkoutType_new" RENAME TO "WorkoutType";
DROP TYPE "WorkoutType_old";
ALTER TABLE "workouts" ALTER COLUMN "type" SET DEFAULT 'STANDARD';
COMMIT;

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_exercise_id_fkey";

-- DropForeignKey
ALTER TABLE "steps" DROP CONSTRAINT "steps_workout_id_fkey";

-- DropForeignKey
ALTER TABLE "user_bundles" DROP CONSTRAINT "user_bundles_bundle_id_fkey";

-- DropForeignKey
ALTER TABLE "user_bundles" DROP CONSTRAINT "user_bundles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_bundle_id_fkey";

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "demo_url",
DROP COLUMN "description",
ADD COLUMN     "audio_url" TEXT,
ADD COLUMN     "demonstration_url" TEXT NOT NULL,
ADD COLUMN     "estimated_calories" INTEGER NOT NULL,
ADD COLUMN     "instructions" TEXT,
ADD COLUMN     "preview_url" TEXT,
ADD COLUMN     "workoutId" TEXT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar_url",
DROP COLUMN "birth_date",
DROP COLUMN "role",
ADD COLUMN     "age" INTEGER NOT NULL,
ADD COLUMN     "goal" "Goal" NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "workouts" DROP COLUMN "description",
ALTER COLUMN "type" SET DEFAULT 'STANDARD';

-- DropTable
DROP TABLE "bundle";

-- DropTable
DROP TABLE "steps";

-- DropTable
DROP TABLE "user_bundles";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "bingos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT false,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bingos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_bingos" (
    "id" TEXT NOT NULL,
    "validated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "bingo_id" TEXT NOT NULL,

    CONSTRAINT "user_bingos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "raffles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT true,
    "draw_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "raffles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_raffles" (
    "id" TEXT NOT NULL,
    "has_won" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "raffle_id" TEXT NOT NULL,

    CONSTRAINT "user_raffles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bundles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "banner_url" TEXT NOT NULL,
    "is_premium" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bundles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");

-- AddForeignKey
ALTER TABLE "user_bingos" ADD CONSTRAINT "user_bingos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_bingos" ADD CONSTRAINT "user_bingos_bingo_id_fkey" FOREIGN KEY ("bingo_id") REFERENCES "bingos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_raffles" ADD CONSTRAINT "user_raffles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_raffles" ADD CONSTRAINT "user_raffles_raffle_id_fkey" FOREIGN KEY ("raffle_id") REFERENCES "raffles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workouts" ADD CONSTRAINT "workouts_bundle_id_fkey" FOREIGN KEY ("bundle_id") REFERENCES "bundles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
