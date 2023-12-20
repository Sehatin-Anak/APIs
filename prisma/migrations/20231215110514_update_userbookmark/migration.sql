/*
  Warnings:

  - A unique constraint covering the columns `[foodRecomId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[articleId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserBookmark_userToken_articleId_key` ON `UserBookmark`;

-- DropIndex
DROP INDEX `UserBookmark_userToken_foodRecomId_key` ON `UserBookmark`;

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_foodRecomId_key` ON `UserBookmark`(`foodRecomId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_articleId_key` ON `UserBookmark`(`articleId`);
