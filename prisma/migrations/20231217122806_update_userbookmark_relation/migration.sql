/*
  Warnings:

  - You are about to drop the column `userToken` on the `userbookmark` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,foodRecomId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,articleId]` on the table `UserBookmark` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `UserBookmark_userToken_articleId_key` ON `userbookmark`;

-- DropIndex
DROP INDEX `UserBookmark_userToken_foodRecomId_key` ON `userbookmark`;

-- AlterTable
ALTER TABLE `userbookmark` DROP COLUMN `userToken`,
    ADD COLUMN `userId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_userId_foodRecomId_key` ON `UserBookmark`(`userId`, `foodRecomId`);

-- CreateIndex
CREATE UNIQUE INDEX `UserBookmark_userId_articleId_key` ON `UserBookmark`(`userId`, `articleId`);

-- AddForeignKey
ALTER TABLE `UserBookmark` ADD CONSTRAINT `UserBookmark_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
