/*
  Warnings:

  - You are about to drop the `recipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipeingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `recipeinstruction` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[nutritionInfoId]` on the table `FoodRecom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Category` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agregateRating` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutritionInfoId` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewCount` to the `FoodRecom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
-- ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_foodRecomId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `recipe` DROP FOREIGN KEY `Recipe_nutritionInfoId_fkey`;

-- DropForeignKey
-- ALTER TABLE `recipeingredient` DROP FOREIGN KEY `RecipeIngredient_recipeId_fkey`;

-- -- DropForeignKey
-- ALTER TABLE `recipeinstruction` DROP FOREIGN KEY `RecipeInstruction_recipeId_fkey`;

-- AlterTable
ALTER TABLE `FoodRecom` ADD COLUMN `Category` VARCHAR(191) NOT NULL,
    ADD COLUMN `agregateRating` DOUBLE NOT NULL,
    ADD COLUMN `description` VARCHAR(1000) NOT NULL,
    ADD COLUMN `img` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `nutritionInfoId` INTEGER NOT NULL,
    ADD COLUMN `reviewCount` INTEGER NOT NULL;

-- -- DropTable
-- DROP TABLE `recipe`;

-- -- DropTable
-- DROP TABLE `recipeingredient`;

-- -- DropTable
-- DROP TABLE `recipeinstruction`;

-- CreateTable
CREATE TABLE `FoodRecomIngredient` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredient` VARCHAR(191) NOT NULL,
    `quality` VARCHAR(1000) NOT NULL,
    `foodRecomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `ingredient`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodRecomInstruction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stepOrder` INTEGER NOT NULL,
    `instruction` VARCHAR(191) NOT NULL,
    `foodRecomId` INTEGER NOT NULL,

    PRIMARY KEY (`id`, `stepOrder`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `FoodRecom_nutritionInfoId_key` ON `FoodRecom`(`nutritionInfoId`);

-- AddForeignKey
ALTER TABLE `FoodRecom` ADD CONSTRAINT `FoodRecom_nutritionInfoId_fkey` FOREIGN KEY (`nutritionInfoId`) REFERENCES `NutritionInfo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodRecomIngredient` ADD CONSTRAINT `FoodRecomIngredient_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FoodRecomInstruction` ADD CONSTRAINT `FoodRecomInstruction_foodRecomId_fkey` FOREIGN KEY (`foodRecomId`) REFERENCES `FoodRecom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
