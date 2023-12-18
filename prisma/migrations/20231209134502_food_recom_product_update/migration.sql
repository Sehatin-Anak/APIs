/*
  Warnings:

  - You are about to drop the column `description` on the `foodrecom` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `foodrecom` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `foodrecom` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionInfo` on the `foodrecom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foodrecom` DROP COLUMN `description`,
    DROP COLUMN `img`,
    DROP COLUMN `name`,
    DROP COLUMN `nutritionInfo`;

-- CreateTable
CREATE TABLE `Fruit` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nutritionInfo` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `foodRecomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vegetable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nutritionInfo` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `foodRecomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Snack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nutritionInfo` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `foodRecomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fruit` ADD CONSTRAINT `Fruit_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vegetable` ADD CONSTRAINT `Vegetable_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Snack` ADD CONSTRAINT `Snack_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
