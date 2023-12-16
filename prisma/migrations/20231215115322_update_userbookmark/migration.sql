/*
  Warnings:

  - A unique constraint covering the columns `[articleId,foodRecomId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_articleId_foodRecomId_key` ON `UserBookmark`(`articleId`, `foodRecomId`);
