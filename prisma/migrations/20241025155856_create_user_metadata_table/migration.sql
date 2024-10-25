/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `currency_amount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `experience_amount` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `premium_expires_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_phone_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "age",
DROP COLUMN "currency_amount",
DROP COLUMN "experience_amount",
DROP COLUMN "goal",
DROP COLUMN "height",
DROP COLUMN "phone",
DROP COLUMN "premium_expires_at",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "user_metadata" (
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

    CONSTRAINT "user_metadata_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_metadata_phone_key" ON "user_metadata"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_metadata_user_id_key" ON "user_metadata"("user_id");

-- AddForeignKey
ALTER TABLE "user_metadata" ADD CONSTRAINT "user_metadata_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
