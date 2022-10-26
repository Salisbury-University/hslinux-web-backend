/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Preferences" (
    "uid" TEXT NOT NULL,
    "darkmode" BOOLEAN NOT NULL,
    CONSTRAINT "Preferences_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User" ("username") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "group" TEXT NOT NULL
);
INSERT INTO "new_User" ("group", "password", "username") SELECT "group", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_uid_key" ON "Preferences"("uid");
