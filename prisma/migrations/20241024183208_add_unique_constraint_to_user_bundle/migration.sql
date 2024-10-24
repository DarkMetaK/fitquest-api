/*
  Warnings:

  - A unique constraint covering the columns `[user_id,bundle_id]` on the table `user_bundles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_bundles_user_id_bundle_id_key" ON "user_bundles"("user_id", "bundle_id");
