/*
  Warnings:

  - You are about to drop the column `tokenId` on the `child` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `user_username_key` ON `user`;

-- AlterTable
ALTER TABLE `child` DROP COLUMN `tokenId`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `password`,
    DROP COLUMN `username`,
    ADD COLUMN `childId` INTEGER NULL DEFAULT 1,
    ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT 'benidr071203@gmail.com',
    ADD COLUMN `img` VARCHAR(191) NOT NULL DEFAULT 'https://lh3.googleusercontent.com/a/ACg8ocK1naI0-2B27N1-dANbuqJjoJ5noC598_w0Y8zViNWi=s96-c',
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'Beni dr0712',
    MODIFY `id` VARCHAR(191) NOT NULL DEFAULT '112885180281777341345',
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
