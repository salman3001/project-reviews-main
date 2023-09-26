/*
  Warnings:

  - A unique constraint covering the columns `[avatarId]` on the table `AdminUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_avatarId_key" ON "AdminUser"("avatarId");
