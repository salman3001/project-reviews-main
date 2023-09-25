/*
  Warnings:

  - You are about to drop the column `instagrame` on the `Social` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Social" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "website" TEXT,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "pintrest" TEXT,
    "vk" TEXT,
    "whatsapp" TEXT,
    "telegram" TEXT,
    "adminUserId" INTEGER NOT NULL,
    CONSTRAINT "Social_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Social" ("adminUserId", "facebook", "id", "pintrest", "twitter", "vk", "website", "whatsapp") SELECT "adminUserId", "facebook", "id", "pintrest", "twitter", "vk", "website", "whatsapp" FROM "Social";
DROP TABLE "Social";
ALTER TABLE "new_Social" RENAME TO "Social";
CREATE UNIQUE INDEX "Social_adminUserId_key" ON "Social"("adminUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
