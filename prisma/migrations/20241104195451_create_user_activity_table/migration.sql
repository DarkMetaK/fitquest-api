/*
  Warnings:

  - You are about to drop the column `current` on the `streaks` table. All the data in the column will be lost.
  - You are about to drop the column `maximum` on the `streaks` table. All the data in the column will be lost.
  - Added the required column `week_start_date` to the `streaks` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('WORKOUT', 'REST', 'INACTIVE');

-- AlterTable
ALTER TABLE "streaks" DROP COLUMN "current",
DROP COLUMN "maximum",
ADD COLUMN     "current_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maximum_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_rest_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak_goal" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "week_start_date" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "user_activities" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "activity_type" "ActivityType" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "user_activities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_activities" ADD CONSTRAINT "user_activities_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
