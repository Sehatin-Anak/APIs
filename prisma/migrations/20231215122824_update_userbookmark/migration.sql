/*
  Warnings:

  - A unique constraint covering the columns `[userToken,foodRecomId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userToken,articleId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserBookmark_articleId_foodRecomId_key` ON `UserBookmark`;

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_userToken_foodRecomId_key` ON `UserBookmark`(`userToken`, `foodRecomId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_userToken_articleId_key` ON `UserBookmark`(`userToken`, `articleId`);
