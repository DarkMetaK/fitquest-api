/*
  Warnings:

  - The values [WORKOUT] on the enum `ActivityType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ActivityType_new" AS ENUM ('STREAK', 'REST', 'INACTIVE');
ALTER TABLE "user_activities" ALTER COLUMN "activity_type" TYPE "ActivityType_new" USING ("activity_type"::text::"ActivityType_new");
ALTER TYPE "ActivityType" RENAME TO "ActivityType_old";
ALTER TYPE "ActivityType_new" RENAME TO "ActivityType";
DROP TYPE "ActivityType_old";
COMMIT;
