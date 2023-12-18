/*
  Warnings:

  - A unique constraint covering the columns `[refreshToken]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `refreshToken` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `user_refreshToken_key` ON `user`(`refreshToken`);
